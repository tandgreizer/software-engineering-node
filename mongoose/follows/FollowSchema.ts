import mongoose, {Schema} from "mongoose";
import Follow from "../../models/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    follower: {type: Schema.Types.ObjectId, ref: "UserModel"},
    followie: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;