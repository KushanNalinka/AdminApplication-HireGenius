// import  { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;
//   const navigate = useNavigate();

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

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = jobs.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(jobs.length / recordsPerPage);

//   return (
//     <>
//       <PageMeta
//     title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
//     description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//   />
//   <PageBreadcrumb pageTitle="Jobs with Applied Candidates" />
//     <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//       <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Jobs with Applied Candidates</h1>
//       <div className="bg-[#352F44] shadow-lg p-4 rounded-lg">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-[#5C5470] text-[#DBD8E3]">
//                 <th className="py-2 px-4">Job ID</th>
//                 <th className="py-2 px-4">Job Title</th>
//                 <th className="py-2 px-4">Job Name</th>
//                 <th className="py-2 px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRecords.map((job) => (
//                 <tr key={job._id} className="border-b border-gray-600 text-[#DBD8E3]">
//                   <td className="py-2 px-4">{job.jobID}</td>
//                   <td className="py-2 px-4">{job.jobTitle}</td>
//                   <td className="py-2 px-4">{job.jobName}</td>
//                   <td className="flex gap-2 justify-center ">
//                     <button
//                       className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//                       onClick={() => navigate(`/candidates/${job._id}`)}
//                     >
//                       View All Candidates
//                     </button>
//                     <button
//                         className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
//                         onClick={() => navigate(`/finalized/ranked/${job._id}`)}
//                       >
//                         View Finalized Candidates
//                       </button>
//                       <button
//                         className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
//                         onClick={() => navigate(`/completed/final-ranked/${job._id}`)}
//                       >
//                         View Ranked Candidates
//                       </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             className={`mx-1 px-4 py-2 rounded-lg ${
//               currentPage === index + 1 ? "bg-[#DBD8E3] text-black" : "bg-[#5C5470] text-white"
//             } hover:bg-[#DBD8E3] hover:text-black`}
//             onClick={() => setCurrentPage(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default JobList;
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// // Define TypeScript type for job item
// interface Job {
//   _id: string;
//   jobID: string;
//   jobTitle: string;
//   jobName: string;
// }

// const JobList: React.FC = () => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const recordsPerPage = 10;
//   const navigate = useNavigate();

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

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = jobs.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(jobs.length / recordsPerPage);

//   return (
//     <>
//       <PageMeta
//         title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
//         description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <PageBreadcrumb pageTitle="Jobs with Applied Candidates" />
//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">
//           Jobs with Applied Candidates
//         </h1>
//         <div className="bg-[#352F44] shadow-lg p-4 rounded-lg">
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-[#5C5470] text-[#DBD8E3]">
//                   <th className="py-2 px-4">Job ID</th>
//                   <th className="py-2 px-4">Job Title</th>
//                   <th className="py-2 px-4">Job Name</th>
//                   <th className="py-2 px-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentRecords.map((job) => (
//                   <tr
//                     key={job._id}
//                     className="border-b border-gray-600 text-[#DBD8E3]"
//                   >
//                     <td className="py-2 px-4">{job.jobID}</td>
//                     <td className="py-2 px-4">{job.jobTitle}</td>
//                     <td className="py-2 px-4">{job.jobName}</td>
//                     <td className="flex gap-2 justify-center ">
//                       <button
//                         className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//                         onClick={() => navigate(`/candidates/${job._id}`)}
//                       >
//                         View All Candidates
//                       </button>
//                       <button
//                         className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
//                         onClick={() => navigate(`/finalized/ranked/${job._id}`)}
//                       >
//                         View Finalized Candidates
//                       </button>
//                       <button
//                         className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
//                         onClick={() => navigate(`/completed/final-ranked/${job._id}`)}
//                       >
//                         View Ranked Candidates
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               className={`mx-1 px-4 py-2 rounded-lg ${
//                 currentPage === index + 1
//                   ? "bg-[#DBD8E3] text-black"
//                   : "bg-[#5C5470] text-white"
//               } hover:bg-[#DBD8E3] hover:text-black`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default JobList;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// Define TypeScript type for job item
interface Job {
  _id: string;
  jobID: string;
  jobTitle: string;
  jobName: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const recordsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>("http://localhost:5000/jobs");
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        job.jobID.toLowerCase().includes(searchLower) ||
        job.jobTitle.toLowerCase().includes(searchLower) ||
        job.jobName.toLowerCase().includes(searchLower)
      );
    });
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, jobs]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredJobs.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredJobs.length / recordsPerPage);

  return (
    <>
      
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div className="flex items-center gap-4 mb-4 lg:mb-0">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <span className="text-2xl">🗂️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Jobs with Applied Candidates</h1>
                <p className="text-slate-300">Manage job postings and candidate applications</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-80 pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Total Jobs</p>
                  <p className="text-2xl font-bold text-white">{filteredJobs.length}</p>
                </div>
                <div className="p-3 bg-blue-500/30 rounded-lg">
                  <span className="text-xl">💼</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-200 text-sm font-medium">Active Positions</p>
                  <p className="text-2xl font-bold text-white">{jobs.length}</p>
                </div>
                <div className="p-3 bg-emerald-500/30 rounded-lg">
                  <span className="text-xl">✅</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Current Page</p>
                  <p className="text-2xl font-bold text-white">{currentPage} of {totalPages}</p>
                </div>
                <div className="p-3 bg-purple-500/30 rounded-lg">
                  <span className="text-xl">📄</span>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Grid - Mobile First Approach */}
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-700/50 to-slate-600/50">
                    <tr>
                      <th className="py-4 px-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span>🆔</span>
                          Job ID
                        </div>
                      </th>
                      <th className="py-4 px-4 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span>📋</span>
                          Job Info
                        </div>
                      </th>
                      <th className="py-4 px-4 text-center text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-white/10">
                        <div className="flex items-center justify-center gap-2">
                          <span>⚡</span>
                          Actions
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {currentRecords.map((job) => (
                      <tr key={job._id} className="hover:bg-white/5 transition-colors duration-200">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {job.jobID.slice(-2)}
                            </div>
                            <span className="text-white font-mono bg-slate-700/50 px-3 py-1 rounded-full text-sm">
                              {job.jobID}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <h3 className="text-white font-semibold text-sm mb-1">{job.jobTitle}</h3>
                            <p className="text-slate-300 text-sm">{job.jobName}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              className="group inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-xs"
                              onClick={() => navigate(`/candidates/${job._id}`)}
                            >
                              <span className="text-xs">👥</span>
                              All
                            </button>
                            <button
                              className="group inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-3 py-2 rounded-lg font-medium shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 text-xs"
                              onClick={() => navigate(`/finalized/ranked/${job._id}`)}
                            >
                              <span className="text-xs">✅</span>
                              Finalized
                            </button>
                            <button
                              className="group inline-flex items-center gap-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-3 py-2 rounded-lg font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 text-xs"
                              onClick={() => navigate(`/completed/final-ranked/${job._id}`)}
                            >
                              <span className="text-xs">🏆</span>
                              Ranked
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {currentRecords.map((job) => (
                <div key={job._id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {job.jobID.slice(-2)}
                      </div>
                      <div>
                        <span className="text-white font-mono bg-slate-700/50 px-3 py-1 rounded-full text-sm">
                          {job.jobID}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{job.jobTitle}</h3>
                    <p className="text-slate-300 text-sm">{job.jobName}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      onClick={() => navigate(`/candidates/${job._id}`)}
                    >
                      <span className="text-lg">👥</span>
                      View All Candidates
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-3 py-2 rounded-lg font-medium shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-sm"
                        onClick={() => navigate(`/finalized/ranked/${job._id}`)}
                      >
                        <span>✅</span>
                        Finalized
                      </button>
                      <button
                        className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-3 py-2 rounded-lg font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm"
                        onClick={() => navigate(`/completed/final-ranked/${job._id}`)}
                      >
                        <span>🏆</span>
                        Ranked
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No jobs found</h3>
                <p className="text-slate-400">Try adjusting your search criteria</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
              <div className="text-slate-400 text-sm">
                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredJobs.length)} of {filteredJobs.length} jobs
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      currentPage === index + 1
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 hover:bg-white/20"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobList;