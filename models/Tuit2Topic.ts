import Topic from "./Topic";
import Tuit from "./Tuit";
import mongoose from "mongoose";

export default class Tuit2Topic extends mongoose.SchemaType{
  private topic: Topic = new Topic();
  private tuit: Tuit = new Tuit();
};