import { z } from 'zod'

export namespace AcademicPosition {
    export const values = ['Undergraduate', 'MastersStudent', 'Coterm', 'PhD', 'Postdoc', 'Faculty', 'Other'] as const
    export const schema = z.enum(values)
    export type Type = (typeof values)[number]
    export const defaultValue: Type = 'Other'
}

export namespace RepresentingVSO {
    export const values = ['Undergraduate','Graduate','None'] as const
    export const schema = z.enum(values)
    export type Type = (typeof values)[number]
    export enum Enum {Undergraduate='Undergraduate',Graduate='Graduate',None='None'}
    export const defaultValue: Type = 'None'
}

export namespace SortBy {
    export const values = ['Amount', 'Deadline'] as const
    export const schema = z.enum(values)
    export type Type = (typeof values)[number]
    export enum Enum {Amount='Amount',Deadline='Deadline'}
    export const defaultValue: Type = Enum.Amount
}

export namespace SortOrder {
    export const values = ['Ascending', 'Descending'] as const
    export const schema = z.enum(values)
    export type Type = (typeof values)[number]
    export enum Enum {Ascending='Ascending',Descending='Descending'}
    export const defaultValue: Type = Enum.Descending
}

export type Grant = {
    id: string,

    title: string,
    description: string,

    eligibleAcademicPositions: AcademicPosition.Type[],
    eligibleVSORepresentation: RepresentingVSO.Type[],
    otherEligibilityConditions: string[],

    amountMin: number | null,
    amountMax: number | null,

    url: string,
    deadline: Date,
    nextCycleStartDate: Date,
}

export type GrantDatabase = {
    readonly [key: string]: Grant,
}
export type EmbeddingsDatabase = {
    readonly [key: string]: Embedding,
}

export type Embedding = {
    vector: number[],
}

export type GrantSortConfig = {
    sortBy: SortBy.Type,
    sortOrder: SortOrder.Type,
}

export type FilterState = {
    /// Initialize to `null`.
    position: AcademicPosition.Type | null,
    /// Initialize to `null`.
    representingVSO: RepresentingVSO.Type | null,
    minAmount: number | null,
    sortBy: SortBy.Type,
    sortOrder: SortOrder.Type,
}

export type SearchState = {
    searchString: string,
}
