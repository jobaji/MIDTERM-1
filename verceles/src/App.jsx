import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CertificateOfRegistration from "./CertificateOfRegistration";
import Register from "./Register";
import Login from "./Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/certificateOfRegistration" element={<CertificateOfRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;