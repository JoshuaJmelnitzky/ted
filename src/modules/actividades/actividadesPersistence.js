import { ClientMongoDb } from '../../config/mongoDB.js';
import  Actividades   from'../../models/Actividades.js';
import { Database } from '../../config/connection.js';

const connect = Database.getConnection(); 

export class ActivitiesDaoMongoDb {
  constructor() {
    this.clientMongoDb = new ClientMongoDb(Actividades, connect);
  }

  async saveCart(cart) {
    const dto = await cart;
    return this.clientMongoDb.save(dto);
  }

  async getById(id) {
    const dto = await this.clientMongoDb.getById(id);
    return (dto[0]);
  }

  async getAll() {
    return await this.clientMongoDb.getAll();
  }
  
  async updateById(id, cart) {
    return this.clientMongoDb.replaceById(id, cart);
  }

}

