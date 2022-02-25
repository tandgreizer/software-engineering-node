import mongoose, {Schema} from "mongoose";
import Message from "../../models/Message";

/**
 * represents the schema for the messages. Feild details are found in the model.
 */
const MessageSchema = new mongoose.Schema<Message>({
    fromUser: {type: Schema.Types.ObjectId, ref: "UserModel"},
    toUser: {type: Schema.Types.ObjectId, ref: "UserModel"},
    message: "String",
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;