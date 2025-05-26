import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL as string;

const TranscriptPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const location = useLocation();
  const selectedCandidate = location.state.candidate;
  const jobId = location.state.jobId;

  useEffect(() => {
    const fetchPredictedPercentage = async () => {
      try {
        console.log("Fetching job id...", jobId);
        const response = await axios.get(`${API_URL}/jobs/${jobId}`);
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //@ts-ignore
    accept: "application/pdf",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const navigateTo = useNavigate();

  if (!selectedJob) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const jobRole = selectedJob.jobTitle;
    if (!file || !jobRole) {
      toast.error("Please select a file and a job role.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_role", jobRole);

    try {
      const response = await axios.post(
        `${API_URL}/candidates/getCandidateTranscriptScore`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          validateStatus: (status) => status < 500,
        }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      setScore(response.data.score);
    } catch (error) {
      console.error("Error uploading file", error);
      toast.error("Failed to process the file.");
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
        `${API_URL}/candidates/${candidateId}/transcript`,
        { transcriptMark: parseInt(score.toString()) },
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
      {/* Header Stats */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-purple-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-700/50">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">5</div>
                <div className="text-purple-300 text-sm">Total Candidates</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">0</div>
                <div className="text-purple-300 text-sm">Analyzed</div>
              </div>
            </div>
            <div className="text-purple-300 text-sm">Page 1 of 1</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-purple-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-700/50">
          {/* Candidate Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {selectedCandidate?.name?.charAt(0) || "T"}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Transcript Analysis
                </h2>
                <p className="text-purple-300">{selectedJob.jobTitle}</p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Drag-and-Drop File Upload */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-3">
                    Upload PDF Transcript
                  </label>
                  <div
                    {...getRootProps()}
                    className={`relative p-8 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                      isDragActive
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-purple-500/50 bg-purple-700/20 hover:border-purple-400"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="text-center">
                      {file ? (
                        <div className="space-y-2">
                          <div className="text-green-400 text-4xl">📄</div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-purple-300 text-sm">
                            Ready to upload
                          </p>
                        </div>
                      ) : isDragActive ? (
                        <div className="space-y-2">
                          <div className="text-cyan-400 text-4xl">⬇️</div>
                          <p className="text-cyan-400 font-medium">
                            Drop the file here...
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-purple-400 text-4xl">📎</div>
                          <p className="text-white font-medium">
                            Drag and drop a PDF file here
                          </p>
                          <p className="text-purple-300 text-sm">
                            or click to select a file
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Job Role Display */}
                <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-600/30">
                  <label className="block text-purple-300 text-sm font-medium mb-1">
                    Selected Job Role
                  </label>
                  <p className="text-white font-semibold">
                    {selectedJob.jobTitle}
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "📊 Upload and Calculate"
                  )}
                </button>
              </form>
            </div>

            {/* Score Display and Actions */}
            <div className="space-y-6">
              {score !== null && (
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                  <div className="text-center space-y-3">
                    <div className="text-green-400 text-5xl">🎯</div>
                    <h3 className="text-2xl font-bold text-white">
                      Final Score
                    </h3>
                    <div className="text-4xl font-bold text-green-400">
                      {score}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={saveResultsToDB}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <span>✅</span>
                  <span>Save Results to DB</span>
                </button>

                <button
                  onClick={() => navigateTo("/")}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <span>🏠</span>
                  <span>Go to Home</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-purple-800 text-white"
      />
    </div>
  );
};

export default TranscriptPage;
