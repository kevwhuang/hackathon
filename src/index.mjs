import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import url from 'url';

import router from './routes/employees.mjs';

const app = express();
const PORT = process.env.PORT || 8000;
const COLOR = '\x1b[35m%s\x1b[0m';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = (req, res, next) => {
    console.table({
        method: req.method,
        url: `${req.protocol}://${req.get('host')}${req.url}`,
        time: new Date().toUTCString(),
    });
    next();
};

app.listen(PORT, "127.0.0.1", () => console.log('\x1b[35m%s\x1b[0m', `Server listening on PORT ${PORT}.`));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(log);

app.use('/api', router);
