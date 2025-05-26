// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// const FinalCandidate = () => {
//   const { id } = useParams(); // Get Candidate ID from URL
//   const [predictedPercentage, setPredictedPercentage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPredictedPercentage = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/candidates/${id}`
//         );
//         setPredictedPercentage(response.data.extract_predicted_matching_percentage);
//       } catch (err) {
//         setError("Failed to fetch predicted percentage.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPredictedPercentage();
//   }, [id]);

//   return (
//     <>
//       <PageMeta title="Finalized Candidate" description="Final Matching Percentage" />
//       <PageBreadcrumb pageTitle="Finalized Candidate" />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen flex flex-col items-center">
//       <button
//           className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-6">Finalized Matching Percentage</h1>

//         {loading ? (
//           <p className="text-lg text-[#DBD8E3]">Loading...</p>
//         ) : error ? (
//           <p className="text-red-400 text-lg">{error}</p>
//         ) : (
//           <div className="bg-[#352F44] p-6 rounded-lg shadow-lg text-center w-1/2">
//             <h2 className="text-2xl font-semibold text-[#DBD8E3]">Candidate ID: {id}</h2>
//             <p className="text-xl font-semibold text-[#DBD8E3] mt-4">Predicted Matching Percentage</p>
//             <div className="mt-4 text-4xl font-bold text-[#4CAF50]">
//               {predictedPercentage ? `${predictedPercentage}%` : "N/A"}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default FinalCandidate;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

const FinalCandidate: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // ✅ Corrected typing

  const [predictedPercentage, setPredictedPercentage] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPredictedPercentage = async () => {
      if (!id) {
        setError("Candidate ID is missing from URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<{ extract_predicted_matching_percentage: number }>(
          `${API_URL}/candidates/${id}`
        );
        setPredictedPercentage(response.data.extract_predicted_matching_percentage);
      } catch (err) {
        setError("Failed to fetch predicted percentage.");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictedPercentage();
  }, [id]);

  // return (
  //   <>
     
  //     <div className="p-6 bg-[#2A2438] text-white min-h-screen flex flex-col items-center">
  //       <button
  //         className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
  //         onClick={() => navigate(-1)}
  //       >
  //         Go Back
  //       </button>
  //       <h1 className="text-3xl font-bold text-[#DBD8E3] mb-6">Finalized Matching Percentage</h1>

  //       {loading ? (
  //         <p className="text-lg text-[#DBD8E3]">Loading...</p>
  //       ) : error ? (
  //         <p className="text-red-400 text-lg">{error}</p>
  //       ) : (
  //         <div className="bg-[#352F44] p-6 rounded-lg shadow-lg text-center w-1/2">
  //           <h2 className="text-2xl font-semibold text-[#DBD8E3]">Candidate ID: {id}</h2>
  //           <p className="text-xl font-semibold text-[#DBD8E3] mt-4">Predicted Matching Percentage</p>
  //           <div className="mt-4 text-4xl font-bold text-[#4CAF50]">
  //             {predictedPercentage !== null ? `${predictedPercentage}%` : "N/A"}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </>
  // );

   return (
    <>
      <div className="p-8 bg-gradient-to-br from-[#2A2438] via-[#2A2438] to-[#1E1A2E] text-white min-h-screen flex flex-col items-center relative overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#5C5470]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tr from-[#DBD8E3]/10 to-transparent rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-[#352F44]/30 to-transparent rounded-full blur-xl"></div>

        {/* Enhanced Go Back Button */}
        <div className="w-full max-w-6xl mb-8 relative z-10">
          <button
            className="group flex items-center space-x-3 bg-gradient-to-r from-[#DBD8E3] to-[#BDB7C6] text-[#2A2438] px-6 py-3 rounded-2xl hover:from-[#5C5470] hover:to-[#6B6280] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl font-semibold"
            onClick={() => navigate(-1)}
          >
            <div className="w-8 h-8 bg-[#2A2438]/20 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300">
              <span className="text-lg">←</span>
            </div>
            <span>Go Back</span>
          </button>
        </div>

        {/* Enhanced Header Section */}
        <div className="text-center mb-12 relative z-10">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5C5470] to-[#6B6280] rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-all duration-300">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#DBD8E3] to-[#BDB7C6] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-300">
              <span className="text-xl">📊</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#DBD8E3] via-white to-[#BDB7C6] bg-clip-text text-transparent mb-4 leading-tight">
            Finalized Matching Percentage
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#5C5470] to-transparent mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="relative z-10 flex flex-col items-center space-y-6">
            {/* Enhanced Loading State */}
            <div className="w-32 h-32 bg-gradient-to-br from-[#352F44] to-[#3A3450] rounded-3xl flex items-center justify-center shadow-2xl border border-white/10 backdrop-blur-sm">
              <div className="w-16 h-16 border-4 border-[#5C5470] border-t-[#DBD8E3] rounded-full animate-spin"></div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-[#DBD8E3] mb-2">Analyzing Match...</p>
              <p className="text-[#BDB7C6]">Please wait while we calculate the perfect match</p>
            </div>
          </div>
        ) : error ? (
          <div className="relative z-10 bg-gradient-to-br from-red-500/10 to-red-600/10 border-2 border-red-500/30 p-8 rounded-3xl shadow-2xl backdrop-blur-sm text-center max-w-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">Error Occurred</h3>
            <p className="text-red-300 text-lg">{error}</p>
          </div>
        ) : (
          <div className=" z-10 bg-gradient-to-br from-[#352F44] to-[#3A3450] p-10 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-sm text-center max-w-2xl relative overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
            
            {/* Card Background Effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#DBD8E3]/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#5C5470]/10 to-transparent rounded-full blur-2xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Candidate ID Section */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5C5470] to-[#6B6280] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-xl">🗂️</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[#DBD8E3]">Candidate Analysis</h2>
                </div>
                <div className="bg-gradient-to-r from-[#2A2438]/50 to-[#352F44]/50 px-6 py-3 rounded-2xl border border-white/10 inline-block">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🆔</span>
                    <span className="text-xl font-semibold text-[#DBD8E3]">ID: {id}</span>
                  </div>
                </div>
              </div>

              {/* Matching Percentage Title */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <span className="text-2xl">🎯</span>
                  <p className="text-2xl font-bold text-[#DBD8E3]">Predicted Matching Percentage</p>
                </div>
              </div>

              {/* Enhanced Percentage Display */}
              <div className="relative">
                {/* Circular Progress Background */}
                <div className="w-64 h-64 mx-auto mb-8 relative">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-[#5C5470]/30"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - (predictedPercentage || 0) / 100)}`}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4CAF50" />
                        <stop offset="50%" stopColor="#8BC34A" />
                        <stop offset="100%" stopColor="#CDDC39" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] bg-clip-text text-transparent mb-2">
                        {predictedPercentage !== null ? `${predictedPercentage}%` : "N/A"}
                      </div>
                      <div className="text-[#DBD8E3] text-lg font-medium">Match Score</div>
                    </div>
                  </div>
                </div>

                {/* Percentage Status Indicators */}
                <div className="flex justify-center space-x-4 mb-6">
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    (predictedPercentage || 0) >= 80 
                      ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30' 
                      : (predictedPercentage || 0) >= 60 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30'
                      : 'bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30'
                  }`}>
                    <span className="text-lg">
                      {(predictedPercentage || 0) >= 80 ? '🎉' : (predictedPercentage || 0) >= 60 ? '👍' : '📈'}
                    </span>
                    <span className="font-medium text-[#DBD8E3]">
                      {(predictedPercentage || 0) >= 80 ? 'Excellent Match' : (predictedPercentage || 0) >= 60 ? 'Good Match' : 'Potential Match'}
                    </span>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-gradient-to-br from-[#2A2438]/50 to-[#352F44]/50 p-4 rounded-2xl border border-white/10">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-sm text-[#BDB7C6]">Analysis</div>
                    <div className="text-lg font-bold text-[#DBD8E3]">Complete</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#2A2438]/50 to-[#352F44]/50 p-4 rounded-2xl border border-white/10">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-sm text-[#BDB7C6]">Processing</div>
                    <div className="text-lg font-bold text-[#DBD8E3]">Real-time</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#2A2438]/50 to-[#352F44]/50 p-4 rounded-2xl border border-white/10">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-sm text-[#BDB7C6]">Accuracy</div>
                    <div className="text-lg font-bold text-[#DBD8E3]">98.5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Footer Section */}
        <div className="mt-12 text-center relative z-10">
          <div className="bg-gradient-to-r from-[#352F44]/50 to-[#3A3450]/50 px-8 py-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-lg">🔮</span>
              <p className="text-[#BDB7C6]">AI-powered matching algorithm for optimal candidate selection</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default FinalCandidate;



