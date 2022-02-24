/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */

import User from "./User";
import Tuit from "./Tuit";

/**
 * @typedef Bookmark Represents bookmark relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {User} User bookmarking
 * @property {tuit} tuit marked
 */

export default interface Bookmark {
    user: User,
    tuit: Tuit
};