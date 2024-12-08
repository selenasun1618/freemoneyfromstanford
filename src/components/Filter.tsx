import { AcademicPosition, FilterState, RepresentingVSO } from "@/internal/types";

interface FilterProps {
    filterState: FilterState;
    onFilterChange: (newState: FilterState) => void;
}

export function Filter({ filterState, onFilterChange }: FilterProps): React.ReactElement {
    const handlePositionChange = (position: AcademicPosition.Type) => {
        onFilterChange({
            ...filterState,
            position: filterState.position === position ? null : position
        });
    };

    const handleVSOChange = (vso: RepresentingVSO.Type) => {
        onFilterChange({
            ...filterState,
            representingVSO: filterState.representingVSO === vso ? null : vso
        });
    };

    return (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow">
            <div>
                <h3 className="font-semibold mb-2">Academic Position</h3>
                <div className="space-y-2">
                    {AcademicPosition.values.map(position => (
                        <label key={position} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filterState.position === position}
                                onChange={() => handlePositionChange(position)}
                                className="rounded border-gray-300"
                            />
                            <span>{position}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-2">VSO Representation</h3>
                <div className="space-y-2">
                    {RepresentingVSO.values.map(vso => (
                        <label key={vso} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filterState.representingVSO === vso}
                                onChange={() => handleVSOChange(vso)}
                                className="rounded border-gray-300"
                            />
                            <span>{vso}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

