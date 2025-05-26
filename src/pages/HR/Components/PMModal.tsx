import React from 'react';

type Props = {
  isOpen: boolean;
  pmData: any;
  closeModal: () => void;
  formatDate: (timestamp: any) => string;
};

const PMModal: React.FC<Props> = ({ isOpen, pmData, closeModal, formatDate }) => {
  if (!isOpen) return null;

  const getPerformanceLabel = (percentage: number) => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Average';
    return 'Needs Improvement';
  };

  const getPerformanceStatus = (percentage: number) => {
    if (percentage >= 60) return 'Qualified';
    if (percentage >= 40) return 'Review Required';
    return 'Not Qualified';
  };

  const getStatusClasses = (percentage: number) => {
    if (percentage >= 60) return 'bg-green-100 text-green-800';
    if (percentage >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const scorePercentage = (pmData?.score / 60) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center mt-10 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-green-800">Project Management Assessment</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {pmData ? (
            <div className="space-y-6">
              <div className="p-6 border border-green-200 rounded-lg bg-green-50">
                <h4 className="mb-4 text-xl font-semibold text-green-800">Assessment Score</h4>
                <div className="flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="mb-2 text-4xl font-bold text-green-600">{pmData.score}/60</div>
                    <div className="mb-1 text-2xl font-semibold text-green-700">{Math.round(scorePercentage)}%</div>
                    <div className="text-lg text-green-700">{getPerformanceLabel(scorePercentage)}</div>
                  </div>
                </div>
                <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
                  <div 
                    className="h-4 transition-all duration-500 bg-green-500 rounded-full"
                    style={{ width: `${scorePercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-blue-50">
                  <h4 className="mb-2 font-semibold text-blue-700">Assessment Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">📧 Email:</span> {pmData.email}</p>
                    <p><span className="font-medium">📅 Assessment Date:</span> {formatDate(pmData.createdAt)}</p>
                    <p><span className="font-medium">⏱️ Timestamp:</span> {new Date(pmData.time).toLocaleString()}</p>
                    <p><span className="font-medium">📊 Raw Score:</span> {pmData.score} out of 60 points</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-purple-50">
                  <h4 className="mb-2 font-semibold text-purple-700">Performance Level</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-medium">📈 Score Range:</span>
                      <span className="px-2 py-1 ml-2 text-sm bg-white rounded">
                        {scorePercentage >= 80 ? '48-60 pts (80-100%)' :
                          scorePercentage >= 60 ? '36-47 pts (60-79%)' :
                          scorePercentage >= 40 ? '24-35 pts (40-59%)' : '0-23 pts (0-39%)'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">📌 Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-sm ${getStatusClasses(scorePercentage)}`}>
                        {getPerformanceStatus(scorePercentage)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="mb-2 font-semibold text-gray-700">📝 Recommendations</h4>
                <div className="space-y-2 text-gray-600">
                  {scorePercentage >= 80 && (
                    <p>✅ Excellent PM skills demonstrated. Candidate is well-suited for management roles.</p>
                  )}
                  {scorePercentage >= 60 && scorePercentage < 80 && (
                    <p>✅ Good PM foundation. Consider for intermediate management positions with mentoring support.</p>
                  )}
                  {scorePercentage >= 40 && scorePercentage < 60 && (
                    <p>⚠️ Average PM skills. Recommend additional training before assigning management responsibilities.</p>
                  )}
                  {scorePercentage < 40 && (
                    <p>❌ PM skills need significant improvement. Consider non-management roles or extensive training program.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">No PM assessment data available</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PMModal;