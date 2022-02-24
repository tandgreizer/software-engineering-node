import Follow from "../models/Follow";
import {Request, Response} from "express";
import Bookmark from "../models/Bookmark";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface BookmarkDaoI {
    bookmark (uid1: string, tuid: string): Promise<Bookmark>;
    unmark (uid1: string, tuid: string): Promise<any>;

    myBookmarks (uid: string): Promise<Bookmark[]>;


    // followFollowers (uid1: string, uid2: string): Promise<Follow[]>;
    // followFollowies (uid1: string, uid2: string): Promise<Follow[]>;

};