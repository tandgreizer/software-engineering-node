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

    followUser = async (uid1: string, uid2: string): Promise<any> =>{
        return  FollowModel.create({follower: uid1, followie: uid2});
    }



    unfollowUser = async (uid1: string, uid2: string): Promise<any> =>{
        FollowModel.deleteOne({follower: uid1, followie: uid2});
    }





    whoDoIFollow = async (uid: string): Promise<any> =>{
        return  FollowModel
            .find({follower: uid})
            .populate("followie")
            .exec();
    }

    whoFollowsMe= async (uid: string): Promise<any> =>{
        return  FollowModel
            .find({followie: uid})
            .populate("follower")
            .exec();
    }
}