
 

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// const CandidateCharts = () => {
//   const { candidateID } = useParams();
//   const navigate = useNavigate();
//   const [charts, setCharts] = useState({});
//   const [error, setError] = useState("");
//   const [selectedChart, setSelectedChart] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     const fetchCharts = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/candidates/charts/${candidateID}`
//         );
//         setCharts(response.data.charts);
//       } catch (error) {
//         setError("Failed to load charts.");
//         console.error("Error fetching charts:", error);
//       }
//     };
//     fetchCharts();
//   }, [candidateID]);

//   return (
//     <>
//       <PageMeta
//         title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
//         description="This is React.js Form Elements Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <PageBreadcrumb pageTitle="Candidates Views" />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <button
//           className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>

//         <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4 text-center">
//           Candidate Charts
//         </h1>

//         {error ? (
//           <p className="text-red-400 font-semibold text-center">{error}</p>
//         ) : selectedChart ? (
//           // Enlarged chart view inside the designated section
//           <div className="bg-[#352F44] p-6 rounded-lg shadow-lg text-center">
//             <button
//               className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white mb-4"
//               onClick={() => {
//                 setSelectedChart(null);
//                 setSelectedCategory(null);
//               }}
//             >
//               Back to Charts
//             </button>
//             <h3 className="text-2xl font-semibold text-[#DBD8E3] mb-4">
//               {selectedCategory}
//             </h3>
//             <img
//               className="rounded-lg max-w-full max-h-[500px] mx-auto border border-[#DBD8E3]"
//               src={`data:image/png;base64,${selectedChart}`}
//               alt={`${selectedCategory} Chart`}
//             />
//           </div>
//         ) : (
//           // Default grid view of all charts
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Object.entries(charts).map(([category, data]) => (
//               <div
//                 key={category}
//                 className="bg-[#352F44] p-4 rounded-lg shadow-lg text-[#DBD8E3] text-center cursor-pointer"
//                 onClick={() => {
//                   setSelectedChart(data.chart);
//                   setSelectedCategory(category);
//                 }}
//               >
//                 <h3 className="text-lg font-semibold">{category}</h3>
//                 {data.chart ? (
//                   <img
//                     className="mt-2 rounded-lg border border-[#DBD8E3]"
//                     src={`data:image/png;base64,${data.chart}`}
//                     alt={`${category} Chart`}
//                   />
//                 ) : (
//                   <p className="text-[#DBD8E3]">No chart available</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CandidateCharts;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL as string;

import '../styles/animations.css';


interface ChartData {
  chart: string;
}

interface Charts {
  [category: string]: ChartData;
}

const CandidateCharts = () => {
  const { candidateID } = useParams<{ candidateID: string }>();
  const navigate = useNavigate();
  const [charts, setCharts] = useState<Charts>({});
  const [error, setError] = useState<string>("");
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const response = await axios.get(`${API_URL}/candidates/charts/${candidateID}`);
        setCharts(response.data.charts);
      } catch (error) {
        setError("Failed to load charts.");
        console.error("Error fetching charts:", error);
      }
    };
    fetchCharts();
  }, [candidateID]);

  // return (
  //   <>
  //     <PageMeta
  //       title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
  //       description="This is React.js Form Elements Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
  //     />
  //     <PageBreadcrumb pageTitle="Candidates Views" />

  //     <div className="p-6 bg-[#2A2438] text-white min-h-screen">
  //       <button
  //         className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
  //         onClick={() => navigate(-1)}
  //       >
  //         Go Back
  //       </button>

  //       <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4 text-center">
  //         Candidate Charts
  //       </h1>

  //       {error ? (
  //         <p className="text-red-400 font-semibold text-center">{error}</p>
  //       ) : selectedChart ? (
  //         <div className="bg-[#352F44] p-6 rounded-lg shadow-lg text-center">
  //           <button
  //             className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white mb-4"
  //             onClick={() => {
  //               setSelectedChart(null);
  //               setSelectedCategory(null);
  //             }}
  //           >
  //             Back to Charts
  //           </button>
  //           <h3 className="text-2xl font-semibold text-[#DBD8E3] mb-4">
  //             {selectedCategory}
  //           </h3>
  //           <img
  //             className="rounded-lg max-w-full max-h-[500px] mx-auto border border-[#DBD8E3]"
  //             src={`data:image/png;base64,${selectedChart}`}
  //             alt={`${selectedCategory} Chart`}
  //           />
  //         </div>
  //       ) : (
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //           {Object.entries(charts).map(([category, data]) => (
  //             <div
  //               key={category}
  //               className="bg-[#352F44] p-4 rounded-lg shadow-lg text-[#DBD8E3] text-center cursor-pointer"
  //               onClick={() => {
  //                 setSelectedChart(data.chart);
  //                 setSelectedCategory(category);
  //               }}
  //             >
  //               <h3 className="text-lg font-semibold">{category}</h3>
  //               {data.chart ? (
  //                 <img
  //                   className="mt-2 rounded-lg border border-[#DBD8E3]"
  //                   src={`data:image/png;base64,${data.chart}`}
  //                   alt={`${category} Chart`}
  //                 />
  //               ) : (
  //                 <p className="text-[#DBD8E3]">No chart available</p>
  //               )}
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </>
  // );

  return (
  <>
    

    <div className="p-8 bg-gradient-to-br from-[#1a1625] via-[#2A2438] to-[#1f1b2e] text-white min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Back and Title Section */}
<div className="flex items-center justify-between mb-12 animate-fadeInUp">
  {/* Back Button */}
  <div className="relative z-10">
    <button
      className="group relative bg-gradient-to-r from-[#DBD8E3] to-[#f0eef5] text-black px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-out hover:from-[#5C5470] hover:to-[#4a4560] hover:text-white border border-white/20 backdrop-blur-sm"
      onClick={() => navigate(-1)}
    >
      <span className="flex items-center gap-2">
        <svg 
          className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Go Back
      </span>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  </div>

  {/* Main Title */}
  <div className="text-right">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#DBD8E3] via-[#f0eef5] to-[#e8e5f0] bg-clip-text text-transparent drop-shadow-md">
      Candidate Charts
    </h1>
    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse mt-1 ml-auto"></div>
  </div>
</div>


      {error ? (
        <div className="animate-shake">
          <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-6 text-center max-w-md mx-auto shadow-xl">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-red-300 font-semibold text-lg">{error}</p>
          </div>
        </div>
      ) : selectedChart ? (
        <div className="animate-fadeIn">
          <div className="bg-gradient-to-br from-[#352F44]/90 to-[#2d2638]/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/10 transform hover:scale-[1.02] transition-all duration-500">
            {/* Back to Charts Button */}
            <button
              className="group bg-gradient-to-r from-[#DBD8E3] to-[#f0eef5] text-black px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out hover:from-[#5C5470] hover:to-[#4a4560] hover:text-white mb-6 border border-white/20"
              onClick={() => {
                setSelectedChart(null);
                setSelectedCategory(null);
              }}
            >
              <span className="flex items-center gap-2">
                <svg 
                  className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back to Charts
              </span>
            </button>

            {/* Chart Title */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3">
                <div className="text-3xl">📈</div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#DBD8E3] to-[#f0eef5] bg-clip-text text-transparent">
                  {selectedCategory}
                </h3>
                <div className="text-3xl">📉</div>
              </div>
            </div>

            {/* Chart Image Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl">
                <img
                  className="rounded-xl max-w-full max-h-[500px] mx-auto border-2 border-gradient-to-r from-purple-400/50 to-pink-400/50 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-purple-400/30"
                  src={`data:image/png;base64,${selectedChart}`}
                  alt={`${selectedCategory} Chart`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fadeInUp delay-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(charts).map(([category, data], index) => (
              <div
                key={category}
                className="group bg-gradient-to-br from-[#352F44]/90 to-[#2d2638]/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl text-[#DBD8E3] text-center cursor-pointer border border-white/10 transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out hover:border-purple-400/50 animate-slideInUp"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  setSelectedChart(data.chart);
                  setSelectedCategory(category);
                }}
              >
                {/* Card Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 mb-3">
                    
                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#DBD8E3] to-[#f0eef5] bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                      {category}
                    </h3>
                  
                  </div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full group-hover:w-24 transition-all duration-300"></div>
                </div>

                {/* Chart Preview */}
                <div className="relative">
                  {data.chart ? (
                    <div className="relative group/image">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <img
                          className="mt-2 rounded-lg border border-[#DBD8E3]/30 w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-purple-400/20"
                          src={`data:image/png;base64,${data.chart}`}
                          alt={`${category} Chart`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-gray-600/20 to-gray-700/20 backdrop-blur-sm rounded-lg p-8 border border-gray-500/20">
                      <div className="text-4xl mb-3 opacity-50">📈</div>
                      <p className="text-[#DBD8E3]/70 font-medium">No chart available</p>
                    </div>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:to-pink-400/10 rounded-2xl transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

   
  </>
);

};

export default CandidateCharts;
