const express = require('express')
const db1 = require('better-sqlite3')('productes.sqlite');
const db2 = require('better-sqlite3')('Usuarios.sqlite');


const app = express()
const port = 3000

app.set("view engine", "ejs");

// crearemos la configuracion de la bbdd

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.get("/", (req, res) =>{
    res.render("index", msgs={msgs: ["Hola", "desde", "la", "ruta"]});
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


//act 6.01
app.get("/usuaris", (req, res) => {
    const rows = db2.prepare('SELECT * FROM Usuarios').all();
    res.send(rows);
});

app.get('/usuari', (req, res) => {
    const usuariId = req.query.id;
    const row = db2.prepare('SELECT * FROM Usuarios WHERE id = ?').get(usuariId);
    res.send(row);
});

app.get("/productes", (req, res) => {
    const rows = db1.prepare('SELECT * FROM productes').all();
    res.send(rows);
});

app.get('/producte', (req, res) => {
    const producteId = req.query.id;
    const row = db1.prepare('SELECT * FROM productes WHERE id = ?').get(producteId);
    res.send(row);
});

