import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, CreditCard, CheckCircle, Video, Users, Heart } from 'lucide-react';

const TelemedicineBookingFlow = () => {
  const [currentModal, setCurrentModal] = useState('connect'); // connect, waiting, notAvailable, confirmed, queue, payment, success
  const [selectedTime, setSelectedTime] = useState('00:07:53');
  const [timeMinutes, setTimeMinutes] = useState(7);
  const [timeSeconds, setTimeSeconds] = useState(53);
  const [queueWaitTime, setQueueWaitTime] = useState(3);

  // Timer effect for appointment scheduler
  useEffect(() => {
    if (currentModal === 'connect') {
      const timer = setInterval(() => {
        if (timeSeconds > 0) {
          setTimeSeconds(timeSeconds - 1);
        } else if (timeMinutes > 0) {
          setTimeMinutes(timeMinutes - 1);
          setTimeSeconds(59);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentModal, timeMinutes, timeSeconds]);

  const formatTime = (mins, secs) => {
    return `00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLiveConnect = () => {
    setCurrentModal('waiting');
    // Simulate doctor availability check
    setTimeout(() => {
      const isAvailable = Math.random() > 0.5;
      if (isAvailable) {
        setCurrentModal('queue');
      } else {
        setCurrentModal('notAvailable');
      }
    }, 2000);
  };

  const handleScheduleAppointment = () => {
    setCurrentModal('confirmed');
  };

  const handleDoctorConfirm = () => {
    setCurrentModal('payment');
  };

  const handlePayment = () => {
    setCurrentModal('success');
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  const Modal = ({ children, isOpen }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
          {children}
        </div>
      </div>
    );
  };

  // Connect Modal (First Screen)
  const ConnectModal = () => (
    <Modal isOpen={currentModal === 'connect'}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Connect</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-white" size={28} />
          </div>
        </div>

        <button
          onClick={handleLiveConnect}
          className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2 mb-6"
        >
          <Video size={20} />
          Connect Live Online
        </button>

        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Schedule An Appointment For Today?</h3>
          <p className="text-gray-600 mb-4">Please Select A Time</p>
          
          <div className="text-4xl font-bold text-gray-800 mb-4">
            {formatTime(timeMinutes, timeSeconds)}
          </div>
          
          <div className="mb-6">
            <input
              type="range"
              min="0"
              max="120"
              value={timeMinutes}
              onChange={(e) => setTimeMinutes(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Time : Minutes</span>
            </div>
          </div>

          <button
            onClick={handleScheduleAppointment}
            className="w-full bg-white border-2 border-emerald-400 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Calendar size={20} />
            Book (Schedule An Appointment) Tomorrow & Onwards
          </button>
        </div>

        <p className="text-center text-sm text-amber-600 font-medium">
          *Physical Appointment Can Only Be Booked For Private Doctors*
        </p>
      </div>
    </Modal>
  );

  // Waiting Modal
  const WaitingModal = () => (
    <Modal isOpen={currentModal === 'waiting'}>
      <div className="p-6 text-center">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Connect</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="text-white" size={28} />
        </div>

        <div className="mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-teal-600 rounded-full animate-bounce delay-200"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Waiting For Doctor's Confirmation</h3>
        </div>
      </div>
    </Modal>
  );

  // Doctor Not Available Modal
  const NotAvailableModal = () => (
    <Modal isOpen={currentModal === 'notAvailable'}>
      <div className="p-6 text-center">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Connect</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="text-white" size={28} />
        </div>

        <div className="mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Waiting For Doctor's Confirmation</h3>
          <p className="text-amber-500 font-medium">Sorry Doctor Not Available</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setCurrentModal('connect')}
            className="w-full bg-white border-2 border-emerald-400 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300"
          >
            Find Another Doctor
          </button>
          <button
            onClick={() => setCurrentModal('connect')}
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-600 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    </Modal>
  );

  // Appointment Confirmed Modal
  const ConfirmedModal = () => (
    <Modal isOpen={currentModal === 'confirmed'}>
      <div className="p-6 text-center">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Connect</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="text-white" size={28} />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Availability Confirm</h3>
          <p className="text-gray-600 mb-4">At Your Scheduled Time</p>
          
          <div className="flex justify-center items-center gap-8 mb-6">
            <div>
              <p className="text-3xl font-bold text-gray-800">Today</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">9:30 Pm</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleDoctorConfirm}
          className="w-full bg-white border-2 border-emerald-400 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300"
        >
          Pay Doctor's Fee
        </button>
      </div>
    </Modal>
  );

  // Queue Modal
  const QueueModal = () => (
    <Modal isOpen={currentModal === 'queue'}>
      <div className="p-6 text-center">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Connect</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="text-white" size={28} />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Availability Confirm</h3>
          
          <div className="mb-4">
            <span className="text-lg text-gray-600">You Are </span>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-3 py-1 rounded-full font-semibold">Next</span>
            <span className="text-lg text-gray-600"> In Line</span>
          </div>
          
          <div className="mb-6">
            <span className="text-lg text-gray-600">Approx. Waiting </span>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-3 py-1 rounded-full font-semibold">{queueWaitTime} Min...</span>
          </div>
        </div>

        <button
          onClick={handleDoctorConfirm}
          className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-600 transition-all duration-300"
        >
          Pay Doctor's Fee
        </button>
      </div>
    </Modal>
  );

  // Payment Modal
  const PaymentModal = () => (
    <Modal isOpen={currentModal === 'payment'}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Fees</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Initial Amount</span>
            <span className="font-semibold text-gray-800">Rs: 1500</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Voucher Discount:</span>
            <span className="font-semibold text-emerald-600">Rs: 200</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-gray-800">You Have To Pay:</span>
            <span className="text-emerald-600">Rs.1300</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Select Payment Source</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 rounded-xl hover:border-emerald-400 transition-colors duration-300">
              <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">JC</span>
              </div>
              <span className="text-sm font-medium">Jazz Cash</span>
            </button>
            
            <button className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 rounded-xl hover:border-emerald-400 transition-colors duration-300">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">EP</span>
              </div>
              <span className="text-sm font-medium">Easy Paisa</span>
            </button>
            
            <button className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 rounded-xl hover:border-emerald-400 transition-colors duration-300">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center">
                <span className="text-white text-xs">MC</span>
              </div>
              <span className="text-sm font-medium">Master Card</span>
            </button>
            
            <button className="flex items-center justify-center gap-2 p-3 border-2 border-gray-200 rounded-xl hover:border-emerald-400 transition-colors duration-300">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">V</span>
              </div>
              <span className="text-sm font-medium">Visa Card</span>
            </button>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span className="text-sm">Virtual Wallet</span>
          <span className="font-bold">Rs.500</span>
        </button>
      </div>
    </Modal>
  );

  // Success Modal
  const SuccessModal = () => (
    <Modal isOpen={currentModal === 'success'}>
      <div className="p-6 text-center">
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
              <p className="font-semibold text-gray-800">13/07/2020</p>
            </div>
            <div>
              <p className="text-gray-600">Time:</p>
              <p className="font-semibold text-gray-800">9:30 Pm</p>
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
    </Modal>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Telemedicine</h1>
          <p className="text-gray-600">Complete Healthcare Solution</p>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => setCurrentModal('connect')}
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Video size={20} />
            Start Consultation
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentModal('waiting')}
              className="bg-white border-2 border-emerald-400 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300"
            >
              Test Waiting
            </button>
            <button
              onClick={() => setCurrentModal('notAvailable')}
              className="bg-white border-2 border-emerald-400 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300"
            >
              Test Not Available
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentModal('queue')}
              className="bg-white border-2 border-emerald-400 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300"
            >
              Test Queue
            </button>
            <button
              onClick={() => setCurrentModal('payment')}
              className="bg-white border-2 border-emerald-400 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-300"
            >
              Test Payment
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Developed with ❤️ for better healthcare</p>
        </div>
      </div>

      {/* All Modals */}
      <ConnectModal />
      <WaitingModal />
      <NotAvailableModal />
      <ConfirmedModal />
      <QueueModal />
      <PaymentModal />
      <SuccessModal />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(to right, #10b981, #14b8a6);
          border-radius: 50%;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(to right, #10b981, #14b8a6);
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default TelemedicineBookingFlow;