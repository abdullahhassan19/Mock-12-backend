const { Router } = require("express");
const { jobmodel } = require("../Models/Job.Model");
const JobRouter = Router();
// {
// 		"company": "Ellette",
// 		"postedAt": "2021-03-30",
// 		"city": "Gangtok",
// 		"location": "American Samoa",
// 		"role": "Frontend",
// 		"level": "Junior",
// 		"contract": "Full Time",
// 		"position": " Backend Developer",
// 		"language": "Java"
// }
JobRouter.post("/create", (req, res) => {
  const {
    company,
    city,
    location,
    role,
    level,
    contract,
    position,
    language,
  } = req.body;

  const newJob = new jobmodel({
    company,
    postedAt: new Date().toISOString().split('T')[0],
    city,
    location,
    role,
    level,
    contract,
    position,
    language,
  });
  console.log(newJob);
  try {
    newJob.save();
    res.send({ msg: "newJob" });
  } catch {
    res.send({ msg: "Error" });
  }
});

JobRouter.get("/get", async (req, res) => {
    // http://localhost:8080/get?page=1&role=Frontend&sort=new
  let { page, sort, role } = req.query;
  console.log(page, sort, role);

  if(role&&sort){
    if(sort==="new"){
        const jobs = await jobmodel
          .find({ role: role })
          .sort({ postedAt: -1 })
          .skip(page > 0 ? (page - 1) * 10 : 0)
          .limit(10);
        try {
          res.send({ msg: "success", jobs: jobs });
        } catch {
          res.send({ msg: "failed" });
        }
    }
    else{
         const jobs = await jobmodel
           .find({ role: role })
           .sort({ postedAt: 1 })
           .skip(page > 0 ? (page - 1) * 10 : 0)
           .limit(10);
         try {
           res.send({ msg: "success", jobs: jobs });
         } catch {
           res.send({ msg: "failed" });
         }
    }
    return
  }
   if (role || sort) {
     if (sort) {
        if(sort==="new"){
            const jobs = await jobmodel
              .find()
              .sort({ postedAt: -1 })
              .skip(page > 0 ? (page - 1) * 10 : 0)
              .limit(10);
            try {
              res.send({ msg: "success", jobs: jobs });
            } catch {
              res.send({ msg: "failed" });
            }
        }
        else{
            const jobs = await jobmodel
              .find()
              .sort({ postedAt: 1 })
              .skip(page > 0 ? (page - 1) * 10 : 0)
              .limit(10);
            try {
              res.send({ msg: "success", jobs: jobs });
            } catch {
              res.send({ msg: "failed" });
            }
        }
       
       
    }
     if (role) {
       const jobs = await jobmodel
         .find({ role: role })
         .skip(page > 0 ? (page - 1) * 10 : 0)
         .limit(10);
       try {
         res.send({ msg: "success", jobs: jobs });
       } catch {
         res.send({ msg: "failed" });
       }
     }
     return;
   }

    
});


JobRouter.get("/getrole/:role", async (req, res) => {
    // http://localhost:8080/getrole/FullStack
    const {role}=req.params
    console.log(role)
  const jobs = await jobmodel.find({role:role});
    try{
        res.send({ msg: "success" ,"jobs":jobs });
    }
    catch{
        res.send({ msg: "failed", });
    }
   
    
});
JobRouter.get("/search/:search", async (req, res) => {
  // http://localhost:8080/getsear/Java
  const { search } = req.params;
  console.log(search);
  const jobs = await jobmodel.find({ language: search });
  try {
    res.send({ msg: "success", jobs: jobs });
  } catch {
    res.send({ msg: "failed" });
  }
});
JobRouter.get("/getsort/:sort", async (req, res) => {
  // http://localhost:8080/getsort/NEW
  const { sort } = req.params;
  console.log(sort);
  if (sort == "NEW") {
    console.log("IFFF");
    const jobs = await jobmodel.find().sort({ postedAt: -1 });
    try {
      res.send({ msg: "successif", jobs: jobs });
    } catch {
      res.send({ msg: "failed" });
    }
  } else {
    console.log("Elxe");
    const jobs = await jobmodel.find().sort({ postedAt: 1 });
    try {
      res.send({ msg: "successelse", jobs: jobs });
    } catch {
      res.send({ msg: "failed" });
    }
  }
});


module.exports = { JobRouter };
