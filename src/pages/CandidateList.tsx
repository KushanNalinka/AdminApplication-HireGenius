// @ts-nocheck



/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

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
//   extract_projectsMatchingSimilarity: number;
//   extract_workExperienceMatchingSimilarity: number;
//   extract_coursesAndCertificationMatchingSimilarity: number;
//   extract_achievements_similarity: number;
//   extract_num_of_tools_technologies: number;
//   extract_predicted_matching_percentage?: number;
// }

// interface RouteParams {
//   jobId: string;
// }

// const CandidatesList = () => {
//   const { jobId } = useParams<RouteParams>();
//   const navigate = useNavigate();
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [error, setError] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const recordsPerPage = 10;

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await axios.get<Candidate[]>(
//           `http://localhost:5000/candidates/job/${jobId}`
//         );
//         const sortedCandidates = response.data.sort((a, b) => {
//           return (
//             b.extract_projectsMatchingSimilarity - a.extract_projectsMatchingSimilarity ||
//             b.extract_workExperienceMatchingSimilarity - a.extract_workExperienceMatchingSimilarity ||
//             b.extract_coursesAndCertificationMatchingSimilarity - a.extract_coursesAndCertificationMatchingSimilarity ||
//             b.extract_achievements_similarity - a.extract_achievements_similarity ||
//             b.extract_num_of_tools_technologies - a.extract_num_of_tools_technologies
//           );
//         });
//         setCandidates(sortedCandidates);
//       } catch (error) {
//         setError("No candidates found for this job.");
//       }
//     };
//     fetchCandidates();
//   }, [jobId]);

//   const handlePredict = async (candidateID: string) => {
//     try {
//       await axios.get(`http://localhost:5000/candidates/predict/${candidateID}`);
//       await fetchPredictedPercentage(candidateID); // Immediately fetch updated value
//     } catch (error) {
//       alert("Prediction failed.");
//     }
//   };

//   const fetchPredictedPercentage = async (candidateID: string) => {
//     try {
//       const response = await axios.get<{ extract_predicted_matching_percentage: number }>(
//         `http://localhost:5000/candidates/predicted_percentage/${candidateID}`
//       );
//       setCandidates((prevCandidates) =>
//         prevCandidates.map((candidate) =>
//           candidate._id === candidateID
//             ? {
//                 ...candidate,
//                 extract_predicted_matching_percentage: response.data.extract_predicted_matching_percentage,
//               }
//             : candidate
//         )
//       );
//     } catch (error) {
//       console.error("Error fetching predicted percentage", error);
//     }
//   };

//   const handleViewMore = async (candidateID: string) => {
//     try {
//       await axios.post(`http://localhost:5000/candidates/generate_charts/${candidateID}`);
//       navigate(`/candidate-charts/${candidateID}`);
//     } catch (error) {
//       console.error("Error generating charts:", error);
//       alert("Failed to generate charts.");
//     }
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(candidates.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);

//   return (
//     <>
//       <PageMeta title="Candidates List" description="Candidates Page" />
//       <PageBreadcrumb pageTitle="Candidates Views" />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4">
//           Applied Candidates
//         </h1>
//         <button
//           className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
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
//                     <th className="py-2 px-4">Projects %</th>
//                     <th className="py-2 px-4">Experience %</th>
//                     <th className="py-2 px-4">Courses %</th>
//                     <th className="py-2 px-4">Achievement %</th>
//                     <th className="py-2 px-4">Technologies</th>
//                     <th className="py-2 px-4">Predicted %</th>
//                     <th className="py-2 px-4">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentRecords.map((candidate) => (
//                     <tr
//                       key={candidate._id}
//                       className="border-b border-gray-600 text-[#DBD8E3]"
//                     >
//                       <td className="py-2 px-4">{candidate.firstName}</td>
//                       <td className="py-2 px-4">{candidate.lastName}</td>
//                       <td className="py-2 px-4">{candidate.confirmEmail}</td>
//                       <td className="py-2 px-4">
//                         {candidate.extract_projectsMatchingSimilarity}
//                       </td>
//                       <td className="py-2 px-4">
//                         {candidate.extract_workExperienceMatchingSimilarity}
//                       </td>
//                       <td className="py-2 px-4">
//                         {candidate.extract_coursesAndCertificationMatchingSimilarity}
//                       </td>
//                       <td className="py-2 px-4">
//                         {candidate.extract_achievements_similarity}
//                       </td>
//                       <td className="py-2 px-4">
//                         {candidate.extract_num_of_tools_technologies}
//                       </td>
//                       <td className="py-2 px-4">
//                         {candidate.extract_predicted_matching_percentage ?? "N/A"}
//                       </td>
//                       <td className="py-2 px-4">
//                         <div className="flex gap-2 justify-center flex-wrap">
//                           <button
//                             className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//                             onClick={() => handlePredict(candidate._id)}
//                           >
//                             Predict
//                           </button>
//                           <button
//                             className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//                             onClick={() => handleViewMore(candidate._id)}
//                           >
//                             Charts
//                           </button>
//                           <button
//                             className="bg-[#5C5470] text-white px-4 py-2 rounded-lg hover:bg-[#DBD8E3] hover:text-black"
//                             onClick={() => navigate(`/single/candidate/${candidate._id}`)}
//                           >
//                             View
//                           </button>
//                           <button
//                             className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
//                             onClick={() => navigate(`/single/finalized/${candidate._id}`)}
//                           >
//                             Matched
//                           </button>
//                           <button
//                             className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
//                             onClick={() =>
//                               navigate(`/single/linkedin/${candidate._id}`, {
//                                 state: { candidate, jobId },
//                               })
//                             }
//                           >
//                             Linkedin
//                           </button>
//                           <button
//                             className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
//                             onClick={() =>
//                               navigate(`/single/github/${candidate._id}`, {
//                                 state: { candidate, jobId },
//                               })
//                             }
//                           >
//                             GitHub
//                           </button>
//                           <button
//                             className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32]"
//                             onClick={() =>
//                               navigate(`/single/transcript/${candidate._id}`, {
//                                 state: { candidate, jobId },
//                               })
//                             }
//                           >
//                             Transcript
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//         {/* Pagination Controls */}
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               className={`mx-1 px-3 py-1 rounded-lg ${
//                 currentPage === index + 1
//                   ? "bg-[#5C5470] text-white"
//                   : "bg-[#DBD8E3] text-black"
//               }`}
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

// export default CandidatesList;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


interface Candidate {
  _id: string;
  firstName?: string;
  lastName?: string;
  confirmEmail?: string;
  extract_projectsMatchingSimilarity?: number;
  extract_workExperienceMatchingSimilarity?: number;
  extract_coursesAndCertificationMatchingSimilarity?: number;
  extract_achievements_similarity?: number;
  extract_num_of_tools_technologies?: number;
  entered_experience_similarity?: number;
  entered_education_similarity?: number;
  entered_courses_certifications_similarity?: number;
  extract_predicted_matching_percentage?: number;
  entered_predicted_matching_percentage?: number;
}

interface RouteParams {
  jobId?: string;
}

const CandidatesList = () => {
  const { jobId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get<Candidate[]>(
          `http://localhost:5000/candidates/job/${jobId}`
        );
        setCandidates(response.data);
      } catch (error) {
        setError("No candidates found for this job.");
      }
    };
    fetchCandidates();
  }, [jobId]);

  const setLoadingState = (candidateId: string, action: string, isLoading: boolean) => {
    setLoadingStates((prev) => ({
      ...prev,
      [`${candidateId}_${action}`]: isLoading,
    }));
  };

  const handleExtractedPredict = async (candidateID: string) => {
    setLoadingState(candidateID, "extracted", true);
    try {
      await axios.get(`http://localhost:5000/candidates/predict/${candidateID}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetchExtractedPredictedPercentage(candidateID);
    } catch (error) {
      alert("Extracted prediction failed. Please try again.");
    } finally {
      setLoadingState(candidateID, "extracted", false);
    }
  };

  const handleEnteredPredict = async (candidateID: string) => {
    setLoadingState(candidateID, "entered", true);
    try {
      await axios.get(`http://localhost:5000/candidates/entered/predict/${candidateID}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetchEnteredPredictedPercentage(candidateID);
    } catch (error) {
      alert("Entered prediction failed. Please try again.");
    } finally {
      setLoadingState(candidateID, "entered", false);
    }
  };

  const fetchExtractedPredictedPercentage = async (candidateID: string) => {
    try {
      const response = await axios.get<{ extract_predicted_matching_percentage: number }>(
        `http://localhost:5000/candidates/predicted_percentage/${candidateID}`
      );
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate._id === candidateID
            ? {
                ...candidate,
                extract_predicted_matching_percentage:
                  response.data.extract_predicted_matching_percentage,
              }
            : candidate
        )
      );
    } catch (error) {
      try {
        const fallbackResponse = await axios.get<Candidate>(
          `http://localhost:5000/candidates/${candidateID}`
        );
        if (fallbackResponse.data.extract_predicted_matching_percentage !== undefined) {
          setCandidates((prevCandidates) =>
            prevCandidates.map((candidate) =>
              candidate._id === candidateID
                ? {
                    ...candidate,
                    extract_predicted_matching_percentage:
                      fallbackResponse.data.extract_predicted_matching_percentage,
                  }
                : candidate
            )
          );
        }
      } catch {}
    }
  };

  const fetchEnteredPredictedPercentage = async (candidateID: string) => {
    try {
      const response = await axios.get<{ entered_predicted_matching_percentage: number }>(
        `http://localhost:5000/candidates/entered/predicted_percentage/${candidateID}`
      );
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate._id === candidateID
            ? {
                ...candidate,
                entered_predicted_matching_percentage:
                  response.data.entered_predicted_matching_percentage,
              }
            : candidate
        )
      );
    } catch (error) {
      try {
        const fallbackResponse = await axios.get<Candidate>(
          `http://localhost:5000/candidates/${candidateID}`
        );
        if (fallbackResponse.data.entered_predicted_matching_percentage !== undefined) {
          setCandidates((prevCandidates) =>
            prevCandidates.map((candidate) =>
              candidate._id === candidateID
                ? {
                    ...candidate,
                    entered_predicted_matching_percentage:
                      fallbackResponse.data.entered_predicted_matching_percentage,
                  }
                : candidate
            )
          );
        }
      } catch {}
    }
  };

  const handleViewMore = async (candidateID: string) => {
    setLoadingState(candidateID, "charts", true);
    try {
      await axios.post(`http://localhost:5000/candidates/generate_charts/${candidateID}`);
      navigate(`/candidate-charts/${candidateID}`);
    } catch {
      alert("Failed to generate charts.");
    } finally {
      setLoadingState(candidateID, "charts", false);
    }
  };

  const totalPages = Math.ceil(candidates.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = candidates.slice(indexOfFirstRecord, indexOfLastRecord);

  const formatPercentage = (value: number | string | undefined): string => {
    if (value === null || value === undefined || value === "") return "N/A";
    return typeof value === "number" ? `${value.toFixed(2)}%` : `${value}%`;
  };

  const isLoading = (candidateId: string, action: string): boolean => {
    return loadingStates[`${candidateId}_${action}`] || false;
  };

  const getPercentageColor = (value: number | string | undefined): string => {
    if (!value || value === "N/A") return "text-gray-400";
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (numValue >= 80) return "text-emerald-400";
    if (numValue >= 60) return "text-yellow-400";
    if (numValue >= 40) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <>
   

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header Section */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    Applied Candidates
                  </h1>
                  <p className="text-gray-400 mt-1">Manage and evaluate candidate applications</p>
                </div>
              </div>
              <button
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl"
                onClick={() => navigate(-1)}
              >
                <span>←</span>
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          {error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⚠️</span>
                <p className="text-red-400 font-semibold">{error}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Header */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{candidates.length}</div>
                      <div className="text-sm text-gray-400">Total Candidates</div>
                    </div>
                    <div className="w-px h-16 bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400">
                        {candidates.filter(c => c.extract_predicted_matching_percentage || c.entered_predicted_matching_percentage).length}
                      </div>
                      <div className="text-sm text-gray-400">Analyzed</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>
              </div>

              {/* Candidates Cards - Horizontal Layout */}
              
              <div className="space-y-6">
                {currentRecords.map((candidate, index) => (
                  <div
                    key={candidate._id}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl"
                  >
                    <div className="flex items-start space-x-6">
                      {/* Left Section - Candidate Info */}
                      <div className="flex-shrink-0">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {candidate.firstName?.charAt(0)}{candidate.lastName?.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {candidate.firstName} {candidate.lastName}
                            </h3>
                            <p className="text-gray-400 text-sm">{candidate.confirmEmail}</p>
                          </div>
                        </div>
                      </div>

                      {/* Middle Section - Skills & Metrics */}
                      {/* Middle Section - Skills & Metrics */}
<div className="flex-1">
  {/* First Row: Projects, Experience, Courses */}
  <div className="grid grid-cols-3 gap-4 mb-4">
    {/* Projects */}
    <div className="bg-white/5 rounded-xl p-3">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">🚀</span>
        <span className="text-xs text-gray-300 font-medium">Projects</span>
      </div>
      <span className={`font-bold text-sm ${getPercentageColor(candidate.extract_projectsMatchingSimilarity)}`}>
        {formatPercentage(candidate.extract_projectsMatchingSimilarity)}
      </span>
    </div>

    {/* Experience */}
    <div className="bg-white/5 rounded-xl p-3">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">💼</span>
        <span className="text-xs text-gray-300 font-medium">Experience</span>
      </div>
      <span className={`font-bold text-sm ${getPercentageColor(candidate.extract_workExperienceMatchingSimilarity)}`}>
        {formatPercentage(candidate.extract_workExperienceMatchingSimilarity)}
      </span>
    </div>

    {/* Courses */}
    <div className="bg-white/5 rounded-xl p-3">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">📚</span>
        <span className="text-xs text-gray-300 font-medium">Courses</span>
      </div>
      <span className={`font-bold text-sm ${getPercentageColor(candidate.extract_coursesAndCertificationMatchingSimilarity)}`}>
        {formatPercentage(candidate.extract_coursesAndCertificationMatchingSimilarity)}
      </span>
    </div>
  </div>

  {/* Second Row: Achievements, Tech, Entered Exp */}
  <div className="grid grid-cols-3 gap-4 mb-4">
    {/* Achievements */}
    <div className="bg-white/5 rounded-xl p-3">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">🏆</span>
        <span className="text-xs text-gray-300 font-medium">Achievements</span>
      </div>
      <span className={`font-bold text-sm ${getPercentageColor(candidate.extract_achievements_similarity)}`}>
        {formatPercentage(candidate.extract_achievements_similarity)}
      </span>
    </div>

    {/* Tech Tools */}
    <div className="bg-white/5 rounded-xl p-3">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">⚙️</span>
        <span className="text-xs text-gray-300 font-medium">Tech</span>
      </div>
      <span className="text-blue-400 font-bold text-sm">
        {candidate.extract_num_of_tools_technologies || "N/A"}
      </span>
    </div>

    {/* Entered Experience */}
    <div className="bg-white/5 rounded-xl p-3">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">🎯</span>
        <span className="text-xs text-gray-300 font-medium">Entered Exp</span>
      </div>
      <span className={`font-bold text-sm ${getPercentageColor(candidate.entered_experience_similarity)}`}>
        {formatPercentage(candidate.entered_experience_similarity)}
      </span>
    </div>
  </div>

  {/* Rest of your metrics (Education, Certifications, AI predictions, etc.) follow unchanged */}


                        {/* Additional Metrics Row */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {/* Education */}
                          <div className="bg-white/5 rounded-xl p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">🎓</span>
                                <span className="text-xs text-gray-300 font-medium">Education</span>
                              </div>
                              <span className={`font-bold text-sm ${getPercentageColor(candidate.entered_education_similarity)}`}>
                                {formatPercentage(candidate.entered_education_similarity)}
                              </span>
                            </div>
                          </div>

                          {/* Certifications */}
                          <div className="bg-white/5 rounded-xl p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">📜</span>
                                <span className="text-xs text-gray-300 font-medium">Certifications</span>
                              </div>
                              <span className={`font-bold text-sm ${getPercentageColor(candidate.entered_courses_certifications_similarity)}`}>
                                {formatPercentage(candidate.entered_courses_certifications_similarity)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* AI Predictions Row */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* AI Extracted */}
                          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">🤖</span>
                                <span className="text-xs text-gray-300 font-medium">AI Extracted</span>
                              </div>
                              <div className="text-right">
                                <span className={`font-bold text-lg ${
                                  candidate.extract_predicted_matching_percentage ? 'text-emerald-400' : 'text-gray-500'
                                }`}>
                                  {formatPercentage(candidate.extract_predicted_matching_percentage)}
                                </span>
                                {candidate.extract_predicted_matching_percentage && (
                                  <div className="w-20 bg-gray-700 rounded-full h-2 mt-1">
                                    <div 
                                      className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                                      style={{ width: `${candidate.extract_predicted_matching_percentage}%` }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* AI Entered */}
                          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">🧠</span>
                                <span className="text-xs text-gray-300 font-medium">AI Entered</span>
                              </div>
                              <div className="text-right">
                                <span className={`font-bold text-lg ${
                                  candidate.entered_predicted_matching_percentage ? 'text-emerald-400' : 'text-gray-500'
                                }`}>
                                  {formatPercentage(candidate.entered_predicted_matching_percentage)}
                                </span>
                                {candidate.entered_predicted_matching_percentage && (
                                  <div className="w-20 bg-gray-700 rounded-full h-2 mt-1">
                                    <div 
                                      className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                                      style={{ width: `${candidate.entered_predicted_matching_percentage}%` }}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Action Buttons */}
                      <div className="flex-shrink-0 w-80">
                        <div className="space-y-3">
                          {/* AI Analysis Buttons */}
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              className={`flex items-center justify-center space-x-2 py-2 px-3 text-xs font-semibold rounded-xl transition-all duration-300 shadow-lg ${
                                isLoading(candidate._id, 'extracted')
                                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:shadow-xl hover:scale-105'
                              }`}
                              onClick={() => handleExtractedPredict(candidate._id)}
                              disabled={isLoading(candidate._id, 'extracted')}
                              title="AI Extract Prediction"
                            >
                              <span className="text-sm">🤖</span>
                              <span>{isLoading(candidate._id, 'extracted') ? 'Analyzing...' : 'AI Extract'}</span>
                            </button>
                            
                            <button
                              className={`flex items-center justify-center space-x-2 py-2 px-3 text-xs font-semibold rounded-xl transition-all duration-300 shadow-lg ${
                                isLoading(candidate._id, 'entered')
                                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:shadow-xl hover:scale-105'
                              }`}
                              onClick={() => handleEnteredPredict(candidate._id)}
                              disabled={isLoading(candidate._id, 'entered')}
                              title="AI Enter Prediction"
                            >
                              <span className="text-sm">🧠</span>
                              <span>{isLoading(candidate._id, 'entered') ? 'Analyzing...' : 'AI Enter'}</span>
                            </button>
                          </div>
                          
                          {/* Primary Action Buttons */}
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              className={`flex items-center justify-center space-x-2 py-2 px-3 text-xs font-semibold rounded-xl transition-all duration-300 shadow-lg ${
                                isLoading(candidate._id, 'charts')
                                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl hover:scale-105'
                              }`}
                              onClick={() => handleViewMore(candidate._id)}
                              disabled={isLoading(candidate._id, 'charts')}
                              title="View Charts"
                            >
                              <span className="text-sm">📊</span>
                              <span>{isLoading(candidate._id, 'charts') ? 'Generating...' : 'Charts'}</span>
                            </button>
                            
                            <button
                              className="flex items-center justify-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white py-2 px-3 text-xs font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                              onClick={() => navigate(`/single/candidate/${candidate._id}`)}
                              title="View Profile"
                            >
                              <span className="text-sm">👁️</span>
                              <span>View Profile</span>
                            </button>
                          </div>

                          {/* Match Button - Full Width */}
                          <button
                            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-3 text-xs font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            onClick={() => navigate(`/single/finalized/${candidate._id}`)}
                            title="Mark as Matched"
                          >
                            <span className="text-sm">✅</span>
                            <span>Mark as Matched</span>
                          </button>
                          
                          {/* Social & Document Buttons */}
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              className="flex items-center justify-center space-x-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-2 text-xs font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                              onClick={() => navigate(`/single/linkedin/${candidate._id}`, {
                                state: { candidate, jobId },
                              })}
                              title="View LinkedIn"
                            >
                              <span className="text-xs">💼</span>
                              <span>LinkedIn</span>
                            </button>
                            
                            <button
                              className="flex items-center justify-center space-x-1 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white py-2 px-2 text-xs font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                              onClick={() => navigate(`/single/github/${candidate._id}`, {
                                state: { candidate, jobId },
                              })}
                              title="View GitHub"
                            >
                              <span className="text-xs">🐙</span>
                              <span>GitHub</span>
                            </button>
                            
                            <button
                              className="flex items-center justify-center space-x-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2 px-2 text-xs font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                              onClick={() => navigate(`/single/transcript/${candidate._id}`, {
                                state: { candidate, jobId },
                              })}
                              title="View Transcript"
                            >
                              <span className="text-xs">📄</span>
                              <span>Transcript</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-3">
              <button
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
                  currentPage === 1
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl'
                }`}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <span>←</span>
                <span>Previous</span>
              </button>
              
              <div className="flex space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    pageNum = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = currentPage - 2 + index;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      className={`w-12 h-12 rounded-xl transition-all duration-300 font-bold text-lg ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110"
                          : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20"
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
                  currentPage === totalPages
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl'
                }`}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <span>Next</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CandidatesList;
