import * as Database from "../src/database";

export function createUserDummy() {
  var user = {
    name: "Dummy Jones"
  };

  return user;
}

export function clearDatabase(database: Database.IDatabase, done: MochaDone) {
  var promiseUser = database.userModel.remove({});
  var promiseHobby = database.hobbyModel.remove({});

  Promise.all([promiseUser, promiseHobby])
    .then(() => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}

export function createSeedUserData(database: Database.IDatabase, done: MochaDone) {
  database.userModel
    .create(createUserDummy())
    .then(user => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}
