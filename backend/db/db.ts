import { config } from "dotenv";
import mongoose from "mongoose";
config();
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const { DB_USER, DB_PASS, DB_NAME } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@mana-cluster0.8vpgs.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
export const dbConn = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
dbConn.on("connected", () => console.log("connected to db"));
dbConn.on("error", (error) => console.log("error connecting to db"));
