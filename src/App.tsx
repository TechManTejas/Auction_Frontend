import AdminNavbar from "./admin/components/Navbar";
import Sidebar from "./admin/components/Sidebar";
import Auctions from "./admin/pages/Auctions";
import Footer from "./components/Footer";
import UserNavbar from "./components/Navbar";
import Auction from "./pages/Auction";
import Home from "./pages/Home";
import Result from "./pages/Result";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { Context } from "./context/context.provider";
import Authentication from "./admin/pages/Authentication";
import AuctionList from "./pages/AuctionList";
import TenderList from "./pages/TenderList";
import Tenders from "./admin/pages/Tenders";
import TenderSubmissions from "./admin/pages/TenderSubmissions";


const UserRoutes: React.FC = () => {

  const { userAuthenticated } = Context();

  return (
    <>
      <UserNavbar />
      <Routes>
        {userAuthenticated && (
          <>
            <Route path="/auction" element={<Auction />} />
            <Route path="/result" element={<Result />} />
          </>
        )}
        <Route path="/" element={<Navigate to={"home"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auction-list" element={<AuctionList />} />
        <Route path="/tender-list" element={<TenderList />} />
      </Routes>
      <Footer />
    </>
  )
}

const AdminRoutes: React.FC = () => {

  const { adminAuthenticated } = Context();

  return (
    <>
      <AdminNavbar />
      <div className='flex'>
        {adminAuthenticated &&
          <Sidebar />
        }
        <Routes>
          {adminAuthenticated && (
            <>
              <Route path="/" element={<Navigate to={"auctions"} />} />
              <Route path="/auctions" element={<Auctions />} />
              <Route path="/tenders" element={<Tenders />} />
              <Route path="/tenders-submissions/" element={<TenderSubmissions />} />
            </>
          )}
          {!adminAuthenticated && (
            <>
              <Route path="/" element={<Navigate to={"auth"} />} />
              <Route path="/auth" element={<Authentication />} />
            </>
          )}
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
