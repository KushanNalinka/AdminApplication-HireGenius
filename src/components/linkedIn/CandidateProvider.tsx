// import React, { createContext, useContext, useState } from "react";

// const CandidateContext = createContext();

// export const useCandidate = () => useContext(CandidateContext);

// export const CandidateProvider = ({ children }) => {
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   return (
//     <CandidateContext.Provider
//       value={{ selectedCandidate, setSelectedCandidate }}
//     >
//       {children}
//     </CandidateContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define context type
interface CandidateContextType {
  selectedCandidate: any;
  setSelectedCandidate: React.Dispatch<React.SetStateAction<any>>;
}

// Create context
const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

// Hook to use context
export const useCandidate = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error("useCandidate must be used within a CandidateProvider");
  }
  return context;
};

// Props type
interface CandidateProviderProps {
  children: ReactNode;
}

// Provider component
export const CandidateProvider: React.FC<CandidateProviderProps> = ({ children }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  return (
    <CandidateContext.Provider value={{ selectedCandidate, setSelectedCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};
