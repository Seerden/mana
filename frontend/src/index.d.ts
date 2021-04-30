interface Document {
    _id: string
}

interface List extends Document {  // note: the string[] are ObjectId[] in reality, but we don't have access to mongoose types here
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

interface Term extends Document{
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