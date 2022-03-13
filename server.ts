import express, {Request, Response} from 'express';

import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookMarkController from "./controllers/BookMarkController";
import MessageController from "./controllers/MessageController";

/**
 * @file The server file for the tuiter database. Allows access to controllers
 */
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://asign2:asign2@cluster0.dj9j0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

app.use(express.json());
app.use(express.urlencoded());


app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

app.get('/', (req:Request, res: Response) =>
res.send('Welcome To A2'));

const userController = new UserController(app,new UserDao());
const tuitController = new TuitController(app, new TuitDao());
const likesController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookMarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

console.log("Starting up");

const PORT = 4000;
app.listen(process.env.PORT || PORT);
//seing if this lets me branchdd