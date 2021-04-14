import mongoose from 'mongoose';
export const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    currentSession: { type: mongoose.Schema.Types.ObjectId }
}, { collation: { locale: 'en', strength: 2 } });
//# sourceMappingURL=userSchema.js.map