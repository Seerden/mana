import ListsItem from './ListsItem';

export type ColorType = 'seagreen' | 'teal' | 'yellowgreen' | 'orange' | 'orangered' | '#333';

export interface ListsElement {
    name: string,
    state: {forwards: string | null, backwards: string | null},
    lastReviewed: Date | null,        
    created: Date,
    element: typeof ListsItem
}

export type UseListsReturn = {
    lists: any,    
    filteredListsElement: Array<typeof ListsItem>,
    handleFilterChange: React.ChangeEventHandler<HTMLInputElement>,
    handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>,
    setRequest: Function | null | undefined,
    filter: string,
    sortBy: string
};