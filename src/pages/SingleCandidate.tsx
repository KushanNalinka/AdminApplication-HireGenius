



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
// // chanes



// import { useEffect, useState } from "react";
// import { useParams, useNavigate} from "react-router-dom";
// import axios from "axios";

// import { usePopupContext } from "../context/PopupContext"; // ✅ Import
// const API_URL = import.meta.env.VITE_API_URL as string;



// interface Experience {
//   title: string;
//   company: string;
//   from: string;
//   to: string;
//   officeLocation: string;
//   description: string;
// }

// interface Education {
//   degree: string;
//   institute: string;
//   year: string;
// }

// interface CourseOrAchievement {
//   type: string;
//   content: string;
// }

// interface ChartsData {
//   [category: string]: {
//     chart: string;
//   };
// }

// interface Candidate {
//   confirmEmail: string;
//   jobPosition: string;
//   jobTitle: string;
//   university: string;
//   education_level: string;
//   noofyearsofexperience: number;
//   linkedIn: string;
//   github: string;
//   twitter: string;
//   website: string;
//   extract_predicted_matching_percentage: number;
//   extract_workExperienceMatchingSimilarity: number;
//   extract_achievements_similarity: number;
//   extract_coursesAndCertificationMatchingSimilarity: number;
//   extract_projectsMatchingSimilarity: number;
//   salaryRange: string;
//   vacancySource: string;
//   privacyPolicy: string;
//   employerChoice: string;
//   message: string;
//   experience: Experience[];
//   education: Education[];
//   work_experience: string[];
//   project_experiences: string[];
//   courses_certifications_achievements: CourseOrAchievement[];
//   extractednoofprogramminglanguages: number;
//   extractednoofprogrammingframeworks: number;
//   extractednoofcloudtechnologies: number;
//   extractednoofdatabasetechnologies: number;
//   extractednoofdevopstools: number;
//   extractednoofsoftwaredevelopmentmethodologies: number;
//   extractednoofversioncontroltechnologies: number;
//   extractednoofwebtechnologies: number;
//   num_of_tools_technologies: number;
//   resume: string;
//   transcript: string;
//   entered_predicted_matching_percentage?: number;
//   entered_experience_similarity?: number;
//   entered_education_similarity?: number;
//   entered_courses_certifications_similarity?: number;
//   entered_employer_choice_similarity?: number;
//   entered_employer_expectations_similarity?: number;
//   entered_message_similarity?: number;
//   extract_cv_similarity?: number;
//   charts?: ChartsData;
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { usePopupContext } from "../context/PopupContext";
const API_URL = import.meta.env.VITE_API_URL as string;

interface Experience {
  title: string;
  company: string;
  from: string;
  to: string;
  officeLocation: string;
  description: string;
}

interface Education {
  degree: string;
  institute: string;
  year: string;
}

interface CourseOrAchievement {
  type: string;
  content: string;
}

interface ChartsData {
  [category: string]: {
    chart: string;
  };
}

interface Candidate {
  confirmEmail: string;
  jobPosition: string;
  jobTitle: string;
  university: string;
  education_level: string;
  noofyearsofexperience: number;
  linkedIn: string;
  github: string;
  twitter: string;
  website: string;
  extract_predicted_matching_percentage: number;
  extract_workExperienceMatchingSimilarity: number;
  extract_achievements_similarity: number;
  extract_coursesAndCertificationMatchingSimilarity: number;
  extract_projectsMatchingSimilarity: number;
  salaryRange: string;
  vacancySource: string;
  privacyPolicy: string;
  employerChoice: string;
  message: string;
  experience: Experience[];
  education: Education[];
  work_experience: string[];
  project_experiences: string[];
  courses_certifications_achievements: CourseOrAchievement[];
  achievements: string;
  coursesCertifications: string;
  extract_achievements: string[];
  extractednoofprogramminglanguages: number;
  extractednoofprogrammingframeworks: number;
  extractednoofcloudtechnologies: number;
  extractednoofdatabasetechnologies: number;
  extractednoofdevopstools: number;
  extractednoofsoftwaredevelopmentmethodologies: number;
  extractednoofversioncontroltechnologies: number;
  extractednoofwebtechnologies: number;
  num_of_tools_technologies: number;
  resume: string;
  transcript: string;
  entered_predicted_matching_percentage?: number;
  entered_experience_similarity?: number;
  entered_education_similarity?: number;
  entered_courses_certifications_similarity?: number;
  entered_employer_choice_similarity?: number;
  entered_employer_expectations_similarity?: number;
  entered_message_similarity?: number;
  extract_cv_similarity?: number;
  charts?: ChartsData;
}

const CandidateProfile = () => {
  const { id } = useParams<{ id: string }>();
  
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedChart, setSelectedChart] = useState<{ category: string; data: { chart: string } } | null>(null);


const { openPopup, closePopup } = usePopupContext(); // ✅ Access context
const navigate = useNavigate();

useEffect(() => {
  if (selectedChart) openPopup();
  else closePopup();
}, [selectedChart]);


  useEffect(() => {
    if (!id) return;

    axios
      .get(`${API_URL}/candidates/${id}`)
      .then((response) => {
        const data = response.data;
        setCandidate({
          ...data,
          experience: typeof data.experience === "string" ? JSON.parse(data.experience) : data.experience,
          education: typeof data.education === "string" ? JSON.parse(data.education) : data.education
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
   { id: 'certifications', label: 'Courses & Certifications', icon: '📘' },
    { id: 'documents', label: 'Documents', icon: '🗂️' },
      { id: 'charts', label: 'Charts', icon: '📈' }
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

      // case 'achievements':
      //   return (
      //     <div className="space-y-8 animate-fade-in">
      //       <div className="text-center mb-8">
      //         <h2 className="text-4xl font-bold text-[#DBD8E3] mb-4">🏆 Achievements & Certifications</h2>
      //         <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto"></div>
      //       </div>

      //       {/* Certifications */}
      //       <div className="mb-12">
      //         <h3 className="text-2xl font-bold text-[#DBD8E3] mb-6">📜 Certifications & Courses</h3>
      //         {candidate.courses_certifications_achievements && 
      //          candidate.courses_certifications_achievements.filter(cert => cert.type === "Courses/Certifications").length > 0 ? (
      //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      //             {candidate.courses_certifications_achievements
      //               .filter(cert => cert.type === "Courses/Certifications")
      //               .map((cert, index) => (
      //                 <div key={index} className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-t-4 border-blue-500">
      //                   <div className="flex items-start space-x-4">
      //                     <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-xl animate-spin-slow">
      //                       📜
      //                     </div>
      //                     <div className="flex-1">
      //                       <p className="text-[#DBD8E3] leading-relaxed">{cert.content}</p>
      //                     </div>
      //                   </div>
      //                 </div>
      //               ))}
      //           </div>
      //         ) : (
      //           <div className="text-center py-8">
      //             <div className="text-4xl mb-2 opacity-50">📜</div>
      //             <p className="text-[#DBD8E3]">No certifications available</p>
      //           </div>
      //         )}
      //       </div>

      //       {/* Achievements */}
      //       <div>
      //         <h3 className="text-2xl font-bold text-[#DBD8E3] mb-6">🏆 Achievements</h3>
      //         {candidate.courses_certifications_achievements && 
      //          candidate.courses_certifications_achievements.filter(item => item.type === "Achievements").length > 0 ? (
      //           <div className="space-y-4">
      //             {candidate.courses_certifications_achievements
      //               .filter(item => item.type === "Achievements")
      //               .map((item, index) => (
      //                 <div key={index} className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-3xl shadow-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300">
      //                   <div className="flex items-start space-x-4">
      //                     <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-                          400 rounded-full flex items-center justify-center text-xl animate-pulse">
      //                       🏆
      //                     </div>
      //                     <div className="flex-1">
      //                       <p className="text-[#DBD8E3] leading-relaxed">{item.content}</p>
      //                     </div>
      //                   </div>
      //                 </div>
      //               ))}
      //           </div>
      //         ) : (
      //           <div className="text-center py-8">
      //             <div className="text-4xl mb-2 opacity-50">🏆</div>
      //             <p className="text-[#DBD8E3]">No achievements available</p>
      //           </div>
      //         )}
      //       </div>
      //     </div>
      //   );

//       case 'achievements':
//   return (
//     <div className="space-y-8 animate-fade-in">
//       <div className="text-center mb-8">
//         <h2 className="text-4xl font-bold text-[#DBD8E3] mb-4">🏆 Achievements</h2>
//         <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto"></div>
//       </div>

//       {candidate.extract_achievements && candidate.extract_achievements.length > 0 && (
//         <div className="space-y-4">
//           {candidate.extract_achievements.map((achievement, index) => (
//             <div
//               key={`extract-${index}`}
//               className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-3xl shadow-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300"
//             >
//               <div className="flex items-start space-x-4">
//                 <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xl animate-pulse">
//                   🏆
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-[#DBD8E3] leading-relaxed">{achievement}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {candidate.achievements && (
//         <div className="bg-[#2A2438]/50 p-6 rounded-2xl mt-6 border border-yellow-500/30">
//           <h3 className="text-xl text-[#DBD8E3] font-semibold mb-2">Additional Achievements</h3>
//           <pre className="text-[#DBD8E3] whitespace-pre-wrap font-mono text-sm">{candidate.achievements}</pre>
//         </div>
//       )}
//     </div>
//   );

// case 'certifications':
//   return (
//     <div className="space-y-8 animate-fade-in">
//       <div className="text-center mb-8">
//         <h2 className="text-4xl font-bold text-[#DBD8E3] mb-4">📜 Courses & Certifications</h2>
//         <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto"></div>
//       </div>

//       {candidate.coursesCertifications && (
//         <div className="bg-[#2A2438]/50 p-6 rounded-2xl mt-6 border border-blue-500/30">
//           <h3 className="text-xl text-[#DBD8E3] font-semibold mb-2">Additional Course Content</h3>
//           <pre className="text-[#DBD8E3] whitespace-pre-wrap font-mono text-sm">{candidate.coursesCertifications}</pre>
//         </div>
//       )}

//       {candidate.courses_certifications_achievements && candidate.courses_certifications_achievements.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {candidate.courses_certifications_achievements.map((entry, index) => (
//             <div
//               key={index}
//               className="bg-gradient-to-br from-[#352F44] to-[#5C5470] p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-t-4 border-blue-500"
//             >
//               <div className="flex items-start space-x-4">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-xl animate-spin-slow">
//                   📘
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-[#DBD8E3] leading-relaxed">{entry.content}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

      
//     </div>
//   );

case 'achievements':
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-xl rounded-full transform scale-150"></div>
          <h2 className="relative text-5xl font-bold text-[#DBD8E3] mb-6 tracking-wide">
            <span className="inline-block transform hover:scale-110 transition-transform duration-300">🏆</span>
            <span className="ml-4">Achievements</span>
          </h2>
        </div>
        <div className="relative">
          <div className="h-2 w-48 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-full mx-auto shadow-lg"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-2 w-16 bg-white/30 rounded-full animate-pulse"></div>
        </div>
      </div>

      {candidate.extract_achievements && candidate.extract_achievements.length > 0 && (
        <div className="space-y-6">
          {candidate.extract_achievements.map((achievement, index) => (
            <div
              key={`extract-${index}`}
              className="group relative bg-gradient-to-br from-yellow-500/10 via-orange-500/15 to-yellow-500/10 p-8 rounded-3xl shadow-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500 transform hover:translate-y-[-4px] backdrop-blur-sm"
              style={{
                boxShadow: '0 25px 50px -12px rgba(234, 179, 8, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative flex items-start space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300"
                       style={{
                         boxShadow: '0 10px 25px rgba(234, 179, 8, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                       }}>
                    🗂️
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full flex items-center justify-center text-xs animate-bounce">
                    ✨
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="h-1 w-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                    <span className="text-yellow-400 text-sm font-semibold tracking-wide">ACHIEVEMENT #{index + 1}</span>
                  </div>
                  <p className="text-[#DBD8E3] leading-relaxed text-lg font-medium">{achievement}</p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent rounded-b-3xl"></div>
            </div>
          ))}
        </div>
      )}

      {candidate.achievements && (
        <div className="relative bg-gradient-to-br from-[#2A2438]/80 via-[#2A2438]/60 to-[#2A2438]/80 p-8 rounded-3xl mt-8 border border-yellow-500/20 backdrop-blur-sm"
             style={{
               boxShadow: '0 25px 50px -12px rgba(42, 36, 56, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
             }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400/50 via-orange-400/50 to-yellow-400/50 rounded-t-3xl"></div>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
              📋
            </div>
            <h3 className="text-2xl text-[#DBD8E3] font-bold tracking-wide">Additional Achievements</h3>
          </div>
          
          <div className="bg-[#1a1625]/50 p-6 rounded-2xl border border-yellow-500/10">
            <pre className="text-[#DBD8E3] whitespace-pre-wrap font-mono text-sm leading-relaxed">{candidate.achievements}</pre>
          </div>
        </div>
      )}
    </div>
  );

case 'certifications':
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-xl rounded-full transform scale-150"></div>
          <h2 className="relative text-5xl font-bold text-[#DBD8E3] mb-6 tracking-wide">
            <span className="inline-block transform hover:scale-110 transition-transform duration-300">📜</span>
            <span className="ml-4">Courses & Certifications</span>
          </h2>
        </div>
        <div className="relative">
          <div className="h-2 w-48 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-full mx-auto shadow-lg"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-2 w-16 bg-white/30 rounded-full animate-pulse"></div>
        </div>
      </div>

      {candidate.coursesCertifications && (
        <div className="relative bg-gradient-to-br from-[#2A2438]/80 via-[#2A2438]/60 to-[#2A2438]/80 p-8 rounded-3xl mt-8 border border-blue-500/20 backdrop-blur-sm"
             style={{
               boxShadow: '0 25px 50px -12px rgba(42, 36, 56, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
             }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/50 via-cyan-400/50 to-blue-400/50 rounded-t-3xl"></div>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
              📚
            </div>
            <h3 className="text-2xl text-[#DBD8E3] font-bold tracking-wide">Additional Course Content</h3>
          </div>
          
          <div className="bg-[#1a1625]/50 p-6 rounded-2xl border border-blue-500/10">
            <pre className="text-[#DBD8E3] whitespace-pre-wrap font-mono text-sm leading-relaxed">{candidate.coursesCertifications}</pre>
          </div>
        </div>
      )}

      {candidate.courses_certifications_achievements && candidate.courses_certifications_achievements.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {candidate.courses_certifications_achievements.map((entry, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#352F44] via-[#5C5470] to-[#352F44] p-8 rounded-3xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 border-t-4 border-blue-500 backdrop-blur-sm"
              style={{
                boxShadow: '0 25px 50px -12px rgba(53, 47, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative flex items-start space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-500"
                       style={{
                         boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                       }}>
                    🗂️
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full flex items-center justify-center text-sm animate-spin-slow">
                    🎯
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    <span className="text-blue-400 text-sm font-semibold tracking-wide">CERTIFICATION #{index + 1}</span>
                  </div>
                  <p className="text-[#DBD8E3] leading-relaxed text-lg font-medium">{entry.content}</p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent rounded-b-3xl"></div>
              
              {/* 3D depth effect */}
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-[#1a1625]/20 to-[#2A2438]/40 rounded-3xl -z-10 blur-sm"></div>
            </div>
          ))}
        </div>
      )}
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
                    href={`${API_URL}/uploads/cv/${candidate.resume}`}
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
                    href={`${API_URL}/uploads/transcripts/${candidate.transcript}`}
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
        

        // Add a new switch case for 'charts' in renderTabContent
  //     case 'charts':
  // return (
  //   <div className="space-y-8 animate-fade-in">
  //     <div className="text-center mb-8">
  //       <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-3xl animate-spin-slow shadow-xl">
  //         📈
  //       </div>
  //       <h2 className="text-4xl font-bold text-[#DBD8E3] mt-2">📊 Visual Charts</h2>
  //       <div className="h-1 w-32 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-2"></div>
  //     </div>

  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  //       {candidate.charts ? (
  //         Object.entries(candidate.charts).map(([category, data], index) => (
  //           <div
  //             key={index}
  //             className="relative bg-gradient-to-br from-[#352F44] to-[#5C5470] p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] transform hover:scale-105 hover:rotate-1 transition-all duration-500 border border-indigo-500/20 cursor-pointer"
  //             onClick={() => setSelectedChart({ category, data })}
  //             title="Click to enlarge"
  //           >
  //             <div className="flex items-center space-x-4 mb-4">
  //               <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-xl animate-bounce shadow-lg">
  //                 📊
  //               </div>
  //               <h3 className="text-2xl font-bold text-[#DBD8E3]">{category}</h3>
  //             </div>

  //             <div className="overflow-hidden rounded-xl shadow-inner bg-[#1f1a2c] p-3 border border-[#DBD8E3]/10 hover:shadow-xl transition-all duration-300">
  //               <img
  //                 src={`data:image/png;base64,${data.chart}`}
  //                 alt={`${category} Chart`}
  //                 className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
  //               />
  //             </div>

  //             <p className="text-sm text-gray-400 mt-3 italic text-right">Click to enlarge 🔍</p>
  //           </div>
  //         ))
  //       ) : (
  //         <p className="text-[#DBD8E3] text-center col-span-2">No charts available</p>
  //       )}
  //     </div>

  //     {/* Fullscreen Modal */}
  //     {selectedChart && (
  //       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
  //         <div className="relative bg-[#1a1625] rounded-3xl p-6 w-full max-w-4xl shadow-2xl transform scale-100 transition duration-300">
  //           <button
  //             className="absolute top-4 right-4 text-white text-xl bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 rounded-full hover:scale-105 transition"
  //             onClick={() => setSelectedChart(null)}
  //           >
  //             ⬅ Back
  //           </button>
  //           <div className="flex items-center mb-4">
  //             <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-2xl mr-4 animate-bounce">
  //               📈
  //             </div>
  //             <h3 className="text-3xl font-bold text-[#DBD8E3]">{selectedChart.category}</h3>
  //           </div>
  //           <img
  //             src={`data:image/png;base64,${selectedChart.data.chart}`}
  //             alt="Enlarged Chart"
  //             className="w-full h-auto rounded-xl border border-[#DBD8E3]/20"
  //           />
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

case 'charts':
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-3xl animate-spin-slow shadow-xl">
          📈
        </div>
        <h2 className="text-4xl font-bold text-[#DBD8E3] mt-2">📊 Visual Charts</h2>
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {candidate.charts ? (
          Object.entries(candidate.charts).map(([category, data], index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-[#352F44] to-[#5C5470] p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] transform hover:scale-105 hover:rotate-1 transition-all duration-500 border border-indigo-500/20 cursor-pointer"
              onClick={() => setSelectedChart({ category, data })}
              title="Click to enlarge"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-xl animate-bounce shadow-lg">
                  📊
                </div>
                <h3 className="text-2xl font-bold text-[#DBD8E3]">{category}</h3>
              </div>

              <div className="overflow-hidden rounded-xl shadow-inner bg-[#1f1a2c] p-3 border border-[#DBD8E3]/10 hover:shadow-xl transition-all duration-300">
                <img
                  src={`data:image/png;base64,${data.chart}`}
                  alt={`${category} Chart`}
                  className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>

              <p className="text-sm text-gray-400 mt-3 italic text-right">Click to enlarge 🔍</p>
            </div>
          ))
        ) : (
          <p className="text-[#DBD8E3] text-center col-span-2">No charts available</p>
        )}
      </div>

      {selectedChart && (
  <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
    <div className="relative bg-[#1a1625] rounded-3xl p-6 w-full max-w-4xl shadow-2xl transform scale-100 transition duration-300">
      <button
        className="absolute top-4 right-4 text-white text-xl bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 rounded-full hover:scale-105 transition"
        onClick={() => setSelectedChart(null)}
      >
        ⬅ Back
      </button>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-2xl mr-4 animate-bounce">
          📈
        </div>
        <h3 className="text-3xl font-bold text-[#DBD8E3]">{selectedChart.category}</h3>
      </div>
      <img
        src={`data:image/png;base64,${selectedChart.data.chart}`}
        alt="Enlarged Chart"
        className="w-full h-auto rounded-xl border border-[#DBD8E3]/20"
      />
    </div>
  </div>
)}

    </div>
  );





      default:
        return <p className="text-white">Tab not found</p>;
    }
  };

  return (
    <>
     
      <div className="min-h-screen bg-gradient-to-br from-[#1a1625] via-[#2A2438] to-[#352F44] p-6 md:p-12">
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <button
                className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                onClick={() => navigate(-1)}
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Go Back
              </button>

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
