const express = require('express')
const app = express()
const Rol = require('../models/rol');
const verify_token = require('../middleware/auth');


app.get('/rol', verify_token, (req, res) => {
    Rol.find({
        state: true
    }).exec((err, roles) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            roles
        })
    });
});

app.post('/rol', verify_token, (req, res) => {
    let body = req.body

    let rolToSave = new Rol({
        name: body.name,
    });

    rolToSave.save((err, rolDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!rolDB) {
            return res.status(400).json({
                ok: false,
                rolDB
            });
        }
        res.status(200).json({
            ok: true,
            rolDB,
        });
    });
})


app.put('/rol/:id', verify_token, (req, res) => {
    let id = req.params.id
    let body = req.body;
    let rolToEdit = {
        name: body.name
    }

    Rol.findByIdAndUpdate(id, rolToEdit, {
        new: true,
        runValidators: true
    }, (err, rolDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!rolDB) {
            return res.status(400).json({
                ok: false,
                rolDB
            });
        }
        res.status(200).json({
            ok: true,
            rolDB
        })

    });
});

app.delete('/rol/:id', verify_token, (req, res) => {
    let id = req.params.id
    let rolState = {
        state: false
    }

    Rol.findByIdAndUpdate(id, rolState, {
        new: true,
        runValidators: true
    }, (err, rolDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!rolDB) {
            ok: false,
            rolDB
        }

        res.status(200).json({
            ok: true,
            rolDB
        })
    })


});

module.exports = app