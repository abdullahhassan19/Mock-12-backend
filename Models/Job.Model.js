const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  role: { type: String, required: true },
  level: { type: String, required: true },
  contract: { type: String, required: true },
  position: { type: String, required: true },
  language: { type: String, required: true },
  postedAt:{type:String}
});

const jobmodel = mongoose.model("Jobmodel", JobSchema);

module.exports = { jobmodel };
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