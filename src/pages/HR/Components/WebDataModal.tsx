import React from 'react';

interface TimestampData {
  seconds: number;
  nanoseconds: number;
}

interface CodesData {
  timestamp: TimestampData;
  correct: number;
  total: number;
  email: string;
}

interface MethodsData {
  timestamp: TimestampData;
  email: string;
  correct: number;
  total: number;
}

interface KeysData {
  correct: number;
  total: number;
  timestamp: TimestampData;
  email: string;
}

interface WebDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  codesData: CodesData | null;
  methodsData: MethodsData | null;
  keysData: KeysData | null;
}

const WebDataModal: React.FC<WebDataModalProps> = ({ 
  isOpen, 
  onClose, 
  codesData, 
  methodsData, 
  keysData 
}) => {
  if (!isOpen) return null;

  // Calculate percentage
  const calculatePercentage = (correct: number, total: number) => {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  // Get color based on percentage
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-50 border-green-200';
    if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 px-6 py-4 text-white bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Web Development Assessment Results</h2>
            <button
              onClick={onClose}
              className="text-white transition-colors hover:text-gray-200"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="flex items-center text-lg font-semibold text-gray-800">
                <div className="w-3 h-3 mr-2 bg-blue-500 rounded-full"></div>
                Codes Assessment
              </h3>
              
              {codesData ? (
                <div className="space-y-3">
                  <div className={`rounded-lg p-4 border ${getBgColor(calculatePercentage(codesData.correct, codesData.total))}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Score</span>
                      <span className={`text-2xl font-bold ${getScoreColor(calculatePercentage(codesData.correct, codesData.total))}`}>
                        {calculatePercentage(codesData.correct, codesData.total)}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {codesData.correct} out of {codesData.total} correct
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
                  No data available
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center text-lg font-semibold text-gray-800">
                <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
                Methods Assessment
              </h3>
              
              {methodsData ? (
                <div className="space-y-3">
                  <div className={`rounded-lg p-4 border ${getBgColor(calculatePercentage(methodsData.correct, methodsData.total))}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Score</span>
                      <span className={`text-2xl font-bold ${getScoreColor(calculatePercentage(methodsData.correct, methodsData.total))}`}>
                        {calculatePercentage(methodsData.correct, methodsData.total)}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {methodsData.correct} out of {methodsData.total} correct
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
                  No data available
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center text-lg font-semibold text-gray-800">
                <div className="w-3 h-3 mr-2 bg-purple-500 rounded-full"></div>
                Keys Assessment
              </h3>
              
              {keysData ? (
                <div className="space-y-3">
                  <div className={`rounded-lg p-4 border ${getBgColor(calculatePercentage(keysData.correct, keysData.total))}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Score</span>
                      <span className={`text-2xl font-bold ${getScoreColor(calculatePercentage(keysData.correct, keysData.total))}`}>
                        {calculatePercentage(keysData.correct, keysData.total)}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {keysData.correct} out of {keysData.total} correct
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
                  No data available
                </div>
              )}
            </div>
          </div>

          {(codesData || methodsData || keysData) && (
            <div className="pt-6 border-t">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Overall Summary</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <div className="text-sm font-medium text-blue-800">Total Assessments</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {[codesData, methodsData, keysData].filter(Boolean).length}
                  </div>
                </div>
                
                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <div className="text-sm font-medium text-green-800">Average Score</div>
                  <div className="text-2xl font-bold text-green-600">
                    {(() => {
                      const validData = [codesData, methodsData, keysData].filter(Boolean);
                      if (validData.length === 0) return '0%';
                      const totalPercentage = validData.reduce((sum, data) => 
                        sum + calculatePercentage(data!.correct, data!.total), 0
                      );
                      return Math.round(totalPercentage / validData.length) + '%';
                    })()}
                  </div>
                </div>
                
                <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <div className="text-sm font-medium text-purple-800">Total Questions</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {(codesData?.total || 0) + (methodsData?.total || 0) + 1}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex justify-end px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebDataModal;