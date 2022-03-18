import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import scheduleRouter from './router/schedule.js';
import remoteRouter from './router/remote.js';

const __dirname = path.resolve();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public-flutter')));
app.use(cors('*'));

app.use('/schedule', scheduleRouter);
app.use('/remote', remoteRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})


app.listen(3000);