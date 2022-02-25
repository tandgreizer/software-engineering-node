import FollowDaoI from "../interfaces/FollowDaoI";

import Follow from "../models/Follow";
import FollowModel from "../mongoose/follows/FollowModel";
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}



    /**
     * Follows a user with another user
     * @param uid1 the user who is a follower
     * @param uid2 the user who is the followie
     */
    followUser = async (uid1: string, uid2: string): Promise<any> =>{
        return  FollowModel.create({follower: uid1, followie: uid2});
    }


    /**
     * Unfollows a user
     * @param uid1 the user who is a follower
     * @param uid2 the user who is the followie
     */
    unfollowUser = async (uid1: string, uid2: string): Promise<any> =>{
        FollowModel.deleteOne({follower: uid1, followie: uid2});
    }


    /**
     * Returns who the user follows
     * @param uid the user id
     */
    whoDoIFollow = async (uid: string): Promise<any> =>{
        return  FollowModel
            .find({follower: uid})
            .populate("followie")
            .exec();
    }
    /**
     * returns who follows the user
     * @param uid the user id
     */
    whoFollowsMe= async (uid: string): Promise<any> =>{
        return  FollowModel
            .find({followie: uid})
            .populate("follower")
            .exec();
    }

    getAllFollows = async (): Promise<any> =>{
        return  FollowModel
            .find()
            .exec();
    }
    deleteAllFollows = async (): Promise<any> =>{
        return  FollowModel
            .deleteMany({});
    }
}