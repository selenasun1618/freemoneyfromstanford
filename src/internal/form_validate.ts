import {z} from "zod";
import {Limits} from "@/constants/search";
import {AcademicPosition, ParsedFormData, RepresentingVSO, SearchState, SortBy, SortOrder} from "@/internal/types";

// schema to process incoming form data
export const formDataCompositeSchema = z.object({
    searchString: z.string().max(Limits.MAX_SEARCH_LENGTH),
    position: AcademicPosition.schema,
    representingVSO: RepresentingVSO.schema,
    // filterMinAmount: z.boolean(),
    minAmount: z.coerce.number().nonnegative().multipleOf(0.01).finite().safe(),
    sortBy: SortBy.schema,
    sortOrder: SortOrder.schema,
})
    // guarantee: filterMinAmount\implies minAmount\neq null
.transform((x: ParsedFormData) : ParsedFormData => {
    return {
        ...x,
        minAmount: parseFloat(x.minAmount as unknown as string)
    }
})
