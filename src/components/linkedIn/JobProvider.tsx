// import React, { createContext, useContext, useState } from 'react';

// const JobContext = createContext();

// export const useJob = () => useContext(JobContext);

// export const JobProvider = ({ children }) => {
//     const [selectedJob, setSelectedJob] = useState(null);

//     return (
//         <JobContext.Provider value={{ selectedJob, setSelectedJob }}>
//             {children}
//         </JobContext.Provider>
//     );
// };

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define context type
interface JobContextType {
  selectedJob: any;
  setSelectedJob: React.Dispatch<React.SetStateAction<any>>;
}

// Create context with type
const JobContext = createContext<JobContextType | undefined>(undefined);

// Custom hook to use the context
export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJob must be used within a JobProvider");
  }
  return context;
};

// Props type for provider
interface JobProviderProps {
  children: ReactNode;
}

// JobProvider component
export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  return (
    <JobContext.Provider value={{ selectedJob, setSelectedJob }}>
      {children}
    </JobContext.Provider>
  );
};
