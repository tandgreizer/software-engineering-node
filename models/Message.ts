/**
 * @file Declares Follow data type representing relationship between
 * users and users, as in user follows a users
 */

import User from "./User";

/**
 * @typedef Follow Represents Follow relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {User} User following the other
 * @property {User} User being followed
 */

export default interface Follow {
    fromUser: User,
    toUser: User,
    message: string
};