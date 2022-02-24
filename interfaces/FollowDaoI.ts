import Follow from "../models/Follow";
import {Request, Response} from "express";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface FollowDaoI {
    followUser (uid1: string, uid2: string): Promise<Follow>;
    unfollowUser (uid1: string, uid2: string): Promise<any>;

    whoDoIFollow (uid: string): Promise<Follow[]>;
    whoFollowsMe (uid: string): Promise<Follow[]>;

    // followFollowers (uid1: string, uid2: string): Promise<Follow[]>;
    // followFollowies (uid1: string, uid2: string): Promise<Follow[]>;

};