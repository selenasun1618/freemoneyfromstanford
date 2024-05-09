import { Grant } from '@/internal/types';

export function Grant(grant: Readonly<Grant>) : React.ReactElement {
    return (
        <li></li>
    )
}

// import {useEffect} from "react";
//
// export type ResultItemProps = {
//     title: string,
//     description: string,
//     amountMin: number,
//     amountMax: number,
//     url: string,
//     deadlineMachine: string,
//     remainingTimeMachine: string,
//     remainingTime: string
//     nextCycle: string,
// }
//
// export function ResultItem(item: Readonly<ResultItemProps>): React.ReactElement {
//     return (
//         <li className="w-full p-4 flex flex-col md:flex-row border border-sky-400">
//             <div className="w-auto">
//                     <h3 className="text-2xl">{ item.title }</h3>
//                     <p><b className="mr-3">Description</b>{ item.description }</p>
//                     <p><b className="mr-3">Amount</b>{ item.amountMin }-{ item.amountMax }</p>
//                     <p><b className="mr-3">Link</b><a href="{ item.url }" className="underline">{ item.url }</a></p>
//             </div>
//             <div className="my-auto min-w-fit self-center mt-2 md:mt-auto md:self-auto md:ml-3">
//                 <span className="text-4xl">
//                     {/*  WHATWG HTML5 SPEC §2.3.6.9 */}
//                     {/* 2011-11-18T14:54:39.929Z */}
//                     {/* 06d 05:03:24 */}
//                     <time dateTime={ item.deadlineMachine } className="f-deadline"></time>
//                     <time dateTime={ item.remainingTimeMachine }>{ item.remainingTime }</time>
//                 </span>
//                 <br />
//                 <span className="text-slate-300">
//                     {/*<span className="underline">{ item.currentCycle }</span> cycle;*/}
//                     next cycle { item.nextCycle }
//                 </span>
//             </div>
//         </li>
//     )
// }
