import { getClassForDocument } from "@typegoose/typegoose";
import { Document, Model } from "mongoose";
import { MiddlewareFn } from "type-graphql";

// from https://github.com/MichalLytek/type-graphql/blob/master/examples/typegoose/typegoose-middleware.ts
// Was having trouble properly implementing _ids in the TypeGraphQL classes without having to manually create them
//   for the typegoose models.
// This middleware may or may not be necessary for the handling of mongoose
//   document instances in TypeGraphQL resolvers.
export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
    const result = await next();

    if (Array.isArray(result)) {
        return result.map((item) =>
            item instanceof Model ? convertDocument(item) : item
        );
    }

    if (result instanceof Model) {
        return convertDocument(result);
    }

    return result;
};

function convertDocument(doc: Document) {
    const convertedDocument = doc.toObject();
    const DocumentClass = getClassForDocument(doc)!;
    Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
    return convertedDocument;
}
