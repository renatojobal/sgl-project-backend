const express = require('express')
const app = express()
const Roll = require('../models/roll');

app.get('/roll', (req, res) => {
    Roll.find({
        state: true
    }).exec((err, rollDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            rollDB
        })
    });
});

app.post('/roll', (req, res) => {
    let body = req.body

    let rollToSave = new Roll({
        name: body.name,
        description: body.description
    });

    rollToSave.save((err, rollDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!rollDB) {
            return res.status(400).json({
                ok: false,
                rollDB
            });
        }
        res.status(200).json({
            ok: true,
            rollDB
        });
    });
})


app.put('/roll/:id', (req, res) => {
    let id = req.params.id
    let body = req.body;

    let rollToEdit = {
        name: body.name,
        description: body.description
    }

    Roll.findByIdAndUpdate(id, rollToEdit, {
        new: true,
        runValidators: true
    }, (err, rollDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!rollDB) {
            return res.status(400).json({
                ok: false,
                rollDB
            });
        }
        res.status(200).json({
            ok: true,
            rollDB
        })

    });
});

app.delete('/roll/:id', (req, res) => {
    let id = req.params.id
    let rollState = {
        state: false
    }

    Roll.findByIdAndUpdate(id, rollState, {
        new: true,
        runValidators: true
    }, (err, rollDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!rollDB) {
            ok: false,
            rollDB
        }

        res.status(200).json({
            ok: true,
            rollDB
        })
    })


});

module.exports = app