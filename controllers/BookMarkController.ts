/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookMarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookMarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): BookMarkController => {
        if(BookMarkController.bookmarkController === null) {
            BookMarkController.bookmarkController = new BookMarkController();
            app.get("/users/:uid/bookmarks", BookMarkController.bookmarkController.myBookmarks);
            app.post("/users/:uid/bookmarks/:tid", BookMarkController.bookmarkController.bookmark);
            app.delete("/users/:uid/bookmarks/:tid", BookMarkController.bookmarkController.unmark);
        }
        return BookMarkController.bookmarkController;
    }

    private constructor() {}


    /**
     * Retrieves all bookmarks liked by a user from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays
     */
    myBookmarks = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.myBookmarks(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    bookmark = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.bookmark(req.params.uid, req.params.tid)
            .then(bookmark => res.json(bookmark));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    unmark = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.unmark(req.params.uid, req.params.tid)
            .then(status => res.send(status));
};