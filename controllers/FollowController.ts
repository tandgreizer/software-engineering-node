/**
 * @file Controller RESTful Web service API for follow resource
 */
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";



export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/users/:uid/follows", FollowController.followController.whoDoIFollow);
            app.get("/users/follows/:uid", FollowController.followController.whoFollowsMe);
            app.post("/users/:uid1/follows/:uid2", FollowController.followController.followUser);
            app.delete("/users/:uid1/follows/:uid2", FollowController.followController.unfollowUser);
            app.get("/follows", FollowController.followController.getAllFollows);
            app.delete("/follows", FollowController.followController.deleteAllFollows);

        }
        return FollowController.followController;
    }


    private constructor() {}

    /**
     * Follows a user
     * @param req the request
     * @param res the response
     */
    followUser = (req: Request, res: Response) =>
        FollowController.followDao.followUser(req.params.uid1, req.params.uid2)
            .then(follow => res.json(follow));
    /**
     * unfollows a user
     * @param req the request
     * @param res the resposne
     */
    unfollowUser= (req: Request, res: Response) =>
        FollowController.followDao.unfollowUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));
    /**
     * Returns who the user follows
     * @param req the request
     * @param res the response
     */
    whoDoIFollow= (req: Request, res: Response) =>
        FollowController.followDao.whoDoIFollow(req.params.uid)
            .then(follow => res.json(follow));
    /**
     * returns who follows the user
     * @param req the request
     * @param res the response
     */
    whoFollowsMe= (req: Request, res: Response) =>
        FollowController.followDao.whoFollowsMe(req.params.uid)
            .then(follow => res.json(follow));

    deleteAllFollows = (req: Request, res: Response) =>
        FollowController.followDao.deleteAllFollows()
            .then(status => res.json(status));

    getAllFollows = (req: Request, res: Response) =>
        FollowController.followDao.getAllFollows()
            .then(follow => res.json(follow));


}