import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Follow from "../models/Follow";
import BookMarkModel from "../mongoose/bookmarks/BookMarkModel";

/**
 * The data access object for bookmarks
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Bookmarks a tuit for a user
     * @param uid1 the user id
     * @param tuid the tuit id
     */
    bookmark = async (uid1: string, tuid: string): Promise<any> =>{
        return  BookMarkModel.create({user: uid1, tuit: tuid});
    }

    /**
     * unbookmarks a tuit for a user
     * @param uid1
     * @param tuid
     */
    unmark = async (uid1: string, tuid: string): Promise<any> =>{
        BookMarkModel.deleteOne({user: uid1, tuit: tuid});
    }


    /**
     * finds all the bookmarked tuits for a user
     * @param uid the user id
     */
    myBookmarks = async (uid: string): Promise<any> =>{
        return  BookMarkModel
            .find({user: uid})
            .populate("tuit")
            .exec();
    }

    /**
     * Gets all the bookmarks
     */
    getAllBookmarks = async (): Promise<any> =>{
        return  BookMarkModel
            .find().exec();
    }
    /**
     * Deletes all the bookmarks
     */
    deleteAllBookmarks = async (): Promise<any> =>{
        return  BookMarkModel
            .deleteMany({});
    }


}