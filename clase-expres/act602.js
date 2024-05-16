const express = require('express')
const path = require('path'); 
const db1 = require('better-sqlite3')('productes.sqlite');
const db2 = require('better-sqlite3')('usuaris.sqlite');


const app = express()
const port = 3000

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views602"));

// crearemos la configuracion de la bbdd

app.use(express.json());
app.use(express.urlencoded({extended: true }));

//act 6.01
app.get("/usuaris", (req, res) => {
    resultadoSelect = "SELECT * from usuaris"
    const rows = db2.prepare('SELECT * from usuaris').all();
    res.send(rows)
});

app.get('/usuari', (req, res) => {
    res.render("usuari")
});

app.post("/usuari", (req, res) => {
    console.log(req.body);
    if (req.body.nom && req.body.email){
        //insert
        const insert = db2.prepare("INSERT INTO usuaris (nom, email) VALUES(?, ?)");
        const info = insert.run(req.body.nom, req.body.email);
        console.log(info);
    }
    res.redirect("usuari");
})

app.get("/productes", (req, res) => {
    resultadoSelect = "SELECT * from productes"
    const rows = db1.prepare('SELECT * from productes').all();
    res.send(rows)
});

app.get('/producte', (req, res) => {
    res.render("producte")
});

app.post("/producte", (req, res) => {
    console.log(req.body);
    if (req.body.nom && req.body.preu){
        //insert
        const insert = db1.prepare("INSERT INTO productes (nom, preu) VALUES(?, ?)");
        const info = insert.run(req.body.nom, req.body.preu);
        console.log(info);
    }
    res.redirect("producte");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
