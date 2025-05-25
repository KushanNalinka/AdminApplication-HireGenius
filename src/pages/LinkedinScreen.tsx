import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import LinkedInDataCard from "../components/linkedIn/LinkedinDataCard";

const LinkedInPage: React.FC = () => {
  const [score, setScore] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigateTo = useNavigate();

  const [selectedJob, setSelectedJob] = useState<any>(null);

  const location = useLocation();
  const selectedCandidate = location.state.candidate;
  const jobId = location.state.jobId;

  const [profileUrl, setProfileUrl] = useState<string>(
    selectedCandidate?.linkedIn || ""
  );

  useEffect(() => {
    const fetchPredictedPercentage = async () => {
      try {
        console.log("Fetching job id...", jobId);
        const response = await axios.get(`http://localhost:5000/jobs/${jobId}`);
        console.log(response.data);
        setSelectedJob(response.data);
      } catch (err) {
        // setError("Failed to fetch candidate data.");
      } finally {
        //   setLoading(false);
      }
    };

    fetchPredictedPercentage();
  }, []);

  if (!selectedJob) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white text-lg">
        Loading...
      </div>
    );
  }

  const handleSubmit = async () => {
    setLoading(true);
    const username = profileUrl
      .replace("https://www.linkedin.com/in/", "")
      .replace("/", "");

    const jobData = {
      jobRole: selectedJob.jobTitle,
      job_description: selectedJob.jobDescription,
      experienceYears: parseInt(selectedJob.experienceYears),
      education: selectedJob.requiredQualifications,
      skills: selectedJob.requiredSkills.filter(
        (skill: string) => skill.trim() !== ""
      ),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/candidates/getCandidateLinkedinScore",
        {
          username: username,
          job_data: jobData,
        }
      );

      setScore(parseFloat(response.data.candidate_score).toFixed(2));
      setProfile(response.data.linkedin_profile);
      toast.success("Score calculated successfully!");
    } catch (error) {
      console.error("Error fetching candidate score:", error);
      toast.error("Error calculating score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveResultsToDB = async () => {
    if (!selectedCandidate?._id || !score) {
      toast.error("Candidate ID or score not available!");
      return;
    }

    const candidateId = selectedCandidate._id;

    try {
      const response = await axios.put(
        `http://127.0.0.1:5001/api/candidates/${candidateId}/linkedin`,
        { linkedinMark: parseInt(score) },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Marks successfully saved to DB!");
      } else {
        toast.error("Failed to save marks.");
      }
    } catch (error) {
      console.error("Error saving marks:", error);
      toast.error("Error occurred while saving.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex flex-col items-center p-8">
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 shadow-2xl rounded-2xl p-8 w-full border border-purple-700/30">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          LinkedIn Profile Analysis
        </h2>

        <div className="min-w-xl max-w-2xl mb-6">
          <label className="block text-lg font-semibold text-purple-100 mb-2">
            Selected Profile:
          </label>
          <input
            type="text"
            placeholder="Enter LinkedIn Profile URL"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            className="w-full p-3 border border-purple-600/50 rounded-lg shadow-sm bg-purple-800/30 text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
          />
        </div>

        {/* Job Details Section */}
        {selectedJob && (
          <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 p-6 rounded-lg shadow-md border border-purple-600/30">
            <h3 className="text-2xl font-bold text-white mb-3">
              Expected Job Details - (Recruiter Section)
            </h3>
            <p className="text-lg font-semibold text-purple-100">
              {selectedJob.jobRole}
            </p>
            <p className="text-sm text-purple-200 italic mb-4">
              {selectedJob.jobDescription}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <p className="font-semibold text-purple-100">
                Experience Required:
                <span className="text-white ml-2">
                  {selectedJob.experienceYears} years
                </span>
              </p>
              <p className="font-semibold text-purple-100">
                Education:
                <span className="text-white ml-2">
                  {selectedJob.requiredQualifications}
                </span>
              </p>
            </div>

            {/* Skills List */}
            <div className="mt-4">
              <h4 className="font-semibold text-purple-100 mb-2">
                Skills Required:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.requiredSkills.map((skill: any, index: any) => (
                  <span
                    key={index}
                    className="bg-purple-600/50 text-purple-100 px-3 py-1 rounded-md text-sm font-medium border border-purple-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Calculate Marks Button */}
        <button
          id="submitbutton"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 mt-10 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-900 transition-all duration-200 shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </div>
          ) : (
            "Calculate Marks"
          )}
        </button>

        {/* Display Score */}
        {score !== null && (
          <>
            <br />
            <br />
            <LinkedInDataCard profileData={profile} />

            <div className="mt-6 p-4 bg-gradient-to-r from-green-600/80 to-emerald-600/80 shadow-md rounded-lg text-xl font-semibold text-white text-center border border-green-500/30">
              Candidate Score: {score}
            </div>
          </>
        )}
      </div>

      <ToastContainer position="bottom-right" autoClose={5000} />
      <div className="mt-10">
        <button
          className="px-6 py-3 mr-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-200"
          onClick={saveResultsToDB}
        >
          Save Results to DB
        </button>
        <button
          className="px-6 py-3 bg-gradient-to-r from-slate-600 to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:from-slate-700 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-all duration-200"
          onClick={() => navigateTo("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default LinkedInPage;
