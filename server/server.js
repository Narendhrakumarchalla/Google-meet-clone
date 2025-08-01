import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import http from 'http';
import userRoutes from './routes/userRoutes.js';
import connectDB from './lib/db.js';


const app = express()
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.use('/api/auth', userRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
}
);

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



