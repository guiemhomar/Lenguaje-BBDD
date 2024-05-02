const express = require('express')
const db = require('better-sqlite3')('personas.sqlite');

const app = express()
const port = 3000

app.set("view engine", "ejs");

// crearemos la configuracion de la bbdd

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.get("/", (req, res) =>{
    res.render("index", msgs={msgs: ["Hola", "desde", "la", "ruta"]});
})

app.get('/patata', (req, res) => {
    res.send('Hello World!')
})

app.get('/personas', (req, res) => {
    //aqui hare el select
    resultadoSelect = "SELECT * from personas"
    const rows = db.prepare('SELECT * from personas').all();
    res.send(rows)
})

//devolveremos el render de la vist con un form
app.get('/persona', (req, res) => {
    //aqui hare el select
    // personaId = req.query.id;
    // const row = db.prepare('SELECT * from personas WHERE id = ?').get(personaId);
    // res.send(row)

    res.render("persona")
})

//caputraremos el submit del formulario
app.post("/persona", (req, res) => {
    // personaId = req.body.id;
    // console.log(personaId);
    // const row = db.prepare('SELECT * from personas WHERE id = ?').get(personaId);
    // console.log(row);
    // res.send(row)

    console.log(req.body);
    if (req.body.nombre && req.body.apellidos){
        //insert
        const insert = db.prepare("INSERT INTO personas (nombre, apellidos) VALUES(?, ?");
        const info = insert.run(req.body.nombre, req.body.apellidos);
        console.log(info);
    }
    res.redirect("persona");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})