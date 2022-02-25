import mongoose from "mongoose";
import User from "../models/User";
import Tuit2Tag from "../models/Tuit2Tag";
import Tuit2Topic from "../models/Tuit2Topic";

/**
 * The schema for tuits, The model file contains the meaning of each feild
 */
const TuitSchema = new mongoose.Schema({
    tuit: String,
    postedOn: Date,
    postedBy: String,
}, {collection: 'tuits'});
export default TuitSchema;