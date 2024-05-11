import { useState } from "react";


// AcademicPosition (check boxes): Undergraduate, Coterm, Master's, PhD, Faculty, PostDoc, VSO
// minAmount
// sortBy: amount, deadline

// FilterState, setFilterState, FilterUI

const academicPositions = [
    { id: 'undergraduate', label: "Undergraduate" },
    { id: 'coterm', label: "Coterm" },
    { id: 'masters', label: "Master's" },
    { id: 'phd', label: "PhD" },
    { id: 'faculty', label: "Faculty" },
    { id: 'postdoc', label: "PostDoc" },
    { id: 'vso', label: "VSO" }
];

export function AcademicPositionCheckboxes() {
    const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

    const handleCheckboxChange = (position: string) => {
        setSelectedPositions(prev => {
            if (prev.includes(position)) {
                return prev.filter(item => item !== position);
            } else {
                return [...prev, position];
            }
        });
    };

    return (
        <div>
            {academicPositions.map(position => (
                <label key={position.id}>
                    <input
                        type="checkbox"
                        checked={selectedPositions.includes(position.id)}
                        onChange={() => handleCheckboxChange(position.id)}
                    />
                    {position.label}
                </label>
            ))}
        </div>
    );
}

