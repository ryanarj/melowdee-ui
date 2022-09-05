import { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import '../App.css';
import {
    makeStyles,
    Container,
    Typography
  } from "@material-ui/core";

  import Box from '@mui/material/Box';
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemButton from '@mui/material/ListItemButton';
  import ListItemText from '@mui/material/ListItemText';

  import { useNavigate } from 'react-router-dom';

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


const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "left",
      margin: theme.spacing(1, 3, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
      borderRadius: 20,
    }
  }));

export interface Song {
  id: string
  name: string;
}
 
function SearchPage(){
            
    const { heading, submitButton } = useStyles();

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
        const navigate = useNavigate();

        const handleClick = (id: string) => {
            localStorage.setItem('song_id', id)
            console.log("song_id_set")
            navigate('/songPage');
          };

    return (
        <Container fixed>
            <br/>
            <br/>
            <br/>
            <Typography className={heading} variant="h3">
                Search Songs
            </Typography>
                <Search className="search">
                    <SearchIconWrapper className="search">
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
                {
                    data?.filter(song => {
                        if (data.length === 0) {
                            return song;
                        } else if (song.name.toLowerCase()) {
                            return song.name;
                        }
                    }).map((song) => (
                        <Box component="div" width={650} height={700} sx={{
                            display: 'block',
                            p: 1,
                            m: 1,
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                            color: (theme) =>
                              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                            border: '1px solid',
                            borderColor: (theme) =>
                              theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            borderRadius: 2,
                            fontSize: '0.875rem',
                            fontWeight: '700',
                          }}>
                        <List>
                            <ListItem disablePadding>
                            <ListItemButton onClick={() => handleClick(song.id)}>
                                <ListItemText primary={song.name} />
                            </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    ))
                    }
        </Container>
    );
}


export default SearchPage;