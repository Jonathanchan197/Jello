import Navigation from "./Navigation";
import {Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Trello from "../pages/Trello";
import { AuthContextProvider } from "../context/Auth";
import ProtectedRoute from "./ProtectedRoute";
import { Container } from "react-bootstrap";
import "../App.css";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Navigation />
        <Container>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/trello" element={<Trello />} />
            <Route path={"/"}>
              <Route path={":id"} element={<Trello />} />
            </Route>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path={"/profile"}>
              <Route
                path={":id"}
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Container>
      </AuthContextProvider>
    </div>
  );
}

export default App;
