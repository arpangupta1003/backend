const express = require('express');
const bcrypt=require('bcryptjs');
const path = require('path');
require("C:/Users/arpan/OneDrive/Desktop/backend/loginpage/src/db/conn.js");

const app = express();
const hbs = require("hbs");
const User = require("./models/register");

const staticPath = path.join(__dirname, "../public");

const templatePath = path.join(__dirname, "../template/views");

const partialPath = path.join(__dirname, "../template/partials");

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/index', (req, res) => {
    res.render('index.hbs');
});
app.get('/signup', (req, res) => {
    res.render('signup.hbs');
});
app.get('/login', (req, res) => {
    res.render('login.hbs');
});
app.post('/signup', async (req, res) => {
    try {
        const pass = req.body.password;
        const cpass = req.body.confirmPassword;
        if (pass === cpass) {
            const registerUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                phoneNumber: req.body.phoneNumber,
                userName: req.body.userName
            })
            const registeredUser = await registerUser.save();

            res.status(201).render('index');
        }
        else {
            res.send("passwords not matching");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

})
// app.get('/login',(req,res)=>{
//     res.render('login.hbs');
// })
app.post('/login', async (req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;
        const userNamegiven = await User.findOne({ userName: userName });
        if (password === userNamegiven.password) {
            
            res.status(201).render('index');
        }
        else {
            // console.log(userName.password);
            res.status(400).send("Else Executed");
        }
    }
    catch (error) {
        res.status(400).send(`Invalid User Credentials${error} `);
    }
})
app.listen(port, () => {
    console.log(`Server running on port ${port}  successfully...`);
});