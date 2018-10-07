const express=require("express");
const bodyParser=require("body-parser");
const bcryptjs=require("bcryptjs");
const mysql=require("mysql");
let pool=mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    connectLimit:10
});
let app=new express();
app.use(bodyParser.json());
app.post('/sign',(req,res)=>{
    let user=req.body.user;
    //let email='dangdang'
    console.log(user);
    let sql="select * from db.user where email=?";
    pool.query(sql,[user.email],(err,results)=>{
        if(err) throw err;
        if(results.length===1){
            res.send({"status":"exist"})
        }
        sql="insert into db.user(email,password) value(?,?)";
        let crypassword=bcryptjs.hashSync(user.password,
            bcryptjs.genSaltSync(10));
        pool.query(sql,[user.email,crypassword],(err,results)=>{
            if(err) throw err;
            if(results.affectedRows==1){
                res.send({"status":"ok"})
            }else{
                res.send({"status":"err"})
            }
        })
    })
    //res.send({"status":"ok"})
});
app.post('/signin',(req,res)=>{
   let user=req.body.user;
   console.log(user)
   let email=user.email;
   let password=user.password;
   //let cryptpwd=bcryptjs.hashSync(password,bcryptjs.genSaltSync(10))
   let sql="select * from db.user where email=?";
   pool.query(sql,[email],(err,results)=>{
       if(err) throw err;
       if(results.length===1){
           let encryptedPassword=results[0].password;
           if(bcryptjs.compareSync(password,encryptedPassword)){
               res.send({"status":"ok",
               "user":results[0]
               });
           }
       }
       res.send({"status":"err"})
   })
});
app.post('/userinfo', (req, res) => {
    let user = req.body.user;
    let sql = `SELECT *
                FROM db.user
                WHERE username = ?
                OR nick = ?`;
    pool.query(sql, [user.username, user.nick], (err, results) => {
        if (err) throw err;
        if (results.length === 2) {
            res.send({"status": "usernameAndNickExist"});
        } else if (results.length === 1) {
            let username = results[0].username;
            let nick = results[0].nick;
            if (username === user.username && nick === user.nick) {
                // username 和 nick 都被占用了
                res.send({"status": "usernameAndNickExist"});
            } else if (username === user.username) {
                // username 被占用了
                res.send({"status": "usernameExist"});
            } else {
                // nick 被占用了
                res.send({"status": "nickExist"});
            }
        }

        // username 和 nick 都可以使用
        sql = `UPDATE db.user
                SET 
                username = ?,
                nick = ?,
                gender = ?,
                dob = ?
              WHERE id = ?`;

        pool.query(sql, [
            user.username,
            user.nick,
            user.gender,
            user.dob,
            user.id], (err, results) => {
            if (err) throw err;
            if (results.affectedRows === 1) {
                res.send({"status": "ok"});
            } else {
                res.send({"status": "err"});
            }
        });
    });
});
app.get('/products/:page',(req,res)=>{
    let page=req.params.page;
    const pageSize=20;
    let sql = `select * from db.product limit ${pageSize} offset ?`;
   pool.query(sql,[pageSize * (page - 1 )],(err,results)=>{
       if(err) throw err;
       res.send(results);
   })
});
app.listen(3000);