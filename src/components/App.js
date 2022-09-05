import Navigation from "./Navigation";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import Profile from "./Profile";
import { AuthContextProvider } from "../context/Auth";
import ProtectedRoute from "./ProtectedRoute";
import { Container } from "react-bootstrap";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <Navigation/>
      <Container>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        </Routes>
        </Container>
      </AuthContextProvider>
    </div>
  );
}

export default App;
