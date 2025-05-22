// // 
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// const FinalizedCandidates = () => {
//   const { jobId } = useParams();
//   const [candidates, setCandidates] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFinalizedCandidates = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/candidates/job/${jobId}`);
//         const sortedCandidates = response.data
//           .filter((candidate) => candidate.extract_predicted_matching_percentage) // Only include candidates with a final score
//           .sort((a, b) => b.extract_predicted_matching_percentage - a.extract_predicted_matching_percentage); // Highest score first

//         setCandidates(sortedCandidates);
//       } catch (error) {
//         setError("Failed to fetch finalized candidates.");
//       }
//     };

//     fetchFinalizedCandidates();
//   }, [jobId]);

//   // Pagination logic
//   const totalPages = Math.ceil(candidates.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);

//   // Function to calculate GitHub/LinkedIn/Transcript Matching Percentage
//   const calculateAverageMarks = (candidate) => {
//     const githubMarks = candidate.github_marks || 0;
//     const linkedinMarks = candidate.linkedin_marks || 0;
//     const transcriptMarks = candidate.transcript_marks || 0;

//     const averageMarks = (githubMarks + linkedinMarks + transcriptMarks) / 3;
//     return averageMarks.toFixed(2); // Round to 2 decimal places
//   };

//   // Function to call the Finalized Score API
//   const handleFinalizeClick = async (candidateId) => {
//     try {
//       await axios.post(`http://localhost:5000/candidates/finalized_score/${candidateId}`);
//       alert("Finalized Score calculated and updated successfully!");
//       window.location.reload(); // Refresh page after updating score
//     } catch (error) {
//       alert("Failed to calculate Finalized Score.");
//     }
//   };

//   return (
//     <>
//       <PageMeta title="Finalized Candidates" description="List of candidates with final scores" />
//       <PageBreadcrumb pageTitle="Finalized Candidates" />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <button
//           className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Finalized Candidates</h1>

//         {error ? (
//           <p className="text-red-400 font-semibold">{error}</p>
//         ) : (
//           <div className="bg-[#352F44] shadow-lg p-4 rounded-lg">
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-[#5C5470] text-[#DBD8E3]">
//                     <th className="py-2 px-4">First Name</th>
//                     <th className="py-2 px-4">Last Name</th>
//                     <th className="py-2 px-4">Email</th>
//                     <th className="py-2 px-4">Predicted Matching Percentage</th>
//                     <th className="py-2 px-4">GitHb/Linkedin/Transcript Matching Percentage</th>
//                     <th className="py-2 px-4">Finalized Matching Percentage</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentRecords.map((candidate) => (
//                     <tr key={candidate._id} className="border-b border-gray-600 text-[#DBD8E3]">
//                       <td className="py-2 px-4">{candidate.firstName}</td>
//                       <td className="py-2 px-4">{candidate.lastName}</td>
//                       <td className="py-2 px-4">{candidate.confirmEmail}</td>
//                       <td className="py-2 px-4 font-bold text-[#4CAF50]">
//                         {candidate.extract_predicted_matching_percentage}%
//                       </td>
//                       <td className="py-2 px-4 font-bold text-[#FFA500]">
//                         {calculateAverageMarks(candidate)}%
//                       </td>
//                       <td className="py-2 px-4">
//                         <button
//                           className="bg-[#DBD8E3] text-black px-3 py-1 rounded-lg hover:bg-[#5C5470] hover:text-white"
//                           onClick={() => handleFinalizeClick(candidate._id)}
//                         >
//                           Finalized
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

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

// export default FinalizedCandidates;


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// // Define the Candidate type based on your data structure
// interface Candidate {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   confirmEmail: string;
//   extract_predicted_matching_percentage: number;
//   github_marks?: number;
//   linkedin_marks?: number;
//   transcript_marks?: number;
// }

// const FinalizedCandidates: React.FC = () => {
//   const { jobId } = useParams<{ jobId: string }>();
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const recordsPerPage = 10;
//   const [error, setError] = useState<string>("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFinalizedCandidates = async () => {
//       try {
//         const response = await axios.get<Candidate[]>(`http://localhost:5000/candidates/job/${jobId}`);
//         const sortedCandidates = response.data
//           .filter((candidate) => candidate.extract_predicted_matching_percentage) // Only include candidates with a final score
//           .sort((a, b) => b.extract_predicted_matching_percentage - a.extract_predicted_matching_percentage); // Highest score first

//         setCandidates(sortedCandidates);
//       } catch (error) {
//         setError("Failed to fetch finalized candidates.");
//       }
//     };

//     fetchFinalizedCandidates();
//   }, [jobId]);

//   // Pagination logic
//   const totalPages = Math.ceil(candidates.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);

//   // Function to calculate GitHub/LinkedIn/Transcript Matching Percentage
//   const calculateAverageMarks = (candidate: Candidate) => {
//     const githubMarks = candidate.github_marks || 0;
//     const linkedinMarks = candidate.linkedin_marks || 0;
//     const transcriptMarks = candidate.transcript_marks || 0;

//     const averageMarks = (githubMarks + linkedinMarks + transcriptMarks) / 3;
//     return averageMarks.toFixed(2); // Round to 2 decimal places
//   };

//   // Function to call the Finalized Score API
//   const handleFinalizeClick = async (candidateId: string) => {
//     try {
//       await axios.post(`http://localhost:5000/candidates/finalized_score/${candidateId}`);
//       alert("Finalized Score calculated and updated successfully!");
//       window.location.reload(); // Refresh page after updating score
//     } catch (error) {
//       alert("Failed to calculate Finalized Score.");
//     }
//   };

//   return (
//     <>
//       <PageMeta title="Finalized Candidates" description="List of candidates with final scores" />
//       <PageBreadcrumb pageTitle="Finalized Candidates" />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <button
//           className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Finalized Candidates</h1>

//         {error ? (
//           <p className="text-red-400 font-semibold">{error}</p>
//         ) : (
//           <div className="bg-[#352F44] shadow-lg p-4 rounded-lg">
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-[#5C5470] text-[#DBD8E3]">
//                     <th className="py-2 px-4">First Name</th>
//                     <th className="py-2 px-4">Last Name</th>
//                     <th className="py-2 px-4">Email</th>
//                     <th className="py-2 px-4">Predicted Matching Percentage</th>
//                     <th className="py-2 px-4">GitHb/Linkedin/Transcript Matching Percentage</th>
//                     <th className="py-2 px-4">Finalized Matching Percentage</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentRecords.map((candidate) => (
//                     <tr key={candidate._id} className="border-b border-gray-600 text-[#DBD8E3]">
//                       <td className="py-2 px-4">{candidate.firstName}</td>
//                       <td className="py-2 px-4">{candidate.lastName}</td>
//                       <td className="py-2 px-4">{candidate.confirmEmail}</td>
//                       <td className="py-2 px-4 font-bold text-[#4CAF50]">
//                         {candidate.extract_predicted_matching_percentage}%
//                       </td>
//                       <td className="py-2 px-4 font-bold text-[#FFA500]">
//                         {calculateAverageMarks(candidate)}%
//                       </td>
//                       <td className="py-2 px-4">
//                         <button
//                           className="bg-[#DBD8E3] text-black px-3 py-1 rounded-lg hover:bg-[#5C5470] hover:text-white"
//                           onClick={() => handleFinalizeClick(candidate._id)}
//                         >
//                           Finalized
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

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

// export default FinalizedCandidates;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


// Define the Candidate type based on your data structure
interface Candidate {
  _id: string;
  firstName: string;
  lastName: string;
  confirmEmail: string;
  extract_predicted_matching_percentage: number;
  github_marks?: number;
  linkedin_marks?: number;
  transcript_marks?: number;
}

const FinalizedCandidates: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const recordsPerPage = 10;
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFinalizedCandidates = async () => {
      try {
        const response = await axios.get<Candidate[]>(`http://localhost:5000/candidates/job/${jobId}`);
        const sortedCandidates = response.data
          .filter((candidate) => candidate.extract_predicted_matching_percentage) // Only include candidates with a final score
          .sort((a, b) => b.extract_predicted_matching_percentage - a.extract_predicted_matching_percentage); // Highest score first

        setCandidates(sortedCandidates);
        setFilteredCandidates(sortedCandidates);
      } catch (error) {
        setError("Failed to fetch finalized candidates.");
      }
    };

    fetchFinalizedCandidates();
  }, [jobId]);

  // Search functionality
  useEffect(() => {
    const filtered = candidates.filter((candidate) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        candidate.firstName.toLowerCase().includes(searchLower) ||
        candidate.lastName.toLowerCase().includes(searchLower) ||
        candidate.confirmEmail.toLowerCase().includes(searchLower) ||
        candidate.extract_predicted_matching_percentage.toString().includes(searchLower) ||
        calculateAverageMarks(candidate).toString().includes(searchLower)
      );
    });
    setFilteredCandidates(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, candidates]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCandidates.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredCandidates.slice(indexOfFirstRecord, indexOfLastRecord);

  // Function to calculate GitHub/LinkedIn/Transcript Matching Percentage
  const calculateAverageMarks = (candidate: Candidate) => {
    const githubMarks = candidate.github_marks || 0;
    const linkedinMarks = candidate.linkedin_marks || 0;
    const transcriptMarks = candidate.transcript_marks || 0;

    const averageMarks = (githubMarks + linkedinMarks + transcriptMarks) / 3;
    return averageMarks.toFixed(2); // Round to 2 decimal places
  };

  // Function to call the Finalized Score API
  const handleFinalizeClick = async (candidateId: string) => {
    try {
      await axios.post(`http://localhost:5000/candidates/finalized_score/${candidateId}`);
      alert("Finalized Score calculated and updated successfully!");
      window.location.reload(); // Refresh page after updating score
    } catch (error) {
      alert("Failed to calculate Finalized Score.");
    }
  };

  // Function to get score color based on percentage
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  // Function to get score background color
  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500/20 border-emerald-500/30";
    if (score >= 60) return "bg-yellow-500/20 border-yellow-500/30";
    if (score >= 40) return "bg-orange-500/20 border-orange-500/30";
    return "bg-red-500/20 border-red-500/30";
  };

  return (
    <>
     

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div className="flex items-center gap-4 mb-4 lg:mb-0">
              <button
                className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                onClick={() => navigate(-1)}
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Go Back
              </button>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <span className="text-2xl">🗂️</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Finalized Candidates</h1>
                  <p className="text-slate-300">Manage and review candidate scores</p>
                </div>
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
                placeholder="Search candidates..."
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
                  <p className="text-blue-200 text-sm font-medium">Total Candidates</p>
                  <p className="text-2xl font-bold text-white">{filteredCandidates.length}</p>
                </div>
                <div className="p-3 bg-blue-500/30 rounded-lg">
                  <span className="text-xl">👥</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-200 text-sm font-medium">High Scorers (80%+)</p>
                  <p className="text-2xl font-bold text-white">
                    {filteredCandidates.filter(c => c.extract_predicted_matching_percentage >= 80).length}
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/30 rounded-lg">
                  <span className="text-xl">⭐</span>
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

          {error ? (
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <p className="text-red-200 font-semibold">{error}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-700/50 to-slate-600/50">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span>👤</span>
                          First Name
                        </div>
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span>👤</span>
                          Last Name
                        </div>
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span>📧</span>
                          Email
                        </div>
                      </th>
                      <th className="py-4 px-6 text-center text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-white/10">
                        <div className="flex items-center justify-center gap-2">
                          <span>🎯</span>
                          Predicted Score
                        </div>
                      </th>
                      <th className="py-4 px-6 text-center text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-white/10">
                        <div className="flex items-center justify-center gap-2">
                          <span>📊</span>
                          Average Score
                        </div>
                      </th>
                      <th className="py-4 px-6 text-center text-sm font-semibold text-slate-200 uppercase tracking-wider border-b border-white/10">
                        <div className="flex items-center justify-center gap-2">
                          <span>✅</span>
                          Action
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {currentRecords.map((candidate) => (
                      <tr key={candidate._id} className="hover:bg-white/5 transition-colors duration-200">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {candidate.firstName.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-white font-medium">{candidate.firstName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-300 font-medium">{candidate.lastName}</td>
                        <td className="py-4 px-6">
                          <span className="text-slate-300 bg-slate-700/50 px-3 py-1 rounded-full text-sm">
                            {candidate.confirmEmail}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${getScoreBgColor(candidate.extract_predicted_matching_percentage)}`}>
                            <span className="text-xl">🎯</span>
                            <span className={`font-bold ${getScoreColor(candidate.extract_predicted_matching_percentage)}`}>
                              {candidate.extract_predicted_matching_percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${getScoreBgColor(parseFloat(calculateAverageMarks(candidate)))}`}>
                            <span className="text-xl">📊</span>
                            <span className={`font-bold ${getScoreColor(parseFloat(calculateAverageMarks(candidate)))}`}>
                              {calculateAverageMarks(candidate)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
                            onClick={() => handleFinalizeClick(candidate._id)}
                          >
                            <span className="text-lg group-hover:scale-110 transition-transform duration-300">✅</span>
                            Finalize
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredCandidates.length === 0 && !error && (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">🔍</span>
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">No candidates found</h3>
                  <p className="text-slate-400">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
              <div className="text-slate-400 text-sm">
                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredCandidates.length)} of {filteredCandidates.length} candidates
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

export default FinalizedCandidates;