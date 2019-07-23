const express = require("express");
const app = express();
const Sala = require('../models/sala');
// FIXME Agregar verificacion por token

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
                err: "Wrong id"
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
    let salaToSave = new Sala({
        name: body.name,
        description: body.description
    });

    salaToSave.save((err, salaDB) => {
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
    console.log('Metodo put');
    console.log(id);
    let salaToEdit = {
        name: body.name,
        descripcion: body.descripcion
    }

    Sala.findByIdAndUpdate(id, salaToEdit, {
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