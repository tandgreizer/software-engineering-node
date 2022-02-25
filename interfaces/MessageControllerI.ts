import {Request, Response} from "express";

/**
 * @file represents the FollowController
 */
export default interface FollowControllerI {
    messageUser (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    messagesISent (req: Request, res: Response): void;
    messagesSentToMe (req: Request, res: Response): void;
    deleteAllMessages (req: Request, res: Response): void;
    getAllMessages (req: Request, res: Response): void;
    // followFollowers (req: Request, res: Response): void;
    // followFollowies (req: Request, res: Response): void;
};