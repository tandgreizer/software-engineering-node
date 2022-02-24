import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Follow from "../models/Follow";
import BookMarkModel from "../mongoose/bookmarks/BookMarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    bookmark = async (uid1: string, tuid: string): Promise<any> =>{
        return  BookMarkModel.create({user: uid1, tuit: tuid});
    }

    unmark = async (uid1: string, tuid: string): Promise<any> =>{
        BookMarkModel.deleteOne({user: uid1, tuit: tuid});
    }



    myBookmarks = async (uid: string): Promise<any> =>{
        return  BookMarkModel
            .find({user: uid})
            .populate("tuit")
            .exec();
    }


}