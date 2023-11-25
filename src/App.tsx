import AdminNavbar from "./admin/components/Navbar";
import Sidebar from "./admin/components/Sidebar";
import Auctions from "./admin/pages/Auctions";
import Payments from "./admin/pages/Payments";
import Users from "./admin/pages/Users";
import Footer from "./components/Footer";
import UserNavbar from "./components/Navbar";
import Auction from "./pages/Auction";
import Home from "./pages/Home";
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
      </Routes>
      <Footer />
    </>
  )
}

const AdminRoutes: React.FC = () => {
  return (
    <>
      <AdminNavbar />
      <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to={"auctions"} />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </>
  )
}




function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Admin Route  */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* User Route  */}
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
