import mongoose, {Schema} from "mongoose";
import BookMark from "../../models/Bookmark";

/**
 * The schema for bookmarks. Implementation of fields is found in the models.
 */
const BookMarkSchema = new mongoose.Schema<BookMark>({
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
}, {collection: "bookmarks"});
export default BookMarkSchema;