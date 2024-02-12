import {
    makeStyles,
    Container,
    Typography,
    Button,
  } from "@material-ui/core";
  import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from "react";

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Box from '@mui/material/Box';

  
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
    name: string
    about: string;
  }

  export interface Album {
    id: string
    name: string;
  }

  function ArtistPage() {
    
    const [artistData, setArtistData] = useState<Artist>();

    const [albumData, setAlbumData] = useState<Array<Album>>();

    const { heading, submitButton} = useStyles();

    const navigate = useNavigate();

    
    useEffect(() => {
      // POST request using fetch inside useEffect React hook
      async function grabArtistData(){
        const artist_id = localStorage.getItem('artist_id')
        const response = await fetch(`http://127.0.0.1:8000/v1/artists/${artist_id}`)
        const data = await response.json();
        setArtistData(data)
      
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
     }
     grabArtistData(); 
    }, []);


    useEffect(() => {
      // POST request using fetch inside useEffect React hook
      async function grabArtistAlbumData(){
        const artistId = localStorage.getItem('artist_id')
        const response = await fetch(`http://127.0.0.1:8000/v1/albums/${artistId}`)
        const data = await response.json();
        setAlbumData(data)
      
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
     }
     grabArtistAlbumData(); 
    }, []);
    
    console.log(artistData)


    const handleClick = (id: string) => {
      localStorage.setItem('album_id', id)
      console.log("album_id_set")
      navigate('/albumPage');
    };

    const onAddAlbumSubmit = () => {
      navigate('/addAlbum');
    };
    const onWalletPageSubmit = () => {
      navigate('/walletPage');
    };

    return (
      <Container fixed>
        <br />
        <br />
        <br />
        <Typography className={heading} variant="h3">
        {artistData?.name} About
        </Typography>
        <>
            <Typography variant="h5">{artistData?.about}</Typography>
        </>

        <Typography className={heading} variant="h3">
          Artist Albums
        </Typography>
              <>
                <Grid container spacing={5}>
                  <Box component="div" width={1500}  sx={{
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
                    {albumData?.map(d =>
                    
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
        <form onSubmit={onWalletPageSubmit} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            View Wallet
          </Button>
        </form>
      </Container>
    );
  }
  
  export default ArtistPage;