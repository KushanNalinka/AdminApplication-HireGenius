import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import JobCreate from "./pages/JobCreate";
import CandidatesList from "./pages/CandidateList";
import JobList from "./pages/JobList";
import CandidateView from "./pages/CandidateView";
import JobView from "./pages/JobView";
import CandidateCharts from "./pages/CandidateCharts";
import SingleCandidate from "./pages/SingleCandidate";
import SingleFinalized from "./pages/SingleFinalized";

import CompletedCandidates from "./pages/CompletedCandidates";

import RankedCandidates from "./pages/RankedCandidates";
import GitHubScreen from "./pages/GitHubScreen";
import LinkedinScreen from "./pages/LinkedinScreen";
import TranscriptScreen from "./pages/TranscriptScreen";



export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            
            <Route path="/candidates/:jobId" element={<CandidatesList />} />
            <Route path="/joblist" element={<JobList />} />
            <Route path="/view" element={< CandidateView/>} />
            <Route path="/jobview" element={< JobView/>} />
            <Route path="/candidate-charts/:candidateID" element={<CandidateCharts />} />
            <Route path="/single/candidate/:id" element={<SingleCandidate />} />
            <Route path="/single/finalized/:id" element={<SingleFinalized />} />
            <Route path="/finalized/ranked/:jobId" element={<RankedCandidates />} />
            <Route path="/completed/final-ranked/:jobId" element={<CompletedCandidates />} />
            <Route path="/single/github/:id" element={<GitHubScreen />} />
            <Route path="/single/linkedin/:id" element={<LinkedinScreen/>} />
            <Route path="/single/transcript/:id" element={<TranscriptScreen />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/jobcreate" element={<JobCreate />} />
            <Route path="/cvupload" element={<JobCreate />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        
        </Routes>
      </Router>
    </>
  );
}
