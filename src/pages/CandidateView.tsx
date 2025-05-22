

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// const CandidateList = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/candidates")
//       .then((response) => {
//         setCandidates(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching candidates:", error);
//       });
//   }, []);

//   // Pagination Logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(candidates.length / recordsPerPage);

//   return (
//     <>
//       <PageMeta title="Candidates List" description="View all candidates" />
//       <PageBreadcrumb pageTitle="All Candidates" />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4 text-center">Candidates</h1>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-[#352F44] text-[#DBD8E3] rounded-lg">
//             <thead>
//               <tr className="border-b border-gray-600 text-left">
//                 <th className="p-3">First Name</th>
//                 <th className="p-3">Last Name</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Job Position</th>
//                 <th className="p-3">Job Title</th>
//                 <th className="p-3 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRecords.map((candidate) => (
//                 <tr key={candidate._id} className="border-b border-gray-700">
//                   <td className="p-3">{candidate.firstName}</td>
//                   <td className="p-3">{candidate.lastName}</td>
//                   <td className="p-3">{candidate.confirmEmail}</td>
//                   <td className="p-3">{candidate.jobPosition}</td>
//                   <td className="p-3">{candidate.jobTitle}</td>
//                   <td className="p-3 text-center">
//                     <button
//                       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                      // onClick={() => navigate(`/candidate/${candidate._id}`)}
//                       onClick={() => {navigate(`/single/candidate/${candidate._id}`)
//                     }}
//                     >
//                       View More
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

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
//       </div>
//     </>
//   );
// };

// export default CandidateList;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;   // ← magic line

interface Candidate {
  _id: string;
  firstName: string;
  lastName: string;
  confirmEmail: string;
  jobPosition: string;
  jobTitle: string;
}

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Candidate[]>(`${API_URL}/candidates`)
      .then((response) => {
        setCandidates(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(candidates.length / recordsPerPage);

 return (
    <>
   
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Candidate Directory
            </h1>
            <p className="text-gray-300 text-lg">Manage and review all job applications</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Total Candidates</p>
                  <p className="text-white text-xl font-semibold">{currentRecords.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">✅</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Active Applications</p>
                  <p className="text-white text-xl font-semibold">{currentRecords.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📋</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Page {currentPage}</p>
                  <p className="text-white text-xl font-semibold">of {totalPages}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span>🗂️</span> Candidate Applications
              </h2>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 text-left text-gray-200 font-semibold">
                      <div className="flex items-center gap-2">
                        <span>👤</span> First Name
                      </div>
                    </th>
                    <th className="p-4 text-left text-gray-200 font-semibold">
                      <div className="flex items-center gap-2">
                        <span>👤</span> Last Name
                      </div>
                    </th>
                    <th className="p-4 text-left text-gray-200 font-semibold">
                      <div className="flex items-center gap-2">
                        <span>📧</span> Email
                      </div>
                    </th>
                    <th className="p-4 text-left text-gray-200 font-semibold">
                      <div className="flex items-center gap-2">
                        <span>💼</span> Position
                      </div>
                    </th>
                    <th className="p-4 text-left text-gray-200 font-semibold">
                      <div className="flex items-center gap-2">
                        <span>🏷️</span> Job Title
                      </div>
                    </th>
                    <th className="p-4 text-center text-gray-200 font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span>⚡</span> Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((candidate) => (
                    <tr 
                      key={candidate._id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {candidate.firstName?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <span className="text-white font-medium">{candidate.firstName}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">{candidate.lastName}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400">📧</span>
                          <span className="text-gray-300">{candidate.confirmEmail}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                          <span>💼</span>
                          {candidate.jobPosition}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                          <span>🏷️</span>
                          {candidate.jobTitle}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          className="group/btn relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                          onClick={() => {
                            navigate(`/single/candidate/${candidate._id}`);
                          }}
                        >
                          <span>👁️</span>
                          View Details
                          <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {currentRecords.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📭</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No Candidates Found</h3>
                <p className="text-gray-400">There are no candidate applications to display at the moment.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span>📄</span>
                    <span>Page {currentPage} of {totalPages}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === 1
                          ? "bg-gray-600/20 text-gray-500 cursor-not-allowed"
                          : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                      }`}
                      onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <span>←</span>
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, index) => {
                        const pageNum = index + 1;
                        const isActive = currentPage === pageNum;
                        
                        // Show first page, last page, current page, and pages around current
                        const showPage = pageNum === 1 || 
                                        pageNum === totalPages || 
                                        Math.abs(pageNum - currentPage) <= 1;
                        
                        if (!showPage) {
                          // Show ellipsis
                          if (pageNum === 2 && currentPage > 4) {
                            return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                          }
                          if (pageNum === totalPages - 1 && currentPage < totalPages - 3) {
                            return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                          }
                          return null;
                        }

                        return (
                          <button
                            key={pageNum}
                            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                              isActive
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white hover:scale-105"
                            }`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === totalPages
                          ? "bg-gray-600/20 text-gray-500 cursor-not-allowed"
                          : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                      }`}
                      onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CandidateList;
