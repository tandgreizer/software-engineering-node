import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/Like";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
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
      async (uid: string, tid: string): Promise<any> =>
          LikeModel.findOne(
              {tuit: tid, likedBy: uid});

  countHowManyLikedTuit =
      async (tid: string): Promise<any> =>
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

    /**
     * Tells the database a user has disliked a tuit
     * @param uid the user
     * @param tid the tuit
     */
    userDisLikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});
    /**
     * Tell the database a user has disliked a tuit
     * @param uid the user
     * @param tid the tuit
     */
    userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    findUserDisLikesTuit =
        async (uid: string, tid: string): Promise<any> =>
            DislikeModel.findOne(
                {tuit: tid, dislikedBy: uid});

    countHowManyDisLikedTuit =
        async (tid: string): Promise<any> =>
            DislikeModel.count({tuit: tid});
}