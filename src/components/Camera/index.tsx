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
import PhotoDialog from "../Dialogs/photoUploaded";

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    buttonGrid: {
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

interface cameraPage {
  setCameraPage: (arg: boolean) => void;
}

const CameraPage = ({ setCameraPage }: cameraPage) => {
  const classes = useStyles();
  const camera = useRef<any>(null);
  const [image, setImage] = useState("");
  const [imageTaken, setImageTaken] = useState<boolean>(false);
  const [cameraMode, setCameraMode] =
    useState<CameraProps["facingMode"]>("environment");
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
                <FlipCameraIosIcon
                  className={classes.flipCameraIcon}
                  htmlColor="black"
                />
              </IconButton>
            </Grid>
          )}
        </Grid>
      )}
      {open && (
        <PhotoDialog
          open={open}
          handleContinue={handleContinue}
          handleClose={handleClose}
        />
      )}
    </Grid>
  );
};

export default CameraPage;
