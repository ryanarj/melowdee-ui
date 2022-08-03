import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";

import { AppBar, Toolbar, IconButton, Typography, MenuItem } from "@material-ui/core";

import { ThemeProvider, createTheme } from "@mui/material";
import { orange, green } from "@mui/material/colors";

const theme = createTheme({
  palette :{
    primary : {
      main: orange[400]
    },
    secondary: {
      main: green[400]
    }
  }
})



 function App(){
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-Header">
          <AppBar  color={"primary"}>
            <Toolbar>
              <IconButton>
              </IconButton>
              <Typography variant="h6">
                Melowdee
              </Typography>
              <MenuItem>
                Login
              </MenuItem>
            </Toolbar>
          </AppBar>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/profilePage" element={<ProfilePage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}


export default App;