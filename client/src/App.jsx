import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import EventDetails from "./pages/EventDetails";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./components/Layout";
import EventListing from "./pages/EventListing";
import Profile from "./pages/Profile";
import RoleRoute from "./State/RoleRoute"; 
import BookingSuccess from "./pages/BookingSuccess";
import About from "./components/About";
import Speaker from "./components/Speaker";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<EventListing />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/success" element={<BookingSuccess />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/speaker" element={<Speaker/>}/>
          <Route
            path="/admin"
            element={
              <RoleRoute roles="ADMIN">
                <AdminDashboard />
              </RoleRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
