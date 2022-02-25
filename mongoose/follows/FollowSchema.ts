import mongoose, {Schema} from "mongoose";
import Follow from "../../models/Follow";

/**
 * The schema for follows. implementations of field is described in the model.
 */
const FollowSchema = new mongoose.Schema<Follow>({
    follower: {type: Schema.Types.ObjectId, ref: "UserModel"},
    followie: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;