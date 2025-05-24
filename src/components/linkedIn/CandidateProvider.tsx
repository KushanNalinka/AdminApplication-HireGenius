import { createContext, useContext, useState } from "react";

//@ts-ignore
const CandidateContext = createContext();

export const useCandidate = () => useContext(CandidateContext);

export const CandidateProvider = ({ children }: any) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  return (
    <CandidateContext.Provider
      value={{ selectedCandidate, setSelectedCandidate }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
