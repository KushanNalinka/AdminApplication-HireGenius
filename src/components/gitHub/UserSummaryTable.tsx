import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL as string;

const UserSummaryTable = ({ userData, selectedCandidate }: any) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(null);

  const navigateTo = useNavigate();

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setApiResponse(null);

    const apiUrl = `${API_URL}/candidates/getCandidateGithubScore`;
    const requestBody = {
      //@ts-ignore
      marks: ref.current.value,
      features: [
        userData.totalCommits,
        userData.maxStreak,
        userData.commitFrequency,
        userData.commitConsistency,
        userData.averageWeeklyCommits,
        userData.activeDays,
        userData.daysWithoutCommits,
      ],
    };

    console.log("Request body", requestBody);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      setApiResponse(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveResultsToDB = async () => {
    //@ts-ignore
    if (!selectedCandidate?._id || !apiResponse?.marks) {
      toast.error("Candidate ID or marks not available!");
      return;
    }

    const candidateId = selectedCandidate._id;

    try {
      const response = await axios.put(
        `${API_URL}/api/candidates/${candidateId}/github`,
        //@ts-ignore
        { githubMark: apiResponse.marks },
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
    <div
      style={{
        maxWidth: "90%",
        margin: "20px auto",
        padding: "24px",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        overflowX: "auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          marginBottom: "24px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        User Summary and Prediction
      </h2>

      <div style={{ overflowX: "auto", marginBottom: "24px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <thead>
            <tr style={{ background: "rgba(139, 69, 193, 0.6)" }}>
              <th
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                User Name
              </th>
              <th
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Total Commits
              </th>
              <th
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Max Streak
              </th>
              <th
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Average Weekly Commits
              </th>
              <th
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Current Streak
              </th>
              <th
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Commit Frequency
              </th>
              <th
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "16px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Commit Consistency (Strike Rate)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: "rgba(255, 255, 255, 0.05)" }}>
              <td
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                }}
              >
                {userData.userName}
              </td>
              <td
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                {userData.totalCommits}
              </td>
              <td
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                {userData.maxStreak}
              </td>
              <td
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                {userData.averageWeeklyCommits.toFixed(2)}
              </td>
              <td
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                {userData.currentStreak}
              </td>
              <td
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                {(userData.commitFrequency * 100).toFixed(2)}%
              </td>
              <td
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px 12px",
                  color: "white",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                {(userData.commitConsistency * 100).toFixed(2)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "32px",
          padding: "20px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <label
          style={{
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "500",
            display: "block",
            marginBottom: "12px",
          }}
        >
          Enter the proportion for GitHub user analyse
        </label>
        <form style={{ marginTop: "12px" }}>
          <input
            ref={ref}
            type="text"
            placeholder="Enter marks proportion"
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "1rem",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(139, 69, 193, 0.8)";
              e.target.style.boxShadow = "0 0 0 3px rgba(139, 69, 193, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.boxShadow = "none";
            }}
          />
        </form>
      </div>

      <button
        style={{
          marginTop: "24px",
          padding: "14px 28px",
          fontSize: "1rem",
          fontWeight: "600",
          background: loading
            ? "rgba(139, 69, 193, 0.5)"
            : "linear-gradient(135deg, #8B45C1 0%, #9333EA 100%)",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          borderRadius: "10px",
          boxShadow: "0 4px 16px rgba(139, 69, 193, 0.4)",
          transition: "all 0.3s ease",
          opacity: loading ? 0.7 : 1,
        }}
        onClick={handlePredict}
        disabled={loading}
        onMouseEnter={(e: any) => {
          if (!loading) {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(139, 69, 193, 0.6)";
          }
        }}
        onMouseLeave={(e: any) => {
          if (!loading) {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 16px rgba(139, 69, 193, 0.4)";
          }
        }}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {apiResponse && (
        <div
          style={{
            marginTop: "24px",
            padding: "20px",
            background:
              "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.2) 100%)",
            borderRadius: "12px",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            boxShadow: "0 4px 16px rgba(34, 197, 94, 0.2)",
          }}
        >
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "white",
              margin: "0",
              textAlign: "center",
            }}
          >
            {/*@ts-ignore*/}
            Predicted Marks: {apiResponse.marks}
          </p>
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background:
              "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)",
            color: "#FCA5A5",
            borderRadius: "12px",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            boxShadow: "0 4px 16px rgba(239, 68, 68, 0.2)",
          }}
        >
          <p style={{ fontSize: "1rem", margin: "0" }}>Error: {error}</p>
        </div>
      )}

      <div
        style={{
          marginTop: "32px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={saveResultsToDB}
          style={{
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "600",
            background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e: any) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.6)";
          }}
          onMouseLeave={(e: any) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 16px rgba(59, 130, 246, 0.4)";
          }}
        >
          Save Results to DB
        </button>

        <button
          onClick={() => navigateTo("/")}
          style={{
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "600",
            background: "linear-gradient(135deg, #64748B 0%, #475569 100%)",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "10px",
            boxShadow: "0 4px 16px rgba(100, 116, 139, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e: any) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(100, 116, 139, 0.6)";
          }}
          onMouseLeave={(e: any) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 16px rgba(100, 116, 139, 0.4)";
          }}
        >
          Go to Home
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      />
    </div>
  );
};

export default UserSummaryTable;
