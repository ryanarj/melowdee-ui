import { Routes, Route} from "react-router-dom"
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import AllArtistPage from "./pages/allArtistPage";
import AddSongPage from "./pages/addSongPage";
import AddArtistPage from "./pages/addArtistPage";
import AddAlbumPage from "./pages/addAlbumPage";
import ArtistPage from "./pages/artistPage";
import AlbumPage from "./pages/albumPage";
import SongPage from "./pages/songPage";
import AddArticlePage from "./pages/addArticlePage";
import SearchPage from "./pages/searchPage";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, MenuItem } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
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
    navigate('/allArtistPage');
  };

  const handleSearchClick = () => {
    navigate('/searchPage');
  };

  return (
    <div className="App" color={"primary"}>
      <ThemeProvider theme={theme}>
        <header className="App-Header">
          <AppBar color={"primary"}>
            <Toolbar>
              <Typography variant="h6">
                Melowdee
              </Typography>
              <MenuItem>
                <HomeIcon onClick={() => handleClick()}/>
              </MenuItem>
              <MenuItem>
                <SearchIcon onClick={() => handleSearchClick()} />
              </MenuItem>
            </Toolbar>
          </AppBar>
        </header>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/allArtistPage" element={<AllArtistPage />} />
          <Route path="/addSong" element={<AddSongPage />} />
          <Route path="/addArtist" element={<AddArtistPage />} />
          <Route path="/addAlbum" element={<AddAlbumPage />} />
          <Route path="/artistPage" element={<ArtistPage />} />
          <Route path="/albumPage" element={<AlbumPage />} />
          <Route path="/songPage" element={<SongPage />} />
          <Route path="/searchPage" element={<SearchPage />} />
          <Route path="/addArticlePage" element={<AddArticlePage />} />
        </Routes>
     </ThemeProvider>
    </div>
  )
}


export default App;