const express = require('express');
const app = express();
AccessPermission = require('../models/acceso');
const date = require('date-and-time');
let dateFormat = require('dateformat');
const Sala = require('../models/sala');
const mongoose = require('mongoose')
let now = new Date();

app.get('/acceso', (req, res) => {
    AccessPermission.find({
        state: true
    }).exec((err, permissions) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!permissions) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(200).json({
            ok: true,
            permissions
        });
    });
});


app.post('/acceso', (req, res) => {
    body = req.body

    let permission_save_entry = new AccessPermission({
        date: dateFormat(now, "dddd, d  'de' mmmm, yyyy "),
        hour: date.format(now, "hh:mm:ss A"),
        user: body.user,
        sala: body.sala,
        typeAccess: "ENTRY"
    });
    let permission_save_exit = new AccessPermission({
        date: dateFormat(now, "dddd, d  'de' mmmm, yyyy "),
        hour: date.format(now, "hh:mm:ss A"),
        user: body.user,
        sala: body.sala,
        typeAccess: "EXIT"
    })

    AccessPermission.findOne(({
        user: body.user
    }), (err, result) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (result === null) {
            permission_save_entry.save();
            return res.status(200).json({
                ok: true,
                access: permission_save_entry
            })
        } else {
            if (result.typeAccess === 'EXIT') {
                permission_save_entry.save();
                return res.status(200).json({
                    ok: true,
                    access: permission_save_entry
                })
            } else {
                if (result.typeAccess === "ENTRY") {
                    permission_save_exit.save();
                    return res.status(200).json({
                        ok: true,
                        access: permission_save_exit
                    });
                }
            }
        }
    }).sort({
        _id: -1
    });

})

module.exports = app