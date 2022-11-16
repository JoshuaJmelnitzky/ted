import { ActivitiesDaoMongoDb } from './actividadesPersistence.js'; 

export class ActivitiesService {
  constructor() {
    this.dao = new ActivitiesDaoMongoDb();
  }

  async createCart (user) {
    const timestamp = Date.now();
    const products = [];
    const email = user.username;
    const address = user.address;
    const newCart = {timestamp, products, email, address};
    const newC = await this.dao.saveCart(newCart);
    return newC.id;
  }
    
  async getActividades() {
    return await this.dao.getAll();
  }
    
  async updateCart(id, newData) {
    const updatedCart = await this.dao.updateById(id, newData);
    return updatedCart;
  }
}  

