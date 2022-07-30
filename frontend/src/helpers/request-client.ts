import { GraphQLClient } from "graphql-request";
import { uri } from "./graphql-uri";

const requestClient = new GraphQLClient(uri, {
	credentials: "include",
	mode: "cors",
});

export default requestClient;
