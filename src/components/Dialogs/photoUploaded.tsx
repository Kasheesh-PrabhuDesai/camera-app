import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface DialogProps {
  open: boolean;
  handleContinue: () => void;
  handleClosePhotoDialog: () => void;
}

const PhotoDialog = ({
  open,
  handleContinue,
  handleClosePhotoDialog,
}: DialogProps) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClosePhotoDialog}>
        <DialogTitle>{"Image upload successful"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have successfully used our camera app to click your photo!Its
            now time to check your email for a copy of your document. Press
            continue if you wish to take another photo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePhotoDialog} color="primary">
            Go Back
          </Button>
          <Button onClick={handleContinue} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PhotoDialog;
