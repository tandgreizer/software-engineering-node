import mongoose, {Schema} from "mongoose";
import Message from "../../models/Message";

const MessageSchema = new mongoose.Schema<Message>({
    fromUser: {type: Schema.Types.ObjectId, ref: "UserModel"},
    toUser: {type: Schema.Types.ObjectId, ref: "UserModel"},
    message: "String"
}, {collection: "messages"});
export default MessageSchema;