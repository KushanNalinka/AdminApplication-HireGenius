import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { devDb } from '../../firebase/Devbase';
import jsPDF from "jspdf";
import PMModal from './Components/PMModal';
import DevOpsAssessmentModal from './Components/DevOpsAssessmentModal';
import HRAssessmentModal from './Components/HRAssessmentModal';
import TimeDataModal from './Components/TimeDataModal';
import WebDataModal from './Components/WebDataModal';

type Candidate = {
  email: string;
  category?: string;
  createdAt?: any;
  candidate?: {
    candidate: {
      name: string;
      age: string;
      gender: string;
      salary_expectation: string;
      experience: string;
      leadership_experience: string;
      english_proficiency: string;
      position: string;
      applying_position?: string;
    };
  };
};

export default function HRCandidateView() {
  const { email } = useParams();

  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPMModalOpen, setIsPMModalOpen] = useState(false);
  const [isDevOpsModalOpen, setIsDevOpsModalOpen] = useState(false);
  const [isHRModalOpen, setIsHRModalOpen] = useState(false);
  const [isStageModalOpen, setStageModalOpen] = useState(false);
  const [isWebModalOpen, setWebModalOpen] = useState(false);

  const [pmData, setPmData] = useState<any>(null);
  const [devOpsData, setDevOpsData] = useState<any>(null);
  const [hrData, setHRData] = useState<any>(null);
  const [timeData, setTimeData] = useState<any>(null);
  const [codesData, setCodesData] = useState<any>(null);
  const [methodsData, setMethodsData] = useState<any>(null);
  const [keysData, setKeysData] = useState<any>(null);

  useEffect(() => {
    if (email) {
      getCandidateDetails(email);
      getProjectManagementDetails(email);
      getDevOpsDetails(email);
      getHRSkillsDetails(email);
      getStageThreeDetails(email);
      getWebCodesDetails(email);
      getWebMethodsDetails(email);
      getWebKeyDetails(email);
    }
  }, [email]);

    const getCandidateDetails = async (email: string) => {
        try {
        const candidatesRef = collection(db, 'candidates');
        const q = query(candidatesRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const candidateData = querySnapshot.docs[0].data() as Candidate;
            setCandidate(candidateData);
        } else {
            console.warn('No candidate found for this email:', email);
            setCandidate(null);
        }
        } catch (error) {
            console.error('Error fetching candidate:', error);
        }
    };

    const getProjectManagementDetails = async (email: string) => {
        try {
        const candidatesRef = collection(db, 'PM');
        const q = query(candidatesRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const candidateData = querySnapshot.docs[0].data() as Candidate;
            setPmData(candidateData);
        } else {
            console.warn('No candidate found for this email:', email);
            setPmData(null);
        }
        } catch (error) {
            console.error('Error fetching PM data:', error);
        }
    };

    const getDevOpsDetails = async (email: string) => {
        try {
        const candidatesRef = collection(db, 'devOps');
        const q = query(candidatesRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const candidateData = querySnapshot.docs[0].data() as Candidate;
            setDevOpsData(candidateData);
        } else {
            console.warn('No candidate found for this email:', email);
            setDevOpsData(null);
        }
        } catch (error) {
            console.error('Error fetching PM data:', error);
        }
    };

    const getHRSkillsDetails = async (email: string) => {
        try {
            const candidatesRef = collection(db, 'chats');
            const q = query(candidatesRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const candidateData = querySnapshot.docs[0].data() as Candidate;
                setHRData(candidateData);
            } else {
                console.warn('No candidate found for this email:', email);
                setHRData(null);
            }
        } catch (error) {
            console.error('Error fetching PM data:', error);
        }
    };

    const getStageThreeDetails = async (email: string) => {
        try {
            const candidatesRef = collection(db, 'timeScores');
            const q = query(candidatesRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const candidateData = querySnapshot.docs[0].data() as Candidate;
                setTimeData(candidateData);
            } else {
                console.warn('No candidate found for this email:', email);
                setTimeData(null);
            }
        } catch (error) {
            console.error('Error fetching PM data:', error);
        }
    };

    const getWebCodesDetails = async (email: string) => {
        try {
            const candidatesRef = collection(devDb, 'codes');
            const q = query(candidatesRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const candidateData = querySnapshot.docs[0].data() as Candidate;
                console.log('Codes Data : ', candidateData);
                setCodesData(candidateData);
            } else {
            console.warn('No web dev data found for this email:', email);
            }
        } catch (error) {
            console.error('Error fetching web developer data:', error);
        }
    };

    const getWebMethodsDetails = async (email: string) => {
        try {
            const candidatesRef = collection(devDb, 'methods');
            const q = query(candidatesRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const candidateData = querySnapshot.docs[0].data() as Candidate;
                console.log('Methods Data : ', candidateData);
                setMethodsData(candidateData);
            } else {
            console.warn('No web dev data found for this email:', email);
            }
        } catch (error) {
            console.error('Error fetching web developer data:', error);
        }
    };

    const getWebKeyDetails = async (email: string) => {
        try {
            const candidatesRef = collection(devDb, 'keys');
            const q = query(candidatesRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const candidateData = querySnapshot.docs[0].data() as Candidate;
                console.log('Keys Data : ', candidateData);
                setKeysData(candidateData);
            } else {
            console.warn('No web dev data found for this email:', email);
            }
        } catch (error) {
            console.error('Error fetching web developer data:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openPMModal = () => {
        setIsPMModalOpen(true);
    };

    const closePMModal = () => {
        setIsPMModalOpen(false);
    };

    const closeDevOpsModal = () => {
        setIsDevOpsModalOpen(false);
    };

    const closeHRModal = () => {
        setIsHRModalOpen(false);
    };

    const formatSalary = (salary: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(parseInt(salary));
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp?.seconds) return 'N/A';
        return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDownloadReport = () => {
        if (!candidate) return;

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Candidate Report", 20, 20);

        doc.setFontSize(12);
        const data = candidate.candidate?.candidate;

        let y = 40;

        const fields = [
            { label: "Name", value: data?.name },
            { label: "Email", value: candidate.email },
            { label: "Position", value: data?.position },
            { label: "Applying Position", value: data?.applying_position || "N/A" },
            { label: "Age", value: data?.age },
            { label: "Gender", value: data?.gender },
            { label: "Experience", value: data?.experience },
            { label: "Leadership", value: data?.leadership_experience },
            { label: "English Proficiency", value: data?.english_proficiency },
            { label: "Salary Expectation", value: data?.salary_expectation },
            { label: "Category", value: candidate.category },
        ];

        fields.forEach((field) => {
            doc.text(`${field.label}: ${field.value ?? "N/A"}`, 20, y);
            y += 10;
        });

        doc.save(`${data?.name ?? "candidate"}_report.pdf`);
    };

  return (
    <div className="p-6 mx-auto max-w-7xl">      
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Candidate</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">Basic candidate information and contact details</p>
                    <button 
                        onClick={openModal}
                        className="flex items-center justify-center w-full h-20 transition-all duration-200 rounded-md bg-gray-50 hover:bg-gray-100 hover:shadow-md"
                    >
                    <span className="text-gray-400 hover:text-gray-600">
                        {candidate ? 'View Profile' : 'Loading...'}
                    </span>
                    </button>
                </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-blue-800">Web Skills</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">Frontend and backend development capabilities</p>
                    <button
                        onClick={() => setWebModalOpen(true)}  
                        className="flex items-center justify-center w-full h-20 transition-all duration-200 rounded-md bg-blue-50 hover:bg-blue-100 hover:shadow-md">
                        <span className="text-blue-400 hover:text-blue-600">Skills assessment</span>
                    </button>
                </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-green-800">PM Skills</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">Project management and leadership abilities</p>
                    <button
                        onClick={openPMModal}
                        className="flex items-center justify-center w-full h-20 transition-all duration-200 rounded-md bg-green-50 hover:bg-green-100 hover:shadow-md">
                        <span className="text-green-400 hover:text-green-600">Management evaluation</span>
                    </button>
                </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-purple-800">DevOps Skills</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">Infrastructure and deployment expertise</p>
                    <button 
                        onClick={() => setIsDevOpsModalOpen(true)}
                        className="flex items-center justify-center w-full h-20 transition-all duration-200 rounded-md bg-purple-50 hover:bg-purple-100 hover:shadow-md">
                        <span className="text-purple-400 hover:text-purple-600">Technical assessment</span>
                    </button>
                </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-orange-800">HR Analysis</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">Comprehensive candidate evaluation</p>
                    <button
                        onClick={() => setIsHRModalOpen(true)} 
                        className="flex items-center justify-center w-full h-20 transition-all duration-200 rounded-md bg-orange-50 hover:bg-orange-100 hover:shadow-md">
                        <span className="text-orange-400 hover:text-orange-600">Analysis results</span>
                    </button>
                </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-red-800">Stage 03</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">Current recruitment stage status</p>
                    <button
                        onClick={() => setStageModalOpen(true)}  
                        className="flex items-center justify-center w-full h-20 transition-all duration-200 rounded-md bg-red-50 hover:bg-red-100 hover:shadow-md">
                        <span className="text-red-400 hover:text-red-600">Stage details</span>
                    </button>
                </div>
            </div>
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center mt-10 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-800">Candidate Profile</h3>
                <button
                    onClick={closeModal}
                    className="text-gray-400 transition-colors hover:text-gray-600"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
                
                <div className="p-6">
                {candidate && candidate.candidate?.candidate ? (
                    <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="p-4 rounded-lg bg-gray-50">
                        <h4 className="mb-2 font-semibold text-gray-700">Personal Information</h4>
                        <div className="space-y-2">
                            <p><span className="font-medium">Name:</span> {candidate.candidate.candidate.name}</p>
                            <p><span className="font-medium">Age:</span> {candidate.candidate.candidate.age} years</p>
                            <p><span className="font-medium">Gender:</span> {candidate.candidate.candidate.gender}</p>
                            <p><span className="font-medium">Email:</span> {candidate.email}</p>
                        </div>
                        </div>

                        <div className="p-4 rounded-lg bg-blue-50">
                        <h4 className="mb-2 font-semibold text-blue-700">Professional Details</h4>
                        <div className="space-y-2">
                            <p><span className="font-medium">Position:</span> {candidate.candidate.candidate.position}</p>
                            <p><span className="font-medium">Experience:</span> {candidate.candidate.candidate.experience}</p>
                            <p><span className="font-medium">Leadership:</span> {candidate.candidate.candidate.leadership_experience}</p>
                            <p><span className="font-medium">English:</span> {candidate.candidate.candidate.english_proficiency}</p>
                        </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="p-4 rounded-lg bg-green-50">
                        <h4 className="mb-2 font-semibold text-green-700">Compensation</h4>
                        <p><span className="font-medium">Salary Expectation:</span> {formatSalary(candidate.candidate.candidate.salary_expectation)}</p>
                        </div>

                        <div className="p-4 rounded-lg bg-purple-50">
                        <h4 className="mb-2 font-semibold text-purple-700">Application Details</h4>
                        <div className="space-y-2">
                            <p><span className="font-medium">Category:</span> {candidate.category || 'N/A'}</p>
                            <p><span className="font-medium">Applied Date:</span> {formatDate(candidate.createdAt)}</p>
                            {candidate.candidate.candidate.applying_position && (
                            <p><span className="font-medium">Applying Position:</span> {candidate.candidate.candidate.applying_position}</p>
                            )}
                        </div>
                        </div>
                    </div>
                    </div>
                ) : (
                    <div className="py-8 text-center">
                    <p className="text-gray-500">No candidate data available</p>
                    </div>
                )}
                </div>

                <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                        onClick={handleDownloadReport}
                    >
                        📄 Download Report
                    </button>
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600"
                    >
                        ❌ Close
                    </button>
                </div>

            </div>
            </div>
        )}

        {isPMModalOpen && (
            <PMModal
                isOpen={isPMModalOpen}
                pmData={pmData}
                closeModal={closePMModal}
                formatDate={formatDate}
            />
        )}

        {isDevOpsModalOpen && (
            <DevOpsAssessmentModal
                isOpen={isDevOpsModalOpen}
                onClose={closeDevOpsModal}
                devOpsData={devOpsData}
                formatDate={formatDate}
            />
        )}

        {isHRModalOpen && (
            <HRAssessmentModal
                isOpen={isHRModalOpen}
                onClose={closeHRModal}
                hrData={hrData}
                formatDate={formatDate}
            />
        )}

        {isStageModalOpen && (
            <TimeDataModal
                isOpen={isStageModalOpen}
                onClose={() => setStageModalOpen(false)}
                timeData={timeData}
            />
        )}

        {isWebModalOpen && (
            <WebDataModal
                isOpen={isWebModalOpen}
                onClose={() => setWebModalOpen(false)}
                codesData={codesData}
                methodsData={methodsData}
                keysData={keysData}
            />
        )}
    </div>
  );
}