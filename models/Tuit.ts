import User from "./User";
import Stats from "./Stats";

/**
 * @file Declares Tuit data type representing a tuit.
 * @typedef Tuit a post by a user
 * @property {string} tuit the message of the tuit
 * @property {User} postedBy The User that posted the tuit
 * @property {Date} postedOn the date the tuit is posted
 * @property {String} image the image posted with the tuit
 * @property {String} youtube the youtube link
 * @property {String} avatarLogo the logo of the avatar
 * @property {String} imageOverlay the image overlay of the tuit
 * @property {Stats} stats the stats of the tuit
 */
export default interface Tuit {
  tuit: string,
  postedBy: User,
  postedOn?: Date,
  image?: String,
  youtube?: String,
  avatarLogo?: String,
  imageOverlay?: String,
  stats: Stats
};

