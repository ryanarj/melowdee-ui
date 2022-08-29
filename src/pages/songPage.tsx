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



  export interface Song {
    id: string
    name: string;
  }


  function SongPage() {
    
    const [songData, setSongData] = useState<Array<Song>>();

    const { heading, submitButton} = useStyles();

    const navigate = useNavigate();

    
    // useEffect(() => {
    //   // POST request using fetch inside useEffect React hook
    //   async function grabArtistData(){
    //     const requestOptions = {
    //       method: 'POST',
    //       body: JSON.stringify({"id": localStorage.getItem('artist_id')}),
    //       headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    //     };
    //     const response = await fetch('http://127.0.0.1:8000/grab_artist_data/', requestOptions)
    //     const data = await response.json();
    //     setArtistData(data)
      
    //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
    //  }
    //  grabArtistData(); 
    // }, []);


    // useEffect(() => {
    //   // POST request using fetch inside useEffect React hook
    //   async function grabArtistAlbumData(){
    //     const requestOptions = {
    //       method: 'POST',
    //       body: JSON.stringify({"id": localStorage.getItem('album_id')}),
    //       headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    //     };
    //     const response = await fetch('http://127.0.0.1:8000/all_songs_for_album/', requestOptions)
    //     const data = await response.json();
    //     setSongData(data)
      
    //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
    //  }
    //  grabArtistAlbumData(); 
    // }, []);
    
    console.log(songData)

    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Song Lyrics
        </Typography>
      </Container>
    );
  }
  
  export default SongPage;