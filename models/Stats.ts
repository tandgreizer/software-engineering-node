/**
 * @file Declares Stats data type representing stats of a tuit.
 * @typedef Stats represents the stats of a tuit
 * @property {number} replies how many replies there are
 * @property {number} retuits how many retuits there are
 * @property {number} likes how many likes there are
 */
export default interface Stats {
    replies?: number,
    retuits: number,
    likes: number
};