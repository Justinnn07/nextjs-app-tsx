import {
  Modal,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Grid,
} from "@mui/material";
import { handleArticleCreate } from "../actions/users";
import { useDataLayerValue } from "./../context/DataLayer";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "600px",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const textFieldStyle = {
  m: "1rem 0",
};

interface Props {
  open: boolean;
  handleClose: () => void;
}

// add article component
export default function AddArticle({ open, handleClose }: Props) {
  // context api dispatch
  const [{}, dispatch] = useDataLayerValue();

  //submission handling function
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      await handleArticleCreate(event, dispatch);
      handleClose();
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="article-add-modal"
        aria-describedby="article-add-modal-form"
      >
        <Paper sx={modalStyle}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography
              id="form-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Create an Article
            </Typography>
            <TextField
              id="title"
              label="title"
              name="title"
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              id="content"
              name="content"
              label="Content"
              multiline
              rows={4}
              fullWidth
              placeholder="Enter Content Here"
              sx={textFieldStyle}
            />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="button"
                  onClick={handleClose}
                  fullWidth
                  color="inherit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}
