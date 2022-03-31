import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import UserModel from "../mongoose/UserModel";
import User from "../models/User";

export default class TuitDao implements TuitDaoI {
    /**
     * Finds all the tuits in the database
     * @returns promise and all the tuits
     */
    async findAllTuits(): Promise<Tuit[]>{
        return await TuitModel.find();
    }

    /**
     * Finds all the tuits of one user
     * @param uid the id of the user
     */
    async findTuitsByUser(uid: string): Promise<any> {
        return await TuitModel.find({postedBy: uid})

    }

    /**
     * Finds a specific tuit
     * @param tid the id of the tuit
     */
    async findTuitById(tid: string): Promise<any>{
        return await TuitModel.findById(tid);
    }

    /**
     * Creates a tuit
     * @param tuit the tuit to be created
     */
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

    async createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit> {
        return await  TuitModel.create({...tuit, postedBy: uid});
    }
    /**
     * Updates a tuit
     * @param tid the id of the tuit to update
     * @param tuit the new info for the  tuit
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid},  {$set: tuit});
    }

    /**
     * Deletes a tuit
     * @param tid the id of the tuit to delete
     */
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }

    async deleteTuitByContent(content: string): Promise<any> {
        return await TuitModel.deleteOne({tuit: content});
    }

    updateLikes =
        async (tid: string, newStats: any) =>
            TuitModel.updateOne(
                {_id: tid},
                {$set: {stats: newStats}});



}

