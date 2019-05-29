import * as Hapi from "hapi";
import * as Joi from "joi";
import HobbyController from "./hobby-controller";
import * as HobbyValidator from "./hobby-validator";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";

export default function (
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  const hobbyController = new HobbyController(configs, database);
  server.bind(hobbyController);

  server.route({
    method: "GET",
    path: "/hobbies/{id}",
    options: {
      auth: false,
      handler: hobbyController.getHobbyById,
      tags: ["api", "hobbies"],
      description: "Get hobby by id.",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Hobby founded."
            },
            "404": {
              description: "Hobby does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "GET",
    path: "/hobbies",
    options: {
      auth: false,
      handler: hobbyController.getHobbies,
      tags: ["api", "hobbies"],
      description: "Get all hobbies.",
      validate: {
        query: {
          top: Joi.number().default(10000),
          skip: Joi.number().default(0)
        }
      }
    }
  });

  server.route({
    method: "DELETE",
    path: "/hobbies/{id}",
    options: {
      auth: false,
      handler: hobbyController.deleteHobby,
      tags: ["api", "hobbies"],
      description: "Delete hobby by id.",
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Hobby."
            },
            "404": {
              description: "Hobby does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "PUT",
    path: "/hobbies/{id}",
    options: {
      handler: hobbyController.updateHobby,
      auth: false,
      tags: ["api", "hobbies"],
      description: "Update hobby by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: HobbyValidator.updateHobbyModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Hobby."
            },
            "404": {
              description: "Hobby does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/hobbies",
    options: {
      handler: hobbyController.createHobby,
      auth: false,
      tags: ["api", "hobbies"],
      description: "Create a hobby.",
      validate: {
        payload: HobbyValidator.createHobbyModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created Hobby."
            }
          }
        }
      }
    }
  });
}
