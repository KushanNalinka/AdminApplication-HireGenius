import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ContributionChart from "../components/gitHub/ContributionChart";
import UserSummaryTable from "../components/gitHub/UserSummaryTable";
import { retrieveContributionData } from "../services/githubService";
import calculateContributionMetrics from "../components/gitHub/calculateContributionMetrics";

const FinalCandidate = () => {
  const [, setTotalContributions] = useState(0);
  const [metrics, setMetrics] = useState(null);
  const [contributionDays, setContributionDays] = useState([]);

  const location = useLocation();
  const selectedCandidate = location.state.candidate;
  const githubUsername = selectedCandidate?.github?.replace(
    "https://github.com/",
    ""
  );

  useEffect(() => {
    if (githubUsername) {
      fetchContributionData(githubUsername);
    }
  }, [githubUsername]);

  const fetchContributionData = async (username: any) => {
    const { userName, weeks } = await retrieveContributionData(username);
    const calculatedMetrics = calculateContributionMetrics(weeks, userName);
    const contributionDays = weeks.flatMap(
      (week: any) => week.contributionDays
    );

    //@ts-ignore
    setTotalContributions(calculatedMetrics.totalContributions);
    setContributionDays(contributionDays);
    //@ts-ignore
    setMetrics(calculatedMetrics);
  };

  return (
    <>
      <PageMeta
        title="Finalized Candidate"
        description="Final Matching Percentage and GitHub Insights"
      />
      <PageBreadcrumb pageTitle="Finalized Candidate" />

      {/* Main Container with Gradient Background */}
      <div className="min-h-screen bg-gradient-to-br from-[#2D1B69] via-[#6B46C1] to-[#9333EA] p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          {githubUsername && (
            <>
              {/* GitHub Analysis Section */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    GitHub Contributions Analysis
                  </h2>
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <span className="text-lg text-purple-200">
                      Contributions of
                    </span>
                    <a
                      href={selectedCandidate.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold text-white hover:text-purple-300 transition-colors duration-300 underline decoration-purple-400"
                    >
                      {githubUsername}
                    </a>
                  </div>
                </div>

                {/* Contribution Chart Container */}
                <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
                  <ContributionChart contributionDays={contributionDays} />
                </div>

                {/* Summary Section */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    GitHub Contribution Summary
                  </h3>

                  <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    {metrics ? (
                      <UserSummaryTable
                        userData={metrics}
                        selectedCandidate={selectedCandidate}
                      />
                    ) : (
                      <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent mb-4"></div>
                        <p className="text-purple-200 text-lg">
                          Loading contribution data...
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Calculate Marks Button */}
                <div className="text-center mt-8">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Calculate Marks
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FinalCandidate;
