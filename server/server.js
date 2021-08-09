const express=require("express");
const cors=require('cors');
const app=express();
const mysql=require("mysql")
const bodyParser = require("body-parser");
const { query } = require("express");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

const db=mysql.createPool({

    user:"root",
    host:"localhost",
    password:"Sonia25!",
    database:"advancedtodo",
                          });
    app.post('/taskinsert',(req,res)=>{
        
    
    const task_name=req.body.task;
    const userid=req.body.userid
    
    const today=new Date();
   
    const date=today.getDay()+"-"+today.getMonth()+"-"+today.getFullYear();


    const sqlInsert="INSERT INTO Tasks(Taskname,createddate,Tasks.user_id) VALUES(?,?,?)"
     db.query(sqlInsert,[task_name,date,userid],(err,result)=>{
 

       
                                         })
                                         
  db.end

});




app.post("/childinsert",(req,res)=>{

    const tname=req.body.task
    const childname=req.body.text
    const Taskid=req.body.Taskid
    const today=new Date();
    console.log("Taskid="+Taskid)
  console.log("tname="+tname)
    const date=today.getDay()+"-"+today.getMonth()+"-"+today.getFullYear();
   // console.log("date="+date)
  
    const sqlInsert="INSERT INTO childtodo(Taskid,childtask_name,child_date) VALUES(?,?,?)"
    db.query(sqlInsert,[Taskid,tname,date],(err,result)=>{
       
    })

      
        
    });
    
    app.post("/signupinsert",(req,res)=>{

        const fname=req.body.fname
        const lname=req.body.lname
        const ename=req.body.email
        const password=req.body.password
        const cpassword=req.body.cpassword
        
       //  console.log(fname)
        // console.log(lname)
         const sqlInsert="INSERT INTO user_info(f_name,l_name,email,password,cpassword) VALUES(?,?,?,?,?)"
         db.query(sqlInsert,[fname,lname,ename,password,cpassword],(err,result)=>{
            
         })
db.end
        
        });



        app.post("/logininsert",(req,res)=>{


            const email=req.body.email
            
            const password=req.body.password

            db.query("select user_info.user_id,email,password,f_name from user_info  WHERE email=? AND password=?",[email,password],(err,result)=>{


                if(err){
             res.send({err:err})

                }
                if (result.length>0){
                  
                    res.send(result);
                }else{

                    res.send({message:"wrong email/password"})
                }
            })
           // console.log(email)
            
db.end
///////////////////////
              
            
            });
    





app.delete("/delete/:task_del",(req,res)=>{


    const task_del=req.params.task_del;
  // console.log(task_del)
       
       db.query("DELETE FROM Tasks WHERE Taskname=?",task_del,(err,result)=>{
        if(err){
            console.log(err)
        } 
        else{
            res.send(result)
        }

    });
    


});


app.get("/fetchData/:userid",(req,res)=>{

    const user=req.params.userid;
   console.log("userid="+user)

db.query("SELECT Tasks.Taskid,Taskname FROM Tasks WHERE Tasks.user_id=?",[user],(err,result)=>{
   if(err){
       console.log(err)
    }
   else{
     res.send(result)
  }
 })

 
 });

///////////////////////////////////////////
app.get("/fetchdisplay/:taskid",(req,res)=>{

    const childid=req.params.taskid;
 //console.log("child="+childid)
db.query("SELECT childtodo_id,childtask_name,child_status FROM childtodo WHERE childtodo.Taskid=?",[childid],(err,result)=>{
   if(err){
       console.log(err)
    }
   else{
     res.send(result)
  }
 })

 
 });






///////////////////////////////////////////////////












app.put("/Childupdate",(req,res)=>{

    const tname=req.body.txtupdate
    const status=req.body.status

    
    console.log("first="+tname)
    console.log("sec="+status)
    
    db.query("UPDATE childtodo SET child_status=? WHERE childtask_name=?",[status,tname],(err,result)=>{
    
        if(err){
    
         console.log(err)
         }else
         {
    
          res.send(result);
         }
    
            
        }
       );
    
   // db.end
      });


      app.get("/showtodos",(req,res)=>{

        
        db.query("SELECT Taskname FROM Tasks",(err,result)=>{
         if(err){
             console.log(err)
         }
         else{
             res.send(result)
         }
     })
     
     });



     app.get("/fetchTaskid/:optionname",(req,res)=>{

        const user=req.params.optionname;
      //  console.log(user)
        db.query("SELECT Taskid FROM Tasks where Taskname=?",[user],(err,result)=>{
         if(err){
             console.log(err)
         }
         else{
             res.send(result)
         }
     })
     
     });










    app.delete("/childdelete/:task_del",(req,res)=>{

        const task_del=req.params.task_del;
        
        console.log("task_del="+task_del)
        
        db.query("DELETE FROM childtodo WHERE childtask_name=?",task_del,(err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                res.send(result)
            }
    
        });
    });
  

    

     app.get("/showselected/:Taskid",(req,res)=>{
       const  Taskid=req.params.Taskid
        console.log(Taskid)
        db.query("SELECT * FROM childtodo WHERE child_status=? && Taskid=?",[1,Taskid],(err,result)=>{
         if(err){
             console.log(err)
         }
         else{
             res.send(result)
         }
     })
     });




    app.put("/edit",(req,res)=>{

      const originaltxt=req.body.original_txt
      const tname=req.body.tasname
    console.log(originaltxt)
    console.log(tname)
    
      db.query("UPDATE Tasks SET Taskname=? WHERE Taskname=?",[tname,originaltxt],(err,result)=>{
    
        if(err){
    
            console.log(err)
        }else{
    
          res.send(result);
        }
    
            
        }
    );
    
    });
    



app.put("/childedit",(req,res)=>{

    const originaltxt=req.body.original_txt
   const tname=req.body.tasname
   console.log("original="+originaltxt)
   console.log("tname"+tname)

  db.query("UPDATE childtodo SET childtask_name=? WHERE childtask_name=?",[tname,originaltxt],(err,result)=>{

    if(err){

        console.log(err)
    }else{

      res.send(result);
    }

        
    }
);

});



app.listen(4000,()=>{


    console.log("running on port 4000")
})
