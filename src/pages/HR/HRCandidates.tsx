// src/components/HRCandidates.tsx
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CandidateData = {
  name?: string;
  email?: string;
  position?: string;
  experience?: string;
  gender?: string;
  age?: string;
  applying_position?: string;
};

export default function HRCandidates() {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const usersCollection = collection(db, 'candidates');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs
      .map((docSnap) => {
        const data = docSnap.data();
        const candidate = data?.candidate?.candidate;
        if (!candidate) return null;

        return {
          id: docSnap.id,
          name: candidate.name,
          email: data.email,
          position: candidate.position || candidate.applying_position || '-',
          experience: candidate.experience,
          gender: candidate.gender,
          age: candidate.age,
        };
      })
      .filter(Boolean);

    setCandidates(usersList as CandidateData[]);
  };

  const handleDelete = async (email: string) => {
  if (!window.confirm(`Delete candidate with email: ${email}?`)) return;

  try {
    const usersRef = collection(db, 'candidates');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert('No user found with this email.');
        return;
      }

      const deletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, 'candidates', docSnap.id))
      );

      await Promise.all(deletePromises);

      setCandidates((prev) => prev.filter((c) => c.email !== email));

      console.log(`Deleted candidate(s) with email: ${email}`);
    } catch (error) {
      console.error('Error deleting candidate:', error);
      alert('Failed to delete candidate.');
    }
  };

  const sendSelectionEmail = async (candidateEmail: string, candidateName: string, position: string) => {
    try {
      const emailMessage = `Congratulations! You have been selected for the ${position} at Hire-Genius. 
        We believe your skills and experience will be a valuable addition to our team. We look forward to working with 
        you and achieving great things together. Our HR Team will contact you within 24 Hours.
      `;

      const requestBody = {
        email: candidateEmail,
        subject: `🎉 Congratulations! You've been selected for ${position}`,
        message: emailMessage
      };

      const response = await fetch('https://oop.mindcript.com/email-sender/mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(`Selection email sent successfully!`);
        setSelectedCandidates(prev => new Set(prev).add(candidateEmail));
        console.log('Email sent successfully:', result);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending selection email:', error);
      toast.error('❌ Failed to send selection email. Please try again.');
    }
  };

  const handleSelect = async (candidate: CandidateData) => {
    if (!candidate.email) {
      toast.error('Cannot send email: No email address found for this candidate.');
      return;
    }

    if (selectedCandidates.has(candidate.email)) {
      toast.error('This candidate has already been selected.');
      return;
    }

    const confirmSelection = window.confirm(
      `Send selection email to ${candidate.name || 'this candidate'} (${candidate.email})?`
    );

    if (confirmSelection) {
      await sendSelectionEmail(
        candidate.email,
        candidate.name || 'Candidate',
        candidate.position || 'the applied position'
      );
    }
  };


  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Shortlisted Candidates
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-white/90">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Experience</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Gender</th>
              <th className="text-center" colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c.email} className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-2">{c.name || '-'}</td>
                <td className="px-4 py-2">{c.email || '-'}</td>
                <td className="px-4 py-2">{c.position || '-'}</td>
                <td className="px-4 py-2">{c.experience || '-'}</td>
                <td className="px-4 py-2">{c.age || '-'}</td>
                <td className="px-4 py-2">{c.gender || '-'}</td>
                <td className="px-4 py-2">
                    <button
                        onClick={() => navigate(`/hr-candidate/${encodeURIComponent(c.email!)}`)}
                        className="font-medium text-blue-700 hover:underline"
                    >
                        View
                    </button>
                </td>
                <td className="px-4 py-2">
                  {c.email ? (
                    <button
                      onClick={() => handleSelect(c)}
                      disabled={selectedCandidates.has(c.email)}
                      className={`font-medium ${
                        selectedCandidates.has(c.email)
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-green-600 hover:underline'
                      }`}
                    >
                      {selectedCandidates.has(c.email) ? 'Selected' : 'Select'}
                    </button>
                  ) : (
                    <span className="italic text-gray-400">No email</span>
                  )}
                </td>
                <td className="px-4 py-2">
                    {c.email ? (
                        <button
                            onClick={() => handleDelete(c.email!)}
                            className="font-medium text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                        ) : (
                            <span className="italic text-gray-400">No email</span>
                    )}
                </td>
              </tr>
            ))}
            
            {candidates.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
