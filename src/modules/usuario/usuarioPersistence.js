import { ClientMongoDb }  from '../../config/mongoDB.js'
import  User  from '../../models/User.js';
import { Database }  from '../../config/connection.js';

const connect = Database.getConnection(); 

export class UserDaoMongoDb {
    constructor() {
        this.clientMongoDb = new ClientMongoDb(User, connect);
    }

    async getUserById(username) {
        const dto = await this.clientMongoDb.getUserById(username);
        if (dto.length == 0) return dto;
        else return (dto[0]);
    }

    async updateById(id, actividad) {
        const dto = await actividad;
        return this.clientMongoDb.replaceUserById(id, dto);
    }

    
    async getUsers() {
        return await this.clientMongoDb.getAll();
  }
};


