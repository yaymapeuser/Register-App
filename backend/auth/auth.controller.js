const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }

    User.create (newUser, (err, user) =>{
        if (err && err.code === 11000 ) return res.status(409).send('Email already exists');

        if (err) return res.status(500).send('Server error ');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({id: user.id},
            SECRET_KEY, {
                expiresIn: expiresIn
            });
            const dataUser = {
                name: user.name,
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            //response
            res.send({ dataUser });
    });
};

exports.loginUser = (req, res) => {

    const userData = {
        email: req.body.email,
        password: req.body.password
    };

    User.findOne({email: userData.email}, (err, user) => {
        if(err) return res.status(500).send('Server error!');

        if(!user){
            //email does'nt exist
            res.status(409).send({messagge: 'Email doesnt exist'});
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if(resultPassword){
                const expireIn = 24 *60 *60;
                const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expireIn});
                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expireIn
                }
                res.send({ dataUser });
            } else {
                //password wrong
                res.status(409).send({ message: 'Password is wrong' });
            }
        }
    });

};