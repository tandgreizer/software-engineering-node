import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";



export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/users/:uid/messages", MessageController.messageController.messagesISent);
            app.get("/users/messages/:uid", MessageController.messageController.messagesSentToMe);
            app.post("/users/messages/", MessageController.messageController.messageUser);
            app.delete("/messages/:mid", MessageController.messageController.deleteMessage);
            app.get("/messages", MessageController.messageController.getAllMessages);
            app.delete("/messages", MessageController.messageController.deleteAllMessages);

        }
        return MessageController.messageController;
    }


    private constructor() {}

    messageUser = (req: Request, res: Response) =>
        MessageController.messageDao.messageUser(req.body)
            .then(message => res.json(message));

    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.send(status));

    messagesISent = (req: Request, res: Response) =>
        MessageController.messageDao.messagesISent(req.params.uid)
            .then(messages => res.json(messages));

    messagesSentToMe = (req: Request, res: Response) =>
        MessageController.messageDao.messagesSentToMe(req.params.uid)
            .then(messages => res.json(messages));

    deleteAllMessages= (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessages()
            .then(status => res.json(status));

    getAllMessages= (req: Request, res: Response) =>
        MessageController.messageDao.getAllMessages()
            .then(messages => res.json(messages));


}