import mongoose, {Schema} from "mongoose";
import Like from "../../models/Like";

/**
 * The schema for likes. field details can be found in the model.
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;