import {Grant} from "@/internal/types";
import {GrantAsListItem} from "@/components/ResultItem";

export function ResultView(
    { grants }: Readonly<{ grants: Grant[] }>,
): React.ReactElement {
    let x = grants.map((grant) => (<GrantAsListItem {...grant} />))
    return (
        <ul className={""}>
            { x }
        </ul>
    )
}