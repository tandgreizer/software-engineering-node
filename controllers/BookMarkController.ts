/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * Is the controller for bookmarks
 */
export default class BookMarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookMarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return bookmarkController
     */
    public static getInstance = (app: Express): BookMarkController => {
        if(BookMarkController.bookmarkController === null) {
            BookMarkController.bookmarkController = new BookMarkController();
            app.get("/users/:uid/bookmarks", BookMarkController.bookmarkController.myBookmarks);
            app.post("/users/:uid/bookmarks/:tid", BookMarkController.bookmarkController.bookmark);
            app.delete("/users/:uid/bookmarks/:tid", BookMarkController.bookmarkController.unmark);
            app.get("/bookmarks", BookMarkController.bookmarkController.getAllBookmarks);
            app.delete("/bookmarks", BookMarkController.bookmarkController.deleteAllBookmarks);

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
     * Bookmarks a tuit
     * @param req the request
     * @param res the response
     */
    bookmark = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.bookmark(req.params.uid, req.params.tid)
            .then(bookmark => res.json(bookmark));

    /**
     * unBookmarks a tuit
     * @param req the request
     * @param res the response
     */
    unmark = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.unmark(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * Deletes all bookmarks
     * @param req the request
     * @param res the response
     */
    deleteAllBookmarks = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.deleteAllBookmarks()
            .then(status => res.send(status));

    /**
     * Gets all the bookmarks in the database
     * @param req the request
     * @param res the response
     */
    getAllBookmarks = (req: Request, res: Response) =>
        BookMarkController.bookmarkDao.getAllBookmarks()
            .then(status => res.send(status));
};