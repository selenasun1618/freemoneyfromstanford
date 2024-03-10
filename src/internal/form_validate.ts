import {z} from "zod";
import {FieldNames, Limits} from "@/constants/search";
import {AcademicPosition, ParsedFormData, RepresentingVSO, SearchState, SortBy, SortOrder} from "@/internal/types";
import {embeddingsCache} from "@/internal/cache";
import {generateEmbedding, search} from "@/internal/search";

// schema to process incoming form data
const formDataCompositeSchema = z.object({
    searchString: z.string().max(Limits.MAX_SEARCH_LENGTH),
    position: AcademicPosition.schema,
    representingVSO: RepresentingVSO.schema,
    filterMinAmount: z.boolean(),
    minAmount: z.string()
        // special handling: minAmount=='' is treated as null
        .transform((x: string) : string|null => x == '' ? null : x)
        .pipe(z.number().nonnegative().multipleOf(0.01).finite().safe().nullable()),
    sortBy: SortBy.schema,
    sortOrder: SortOrder.schema,
})
    // guarantee: filterMinAmount\implies minAmount\neq null
.transform((x: ParsedFormData) : ParsedFormData => {
    if(x.filterMinAmount && x.minAmount === null)
        return { ...x, minAmount: 0 }
    return x
})

// Actual search action. Called by the <form> in SearchPanel.
// Will parse the search form; then check whether we have a cached embedding for the search string; if not, then call
//  {@link generateEmbedding} to generate a new one.
// Then, we call {@link search} to actually search the database.
export async function doSearch(_state: SearchState, formData: FormData): Promise<SearchState> {
    'use server';
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

    return {
        searchResults: results,
        ...data,
    } as SearchState
}

