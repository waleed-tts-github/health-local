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
import PatientEditProfile from './pages/patient/EditProfile';
import PatientSignIn from './pages/patient/SignIn';
import PatientForgotPassword from './pages/patient/ForgotPassword';
import PatientResetPassword from './pages/patient/ResetPassword';
import OTPPage from './pages/OTP';
import DoctorSignup from './pages/doctor/SignUp';
import CreateAppointmentSlots from './pages/doctor/CreateAppointmentSlots';
import DoctorLayout from './components/doctor/Layout';
import CompleteProfile from './pages/doctor/CompleteProfile';
import DoctorHome from './pages/doctor/Home';
import Doctors from './pages/patient/Doctors';
import Landing from './pages/Landing';
import DoctorFinancialAccount from './pages/doctor/FinancialAccount';
import DoctorPatientRecord from './pages/doctor/PatientRecord';
import WorkWithAngill from './pages/doctor/WorkWithAngill';

import PatientHealthComplaint from './components/doctor/HealthComplaintAndProfileModel';
import DoctorReviews from './pages/doctor/Reviews';

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
                      <Route path='' element={<Home/>}></Route>
                      <Route path="doctors" element={<Doctors />} />
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
          <Route
          path="/doctor/*"
          element={
            <Routes>
              <Route
                path="*"
                element={
                  <DoctorLayout>
                    <Routes>
                      <Route path='create-appointment-slots' element={<CreateAppointmentSlots/>}></Route>
                      <Route path='/profile/complete' element={<CompleteProfile/>}></Route>
                      <Route path='/' element={<DoctorHome/>}></Route>
                      <Route path='financial-account' element={<DoctorFinancialAccount/>}></Route>
                      <Route path='patient-record' element={<DoctorPatientRecord/>}></Route>
                      <Route path='work-with-angill' element={<WorkWithAngill/>}></Route>
                      <Route path='reviews' element={<DoctorReviews/>}></Route>
                      
                      <Route path='patient/health-complaint' element={<PatientHealthComplaint/>}></Route>
                    </Routes>
                  </DoctorLayout>
                }
              />
              <Route path="sign-up" element={<DoctorSignup />} />

                                   
            </Routes>
          }
        />
        <Route path="/" element={<Landing/>} />
         <Route path='/verify-otp' element={<OTPPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;