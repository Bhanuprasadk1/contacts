const express = require("express");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname,'contacts.db');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname));
let db = null;
const connection = async()=>{
    try{
        db = await open({
            filename:dbPath,
            driver:sqlite3.Database
        });
        app.listen(5500,()=>{
            console.log("listening...");
        });
    }
    catch(e){
        console.log(e.message);
    }
}
connection();

app.get("/contacts", async (req, res) => {
    const all = await db.all(`SELECT * FROM contacts`);
    res.json(all);
  });

app.post('/',async (req,res)=>{
    const {name,email,phone,city} = req.body;
    const response = await db.run(`insert into contacts(name,email,phone,city) 
                   values(?,?,?,?)`,[name,email,phone,city]);
    res.json(response);
});

app.put('/contacts/:id', async(req,res)=>{
    const {id} = req.params;
    const {name,email,phone,city} = req.body;
    const response = await db.run(`update contacts set name = ?,
        email = ?, phone = ?, city = ? where id = ${id}`,[name,email,phone,city]);
    res.json(response);
});
app.delete('/contacts/:id',async (req,res)=>{
    const {id} = req.params;
    const response = await db.run(`delete from contacts where Id = ?`,[id]);
    res.json(response);
})
