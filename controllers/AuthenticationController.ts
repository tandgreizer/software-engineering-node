import UserDao from "../daos/UserDao";

const bcrypt = require('bcrypt');
const saltRounds = 10;
import {Express, Request, Response} from "express";

const AuthenticationController = (app: Express) => {

    const userDao: UserDao = new UserDao();

    const login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        console.log(password)
        if (password == null || username == null) {
            res.sendStatus(400)
        } else {
            const existingUser = await userDao
                .findUserByUsername(username);
            const match = await bcrypt.compare(password, existingUser.password);

            if (match) {
                existingUser.password = '*****';
                // @ts-ignore
                req.session['profile'] = existingUser;
                res.json(existingUser);
                console.log("sucsess")
            } else {
                res.sendStatus(403);
                console.log("fail")
            }
        }
    }

    const register = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao
            .findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    const profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        } else {
            // @ts-ignore
            console.log(req.session)
            res.sendStatus(403);
        }
    }

    const logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    app.post("/api/auth/login", login);
    app.post("/api/auth/register", register);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
}

export default AuthenticationController;

