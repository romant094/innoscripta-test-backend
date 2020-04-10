const path = require('path');
const express = require('express');
const cors = require('cors');
const {v4} = require('uuid');
const app = express();
const port = 9000;

const getImagePath = image => path.resolve(__dirname, 'public/image', image);

const USERS = [];
const PRODUCTS = {
    pizza: [
        {
            title: 'Buffalo Chicken',
            ingredients: 'Grilled chicken, buffalo sauce, mozzarella, cheddar, red onions',
            img: getImagePath('buffalo-chicken.jpg'),
            price: 9.99,
            id: 'b9bea05a-f4e8-4564-956c-e7472447438b'
        },
        {
            title: 'Chicken BBQ',
            ingredients: 'Grilled chicken, bbq sauce, bacon, mozzarella, fresh basil, red onions',
            img: getImagePath('chicken-bbq.jpg'),
            price: 11.99,
            id: '084a82b5-0b47-40c8-b2ca-21de5362a8b4'
        },
        {
            title: 'Supreme',
            ingredients: 'Pepperoni, fresh basil, mozzarella, italian sausage, bacon, mushrooms, red onions, black olives, green peppers, marinara sauce',
            img: getImagePath('supreme.jpg'),
            price: 12.99,
            id: '7c284648-adb8-4908-a042-9ee2c0e6c8b5'
        },
        {
            title: 'Chicken Club',
            ingredients: 'Grilled chicken, cherry tomatoes, ricotta, fresh parsley, mozzarella, bacon, red onions',
            img: getImagePath('chicken-club.jpg'),
            price: 11.99,
            id: 'da7b23b2-07ef-49b9-9940-fa12edd74d78'
        },
        {
            title: 'Hawaiian',
            ingredients: 'Ham, fresh pineapple, mozzarella, marinara sauce, fresh basil',
            img: getImagePath('hawaiian.jpg'),
            price: 8.99,
            id: 'f74f4c6d-bcb4-468a-ad54-d2efdc7a9d4f'
        },
        {
            title: 'Sausage',
            ingredients: 'Double italian sausage, mozzarella, marinara sauce, fresh basil',
            img: getImagePath('sausage.jpg'),
            price: 9.99,
            id: 'bb64a9a8-eb28-4c75-8940-495e2c7d81b2'
        },
        {
            title: 'Pepperoni',
            ingredients: 'Double pepperoni, mozzarella, marinara sauce, fresh basil',
            img: getImagePath('pepperoni.jpg'),
            price: 9.99,
            id: 'f93005ed-5e6e-406d-a0e8-a972b82fba27'
        },
        {
            title: 'The Meats',
            ingredients: 'Pepperoni, ham, italian sausage, mozzarella, bacon, marinara sauce, fresh basil',
            img: getImagePath('the-meats.jpg'),
            price: 15.99,
            id: '41c3a32a-aeab-4e9f-9518-2b72be8ad36c'
        },
        {
            title: 'Spinach Feta',
            ingredients: 'Fresh spinach, feta, ricotta, mozzarella, fresh parsley, red onions',
            img: getImagePath('spinach-feta.jpg'),
            price: 7.99,
            id: '07b40b40-1199-48ad-8c0a-b863691dcb57'
        }
    ],
    salads: [],
    drinks: [],
    burgers: [],
    sushi: [],
    wok: []
};
const ORDERS = [];

app.use(express.json());
//TODO only for develop
app.use(cors());

app.post('/api/register', (req, res) => {
    const user = {
        ...req.body,
        id: v4()
    };
    USERS.push(user);
    res.json({
        msg: 'User created',
        user: {
            id: user.id,
            name: user.name
        }
    })
});

app.get('/api/login', (req, res) => {
    const {name, password} = req.body;
    const index = USERS.findIndex(item => item.name === name);
    if (index === -1) {
        res.json({
            msg: 'No user with login ' + name
        })
    }
    if (USERS[index].password === password) {
        res.json({
            msg: 'Logged in successfully'
        })
    } else {
        res.json({
            msg: 'Password is incorrect'
        })
    }
});

app.get('/api/products/:productType', (req, res) => {
    const id = req.params['productType'];
    setTimeout(() => res.json(PRODUCTS[id]), 1000);
});

app.post('/api/cart', (req, res) => {
    const data = req.body;
    res.status(201).json(data);
});

app.use(express.static(path.resolve(__dirname, 'client')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});
app.listen(port, () => console.log(`Server has been started on port ${port}...`));
