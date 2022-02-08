import Tuit from "./Tuit";
import Tag from "./Tag";
import * as mongoose from "mongoose";

export default class Tuit2Tag extends mongoose.SchemaType {
  private tag: Tag = new Tag();
  private tuit: Tuit = new Tuit();
};