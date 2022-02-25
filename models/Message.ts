/**
 * @file Declares Message data type representing a message between
 * users
 */

import User from "./User";

/**
 * @typedef Message Represents a message between users,
 *
 * @property {User} fromUser following the other
 * @property {User} toUser being followed
 * @property {String} message the message body
 */

export default interface Message {
    fromUser: User,
    toUser: User,
    message: string
};