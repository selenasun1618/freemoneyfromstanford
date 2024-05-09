'use client';

import {useState} from "react";
import {AcademicPosition, FilterState, RepresentingVSO, SearchState, SortBy, SortOrder} from "@/internal/types";

export default function Home() {
    let [ filterState, setFilterState ] = useState<FilterState>({
        minAmount: null, position: AcademicPosition.defaultValue, representingVSO: RepresentingVSO.defaultValue, sortBy: SortBy.defaultValue, sortOrder: SortOrder.defaultValue
    });
    let [ searchState, setSearchState ] = useState<SearchState>( {
        searchString: ""
    });

    return (
        <main className="mb-auto flex flex-row justify-center text-white">
            <div className="bg-digital-red w-full pt-10">
                <div className="container mx-auto md:p-4 md:pb-10">
                    <h1 className={"text-center text-4xl font-bold my-6 px-1 text-white"}>
                        <span className={'inline-block'}>Need money for a <span
                            className={"underline"}>project</span>, </span>
                        <span className={'inline-block'}>but unsure how to fund it?</span>
                    </h1>
                    <p className={"text-center text-lg font-medium mb-6 mt-9 px-1 block"}>
                        <span className={'inline-block'}>
                            Stanford can help, but the information can be spread out and difficult to navigate.
                        </span>
                        &nbsp;
                        <span className={'inline-block'}>
                            Ergo us!
                        </span>
                    </p>

                    <div className={"flex flex-col grow sm:rounded-2xl bg-digital-red px-5 pb-5"}>
                        <div className={"my-2 mx-3 flex flex-row grow"}>
                            <input type="search" placeholder="Search your grant topic..." enterKeyHint="search"
                                   name="search"
                                   value={searchState.searchString}
                                   onChange={(e) => setSearchState({ searchString: e.target.value })}
                                   className={"rounded-l-3xl py-3 pl-6 pr-3 flex-grow bg-slate-100 text-black-1000"}
                            />
                        </div>
                        <span className={"text-center mt-1 my-2 text-black-100"}>
                        Or go directly to our&nbsp;{/*<a href="/search" className={`underline text-white`}>Advanced Search</a>&nbsp; */}
                            {/*page, or our&nbsp;*/}<a href="/list" className={`underline text-white cursor-pointer`}>list of grants</a>
                        </span>
                    </div>
                </div>
            </div>
        </main>
    )
}
