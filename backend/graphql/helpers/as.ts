import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export function asObjectId(_id: string | ObjectId) {
	if (!(_id instanceof ObjectId)) {
		return new mongoose.Types.ObjectId(_id);
	}

	return _id;
}
