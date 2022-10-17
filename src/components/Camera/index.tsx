import {
  Grid,
  makeStyles,
  createStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraProps } from "react-camera-pro";
import CameraIcon from "@material-ui/icons/Camera";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import FlipCameraIosIcon from "@material-ui/icons/FlipCameraIos";
import PhotoDialog from "../Dialogs/PhotoDialog";
import EmailDialog from "../Dialogs/EmailDialog";
import { SubmitHandler } from "react-hook-form";

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
    allButtons: {
      textTransform: "initial",
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
  const [openEmailDialog, setOpenEmailDialog] = React.useState(false);
  const [openPhotoDialog, setOpenPhotoDialog] = React.useState(false);
  const [pdfURL, setPdfURL] = useState<any>();
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [accessDenied, setAccessDenied] = useState<boolean>(false);

  const handleClosePhotoDialog = () => {
    setOpenPhotoDialog(false);
    setCameraPage(false);
  };

  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
    setImageTaken(false);
  };

  const handleClickPhoto = () => {
    setImage(camera?.current?.takePhoto());
    setImageTaken(true);
  };

  const handleCancelPhoto = () => {
    if (image === "") {
      setCameraPage(false);
    } else {
      setImageTaken(false);
      setImage("");
    }
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
    // Default export is A4 paper
    const doc = new jsPDF({ compress: true });
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    // We let the images add all pages, therefore the first default page can be removed.
    doc.deletePage(1);
    doc.addPage();
    doc.addImage(image, "JPEG", 0, 0, width, height, "", "FAST"); //adds image to pdf document while at the same time trying to compress the image
    const result = doc.output("datauristring"); //converting the created pdf into a url string
    setPdfURL(result);
    setOpenEmailDialog(true);
  };

  const handleContinue = () => {
    setOpenPhotoDialog(false);
    setImageTaken(false);
  };

  //the created pdf is sent as an email to the desired email address using the emailJs package
  const handleSendEmail: SubmitHandler<{
    email: string;
  }> = data => {
    emailjs
      .send(
        "gmail",
        "kasheesh",
        { pdfURL: pdfURL, email: data.email },
        "4AwZYNQkMFKQOSS7z"
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        }
      );
    setOpenPhotoDialog(true);
    setOpenEmailDialog(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (numberOfCameras < 1) setAccessDenied(true);
      else setAccessDenied(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [numberOfCameras]);

  return (
    <Grid container className={classes.container}>
      {accessDenied && (
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          style={{ minHeight: "80vh", width: "100%" }}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.allButtons}
            onClick={() => setCameraPage(false)}
          >
            Camera access is denied. Please grant access to your camera and try
            again
          </Button>
        </Grid>
      )}
      {!imageTaken && !openPhotoDialog && !openEmailDialog && !accessDenied && (
        <Camera
          ref={camera}
          errorMessages={{
            noCameraAccessible: undefined,
            permissionDenied: "Access to camera has been denied",
            switchCamera: "Could not find back camera",
            canvas: undefined,
          }}
          facingMode={cameraMode}
          aspectRatio={window.innerWidth / window.innerHeight}
          numberOfCamerasCallback={setNumberOfCameras}
        />
      )}
      {imageTaken && !openEmailDialog && !openPhotoDialog && (
        <img
          src={image}
          alt="your_document"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      )}
      {!openPhotoDialog && !openEmailDialog && !accessDenied && (
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
              className={classes.allButtons}
            >
              {imageTaken ? "Undo" : "Go back"}
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
                className={classes.allButtons}
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
      {openEmailDialog && (
        <EmailDialog
          open={openEmailDialog}
          handleSendEmail={handleSendEmail}
          handleCloseEmailDialog={handleCloseEmailDialog}
        />
      )}
      {openPhotoDialog && (
        <PhotoDialog
          open={openPhotoDialog}
          handleContinue={handleContinue}
          handleClosePhotoDialog={handleClosePhotoDialog}
        />
      )}
    </Grid>
  );
};

export default CameraPage;
