import React from 'react';
import { Droplet, Wallet, HandHeart, Hand } from 'lucide-react';
import help from '../../assets/help.png';

const FANVolunteer = ({ isBloodVolunteer, setIsBloodVolunteer, bloodGroup, setBloodGroup }) => {
  const handleBloodVolunteerChange = (e) => {
    setIsBloodVolunteer(e.target.checked);
    if (!e.target.checked) {
      setBloodGroup('');
    }
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <img src={help} className="w-10 h-10 text-blue-600 mr-3" />
          FAN Volunteer
        </h2>
        <p className="text-sm text-gray-600 mb-2">"Feed A Need. Be the Help Someone Wasn't Expecting."</p>
        <p className="text-sm text-gray-500 max-w-3xl mx-auto">
          Join our growing network of FAN Volunteers — everyday people stepping up in extraordinary ways. Whether it's through blood donation, sponsoring medical consultations, or simply being there in a time of need, your kindness matters. Every act of care helps restore dignity, hope, and health — when it's needed the most, and often when it's least expected.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
          <Wallet className="w-6 h-6 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Feed A Need — Give the Gift of Health</h3>
          <p className="text-sm text-gray-600">
            Many individuals around us — domestic workers, support staff, or members of our communities — often lack health insurance or the financial means to consult a doctor. Social Pay makes it simple to extend a helping hand. With just a few taps, you can transfer a consultation fee from your virtual wallet directly to someone in need — with full confidence that your contribution can only be used for medical support, and not misused elsewhere. This ensures access to verified, quality healthcare for those who need it most. A small act of kindness from you can make a life-changing difference for someone else.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
          <Droplet className="w-6 h-6 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Feed A Need — Give the Gift of Life</h3>
          <p className="text-sm text-gray-600 mb-4">
            Donating blood is a simple, selfless act that can save lives and it is more than generosity — it's building bonds, creating new friendships, and saving lives. According to the Mental Health Foundation, blood donation can also improve your emotional and physical well-being, offering a sense of connection and purpose.
          </p>
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-sm font-medium text-gray-700">Become a volunteer</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isBloodVolunteer}
                onChange={handleBloodVolunteerChange}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500 shadow-sm"></div>
            </label>
          </div>
          {isBloodVolunteer && (
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-2">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-900 text-sm shadow-sm hover:shadow-md"
                aria-label="Select Blood Group"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          )}
          <p className="text-sm text-gray-600 font-medium mt-4">
            Be the Reason Someone Survives. Donate Today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FANVolunteer;