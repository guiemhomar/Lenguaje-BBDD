const express = require('express')
const db = require('better-sqlite3')('personas.sqlite');

const app = express()
const port = 3000

// crearemos la configuracion de la bbdd

app.use(express.json());

app.get('/patata', (req, res) => {
    res.send('Hello World!')
})

app.get('/personas', (req, res) => {
    //aqui hare el select
    resultadoSelect = "SELECT * from personas"
    const rows = db.prepare('SELECT * from personas').all();
    res.send(rows)
})

app.get('/persona', (req, res) => {
    //aqui hare el select
    personaId = req.query.id;
    const row = db.prepare('SELECT * from personas WHERE id = ?').get(personaId);
    res.send(row)
})

app.post("/postPersona", (req, res) => {
    personaId = req.body.id;
    console.log(personaId);
    const row = db.prepare('SELECT * from personas WHERE id = ?').get(personaId);
    console.log(row);
    res.send(row)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})