import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import url from 'url';

// import routerEmployees from './routes/employees';

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = (req, res, next) => {
    console.table({
        time: new Date().toUTCString(),
        url: `${req.protocol}://${req.get('host')}${req.url}`,
        method: req.method,
    });
    next();
};

app.listen(PORT, () => console.log('\x1b[35m%s\x1b[0m', `Server listening on PORT ${PORT}.`));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(log);

// app.use('/employees', routerEmployees);
