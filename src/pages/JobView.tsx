
// import { useEffect, useState } from "react";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// const JobUpdatePopup = ({ job, onUpdate, onClose }) => {
//   const [formData, setFormData] = useState({
//     jobTitle: job.jobTitle || "",
//     jobLocation: job.jobLocation || "",
//     jobType: job.jobType || "",
//     jobName: job.jobName || "",
//     jobDepartment: job.jobDepartment || "",
//     qualifications: job.qualifications || "",
//     requiredSkills: job.requiredSkills || "",
//     experience: job.experience || "",
//     duties: job.duties || "",
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     for (const key in formData) {
//       form.append(key, formData[key]);
//     }

//     try {
//       await axios.put(`http://localhost:5000/jobs/${job._id}`, form);
//       onUpdate();
//       onClose();
//     } catch (error) {
//       console.error("Error updating job:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-[#352F44] p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-auto text-[#DBD8E3]">
//         <h2 className="text-xl font-bold mb-4">Update Job</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           {Object.keys(formData).map((key) =>
//             key !== "file" ? (
//               <input
//                 key={key}
//                 className="w-full p-2 rounded bg-[#5C5470] text-white"
//                 type="text"
//                 name={key}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 placeholder={key.replace(/([A-Z])/g, " $1")}
//               />
//             ) : (
//               <input
//                 key={key}
//                 className="w-full p-2 rounded bg-[#5C5470] text-white"
//                 type="file"
//                 name={key}
//                 onChange={handleFileChange}
//               />
//             )
//           )}
//           <button type="submit" className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg w-full">
//             Update Job
//           </button>
//         </form>
//         <button className="mt-3 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// const JobDetailsPopup = ({ job, onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-[#352F44] p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-auto text-[#DBD8E3]">
//         <h2 className="text-xl font-bold mb-4">{job.jobTitle}</h2>
//         <table className="w-full border-collapse border border-gray-500">
//           <tbody>
//             {Object.entries(job).map(([key, value]) => (
//               <tr key={key}>
//                 <td className="p-2 border border-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
//                 <td className="p-2 border border-gray-500">{value || "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button className="mt-3 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [viewJob, setViewJob] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 10;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/jobs");
//         setJobs(response.data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobId) => {
//     try {
//       await axios.delete(`http://localhost:5000/jobs/${jobId}`);
//       setJobs(jobs.filter((job) => job._id !== jobId));
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };

//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(jobs.length / jobsPerPage);

//   return (
//     <>
//       <PageMeta title="Job List" description="List of available jobs" />
//       <PageBreadcrumb pageTitle="All Jobs" />
//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Job List</h1>
//         <table className="w-full border-collapse border border-gray-500 text-[#DBD8E3]">
//           <thead>
//             <tr className="bg-[#5C5470] text-[#DBD8E3]">
//               <th className="py-2 px-4 border border-gray-500">Job Title</th>
//               <th className="py-2 px-4 border border-gray-500">Location</th>
//               <th className="py-2 px-4 border border-gray-500">Type</th>
//               <th className="py-2 px-4 border border-gray-500">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentJobs.map((job) => (
//               <tr key={job._id} className="border border-gray-500 hover:bg-[#5C5470] transition">
//                 <td className="p-2 border">{job.jobTitle}</td>
//                 <td className="p-2 border">{job.jobLocation}</td>
//                 <td className="p-2 border">{job.jobType}</td>
//                 <td className="p-2 flex space-x-2">
//                   <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setViewJob(job)}>
//                     View More
//                   </button>
//                   <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => setSelectedJob(job)}>
//                     Update
//                   </button>
//                   <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(job._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* Pagination */}
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               className={`mx-1 px-4 py-2 rounded-lg ${
//                 currentPage === index + 1 ? "bg-[#DBD8E3] text-black" : "bg-[#5C5470] text-white"
//               } hover:bg-[#DBD8E3] hover:text-black`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//         {selectedJob && <JobUpdatePopup job={selectedJob} onUpdate={() => setJobs([...jobs])} onClose={() => setSelectedJob(null)} />}
//         {viewJob && <JobDetailsPopup job={viewJob} onClose={() => setViewJob(null)} />}
//       </div>
//     </>
//   );
// };

// export default JobList;



// import { useEffect, useState, ChangeEvent, FormEvent } from "react";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// interface Job {
//   _id: string;
//   jobTitle: string;
//   jobLocation: string;
//   jobType: string;
//   jobName?: string;
//   jobDepartment?: string;
//   qualifications?: string;
//   requiredSkills?: string;
//   experience?: string;
//   duties?: string;
//   [key: string]: any; // to allow other keys for JobDetailsPopup
// }

// interface JobUpdatePopupProps {
//   job: Job;
//   onUpdate: () => void;
//   onClose: () => void;
// }

// const JobUpdatePopup = ({ job, onUpdate, onClose }: JobUpdatePopupProps) => {
//   const [formData, setFormData] = useState<{
//     jobTitle: string;
//     jobLocation: string;
//     jobType: string;
//     jobName: string;
//     jobDepartment: string;
//     qualifications: string;
//     requiredSkills: string;
//     experience: string;
//     duties: string;
//     file: File | null;
//   }>({
//     jobTitle: job.jobTitle || "",
//     jobLocation: job.jobLocation || "",
//     jobType: job.jobType || "",
//     jobName: job.jobName || "",
//     jobDepartment: job.jobDepartment || "",
//     qualifications: job.qualifications || "",
//     requiredSkills: job.requiredSkills || "",
//     experience: job.experience || "",
//     duties: job.duties || "",
//     file: null,
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const form = new FormData();
//     for (const key in formData) {
//       // @ts-ignore
//       form.append(key, formData[key]);
//     }

//     try {
//       await axios.put(`http://localhost:5000/jobs/${job._id}`, form);
//       onUpdate();
//       onClose();
//     } catch (error) {
//       console.error("Error updating job:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-[#352F44] p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-auto text-[#DBD8E3]">
//         <h2 className="text-xl font-bold mb-4">Update Job</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           {Object.keys(formData).map((key) =>
//             key !== "file" ? (
//               <input
//                 key={key}
//                 className="w-full p-2 rounded bg-[#5C5470] text-white"
//                 type="text"
//                 name={key}
//                 value={(formData as any)[key]}
//                 onChange={handleChange}
//                 placeholder={key.replace(/([A-Z])/g, " $1")}
//               />
//             ) : (
//               <input
//                 key={key}
//                 className="w-full p-2 rounded bg-[#5C5470] text-white"
//                 type="file"
//                 name={key}
//                 onChange={handleFileChange}
//               />
//             )
//           )}
//           <button type="submit" className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg w-full">
//             Update Job
//           </button>
//         </form>
//         <button className="mt-3 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// interface JobDetailsPopupProps {
//   job: Job;
//   onClose: () => void;
// }

// const JobDetailsPopup = ({ job, onClose }: JobDetailsPopupProps) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-[#352F44] p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-auto text-[#DBD8E3]">
//         <h2 className="text-xl font-bold mb-4">{job.jobTitle}</h2>
//         <table className="w-full border-collapse border border-gray-500">
//           <tbody>
//             {Object.entries(job).map(([key, value]) => (
//               <tr key={key}>
//                 <td className="p-2 border border-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
//                 <td className="p-2 border border-gray-500">{value || "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button className="mt-3 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// const JobList = () => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [viewJob, setViewJob] = useState<Job | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const jobsPerPage = 10;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get<Job[]>("http://localhost:5000/jobs");
//         setJobs(response.data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobId: string) => {
//     try {
//       await axios.delete(`http://localhost:5000/jobs/${jobId}`);
//       setJobs(jobs.filter((job) => job._id !== jobId));
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };

//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(jobs.length / jobsPerPage);

//   return (
//     <>
//       <PageMeta title="Job List" description="List of available jobs" />
//       <PageBreadcrumb pageTitle="All Jobs" />
//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Job List</h1>
//         <table className="w-full border-collapse border border-gray-500 text-[#DBD8E3]">
//           <thead>
//             <tr className="bg-[#5C5470] text-[#DBD8E3]">
//               <th className="py-2 px-4 border border-gray-500">Job Title</th>
//               <th className="py-2 px-4 border border-gray-500">Location</th>
//               <th className="py-2 px-4 border border-gray-500">Type</th>
//               <th className="py-2 px-4 border border-gray-500">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentJobs.map((job) => (
//               <tr key={job._id} className="border border-gray-500 hover:bg-[#5C5470] transition">
//                 <td className="p-2 border">{job.jobTitle}</td>
//                 <td className="p-2 border">{job.jobLocation}</td>
//                 <td className="p-2 border">{job.jobType}</td>
//                 <td className="p-2 flex space-x-2">
//                   <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setViewJob(job)}>
//                     View More
//                   </button>
//                   <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => setSelectedJob(job)}>
//                     Update
//                   </button>
//                   <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(job._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* Pagination */}
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               className={`mx-1 px-4 py-2 rounded-lg ${
//                 currentPage === index + 1 ? "bg-[#DBD8E3] text-black" : "bg-[#5C5470] text-white"
//               } hover:bg-[#DBD8E3] hover:text-black`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//         {selectedJob && <JobUpdatePopup job={selectedJob} onUpdate={() => setJobs([...jobs])} onClose={() => setSelectedJob(null)} />}
//         {viewJob && <JobDetailsPopup job={viewJob} onClose={() => setViewJob(null)} />}
//       </div>
//     </>
//   );
// };

// export default JobList;


import { useEffect, useState, ChangeEvent, FormEvent, useMemo} from "react";
import axios from "axios";

import { usePopupContext } from "../context/PopupContext";
const API_URL = import.meta.env.VITE_API_URL as string;

interface Job {
  _id: string;
  jobTitle: string;
  jobLocation: string;
  jobType: string;
  jobName?: string;
  jobDepartment?: string;
  qualifications?: string;
  requiredSkills?: string;
  experience?: string;
  duties?: string;
  [key: string]: any;
}

interface JobUpdatePopupProps {
  job: Job;
  onUpdate: () => void;
  onClose: () => void;
}

// const JobUpdatePopup = ({ job, onUpdate, onClose }: JobUpdatePopupProps) => {
//   const { openPopup, closePopup } = usePopupContext();

//   useEffect(() => {
//     openPopup();
//     return () => closePopup();
//   }, []);

//   const [formData, setFormData] = useState({
//     jobTitle: job.jobTitle || "",
//     jobLocation: job.jobLocation || "",
//     jobType: job.jobType || "",
//     jobName: job.jobName || "",
//     jobDepartment: job.jobDepartment || "",
//     qualifications: job.qualifications || "",
//     requiredSkills: job.requiredSkills || "",
//     experience: job.experience || "",
//     duties: job.duties || "",
//     file: null as File | null,
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const form = new FormData();
//     for (const key in formData) {
//       form.append(key, (formData as any)[key]);
//     }

//     try {
//       await axios.put(`http://localhost:5000/jobs/${job._id}`, form);
//       onUpdate();
//       onClose();
//     } catch (error) {
//       console.error("Error updating job:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
//       <div className="bg-[#352F44] p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-auto text-[#DBD8E3]">
//         <h2 className="text-xl font-bold mb-4">Update Job</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           {Object.keys(formData).map((key) =>
//             key !== "file" ? (
//               <input
//                 key={key}
//                 className="w-full p-2 rounded bg-[#5C5470] text-white"
//                 type="text"
//                 name={key}
//                 value={(formData as any)[key]}
//                 onChange={handleChange}
//                 placeholder={key.replace(/([A-Z])/g, " $1")}
//               />
//             ) : (
//               <input
//                 key={key}
//                 className="w-full p-2 rounded bg-[#5C5470] text-white"
//                 type="file"
//                 name={key}
//                 onChange={handleFileChange}
//               />
//             )
//           )}
//           <button type="submit" className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg w-full">
//             Update Job
//           </button>
//         </form>
//         <button className="mt-3 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };


const JobUpdatePopup = ({ job, onUpdate, onClose }: JobUpdatePopupProps) => {
  const { openPopup, closePopup } = usePopupContext();

  useEffect(() => {
    openPopup();
    return () => closePopup();
  }, []);

  const [formData, setFormData] = useState({
    jobTitle: job.jobTitle || "",
    jobLocation: job.jobLocation || "",
    jobType: job.jobType || "",
    jobName: job.jobName || "",
    jobDepartment: job.jobDepartment || "",
    qualifications: job.qualifications || "",
    requiredSkills: job.requiredSkills || "",
    experience: job.experience || "",
    duties: job.duties || "",
    file: null as File | null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, (formData as any)[key]);
    }

    try {
      await axios.put(`${API_URL}/jobs/${job._id}`, form);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl">
                <span className="text-2xl">✏️</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Update Job</h2>
                <p className="text-sm text-gray-400">Modify job details and information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-gray-400 hover:text-white"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 max-h-[calc(90vh-180px)] overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => {
              const getFieldIcon = (fieldKey: string) => {
                const iconMap: Record<string, string> = {
                  jobTitle: '🏷️',
                  jobLocation: '📍',
                  jobType: '⏰',
                  salary: '💰',
                  companyName: '🏢',
                  description: '📄',
                  requirements: '📋',
                  benefits: '🎁',
                  experience: '👨‍💼',
                  skills: '🛠️',
                  department: '🏛️',
                  contactEmail: '📧',
                  contactPhone: '📞',
                  applicationDeadline: '📅',
                  postedDate: '📆',
                  status: '🔄',
                  category: '🗂️',
                  workMode: '🌐',
                  education: '🎓',
                  industry: '🏭',
                  file: '📎'
                };
                return iconMap[fieldKey] || '📝';
              };

              const formatFieldName = (fieldKey: string) =>
                fieldKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();

              const isLongTextField = ['description', 'requirements', 'benefits'].includes(key);

              return key !== "file" ? (
                <div key={key} className="group">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                    <span className="text-base">{getFieldIcon(key)}</span>
                    <span>{formatFieldName(key)}</span>
                  </label>
                  {isLongTextField ? (
                    <textarea
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-200 resize-none"
                      name={key}
                      value={(formData as any)[key]}
                      onChange={handleChange}
                      placeholder={`Enter ${formatFieldName(key).toLowerCase()}...`}
                      rows={4}
                    />
                  ) : (
                    <input
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all duration-200"
                      type={key.includes('email') ? 'email' : key.includes('phone') ? 'tel' : key.includes('date') ? 'date' : key.includes('salary') ? 'number' : 'text'}
                      name={key}
                      value={(formData as any)[key]}
                      onChange={handleChange}
                      placeholder={`Enter ${formatFieldName(key).toLowerCase()}...`}
                    />
                  )}
                </div>
              ) : (
                <div key={key} className="group">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                    <span className="text-base">{getFieldIcon(key)}</span>
                    <span>Attachment</span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-500/20 file:text-emerald-400 hover:file:bg-emerald-500/30 file:cursor-pointer cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      type="file"
                      name={key}
                      onChange={handleFileChange}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <span className="text-gray-400 text-sm">Choose file</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </form>
        </div>

        {/* Footer */}
        <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <span>📊</span>
                <span>{Object.keys(formData).length} Fields</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>💾</span>
                <span>Auto-save enabled</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 font-medium border border-white/20 flex items-center space-x-2"
              >
                <span>❌</span>
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg shadow-emerald-500/25 flex items-center space-x-2"
              >
                <span>💾</span>
                <span>Update Job</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// interface JobDetailsPopupProps {
//   job: Job;
//   onClose: () => void;
// }

// const JobDetailsPopup = ({ job, onClose }: JobDetailsPopupProps) => {
//   const { openPopup, closePopup } = usePopupContext();

//   useEffect(() => {
//     openPopup();
//     return () => closePopup();
//   }, []);

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
//       <div className="bg-[#352F44] p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-auto text-[#DBD8E3]">
//         <h2 className="text-xl font-bold mb-4">{job.jobTitle}</h2>
//         <table className="w-full border-collapse border border-gray-500">
//           <tbody>
//             {Object.entries(job).map(([key, value]) => (
//               <tr key={key}>
//                 <td className="p-2 border border-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
//                 <td className="p-2 border border-gray-500">{value || "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button className="mt-3 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };




interface JobDetailsPopupProps {
  job: Job;
  onClose: () => void;
}

const JobDetailsPopup = ({ job, onClose }: JobDetailsPopupProps) => {
  const { openPopup, closePopup } = usePopupContext();

  useEffect(() => {
    openPopup();
    return () => closePopup();
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 rounded-2xl shadow-2xl w-[700px] max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{job.jobTitle}</h2>
                <p className="text-sm text-gray-400">Job Details & Information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-gray-400 hover:text-white"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(85vh-120px)] overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {Object.entries(job).map(([key, value]) => {
              const getFieldIcon = (fieldKey: string) => {
                const iconMap: Record<string, string> = {
                  jobTitle: "🏷️",
                  jobLocation: "📍",
                  jobType: "⏰",
                  salary: "💰",
                  companyName: "🏢",
                  description: "📄",
                  requirements: "📋",
                  benefits: "🎁",
                  experience: "👨‍💼",
                  skills: "🛠️",
                  department: "🏛️",
                  contactEmail: "📧",
                  contactPhone: "📞",
                  applicationDeadline: "📅",
                  postedDate: "📆",
                  status: "🔄",
                  category: "🗂️",
                  workMode: "🌐",
                  education: "🎓",
                  industry: "🏭",
                };
                return iconMap[fieldKey] || "📝";
              };

              const formatFieldName = (fieldKey: string) =>
                fieldKey
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())
                  .trim();

              const formatValue = (val: any) => {
                if (!val) return "N/A";
                if (typeof val === "string" && val.length > 100) return val;
                return val.toString();
              };

              const isLongText = value && value.toString().length > 100;

              return (
                <div
                  key={key}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 bg-white/10 rounded-lg">
                        <span className="text-lg">{getFieldIcon(key)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-300">
                            {formatFieldName(key)}
                          </h3>
                          {isLongText && (
                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                              Extended
                            </span>
                          )}
                        </div>
                        <div
                          className={`text-white ${
                            isLongText ? "text-sm leading-relaxed" : "text-base"
                          }`}
                        >
                          {formatValue(value)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <span>📊</span>
                <span>{Object.keys(job).length} Fields</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🕒</span>
                <span>Last Updated</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-medium border border-white/20"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(job, null, 2));
                }}
                className="px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200 font-medium border border-blue-500/30 flex items-center space-x-2"
              >
                <span>📋</span>
                <span>Copy Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




// const JobList = () => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [viewJob, setViewJob] = useState<Job | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const jobsPerPage = 10;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get<Job[]>("http://localhost:5000/jobs");
//         setJobs(response.data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobId: string) => {
//     try {
//       await axios.delete(`http://localhost:5000/jobs/${jobId}`);
//       setJobs(jobs.filter((job) => job._id !== jobId));
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };

//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(jobs.length / jobsPerPage);

//   return (
//     <>
//       <PageMeta title="Job List" description="List of available jobs" />
//       <PageBreadcrumb pageTitle="All Jobs" />
//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Job List</h1>
//         <table className="w-full border-collapse border border-gray-500 text-[#DBD8E3]">
//           <thead>
//             <tr className="bg-[#5C5470] text-[#DBD8E3]">
//               <th className="py-2 px-4 border border-gray-500">Job Title</th>
//               <th className="py-2 px-4 border border-gray-500">Location</th>
//               <th className="py-2 px-4 border border-gray-500">Type</th>
//               <th className="py-2 px-4 border border-gray-500">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentJobs.map((job) => (
//               <tr key={job._id} className="border border-gray-500 hover:bg-[#5C5470] transition">
//                 <td className="p-2 border">{job.jobTitle}</td>
//                 <td className="p-2 border">{job.jobLocation}</td>
//                 <td className="p-2 border">{job.jobType}</td>
//                 <td className="p-2 flex space-x-2">
//                   <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setViewJob(job)}>
//                     View More
//                   </button>
//                   <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => setSelectedJob(job)}>
//                     Update
//                   </button>
//                   <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(job._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               className={`mx-1 px-4 py-2 rounded-lg ${
//                 currentPage === index + 1 ? "bg-[#DBD8E3] text-black" : "bg-[#5C5470] text-white"
//               } hover:bg-[#DBD8E3] hover:text-black`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>

//         {selectedJob && (
//           <JobUpdatePopup job={selectedJob} onUpdate={() => setJobs([...jobs])} onClose={() => setSelectedJob(null)} />
//         )}
//         {viewJob && <JobDetailsPopup job={viewJob} onClose={() => setViewJob(null)} />}
//       </div>
//     </>
//   );
// };

// export default JobList;





const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const jobsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>(`${API_URL}/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (jobId: string) => {
    try {
      await axios.delete(`${API_URL}/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) {
      return jobs;
    }
    return jobs.filter((job) =>
      job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobLocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [jobs, searchQuery]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  

  return (
  <>
    
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header Section */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white">Job Management</h1>
                <p className="text-sm text-gray-400">Manage and organize your job listings</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="text-lg">📊</span>
              <span>{filteredJobs.length} of {jobs.length} Jobs</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search jobs by title, location, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Jobs Grid/Table Container */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          {/* Table Header */}
          <div className="bg-white/5 border-b border-white/10">
            <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-300">
              <div className="col-span-4 flex items-center space-x-2">
                <span className="text-lg">🗂️</span>
                <span>Job Title</span>
              </div>
              <div className="col-span-3 flex items-center space-x-2">
                <span className="text-lg">📍</span>
                <span>Location</span>
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <span className="text-lg">🏷️</span>
                <span>Type</span>
              </div>
              <div className="col-span-3 flex items-center space-x-2">
                <span className="text-lg">⚙️</span>
                <span>Actions</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/10">
            {currentJobs.map((job) => (
              <div
                key={job._id}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-all duration-200 group"
              >
                <div className="col-span-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {job.jobTitle.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{job.jobTitle}</h3>
                    <p className="text-xs text-gray-400">ID: {job._id.slice(-6)}</p>
                  </div>
                </div>
                
                <div className="col-span-3 flex items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">📍</span>
                    <span className="text-gray-300">{job.jobLocation}</span>
                  </div>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.jobType === 'Full-time' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : job.jobType === 'Part-time'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {job.jobType}
                  </span>
                </div>
                
                <div className="col-span-3 flex items-center space-x-2">
                  <button
                    onClick={() => setViewJob(job)}
                    className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200 flex items-center space-x-1 text-sm border border-blue-500/30"
                  >
                    <span>👁️</span>
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-all duration-200 flex items-center space-x-1 text-sm border border-emerald-500/30"
                  >
                    <span>✏️</span>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200 flex items-center space-x-1 text-sm border border-red-500/30"
                  >
                    <span>🗑️</span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-medium text-white mb-2">No jobs found</h3>
              <p className="text-gray-400">
                {searchQuery ? `No jobs match "${searchQuery}"` : 'No jobs available at the moment'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200 text-sm border border-blue-500/30"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Previous
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  const isActive = currentPage === pageNum;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📈</span>
              <div>
                <p className="text-sm text-gray-400">Total Jobs</p>
                <p className="text-xl font-semibold text-white">{filteredJobs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📄</span>
              <div>
                <p className="text-sm text-gray-400">Current Page</p>
                <p className="text-xl font-semibold text-white">{currentPage} of {totalPages}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="text-sm text-gray-400">Showing Results</p>
                <p className="text-xl font-semibold text-white">{currentJobs.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedJob && (
        <JobUpdatePopup 
          job={selectedJob} 
          onUpdate={() => setJobs([...jobs])} 
          onClose={() => setSelectedJob(null)} 
        />
      )}
      {viewJob && (
        <JobDetailsPopup 
          job={viewJob} 
          onClose={() => setViewJob(null)} 
        />
      )}
    </div>
  </>
);
};

export default JobList;
