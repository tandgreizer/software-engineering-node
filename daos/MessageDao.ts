import MessageDaoI from "../interfaces/MessageDaoI";

import Follow from "../models/Follow";
import MessageModel from "../mongoose/messages/MessageModel";
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    messageUser = async (uid1: string, uid2: string): Promise<any> =>{
        return  MessageModel.create({fromUser: uid1, toUser: uid2});
    }



    deleteMessage = async (mid: string): Promise<any> =>{
        MessageModel.deleteOne({_id: mid});
    }





    messagesISent = async (uid: string): Promise<any> =>{
        return  MessageModel
            .find({fromUser: uid})
            .populate("toUser")
            .exec();
    }

    messagesSentToMe = async (uid: string): Promise<any> =>{
        return  MessageModel
            .find({toUser: uid})
            .populate("fromUser")
            .exec();
    }
}