const express = require('express');
const path = require('path');
const db1 = require('better-sqlite3')('productes.sqlite');
const db2 = require('better-sqlite3')('usuaris.sqlite');
const db3 = require('better-sqlite3')('comandes.sqlite');

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views605"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/actualitzaProducte/:id', (req, res) => {
    const product = db1.prepare('SELECT * FROM productes WHERE id = ?').get(req.params.id);
    const products = db1.prepare('SELECT * FROM productes').all();
    res.render('producte_update', { product, products });
});

app.post('/actualitzaProducte/:id', (req, res) => {
    const { id, nom, preu } = req.body;
    if (id && nom && preu) {
        const update = db1.prepare('UPDATE productes SET nom = ?, preu = ? WHERE id = ?');
        const info = update.run(nom, preu, id);
        console.log(info);
    }
    res.redirect('/productes');
});

app.get('/productes/:id/editar', (req, res) => {
    const product = db1.prepare('SELECT * FROM productes WHERE id = ?').get(req.params.id);
    res.render('producte_update', { product });
});

app.get('/actualitzaUsuari/:id', (req, res) => {
    const user = db2.prepare('SELECT * FROM usuaris WHERE id = ?').get(req.params.id);
    const users = db2.prepare('SELECT * FROM usuaris').all(); 
    res.render('usuari_update', { user, users }); 
});

app.post('/actualitzaUsuari/:id', (req, res) => {
    const { id, nom, email } = req.body;
    if (id && nom && email) {
        const update = db2.prepare('UPDATE usuaris SET nom = ?, email = ? WHERE id = ?');
        const info = update.run(nom, email, id);
        console.log(info);
    }
    res.redirect('/usuaris');
});

app.get('/usuari/:id/editar', (req, res) => {
    const user = db2.prepare('SELECT * FROM usuaris WHERE id = ?').get(req.params.id);
    res.render('usuari_editar', { user });
});
//-------------------------------------------------------------------------------------------------

app.get('/afegeixComanda', (req, res) => {
    const usuaris = db2.prepare('SELECT * FROM usuaris').all();
    const productes = db1.prepare('SELECT * FROM productes').all();
    res.render('afegeixComanda', { usuaris: usuaris, productes: productes });
});

app.post("/afegeixComanda", (req, res) => {
    const { usuari_id, producte_id } = req.body;
    if (usuari_id && producte_id) {
        const insert = db3.prepare("INSERT INTO comandes (usuari_id, producte_id) VALUES (?, ?)");
        const info = insert.run(usuari_id, producte_id);
        console.log(info);
    }
    res.redirect("/comandes");
});

app.get('/comandes', (req, res) => {
    const comandes = db3.prepare('SELECT * FROM comandes').all();
    res.render('comandes', { comandes: comandes });
});

//-------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.render('index605.ejs');
});

//----------------------------------------------------------------------------------------------

app.get('/usuaris', (req, res) => {
    const rows = db2.prepare('SELECT * FROM usuaris').all();
    res.render('usuari_boton', { users: rows });
});

app.get('/usuari', (req, res) => {
    res.render("usuari");
});

app.post("/usuari", (req, res) => {
    if (req.body.nom && req.body.email){
        const insert = db2.prepare("INSERT INTO usuaris (nom, email) VALUES(?, ?)");
        const info = insert.run(req.body.nom, req.body.email);
    }
    res.redirect("/usuaris");
});

app.get('/usuari/:id', (req, res) => {
    const user = db2.prepare('SELECT * FROM usuaris WHERE id = ?').get(req.params.id);
    res.render('usuari_detalle', { user });
});

//-------------------------------------------------------------------------------------------------

app.get("/productes", (req, res) => {
    const rows = db1.prepare('SELECT * from productes').all();
    res.render('producte_boton', { products: rows });
});

app.get('/producte', (req, res) => {
    res.render("producte");
});

app.post("/producte", (req, res) => {
    if (req.body.nom && req.body.preu){
        const insert = db1.prepare("INSERT INTO productes (nom, preu) VALUES(?, ?)");
        const info = insert.run(req.body.nom, req.body.preu);
    }
    res.redirect("/productes");
});  

app.get('/producte/:id', (req, res) => {
    const product = db1.prepare('SELECT * FROM productes WHERE id = ?').get(req.params.id);
    res.render('producte_detalle', { product });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

