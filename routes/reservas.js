var express = require("express");
var router = express.Router();

//Obtener reservas
//PATH /reservas
router.get("/", (req, res, next) => {
    req.db.query("SELECT * FROM reserva", (err, results) => {
        if (err) {
            res.send([]);
        } else {
            res.send(results)
        }
    });
});


//Obtener una reserva
//PATH /reserva/id
router.get("/:id", (req, res, next) => {
    let id = req.params.id;
    req.db.query("SELECT * FROM reserva WHERE idreserva = " + id, (err, results) => {
        if (err || results.length == 0) {
            res.status(404).send({ msg: "El libro no existe" });
        } else {
            res.send(results[0]);
        }
    });

});

//Insertar reserva
//PATH /reserva
router.post("/", (req, res, next) => {
    let body = req.body;
    req.db.query("INSERT INTO reserva SET fecha = ?, hora = ?, nombre = ? ", [body.fecha, body.hora, body.nombre], (err, results) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

//Actualizar reserva
//PATH /reserva
router.put("/:id", (req, res, next) => {
    let body = req.body;
    req.db.query("UPDATE reserva SET fecha = ?, hora = ?, nombre = ? WHERE idreserva = ?", [body.fecha, body.hora, body.nombre, req.params.id], (err, results) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});


//Eliminar reserva
//PATH /reserva/id
router.delete("/:id", (req, res, next) => {
    req.db.query("DELETE FROM reserva WHERE idreserva = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

module.exports = router;