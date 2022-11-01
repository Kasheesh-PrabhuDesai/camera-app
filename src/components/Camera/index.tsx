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
import FlipCameraIosIcon from "@material-ui/icons/FlipCameraIos";
import PhotoDialog from "../Dialogs/PhotoDialog";
import EmailDialog from "../Dialogs/EmailDialog";
import { SubmitHandler } from "react-hook-form";
import { sendEmail } from "../helpers/sendEmail";
import { createPdf } from "../helpers/createPdf";

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
    const result = createPdf(image);
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
    sendEmail(pdfURL, data.email);
    setOpenPhotoDialog(true);
    setOpenEmailDialog(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (numberOfCameras < 1) setAccessDenied(true);
      else setAccessDenied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [numberOfCameras]);

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        style={{
          minHeight: "80vh",
          width: "100%",
          display: accessDenied ? "flex" : "none",
        }}
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
      <img
        src={image}
        alt="your_document"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          display:
            imageTaken && !openEmailDialog && !openPhotoDialog
              ? "flex"
              : "none",
        }}
      />
      <Grid
        container
        justifyContent="space-around"
        className={classes.buttonGrid}
        style={{
          display:
            !openPhotoDialog && !openEmailDialog && !accessDenied
              ? "flex"
              : "none",
        }}
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
        <Grid item style={{ marginTop: imageTaken ? 25 : 20 }}>
          <Button
            variant={imageTaken ? "contained" : "text"}
            color={imageTaken ? "secondary" : "default"}
            onClick={imageTaken ? generatePdfFromImages : handleFlipCamera}
            className={imageTaken ? classes.allButtons : classes.flipCameraIcon}
          >
            {imageTaken ? (
              "Finish"
            ) : (
              <FlipCameraIosIcon
                className={classes.flipCameraIcon}
                htmlColor="black"
              />
            )}
          </Button>
        </Grid>
      </Grid>
      <EmailDialog
        open={openEmailDialog}
        handleSendEmail={handleSendEmail}
        handleCloseEmailDialog={handleCloseEmailDialog}
      />
      <PhotoDialog
        open={openPhotoDialog}
        handleContinue={handleContinue}
        handleClosePhotoDialog={handleClosePhotoDialog}
      />
    </Grid>
  );
};

export default CameraPage;
