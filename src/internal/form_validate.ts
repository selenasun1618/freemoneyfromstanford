'use server';

import {z} from "zod";
import {Limits} from "@/constants/search";
import {AcademicPosition, ParsedFormData, RepresentingVSO, SearchState, SortBy, SortOrder} from "@/internal/types";

// schema to process incoming form data
export const formDataCompositeSchema = z.object({
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
