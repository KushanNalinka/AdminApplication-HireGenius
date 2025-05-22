


// import { useEffect, useState } from "react";
// import { useParams ,useNavigate} from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// const CandidateProfile = () => {
//   const { id } = useParams();
//   const [candidate, setCandidate] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Fetching candidate details for ID:", id);

//     if (!id) {
//       console.error("Candidate ID is undefined. Cannot fetch data.");
//       return;
//     }

//     axios
//       .get(`http://localhost:5000/candidates/${id}`)
//       .then((response) => {
//         const data = response.data;
//         setCandidate({
//           ...data,
//           experience: typeof data.experience === "string" ? JSON.parse(data.experience) : data.experience,
//           education: typeof data.education === "string" ? JSON.parse(data.education) : data.education,
//         });
//       })
//       .catch((error) => console.error("Error fetching candidate details:", error));
//   }, [id]);

//   if (!candidate) return <div className="text-center text-white">Loading...</div>;

//   return (
//     <>
//       <PageMeta title="Candidate Profile" description="Detailed Candidate Information" />
//       <PageBreadcrumb pageTitle={`${candidate.firstName} ${candidate.lastName}`} />

//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//       <button
//           className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//          {/* 🔹 Basic Candidate Info */}
//          <h1 className="text-3xl font-bold text-[#DBD8E3] mb-4 text-center">
//           {candidate.firstName} {candidate.lastName}
//         </h1>
//         <p className="text-center text-[#DBD8E3] mb-6">{candidate.confirmEmail}</p>

//         {/* 🔹 Job Details */}
//         <h2 className="text-xl font-semibold text-[#DBD8E3] mb-3">Job Position</h2>
//         <p className="text-[#DBD8E3]">{candidate.jobPosition} - {candidate.jobTitle}</p>

//         {/* 🔹 Additional Information (Styled) */}
//         <div className="bg-[#352F44] p-6 rounded-lg shadow-lg mt-6">
//           <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">Additional Information</h2>
//           <p className="text-[#DBD8E3]"><strong>LinkedIn : </strong>  <a href={candidate.linkedIn} className="text-blue-400 underline">{candidate.linkedIn}</a></p>
//           <p className="text-[#DBD8E3]"><strong>GitHub : </strong>  <a href={candidate.github} className="text-blue-400 underline">{candidate.github}</a></p>
//           <p className="text-[#DBD8E3]"><strong>Twitter : </strong> <a href={candidate.twitter} className="text-blue-400 underline">{candidate.twitter}</a></p>
//           <p className="text-[#DBD8E3]"><strong>Website : </strong> <a href={candidate.website} className="text-blue-400 underline">{candidate.website}</a></p>
//           <p className="text-[#DBD8E3]"><strong>University : </strong> <span className="text-green-400">{candidate.university} </span></p>
//           <p className="text-[#DBD8E3]"><strong>Education Level : </strong> <span className="text-green-400">{candidate.education_level} </span></p>
        
         
//         </div>

//         {/* 🔹 Matching Scores (Styled) */}
//         <div className="bg-[#5C5470] p-6 rounded-lg shadow-lg mt-6">
//           <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">Candidate Insights for Job</h2>
//           <p className="text-[#DBD8E3]"><strong>Prefered Salary Range : </strong> <span className="text-green-400"> {candidate.salaryRange}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Vacancy Source : </strong> <span className="text-green-400">{candidate.vacancySource}</span></p>
//           <p className="text-[#DBD8E3]"><strong>No of yeras of Experience:</strong> <span className="text-green-400">{candidate.noofyearsofexperience}</span> </p>
//           <p className="text-[#DBD8E3]"><strong>Policy State:</strong> <span className="text-green-400">{candidate.privacyPolicy}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Message To Hiring Manager:</strong><span className="text-green-400"> {candidate.message}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Employer Choice:</strong><span className="text-green-400"> {candidate.employerChoice}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Employer Expectations:</strong> <span className="text-green-400">{candidate.employerExpectations}</span></p>
//          </div>

//         {/* 🔹 Matching Scores (Styled) */}
//         <div className="bg-[#5C5470] p-6 rounded-lg shadow-lg mt-6">
//           <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">Matching Scores</h2>
//           <p className="text-[#DBD8E3]"><strong>Predicted Matching Percentage : </strong> <span className="text-green-400">{candidate.extract_predicted_matching_percentage}%</span></p>
//           <p className="text-[#DBD8E3]"><strong>Work Experience Matching : </strong> <span className="text-green-400">{candidate.extract_workExperienceMatchingSimilarity}%</span></p>
//           <p className="text-[#DBD8E3]"><strong>Achievements Similarity : </strong> <span className="text-green-400">{candidate.extract_achievements_similarity}%</span></p>
//           <p className="text-[#DBD8E3]"><strong>Courses & Certifications Similarity : </strong> <span className="text-green-400">{candidate.extract_coursesAndCertificationMatchingSimilarity}%</span></p>
//           <p className="text-[#DBD8E3]"><strong>Projects Matching Similarity : </strong> <span className="text-green-400">{candidate.extract_projectsMatchingSimilarity}%</span></p>
//         </div>

//         {/* 🔹 Experience Section */}
//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Experience</h2>
//         {candidate.experience.length > 0 ? (
//           candidate.experience.map((exp, index) => (
//             <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg">
//               <p><strong>Title:</strong> {exp.title}</p>
//               <p><strong>Company:</strong> {exp.company}</p>
//               <p><strong>From:</strong> {exp.from} - <strong>To:</strong> {exp.to}</p>
//               <p><strong>Location:</strong> {exp.officeLocation}</p>
//               <p><strong>Description:</strong> {exp.description}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-[#DBD8E3]">No experience available</p>
//         )}

//         {/* 🔹 Education Section */}
//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Education</h2>
//         {candidate.education.length > 0 ? (
//           candidate.education.map((edu, index) => (
//             <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg">
//               <p><strong>Institution:</strong> {edu.institute}</p>
//               <p><strong>Degree:</strong> {edu.degree}</p>
//               <p><strong>Year:</strong> {edu.year}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-[#DBD8E3]">No education available</p>
//         )}

//         {/* 🔹 Charts Section */}
//           {/* ——— Charts ——— */}
//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">
//           Charts
//         </h2>
//         {candidate.charts ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Object.entries(candidate.charts).map(([category, data]) => (
//               <div
//                 key={category}
//                 className="bg-[#352F44] p-4 rounded-lg shadow-lg"
//               >
//                 <h3 className="text-lg font-semibold">{category}</h3>
//                 <img
//                   className="mt-2 rounded-lg border border-[#DBD8E3]"
//                   src={`data:image/png;base64,${data.chart}`}
//                   alt={`${category} Chart`}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-[#DBD8E3]">No charts available</p>
//         )}


//         {/* 🔹 Skills & Technologies (Styled) */}
//         <div className="bg-[#352F44] p-6 rounded-lg shadow-lg mt-6">
//           <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">Skills & Technologies</h2>
//           <p className="text-[#DBD8E3]"><strong>Programming Languages : </strong> <span className="text-green-400">{candidate.extractednoofprogramminglanguages}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Frameworks : </strong> <span className="text-green-400">{candidate.extractednoofprogrammingframeworks}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Cloud Technologies : </strong> <span className="text-green-400">{candidate.extractednoofcloudtechnologies}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Databases : </strong> <span className="text-green-400">{candidate.extractednoofdatabasetechnologies}</span></p>
//           <p className="text-[#DBD8E3]"><strong>DevOps Tools : </strong> <span className="text-green-400">{candidate.extractednoofdevopstools}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Software Development Methodologies : </strong> <span className="text-green-400">{candidate.extractednoofsoftwaredevelopmentmethodologies}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Version Controlling : </strong> <span className="text-green-400">{candidate.extractednoofversioncontroltechnologies}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Web Development Technologies : </strong> <span className="text-green-400">{candidate.extractednoofwebtechnologies}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Total Number of Tools & Technologies : </strong> <span className="text-green-400">{candidate.num_of_tools_technologies}</span></p>
//         </div>

//       {/* 🔹 Project Experience */}
// <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Project Experience</h2>
// {candidate.project_experiences && candidate.project_experiences.length > 0 ? (
//   candidate.project_experiences.map((proj, index) => (
//     <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg whitespace-pre-line">
//       <p>{proj}</p>
//     </div>
//   ))
// ) : (
//   <p className="text-[#DBD8E3]">No project experiences available</p>
// )}

// {/* 🔹 Work Experience Section */}
// <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Work Experience</h2>
// {candidate.work_experience && candidate.work_experience.length > 0 ? (
//   candidate.work_experience.map((work, index) => (
//     <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg whitespace-pre-line">
//       <p>{work}</p>
//     </div>
//   ))
// ) : (
//   <p className="text-[#DBD8E3]">No work experience details available</p>
// )}

// {/* 🔹 Certifications & Courses */}
// <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Courses & Certifications</h2>
// {candidate.courses_certifications_achievements && candidate.courses_certifications_achievements.length > 0 ? (
//   candidate.courses_certifications_achievements
//     .filter(cert => cert.type === "Courses/Certifications")
//     .map((cert, index) => (
//       <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg whitespace-pre-line">
//         <p><strong>Course/Certification:</strong> {cert.content}</p>
//       </div>
//     ))
// ) : (
//   <p className="text-[#DBD8E3]">No certifications available</p>
// )}

// {/* 🔹 Achievements */}
// <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Achievements</h2>
// {candidate.courses_certifications_achievements && candidate.courses_certifications_achievements.length > 0 ? (
//   candidate.courses_certifications_achievements
//     .filter(item => item.type === "Achievements")
//     .map((item, index) => (
//       <div key={index} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg whitespace-pre-line">
//         <p><strong>Achievement:</strong> {item.content}</p>
//       </div>
//     ))
// ) : (
//   <p className="text-[#DBD8E3]">No achievements available</p>
// )}

//         {/* 🔹 Documents */}
//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Documents</h2>
//         <p className="text-[#DBD8E3]"><strong>Resume:</strong> <a href={`http://localhost:5000/uploads/cv/${candidate.resume}`} className="text-blue-400 underline">Download Resume</a></p>
//         <p className="text-[#DBD8E3]"><strong>Transcript:</strong> <a href={`http://localhost:5000/uploads/transcripts/${candidate.transcript}`} className="text-blue-400 underline">Download Transcript</a></p>

//       </div>
//     </>
//   );
// };

// export default CandidateProfile;



// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";

// interface Experience {
//   title: string;
//   company: string;
//   from: string;
//   to: string;
//   officeLocation: string;
//   description: string;
// }

// interface Education {
//   institute: string;
//   degree: string;
//   year: string;
// }

// interface ChartData {
//   chart: string;
// }

// interface CourseCertAchievement {
//   type: string;
//   content: string;
// }

// interface Candidate {
//   firstName: string;
//   lastName: string;
//   confirmEmail: string;
//   jobPosition: string;
//   jobTitle: string;
//   linkedIn: string;
//   github: string;
//   twitter: string;
//   website: string;
//   university: string;
//   education_level: string;
//   salaryRange: string;
//   vacancySource: string;
//   noofyearsofexperience: string;
//   privacyPolicy: string;
//   message: string;
//   employerChoice: string;
//   employerExpectations: string;
//   extract_predicted_matching_percentage: number;
//   extract_workExperienceMatchingSimilarity: number;
//   extract_achievements_similarity: number;
//   extract_coursesAndCertificationMatchingSimilarity: number;
//   extract_projectsMatchingSimilarity: number;
//   experience: Experience[];
//   education: Education[];
//   charts?: Record<string, ChartData>;
//   extractednoofprogramminglanguages: string;
//   extractednoofprogrammingframeworks: string;
//   extractednoofcloudtechnologies: string;
//   extractednoofdatabasetechnologies: string;
//   extractednoofdevopstools: string;
//   extractednoofsoftwaredevelopmentmethodologies: string;
//   extractednoofversioncontroltechnologies: string;
//   extractednoofwebtechnologies: string;
//   num_of_tools_technologies: number;
//   project_experiences: string[];
//   work_experience: string[];
//   courses_certifications_achievements: CourseCertAchievement[];
//   resume: string;
//   transcript: string;
// }

// const CandidateProfile = () => {
//   const { id } = useParams<{ id: string }>();
//   const [candidate, setCandidate] = useState<Candidate | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!id) return;
//     axios
//       .get(`http://localhost:5000/candidates/${id}`)
//       .then((response) => {
//         const data = response.data;
//         setCandidate({
//           ...data,
//           experience: typeof data.experience === "string" ? JSON.parse(data.experience) : data.experience,
//           education: typeof data.education === "string" ? JSON.parse(data.education) : data.education,
//         });
//       })
//       .catch((error) => console.error("Error fetching candidate details:", error));
//   }, [id]);

//   if (!candidate) return <div className="text-center text-white">Loading...</div>;

//   return (
//     <>
//       <PageMeta title="Candidate Profile" description="Detailed Candidate Information" />
//       <PageBreadcrumb pageTitle={`${candidate.firstName} ${candidate.lastName}`} />
//       <div className="p-6 bg-[#2A2438] text-white min-h-screen">
//         <button
//           className="bg-[#DBD8E3] text-black px-4 py-2 rounded-lg hover:bg-[#5C5470] hover:text-white"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//         {/* Existing Sections Already Rendered */}

//         {/* 🔹 Skills & Technologies */}
//         <div className="bg-[#352F44] p-6 rounded-lg shadow-lg mt-6">
//           <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">Skills & Technologies</h2>
//           <p className="text-[#DBD8E3]"><strong>Programming Languages: </strong><span className="text-green-400">{candidate.extractednoofprogramminglanguages}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Frameworks: </strong><span className="text-green-400">{candidate.extractednoofprogrammingframeworks}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Cloud Technologies: </strong><span className="text-green-400">{candidate.extractednoofcloudtechnologies}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Databases: </strong><span className="text-green-400">{candidate.extractednoofdatabasetechnologies}</span></p>
//           <p className="text-[#DBD8E3]"><strong>DevOps Tools: </strong><span className="text-green-400">{candidate.extractednoofdevopstools}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Software Development Methodologies: </strong><span className="text-green-400">{candidate.extractednoofsoftwaredevelopmentmethodologies}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Version Controlling: </strong><span className="text-green-400">{candidate.extractednoofversioncontroltechnologies}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Web Development Technologies: </strong><span className="text-green-400">{candidate.extractednoofwebtechnologies}</span></p>
//           <p className="text-[#DBD8E3]"><strong>Total Number of Tools & Technologies: </strong><span className="text-green-400">{candidate.num_of_tools_technologies}</span></p>
//         </div>

//         {/* 🔹 Project Experience */}
//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Project Experience</h2>
//         {candidate.project_experiences?.length ? candidate.project_experiences.map((proj, i) => (
//           <div key={i} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg whitespace-pre-line">
//             <p>{proj}</p>
//           </div>
//         )) : <p className="text-[#DBD8E3]">No project experiences available</p>}

//         {/* 🔹 Work Experience */}
//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Work Experience</h2>
//         {candidate.work_experience?.length ? candidate.work_experience.map((work, i) => (
//           <div key={i} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg whitespace-pre-line">
//             <p>{work}</p>
//           </div>
//         )) : <p className="text-[#DBD8E3]">No work experience details available</p>}

//         {/* 🔹 Courses & Certifications */}
//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Courses & Certifications</h2>
//         {candidate.courses_certifications_achievements?.filter(cert => cert.type === "Courses/Certifications").map((cert, i) => (
//           <div key={i} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg whitespace-pre-line">
//             <p><strong>Course/Certification:</strong> {cert.content}</p>
//           </div>
//         )) || <p className="text-[#DBD8E3]">No certifications available</p>}

//         {/* 🔹 Achievements */}
//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Achievements</h2>
//         {candidate.courses_certifications_achievements?.filter(item => item.type === "Achievements").map((item, i) => (
//           <div key={i} className="mb-4 p-4 bg-[#352F44] rounded-lg shadow-lg whitespace-pre-line">
//             <p><strong>Achievement:</strong> {item.content}</p>
//           </div>
//         )) || <p className="text-[#DBD8E3]">No achievements available</p>}

//         {/* 🔹 Documents */}
//         <h2 className="text-2xl font-semibold text-[#DBD8E3] mt-6 mb-3">Documents</h2>
//         <p className="text-[#DBD8E3]"><strong>Resume:</strong> <a href={`http://localhost:5000/uploads/cv/${candidate.resume}`} className="text-blue-400 underline">Download Resume</a></p>
//         <p className="text-[#DBD8E3]"><strong>Transcript:</strong> <a href={`http://localhost:5000/uploads/transcripts/${candidate.transcript}`} className="text-blue-400 underline">Download Transcript</a></p>
//       </div>
//     </>
//   );
// };

// export default CandidateProfile;


mport { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const CandidateProfile = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching candidate details for ID:", id);

    if (!id) {
      console.error("Candidate ID is undefined. Cannot fetch data.");
      return;
    }

    axios
      .get(`http://localhost:5000/candidates/${id}`)
      .then((response) => {
        const data = response.data;
        setCandidate({
          ...data,
          experience: typeof data.experience === "string" ? JSON.parse(data.experience) : data.experience,
          education: typeof data.education === "string" ? JSON.parse(data.education) : data.education,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching candidate details:", error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1625] via-[#2A2438] to-[#352F44] flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#DBD8E3] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-white mt-4 text-center animate-pulse">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!candidate) return <div className="text-center text-white">Candidate not found</div>;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'documents', label: 'Documents', icon: '🗂️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Personal Info Card */}
            <div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-purple-500/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                  👤
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#DBD8E3] mb-2">Personal Information</h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-[#2A2438]/50 rounded-xl hover:bg-[#2A2438]/80 transition-colors">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-[#DBD8E3] font-medium">{candidate.confirmEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-[#2A2438]/50 rounded-xl hover:bg-[#2A2438]/80 transition-colors">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <p className="text-sm text-gray-400">Position</p>
                      <p className="text-[#DBD8E3] font-medium">{candidate.jobPosition}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-[#2A2438]/50 rounded-xl hover:bg-[#2A2438]/80 transition-colors">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="text-sm text-gray-400">Job Title</p>
                      <p className="text-[#DBD8E3] font-medium">{candidate.jobTitle}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-[#2A2438]/50 rounded-xl hover:bg-[#2A2438]/80 transition-colors">
                    <span className="text-2xl">🏫</span>
                    <div>
                      <p className="text-sm text-gray-400">University</p>
                      <p className="text-[#DBD8E3] font-medium">{candidate.university}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-[#2A2438]/50 rounded-xl hover:bg-[#2A2438]/80 transition-colors">
                    <span className="text-2xl">📚</span>
                    <div>
                      <p className="text-sm text-gray-400">Education Level</p>
                      <p className="text-[#DBD8E3] font-medium">{candidate.education_level}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-[#2A2438]/50 rounded-xl hover:bg-[#2A2438]/80 transition-colors">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <p className="text-sm text-gray-400">Experience</p>
                      <p className="text-[#DBD8E3] font-medium">{candidate.noofyearsofexperience} years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-blue-500/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-2xl animate-pulse">
                  🌐
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#DBD8E3] mb-2">Social Presence</h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'LinkedIn', url: candidate.linkedIn, icon: '💼', color: 'from-blue-500 to-blue-600' },
                  { label: 'GitHub', url: candidate.github, icon: '💻', color: 'from-gray-700 to-gray-800' },
                  { label: 'Twitter', url: candidate.twitter, icon: '🐦', color: 'from-sky-400 to-sky-500' },
                  { label: 'Website', url: candidate.website, icon: '🌍', color: 'from-green-500 to-green-600' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`bg-gradient-to-r ${social.color} p-4 rounded-2xl text-center hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-2xl group`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-3xl mb-2 group-hover:animate-bounce">{social.icon}</div>
                    <p className="text-white font-medium text-sm">{social.label}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Matching Scores */}
            <div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-green-500/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-2xl animate-spin-slow">
                  📊
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#DBD8E3] mb-2">Matching Insights</h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: 'Overall Match', value: candidate.extract_predicted_matching_percentage, icon: '🎯' },
                  { label: 'Work Experience', value: candidate.extract_workExperienceMatchingSimilarity, icon: '💼' },
                  { label: 'Achievements', value: candidate.extract_achievements_similarity, icon: '🏆' },
                  { label: 'Certifications', value: candidate.extract_coursesAndCertificationMatchingSimilarity, icon: '📜' },
                  { label: 'Projects', value: candidate.extract_projectsMatchingSimilarity, icon: '🚀' }
                ].map((score, index) => (
                  <div key={index} className="bg-[#2A2438]/50 p-6 rounded-2xl hover:bg-[#2A2438]/80 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl group-hover:animate-bounce">{score.icon}</span>
                      <span className="text-3xl font-bold text-green-400">{score.value}%</span>
                    </div>
                    <p className="text-[#DBD8E3] font-medium">{score.label}</p>
                    <div className="mt-3 bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${score.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


           {/* 🔹 Entered Matching Scores - Consistent Design */}
<div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-green-500/20">
  <div className="flex items-center space-x-4 mb-6">
    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-2xl animate-spin-slow">
      📊
    </div>
    <div>
      <h3 className="text-2xl font-bold text-[#DBD8E3] mb-2">Entered Matching Scores</h3>
      <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
    </div>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[{ label: 'Predicted Matching %', value: candidate.entered_predicted_matching_percentage, icon: '🎯' },
      { label: 'Work Experience', value: candidate.entered_experience_similarity, icon: '💼' },
      { label: 'Education Similarity', value: candidate.entered_education_similarity, icon: '🎓' },
      { label: 'Courses & Certifications', value: candidate.entered_courses_certifications_similarity, icon: '📜' },
      { label: 'Projects Matching', value: candidate.extract_projectsMatchingSimilarity, icon: '🚀' }].map((score, index) => (
        <div key={index} className="bg-[#2A2438]/50 p-6 rounded-2xl hover:bg-[#2A2438]/80 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl group-hover:animate-bounce">{score.icon}</span>
            <span className="text-3xl font-bold text-green-400">{score.value}%</span>
          </div>
          <p className="text-[#DBD8E3] font-medium">{score.label}</p>
          <div className="mt-3 bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${score.value}%` }}></div>
          </div>
        </div>
      ))}
  </div>
</div>

{/* 🔹 CV Similarity Score */}
<div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-green-500/20 mt-6">
  <div className="flex items-center space-x-4 mb-6">
    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-2xl animate-pulse">
      🧠
    </div>
    <div>
      <h3 className="text-2xl font-bold text-[#DBD8E3] mb-2">Total CV Matchings</h3>
      <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
    </div>
  </div>
  <div className="text-3xl font-bold text-green-400">{candidate.extract_cv_similarity}%</div>
</div>

{/* 🔹 Initial Screening Scores */}
<div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-green-500/20 mt-6">
  <div className="flex items-center space-x-4 mb-6">
    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
      📝
    </div>
    <div>
      <h3 className="text-2xl font-bold text-[#DBD8E3] mb-2">Initial Screening Matching</h3>
      <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
    </div>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[{ label: 'Employer Choice Match', value: candidate.entered_employer_choice_similarity, icon: '🎯' },
      { label: 'Employer Expectations', value: candidate.entered_employer_expectations_similarity, icon: '📌' },
      { label: 'Message Match', value: candidate.entered_message_similarity, icon: '💬' }].map((score, index) => (
        <div key={index} className="bg-[#2A2438]/50 p-6 rounded-2xl hover:bg-[#2A2438]/80 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl group-hover:animate-bounce">{score.icon}</span>
            <span className="text-3xl font-bold text-green-400">{score.value}%</span>
          </div>
          <p className="text-[#DBD8E3] font-medium">{score.label}</p>
          <div className="mt-3 bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${score.value}%` }}></div>
          </div>
        </div>
      ))}
  </div>
</div>

{/* 🔹 Charts Section */}
<div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 mt-12 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-indigo-500/20">
  <div className="flex items-center space-x-4 mb-6">
    <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-2xl animate-pulse">
      📊
    </div>
    <div>
      <h3 className="text-2xl font-bold text-[#DBD8E3] mb-2">Visual Charts</h3>
      <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
    </div>
  </div>

  {candidate.charts ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(candidate.charts).map(([category, data], index) => (
        <div
          key={index}
          className="bg-[#2A2438]/50 p-6 rounded-2xl hover:bg-[#2A2438]/80 transition-all duration-300 group border border-[#DBD8E3]/10 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl group-hover:animate-bounce">📈</span>
            <h3 className="text-xl font-bold text-[#DBD8E3]">{category}</h3>
          </div>
          <img
            className="mt-2 rounded-lg border border-[#DBD8E3]"
            src={`data:image/png;base64,${data.chart}`}
            alt={`${category} Chart`}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-12">
      <div className="text-5xl mb-4 opacity-50">📊</div>
      <p className="text-[#DBD8E3] text-xl">No charts available</p>
    </div>
  )}
</div>





            {/* Candidate Insights */}
            <div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border border-yellow-500/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-2xl animate-pulse">
                  💡
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#DBD8E3] mb-2">Candidate Insights</h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Salary Range', value: candidate.salaryRange, icon: '💰' },
                  { label: 'Vacancy Source', value: candidate.vacancySource, icon: '📍' },
                  { label: 'Privacy Policy', value: candidate.privacyPolicy, icon: '🔒' },
                  { label: 'Employer Choice', value: candidate.employerChoice, icon: '🎯' }
                ].map((insight, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-[#2A2438]/50 rounded-xl hover:bg-[#2A2438]/80 transition-all duration-300 group">
                    <span className="text-3xl group-hover:animate-bounce">{insight.icon}</span>
                    <div>
                      <p className="text-sm text-gray-400">{insight.label}</p>
                      <p className="text-[#DBD8E3] font-medium">{insight.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#2A2438]/50 rounded-xl">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Message to Hiring Manager</p>
                    <p className="text-[#DBD8E3] leading-relaxed">{candidate.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-[#DBD8E3] mb-4">💼 Professional Experience</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
            </div>
            
            {candidate.experience && candidate.experience.length > 0 ? (
              <div className="space-y-6">
                {candidate.experience.map((exp, index) => (
                  <div key={index} className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-l-4 border-purple-500">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-xl font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#DBD8E3] mb-2">{exp.title}</h3>
                        <p className="text-xl text-purple-300 mb-4">{exp.company}</p>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <span className="flex items-center space-x-2 bg-[#2A2438] px-3 py-1 rounded-full text-sm">
                            <span>📅</span>
                            <span className="text-green-400">{exp.from} - {exp.to}</span>
                          </span>
                          <span className="flex items-center space-x-2 bg-[#2A2438] px-3 py-1 rounded-full text-sm">
                            <span>📍</span>
                            <span className="text-blue-400">{exp.officeLocation}</span>
                          </span>
                        </div>
                        <p className="text-[#DBD8E3] leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-50">💼</div>
                <p className="text-[#DBD8E3] text-xl">No experience data available</p>
              </div>
            )}

            {/* Work Experience Details */}
            {candidate.work_experience && candidate.work_experience.length > 0 && (
              <div className="mt-12">
                <h3 className="text-3xl font-bold text-[#DBD8E3] mb-6 text-center">📋 Detailed Work Experience</h3>
                <div className="space-y-4">
                  {candidate.work_experience.map((work, index) => (
                    <div key={index} className="bg-gradient-to-r from-[#352F44] to-[#5C5470] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-600/30">
                      <pre className="text-[#DBD8E3] whitespace-pre-wrap leading-relaxed font-mono text-sm">{work}</pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-[#DBD8E3] mb-4">🎓 Educational Background</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto"></div>
            </div>
            
            {candidate.education && candidate.education.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {candidate.education.map((edu, index) => (
                  <div key={index} className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-t-4 border-blue-500">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 animate-bounce">
                        🎓
                      </div>
                      <h3 className="text-2xl font-bold text-[#DBD8E3] mb-2">{edu.degree}</h3>
                      <p className="text-xl text-blue-300">{edu.institute}</p>
                    </div>
                    <div className="text-center">
                      <span className="inline-flex items-center space-x-2 bg-[#2A2438] px-4 py-2 rounded-full">
                        <span>📅</span>
                        <span className="text-green-400 font-medium">{edu.year}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-50">🎓</div>
                <p className="text-[#DBD8E3] text-xl">No education data available</p>
              </div>
            )}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-[#DBD8E3] mb-4">⚡ Skills & Technologies</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Programming Languages', value: candidate.extractednoofprogramminglanguages, icon: '💻', color: 'from-red-400 to-red-500' },
                { label: 'Frameworks', value: candidate.extractednoofprogrammingframeworks, icon: '🔧', color: 'from-blue-400 to-blue-500' },
                { label: 'Cloud Technologies', value: candidate.extractednoofcloudtechnologies, icon: '☁️', color: 'from-cyan-400 to-cyan-500' },
                { label: 'Databases', value: candidate.extractednoofdatabasetechnologies, icon: '🗄️', color: 'from-green-400 to-green-500' },
                { label: 'DevOps Tools', value: candidate.extractednoofdevopstools, icon: '⚙️', color: 'from-purple-400 to-purple-500' },
                { label: 'Development Methodologies', value: candidate.extractednoofsoftwaredevelopmentmethodologies, icon: '📋', color: 'from-yellow-400 to-yellow-500' },
                { label: 'Version Control', value: candidate.extractednoofversioncontroltechnologies, icon: '🔀', color: 'from-pink-400 to-pink-500' },
                { label: 'Web Technologies', value: candidate.extractednoofwebtechnologies, icon: '🌐', color: 'from-indigo-400 to-indigo-500' }
              ].map((skill, index) => (
                <div key={index} className={`bg-gradient-to-br ${skill.color} p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-500 hover:rotate-3`}>
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4 animate-bounce">{skill.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{skill.label}</h3>
                    <div className="text-3xl font-bold mb-2">{skill.value}</div>
                    <div className="text-sm opacity-80">Technologies</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl text-center border border-purple-500/20">
              <div className="text-6xl mb-4 animate-pulse">🎯</div>
              <h3 className="text-3xl font-bold text-[#DBD8E3] mb-4">Total Technologies Mastered</h3>
              <div className="text-6xl font-bold text-green-400 mb-2">{candidate.num_of_tools_technologies}</div>
              <p className="text-xl text-gray-300">Tools & Technologies</p>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-[#DBD8E3] mb-4">🚀 Project Portfolio</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mx-auto"></div>
            </div>
            
            {candidate.project_experiences && candidate.project_experiences.length > 0 ? (
              <div className="space-y-6">
                {candidate.project_experiences.map((proj, index) => (
                  <div key={index} className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-l-4 border-orange-500">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-xl animate-pulse">
                        🚀
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#DBD8E3] mb-4">Project #{index + 1}</h3>
                        <pre className="text-[#DBD8E3] whitespace-pre-wrap leading-relaxed">{proj}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-50">🚀</div>
                <p className="text-[#DBD8E3] text-xl">No project experiences available</p>
              </div>
            )}
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-[#DBD8E3] mb-4">🏆 Achievements & Certifications</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto"></div>
            </div>

            {/* Certifications */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#DBD8E3] mb-6">📜 Certifications & Courses</h3>
              {candidate.courses_certifications_achievements && 
               candidate.courses_certifications_achievements.filter(cert => cert.type === "Courses/Certifications").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {candidate.courses_certifications_achievements
                    .filter(cert => cert.type === "Courses/Certifications")
                    .map((cert, index) => (
                      <div key={index} className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-t-4 border-blue-500">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-xl animate-spin-slow">
                            📜
                          </div>
                          <div className="flex-1">
                            <p className="text-[#DBD8E3] leading-relaxed">{cert.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2 opacity-50">📜</div>
                  <p className="text-[#DBD8E3]">No certifications available</p>
                </div>
              )}
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-2xl font-bold text-[#DBD8E3] mb-6">🏆 Achievements</h3>
              {candidate.courses_certifications_achievements && 
               candidate.courses_certifications_achievements.filter(item => item.type === "Achievements").length > 0 ? (
                <div className="space-y-4">
                  {candidate.courses_certifications_achievements
                    .filter(item => item.type === "Achievements")
                    .map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-3xl shadow-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-                          400 rounded-full flex items-center justify-center text-xl animate-pulse">
                            🏆
                          </div>
                          <div className="flex-1">
                            <p className="text-[#DBD8E3] leading-relaxed">{item.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2 opacity-50">🏆</div>
                  <p className="text-[#DBD8E3]">No achievements available</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-[#DBD8E3] mb-4">🗂️ Documents</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-6 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-[#DBD8E3] mb-2">📄 Resume</h3>
                {candidate.resume ? (
                  <a
                    href={`http://localhost:5000/uploads/cv/${candidate.resume}`}
                    className="text-blue-400 underline hover:text-blue-300 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Resume
                  </a>
                ) : (
                  <p className="text-gray-400">No resume uploaded</p>
                )}
              </div>

              <div className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-6 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-[#DBD8E3] mb-2">📑 Transcript</h3>
                {candidate.transcript ? (
                  <a
                    href={`http://localhost:5000/uploads/transcripts/${candidate.transcript}`}
                    className="text-blue-400 underline hover:text-blue-300 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Transcript
                  </a>
                ) : (
                  <p className="text-gray-400">No transcript uploaded</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return <p className="text-white">Tab not found</p>;
    }
  };

  return (
    <>
      <PageMeta title="Candidate Profile" />
      <PageBreadcrumb items={[{ label: "Dashboard", path: "/" }, { label: "Candidates", path: "/candidates" }, { label: "Profile" }]} />
      <div className="min-h-screen bg-gradient-to-br from-[#1a1625] via-[#2A2438] to-[#352F44] p-6 md:p-12">
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-[#2A2438] text-gray-300 hover:bg-purple-500 hover:text-white"
              }`}
            >
              <span className="mr-2">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
        {renderTabContent()}
      </div>
    </>
  );
};

export default CandidateProfile;
