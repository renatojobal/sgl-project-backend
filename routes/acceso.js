const express = require('express');
const app = express();
Acceso = require('../models/acceso');
const date = require('date-and-time');
let dateFormat = require('dateformat');
const Sala = require('../models/sala');
const mongoose = require('mongoose')
let now = new Date();

app.get('/acceso', (req, res) => {
    Acceso.find({
        state: true
    }).exec((err, accesos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!accesos) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(200).json({
            ok: true,
            accesos
        });
    });
});


app.post('/acceso', (req, res) => {
    body = req.body

    let acceso_save_entry = new Acceso({
        date: dateFormat(now, "dddd, d  'de' mmmm, yyyy "),
        hour: date.format(now, "hh:mm:ss A"),
        user: body.user,
        sala: body.sala,
        type: "ENTRY"
    });
    let acceso_save_exit = new Acceso({
        date: dateFormat(now, "dddd, d  'de' mmmm, yyyy "),
        hour: date.format(now, "hh:mm:ss A"),
        user: body.user,
        sala: body.sala,
        type: "EXIT"
    })

    Acceso.findOne(({
        user: body.user
    }), (err, result) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (result === null) {
            acceso_save_entry.save();
            return res.status(200).json({
                ok: true,
                acceso: acceso_save_entry
            })
        } else {
            if (result.type === 'EXIT') {
                acceso_save_entry.save();
                return res.status(200).json({
                    ok: true,
                    acceso: acceso_save_entry
                })
            } else {
                if (result.type === "ENTRY") {
                    acceso_save_exit.save();
                    return res.status(200).json({
                        ok: true,
                        acceso: acceso_save_exit
                    });
                }
            }
        }
    }).sort({
        _id: -1
    });

})

module.exports = app