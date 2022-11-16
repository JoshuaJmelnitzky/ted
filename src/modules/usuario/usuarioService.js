import { UserDaoMongoDb }  from './usuarioPersistence.js';

export class UserService {
  constructor() {
    this.dao = new UserDaoMongoDb();
  }
  

  async findUser(username) {
    return await this.dao.getUserById(username);
  }

  async updateById(username, newData) {
    return await this.dao.updateById(username, newData);
  }

  async getListUsers() {
    const allUsers = await this.dao.getUsers();
    return allUsers;
  }

    
};
    
