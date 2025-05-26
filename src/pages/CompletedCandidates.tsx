


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
//           .filter((candidate) => candidate.finalized_score) // Only include candidates with a finalized score
//           .map((candidate) => ({
//             ...candidate,
//             github_linkedin_transcript_avg: calculateAverageMarks(candidate), // Calculate avg marks
//           }))
//           .sort((a, b) => b.finalized_score - a.finalized_score); // Rank highest finalized_score first

//         setCandidates(sortedCandidates);
//       } catch (error) {
//         setError("Failed to fetch finalized candidates.");
//       }
//     };

//     fetchFinalizedCandidates();
//   }, [jobId]);

//   // Function to calculate GitHub/LinkedIn/Transcript Matching Percentage
//   const calculateAverageMarks = (candidate) => {
//     const githubMarks = candidate.github_marks || 0;
//     const linkedinMarks = candidate.linkedin_marks || 0;
//     const transcriptMarks = candidate.transcript_marks || 0;

//     return ((githubMarks + linkedinMarks + transcriptMarks) / 3).toFixed(2); // Round to 2 decimal places
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(candidates.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);

//   return (
//     <>
//       <PageMeta title="Finalized Completed Candidates" description="List of candidates with final scores" />
//       <PageBreadcrumb pageTitle="Finalized Completed Candidates" />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <button
//           className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Finalized Ranked Completed Candidates</h1>

//         {error ? (
//           <p className="text-red-400 font-semibold">{error}</p>
//         ) : (
//           <div className="bg-[#352F44] shadow-lg p-4 rounded-lg">
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-[#5C5470] text-[#DBD8E3]">
//                     <th className="py-2 px-4">Rank</th>
//                     <th className="py-2 px-4">First Name</th>
//                     <th className="py-2 px-4">Last Name</th>
//                     <th className="py-2 px-4">Email</th>
//                     <th className="py-2 px-4">Predicted Matching %</th>
//                     <th className="py-2 px-4">GitHub/LinkedIn/Transcript Matching %</th>
//                     <th className="py-2 px-4">Finalized Matching %</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentRecords.map((candidate, index) => (
//                     <tr key={candidate._id} className="border-b border-gray-600 text-[#DBD8E3]">
//                       <td className="py-2 px-4 font-bold">
//                         {index + 1 + (currentPage - 1) * recordsPerPage}
//                       </td>
//                       <td className="py-2 px-4">{candidate.firstName}</td>
//                       <td className="py-2 px-4">{candidate.lastName}</td>
//                       <td className="py-2 px-4">{candidate.confirmEmail}</td>
//                       <td className="py-2 px-4 font-bold text-[#FFA500]">
//                         {candidate.extract_predicted_matching_percentage || "N/A"}%
//                       </td>
//                       <td className="py-2 px-4 font-bold text-[#2196F3]">
//                         {candidate.github_linkedin_transcript_avg || "N/A"}%
//                       </td>
//                       <td className="py-2 px-4 font-bold text-[#4CAF50]">
//                         {candidate.finalized_score || "N/A"}%
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

 // useEffect(() => {
  //   const fetchFinalizedCandidates = async () => {
  //     try {
  //       const response = await axios.get<Candidate[]>(`http://localhost:5000/candidates/job/${jobId}`);

  //       const sortedCandidates = response.data
  //         .filter((candidate) => candidate.finalized_score)
  //         .map((candidate) => ({
  //           ...candidate,
  //           github_linkedin_transcript_avg: calculateAverageMarks(candidate),
  //         }))
  //         .sort((a, b) => (b.finalized_score ?? 0) - (a.finalized_score ?? 0));

  //       setCandidates(sortedCandidates);
  //     } catch (error) {
  //       setError("Failed to fetch finalized candidates.");
  //     }
  //   };

  //   if (jobId) {
  //     fetchFinalizedCandidates();
  //   }
  // }, [jobId]);


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// interface Candidate {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   confirmEmail: string;
//   extract_predicted_matching_percentage?: number;
//   github_marks?: number;
//   linkedin_marks?: number;
//   transcript_marks?: number;
//   finalized_score?: number;
//   github_linkedin_transcript_avg?: string;
// }

// const FinalizedCandidates = () => {
//   const { jobId } = useParams<{ jobId?: string }>();
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const recordsPerPage: number = 10;
//   const [error, setError] = useState<string>("");
//   const navigate = useNavigate();

 

//   useEffect(() => {
//   const fetchFinalizedCandidates = async () => {
//     try {
//       const response = await axios.get<Candidate[]>(`http://localhost:5000/candidates/job/${jobId}`);

//       const updatedCandidates = response.data.map((candidate) => ({
//         ...candidate,
//         github_linkedin_transcript_avg: calculateAverageMarks(candidate),
//       }));

//       setCandidates(updatedCandidates);
//     } catch (error) {
//       setError("Failed to fetch finalized candidates.");
//     }
//   };

//   if (jobId) {
//     fetchFinalizedCandidates();
//   }
// }, [jobId]);


//   const calculateAverageMarks = (candidate: Candidate): string => {
//     const githubMarks = candidate.github_marks ?? 0;
//     const linkedinMarks = candidate.linkedin_marks ?? 0;
//     const transcriptMarks = candidate.transcript_marks ?? 0;

//     return ((githubMarks + linkedinMarks + transcriptMarks) / 3).toFixed(2);
//   };

//   const totalPages = Math.ceil(candidates.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);




//   return (
//     <>
//       <PageMeta title="Finalized Completed Candidates" description="List of candidates with final scores" />
//       <PageBreadcrumb pageTitle="Finalized Completed Candidates" />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <button
//           className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">Finalized Ranked Completed Candidates</h1>

//         {error ? (
//           <p className="text-red-400 font-semibold">{error}</p>
//         ) : (
//           <div className="bg-[#352F44] shadow-lg p-4 rounded-lg">
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-[#5C5470] text-[#DBD8E3]">
//                     <th className="py-2 px-4">Rank</th>
//                     <th className="py-2 px-4">First Name</th>
//                     <th className="py-2 px-4">Last Name</th>
//                     <th className="py-2 px-4">Email</th>
//                     <th className="py-2 px-4">Predicted Matching %</th>
//                     <th className="py-2 px-4">GitHub/LinkedIn/Transcript Matching %</th>
//                     <th className="py-2 px-4">Finalized Matching %</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentRecords.map((candidate, index) => (
//                     <tr key={candidate._id} className="border-b border-gray-600 text-[#DBD8E3]">
//                       <td className="py-2 px-4 font-bold">
//                         {index + 1 + (currentPage - 1) * recordsPerPage}
//                       </td>
//                       <td className="py-2 px-4">{candidate.firstName}</td>
//                       <td className="py-2 px-4">{candidate.lastName}</td>
//                       <td className="py-2 px-4">{candidate.confirmEmail}</td>
//                       <td className="py-2 px-4 font-bold text-[#FFA500]">
//                         {candidate.extract_predicted_matching_percentage ?? "N/A"}%
//                       </td>
//                       <td className="py-2 px-4 font-bold text-[#2196F3]">
//                         {candidate.github_linkedin_transcript_avg ?? "N/A"}%
//                       </td>
//                       <td className="py-2 px-4 font-bold text-[#4CAF50]">
//                         {candidate.finalized_score ?? "N/A"}%
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

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

// interface Candidate {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   confirmEmail: string;
//   extract_predicted_matching_percentage?: number;
//   github_marks?: number;
//   linkedin_marks?: number;
//   transcript_marks?: number;
//   finalized_score?: number;
//   github_linkedin_transcript_avg?: string;
// }

// const FinalizedCandidates = () => {
//   const { jobId } = useParams<{ jobId?: string }>();
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const recordsPerPage: number = 10;
//   const [error, setError] = useState<string>("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFinalizedCandidates = async () => {
//       try {
//         const response = await axios.get<Candidate[]>(`http://localhost:5000/candidates/job/${jobId}`);

//         const updatedCandidates = response.data.map((candidate) => ({
//           ...candidate,
//           github_linkedin_transcript_avg: calculateAverageMarks(candidate),
//         }));

//         setCandidates(updatedCandidates);
//         setFilteredCandidates(updatedCandidates);
//       } catch (error) {
//         setError("Failed to fetch finalized candidates.");
//       }
//     };

//     if (jobId) {
//       fetchFinalizedCandidates();
//     }
//   }, [jobId]);

//   useEffect(() => {
//     const filtered = candidates.filter((candidate) =>
//       candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       candidate.confirmEmail.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCandidates(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, candidates]);

//   const calculateAverageMarks = (candidate: Candidate): string => {
//     const githubMarks = candidate.github_marks ?? 0;
//     const linkedinMarks = candidate.linkedin_marks ?? 0;
//     const transcriptMarks = candidate.transcript_marks ?? 0;

//     return ((githubMarks + linkedinMarks + transcriptMarks) / 3).toFixed(2);
//   };

//   const totalPages = Math.ceil(filteredCandidates.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredCandidates.slice(indexOfFirstRecord, indexOfLastRecord);


//   const getScoreBadge = (score: number | undefined): string => {
//     if (!score) return "bg-gray-500/20 text-gray-400";
//     if (score >= 80) return "bg-emerald-500/20 text-emerald-400";
//     if (score >= 60) return "bg-blue-500/20 text-blue-400";
//     if (score >= 40) return "bg-yellow-500/20 text-yellow-400";
//     return "bg-red-500/20 text-red-400";
//   };

//   return (
//     <>
    
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Header Section */}
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-4">
//               <button
//                 className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
//                 onClick={() => navigate(-1)}
//               >
//                 <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 <span className="text-sm font-medium text-white">Back</span>
//               </button>
//               <div className="flex items-center gap-3">
//                 <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
//                   <span className="text-xl">🗂️</span>
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-white">Finalized Candidates</h1>
//                   <p className="text-sm text-slate-400">Ranked completed candidates with final scores</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-slate-400">
//               <span className="text-lg">📊</span>
//               <span>{filteredCandidates.length} candidates found</span>
//             </div>
//           </div>

//           {/* Search Section */}
//           <div className="mb-6">
//             <div className="relative max-w-md">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by name or email..."
//                 className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           {error ? (
//             <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6">
//               <div className="flex items-center gap-3">
//                 <span className="text-xl">⚠️</span>
//                 <p className="text-red-300 font-medium">{error}</p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* Table Section */}
//               <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-white/5 border-b border-white/10">
//                         <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                           <div className="flex items-center gap-2">
//                             <span>🏆</span>
//                             Rank
//                           </div>
//                         </th>
//                         <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                           <div className="flex items-center gap-2">
//                             <span>👤</span>
//                             Candidate
//                           </div>
//                         </th>
//                         <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                           <div className="flex items-center gap-2">
//                             <span>📧</span>
//                             Email
//                           </div>
//                         </th>
//                         <th className="text-center py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                           <div className="flex items-center justify-center gap-2">
//                             <span>🎯</span>
//                             Predicted %
//                           </div>
//                         </th>
//                         <th className="text-center py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                           <div className="flex items-center justify-center gap-2">
//                             <span>💼</span>
//                             Profile Avg %
//                           </div>
//                         </th>
//                         <th className="text-center py-4 px-6 text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                           <div className="flex items-center justify-center gap-2">
//                             <span>⭐</span>
//                             Final Score %
//                           </div>
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-white/5">
//                       {currentRecords.map((candidate, index) => {
//                         const rank = index + 1 + (currentPage - 1) * recordsPerPage;
//                         return (
//                           <tr key={candidate._id} className="hover:bg-white/5 transition-colors duration-200">
//                             <td className="py-4 px-6">
//                               <div className="flex items-center gap-3">
//                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
//                                   rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
//                                   rank === 2 ? 'bg-gray-400/20 text-gray-300' :
//                                   rank === 3 ? 'bg-orange-500/20 text-orange-400' :
//                                   'bg-white/10 text-slate-300'
//                                 }`}>
//                                   {rank}
//                                 </div>
//                                 {rank <= 3 && (
//                                   <span className="text-lg">
//                                     {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
//                                   </span>
//                                 )}
//                               </div>
//                             </td>
//                             <td className="py-4 px-6">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
//                                   {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
//                                 </div>
//                                 <div>
//                                   <div className="font-medium text-white">
//                                     {candidate.firstName} {candidate.lastName}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="py-4 px-6">
//                               <span className="text-slate-300 text-sm">{candidate.confirmEmail}</span>
//                             </td>
//                             <td className="py-4 px-6 text-center">
//                               <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBadge(candidate.extract_predicted_matching_percentage)}`}>
//                                 {candidate.extract_predicted_matching_percentage ?? "N/A"}%
//                               </span>
//                             </td>
//                             <td className="py-4 px-6 text-center">
//                               <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBadge(parseFloat(candidate.github_linkedin_transcript_avg || "0"))}`}>
//                                 {candidate.github_linkedin_transcript_avg ?? "N/A"}%
//                               </span>
//                             </td>
//                             <td className="py-4 px-6 text-center">
//                               <div className="flex items-center justify-center gap-2">
//                                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getScoreBadge(candidate.finalized_score)}`}>
//                                   {candidate.finalized_score ?? "N/A"}%
//                                 </span>
//                                 {candidate.finalized_score && candidate.finalized_score >= 80 && (
//                                   <span className="text-lg">🌟</span>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex items-center justify-center gap-2 mt-8">
//                   <button
//                     className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1}
//                   >
//                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                   </button>
                  
//                   {Array.from({ length: totalPages }, (_, index) => {
//                     const pageNum = index + 1;
//                     const isActive = currentPage === pageNum;
//                     const isNearCurrent = Math.abs(pageNum - currentPage) <= 2;
//                     const isFirstOrLast = pageNum === 1 || pageNum === totalPages;
                    
//                     if (!isNearCurrent && !isFirstOrLast) {
//                       if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
//                         return <span key={pageNum} className="px-2 text-slate-400">...</span>;
//                       }
//                       return null;
//                     }
                    
//                     return (
//                       <button
//                         key={pageNum}
//                         className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                           isActive
//                             ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
//                             : "bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 hover:bg-white/20"
//                         }`}
//                         onClick={() => setCurrentPage(pageNum)}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
                  
//                   <button
//                     className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                     disabled={currentPage === totalPages}
//                   >
//                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
//               )}

//               {/* Results Summary */}
//               <div className="flex items-center justify-center mt-6 text-sm text-slate-400">
//                 <span>
//                   Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, filteredCandidates.length)} of {filteredCandidates.length} candidates
//                 </span>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default FinalizedCandidates;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { usePopupContext } from "../context/PopupContext";
const API_URL = import.meta.env.VITE_API_URL as string;

interface Candidate {
  _id: string;
  firstName: string;
  lastName: string;
  confirmEmail: string;
  extract_predicted_matching_percentage?: number;
  entered_predicted_matching_percentage?: number;
  extract_cv_similarity?: number;
  github_marks?: number;
  linkedin_marks?: number;
  transcript_marks?: number;
  finalized_score?: number;
  github_linkedin_transcript_avg?: string;
  candidate_insights_avg?: number;
  entered_employer_choice_similarity?: number;
  entered_employer_expectations_similarity?: number;
  entered_message_similarity?: number;
}

const FinalizedCandidates = () => {
  const { jobId } = useParams<{ jobId?: string }>();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const recordsPerPage: number = 10;
  const navigate = useNavigate();
  const { isPopupOpen, openPopup, closePopup } = usePopupContext();
  const [emailForm, setEmailForm] = useState({ username: "", password: "", email: "" });

  useEffect(() => {
    const fetchFinalizedCandidates = async () => {
      try {
        const response = await axios.get<Candidate[]>(`${API_URL}/candidates/job/${jobId}`);
        const updatedCandidates = response.data.map((candidate) => ({
          ...candidate,
          github_linkedin_transcript_avg: calculateAverageMarks(candidate),
          candidate_insights_avg: Math.round((((candidate.entered_employer_choice_similarity || 0) + (candidate.entered_employer_expectations_similarity || 0) + (candidate.entered_message_similarity || 0)) / 3) * 100) / 100,
          //candidate_insights_avg: ((candidate.entered_employer_choice_similarity || 0) + (candidate.entered_employer_expectations_similarity || 0) + (candidate.entered_message_similarity || 0)) / 3,
        }));
        setCandidates(updatedCandidates);
        setFilteredCandidates(updatedCandidates);
      } catch {
        setError("Failed to fetch finalized candidates.");
      }
    };
    if (jobId) fetchFinalizedCandidates();
  }, [jobId]);

  useEffect(() => {
    const filtered = candidates.filter((c) =>
      c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.confirmEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCandidates(filtered);
    setCurrentPage(1);
  }, [searchTerm, candidates]);

  const calculateAverageMarks = (c: Candidate): string => {
    const g = c.github_marks ?? 0, l = c.linkedin_marks ?? 0, t = c.transcript_marks ?? 0;
    return ((g + l + t) / 3).toFixed(2);
  };

  const totalPages = Math.ceil(filteredCandidates.length / recordsPerPage);
  const currentRecords = filteredCandidates.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const getScoreBadge = (score: number | undefined) => {
    if (score === undefined || score === null) return "bg-gray-200 text-gray-700";
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-blue-100 text-blue-800";
    if (score >= 40) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const handleEmailSend = () => {
    alert(`Sending email to ${emailForm.email}`);
    closePopup();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] via-white to-[#e5e7eb] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 mb-8 flex justify-between items-center animate-fadeInDown">
          <button
            className="group bg-gradient-to-r from-gray-200 to-gray-300 text-black px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out hover:from-purple-600 hover:to-indigo-600 hover:text-white"
            onClick={() => navigate(-1)}
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </span>
          </button>
          <button
            onClick={openPopup}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
          >
            📧 Send Email
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search candidates..."
            className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error ? (
          <div className="bg-red-100 border border-red-300 text-red-600 rounded-xl p-4">{error}</div>
        ) : (
          <div className="grid gap-6">
            {currentRecords.map((c) => (
              <div key={c._id} className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 transition hover:scale-[1.01] duration-200">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {c.firstName.charAt(0)}{c.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-800">{c.firstName} {c.lastName}</p>
                      <p className="text-sm text-slate-500">{c.confirmEmail}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full text-center text-sm">
                    <div className={`p-3 rounded-xl ${getScoreBadge(c.extract_predicted_matching_percentage)}`}>
                      <p>🎯 Predicted</p>
                      <p className="text-lg font-bold">{c.extract_predicted_matching_percentage ?? 'N/A'}%</p>
                    </div>
                    <div className={`p-3 rounded-xl ${getScoreBadge(c.entered_predicted_matching_percentage)}`}>
                      <p>🧠 Entered</p>
                      <p className="text-lg font-bold">{c.entered_predicted_matching_percentage ?? 'N/A'}%</p>
                    </div>
                    <div className={`p-3 rounded-xl ${getScoreBadge(c.extract_cv_similarity)}`}>
                      <p>📄 CV Match</p>
                      <p className="text-lg font-bold">{c.extract_cv_similarity ?? 'N/A'}%</p>
                    </div>
                    <div className={`p-3 rounded-xl ${getScoreBadge(c.candidate_insights_avg)}`}>
                      <p>🧮 Insights Avg</p>
                      <p className="text-lg font-bold">{c.candidate_insights_avg ?? 'N/A'}%</p>
                    </div>
                    <div className={`p-3 rounded-xl ${getScoreBadge(parseFloat(c.github_linkedin_transcript_avg || '0'))}`}>
                      <p>💼 Profile Avg</p>
                      <p className="text-lg font-bold">{c.github_linkedin_transcript_avg ?? 'N/A'}%</p>
                    </div>
                    <div className={`p-3 rounded-xl ${getScoreBadge(c.finalized_score)}`}>
                      <p>⭐ Final Score</p>
                      <div className="flex justify-center items-center gap-1">
                        <p className="text-lg font-bold">{c.finalized_score ?? 'N/A'}%</p>
                        {c.finalized_score && c.finalized_score >= 80 && <span>🌟</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isPopupOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4">📨 Send Email</h2>
              <input type="text" placeholder="Username" className="w-full mb-3 px-4 py-2 rounded-lg border border-slate-300" onChange={(e) => setEmailForm({ ...emailForm, username: e.target.value })} />
              <input type="password" placeholder="Password" className="w-full mb-3 px-4 py-2 rounded-lg border border-slate-300" onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })} />
              <input type="email" placeholder="Recipient Email" className="w-full mb-5 px-4 py-2 rounded-lg border border-slate-300" onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })} />
              <div className="flex justify-end gap-2">
                <button onClick={closePopup} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300">Cancel</button>
                <button onClick={handleEmailSend} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">Send</button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center mt-8 text-sm text-slate-500">
          Showing {(currentPage - 1) * recordsPerPage + 1} to {Math.min(currentPage * recordsPerPage, filteredCandidates.length)} of {filteredCandidates.length}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${currentPage === i + 1 ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-800 hover:bg-slate-300"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalizedCandidates;
