import {
  Modal,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  ButtonGroup,
  Grid,
} from "@mui/material";
import { handleReview } from "../actions/users";
import { useDataLayerValue } from "../context/DataLayer";
import { useState } from "react";

// modal style
const modalStyle = {
  position: "absolute" as "absolute",
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
  data: any;
}
// review article component
export default function ReviewArticle({ open, handleClose, data }: Props) {
  let id = data?._id;
  const [{}, dispatch] = useDataLayerValue();
  // remark state hook
  const [remarks, setRemarks] = useState<string>("");
  // input text change event handler
  const handleChange = (event: any) => {
    setRemarks(event.target.value);
  };

  // handling accept button click
  const handleAcceptClick = async () => {
    try {
      await handleReview(id, remarks, dispatch, "accepted");
      setRemarks("");
      handleClose();
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  // handling rejection button click
  const handleRejectClick = async () => {
    try {
      await handleReview(id, remarks, dispatch, "rejected");
      setRemarks("");
      handleClose();
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="review-article-modal"
        aria-describedby="review-article-modal-form"
      >
        <Paper sx={modalStyle}>
          <Box component="form" noValidate>
            <Typography
              id="review-article-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Review Article of {data?.authorName}
            </Typography>
            <TextField
              id="title"
              label="title"
              name="title"
              value={data?.title}
              disabled
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              id="content"
              name="content"
              label="Content"
              multiline
              rows={3}
              value={data?.content}
              disabled
              fullWidth
              placeholder="Enter Content Here"
              sx={textFieldStyle}
            />
            <TextField
              id="remark"
              name="remark"
              label="Remarks / Suggestions (Optional)"
              multiline
              onChange={handleChange}
              value={remarks}
              rows={4}
              fullWidth
              placeholder="Enter Remarks Here"
              sx={textFieldStyle}
            />
            <Grid container justifyContent="space-between">
              <Grid item>
                <ButtonGroup disableElevation variant="contained">
                  <Button color="success" onClick={handleAcceptClick}>
                    Accept
                  </Button>
                  <Button color="error" onClick={handleRejectClick}>
                    Reject
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item>
                <Button color="inherit" onClick={handleClose}>
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
