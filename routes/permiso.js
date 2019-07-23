const express = require("express");
const app = express();
const Permiso = require('../models/permiso');


app.get('/permiso', (req, res) => {
    Permiso.find({
        state: true
    }, (err, permisos) => {
        if (err) {
            return res.status.json({
                ok: true,
                err
            })
        }
        res.status(200).json({
            ok: true,
            permisos
        });
    })
});


app.get('/permiso/:id', (req, res) => {
    id = req.params.id;
    Sala.findById(id, (err, permisos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!permisos) {
            return res.status(500).json({
                ok: false,
                err: "Wrong id"
            });
        };
        res.json({
            ok: true,
            permisos
        });
    });

});

app.post("/permiso", (req, res) => {
    let body = req.body;
    let permisoToSave = new Permiso({
        day: body.day,
        start_time: body.start_time,
        end_time: body.end_time,
        rol: body.rol
    });

    permisoToSave.save((err, permisos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!permisos) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            data: permisos
        });
    });
});



app.delete("/permiso/:id", (req, res) => {
    let id = req.params.id;
    let permisoState = {
        state: false
    };

    Permiso.findByIdAndUpdate(
        id,
        permisoState, {
            new: true,
            runValidators: true
        },
        (err, permisos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!permisos) {
                ok: false,
                permisos;
            }

            res.status(200).json({
                ok: true,
                permisos
            });
        }
    );
});

module.exports = app;