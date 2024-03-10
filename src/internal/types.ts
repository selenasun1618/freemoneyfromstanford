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

export type CycleInfo = {
    name: string,
    start: Date,
    end: Date,
}

// item { title description amount_min amount_max url deadline remaining_time_display() current_cycle next_cycle_range }
export type SearchResult = {
    title: string,
    description: string,
    amount_min: number,
    amount_max: number | string,
    url: string,
    deadline: Date,
    remainingTime: Date,
    currentCycle: CycleInfo,
    nextCycle: CycleInfo,
}

export type SearchState = {
    searchString: string,
    position: AcademicPosition.Type,
    representingVSO: RepresentingVSO.Type,

    filterMinAmount: boolean,
    minAmount: number | null,

    searchResults: SearchResult[],

    sortBy: SortBy.Type,
    sortOrder: SortOrder.Type,
}

export interface ParsedFormData {
    readonly searchString: string
    readonly position: AcademicPosition.Type
    readonly representingVSO: RepresentingVSO.Type
    readonly filterMinAmount: boolean
    readonly minAmount: number | null
    readonly sortBy: SortBy.Type
    readonly sortOrder: SortOrder.Type
}

