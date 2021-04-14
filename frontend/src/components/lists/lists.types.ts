import ListsItem from './ListsItem';

export type Color = 'seagreen' | 'teal' | 'yellowgreen' | 'orange' | 'orangered' | '#333';

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

export interface ListsItemProps {
    list: any, // @todo: refine type using as yet nonexistent global list type
}