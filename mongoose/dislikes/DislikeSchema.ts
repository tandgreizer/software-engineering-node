import mongoose, {Schema} from "mongoose";

import Dislike from "../../models/Dislike";

/**
 * The schema for dislikes. field details can be found in the model.
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;