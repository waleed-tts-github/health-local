import React, { useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';

const WorkWithAngill = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Mock doctor profile data
  const doctorProfile = {
    name: 'Dr. Ahmed Hassan',
    specialty: 'Cardiologist',
    workingWithAngill: false // Set to false to show the request option
  };

  const handleRequest = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Hide popup after 3 seconds
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Work with Angill</h1>
          <p className="text-sm text-gray-600">Learn about partnering with Angill for online consultations</p>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Angill Partnership</h2>
              <p className="text-sm text-gray-600">{doctorProfile.name}, {doctorProfile.specialty}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              By partnering with Angill, you can offer online consultations to a wider patient base through our platform. 
              As an Angill doctor, you will work on a fixed rate for all consultations, ensuring consistent earnings and 
              simplified billing. This partnership allows you to focus on patient care while we handle scheduling and 
              platform integration.
            </p>
            <p className="text-gray-600">
              Benefits include:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Access to a large network of patients seeking online consultations</li>
              <li>Streamlined scheduling integrated with your existing calendar</li>
              <li>Fixed-rate compensation for predictable earnings</li>
              <li>Support from our dedicated team for technical and administrative needs</li>
            </ul>

            {!doctorProfile.workingWithAngill && (
              <div className="pt-4">
                <button
                  onClick={handleRequest}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Request to Work with Angill
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Popup Message */}
        {showPopup && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white rounded-lg p-4 shadow-lg flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Request Sent</span>
          </div>
        )}
      </div>

      {/* CSS for Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WorkWithAngill;