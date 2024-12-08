import { Grant } from '@/internal/types';

interface GrantCardProps {
    grant: Grant;
}

export function GrantCard({ grant }: GrantCardProps): React.ReactElement {
    // Format the deadline date
    const formatDeadline = (deadline: string | Date) => {
        if (!deadline) return 'No deadline set';
        const date = deadline instanceof Date ? deadline : new Date(deadline);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    const getDaysLeft = (deadline: string | Date) => {
        if (!deadline) return null;
        const today = new Date();
        const deadlineDate = deadline instanceof Date ? deadline : new Date(deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : null;
    };

    const daysLeft = getDaysLeft(grant.deadline);

    // Format amount range
    const formatAmount = () => {
        if (!grant.amountMin || !grant.amountMax || grant.amountMin === -1 || grant.amountMax === -1) return 'Amount varies';
        if (grant.amountMin === grant.amountMax) {
            return `$${grant.amountMin.toLocaleString()}`;
        }
        return `$${grant.amountMin.toLocaleString()} - $${grant.amountMax.toLocaleString()}`;
    };

    return (
        <div className="rounded-3xl bg-cardinal-red-dark p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold">{grant.title}</h2>
                <div className="text-right">
                    <div>Due: {formatDeadline(grant.deadline)}</div>
                    {daysLeft && (
                        <div className="font-bold">{daysLeft} Days Left</div>
                    )}
                </div>
            </div>
            
            <div className="mt-2">
                <span className="font-medium">Eligibility: </span>
                {grant.eligibility.join(', ')}
            </div>
            
            <div className="mt-2">
                <span className="font-medium">Amount: </span>
                {formatAmount()}
            </div>
            
            <p className="mt-4 text-gray-200 line-clamp-3">Description: {grant.description}</p>
            
            <div className="flex justify-between items-center mt-4">
                {grant.url ? (
                    <a 
                        href={grant.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-white hover:text-gray-200"
                    >
                        Apply →
                    </a>
                ) : (
                    <span className="text-gray-300">Application not yet open</span>
                )}
                
                <button 
                    className="text-white hover:text-gray-200"
                    onClick={() => {
                        // TODO: Implement calendar functionality
                        console.log('Add to calendar clicked');
                    }}
                >
                    Add to calendar ↗
                </button>
            </div>
        </div>
    );
}