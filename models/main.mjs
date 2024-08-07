import "dotenv/config"
import { Sequelize } from 'sequelize';
import postModel from "./postModel.mjs"

export const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
});

export const Post = postModel(sequelize);

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((error) => {
        console.error('Error creating database & tables:', error);
    });