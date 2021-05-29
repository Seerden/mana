import { Term } from "graphql/codegen-output";
import { Key } from "react";

export interface TermElementInterface {
    _id?: string,
    saturation: {forwards: string, backwards: string},
    element: JSX.Element  // @todo: create ListTermElementInterface after converting ListTerm to TypeScript, and replace this
}

export interface FilterInterface {
    saturation: { 
        level: number | { forwards: number, backwards: number} | undefined, 
        direction: "any" | "forwards" | "backwards"
    }
}

export interface TermPropsInterface {
    idx: number,
    term: Term,
    key: Key,
    handleTermDelete: (idx: number) => void
}

export interface TruncatedTerm {
    term: Term,
    element: JSX.Element,
    saturation: {
        forwards: number | null,
        backwards: number | null,
    }
}