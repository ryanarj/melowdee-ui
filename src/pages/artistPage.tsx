import {
    makeStyles,
    Container,
    Typography,
    Button,
  } from "@material-ui/core";
  import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
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

  

  function ArtistPage() {
    
    const [data, setData] = useState<Array<Artist>>();

    const { heading, submitButton} = useStyles();

    const navigate = useNavigate();

    useEffect(() => {
      const grab_artist_data = async () => {
        const results = await fetch('http://127.0.0.1:8000/grab_artist_data/', {
          method: 'POST',
          body: JSON.stringify({"id": localStorage.getItem('artist_id')}),
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} 
        }).then(response => response.json()).then(response => setData(response));
      }});
    
    console.log(data)

    const onAddAlbumSubmit = () => {
      navigate('/addAlbum');
    };

    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Artist About
        </Typography>
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
  
  export default ArtistPage;