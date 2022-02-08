import mongoose from "mongoose";
import User from "../models/User";
import Tuit2Tag from "../models/Tuit2Tag";
import Tuit2Topic from "../models/Tuit2Topic";
const TuitSchema = new mongoose.Schema({
    tuit: String,
    postedOn: Date,
    postedBy: String,
     //tuit2tags: [Tuit2Tag],
     //tuit2topic: [Tuit2Topic]
}, {collection: 'tuits'});
export default TuitSchema;