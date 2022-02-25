import Message from "../models/Message";
import {Request, Response} from "express";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    messageUser (message: Message): Promise<Message>;
    deleteMessage (mid: string): Promise<any>;

    messagesISent (uid: string): Promise<Message[]>;
    messagesSentToMe (uid: string): Promise<Message[]>;

    // followFollowers (uid1: string, uid2: string): Promise<Follow[]>;
    // followFollowies (uid1: string, uid2: string): Promise<Follow[]>;

};