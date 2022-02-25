import MessageDaoI from "../interfaces/MessageDaoI";

import Follow from "../models/Follow";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/Message";

export default class MessageDao implements MessageDaoI {
  private static messageDao: MessageDao | null = null;
  public static getInstance = (): MessageDao => {
    if (MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  }

  private constructor() {
  }

  /**
   * Creates a message
   * @param message the message to be created
   */
  messageUser = async (message: Message): Promise<any> => {
    return MessageModel.create(message);
  }


  /**
   * Deteles a message
   * @param mid the id of the message to delete
   */
  deleteMessage = async (mid: string): Promise<any> => {
    MessageModel.deleteOne({_id: mid});
  }

  /**
   * Gets all the messages a user has sent
   * @param uid the user id
   */
  messagesISent = async (uid: string): Promise<any> => {
    return MessageModel
    .find({fromUser: uid})
    .populate("toUser")
    .exec();
  }

  /**
   * Gets all the messages a user has recieved
   * @param uid the user id
   */
  messagesSentToMe = async (uid: string): Promise<any> => {
    return MessageModel
    .find({toUser: uid})
    .populate("fromUser")
    .exec();
  }

  deleteAllMessages = async (): Promise<any> => {
    return MessageModel
        .deleteMany({})
  }

  getAllMessages= async (): Promise<any> => {
    return MessageModel
        .find()
        .exec();
  }
}