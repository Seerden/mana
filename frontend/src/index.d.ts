interface ObjectId {
    _id: string
}

interface List {  // note: the string[] are ObjectId[] in reality, but we don't have access to mongoose types here
    _id: string
    owner: string,
    name: string,
    from: string,
    to: string[],
    terms: Term[],
    sessions: ObjectId[],
    created: Date,
    lastReviewed: Date,
    setMembership: ObjectId[],
    state: {
        forwards: string, 
        backwards: string
    }
}

interface Term {
    _id: string,
    owner: String,
    languages: { 
        from: String, 
        to: String 
    },
    to: String,
    from: String,
    history: Array<{ date: Date, content: Array, direction: String }>,
    saturation: {
        forwards: number | null,
        backwards: number | null
    },
    listMembership: ObjectId[],
}