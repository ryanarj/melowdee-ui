import {
    makeStyles,
    Container,
    Typography,
    Button,
  } from "@material-ui/core";
  import Grid from '@mui/material/Grid';
  import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
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
    },
  }));

  
  function ProfilePage() {
    
    const { heading, submitButton} = useStyles();

    const navigate = useNavigate();

    const onAddArtistSubmit = () => {
      navigate('/addArtist');
    };
  
    const onAddAlbumSubmit = () => {
      navigate('/addAlbum');
    };

    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Profile Page 
        </Typography>
        <Typography variant="body2"> Hello, {localStorage.getItem("user_username") || ""}.</Typography>
        <Typography variant="body2"> You are {localStorage.getItem("user_age") || ""} years old!</Typography>
        <Typography className={heading} variant="h3">
          Artists
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
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
  
  export default ProfilePage;