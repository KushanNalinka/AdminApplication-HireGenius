

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import PageMeta from "../components/common/PageMeta";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";

// const JobForm = () => {
//   const navigate = useNavigate();
//   const { jobID } = useParams();
//   const [formData, setFormData] = useState({
//     jobID: "",
//     jobTitle: "",
//     jobName: "",
//     jobLocation: "",
//     jobType: "onsite",
//     jobDepartment: "",
//     qualifications: "",
//     requiredSkills: "",
//     skills: "",
//     experience: "",
//     duties: "",
//     jobDescription: "",
//     requiredQualifications: "",
//     yearsOfExperience: "0",
//     jobPostedDate: new Date(),
//     jobEndsDate: new Date(),
//   });

//   const [file, setFile] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [preliminaryQuestions, setPreliminaryQuestions] = useState(["", "", "", "", ""]);

//   useEffect(() => {
//     if (jobID) {
//       const fetchJob = async () => {
//         const response = await axios.get(`http://localhost:5000/jobs/${jobID}`);
//         setFormData(response.data);
//       };
//       fetchJob();
//     }
//   }, [jobID]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handlePreliminaryChange = (index, value) => {
//     const updatedQuestions = [...preliminaryQuestions];
//     updatedQuestions[index] = value;
//     setPreliminaryQuestions(updatedQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();

//     Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
//     if (file) formDataToSend.append("file", file);
//     formDataToSend.append("preliminaryQuestions", JSON.stringify(preliminaryQuestions));

//     if (jobID) {
//       await axios.put(`http://localhost:5000/jobs/${jobID}`, formDataToSend);
//       alert("Job updated successfully!");
//     } else {
//       await axios.post("http://localhost:5000/jobs", formDataToSend);
//       alert("Job added successfully!");
//     }

//     navigate("/");
//   };

//   return (
//     <>
//       <PageMeta title="React.js Job Form | TailAdmin" description="Job Form Page" />
//       <PageBreadcrumb pageTitle="Job Create Form" />
//       <div className="flex items-center justify-center min-h-screen bg-[#2A2438] p-6">
//         <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl bg-[#352F44] p-8 rounded-lg shadow-2xl">
//           <h1 className="text-3xl font-bold text-center text-[#DBD8E3] mb-6">{jobID ? "Edit Job" : "Create New Job"}</h1>
//           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            
//             <label className="text-[#DBD8E3]">Job ID</label>
//             <input type="text" name="jobID" value={formData.jobID} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             <label className="text-[#DBD8E3]">Job Title</label>
//             <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             <label className="text-[#DBD8E3]">Job Name</label>
//             <input type="text" name="jobName" value={formData.jobName} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             <label className="text-[#DBD8E3]">Job Location</label>
//             <input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             <label className="text-[#DBD8E3]">Job Type</label>
//             <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white">
//               <option value="onsite">Onsite</option>
//               <option value="remote">Remote</option>
//               <option value="hybrid">Hybrid</option>
//             </select>

//             <label className="text-[#DBD8E3]">Years of Experience</label>
//             <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white">
//               {[...Array(21).keys()].map(num => (
//                 <option key={num} value={num}>{num}</option>
//               ))}
//             </select>

//             <label className="text-[#DBD8E3]">Qualifications</label>
// <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

// <label className="text-[#DBD8E3]">Required Skills</label>
// <textarea name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

// <label className="text-[#DBD8E3]">Skills</label>
// <textarea name="skills" value={formData.skills} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

// <label className="text-[#DBD8E3]">Experience</label>
// <textarea name="experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

// <label className="text-[#DBD8E3]">Duties</label>
// <textarea name="duties" value={formData.duties} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

// <label className="text-[#DBD8E3]">Job Description</label>
// <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

// <label className="text-[#DBD8E3]">Required Qualifications</label>
// <textarea name="requiredQualifications" value={formData.requiredQualifications} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />


//             <label className="text-[#DBD8E3]">Upload Job File</label>
//             <input type="file" onChange={handleFileChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <label className="text-[#DBD8E3] col-span-2">Job Posted Date</label>
//             <DatePicker selected={formData.jobPostedDate} onChange={(date) => setFormData({ ...formData, jobPostedDate: date })} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             <label className="text-[#DBD8E3] col-span-2">Job Ends Date</label>
//             <DatePicker selected={formData.jobEndsDate} onChange={(date) => setFormData({ ...formData, jobEndsDate: date })} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />
            
//             <button type="button" onClick={() => setShowModal(true)} className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 col-span-2">
//               Add Preliminary Questions
//             </button>

//             <button type="submit" className="w-full bg-[#DBD8E3] text-black py-3 rounded-lg text-lg font-semibold transition duration-300 col-span-2 hover:bg-[#5C5470] hover:text-white">
//               {jobID ? "Update Job" : "Submit"}
//             </button>
//           </form>
//         </motion.div>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-[#352F44] p-6 rounded-lg shadow-lg w-1/3">
//             <h2 className="text-xl text-[#DBD8E3] font-bold mb-4">Add Preliminary Questions</h2>
//             {preliminaryQuestions.map((q, i) => (
//               <input key={i} type="text" value={q} onChange={(e) => handlePreliminaryChange(i, e.target.value)} className="w-full p-2 border rounded-lg mb-2 bg-[#5C5470] text-white" />
//             ))}
//             <button onClick={() => setShowModal(false)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Close</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default JobForm;

// import { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import "react-datepicker/dist/react-datepicker.css";
// import PageMeta from "../components/common/PageMeta";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";

// interface FormData {
//   jobID: string;
//   jobTitle: string;
//   jobName: string;
//   jobLocation: string;
//   jobType: "onsite" | "remote" | "hybrid";
//   jobDepartment: string;
//   qualifications: string;
//   requiredSkills: string;
//   skills: string;
//   experience: string;
//   duties: string;
//   jobDescription: string;
//   requiredQualifications: string;
//   yearsOfExperience: string;
//   jobPostedDate: Date;
//   jobEndsDate: Date;
// }

// const JobForm: React.FC = () => {
//   const navigate = useNavigate();
//   const { jobID } = useParams<{ jobID: string }>();
//   const [formData, setFormData] = useState<FormData>({
//     jobID: "",
//     jobTitle: "",
//     jobName: "",
//     jobLocation: "",
//     jobType: "onsite",
//     jobDepartment: "",
//     qualifications: "",
//     requiredSkills: "",
//     skills: "",
//     experience: "",
//     duties: "",
//     jobDescription: "",
//     requiredQualifications: "",
//     yearsOfExperience: "0",
//     jobPostedDate: new Date(),
//     jobEndsDate: new Date(),
//   });

//   const [file, setFile] = useState<File | null>(null);
 


//   useEffect(() => {
//     if (jobID) {
//       const fetchJob = async () => {
//         const response = await axios.get<FormData>(`http://localhost:5000/jobs/${jobID}`);
//         setFormData(response.data);
//       };
//       fetchJob();
//     }
//   }, [jobID]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

 

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();

//     Object.keys(formData).forEach((key) => {
//       const k = key as keyof FormData;
//       const val = formData[k];
//       // For Date objects, convert to ISO string
//       if (val instanceof Date) {
//         formDataToSend.append(key, val.toISOString());
//       } else {
//         formDataToSend.append(key, val);
//       }
//     });
//     if (file) formDataToSend.append("file", file);
   

//     if (jobID) {
//       await axios.put(`http://localhost:5000/jobs/${jobID}`, formDataToSend);
//       alert("Job updated successfully!");
//     } else {
//       await axios.post("http://localhost:5000/jobs", formDataToSend);
//       alert("Job added successfully!");
//     }

//     navigate("/");
//   };

//   return (
//     <>
//       <PageMeta title="React.js Job Form | TailAdmin" description="Job Form Page" />
//       <PageBreadcrumb pageTitle="Job Create Form" />
//       <div className="flex items-center justify-center min-h-screen bg-[#2A2438] p-6">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-4xl bg-[#352F44] p-8 rounded-lg shadow-2xl"
//         >
//           <h1 className="text-3xl font-bold text-center text-[#DBD8E3] mb-6">{jobID ? "Edit Job" : "Create New Job"}</h1>
//           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//             <label className="text-[#DBD8E3]">Job ID</label>
//             <input
//               type="text"
//               name="jobID"
//               value={formData.jobID}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white"
//             />

//             <label className="text-[#DBD8E3]">Job Title</label>
//             <input
//               type="text"
//               name="jobTitle"
//               value={formData.jobTitle}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white"
//             />

//             <label className="text-[#DBD8E3]">Job Name</label>
//             <input
//               type="text"
//               name="jobName"
//               value={formData.jobName}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white"
//             />

//             <label className="text-[#DBD8E3]">Job Location</label>
//             <input
//               type="text"
//               name="jobLocation"
//               value={formData.jobLocation}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white"
//             />

//             <label className="text-[#DBD8E3]">Job Type</label>
//             <select
//               name="jobType"
//               value={formData.jobType}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white"
//             >
//               <option value="onsite">Onsite</option>
//               <option value="remote">Remote</option>
//               <option value="hybrid">Hybrid</option>
//             </select>

//             <label className="text-[#DBD8E3]">Years of Experience</label>
//             <select
//               name="yearsOfExperience"
//               value={formData.yearsOfExperience}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white"
//             >
//               {[...Array(21).keys()].map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </select>

//             <label className="text-[#DBD8E3]">Qualifications</label>
//             <textarea
//               name="qualifications"
//               value={formData.qualifications}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2"
//             />

//             <label className="text-[#DBD8E3]">Required Skills</label>
//             <textarea
//               name="requiredSkills"
//               value={formData.requiredSkills}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2"
//             />

//             <label className="text-[#DBD8E3]">Skills</label>
//             <textarea
//               name="skills"
//               value={formData.skills}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2"
//             />

//             <label className="text-[#DBD8E3]">Experience</label>
//             <textarea
//               name="experience"
//               value={formData.experience}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2"
//             />

//             <label className="text-[#DBD8E3]">Duties</label>
//             <textarea
//               name="duties"
//               value={formData.duties}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2"
//             />

//             <label className="text-[#DBD8E3]">Job Description</label>
//             <textarea
//               name="jobDescription"
//               value={formData.jobDescription}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2"
//             />

//             <label className="text-[#DBD8E3]">Required Qualifications</label>
//             <textarea
//               name="requiredQualifications"
//               value={formData.requiredQualifications}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2"
//             />

//             <label className="text-[#DBD8E3]">Upload Job File</label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2"
//             />

         

          

//             <button
//               type="submit"
//               className="w-full bg-[#DBD8E3] text-black py-3 rounded-lg text-lg font-semibold transition duration-300 col-span-2 hover:bg-[#5C5470] hover:text-white"
//             >
//               {jobID ? "Update Job" : "Submit"}
//             </button>
//           </form>
//         </motion.div>
//       </div>

     
//     </>
//   );
// };

// export default JobForm;


// import { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import "react-datepicker/dist/react-datepicker.css";
// import PageMeta from "../components/common/PageMeta";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";

// interface FormData {
//   jobID: string;
//   jobTitle: string;
//   jobName: string;
//   jobLocation: string;
//   jobType: "onsite" | "remote" | "hybrid";
//   jobDepartment: string;
//   qualifications: string;
//   requiredSkills: string;
//   skills: string;
//   experience: string;
//   duties: string;
//   jobDescription: string;
//   requiredQualifications: string;
//   yearsOfExperience: string;
//   jobPostedDate: Date;
//   jobEndsDate: Date;
//   technology: string;
//   hiringManagerNeed: string;
//   whatWeExpect: string;
//   candidateExpectations: string;
// }

// const JobForm: React.FC = () => {
//   const navigate = useNavigate();
//   const { jobID } = useParams<{ jobID: string }>();
//   const [formData, setFormData] = useState<FormData>({
//     jobID: "",
//     jobTitle: "",
//     jobName: "",
//     jobLocation: "",
//     jobType: "onsite",
//     jobDepartment: "",
//     qualifications: "",
//     requiredSkills: "",
//     skills: "",
//     experience: "",
//     duties: "",
//     jobDescription: "",
//     requiredQualifications: "",
//     yearsOfExperience: "0",
//     jobPostedDate: new Date(),
//     jobEndsDate: new Date(),
//     technology: "",
//     hiringManagerNeed: "",
//     whatWeExpect: "",
//     candidateExpectations: "",
//   });

//   const [file, setFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (jobID) {
//       const fetchJob = async () => {
//         const response = await axios.get<FormData>(`http://localhost:5000/jobs/${jobID}`);
//         setFormData(response.data);
//       };
//       fetchJob();
//     }
//   }, [jobID]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();

//     Object.keys(formData).forEach((key) => {
//       const k = key as keyof FormData;
//       const val = formData[k];
//       formDataToSend.append(key, val instanceof Date ? val.toISOString() : val);
//     });

//     if (file) formDataToSend.append("file", file);

//     if (jobID) {
//       await axios.put(`http://localhost:5000/jobs/${jobID}`, formDataToSend);
//       alert("Job updated successfully!");
//     } else {
//       await axios.post("http://localhost:5000/jobs", formDataToSend);
//       alert("Job added successfully!");
//     }

//     navigate("/");
//   };

//   return (
//     <>
//       <PageMeta title="React.js Job Form | TailAdmin" description="Job Form Page" />
//       <PageBreadcrumb pageTitle="Job Create Form" />
//       <div className="flex items-center justify-center min-h-screen bg-[#2A2438] p-6">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-4xl bg-[#352F44] p-8 rounded-lg shadow-2xl"
//         >
//           <h1 className="text-3xl font-bold text-center text-[#DBD8E3] mb-6">{jobID ? "Edit Job" : "Create New Job"}</h1>
//           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//             {/* Existing Fields */}
//             <label className="text-[#DBD8E3]">Job ID</label>
//             <input name="jobID" value={formData.jobID} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             <label className="text-[#DBD8E3]">Job Title</label>
//             <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             <label className="text-[#DBD8E3]">Job Name</label>
//             <input name="jobName" value={formData.jobName} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             <label className="text-[#DBD8E3]">Job Location</label>
//             <input name="jobLocation" value={formData.jobLocation} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             <label className="text-[#DBD8E3]">Job Type</label>
//             <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white">
//               <option value="onsite">Onsite</option>
//               <option value="remote">Remote</option>
//               <option value="hybrid">Hybrid</option>
//             </select>

//             <label className="text-[#DBD8E3]">Years of Experience</label>
//             <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white">
//               {[...Array(21).keys()].map((num) => (
//                 <option key={num} value={num}>{num}</option>
//               ))}
//             </select>

//             <label className="text-[#DBD8E3]">Technology</label>
//             <input name="technology" value={formData.technology} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             {/* Dates */}
//             <label className="text-[#DBD8E3]">Date Posted</label>
//             <input type="date" name="jobPostedDate" value={formData.jobPostedDate.toISOString().split("T")[0]} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             <label className="text-[#DBD8E3]">Date Ended</label>
//             <input type="date" name="jobEndsDate" value={formData.jobEndsDate.toISOString().split("T")[0]} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white" />

//             {/* New Textareas */}
//             <label className="text-[#DBD8E3]">Hiring Manager Need</label>
//             <textarea name="hiringManagerNeed" value={formData.hiringManagerNeed} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <label className="text-[#DBD8E3]">What We Expect</label>
//             <textarea name="whatWeExpect" value={formData.whatWeExpect} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <label className="text-[#DBD8E3]">Candidate Expectations</label>
//             <textarea name="candidateExpectations" value={formData.candidateExpectations} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             {/* Other Fields */}
//             <label className="text-[#DBD8E3]">Qualifications</label>
//             <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <label className="text-[#DBD8E3]">Required Skills</label>
//             <textarea name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <label className="text-[#DBD8E3]">Skills</label>
//             <textarea name="skills" value={formData.skills} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <label className="text-[#DBD8E3]">Experience</label>
//             <textarea name="experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <label className="text-[#DBD8E3]">Duties</label>
//             <textarea name="duties" value={formData.duties} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <label className="text-[#DBD8E3]">Job Description</label>
//             <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <label className="text-[#DBD8E3]">Required Qualifications</label>
//             <textarea name="requiredQualifications" value={formData.requiredQualifications} onChange={handleChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <label className="text-[#DBD8E3]">Upload Job File</label>
//             <input type="file" onChange={handleFileChange} className="w-full p-3 border rounded-lg bg-[#5C5470] text-white col-span-2" />

//             <button type="submit" className="w-full bg-[#DBD8E3] text-black py-3 rounded-lg text-lg font-semibold transition duration-300 col-span-2 hover:bg-[#5C5470] hover:text-white">
//               {jobID ? "Update Job" : "Submit"}
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default JobForm;



import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

interface FormData {
  jobID: string;
  jobTitle: string;
  jobName: string;
  jobLocation: string;
  jobType: "onsite" | "remote" | "hybrid";
  jobDepartment: string;
  qualifications: string;
  requiredSkills: string;
  skills: string;
  experience: string;
  duties: string;
  jobDescription: string;
  requiredQualifications: string;
  yearsOfExperience: string;
  jobPostedDate: Date;
  jobEndsDate: Date;
  technology: string;
  hiringManagerNeed: string;
  whatWeExpect: string;
  candidateExpectations: string;
}

const JobForm: React.FC = () => {
  const navigate = useNavigate();
  const { jobID } = useParams<{ jobID: string }>();
  const [formData, setFormData] = useState<FormData>({
    jobID: "",
    jobTitle: "",
    jobName: "",
    jobLocation: "",
    jobType: "onsite",
    jobDepartment: "",
    qualifications: "",
    requiredSkills: "",
    skills: "",
    experience: "",
    duties: "",
    jobDescription: "",
    requiredQualifications: "",
    yearsOfExperience: "0",
    jobPostedDate: new Date(),
    jobEndsDate: new Date(),
    technology: "",
    hiringManagerNeed: "",
    whatWeExpect: "",
    candidateExpectations: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (jobID) {
      const fetchJob = async () => {
        const response = await axios.get<FormData>(`http://localhost:5000/jobs/${jobID}`);
        setFormData(response.data);
      };
      fetchJob();
    }
  }, [jobID]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      const k = key as keyof FormData;
      const val = formData[k];
      formDataToSend.append(key, val instanceof Date ? val.toISOString() : val);
    });

    if (file) formDataToSend.append("file", file);

    if (jobID) {
      await axios.put(`http://localhost:5000/jobs/${jobID}`, formDataToSend);
      alert("Job updated successfully!");
    } else {
      await axios.post("http://localhost:5000/jobs", formDataToSend);
      alert("Job added successfully!");
    }

    navigate("/");
  };

  return (
    <>
      <PageMeta title="React.js Job Form | TailAdmin" description="Job Form Page" />
      <PageBreadcrumb pageTitle="Job Create Form" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20"
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {jobID ? "✏️ Edit Job Position" : "🚀 Create New Job"}
            </h1>
            <p className="text-gray-300 text-lg">Fill in the details to post your job opportunity</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>🏢</span> Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>🆔</span> Job ID
                  </label>
                  <input 
                    name="jobID" 
                    value={formData.jobID} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder="Enter unique job ID"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>📝</span> Job Title
                  </label>
                  <input 
                    name="jobTitle" 
                    value={formData.jobTitle} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder="e.g., Senior Frontend Developer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>🏷️</span> Job Name
                  </label>
                  <input 
                    name="jobName" 
                    value={formData.jobName} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder="Internal job name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>📍</span> Location
                  </label>
                  <input 
                    name="jobLocation" 
                    value={formData.jobLocation} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder="e.g., New York, NY"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>🏠</span> Work Type
                  </label>
                  <select 
                    name="jobType" 
                    value={formData.jobType} 
                    onChange={handleChange} 
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  >
                    <option value="onsite" className="bg-gray-800">🏢 Onsite</option>
                    <option value="remote" className="bg-gray-800">🌐 Remote</option>
                    <option value="hybrid" className="bg-gray-800">🔄 Hybrid</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>⏳</span> Experience Required
                  </label>
                  <select 
                    name="yearsOfExperience" 
                    value={formData.yearsOfExperience} 
                    onChange={handleChange} 
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  >
                    {[...Array(21).keys()].map((num) => (
                      <option key={num} value={num} className="bg-gray-800">
                        {num === 0 ? "Entry Level" : `${num} ${num === 1 ? 'Year' : 'Years'}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="flex items-center gap-2 text-gray-200 font-medium">
                  <span>💻</span> Technology Stack
                </label>
                <input 
                  name="technology" 
                  value={formData.technology} 
                  onChange={handleChange} 
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  placeholder="e.g., React, Node.js, Python, AWS"
                />
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>📅</span> Timeline
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>🚀</span> Posted Date
                  </label>
                  <input 
                    type="date" 
                    name="jobPostedDate" 
                    value={formData.jobPostedDate.toISOString().split("T")[0]} 
                    onChange={handleChange} 
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>⏰</span> Application Deadline
                  </label>
                  <input 
                    type="date" 
                    name="jobEndsDate" 
                    value={formData.jobEndsDate.toISOString().split("T")[0]} 
                    onChange={handleChange} 
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Job Requirements Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>📋</span> Requirements & Expectations
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>🎯</span> Hiring Manager Need
                  </label>
                  <textarea 
                    name="hiringManagerNeed" 
                    value={formData.hiringManagerNeed} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="What does the hiring manager specifically need from this role?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>✅</span> What We Expect
                  </label>
                  <textarea 
                    name="whatWeExpect" 
                    value={formData.whatWeExpect} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="Outline key expectations and performance metrics"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>🤝</span> Candidate Expectations
                  </label>
                  <textarea 
                    name="candidateExpectations" 
                    value={formData.candidateExpectations} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="What can candidates expect from this role and company?"
                  />
                </div>
              </div>
            </div>

            {/* Skills & Qualifications Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>🎓</span> Skills & Qualifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>📜</span> Qualifications
                  </label>
                  <textarea 
                    name="qualifications" 
                    value={formData.qualifications} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="Educational requirements, certifications, etc."
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>⭐</span> Required Skills
                  </label>
                  <textarea 
                    name="requiredSkills" 
                    value={formData.requiredSkills} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="Must-have technical and soft skills"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>🛠️</span> Preferred Skills
                  </label>
                  <textarea 
                    name="skills" 
                    value={formData.skills} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="Nice-to-have skills and technologies"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>💼</span> Experience Details
                  </label>
                  <textarea 
                    name="experience" 
                    value={formData.experience} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="Specific experience requirements and background"
                  />
                </div>
              </div>
            </div>

            {/* Job Details Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>📖</span> Job Details
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>📋</span> Key Responsibilities
                  </label>
                  <textarea 
                    name="duties" 
                    value={formData.duties} 
                    onChange={handleChange} 
                    rows={5}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="List the main duties and responsibilities"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>📝</span> Job Description
                  </label>
                  <textarea 
                    name="jobDescription" 
                    value={formData.jobDescription} 
                    onChange={handleChange} 
                    rows={6}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="Comprehensive job description including company overview, role summary, and benefits"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-200 font-medium">
                    <span>✅</span> Required Qualifications
                  </label>
                  <textarea 
                    name="requiredQualifications" 
                    value={formData.requiredQualifications} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
                    placeholder="Mandatory qualifications and requirements"
                  />
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>🗂️</span> Attachments
              </h2>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-200 font-medium">
                  <span>📎</span> Upload Job File
                </label>
                <div className="relative">
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-200 backdrop-blur-sm cursor-pointer"
                  />
                </div>
                <p className="text-gray-400 text-sm">Upload job-related documents, PDFs, or additional information</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button 
                type="submit" 
                className="group relative px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-blue-500/50 focus:outline-none min-w-64"
              >
                <span className="flex items-center justify-center gap-3">
                  <span>{jobID ? "💾" : "🚀"}</span>
                  {jobID ? "Update Job Position" : "Create Job Position"}
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
export default JobForm;
