import IUser from "../models/user";
declare global {
  namespace Express {
    interface User extends IUser {
      user;
      accessToken?: string;
    }
    interface AuthInfo {
      message: string;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      SEQUELIZE_PASSWORD: string;
    }
  }
}
