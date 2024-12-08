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
import {filterGrants} from "@/internal/filter";
import {ResultView} from "@/components/ResultView";

declare global {
    interface Window {
        fs: {
            readFile: (path: string, options?: { encoding?: string }) => Promise<any>;
        }
    }
}

export default function Home() {
    let [filterState, setFilterState] = useState<FilterState>({
        minAmount: null,
        position: AcademicPosition.defaultValue,
        representingVSO: RepresentingVSO.defaultValue,
        sortBy: SortBy.defaultValue,
        sortOrder: SortOrder.defaultValue
    });
    
    let [searchState, setSearchState] = useState<SearchState>({searchString: ""});
    let [grantDatabase, setGrantDatabase] = useState<GrantDatabase|null>(null);

    // Load the grant database
    useEffect(() => {
        const loadDatabase = async () => {
            try {
                const response = await window.fs.readFile('database.json', { encoding: 'utf8' });
                const data = JSON.parse(response);
                setGrantDatabase(data);
            } catch (error) {
                console.error('Error loading database:', error);
            }
        };

        loadDatabase();
    }, []); 

    let eligibleGrants = [] as Grant[];
    if(grantDatabase !== null) {
        let grants = Object.values(grantDatabase);
        eligibleGrants = filterGrants(grants, filterState);
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="bg-digital-red w-full pt-10">
                <div className="container mx-auto md:p-4 md:pb-10">
                    <h1 className="text-center text-4xl font-bold my-6 px-1 text-white">
                        <span className="inline-block">Need money for a </span>{' '}
                        <span className="underline">project</span>,{' '}
                        <span className="inline-block">but unsure how to fund it?</span>
                    </h1>
                    <p className="text-center text-lg font-medium mb-6 mt-9 px-1 block text-white">
                        <span className="inline-block">
                            Stanford can help, but the information can be spread out and difficult to navigate.
                        </span>
                        &nbsp;
                    </p>

                    <div className="flex flex-col grow sm:rounded-2xl bg-digital-red px-5 pb-5">
                        <div className="my-2 flex justify-center">
                            <div className="w-full max-w-3xl">
                                <input 
                                    type="search" 
                                    placeholder="Enter your project idea..." 
                                    enterKeyHint="search"
                                    name="search"
                                    value={searchState.searchString}
                                    onChange={(e) => setSearchState({ searchString: e.target.value })}
                                    className="rounded-3xl py-3 pl-6 pr-3 w-full bg-slate-100 text-black-1000"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Grant results section */}
            <div className="w-full bg-white">
                <ResultView 
                    grants={eligibleGrants} 
                    searchQuery={searchState.searchString}
                />
            </div>
        </main>
    );
}