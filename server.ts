import express, {Request, Response} from 'express';
var cors = require('cors')

import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookMarkController from "./controllers/BookMarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/AuthenticationController";
const session = require("express-session");
/**
 * @file The server file for the tuiter database. Allows access to controllers
 */
const app = express();
const mongoose = require('mongoose');
app.use(cors({
    credentials: true,


}));


app.use(express.json());


let sess = {
    secret: "secretTest",
    cookie: {
        secure: false
    }
}
console.log(process.env)
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
mongoose.connect("mongodb+srv://asign2:asign2@cluster0.dj9j0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");


app.use(express.urlencoded());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

app.get('/', (req:Request, res: Response) =>
res.send('Welcome To A4'));

const userController = new UserController(app,new UserDao());
const tuitController = new TuitController(app, new TuitDao());
const likesController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookMarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
AuthenticationController(app);

console.log("Starting up");

const PORT = 4000;
app.listen(process.env.PORT || PORT);
//seing if this lets me branchdd