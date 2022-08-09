import {
    makeStyles,
    Container,
    Typography,
    Button,
  } from "@material-ui/core";

  import { useNavigate } from 'react-router-dom';
  
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