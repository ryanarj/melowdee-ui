import {
    makeStyles,
    Container,
    Typography,
    Button,
  } from "@material-ui/core";
  import Grid from '@mui/material/Grid';
  import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
  
  const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
      borderRadius: 20,
    },
  }));


  export interface Artist {
    id: string
    name: string;
  }

  
  function HomePage() {
    
    const [data, setData] = useState<Array<Artist>>();

    const { heading, submitButton} = useStyles();

    const navigate = useNavigate();
  
    useEffect(() => {
      // POST request using fetch inside useEffect React hook
      async function getAllArtists(){
        const response = await fetch('http://127.0.0.1:8000/all_artists/')
        const data = await response.json();
        setData(data)
      
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
     }
     getAllArtists(); 
    }, []);

    console.log(data)

    const handleClick = (id: string) => {
      localStorage.setItem('artist_id', id)
      navigate('/artistPage');
    };

    const onAddArtistSubmit = () => {
      navigate('/addArtist');
    };
  
    const onAddAlbumSubmit = () => {
      navigate('/addAlbum');
    };

    return (
      <Container maxWidth="md">
        <br/>
        <br/>
        <br/>
        <Typography className={heading} variant="h3">
          Artists
        </Typography>
          <>
                <Grid container spacing={5}>
                  <Box component="div" width={150} height={700} sx={{
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
                    {data?.map(d =>
                    
                    <List>
                      <ListItem disablePadding>
                      <ListItemButton onClick={() => handleClick(d.id)}>
                        <ListItemText primary={d.name} />
                      </ListItemButton>
                      </ListItem>
                    </List>
                    )}
                  </Box>
                </Grid>
            </>

        <form onSubmit={onAddArtistSubmit} noValidate>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={submitButton}
            >
            Add artist
          </Button>
        </form>
        <form onSubmit={onAddAlbumSubmit} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Add album
          </Button>
        </form>
      </Container>
    );
  }
  
  export default HomePage;