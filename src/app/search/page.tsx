"use client"

import { useFormState } from "react-dom";
import {
    AcademicPosition,
    RepresentingVSO,
    SearchResult,
    SearchState,
    SortBy,
    SortOrder
} from "@/internal/types";
import { SearchPanel } from "@/components/SearchPanel";
import { ResultItem, ResultItemProps } from "@/components/ResultItem";
import { doSearch } from "@/internal/search";
import {useEffect, useState} from "react";

// TODO: sorting without going through the form mechanism (i.e. on-page sorting)
// TODO: make the homepage search bar go here with the correct form action

function NoResults() {
    return (
        <li className="w-full p-4 flex flex-col md:flex-row border border-sky-400">
            <h3 className={"underline"}>No results found. Try changing your query.</h3>
        </li>
    )
}

function Results(props: { results: SearchResult[] }) {
    let [now, setNow] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        });

        return () => clearInterval(interval)
    })

    function SRToRIP(sr: SearchResult): ResultItemProps {
        let remaining_time = new Date();
        remaining_time.setTime(sr.currentDeadline.getTime() - now);
        let remainingTime = remaining_time.toLocaleDateString();
        let remainingTimeMachine = remaining_time.toISOString();
        return {
            amountMax: sr.amountMax,
            amountMin: sr.amountMin,
            description: sr.description,
            title: sr.title,
            url: sr.url,
            // TODO
            deadlineMachine: sr.currentDeadline.toISOString(),
            nextCycle: sr.nextCycleStartDate.toLocaleDateString(),
            remainingTime,
            remainingTimeMachine,
        }
    }

    return props.results.map((sr) => {
        let rip = SRToRIP(sr);
        return (<ResultItem {...rip} />)
    })
}

function SearchPage() : JSX.Element {
    let [state, setState] = useState({
        searchString: '',
        position: AcademicPosition.defaultValue,
        representingVSO: RepresentingVSO.defaultValue,

        minAmount: 0,

        searchResults: [],

        sortBy: SortBy.defaultValue,
        sortOrder: SortOrder.defaultValue,
    } as SearchState);

    return (
        <main className="mb-auto flex flex-row justify-center">
            <div className="container mx-auto md:p-4">
                <SearchPanel {...{state, setState, searchAction: doSearch}} />
                { /* TODO(@max-cura) display search results */}
                <ul className="w-full bg-slate-100 grow p-5 flex flex-col items-center gap-6">
                    {state.searchResults.length == 0
                        ? (<NoResults/>)
                        : (<Results results={state.searchResults}/>)}
                </ul>
            </div>
        </main>
    )
}

export default SearchPage