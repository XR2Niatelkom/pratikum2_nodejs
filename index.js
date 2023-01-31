const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
// const { error } = require("console")
// const { debugPort } = require("process")
// const { strictEqual } = require("assert")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "data_penyewaan"
})

db.connect(error => {
    if(error){
        console.log(error.message)
    } 
    else {
        console.log("MySQL Connected")
    }
})

app.get("/sewa", (req,res) => {
    let sql = "select * from sewa"
    db.query(sql,(error,result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                sewa: result
            }
        }
        res.json(response)
    })
})

app.get("/sewa/:id_penyewaan", (req,res) => {
    let data = {
        id_penyewaan:req.params.id_penyewaan
    }
    let sql = "select * from sewa where ?"
    db.query(sql,data, (error, result) => {
        let response = null 
        if (error){
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                count: result.length,
                sewa: result
            }
        }
        res.json(response)
    })
})

app.post("/sewa", (req,res) => {
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat
    }
    let sql = "insert into sewa set ?"
    db.query(sql,data,(error,result) => {
        let response = null 
        if (error) {
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/sewa", (req,res) => {
    let data = [
        {
        nama: req.body.nama,
        alamat: req.body.alamat,
    },
    {
        id_penyewaan: req.body.id_penyewaan
    }
    ]
    let sql = "update sewa set ? where ?"
    db.query(sql,data,(error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/sewa/:id_penyewaan", (req,res) => {
    let data = {
        id_penyewaan: req.params.id_penyewaan
    }

    let sql = "delete from sewa where ?"
    db.query(sql,data,(error,result) =>{
        let response = null 
        if(error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.get("/kendaraan", (req,res) => {
    let sql = "select * from kendaraan"
    db.query(sql,(error,result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                kendaraan: result
            }
        }
        res.json(response)
    })
})

app.get("/kendaraan/:id_kendaraan", (req,res) => {
    let data = {
        id_kendaraan:req.params.id_kendaraan
    }
    let sql = "select * from kendaraan where ?"
    db.query(sql,data, (error, result) => {
        let response = null 
        if (error){
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                count: result.length,
                kendaraan: result
            }
        }
        res.json(response)
    })
})


app.post("/kendaraan", (req,res) => {
    let data = {
        nopol: req.body.nopol,
        warna: req.body.warna,
        kondisi_kendaraan: req.body.kondisi_kendaraan
    }
    let sql = "insert into kendaraan set ?"
    db.query(sql,data,(error,result) => {
        let response = null 
        if (error) {
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/kendaraan", (req,res) => {
    let data = [
        {
          nopol: req.body.nopol,
          warna: req.body.warna,
          kondisi_kendaraan: req.body.kondisi_kendaraan
    },
    {
        id_kendaraan: req.body.id_kendaraan
    }
    ]
    let sql = "update kendaraan set ? where ?"
    db.query(sql,data,(error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/kendaraan/:id_kendaraan", (req,res) => {
    let data = {
        id_kendaraan: req.params.id_kendaraan
    }

    let sql = "delete from kendaraan where ?"
    db.query(sql,data,(error,result) =>{
        let response = null 
        if(error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.get("/admin", (req,res) => {
    let sql = "select * from admin"
    db.query(sql,(error,result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                admin: result
            }
        }
        res.json(response)
    })
})

app.get("/admin/:id_admin", (req,res) => {
    let data = {
        id_admin:req.params.id_admin
    }
    let sql = "select * from admin where ?"
    db.query(sql,data, (error, result) => {
        let response = null 
        if (error){
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                count: result.length,
                admin: result
            }
        }
        res.json(response)
    })
})

app.post("/admin", (req,res) => {
    let data = {
        nama_admin: req.body.nama_admin,
        status_admin: req.body.status_admin,
        keterangan: req.body.keterangan
    }
    let sql = "insert into admin set ?"
    db.query(sql,data,(error,result) => {
        let response = null 
        if (error) {
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/admin", (req,res) => {
    let data = [
        {
        nama_admin: req.body.nama_admin,
        status_admin: req.body.status_admin,
        keterangan: req.body.keterangan

    },
    {
        id_admin: req.body.id_admin
    }
    ]
    let sql = "update admin set ? where ?"
    db.query(sql,data,(error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/admin/:id_admin", (req,res) => {
    let data = {
        id_admin: req.params.id_admin
    }

    let sql = "delete from admin where ?"
    db.query(sql,data,(error,result) =>{
        let response = null 
        if(error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.listen(8000,() => {
    console.log("yeay")
})
