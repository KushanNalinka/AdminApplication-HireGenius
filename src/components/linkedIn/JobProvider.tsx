import { createContext, useContext, useState } from "react";

//@ts-ignore
const JobContext = createContext();

export const useJob = () => useContext(JobContext);

export const JobProvider = ({ children }: any) => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <JobContext.Provider value={{ selectedJob, setSelectedJob }}>
      {children}
    </JobContext.Provider>
  );
};
