import { Key } from "react";

export interface TermElementInterface {
    _id?: string,
    saturation: {forwards: string, backwards: string},
    element: JSX.Element  // @todo: create ListTermElementInterface after converting ListTerm to TypeScript, and replace this
}

export interface FilterInterface {
    saturation: { level: number | null, direction: "any" | "forwards" | "backwards"}
}

export interface TermPropsInterface {
    idx: number,
    term: Term,
    key: Key,
    handleTermDelete: (idx: number) => void
}