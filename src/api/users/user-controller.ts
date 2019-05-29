import * as Hapi from "hapi";
import * as Boom from "boom";
import { IUser } from "./user";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import { Request } from "hapi";

export default class UserController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  public async createUser(request: Request, h: Hapi.ResponseToolkit) {
    try {
      let user: any = await this.database.userModel.create(request.payload);
      return h.response({ user }).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async updateUser(request: Request, h: Hapi.ResponseToolkit) {
    let id = request.params["id"];

    try {
      let user: IUser = await this.database.userModel.findByIdAndUpdate(
        id,
        { $set: request.payload },
        { new: true }
      );
      return user;
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteUser(request: Request, h: Hapi.ResponseToolkit) {
    let id = request.params["id"];
    let user: IUser = await this.database.userModel.findByIdAndRemove(id);

    return user;
  }

  public async getUsers(request: Request, h: Hapi.ResponseToolkit) {
    let top = request.query["top"];
    let skip = request.query["skip"];
    let users = await this.database.userModel
      .find({})
      .lean(true)
      .skip(skip)
      .limit(top);

    return users;
  }
}
