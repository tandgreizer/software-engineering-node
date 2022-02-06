import User from "./User";
import Tuit2Tag from "./Tuit2Tag";
import Tuit2Topic from "./Tuit2Topic";

export default class Tuit {
  private tuit: string = '';
  private postedOn: Date = new Date();
  private postedBy: string = '';
  private tuit2tags: Tuit2Tag[] = [];
  private tuit2topic: Tuit2Topic[] = [];
}

