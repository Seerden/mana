import { GraphQLClient } from "graphql-request";
import { uri } from "../../../helpers/graphql-uri";

const requestClient = new GraphQLClient(uri, {
	credentials: "include",
	mode: "cors",
});

export default requestClient;
