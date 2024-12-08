'use client'

import {useEffect, useState} from "react";
import {
    AcademicPosition,
    FilterState, Grant,
    GrantDatabase,
    RepresentingVSO,
    SearchState,
    SortBy,
    SortOrder
} from "@/internal/types";
import {readDatabase} from "@/internal/backend";
import {filterGrants} from "@/internal/filter";
import {ResultView} from "@/components/ResultView";

export default function Home() {
    let [ filterState, setFilterState ] = useState<FilterState>({
        minAmount: null,
        position: AcademicPosition.defaultValue, representingVSO: RepresentingVSO.defaultValue,
        sortBy: SortBy.defaultValue, sortOrder: SortOrder.defaultValue
    });
    // `searchState` contains the current string that is being searched.
    let [ searchState, setSearchState ] = useState<SearchState>({searchString: ""});
    // let [ userHasInteracted, setUserHasInteracted ] = useState(false);

    // Load the grant database
    let [ grantDatabase, setGrantDatabase ] = useState<GrantDatabase|null>(null);
    useEffect(() => {
        console.log("Loading grant database...")
        let getGrantDatabase = async () => {
            setGrantDatabase(await readDatabase())
        }
        getGrantDatabase()
    });

    let eligibleGrants = [] as Grant[];
    if(grantDatabase !== null) {
        // TODO: actually run the search here; for now, a kludge
        let grants = Object.values(grantDatabase);

        eligibleGrants = filterGrants(grants, filterState);
        // IMPORTANT: we are NOT using the sorting mechanism, since our original aim was to sort by RELEVANCE to the input string
        // plus, e.g. sort-by-amount doesn't work super well when amount isn't always specified
        // TODO(max): natural conclusion: we should instead have a SortBy.Relevance which is the default option
    }

    console.log(eligibleGrants);

    return (
        <main className="mb-auto flex flex-row justify-center text-white">
            <div className="bg-digital-red w-full pt-10">
                <div className="container mx-auto md:p-4 md:pb-10">
                    <h1 className={"text-center text-4xl font-bold my-6 px-1 text-white"}>
                    <span className={'inline-block'}>Need money for a </span>{' '}
                        <span className={"underline"}>project</span>,{' '}
                        <span className={'inline-block'}>but unsure how to fund it?</span>
                    </h1>
                    <p className={"text-center text-lg font-medium mb-6 mt-9 px-1 block"}>
                        <span className={'inline-block'}>
                            Stanford can help, but the information can be spread out and difficult to navigate.
                        </span>
                        &nbsp;
                    </p>

                    <div className={"flex flex-col grow sm:rounded-2xl bg-digital-red px-5 pb-5"}>
                        <div className={"my-2 flex justify-center"}>
                            <div className={"w-full max-w-3xl"}>
                                <input type="search" placeholder="Enter your project idea..." enterKeyHint="search"
                                    name="search"
                                    value={searchState.searchString}
                                    onChange={(e) => setSearchState({ searchString: e.target.value })}
                                    className={"rounded-3xl py-3 pl-6 pr-3 w-full bg-slate-100 text-black-1000"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* underneath the upper search box */}
            <div className={''}>
                <ResultView grants={eligibleGrants} />
            </div>
        </main>
    )
}
