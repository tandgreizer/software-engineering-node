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
            app.get("/tuits/follows/:uid", FollowController.followController.whoFollowsMe);
            app.post("/users/:uid1/follows/:uid2", FollowController.followController.followUser);
            app.delete("/users/:uid1/follows/:uid2", FollowController.followController.unfollowUser);
        }
        return FollowController.followController;
    }


    private constructor() {}

    followUser = (req: Request, res: Response) =>
        FollowController.followDao.followUser(req.params.uid1, req.params.uid2)
            .then(follow => res.json(follow));

    unfollowUser= (req: Request, res: Response) =>
        FollowController.followDao.unfollowUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

    whoDoIFollow= (req: Request, res: Response) =>
        FollowController.followDao.whoDoIFollow(req.params.uid)
            .then(follow => res.json(follow));

    whoFollowsMe= (req: Request, res: Response) =>
        FollowController.followDao.whoFollowsMe(req.params.uid)
            .then(follow => res.json(follow));


}