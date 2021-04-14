import mongoose from 'mongoose';
export const setSchema = new mongoose.Schema({
    owner: String,
    name: { type: String, unique: true },
    description: { type: String, maxlength: 512 },
    tags: [{ type: String }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
}, { collation: { locale: 'en', strength: 2 } });
//# sourceMappingURL=setSchema.js.map