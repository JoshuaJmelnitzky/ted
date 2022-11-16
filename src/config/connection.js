import mongoose from 'mongoose';
const { MONGO } = process.env;

let connection = null;
export class Database {
  constructor() {

    const config = {
        mongoDb: {
            url: MONGO,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }
    }

    const connectToMongoAtlas = () => {
        try {
            mongoose.connect(config.mongoDb.url, config.mongoDb.options);
            console.log('conectado a Mongo Atlas');
        }catch(e) {
            console.log('Error al conectar con Mongo Atlas');
        }
    }
    this.connection = connectToMongoAtlas();   
  }
  
    static getConnection() {
        if (!connection) connection = new Database();
        return connection;
    }
};

