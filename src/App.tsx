import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import AddSongPage from "./pages/addSongPage";
import AddArtistPage from "./pages/addArtistPage";
import AddAlbumPage from "./pages/addAlbumPage";
import ArtistPage from "./pages/artistPage";
import AlbumPage from "./pages/albumPage";
import SongPage from "./pages/songPage";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, MenuItem } from "@material-ui/core";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from "@mui/material/colors";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Search';

import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export interface Song {
  id: string
  name: string;
}

 function App(){

  const [data, setData] = useState<Array<Song>>();

  const [search, setSearch]: [string, (search: string) => void] = useState("");

  const onChangeHandle = async (value: string) => {
    // this default api does not support searching but if you use google maps or some other use the value and post to get back you reslut and then set it using setOptions 
        setSearch(value)
        if  (value !== "" || value !== null){
          const response = await fetch(
            "http://127.0.0.1:8000/song_search?" + new URLSearchParams({
              search: value
            })
          );
      
          const res = await response.json();
          if (res && Object.keys(res).length !== 0) {
            setData(res)
          }
        }
      };

    const clearInput = () => {
      setData([]);
      setSearch("");
    };
  
  

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
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={ev => {
                    // dont fire API if the user delete or not entered anything
                    if (ev.target.value !== "" || ev.target.value !== null) {
                      onChangeHandle(ev.target.value);
                    } else {
                      setData([])
                    }
                  }}
                />
              </Search>
              { data && data?.length != 0 && (
                  <div className="dataResult">
                    {data?.map( (d) => {
                      return (<Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={d.name}
                        label=""                        
                        >
                        <MenuItem value={d.id}>{d.name}</MenuItem>
                      </Select>)
                      }) 
                    } 
                  </div>
                )} */}
            <div className="search">
              <div className="searchInputs">
                <input
                  type="text"
                  placeholder="Search…"
                  onChange={ev => {
                    // dont fire API if the user delete or not entered anything
                    if (ev.target.value !== "" || ev.target.value !== null) {
                      onChangeHandle(ev.target.value);
                    }
                  }}
                />
                <div className="searchIcon">
                  {data && data.length === 0 ? (
                    <SearchIcon />
                  ) : (
                    <CloseIcon id="clearBtn" onClick={clearInput} />
                  )}
                </div>
              </div>
              {data && data.length != 0 && (
                <div className="dataResult">
                  {data.slice(0, 15).map((value) => {
                    return (
                      <a className="dataItem" target="_blank">
                        <p>{value.name} </p>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
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
          <Route path="/albumPage" element={<AlbumPage />} />
          <Route path="/songPage" element={<SongPage />} />
        </Routes>
     </ThemeProvider>
    </div>
  )
}


export default App;