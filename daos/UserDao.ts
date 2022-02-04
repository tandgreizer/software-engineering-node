import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

// export default class UserDao implements UserDaoI {
//   async findAllUsers(): Promise<User[]> {
//     return await UserModel.find();
//   }
//   async findUserById(uid: string): Promise<User> {
//     return await UserModel.findById(userId);
//   }
//   async createUser(user: User): Promise<void> {
//     return await UserModel.create(user);
//   }
//   async deleteUser(uid: string):  Promise<any> {
//     return await UserModel.deleteOne({_id: userId});
//   }
//   async updateUser(uid: string, user: User): Promise<any> {
//     return await UserModel.updateOne({_id: userId}, {$set: user});
//   }
// }
//
