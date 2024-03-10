import {AcademicPosition, RepresentingVSO, SearchState, SortBy, SortOrder} from "@/internal/types";
import {FieldNames} from "@/constants/search";

export namespace SearchPanel {
    export type Props = {
        searchState: SearchState,
        searchAction: (payload: FormData) => void,
    }
}
export function SearchPanel({searchState, searchAction}: SearchPanel.Props) {
    return (
        <form className="flex flex-col grow bg-slate-100 p-4 gap-4 mb-4" action={searchAction}>

            <div className="my-2 mx-3 flex flex-row grow">
                <input type="search" placeholder="Search grants..." enterKeyHint="search"
                       name={FieldNames.SEARCH_STRING}
                       className="rounded-l-3xl py-3 pl-6 pr-3 flex-grow bg-slate-200 text-slate-900 focus:outline-rose-500"
                       value={searchState.searchString}
                       aria-label="Search grants"
                />
                <input type="submit" value="Search"
                       className="rounded-r-3xl py-3 px-4 bg-rose-500 text-rose-50"
                />
            </div>

            <fieldset>
                <legend>Please select your academic position:</legend>
                <div className="flex flex-row flex-wrap gap-3">
                    { AcademicPosition.values.map(item =>
                        (
                            <label>
                                <input type="radio" name={FieldNames.POSITION}
                                       value={item}
                                       checked={searchState.position === item}
                                />
                                { item }
                            </label>
                        )
                    ) }
                </div>
            </fieldset>
            <fieldset>
                <legend>I'm seeking a grant as part of the leadership of a VSO</legend>
                { RepresentingVSO.values.map(item =>
                    (
                        <label>
                            { /* TODO: difference between undergraduate vs. graduate VSOs, other types.ts? */ }
                            <input type="radio" name={FieldNames.REPRESENTING_VSO}
                                   value={item}
                                   checked={searchState.representingVSO === item} />
                            {item === RepresentingVSO.Enum.None ? 'No' : `Yes (${item} VSO)`}
                        </label>
                    )
                ) }
            </fieldset>

            <div>
                <input type="checkbox" id="FMFS_search_amount_limits" name={FieldNames.FILTER_MIN_AMOUNT}
                       checked={searchState.filterMinAmount} />
                <label htmlFor="FMFS_search_amount_limits" className="ml-6">Filter by grant amount</label><br/>
                <div className="border border-slate-600 p-4">
                    <label htmlFor="FMFS_search_amount_min">Minimum award:</label>
                    { /* px-6 so the rounding works proper */ }
                    <input type="text" inputMode="numeric" id="FMFS_search_amount_min" name={FieldNames.MIN_AMOUNT}
                           className="rounded-3xl py-3 px-6 w-48 bg-slate-200 text-slate-900 focus:outline-rose-500"
                           placeholder="Minimum (USD)"
                           disabled={!searchState.filterMinAmount}
                           value={searchState.minAmount?.toString() ?? ''}
                    />
                </div>
            </div>

            <div className="border border-slate-600 p-4 md:flex gap-6">
                <fieldset className="inline">
                    <legend className="float-left mr-2"><b>Sort results by:</b></legend>
                    <label>
                        <input type="radio" name={FieldNames.SORT_BY} value="amount"
                               checked={searchState.sortBy === SortBy.Enum.Amount} />
                        Award
                    </label>
                    <label>
                        <input type="radio" name={FieldNames.SORT_BY} value="deadline"
                               checked={searchState.sortBy === SortBy.Enum.Deadline} />
                        Deadline
                    </label>
                </fieldset>
                <fieldset className="inline">
                    <legend className="float-left mr-2"><b>In order:</b></legend>
                    <label>
                        <input type="radio" name={FieldNames.SORT_ORDER} value="ascending"
                               checked={searchState.sortOrder === SortOrder.Enum.Ascending} />
                        Ascending
                    </label>
                    <label>
                        <input type="radio" name={FieldNames.SORT_ORDER} value="descending"
                               checked={searchState.sortOrder === SortOrder.Enum.Descending} />
                        Descending
                    </label>
                </fieldset>
            </div>

            <div className="self-end">
                <input type="reset" value="Reset" className="underline"/>
            </div>

        </form>
    )
}
