import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";


/**
 * The message controller object
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Returns the instance of the message controller
     * @param app the express app
     */
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

    /**
     * Creates a message from one user to another, from the given json body
     * @param req the request
     * @param res the response
     */
    messageUser = (req: Request, res: Response) =>
        MessageController.messageDao.messageUser(req.body)
            .then(message => res.json(message));

    /**
     * Deletes a Message
     * @param req the request
     * @param res the response
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.send(status));

    /**
     * Returns all the messages that a given user has sent
     * @param req the request
     * @param res the response
     */
    messagesISent = (req: Request, res: Response) =>
        MessageController.messageDao.messagesISent(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Returns a list of all the messages sent to a user.
     * @param req the request
     * @param res the response
     */
    messagesSentToMe = (req: Request, res: Response) =>
        MessageController.messageDao.messagesSentToMe(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Deletes all messages in the database
     * @param req the request
     * @param res the response
     */
    deleteAllMessages= (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessages()
            .then(status => res.json(status));

    /**
     * Gets all messages in the database
     * @param req the request
     * @param res the response
     */
    getAllMessages= (req: Request, res: Response) =>
        MessageController.messageDao.getAllMessages()
            .then(messages => res.json(messages));


}