import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

/**
 * Represents a User Controller object
 */
export default class UserController implements UserControllerI {
    app: Express;
    userDao: UserDao;
    constructor(app: Express, userDao: UserDao) {
        this.app = app;
        this.userDao = userDao;
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.delete('/users', this.deleteAllUsers);
        this.app.put('/users/:userid', this.updateUser);
        this.app.post("/login",
            this.login);

        // for testing. Not RESTful
        this.app.get("/users/create",
            this.createUser);
        this.app.get("/users/id/:uid/delete",
            this.deleteUser);
        this.app.get("/users/username/:username/delete",
            this.deleteUsersByUsername);
        this.app.get("/users/delete",
            this.deleteAllUsers);
    }

    /**
     * Finds all the users
     * @param req the request
     * @param res the response
     */
    findAllUsers = (req: Request, res: Response) => {
        console.log("Find ALL");
        this.userDao.findAllUsers()
            .then(users => res.json(users));
    }
    /**
     * Finds a specific user by the id
     * @param req the request
     * @param res the response
     */
    findUserById = (req: Request, res: Response) =>
        this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));

    /**
     * Creates a user
     * @param req the request
     * @param res the response
     */
    createUser = (req: Request, res: Response) => {
        //console.log(req.body);
        this.userDao.createUser(req.body)
            .then(user => res.json(user));}
    /**
     * Deletes a user
     * @param req the request
     * @param res the response
     */
    deleteUser = (req: Request, res: Response) =>
        this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
    /**
     * Updates a user object
     * @param req the request
     * @param res the response
     */
    updateUser = (req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));

    /**
     * Deletes all the users in the database
     * @param req the request
     * @param res he response
     */
    deleteAllUsers = (req: Request, res: Response) => {
        console.log("delete ALL");
        this.userDao.deleteAllUsers()
            .then(status => res.json(status));
    }

    deleteUsersByUsername = (req: Request, res: Response) => {
        this.userDao.deleteUsersByUsername(req.params.username)
            .then(status => res.send(status));
    }
    login = (req: Request, res: Response) =>
        this.userDao
            .findUserByCredentials(req.body.username, req.body.password)
            .then(user => {
                res.json(user)
            });

    register = (req: Request, res: Response) =>
        this.userDao.findUserByUsername(req.body.username)
            .then(user => {

            })
}

