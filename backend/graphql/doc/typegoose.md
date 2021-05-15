- Ensure that all _id fields are properly typed as ObjectId (imported from 'mongodb'),

- If searching a model by id (e.g. ListModel.findById(listId)), ensure that we cast listId to ObjectId by using listId = new mongoose.Types.ObjectId(listIdAsStringFromClient)

- If using model.find in a TypeGraphQL resolver (probably isn't specific to TypeGraphQL or even GraphQL at all), also use .lean().exec(), otherwise we return a complicated mongoose object that's not easily mappable
    - for example, the following wouldn't work:
        ```javascript
            const lists = await ListModel.find({ owner })
            const listIds = lists.map(list => list._id)
        ```
    because each 'list' isn't a POJO, but a mongoose object, in which the object we want is stored in the _doc property.

    If we add .lean().exec() to the first line above, we _can_ execute the second line just fine.