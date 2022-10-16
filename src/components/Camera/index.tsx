import {
  Grid,
  makeStyles,
  createStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Camera, CameraProps } from "react-camera-pro";
import CameraIcon from "@material-ui/icons/Camera";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import FlipCameraIosIcon from "@material-ui/icons/FlipCameraIos";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme =>
  createStyles({
    cameraCard: {
      background: "#CCCCCC",
      height: "100%",
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    buttonGrid: {
      // marginTop: 20,
      backgroundColor: "#CCCCCC",
    },
    cameraIcon: {
      width: 64,
      height: 64,
    },
    flipCameraIcon: {
      width: 48,
      height: 48,
    },
  })
);

const A4_PAPER_DIMENSIONS = {
  width: 210,
  height: 297,
};

interface cameraPage {
  setCameraPage: (arg: boolean) => void;
}

const CameraPage = ({ setCameraPage }: cameraPage) => {
  const classes = useStyles();

  const camera = useRef<any>(null);
  const [image, setImage] = useState("");
  const [output, setOutput] = useState<string>("");
  const [imageTaken, setImageTaken] = useState<boolean>(false);
  const [cameraMode, setCameraMode] =
    useState<CameraProps["facingMode"]>("environment");
  const [croppedImage, setCroppedImage] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setCameraPage(false);
  };

  const handleClickPhoto = () => {
    setImage(camera?.current?.takePhoto());
    setImageTaken(true);
  };

  const handleCancelPhoto = () => {
    setImageTaken(false);
    setImage("");
    setOutput("");
    setCroppedImage(false);
  };

  const handleFlipCamera = () => {
    if (cameraMode === "environment") {
      setCameraMode("user");
      camera?.current?.switchCamera();
    } else {
      setCameraMode("environment");
      camera?.current?.switchCamera();
    }
  };

  const handleCropImageNow = (crop: {
    width: number;
    height: number;
    x: number;
    y: number;
  }) => {
    const canvas = document.createElement("canvas");
    const imgElement = document.createElement("img");
    imgElement.src = image;
    const scaleX = imgElement.naturalWidth / imgElement.width;
    const scaleY = imgElement.naturalHeight / imgElement.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx: any = canvas.getContext("2d");

    ctx.drawImage(
      imgElement,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL("image/jpeg");
    setOutput(base64Image);
  };

  const generatePdfFromImages = () => {
    // Default export is A4 paper, portrait, using millimeters for units.
    const doc = new jsPDF({ compress: true });
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    // We let the images add all pages,
    // therefore the first default page can be removed.
    doc.deletePage(1);
    doc.addPage();
    doc.addImage(image, "JPEG", 0, 0, width, height, "", "FAST");
    const pdfURL = doc.output("datauristring");
    console.log(pdfURL);
    emailjs.send("gmail", "kasheesh", { pdfURL }, "4AwZYNQkMFKQOSS7z").then(
      result => {
        console.log(result.text);
      },
      error => {
        console.log(error.text);
      }
    );
    setImageTaken(false);
    setOpen(true);
  };

  const handleContinue = () => {
    setOpen(false);
    setImageTaken(false);
  };

  return (
    <Grid container className={classes.container}>
      {!imageTaken && !open && (
        <Camera
          ref={camera}
          errorMessages={{
            noCameraAccessible: undefined,
            permissionDenied: undefined,
            switchCamera: "Could not find back camera",
            canvas: undefined,
          }}
          facingMode={cameraMode}
          aspectRatio={window.innerWidth / window.innerHeight}
        />
      )}
      {imageTaken && (
        <img
          src={image}
          alt="test"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      )}
      {/* {croppedImage && (
          <Grid container justifyContent="center">
            <img
              src={output}
              alt="croppedImage"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </Grid>
        )} */}
      {!open && (
        <Grid
          container
          justifyContent="space-around"
          className={classes.buttonGrid}
        >
          <Grid item style={{ marginTop: 25 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCancelPhoto}
              disabled={!imageTaken}
            >
              Undo
            </Button>
          </Grid>
          <Grid item>
            <IconButton disabled={imageTaken} onClick={handleClickPhoto}>
              <CameraIcon
                className={classes.cameraIcon}
                htmlColor={imageTaken ? "grey" : "#E34234"}
              />
            </IconButton>
          </Grid>
          {/* {imageTaken && !croppedImage && (
            <Grid item style={{ marginTop: 25 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveImage}
              >
                Crop
              </Button>
            </Grid>
          )} */}
          {imageTaken && (
            <Grid item style={{ marginTop: 25 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={generatePdfFromImages}
              >
                Finish
              </Button>
            </Grid>
          )}
          {!imageTaken && (
            <Grid item style={{ marginTop: 5 }}>
              <IconButton onClick={handleFlipCamera} disabled={imageTaken}>
                <FlipCameraIosIcon className={classes.flipCameraIcon} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      )}
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Image upload successful"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have successfully used our camera app to click your photo!Its
              now time to check your email for a copy of your document. Press
              continue if you wish to take another photo.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Go Back
            </Button>
            <Button onClick={handleContinue} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};

export default CameraPage;
