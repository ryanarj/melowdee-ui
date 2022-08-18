import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";
import AddSongPage from "./pages/addSongPage";
import AddArtistPage from "./pages/addArtistPage";
import AddAlbumPage from "./pages/addAlbumPage";
import ArtistPage from "./pages/addArtistPage";
import { AppBar, Toolbar, IconButton, Typography, MenuItem } from "@material-ui/core";

import InputBase from '@mui/material/InputBase';
import Icon from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red, pink } from "@mui/material/colors";

import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
})

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}



 function App(){
  return (
    <ThemeProvider theme={theme}>
      <div className="App" color={"primary"}>
        <header className="App-Header">
          <AppBar color={"primary"}>
            <Toolbar>
              <Typography variant="h6">
                Melowdee
              </Typography>
              <InputBase
                sx={{ ml: 1, flex: 3 }}
                color="primary"
                placeholder="Search lyrics"
              />
              <Icon type="submit" sx={{ p: '5px' }} aria-label="search">
                <SearchIcon />
              </Icon>
              <MenuItem>
                <HomeIcon />
              </MenuItem>
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
            <Route path="/artistPage" element={<ArtistPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}


export default App;