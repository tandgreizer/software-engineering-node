import User from "../models/User";

/**
 * @file declares the API for the user dao
 */
export default interface UserDao {
  findAllUsers(): Promise<User[]>;
  findUserById(uid: string): Promise<any>;
  createUser(user: User): Promise<User>;
  updateUser(uid: string, user: User): Promise<any>;
  deleteUser(uid: string): Promise<any>;
  deleteAllUsers (): Promise<any>;
}
