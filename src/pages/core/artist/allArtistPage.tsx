import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Artist {
  id: string;
  name: string;
}

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

function AllArtistPage() {
  const [data, setData] = useState<Artist[]>([]);
  const { heading, submitButton } = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllArtists() {
      try {
        const response = await fetch("http://127.0.0.1:8000/v1/artists/all/");
        if (!response.ok) {
          throw new Error("Failed to fetch artists");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    }
    getAllArtists();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Artist ID", width: 150 },
    { field: "name", headerName: "Artist Name", width: 150 },
  ];

  const handleClick = (id: string) => {
    localStorage.setItem("artist_id", id);
    navigate("/artistPage");
  };

  const onAddArtistSubmit = () => {
    navigate("/createArtist");
  };

  const onAddAlbumSubmit = () => {
    navigate("/addAlbum");
  };

  const onWalletPageSubmit = () => {
    navigate("/walletPage");
  };

  return (
    <Container fixed>
      <Typography className={heading} variant="h3">
        Artists
      </Typography>

      {data && data.length > 0 ? (
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid rows={data} columns={columns} />
        </div>
      ) : (
        <Typography variant="h6">No artists found.</Typography>
      )}

      <form onSubmit={onAddArtistSubmit} noValidate>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
        >
          Create your artist profile
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

      <form onSubmit={onWalletPageSubmit} noValidate>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
        >
          Go to wallet
        </Button>
      </form>
    </Container>
  );
}

export default AllArtistPage;
