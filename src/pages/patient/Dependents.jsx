import React from 'react';
import { User, Trash2 } from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import { useNavigate } from 'react-router-dom';

const Dependents = () => {
  const navigate = useNavigate()
    const {setCameFromManageDependents ,setCurrentStep} = useConsultationFlow();



  // Sample dependents data (replace with actual data from context or API)
  const dependents = [
    { id: 1, name: 'Karl K.', relation: 'Depends on you' },
    { id: 2, name: 'Rannie K.', relation: 'Depends on you' },
  ];

  const handleDeleteDependent = (id, name) => {
    // Confirm deletion to prevent accidental removal
    if (window.confirm(`Are you sure you want to delete ${name} from your dependents?`)) {
      // Placeholder for actual delete logic (e.g., call a context function or API)
      console.log(`Deleting dependent with id: ${id}`);
      // Example: Call a context function like handleDeleteDependent(id) if available
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-sm border border-gray-100 p-3 sm:p-4">
        <div className="flex items-center max-w-4xl mx-auto">
          <div className="flex-1 text-center">
            <h1 className="text-base sm:text-lg font-bold text-green-700">
              Manage Dependents
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              View and manage your dependents
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
              Your Dependents
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              Add or remove dependents as needed.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs sm:text-sm font-medium text-gray-700">Dependents</h3>
              <button
                onClick={() => {navigate("/patient"); setCameFromManageDependents(true);setCurrentStep(4)}}
                className="bg-green-500 hover:bg-green-500 text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
              >
                Add Dependent
              </button>
            </div>

            <div className="space-y-3">
              {dependents.length === 0 ? (
                <div className="text-center text-sm text-gray-500">
                  No dependents added yet.
                </div>
              ) : (
                dependents.map((dependent) => (
                  <div
                    key={dependent.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium text-sm sm:text-base">{dependent.name}</div>
                        <div className="text-xs text-gray-500">{dependent.relation}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteDependent(dependent.id, dependent.name)}
                      className="p-1.5 text-red-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="bg-red-50/80 border border-red-200/50 rounded-lg p-3">
              <p className="text-red-600 text-xs font-light">
                *Add children under 18 and dependents
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-xs text-gray-600">All your data will be encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default Dependents;