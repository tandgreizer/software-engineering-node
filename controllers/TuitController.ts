import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tid', this.findTuitById);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
        this.app.put('/tuits/:tid', this.updateTuit);
        this.app.get('/users/:uid/tuits', this.findTuitsByUser);
    }

  /**
   * Finds all the tuits in the database
   * @param req the request
   * @param res the response
   */
    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
  /**
   * Finds a specific tuit by id
   * @param req the request
   * @param res the response
   */
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));
  /**
   * Finds all the tuits by one user
    * @param req
   * @param res
   */
  findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuits => res.json(tuits));
  /**
   * Creates a tuit
   * @param req the request
   * @param res the response
   */
  createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
  /**
   * Deletes a tuit
   * @param req the request
   * @param res the response
   */
  deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));
  /**
   * Updates a tuit
   * @param req the resquest
   * @param res the response
   */
  updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));




}

