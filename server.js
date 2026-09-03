const express=require('express');
const moment=require('moment');
const app=express();
const cors=require('cors');
const path=require('path');
const mysql=require('mysql2');

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));

const PORT=process.env.PORT || 5000;

const pool = mysql.createPool({
  host: 'sql.freedb.tech',
  user: 'u_e8L2kS',
  password: 'yJt4j7i5tjTj', 
  database: 'freedb_dYGMrNFx',
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});



//UPDATE
app.put('/api/users',(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const email=req.body.email;
    const role=req.body.role;
    pool.query(`UPDATE profiles SET name=?, email=?, role=?, WHERE id=?`,[name,email,role,id],(err,rows, fields)=>{
        if(err) throw err;
        res.send({msg:'Data updated successfully'});
    })
})

//DELETE
app.delete('/api/users/:id',(req,res)=>{
    const id=req.params.id;
    pool.query(`DELETE FROM profiles WHERE id=?`,[id],(err,rows, fields)=>{
        if(err) throw err;
        res.send({msg:'Data deleted successfully'});
    })
})

//Preview
app.get('/api/users',(req,res)=>{
    pool.query(`SELECT * FROM profiles`,(err,rows, fields)=>{
        if(err) throw err;
        res.send(rows);
    })
})

moment().format('YYYY-MM-DD HH:mm:ss');

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

