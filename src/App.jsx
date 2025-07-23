import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/patient/Layout';
import Home from './pages/patient/Home';
import DoctorProfile from './pages/patient/DoctorProfile';
import AppointmentRecord from './pages/patient/AppointmentRecord';
import Prescriptions from './pages/patient/Prescriptions';
import LabReports from './pages/patient/LabReports';
import PatientSignup from './pages/patient/SignUp';
import HealthProfile from './pages/patient/HealthProfile';
import ScrollToTopCustom from './components/ScrollToTopCustom';
import BloodVolunteers from './pages/patient/BloodVolunteers';
import BloodDonations from './pages/patient/BloodDonations';
import VirtualWallet from './pages/patient/VirtualWallet';
import Landing from './pages/patient/Landing';
import PatientEditProfile from './pages/patient/EditProfile';
import PatientSignIn from './pages/patient/SignIn';
import PatientForgotPassword from './pages/patient/ForgotPassword';
import PatientResetPassword from './pages/patient/ResetPassword';
import OTPPage from './pages/OTP';

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTopCustom/>
      <Routes>
        <Route
          path="/patient/*"
          element={
            <Routes>
              <Route
                path="*"
                element={
                  <Layout>
                    <Routes>
                      <Route path='' element={<Landing/>}></Route>
                      <Route path="home" element={<Home />} />
                      <Route path="doctors/:doctorId" element={<DoctorProfile />} />
                      <Route path="appointments" element={<AppointmentRecord />} />
                      <Route path="profile" element={<div>Profile Page</div>} />
                      <Route path="prescriptions" element={<Prescriptions />} />
                      <Route path="lab-reports" element={<LabReports />} />
                      <Route path='health-profile' element={<HealthProfile/>}></Route>
                      <Route path='blood-volunteers' element={<BloodVolunteers/>}></Route>
                      <Route path='blood-donations' element={<BloodDonations/>}></Route>
                      <Route path='virtual-wallet' element={<VirtualWallet/>}></Route>
                      <Route path='profile/edit' element={<PatientEditProfile/>}></Route>

                    </Routes>
                  </Layout>
                }
              />
              <Route path="sign-up" element={<PatientSignup />} />
                                    <Route path='login' element={<PatientSignIn/>}></Route>
                                    <Route path='forgot-password' element={<PatientForgotPassword/>}></Route>
                                    <Route path='reset-password' element={<PatientResetPassword/>}></Route>
                                   
            </Routes>
          }
        />
        <Route path="/" element={<div>Landing Page</div>} />
         <Route path='/verify-otp' element={<OTPPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;