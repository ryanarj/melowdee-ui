import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

  
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


  interface Artist {
    name: string;
    about: string;
  }
  
  interface Album {
    id: string;
    name: string;
  }

  async function fetchArtistData(artistId: string | null) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/artists?artist_id=${artistId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch artist data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching artist data:", error);
      return null;
    }
  }
  
  async function fetchArtistAlbums(artistId: string | null) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/albums?artist_id=${artistId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch albums data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching albums data:", error);
      return null;
    }
  }

  function ArtistPage() {
    const [artistData, setArtistData] = useState<Artist | null>(null);
    const [albumData, setAlbumData] = useState<Album[] | null>(null);
    const { heading, submitButton } = useStyles();
    const navigate = useNavigate();
  
    useEffect(() => {
      const artistId = localStorage.getItem('artist_id');
      if (artistId) {
        fetchArtistData(artistId).then(data => {
          if (data) {
            setArtistData(data);
          }
        });
      }
    }, []);
  
    useEffect(() => {
      const artistId = localStorage.getItem('artist_id');
      if (artistId) {
        fetchArtistAlbums(artistId).then(data => {
          if (data) {
            setAlbumData(data);
          }
        });
      }
    }, []);
  
    const handleClick = (id: string) => {
      localStorage.setItem('album_id', id);
      navigate('/albumPage');
    };
  
    const handleAddAlbum = () => {
      navigate('/addAlbum');
    };
  
    return (
      <Container fixed>
        {artistData ? (
          <>
            <Typography className={heading} variant="h3">
              {artistData.name} About
            </Typography>
            <Typography variant="h5">{artistData.about}</Typography>
          </>
        ) : (
          <Typography variant="h5">Loading artist data...</Typography>
        )}
  
        <Typography className={heading} variant="h3">
          Artist Albums
        </Typography>
        {albumData ? (
          <Grid container spacing={5}>
            <Box component="div" width={1500} sx={{ /* styles */ }}>
              {albumData.map(d => (
                <List key={d.id}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleClick(d.id)}>
                      <ListItemText primary={d.name} />
                    </ListItemButton>
                  </ListItem>
                </List>
              ))}
            </Box>
          </Grid>
        ) : (
          <Typography variant="h5">Loading albums data...</Typography>
        )}
  
        <form onSubmit={handleAddAlbum} noValidate>
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