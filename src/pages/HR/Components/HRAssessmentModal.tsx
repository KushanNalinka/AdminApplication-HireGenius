import React from 'react';

interface HRResult {
  category: string;
  answer: string;
  score: number;
  Qid: number;
}

interface HRData {
  result: HRResult[];
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  email: string;
}

interface HRAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  hrData: HRData | null;
  formatDate: (createdAt: { seconds: number; nanoseconds: number }) => string;
}

const HRAssessmentModal: React.FC<HRAssessmentModalProps> = ({
  isOpen,
  onClose,
  hrData,
  formatDate
}) => {
  if (!isOpen) return null;

  // Calculate total score and average
  const totalScore = hrData?.result.reduce((sum, item) => sum + item.score, 0) || 0;
  const averageScore = hrData?.result.length ? (totalScore / hrData.result.length) : 0;
  const maxPossibleScore = hrData?.result.length ? hrData.result.length * 4 : 4; // Max score per question is 4
  const percentageScore = (totalScore / maxPossibleScore) * 100;

  // Group results by category
  const groupedResults = hrData?.result.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, HRResult[]>) || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center mt-10 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-purple-800">HR Analysis Results</h3>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {hrData ? (
            <div className="space-y-6">
              <div className="p-6 border border-purple-200 rounded-lg bg-purple-50">
                <h4 className="mb-4 text-xl font-semibold text-purple-800">Overall Assessment</h4>
                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {totalScore}/{maxPossibleScore}
                    </div>
                    <div className="text-sm text-purple-700">Total Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {Math.round(percentageScore)}%
                    </div>
                    <div className="text-sm text-purple-700">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {averageScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-purple-700">Average Score</div>
                  </div>
                </div>
                
                <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
                  <div 
                    className="h-4 transition-all duration-500 bg-purple-500 rounded-full"
                    style={{ width: `${percentageScore}%` }}
                  ></div>
                </div>

                <div className="text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    percentageScore >= 80 ? 'bg-green-100 text-green-800' : 
                    percentageScore >= 60 ? 'bg-blue-100 text-blue-800' : 
                    percentageScore >= 40 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {percentageScore >= 80 ? 'Excellent Performance' : 
                     percentageScore >= 60 ? 'Good Performance' : 
                     percentageScore >= 40 ? 'Average Performance' : 'Needs Improvement'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-indigo-50">
                  <h4 className="mb-2 font-semibold text-indigo-700">Assessment Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Email:</span> {hrData.email}</p>
                    <p><span className="font-medium">Assessment Date:</span> {formatDate(hrData.createdAt)}</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-pink-50">
                  <h4 className="mb-2 font-semibold text-pink-700">Performance Summary</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Highest Score:</span>
                      <span className="font-bold text-green-600">{Math.max(...hrData.result.map(r => r.score))}/4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Lowest Score:</span>
                      <span className="font-bold text-red-600">{Math.min(...hrData.result.map(r => r.score))}/4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Average:</span>
                      <span className="font-bold text-blue-600">{averageScore.toFixed(1)}/4</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Detailed Analysis by Category</h4>
                {Object.entries(groupedResults).map(([category, results]) => {
                  const categoryTotal = results.reduce((sum, item) => sum + item.score, 0);
                  const categoryAverage = categoryTotal / results.length;
                  const categoryPercentage = (categoryAverage / 4) * 100;

                  return (
                    <div key={category} className="border border-gray-200 rounded-lg bg-gray-50">
                      <div className="p-4 bg-white border-b border-gray-200 rounded-t-lg">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-gray-800">{category}</h5>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">
                              {results.length} question{results.length > 1 ? 's' : ''}
                            </span>
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              categoryPercentage >= 80 ? 'bg-green-100 text-green-800' : 
                              categoryPercentage >= 60 ? 'bg-blue-100 text-blue-800' : 
                              categoryPercentage >= 40 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {categoryAverage.toFixed(1)}/4
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        {results.map((result, index) => (
                          <div key={result.Qid} className="p-3 bg-white border border-gray-100 rounded">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs text-gray-500">Question {result.Qid}</span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                result.score >= 3.2 ? 'bg-green-100 text-green-800' : 
                                result.score >= 2.4 ? 'bg-blue-100 text-blue-800' : 
                                result.score >= 1.6 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {result.score}/4
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{result.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="mb-2 font-semibold text-gray-700">HR Recommendations</h4>
                <div className="space-y-2 text-gray-600">
                  {percentageScore >= 80 && (
                    <p>✅ Excellent HR assessment results. Candidate demonstrates strong behavioral competencies and cultural fit.</p>
                  )}
                  {percentageScore >= 60 && percentageScore < 80 && (
                    <p>✅ Good HR assessment performance. Candidate shows solid behavioral traits with room for development in some areas.</p>
                  )}
                  {percentageScore >= 40 && percentageScore < 60 && (
                    <p>⚠️ Average performance. Consider additional interviews or behavioral assessments to better understand candidate fit.</p>
                  )}
                  {percentageScore < 40 && (
                    <p>❌ Below average performance. Recommend further evaluation or consideration of alternative candidates.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">No HR assessment data available</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HRAssessmentModal;