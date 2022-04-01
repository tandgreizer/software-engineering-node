/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import LikeDislikeDao from "../daos/LikeDislikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";
import TuitDao from "../daos/TuitDao";

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
 * @property {LikeDislikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
  private static likeDislikeDao: LikeDislikeDao = LikeDislikeDao.getInstance();
  private static tuitDao: TuitDao = new TuitDao();
  private static likeController: LikeController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return TuitController
   */
  public static getInstance = (app: Express): LikeController => {
    if (LikeController.likeController === null) {
      LikeController.likeController = new LikeController();
      app.get("/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
      app.get("/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
      app.post("/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
      // app.delete("/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
      app.put("/users/:uid/likes/:tid",
          LikeController.likeController.userTogglesTuitLikes);
      app.put("/users/:uid/dislikes/:tid",
          LikeController.likeController.userTogglesTuitDisLikes);
      app.get("/users/:uid/likes/:tid", LikeController.likeController.findUserLikesTuit);
      app.get("/users/:uid/dislikes/:tid", LikeController.likeController.findUserDisLikesTuit);
      // app.delete("/users/:uid/undislikes/:tid", LikeController.likeController.userUnDislikesTuit);
    }
    return LikeController.likeController;
  }

  private constructor() {
  }

  /**
   * Retrieves all users that liked a tuit from the database
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the liked tuit
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   */
  findAllUsersThatLikedTuit = (req: Request, res: Response) =>
      LikeController.likeDislikeDao.findAllUsersThatLikedTuit(req.params.tid)
      .then(likes => res.json(likes));

  /**
   * Retrieves all tuits liked by a user from the database
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user liked the tuits
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the tuit objects that were liked
   */
  findAllTuitsLikedByUser = (req: Request, res: Response) =>{
    const uid = req.params.uid;
    // @ts-ignore
    const profile = req.session['profile'];
    const userId = uid === "me" && profile ?
        profile._id : uid;

    LikeController.likeDislikeDao.findAllTuitsLikedByUser(userId)
        .then(likes => {
          const likesNonNullTuits =
              likes.filter(like => like.tuit);
          const tuitsFromLikes =
              likesNonNullTuits.map(like => like.tuit);
          res.json(tuitsFromLikes);
        });

  }

  findAllTuitsDisLikedByUser = (req: Request, res: Response) =>{
    const uid = req.params.uid;
    // @ts-ignore
    const profile = req.session['profile'];
    const userId = uid === "me" && profile ?
        profile._id : uid;

    LikeController.likeDislikeDao.findAllTuitsDisLikedByUser(userId)
        .then(dislikes => {
          const likesNonNullTuits =
              dislikes.filter(dislike => dislike.tuit);
          const tuitsFromLikes =
              likesNonNullTuits.map(dislike => dislike.tuit);
          res.json(tuitsFromLikes);
        });

  }


  /**
   * @param {Request} req Represents request from client, including the
   * path parameters uid and tid representing the user that is liking the tuit
   * and the tuit being liked
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new likes that was inserted in the
   * database
   */
  userLikesTuit = (req: Request, res: Response) =>
      LikeController.likeDislikeDao.userLikesTuit(req.params.uid, req.params.tid)
      .then(likes => res.json(likes));




  userTogglesTuitLikes = async (req: Request, res: Response) => {
    const likeDislikeDao = LikeController.likeDislikeDao;
    const tuitDao = LikeController.tuitDao;
    const uid = req.params.uid;
    const tid = req.params.tid;
    // @ts-ignore
    const profile = req.session['profile'];
    const userId = uid === "me" && profile ?
        profile._id : uid;
    if (userId === "me") {
      res.sendStatus(503);
      return;
    }
    try {
      const userAlreadyLikedTuit = await likeDislikeDao.findUserLikesTuit(userId, tid);
      const userAlreadyDisLikedTuit = await likeDislikeDao.findUserDisLikesTuit(userId, tid);
      const howManyDisLikedTuit = await likeDislikeDao.countHowManyDisLikedTuit(tid);
      const howManyLikedTuit = await likeDislikeDao.countHowManyLikedTuit(tid);
      let tuit = await tuitDao.findTuitById(tid);
      if (userAlreadyLikedTuit) {
        await likeDislikeDao.userUnlikesTuit(userId, tid);
        tuit.stats.likes = howManyLikedTuit - 1;
      } else {
        await LikeController.likeDislikeDao.userLikesTuit(userId, tid);
        if (userAlreadyDisLikedTuit) {
          await LikeController.likeDislikeDao.userUnDislikesTuit(userId,tid)
          tuit.stats.dislikes = howManyDisLikedTuit - 1;
        }
        tuit.stats.likes = howManyLikedTuit + 1;
      }
      ;
      await tuitDao.updateLikes(tid, tuit.stats);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  }
  userTogglesTuitDisLikes = async (req: Request, res: Response) => {
    const likeDislikeDao = LikeController.likeDislikeDao;
    const tuitDao = LikeController.tuitDao;
    const uid = req.params.uid;
    const tid = req.params.tid;
    // @ts-ignore
    const profile = req.session['profile'];
    const userId = uid === "me" && profile ?
        profile._id : uid;
    try {
      const userAlreadyDisLikedTuit = await likeDislikeDao.findUserDisLikesTuit(userId, tid);
      const userAlreadyLikedTuit = await likeDislikeDao.findUserLikesTuit(userId, tid);
      const howManyDisLikedTuit = await likeDislikeDao.countHowManyDisLikedTuit(tid);
      const howManyLikedTuit = await likeDislikeDao.countHowManyLikedTuit(tid);
      let tuit = await tuitDao.findTuitById(tid);
      if (userAlreadyDisLikedTuit) {
        await likeDislikeDao.userUnDislikesTuit(userId, tid);
        tuit.stats.dislikes = howManyDisLikedTuit - 1;
      } else {
        if (userAlreadyLikedTuit) {
          await LikeController.likeDislikeDao.userUnlikesTuit(userId,tid)
          tuit.stats.likes = howManyLikedTuit - 1;
        }
        await LikeController.likeDislikeDao.userDisLikesTuit(userId, tid);
        tuit.stats.dislikes = howManyDisLikedTuit + 1;
      }
      ;
      await tuitDao.updateLikes(tid, tuit.stats);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(404);
    }
  }
  findUserLikesTuit = async (req: Request, res: Response) => {
    // @ts-ignore
    let userId = (req.params.uid === "my" || req.params.uid === "me") && req.session['profile'] ?
        // @ts-ignore
        req.session['profile']._id : req.params.uid;
    if (userId === "me") {
      res.sendStatus(503);
      return;
    }

    LikeController.likeDislikeDao.findUserLikesTuit(userId, req.params.tid).then(status => res.send(status))
  }

  findUserDisLikesTuit = async (req: Request, res: Response) => {
    // @ts-ignore
    let userId = (req.params.uid === "my" || req.params.uid === "me") && req.session['profile'] ?
        // @ts-ignore
        req.session['profile']._id : req.params.uid;
    if (userId === "me") {
      res.sendStatus(503);
      return;
    }

    LikeController.likeDislikeDao.findUserDisLikesTuit(userId, req.params.tid).then(status => res.send(status))
  }

  userUnlikesTuit= async (req: Request, res: Response) =>{
  }

};