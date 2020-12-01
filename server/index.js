import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoute";
import categoryRoutes from "./routes/categoryRoute";
import articleRoutes from './routes/articleRoute';
import queryRoutes from './routes/queryRoute';
import profileRoutes from './routes/profileRoute';
import viewRoutes from './routes/viewRoute';

mongoose.connect(
    "mongodb://127.0.0.1:27017/celestin-brand",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    } 
).catch(err => {
    console.log(err);
});

mongoose.Promise = global.Promise;

const app = express();

app.use("/assets", express.static("assets"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use("/user", userRoutes);
app.use("/article-category", categoryRoutes);
app.use("/article", articleRoutes);
app.use("/query", queryRoutes)
app.use("/profile", profileRoutes);
app.use("/view", viewRoutes);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method = "OPTION"){
        res.header('Accept-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
})
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running...");
})

