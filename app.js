const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multiparty = require('multiparty');
const fs = require('fs');
const sharp = require('sharp');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://dart-hit:qwerty123zxc34@cluster0.ap1ucz1.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });

const usersSchema = new mongoose.Schema({
    userId: Number,
    phoneNumber: String,
    username: String,
    name: String,
    balance: Number,
    luck: Number,
    min_balance_to_payout: Number,
    deposit_amounts: Array,
    hasBeenCounted: Boolean
});

const Users = mongoose.model('users', usersSchema);

//http://localhost:5173
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.sendFile(__dirname);
});

app.use('/uploads', express.static('uploads'));

//app.post('/add', async (req, res) => {
//    const userId = req.body.userId; 
//    const phoneNumber = req.body.phoneNumber;
//
//    try {
//        const newItem = new Users({
//            userId: Number,
//            phoneNumber: String,
//            username: String,
//            name: String,
//            balance: Number,
//            luck: Number,
//            min_balance_to_payout: Number,
//            deposit_amounts: Array,
//            hasBeenCounted: Boolean
//        });
//
//        await newItem.save();
//        return res.json({ message: 'Файл успешно сохранен' });
//    } catch (error) {
//        console.error('Ошибка при сохранении ссылки на фото', error);
//        return res.status(500).json({ error: 'Произошла ошибка при сохранении ссылки на фото' });
//    }
//
//});

app.get('/users', async (req, res) => {
    try {
        const items = await Users.find({});
        res.json(items);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    const Id = req.params.id;
    try {
        await Users.findOneAndDelete({ _id: Id });
        res.sendStatus(200);
    } catch (error) {
        console.error('Ошибка при удалении отзыва', error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log('Server is running');
});
