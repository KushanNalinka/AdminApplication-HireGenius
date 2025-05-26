import React from 'react';

interface DevOpsData {
  email: string;
  score: number;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  time: number;
}

interface DevOpsAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  devOpsData: DevOpsData | null;
  formatDate: (createdAt: { seconds: number; nanoseconds: number }) => string;
}

const DevOpsAssessmentModal: React.FC<DevOpsAssessmentModalProps> = ({
  isOpen,
  onClose,
  devOpsData,
  formatDate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center mt-10 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-blue-800">DevOps Technical Assessment</h3>
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
          {devOpsData ? (
            <div className="space-y-6">
              <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
                <h4 className="mb-4 text-xl font-semibold text-blue-800">Assessment Score</h4>
                <div className="flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="mb-2 text-4xl font-bold text-blue-600">
                      {devOpsData.score}/100
                    </div>
                    <div className="mb-1 text-2xl font-semibold text-blue-700">
                      {Math.round(devOpsData.score)}%
                    </div>
                    <div className="text-lg text-blue-700">
                      {devOpsData.score >= 80 ? 'Excellent' : 
                       devOpsData.score >= 60 ? 'Good' : 
                       devOpsData.score >= 40 ? 'Average' : 'Needs Improvement'}
                    </div>
                  </div>
                </div>
                
                <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
                  <div 
                    className="h-4 transition-all duration-500 bg-blue-500 rounded-full"
                    style={{ width: `${devOpsData.score}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-indigo-50">
                  <h4 className="mb-2 font-semibold text-indigo-700">Assessment Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Email:</span> {devOpsData.email}</p>
                    <p><span className="font-medium">Assessment Date:</span> {formatDate(devOpsData.createdAt)}</p>
                    <p><span className="font-medium">Timestamp:</span> {new Date(devOpsData.time).toLocaleString()}</p>
                    <p><span className="font-medium">Raw Score:</span> {devOpsData.score} out of 100 points</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-cyan-50">
                  <h4 className="mb-2 font-semibold text-cyan-700">Technical Performance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-medium">Score Range:</span>
                      <span className="px-2 py-1 ml-2 text-sm bg-white rounded">
                        {devOpsData.score >= 80 ? '80-100 pts (80-100%)' : 
                         devOpsData.score >= 60 ? '60-79 pts (60-79%)' : 
                         devOpsData.score >= 40 ? '40-59 pts (40-59%)' : '0-39 pts (0-39%)'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-sm ${
                        devOpsData.score >= 60 ? 'bg-green-100 text-green-800' : 
                        devOpsData.score >= 40 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {devOpsData.score >= 60 ? 'Technically Qualified' : 
                         devOpsData.score >= 40 ? 'Review Required' : 'Not Qualified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="mb-2 font-semibold text-gray-700">Technical Recommendations</h4>
                <div className="space-y-2 text-gray-600">
                  {devOpsData.score >= 80 && (
                    <p>✅ Excellent DevOps technical skills demonstrated. Candidate is ready for senior DevOps/SRE roles with complex infrastructure responsibilities.</p>
                  )}
                  {devOpsData.score >= 60 && devOpsData.score < 80 && (
                    <p>✅ Good technical foundation in DevOps practices. Suitable for mid-level positions with some mentoring on advanced topics.</p>
                  )}
                  {devOpsData.score >= 40 && devOpsData.score < 60 && (
                    <p>⚠️ Average technical skills. Recommend additional training in CI/CD, containerization, or cloud platforms before DevOps responsibilities.</p>
                  )}
                  {devOpsData.score < 40 && (
                    <p>❌ Technical skills need significant improvement. Consider entry-level support roles or comprehensive DevOps training program.</p>
                  )}
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                <h4 className="mb-2 font-semibold text-slate-700">Key Technical Areas</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                  <div>• CI/CD Pipelines</div>
                  <div>• Container Orchestration</div>
                  <div>• Infrastructure as Code</div>
                  <div>• Monitoring & Logging</div>
                  <div>• Cloud Platforms</div>
                  <div>• Security Practices</div>
                  <div>• Automation Tools</div>
                  <div>• System Architecture</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">No DevOps assessment data available</p>
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

export default DevOpsAssessmentModal;