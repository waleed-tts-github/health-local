import React, { useContext } from 'react';
import { X, CheckCircle } from 'lucide-react';

import { BookingContext } from '../../contexts/BookingContext';

const SuccessModal = () => {
  const { currentModal, closeModal } = useContext(BookingContext);

  if (currentModal !== 'success') return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-white" size={28} />
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Successfully Paid</h3>
          <p className="text-3xl font-bold text-emerald-500 mb-4">Rs.1500</p>
          <p className="text-lg font-semibold text-gray-800 mb-4">Physical Appointment Booked</p>
          <div className="flex justify-center items-center gap-8 mb-6">
            <div>
              <p className="text-gray-600">Date:</p>
              <p className="font-semibold text-gray-800">13/07/2025</p>
            </div>
            <div>
              <p className="text-gray-600">Time:</p>
              <p className="font-semibold text-gray-800">9:30 PM</p>
            </div>
          </div>
        </div>
        <button
          onClick={closeModal}
          className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-600 transition-all duration-300"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;