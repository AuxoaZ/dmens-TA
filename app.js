import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/db.js"
import SequelizeStore from "connect-session-sequelize"
import router from "./Routes/index.js"
import dotenv from "dotenv";
dotenv.config()

const app = express();
// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
  };
  
  app.use(cors(corsOptions));

const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db : db
})

app.use (session({
    secret : process.env.SESS_SECRET,
    resave : false,
    saveUninitialized : false,
    store : store,
    cookie : {
        secure : 'auto'
    }
}))
// app.use(cors({
//         credentials: true,
// }));



app.use(express.json())
app.use(router);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server up running...`);
})


// store.sync()

db.sync().then(() => {
    console.log('Database synchronized');
}).catch((err) => {
    console.error('Unable to synchronize the database:', err);
});