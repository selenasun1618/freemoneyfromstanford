import {AcademicPosition, RepresentingVSO, SearchResult, SearchState, SortBy, SortOrder} from "@/internal/types";
import {FieldNames} from "@/constants/search";
import {Dispatch, SetStateAction, useState} from "react";

export namespace SearchPanel {
    export type Props = {
        state: SearchState,
        setState: Dispatch<SetStateAction<SearchState>>,
        searchAction: (x: FormData) => Promise<SearchResult[]>,
    }
}
export function SearchPanel({state, setState, searchAction}: SearchPanel.Props) {
    async function action(fd: FormData) {
        let results = await searchAction(fd)
        setState((prev) => { return {
            ...prev,
            searchResults: results,
        } })
    }
    let [minAmount, setMinAmount] = useState('0.00');
    return (
        <form className="flex flex-col grow bg-slate-100 p-4 gap-4 mb-4" action={searchAction}>
            <div className="my-2 mx-3 flex flex-row grow">
                <input type="search" placeholder="Search grants..." enterKeyHint="search"
                       name={FieldNames.SEARCH_STRING}
                       className="rounded-l-3xl py-3 pl-6 pr-3 flex-grow bg-slate-200 text-slate-900 focus:outline-rose-500"
                       value={state.searchString}
                       aria-label="Search grants"
                       onChange={(e) => setState(prev => { return {
                           ...prev,
                           searchString: e.target.value
                       } } )}
                />
                <input type="submit" value="Search"
                       className="rounded-r-3xl py-3 px-4 bg-rose-500 text-rose-50 cursor-pointer"
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
                                       checked={state.position === item}
                                       onChange={(e) => setState(prev => { return {
                                           ...prev,
                                           position: e.target.value as AcademicPosition.Type
                                       }})}
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
                        <label key={item}>
                            { /* TODO: difference between undergraduate vs. graduate VSOs, other types.ts? */ }
                            <input type="radio" name={FieldNames.REPRESENTING_VSO}
                                   value={item}
                                   checked={state.representingVSO === item}
                                   onChange={e => setState(prev=> { return {
                                       ...prev,
                                       representingVSO: e.target.value as RepresentingVSO.Type
                                   }})}
                            />
                            {item === RepresentingVSO.Enum.None ? 'No' : `Yes (${item} VSO)`}
                        </label>
                    )
                ) }
            </fieldset>

            <div>
                {/*<input type="checkbox" id="FMFS_search_amount_limits" name={FieldNames.FILTER_MIN_AMOUNT}*/}
                {/*       checked={state.filterMinAmount}*/}
                {/*       onChange={e => setState(prev => { return {*/}
                {/*           ...prev,*/}
                {/*           filterMinAmount: e.target.checked*/}
                {/*       }})}*/}
                {/*/>*/}
                {/*<label htmlFor="FMFS_search_amount_limits" className="ml-6">Filter by grant amount</label><br/>*/}
                <div className="border border-slate-600 p-4">
                    <label htmlFor="FMFS_search_amount_min">Minimum award:</label>
                    { /* px-6 so the rounding works proper */ }
                    <input type="text" inputMode="numeric" pattern="\d*\.?\d{0,2}"
                        id="FMFS_search_amount_min" name={FieldNames.MIN_AMOUNT}
                           className="rounded-3xl py-3 px-6 w-48 bg-slate-200 text-slate-900 focus:outline-rose-500"
                           placeholder="Minimum (USD)"
                           // disabled={!state.filterMinAmount}
                           value={minAmount}
                           onChange={e => {
                               if(e.target.validity.valid) {
                                   setMinAmount(_prev => {
                                       // console.log(e)
                                       if ((e.target.validity.valid && Number.isFinite(parseFloat(e.target.value)))
                                            || e.target.value === '' || e.target.value === '-') {
                                           setState(prev => {
                                               return {
                                                   ...prev,
                                                   minAmount: parseFloat(e.target.value)
                                               }
                                           })
                                       }
                                       return e.target.value
                                   });
                               }
                           }}
                    />
                </div>
            </div>

            <div className="border border-slate-600 p-4 md:flex gap-6">
                <fieldset className="inline">
                    <legend className="float-left mr-2"><b>Sort results by:</b></legend>
                    <label>
                        <input type="radio" name={FieldNames.SORT_BY} value={SortBy.Enum.Amount}
                               checked={state.sortBy === SortBy.Enum.Amount}
                               onChange={e => setState(prev => { return {
                                   ...prev,
                                   sortBy: SortBy.Enum.Amount
                               }})}
                        />
                        Award
                    </label>
                    <label>
                        <input type="radio" name={FieldNames.SORT_BY} value={SortBy.Enum.Deadline}
                               checked={state.sortBy === SortBy.Enum.Deadline}
                               onChange={e => setState(prev => { return {
                                   ...prev,
                                   sortBy: SortBy.Enum.Deadline
                               }})}
                        />
                        Deadline
                    </label>
                </fieldset>
                <fieldset className="inline">
                    <legend className="float-left mr-2"><b>In order:</b></legend>
                    <label>
                        <input type="radio" name={FieldNames.SORT_ORDER} value={SortOrder.Enum.Ascending}
                               checked={state.sortOrder === SortOrder.Enum.Ascending}
                               onChange={e => setState(prev => { return {
                                   ...prev,
                                   sortOrder: SortOrder.Enum.Ascending
                               }})}
                        />
                        Ascending
                    </label>
                    <label>
                        <input type="radio" name={FieldNames.SORT_ORDER} value={SortOrder.Enum.Descending}
                               checked={state.sortOrder === SortOrder.Enum.Descending}
                               onChange={e => setState(prev => { return {
                                   ...prev,
                                   sortOrder: SortOrder.Enum.Descending
                               }})}
                        />
                        Descending
                    </label>
                </fieldset>
            </div>

            <div className="self-end">
                <input type="reset" value="Reset" className={"underline cursor-pointer"} />
            </div>

        </form>
    )
}
