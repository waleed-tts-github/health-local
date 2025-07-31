import React, { useContext, useState } from 'react';
import { X, Heart } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';
import logo from '../../assets/Group.png'
const FeedbackModal = () => {
  const { currentModal, closeModal } = useContext(BookingContext);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [addToFavorites, setAddToFavorites] = useState(false);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleSubmit = () => {
    console.log({
      rating,
      feedback,
      addToFavorites
    });
    closeModal();
  };

  if (currentModal !== 'feedback') return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 pb-3">
            <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full">
              Feedback
            </h3>
            <button 
              onClick={closeModal} 
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main content - centered */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 space-y-4">
            {/* Heart icon */}
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <img src={logo} className="w-8 h-8" />
            </div>

            {/* Feedback description */}
            <div className="text-center w-full border border-gray-200 rounded-xl p-2">
              <h4 className="text-sm font-bold text-gray-700 bg-white/20 py-1.5 px-3 rounded-full text-center">
                Share Your Experience
              </h4>
              <p className="text-gray-600 mt-2 text-xs">
                Rate and review your doctor to help others benefit from your feedback
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <svg
                    className={`w-8 h-8 ${index < rating ? 'text-green-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Feedback Textarea */}
            <div className="w-full">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience..."
                className="w-full h-24 bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 resize-none text-xs"
                rows="4"
              />
            </div>

            {/* Add to Favorites Checkbox */}
            <div className="w-full">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={addToFavorites}
                  onChange={(e) => setAddToFavorites(e.target.checked)}
                  className="sr-only"
                />
                <div className="relative">
                  <div className={`w-4 h-4 rounded border-2 border-gray-300 ${addToFavorites ? 'bg-green-500 border-green-500' : 'bg-white'}`}>
                    {addToFavorites && (
                      <svg
                        className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="ml-2 text-xs text-gray-600">Add doctor to favorites</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-4 pb-4">
            <div className="flex gap-2">
              <button 
                onClick={closeModal}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl font-medium text-xs transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
              >
                Submit
              </button>
            </div>
          </div>

          <style jsx>{`
            /* Enhanced scrollbar styling - only for small devices */
            .h-[98vh] {
              scrollbar-width: thin;
              scrollbar-color: #10b981 #e5e7eb;
            }
            .h-[98vh]::-webkit-scrollbar {
              width: 8px;
            }
            .h-[98vh]::-webkit-scrollbar-track {
              background: #e5e7eb;
              border-radius: 4px;
            }
            .h-[98vh]::-webkit-scrollbar-thumb {
              background: #10b981;
              border-radius: 4px;
            }
            .h-[98vh]::-webkit-scrollbar-thumb:hover {
              background: #059669;
            }
            
            /* Hide scrollbar on larger screens */
            @media (min-width: 640px) {
              .h-[98vh] {
                scrollbar-width: none;
              }
              .h-[98vh]::-webkit-scrollbar {
                display: none;
              }
            }
            
            /* Pulse Animation for Loading Dots */
            .animate-pulse {
              animation: pulse 1.5s infinite;
            }
            .delay-100 {
              animation-delay: 0.1s;
            }
            .delay-200 {
              animation-delay: 0.2s;
            }
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;