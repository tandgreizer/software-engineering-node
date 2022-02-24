import {Request, Response} from "express";

export default interface FollowControllerI {
    messageUser (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    messagesISent (req: Request, res: Response): void;
    messagesSentToMe (req: Request, res: Response): void;
    // followFollowers (req: Request, res: Response): void;
    // followFollowies (req: Request, res: Response): void;
};