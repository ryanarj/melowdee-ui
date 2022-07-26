import { BrowserRouter as Router, Route, useNavigate  } from "react-router-dom"
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";



 function App(){
  const navigate = useNavigate();
  navigate('/signUpPage');
  return (
    <Router>
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
    </Router>
  )
}


export default App;