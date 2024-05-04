'use server';
import * as fs from 'fs';
import path from 'path';
import * as util from 'util';

import {ParsedFormData, SearchResult, SearchState} from "@/internal/types";
import {FieldNames} from "@/constants/search";
import {embeddingsCache} from "@/internal/cache";
import {formDataCompositeSchema} from "@/internal/form_validate";
import { OpenAI } from 'openai';

export type EmbeddingType = number[]
const client = new OpenAI();
let grantsData: any = null;
let embeddingsData: any = null;

export async function generateEmbedding(searchString: string): Promise<EmbeddingType> {
    try {
        
        const query = searchString.replace(/\n/g, " ");
        const model = "text-embedding-3-small";

        const response = await client.embeddings.create({
            model: model,
            input: query
        });

        if (response.data && response.data.length > 0) {
            return response.data[0].embedding;
        } else {
            throw new Error("No embedding data received from the API");
        }
    } catch (error) {
        console.error("Failed to generate embedding:", error);
        throw error;
    }
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA: EmbeddingType, vecB: EmbeddingType): number {
    const dotProduct = vecA.reduce((acc, current, idx) => acc + current * vecB[idx], 0);
    const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (normA * normB);
}

// Read JSON data from file
async function readDataFromFile(filePath: string): Promise<any> {
    const readFile = util.promisify(fs.readFile);
    const data = await readFile(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
}

export async function search(searchEmbedding: EmbeddingType, parsedFormData: ParsedFormData): Promise<SearchResult[]> {
    
    if (grantsData === null) {
        const dataPath = path.join(__dirname, 'database.json');
        grantsData = await readDataFromFile(dataPath);
    }

    if (embeddingsData === null) {
        const embeddingsPath = path.join(__dirname, 'embeddings.json');
        embeddingsData = await readDataFromFile(embeddingsPath);
    }
    
    let cosineSimilarities: Array<[string, number]> = [];
    for (const [id, embedding] of Object.entries(embeddingsData as Record<string, EmbeddingType>)) {
        const similarity = cosineSimilarity(embedding, searchEmbedding);
        cosineSimilarities.push([id, similarity]);
    }

    cosineSimilarities.sort((a, b) => b[1] - a[1]);

    // Remove results where cosine similarities < 0
    const topResults = cosineSimilarities.filter(item => item[1] >= 0);

    const prelimResults: SearchResult[] = topResults.map(([id, _]) => grantsData[id]);
    const results: SearchResult[] = prelimResults.map(result => {
        return {
            ...result,
            deadline: new Date(result.deadline),
            nextCycleStartDate: new Date(result.nextCycleStartDate) // TODO, what happens with empty date
        };
    });
    return results;
}

// Actual search action. Called by the <form> in SearchPanel.
// Will parse the search form; then check whether we have a cached embedding for the search string; if not, then call
//  {@link generateEmbedding} to generate a new one.
// Then, we call {@link search} to actually search the database.
export async function doSearch(formData: FormData): Promise<SearchResult[]> {
    const rawFormData: {[K in keyof ParsedFormData]: FormDataEntryValue | null} = {
        searchString: formData.get(FieldNames.SEARCH_STRING),
        position: formData.get(FieldNames.POSITION),
        representingVSO: formData.get(FieldNames.REPRESENTING_VSO),
        minAmount: formData.get(FieldNames.MIN_AMOUNT),
        sortBy: formData.get(FieldNames.SORT_BY),
        sortOrder: formData.get(FieldNames.SORT_ORDER),
    };

    let parseResult = formDataCompositeSchema.safeParse(rawFormData)
    if(!parseResult.success) {
        throw new Error("failed to parse submitted search parameters")
    }
    let data: ParsedFormData = parseResult.data;

    // check if its in cache; if not, then call generateEmbedding
    let searchEmbedding = await embeddingsCache.getOrElse(data.searchString, generateEmbedding)
    // TODO: search-level caching?
    let results = await search(searchEmbedding, data)

    // throw results.map(v => JSON.stringify(v)).join(" ")

    return results
}

