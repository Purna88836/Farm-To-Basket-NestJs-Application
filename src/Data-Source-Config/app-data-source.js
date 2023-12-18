"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var Profile_1 = require("../entity/Profile"); // import your entities
var Product_1 = require("../entity/Product");
var Review_1 = require("../entity/Review");
var Notification_1 = require("../entity/Notification");
var CartItem_1 = require("../entity/CartItem");
// import other entities
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres", // as per ormconfig.json
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "farmtobasketnestjs",
    entities: [Profile_1.Profile, Product_1.Product, Review_1.Review, Notification_1.Notification, CartItem_1.CartItem],
    synchronize: false,
    migrations: ["src/migration/**/*.ts"],
});
