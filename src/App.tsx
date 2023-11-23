import Footer from "./components/Footer";
import UserNavbar from "./components/Navbar";
import Auction from "./pages/Auction";
import Home from "./pages/Home";
import Results from "./pages/Result";
import Result from "./pages/Result";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

// Assume you have an authentication check function, you can replace it with your actual authentication logic.
const isAuthenticated = () => {
  // Replace this with your authentication logic
  return true; // For demonstration purposes, always consider the user as authenticated
};

const UserRoutes: React.FC = () => {
  return (
    <>
      <UserNavbar />
      <Routes>
        {isAuthenticated() && (
          <>
            <Route path="/auction" element={<Auction />} />
            <Route path="/result" element={<Result />} />
          </>
        )}
        <Route path="/" element={<Navigate to={"home"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      <Footer />
    </>
  )
}

const AdminRoutes: React.FC = () => {
  return (
    <>

    </>
  )
}




function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* User Route  */}
          <Route path="/*" element={<UserRoutes />} />
          {/* Admin Route  */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
