const express = require("express");
const app = express();
const Room = require('../models/room');


app.get('/room', (req, res) => {
    Room.find({
        state: true
    }, (err, rooms) => {
        if (err) {
            return res.status.json({
                ok: true,
                err
            })
        }
        res.status(200).json({
            ok: true,
            rooms
        });
    })
});


app.get('/room/:id', (req, res) => {
    id = req.params.id;
    Room.findById(id, (err, roomDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!roomDB) {
            return res.status(500).json({
                ok: false,
                err: "Wrong id"
            });
        };
        res.json({
            ok: true,
            roomDB
        });
    });

});

app.post("/room", (req, res) => {
    let body = req.body;
    let roomToSave = new Room({
        name: body.name,
        description: body.description
    });

    roomToSave.save((err, roomDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });

        }
        if (!roomDB) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            data: roomDB
        })
    });
});


app.put('/room/:id', (req, res) => {
    let id = req.params.id

    let body = req.body;

    let roomToEdit = {
        name: body.name,
        descripcion: body.descripcion
    }

    Room.findByIdAndUpdate(id, roomToEdit, {
        new: true,
        runValidators: true
    }, (err, roomDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!roomDB) {
            return res.status(400).json({
                ok: false,
                roomDB
            })
        }
        res.status(200).json({
            ok: true,
            roomDB
        })

    })
})

app.delete('/room/:id', (req, res) => {
    let id = req.params.id
    let roomState = {
        state: false
    }

    Room.findByIdAndUpdate(id, roomState, {
        new: true,
        runValidators: true
    }, (err, roomDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!roomDB) {
            ok: false,
            roomDB
        }

        res.status(200).json({
            ok: true,
            roomDB
        })
    })


});
module.exports = app;