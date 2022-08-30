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
    id: string;
    name: string;
    verse_one: string;
    verse_two: string;
    verse_three: string;
    verse_four: string;
    chorus: string;
  }



  function SongPage() {
    
    const [songData, setSongData] = useState<Song>();

    const { heading, submitButton} = useStyles();

    const navigate = useNavigate();

    
    useEffect(() => {
      // POST request using fetch inside useEffect React hook
      async function grabSongData(){
        const requestOptions = {
          method: 'POST',
          body: JSON.stringify({"id": localStorage.getItem('song_id')}),
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        };
        const response = await fetch('http://127.0.0.1:8000/grab_song_data/', requestOptions)
        const data = await response.json();
        setSongData(data)
      
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
     }
     grabSongData(); 
    }, []);
    
    console.log(songData)

    return (
      <Container maxWidth="xs">
        <br/>
        <br/>
        <br/>
        <Typography className={heading} variant="h3">
            {songData?.name} Lyrics
        </Typography>
        <br/>
        <Typography variant="h5">
            Verse One:
        </Typography>
        <Typography>
            {songData?.verse_one}
        </Typography>
        <br/>
        <Typography variant="h5">
            Chorus:
        </Typography>
        <Typography>
            {songData?.chorus}
        </Typography>
        <br/>
        <Typography variant="h5">
            Verse Two:
        </Typography>
        <Typography>
            {songData?.verse_two}
        </Typography>
        <br/>
        <Typography variant="h5">
            Chorus: 
        </Typography>
        <Typography>
            {songData?.chorus}
        </Typography>
        <br/>
        <Typography variant="h5">
            Verse Three:
        </Typography>
        <Typography>
            {songData?.verse_three}
        </Typography>
        <br/>
      </Container>
    );
  }
  
  export default SongPage;