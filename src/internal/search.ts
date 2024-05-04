'use server';

import {ParsedFormData, SearchResult, SearchState} from "@/internal/types";
import {FieldNames} from "@/constants/search";
import {embeddingsCache} from "@/internal/cache";
import {formDataCompositeSchema} from "@/internal/form_validate";

export type EmbeddingType = unknown

export async function generateEmbedding(searchString: string): Promise<EmbeddingType> {
    // TODO(@selenasun1618)

    return /* placeholder, please delete */undefined as unknown as EmbeddingType/* end placeholder */
}

export async function search(searchEmbedding: EmbeddingType, parsedFormData: ParsedFormData): Promise<SearchResult[]> {
    // TODO(@selenasun1618)

    return /* placeholder, please delete */undefined as unknown as SearchResult[]/* end placeholder */
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
        filterMinAmount: formData.get(FieldNames.FILTER_MIN_AMOUNT),
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

    return results
}

