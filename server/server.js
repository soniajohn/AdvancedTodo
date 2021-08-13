const express = require("express");
const cors = require('cors');
const app = express();
const mysql = require("mysql")
const bodyParser = require("body-parser");
const { query } = require("express");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createPool({

    user: "root",
    host: "localhost",
    password: "Sonia25!",
    database: "advancedtodo",
});
app.post('/users/:userid/todolists', (req, res) => {


    const task_name = req.body.task;
    const todoid = req.body.todoid
    //console.log(todoid)
    //console.log(task_name)

    const userid = req.params.userid
    // console.log(userid)
    const today = new Date();

    const date = today.getDay() + "-" + today.getMonth() + "-" + today.getFullYear();


    const sqlInsert = "INSERT INTO Todos(Todoid,Todoname,createdate,Todos.user_id) VALUES(?,?,?,?)"
    db.query(sqlInsert, [todoid, task_name, date, userid], (err, result) => {



    })

    db.end

});




app.post("/users/:userid/todolists/:todolistid/tasks", (req, res) => {

    const tname = req.body.task
    const childtask_id = req.body.childtask_id
    // const childname=req.body.text
    const Todoid = req.params.todolistid
    const today = new Date();
    console.log("Todod=" + Todoid)
    console.log("child_id=" + childtask_id)
    console.log("tname=" + tname)
    const date = today.getDay() + "-" + today.getMonth() + "-" + today.getFullYear();
    console.log("date=" + date)
    console.log([Todoid, childtask_id, tname, date])
    const sqlInsert = "INSERT INTO childTasks(Todoid,childtodo_id,childtask_name,child_date) VALUES(?,?,?,?)"
    db.query(sqlInsert, [Todoid, childtask_id, tname, date], (err, result) => {

    })



});
// create a new user
// body should contain  fname,lname,email,password,cpassword
app.post("/users", (req, res) => {

    const fname = req.body.fname
    const lname = req.body.lname
    const ename = req.body.email
    const password = req.body.password
    const cpassword = req.body.cpassword

    //  console.log(fname)
    // console.log(lname)
    if (password === cpassword) {
        const sqlInsert = "INSERT INTO user_info(f_name,l_name,email,password,cpassword) VALUES(?,?,?,?,?)"
        db.query(sqlInsert, [fname, lname, ename, password, cpassword], (err, result) => {
            if(err){
                res.status(500)
                res.json("user creation failed")
            }
            else{
                res.status(200)
                res.json({id:`${result.insertId}`})
                console.log(result)
            }

        })

        db.end

    }
    else{
        res.status(500)
        res.json("failed to add user, password doesn't match")
    }
});



app.post("/users/todolists", (req, res) => {


    const email = req.body.email

    const password = req.body.password

    db.query("select user_info.user_id,email,password,f_name from user_info  WHERE email=? AND password=?", [email, password], (err, result) => {


        if (err) {
            res.send({ err: err })

        }
        if (result.length > 0) {

            res.send(result);
        } else {

            res.send({ message: "wrong email/password" })
        }
    })
    // console.log(email)

    db.end
    ///////////////////////


});






app.delete("/users/:userid/todolists/:todolist_id", (req, res) => {


    const todolist_id = req.params.todolist_id;
    console.log(todolist_id)

    db.query("DELETE FROM Todos WHERE Todoid=?", todolist_id, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    });



});

app.get("/users/todolists", (req, res) => {
    const user_id = req.body.userid

    db.query("SELECT max(Todoid) from Todos where Todos.user_id=? ", [user_id], (err, result) => {


        if (err) {
            console.log(err)
        }
        else {
            res.send(result)

        }

    })
});







app.get("/users/:userid/todolists", (req, res) => {

    const user = req.params.userid;
    console.log("userid=" + user)

    db.query("SELECT Todoid,Todoname FROM Todos WHERE Todos.user_id=?", [user], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })


    ////////////////////////////




});

///////////////////////////////////////////
app.get("/user/:userid/Todolists/:todoid", (req, res) => {

    const childid = req.params.todoid;
    console.log("child=" + childid)
    db.query("SELECT childtodo_id,childtask_name,child_status FROM childTasks WHERE childTasks.Todoid=?", [childid], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })


});






///////////////////////////////////////////////////










app.put("/users/:userid/todolists/:todolistId/tasks/:taskid", (req, res) => {

    const tname = req.body.txtupdate
    const status = req.body.status
    const childtodo_id = req.params.taskid


    // console.log("first="+tname)
    console.log("sec=" + status)
    console.log("ch=" + childtodo_id)

    db.query("UPDATE childTasks SET child_status=? WHERE childtodo_id=?", [status, childtodo_id], (err, result) => {

        if (err) {

            console.log(err)
        } else {

            res.send(result);
        }


    }
    );

    // db.end
});


app.get("/showtodos", (req, res) => {


    db.query("SELECT Todoname FROM Todos", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })

});



app.get("/user/:userid/todolists/:optionname", (req, res) => {

    const user = req.params.optionname;
    //  console.log(user)
    db.query("SELECT Todoid FROM Todos where Todoname=?", [user], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })

});










app.delete("/users/:userid/todolists/:todolistId/tasks/:taskid", (req, res) => {

    const task_del = req.params.taskid;

    console.log("task_del=" + task_del)

    db.query("DELETE FROM childTasks WHERE childtodo_id=?", task_del, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    });
});




app.get("/users/:userid/todolists/:todolistId", (req, res) => {
    const Taskid = req.params.todolistId
    console.log(Taskid)
    db.query("SELECT * FROM childTasks WHERE child_status=? && Todoid=?", [1, Taskid], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});




app.put("/users/:userid/todolists/:todolistid/tasks/:taskid", (req, res) => {

    const originaltxt = req.params.taskid
    const tname = req.body.tasname
    console.log("origin=" + originaltxt)
    console.log(tname)

    db.query("UPDATE Todos SET Todoname=? WHERE Todoid=?", [tname, originaltxt], (err, result) => {

        if (err) {

            console.log(err)
        } else {

            res.send(result);
        }


    }
    );

});




app.put("/users/:userid/todolists/:todolistId", (req, res) => {

    const originaltxt = req.params.todolistId
    const tname = req.body.tasname
    console.log("original=" + originaltxt)
    console.log("tname" + tname)

    db.query("UPDATE Todos SET Todoname=? WHERE Todoid=?", [tname, originaltxt], (err, result) => {

        if (err) {

            console.log(err)
        } else {

            res.send(result);
        }


    }
    );

});



app.listen(4000, () => {


    console.log("running on port 4000")
})
