const express = require("express");
const app = express();
const Sala = require('../models/sala');


app.get('/sala', (req, res) => {
    Sala.find({
        state: true
    }, (err, salas) => {
        if (err) {
            return res.status.json({
                ok: true,
                err
            })
        }
        res.status(200).json({
            ok: true,
            salas
        });
    })
});


app.get('/sala/:id', (req, res) => {
    id = req.params.id;
    Sala.findById(id, (err, salaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!salaDB) {
            return res.status(500).json({
                ok: false,
                err: "El id no es correcto"
            });
        };
        res.json({
            ok: true,
            salaDB
        });
    });

});

app.post("/sala", (req, res) => {
    let body = req.body;
    let salaGuardar = new Sala({
        name: body.name,
        description: body.description
    });

    salaGuardar.save((err, salaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });

        }
        if (!salaDB) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            data: salaDB
        })
    });
});


app.put('/sala/:id', (req, res) => {
    let id = req.params.id

    let body = req.body;

    let salaPorEditar = {
        name: body.name,
        descripcion: body.descripcion
    }

    Sala.findByIdAndUpdate(id, salaPorEditar, {
        new: true,
        runValidators: true
    }, (err, salaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!salaDB) {
            return res.status(400).json({
                ok: false,
                salaDB
            })
        }
        res.status(200).json({
            ok: true,
            salaDB
        })

    })
})

app.delete('/sala/:id', (req, res) => {
    let id = req.params.id
    let salaState = {
        state: false
    }

    Sala.findByIdAndUpdate(id, salaState, {
        new: true,
        runValidators: true
    }, (err, salaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!salaDB) {
            ok: false,
            salaDB
        }

        res.status(200).json({
            ok: true,
            salaDB
        })
    })


});
module.exports = app;