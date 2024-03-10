import { useFormState } from "react-dom";
import { AcademicPosition, RepresentingVSO, SearchState, SortBy, SortOrder } from "@/internal/types";
import { SearchPanel } from "@/components/SearchPanel";
import { doSearch } from "@/internal/form_validate";

// TODO: sorting without going through the form mechanism (i.e. on-page sorting)
// TODO: make the homepage search bar go here with the correct form action

export default function SearchPage() {
    let [searchState, searchAction] = useFormState<SearchState, FormData>(doSearch, {
        searchString: '',
        position: AcademicPosition.defaultValue,
        representingVSO: RepresentingVSO.defaultValue,

        filterMinAmount: false,
        minAmount: null,

        searchResults: [],

        sortBy: SortBy.defaultValue,
        sortOrder: SortOrder.defaultValue,
    } as SearchState);

    return (
        <main className="mb-auto flex flex-row justify-center">
            <div className="container mx-auto md:p-4">
                <SearchPanel {...{searchState, searchAction}} />
                { /* TODO(@max-cura) display search results */ }
            </div>
        </main>
    )
}