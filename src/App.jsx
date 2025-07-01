import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/patient/Layout';
import Home from './pages/patient/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/patient/*"
          element={
            <Layout>
              <Routes>
                <Route path="home" element={<Home />} />
                {/* Add other patient routes here as needed */}
                <Route path="appointments" element={<div>Appointments Page</div>} />
                <Route path="profile" element={<div>Profile Page</div>} />
              </Routes>
            </Layout>
          }
        />
        {/* Add other top-level routes if needed (e.g., login, admin) */}
        <Route path="/" element={<div>Landing Page</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;