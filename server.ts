import express, {Request, Response} from 'express';

import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";


const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tuiter');

app.use(express.json());
app.use(express.urlencoded());


app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

app.get('/', (req:Request, res: Response) =>
res.send('Welcome'));

const userController = new UserController(app,new UserDao());
const tuitController = new TuitController(app, new TuitDao());



const PORT = 4000;
app.listen(process.env.PORT || PORT);