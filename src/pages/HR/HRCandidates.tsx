// src/components/HRCandidates.tsx
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { useNavigate } from 'react-router-dom';

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

    // Delete all matching documents (usually just one)
    const deletePromises = snapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, 'candidates', docSnap.id))
    );

    await Promise.all(deletePromises);

    // Remove from UI
    setCandidates((prev) => prev.filter((c) => c.email !== email));

    console.log(`Deleted candidate(s) with email: ${email}`);
  } catch (error) {
    console.error('Error deleting candidate:', error);
    alert('Failed to delete candidate.');
  }
};


  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
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
              <th className="text-center" colSpan={2}>Action</th>
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
