/**
 * @file Declares Follow data type representing relationship between
 * users and users, as in user follows a users
 */

import User from "./User";

/**
 * @typedef Follow Represents Follow relationship between a user and another user
 * @property {User} User following the other
 * @property {User} User being followed
 */

export default interface Follow {
    follower: User,
    followie: User
};