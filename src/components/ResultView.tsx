import { Grant } from "@/internal/types";
import { GrantCard } from '@/components/GrantCard';
import { useMemo } from 'react';

interface ResultViewProps {
    grants: Grant[];
    searchQuery?: string;
}

export function ResultView({ grants, searchQuery = "" }: ResultViewProps): React.ReactElement {
    const sortedAndFilteredGrants = useMemo(() => {
        let filteredGrants = searchQuery 
            ? grants.filter(grant => 
                grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                grant.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : grants;

        return filteredGrants.sort((a, b) => {
            if (!a.deadline) return 1;
            if (!b.deadline) return -1;
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });
    }, [grants, searchQuery]);

    return (
        <div className="container mx-auto px-8 pr-12">
            {sortedAndFilteredGrants.length === 0 ? (
                <div className="text-center text-gray-500">
                    No grants found matching your criteria :(
                </div>
            ) : (
                <ul className="space-y-4">
                    {sortedAndFilteredGrants.map((grant) => (
                        <li key={grant.title}>
                            <GrantCard grant={grant} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}