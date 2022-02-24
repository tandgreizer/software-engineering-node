import {Request, Response} from "express";

export default interface FollowControllerI {
    followUser (req: Request, res: Response): void;
    unfollowUser (req: Request, res: Response): void;
    whoDoIFollow (req: Request, res: Response): void;
    whoFollowsMe (req: Request, res: Response): void;
    // followFollowers (req: Request, res: Response): void;
    // followFollowies (req: Request, res: Response): void;
};