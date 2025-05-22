import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for a candidate (customize based on actual candidate structure)
interface Candidate {
  id: string;
  name: string;
  // Add other candidate fields as needed
}

// Define the context type
interface CandidateContextType {
  selectedCandidate: Candidate | null;
  setSelectedCandidate: (candidate: Candidate | null) => void;
}

// Create the context with a default undefined value
const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

// Custom hook to use the context
export const useCandidate = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error("useCandidate must be used within a CandidateProvider");
  }
  return context;
};

// Define props for the provider
interface CandidateProviderProps {
  children: ReactNode;
}

// Provider component
export const CandidateProvider: React.FC<CandidateProviderProps> = ({ children }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  return (
    <CandidateContext.Provider value={{ selectedCandidate, setSelectedCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};
