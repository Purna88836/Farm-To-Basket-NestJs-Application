import { DataSource } from 'typeorm';
import { Profile } from '../entity/Profile'; // import your entities
import { Product } from '../entity/Product';
import { Review } from '../entity/Review';
import { Notification } from '../entity/Notification';
import { CartItem } from '../entity/CartItem';
// import other entities

export const AppDataSource = new DataSource({
    type: "postgres", // as per ormconfig.jso
    host: "3.91.149.84",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "farmtobasketnestjs",
    entities: [Profile, Product, Review, Notification, CartItem ],
    synchronize: false,
    migrations: ["src/migration/**/*.ts"],
});
