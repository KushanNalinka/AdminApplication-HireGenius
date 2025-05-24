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

      <div className="p-6 bg-[#2A2438]  min-h-screen flex flex-col items-center">
        {githubUsername && (
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-bold text-[#DBD8E3] mb-4">
              GitHub Contributions Analysis
            </h2>
            <h3 className="text-lg text-[#DBD8E3]">
              Contributions of{" "}
              <a
                href={selectedCandidate.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {githubUsername}
              </a>
            </h3>
            <ContributionChart contributionDays={contributionDays} />

            <div className="mt-6">
              <h2 className="text-xl font-bold text-[#DBD8E3]">
                GitHub Contribution Summary
              </h2>
              {metrics ? (
                <UserSummaryTable
                  userData={metrics}
                  selectedCandidate={selectedCandidate}
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FinalCandidate;
