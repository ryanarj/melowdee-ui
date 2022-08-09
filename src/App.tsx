import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";
import AddSongPage from "./pages/addSongPage";
import AddArtistPage from "./pages/addArtistPage";
import AddAlbumPage from "./pages/addAlbumPage";

import { AppBar, Toolbar, IconButton, Typography, MenuItem } from "@material-ui/core";

import InputBase from '@mui/material/InputBase';
import Icon from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

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
              <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search lyrics"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Icon type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </Icon>
            </Toolbar>
          </AppBar>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/profilePage" element={<ProfilePage />} />
            <Route path="/addSong" element={<AddSongPage />} />
            <Route path="/addArtist" element={<AddArtistPage />} />
            <Route path="/addAlbum" element={<AddAlbumPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}


export default App;