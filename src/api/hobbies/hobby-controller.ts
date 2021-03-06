import * as Hapi from "hapi";
import * as Boom from "boom";
import { IHobby } from "./hobbies";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import { Request } from "hapi";
import { ILogging } from "../../plugins/logging/logging";

//Custom helper module
import * as Helper from "../../utils/helper";

export default class HobbyController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.configs = configs;
    this.database = database;
  }

  public async createHobby(request: Request, h: Hapi.ResponseToolkit) {
    var newHobby: IHobby = <IHobby>request.payload;

    try {
      let hobby: IHobby = await this.database.hobbyModel.create(newHobby);
      return h.response(hobby).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async updateHobby(request: Request, h: Hapi.ResponseToolkit) {
    let _id = request.params["id"];

    try {
      let hobby: IHobby = await this.database.hobbyModel.findByIdAndUpdate(
        { _id }, //ES6 shorthand syntax
        { $set: request.payload },
        { new: true }
      );

      if (hobby) {
        return hobby;
      } else {
        return Boom.notFound();
      }
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteHobby(request: Request, h: Hapi.ResponseToolkit) {
    let _id = request.params["id"];

    let deletedHobby = await this.database.hobbyModel.findOneAndRemove({
      _id
    });

    if (deletedHobby) {
      return deletedHobby;
    } else {
      return Boom.notFound();
    }
  }

  public async getHobbyById(request: Request, h: Hapi.ResponseToolkit) {
    let _id = request.params["id"];

    let hobby = await this.database.hobbyModel.findOne({ _id })
      .lean(true);

    if (hobby) {
      return hobby;
    } else {
      return Boom.notFound();
    }
  }

  public async getHobbies(request: Request, h: Hapi.ResponseToolkit) {
    let top = request.query["top"];
    let skip = request.query["skip"];
    let hobbies = await this.database.hobbyModel
      .find({})
      .lean(true)
      .skip(skip)
      .limit(top);

    return hobbies;
  }
}
