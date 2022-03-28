import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @file Declares User data type representing a user of the system
 * @typedef User represents a user of the system
 * @property {string} username the users username
 * @property {string} password the users password
 * @property {string} firstName the users first name
 * @property {string} lastName the users last name
 * @property {string} email the users email
 * @property {string} profilePhoto the users profile photo
 * @property {string} headerImage the image at the top of the users profile
 * @property {AccountType} accountType the type of account this user is
 * @property {MaritalStatus} maritalStatus the marital status of the user
 * @property {string} biography The biography of the user
 * @property {Date} dateOfBirth the birthday of the user
 * @property {Date} joined when the user created their account
 * @property {Location} the users location
 *
 * */
export default class User {
  private username: string = '';
  password: string = '';
  private firstName: string | null = null;
  private lastName: string | null = null;
  private email: string = '';
  private profilePhoto: string | null = null;
  private headerImage: string | null = null;
  private accountType: AccountType = AccountType.Personal;
  private maritalStatus: MaritalStatus = MaritalStatus.Single;
  private biography: string | null = null;
  private dateOfBirth: Date | null = null;
  private joined: Date = new Date();
  private location: Location | null = null;
}

