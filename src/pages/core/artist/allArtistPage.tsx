import {
    makeStyles,
    Container,
    Typography,
    Button,
  } from "@material-ui/core";
  import Grid from '@mui/material/Grid';
  import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
  
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

  
  function AllArtistPage() {
    
    const [data, setData] = useState<Array<Artist>>();

    const { heading, submitButton} = useStyles();

    
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'Artist ID', width: 150 },
      { field: 'name', headerName: 'Artist Name', width: 150 },
    ];

    let rows: GridRowsProp = []

    const navigate = useNavigate();
  
    useEffect(() => {
      // POST request using fetch inside useEffect React hook
      async function getAllArtists(){
        const response = await fetch('http://127.0.0.1:8000/artists/all/')
        const data = await response.json();
        setData(data)
      
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
     }
     getAllArtists(); 
    }, []);

    console.log(data)


    if (data !== undefined && data.length !== 0) {
      rows = data.map(d => ({id: d.id, name: d.name}))
    }

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
      <Container fixed>
        <br/>
        <br/>
        <br/>
        <Typography className={heading} variant="h3">
          Artists
        </Typography>
          <>
              <Grid container spacing={5}>
                    { data &&
                       <div style={{ height: 500, width: '100%' }}>
                          <DataGrid rows={data} columns={columns} />
                        </div>
                    }
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
  
  export default AllArtistPage;