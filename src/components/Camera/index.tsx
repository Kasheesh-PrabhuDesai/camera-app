import {
  Grid,
  makeStyles,
  createStyles,
  Card,
  Button,
  IconButton,
} from "@material-ui/core";
import { useRef, useState } from "react";
import { Camera, CameraProps } from "react-camera-pro";
import CameraIcon from "@material-ui/icons/Camera";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const useStyles = makeStyles(theme =>
  createStyles({
    cameraCard: {
      width: "100vw",
      background: "#CCCCCC",
    },
    container: {
      height: "80vh",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonGrid: {
      marginTop: 20,
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

const CameraPage = () => {
  const classes = useStyles();

  const camera = useRef<any>(null);
  const [image, setImage] = useState("");
  const [imageTaken, setImageTaken] = useState<boolean>(false);
  const [cameraMode, setCameraMode] =
    useState<CameraProps["facingMode"]>("environment");
  const [crop, setCrop] = useState<Crop>({
    unit: "%", // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  });

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

  return (
    <Grid container className={classes.container}>
      <Card className={classes.cameraCard}>
        {!imageTaken && (
          <Camera
            ref={camera}
            errorMessages={{
              noCameraAccessible: undefined,
              permissionDenied: undefined,
              switchCamera: "Could not find back camera",
              canvas: undefined,
            }}
            facingMode={cameraMode}
            aspectRatio={5 / 9}
          />
        )}
        {imageTaken && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            ruleOfThirds
            aspect={5 / 9}
            keepSelection
          >
            <img
              src={image}
              alt="test"
              style={{ transform: "rotateY(180deg)" }}
            />
          </ReactCrop>
        )}
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
              Cancel
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
          <Grid item style={{ marginTop: 5 }}>
            <IconButton onClick={handleFlipCamera} disabled={imageTaken}>
              <FlipCameraAndroidIcon className={classes.flipCameraIcon} />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CameraPage;
