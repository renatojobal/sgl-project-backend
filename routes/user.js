const express = require("express");
const app = express();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const verify_token = require('../middleware/auth');

app.get("/user", [verify_token], (req, res) => {
    User.find({
            state: true
        },
        (err, userDB) => {
            if (err) {
                return res.status.json({
                    ok: true,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                userDB
            });
        }
    ).populate("Roll");
});

app.post("/user", (req, res) => {
    let body = req.body;
    let userToSave = new User({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        userName: body.userName,
        password: bcrypt.hashSync(body.password, 10),
        age: body.age,
        roll: body.roll
    });

    userToSave.save((err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            data: userDB
        });
    });
});

app.put("/user/:id", verify_token, (req, res) => {
    let id = req.params.id;

    let body = req.body;

    let userToEdit = {
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        userName: body.userName,
        password: body.password,
        age: body.age,
        roll: body.roll
    };

    User.findByIdAndUpdate(
        id,
        userToEdit, {
            new: true,
            runValidators: true
        },
        (err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!userDB) {
                return res.status(400).json({
                    ok: false,
                    userDB
                });
            }
            res.status(200).json({
                ok: true,
                userDB
            });
        }
    );
});

app.delete("/user/:id", verify_token, (req, res) => {
    let id = req.params.id;
    let usarioState = {
        state: false
    };

    User.findByIdAndUpdate(
        id,
        usarioState, {
            new: true,
            runValidators: true
        },
        (err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!userDB) {
                ok: false,
                userDB;
            }

            res.status(200).json({
                ok: true,
                userDB
            });
        }
    );
});
module.exports = app;