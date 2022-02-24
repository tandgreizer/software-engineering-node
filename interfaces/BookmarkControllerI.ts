import {Request, Response} from "express";

export default interface BookmarkControllerI {
    bookmark (req: Request, res: Response): void;
    unmark (req: Request, res: Response): void;
    myBookmarks (req: Request, res: Response): void;

};