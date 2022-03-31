import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/Like";
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

  /**
   * Returns all the users that have liked a tuit
   * @param tid the id of the tuit
   */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();
  /**
   * Returns all the tuits liked by a users
   * @param uid the id of the user
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

  findUserLikesTuit =
      async (uid, tid) =>
          LikeModel.findOne(
              {tuit: tid, likedBy: uid});

  countHowManyLikedTuit =
      async (tid) =>
          LikeModel.count({tuit: tid});



  /**
   * Tells the database a user has liked a tuit
   * @param uid the user
   * @param tid the tuit
   */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});
  /**
   * Tell the database a user has unliked a tuit
   * @param uid the user
   * @param tid the tuit
   */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}