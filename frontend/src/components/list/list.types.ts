import { Key } from "react";

export interface ListInterface {
    _id: string,
    owner: string,
    name: string,
    from: string,
    to: string[],
    terms: TermElementInterface[],
    sessions?: any[],
    created: Date,
    lastReviewed: Date,
    setMembership?: any[],
    state: {forwards: string, backwards: string}
}

export interface TermElementInterface {
    _id?: string,
    saturation: {forwards: string, backwards: string},
    element: JSX.Element  // @todo: create ListTermElementInterface after converting ListTerm to TypeScript, and replace this
}

export interface FilterInterface {
    saturation: { level: number | null, direction: "any" | "forwards" | "backwards"}
}

export interface TermInterface {
    _id: string,
    owner: string,
    languages: {from: string, to: string},
    to: string,
    from: string,
    history: {date:Date, content: any[], direction: string}[],
    saturation: {forwards: number | null, backwards: number | null},
    listMembership: any[]
}

export interface TermPropsInterface {
    idx: number,
    term: TermElementInterface,
    key: Key,
    handleTermDelete: (idx: number) => void
}