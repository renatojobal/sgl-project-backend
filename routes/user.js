const express = require("express");
const app = express();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const verify_token = require('../middleware/auth');

app.get("/usuario", [verify_token], (req, res) => {
    User.find({
            state: true
        },
        (err, usuarios) => {
            if (err) {
                return res.status.json({
                    ok: true,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                usuarios
            });
        }
    ).populate("Rol");
});

app.post("/usuario", (req, res) => {
    let body = req.body;
    let userToSave = new User({
        firstName: body.firstName,
        secondName: body.secondName,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        email: body.email,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    });

    userToSave.save((err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!usuarios) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            data: usuarios
        });
    });
});

app.put("/usuario/:id", verify_token, (req, res) => {
    let id = req.params.id;

    let body = req.body;

    let userToEdit = {
        firstName: body.firstName,
        secondName: body.secondName,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        email: body.email,
        username: body.username,
        password: body.password,
        rol: body.rol
    };

    User.findByIdAndUpdate(
        id,
        userToEdit, {
            new: true,
            runValidators: true
        },
        (err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!usuarios) {
                return res.status(400).json({
                    ok: false,
                    usuarios
                });
            }
            res.status(200).json({
                ok: true,
                usuarios
            });
        }
    );
});

app.delete("/usuario/:id", verify_token, (req, res) => {
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
        (err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!usuarios) {
                ok: false,
                usuarios;
            }

            res.status(200).json({
                ok: true,
                usuarios
            });
        }
    );
});
module.exports = app;