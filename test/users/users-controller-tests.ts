import * as chai from "chai";
import * as Configs from "../../src/configurations";
import * as Server from "../../src/server";
import * as Database from "../../src/database";
import * as Utils from "../utils";

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();

describe("UserController Tests", () => {
  let server;

  before(done => {
    Server.init(serverConfig, database).then(s => {
      server = s;
      done();
    });
  });

  beforeEach(done => {
    Utils.createSeedUserData(database, done);
  });

  afterEach(done => {
    Utils.clearDatabase(database, done);
  });

  it("Create user", async () => {
    var user = {
      name: "Test Testings"
    };

    const res = await server.inject({
      method: "POST",
      url: serverConfig.routePrefix + "/users",
      payload: user
    });

    var responseBody: any = JSON.parse(res.payload);
    assert.equal(201, res.statusCode);
    assert.isNotNull(responseBody.token);
  });
});
