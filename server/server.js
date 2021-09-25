const express = require("express");
const cors = require('cors');
const app = express();
const mysql = require("mysql")
const bodyParser = require("body-parser");
const { query } = require("express");
const { json } = require("body-parser");
const { on } = require("nodemon");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createPool({

    user: "root",
    host: "localhost",
    password: "Sonia25!",
    database: "advancedtodo",
});




// create a new user
// body should contain  fname,lname,email,password,cpassword


app.post("/users", (req, res) => {

    const fname = req.body.fname
    const l_name = req.body.lname
    const ename = req.body.email
    const password = req.body.password
    const cpassword = req.body.cpassword



    if (password === cpassword) {
        const sqlInsert = "INSERT INTO user_info(f_name,l_name,email,password,cpassword) VALUES(?,?,?,?,?)"
        db.query(sqlInsert, [fname, l_name, ename, password, cpassword], (err, result) => {
            if (err) {
                res.status(500)
                res.json("user creation failed")
            }
            else {
                res.status(200)
                res.json({ id: `${result.insertId}` })
                console.log(result)
            }

        })

        db.end

    }
    else {
        res.status(500)
        res.json("failed to add user, password doesn't match")
    }
});



//return all the users 
app.get("/users",(req,res)=>{

    //const userid=req.params.userid
    
    
    
    db.query("SELECT f_name,l_name FROM user_info ", (err, result) => {
    
        if (err) {
            res.status(500)
            res.json("No record Found")
        }
        else {
            res.status(200)
            res.send(result)
    
              console.log(result)
    
    
        }
    
    })
    
    
    
    })
    
    





    //returns a specific user when userid is provided

app.get("/users/:userid",(req,res)=>{


    const userid=req.params.userid
    
    
    
    db.query("SELECT f_name,l_name FROM user_info where user_id=?",userid ,(err, result) => {
    
        if (err) {
            res.status(500)
            res.json("No user found")
        }
        else {
            res.status(200)
            res.send(result)
    
              console.log(result)
    
    
        }
    
    })
    
    })
    
    
    






    app.put("/users/:userid", (req, res) => {

        const fname = req.body.f_name
        const lname = req.body.l_name
        const userid = req.params.userid
    
    console.log("fname="+req.body.f_name)
    console.log("lname="+lname)
    console.log("user="+userid)
       
    
        db.query("UPDATE user_info SET f_name=?,l_name=? WHERE  user_id=?", [fname,lname,userid], (err, result) => {
    
            if (err) {
                res.status(500)
                res.json("No record updated")
            }
            else {
                res.status(200)
                res.json({ data: `${result.insertId}` })
               console.log(result.insertId)
    
    
            }
    
        }
        );
    
        // db.end
    });
    
    
    
//deleting specific todo item

app.delete("/users/:userid", (req, res) => {


    
    const userid = req.params.userid;
    //console.log(userid)

    db.query("DELETE user_info.*,Todos.* from user_info  INNER JOIN  Todos WHERE user_info.user_id = Todos.user_id and user_info.user_id=?", userid, (err, result) => {
        if (err) {


            res.status(500)
            console.log(err)
            res.json("no record deleted")
        }
        else {
            res.status(200)
            res.json({ userid: `${userid}` })
           console.log(result.insertId)
        }







    })


});




// inserting new Todos based on specific user.Todoname will be inserted into Todos

app.post('/users/:userid/todolists', (req, res) => {


    const todo_name = req.body.task;

    const userid = req.params.userid

    const today = new Date();

    const date = today.getDay() + "-" + today.getMonth() + "-" + today.getFullYear();



    const sqlInsert = "INSERT INTO Todos(Todoname,user_id) VALUES(?,?)"
    db.query(sqlInsert, [todo_name, userid], (err, result) => {


        if (err) {
            res.status(500)
            res.json("No record inserted")
        }
        else {
            res.status(200)
           
           res.json({ id: `${result.insertId}` })

           
           }

    })

    db.end

});


// to get a specific  user’s todo lists

app.get("/users/:userid/todolists", (req, res) => {

    const user = req.params.userid;
console.log(req.params.userid)



    if (user) {
       
        db.query("SELECT  Todoid,Todoname FROM Todos WHERE Todos.user_id=?", [user], (err, result) => {

            if (err) {
                res.status(500)
                res.json("No match Found")
            }
            else {
                res.status(200)
                res.send(result)
                
                  console.log(result)


            }

        })

    }

})












//To get a  specific user’s specific todo list


app.get('/users/:userid/todolists/:todolistid', (req, res) => {

    const todolist_id=req.params.todolistid
    //const todo_name = req.body.task;

    const userid = req.params.userid

    


    db.query("SELECT Todoname FROM Todos where Todos.user_id=? and Todos.Todoid=?",[userid,todolist_id] ,(err, result) => {

        if (err) {
            res.status(500)
            res.json("No user found")
        }
        else {
            res.status(200)
            res.send(result)

              console.log(result)
    
    
        }
    
    })
    
    })
    



    app.put("/users/:userid/todolists/:todolistid", (req, res) => {

        const Todo_id = req.params.todolistid
        const tname = req.body.tasname
        const userid=req.params.userid
        console.log(tname)
      
        db.query("UPDATE Todos SET Todoname=? WHERE Todos.Todoid=? and Todos.user_id=?", [tname, Todo_id,userid], (err, result) => {
    
            if (err) {
    
                console.log(err)
            } else {
                
               res.json({ id: `${result}` })
               
            }
    
    
        })
        
    
    });
    






//deleting specific todo item

app.delete("/users/:userid/todolists/:todolist_id", (req, res) => {


    const todolist_id = req.params.todolist_id;
    const userid = req.params.userid;
    console.log(todolist_id)
    console.log(userid)
   


     db.query("Delete from childTasks where Todoid=?", todolist_id)
     db.query("DELETE FROM Todos WHERE Todoid=?", todolist_id, (err, result) => {
        if (err) {


            res.status(500)
            console.log(err)
            res.json("no record deleted")
        }
        else {
            res.status(200)
            res.json({ todolistid: `${result}` })
           // console.log(result)
        }







    })


});





//inserting new Tasks based on specific user and Taskid.



    




// Updating firstname,lastname of user based on userid















// login page
//contains user email and password

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


    db.end



});







app.post("/users/:userid/todolists/:todolistid/tasks", (req, res) => {

    const tname = req.body.task
    const userid=req.params.userid
    const Todoid = req.params.todolistid
    const today = new Date();
    console.log("Todod=" + Todoid)
    // console.log("child_id=" + childtask_id)
    console.log("tname=" + tname)
    const date = today.getDay() + "-" + today.getMonth() + "-" + today.getFullYear();
    //console.log("date=" + date)

    const sqlInsert = "INSERT INTO childTasks(Todoid,childtask_name) VALUES(?,?)"
    db.query(sqlInsert, [Todoid, tname,userid], (err, result) => {



        if (err) {
            res.status(500)
            res.json("No record inserted")
        }
        else {
            res.status(200)
            res.send(result)
           // res.json({ id: `${result.insertId}` })
            console.log(result)
        }

    })



});








// displays todolists on page load based on specific user










// to get alls tasks of a specific toddolist of a user

app.get("/users/:userid/Todolists/:todolistid/tasks", (req, res) => {

    const childid = req.params.todolistid;


    const userid = req.params.userid;

    db.query("SELECT childtodo_id,childtask_name,child_status FROM childTasks WHERE childTasks.Todoid=? ", [childid], (err, result) => {


        if (err) {
            res.status(500)
            res.json("No match Found")
        }
        else {
            res.status(200)
           res.send(result)
              res.json({ data:`${result}`} )
            console.log(result)


        }



    })


});



// to get specific  tasks details

app.get("/users/:userid/Todolists/:todolistid/tasks/:taskid", (req, res) => {

    const childid = req.params.todolistid;


    const userid = req.params.userid;
    const taskid=req.params.taskid

    db.query("SELECT childtodo_id,childtask_name,child_status FROM childTasks where childtodo_id=? ", [taskid], (err, result) => {


        if (err) {
            res.status(500)
            res.json("No match Found")
        }
        else {
            res.status(200)
           // res.send(result)
              res.json({ data:`${result}`} )
            console.log(result)


        }



    })


});






///////////////////////////////////////////////////








// updating status of checkbox- checked or unchecked

// app.put("/users/:userid/todolists/:todolistId/tasks/:taskid", (req, res) => {

//     const tname = req.body.txtupdate
//     const status = req.body.status
//     const taskid = req.params.taskid
//      const userid=req.params.userid

   

//     db.query("UPDATE childTasks SET child_status=? WHERE childtodo_id=?", [status, taskid], (err, result) => {

//         if (err) {
//             res.status(500)
//             res.json("No record updated")
//         }
//         else {
//             res.status(200)
//             res.json({ data: `${result}` })
//           //  console.log(result)


//         }

//     }
//     );

//     // db.end
// });

// displaying  checked Tasknames
// app.get("/users/:userid/todolist/:todolistid/tasks", (req, res) => {


//     db.query("SELECT childtask_name FROM childTasks where child_status=1", (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             res.send(result)
//         }
//     })

// });



//app.get("/user/:userid/todolists/:optionname", (req, res) => {

  //  const user = req.params.optionname;
    //  console.log(user)
    //db.query("SELECT Todoid FROM Todos where Todoname=?", [user], (err, result) => {
      //  if (err) {
        //    console.log(err)
        //}
        //else {
          //  res.send(result)
        //}
  //  })

//});








//deleting specific task based on taskid

app.delete("/users/:userid/todolists/:todolistId/tasks/:taskid", (req, res) => {

    const task_del_id = req.params.taskid;


    console.log("task_del=" + task_del_id)

    db.query("DELETE FROM childTasks WHERE childtodo_id=?", task_del_id, (err, result) => {
        if (err) {
            res.status(500)
            res.json("No record deleted")
        }
        else {
            res.status(200)
            console.log(result)
            res.json({ data: `${result}` })
            


        }

    });
});




//app.get("/users/:userid/todolists/:todolistId", (req, res) => {
  //  const Taskid = req.params.todolistId
    //console.log(Taskid)
    //db.query("SELECT * FROM childTasks WHERE child_status=? && Todoid=?", [0, Taskid], (err, result) => {
      //  if (err) {
        //    res.status(500)
          //  res.json("No data matching  ")
        //}
        //else {
          //  res.status(200)
            //res.json({ data: `${result}` })
            //console.log(result)


        //}
    //})
//});


// edit changes to Taskname based on taskid

app.put("/users/:userid/todolist/:todolistid/tasks/:taskid", (req, res) => {


    const userid=req.params.userid
    const todoid=req.params.todolistid
    const task_id = req.params.taskid

    const tname = req.body.taskname

    console.log(tname)

    db.query("UPDATE childTasks SET childtask_name=? WHERE childtodo_id=?", [tname, task_id], (err, result) => {

        if (err) {
            res.status(500)
            res.json("updating Failed  ")
        }
        else {
            res.status(200)
            res.json({ data: `${result.insertId}` })
            console.log(result)


        }


    }
    );

});


// Editing todoname based on Todoid




app.listen(4000, () => {


    console.log("running on port 4000")
})
