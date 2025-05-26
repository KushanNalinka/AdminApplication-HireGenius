import React from 'react';

interface TimeData {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  accuracyScore: number;
  email: string;
  totalScore: number;
  timeBonus: number;
}

interface TimeDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeData: TimeData | null;
}

const TimeDataModal: React.FC<TimeDataModalProps> = ({ isOpen, onClose, timeData }) => {
  if (!isOpen || !timeData) return null;

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md mx-4 overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="px-6 py-4 text-white bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Stage 3 Results</h2>
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

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-center justify-between">
                <span className="font-medium text-green-800">Total Score</span>
                <span className="text-2xl font-bold text-green-600">{timeData.totalScore}</span>
              </div>
            </div>

            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-center justify-between">
                <span className="font-medium text-blue-800">Accuracy Score</span>
                <span className="text-2xl font-bold text-blue-600">{timeData.accuracyScore}</span>
              </div>
            </div>

            <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
              <div className="flex items-center justify-between">
                <span className="font-medium text-purple-800">Time Bonus</span>
                <span className="text-2xl font-bold text-purple-600">+{timeData.timeBonus}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-6 py-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeDataModal;