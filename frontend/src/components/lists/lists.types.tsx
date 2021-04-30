import ListsItem from './ListsItem';

export type ColorType = 'seagreen' | 'teal' | 'yellowgreen' | 'orange' | 'orangered' | '#333';

export interface ListsElement {
    name: List['name'],
    state: List['state'],
    lastReviewed: List['lastReviewed'],        
    created: List['created'],
    element: typeof ListsItem
}

export type UseListsReturn = {
    lists: List[],    
    filteredListsElement: any,
    handleFilterChange: React.ChangeEventHandler<HTMLInputElement>,
    handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>,
    setRequest: Function | null | undefined,
    filter: string,
    sortBy: string
};