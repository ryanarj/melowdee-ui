import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import AddSongPage from "./pages/addSongPage";
import AddArtistPage from "./pages/addArtistPage";
import AddAlbumPage from "./pages/addAlbumPage";
import ArtistPage from "./pages/artistPage";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, MenuItem } from "@material-ui/core";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from "@mui/material/colors";

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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="App" color={"primary"}>
      <ThemeProvider theme={theme}>
        <header className="App-Header">
          <AppBar color={"primary"}>
            <Toolbar>
              <MenuItem>
                <HomeIcon onClick={() => handleClick()}/>
              </MenuItem>
              <Typography variant="h6">
                Melowdee
              </Typography>
            </Toolbar>
          </AppBar>
        </header>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/addSong" element={<AddSongPage />} />
          <Route path="/addArtist" element={<AddArtistPage />} />
          <Route path="/addAlbum" element={<AddAlbumPage />} />
          <Route path="/artistPage" element={<ArtistPage />} />
        </Routes>
     </ThemeProvider>
    </div>
  )
}


export default App;