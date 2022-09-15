import {
    makeStyles,
    Container,
    Typography,
    Button,
    Divider,
  } from "@material-ui/core";
  import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';

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

  function AlbumPage() {
    
    const [songData, setSongData] = useState<Array<Song>>();

    const { heading, submitButton} = useStyles();

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'Song ID', width: 150 },
      { field: 'name', headerName: 'Song Name', width: 150 },
    ];

    let rows: GridRowsProp = []

    const navigate = useNavigate();

    useEffect(() => {
      // POST request using fetch inside useEffect React hook
      async function grabAlbumSongData(){
        const album_id = localStorage.getItem('album_id')
        const response = await fetch('http://127.0.0.1:8000/songs/from_album?album_id='+ album_id)
        const data = await response.json();
        setSongData(data)
      
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
     }
     grabAlbumSongData(); 
    }, []);
    
    console.log(songData)

    if (songData !== undefined && songData.length !== 0) {
        rows = songData.map(d => ({id: d.id, name: d.name}))
    }


    const handleClick = (id: string) => {
      localStorage.setItem('song_id', id)
      console.log("song_id_set")
      navigate('/songPage');
    };

    const onAddSongSubmit = () => {
      navigate('/addSong');
    };

    return (
      <Container fixed>
        <br/>
        <br/>
        <br/>
        <Typography className={heading} variant="h3">
          Album Songs
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
                {songData && songData.map(d =>
                    <div style={{ height: 300, width: '100%' }}>
                      <DataGrid rows={songData} columns={columns} />
                    </div>
                )}
              </Box>
            </Grid>
        </>
        <form onSubmit={onAddSongSubmit} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Add Song
          </Button>
        </form>
      </Container>
    );
  }
  
  export default AlbumPage;