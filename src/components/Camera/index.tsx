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

const useStyles = makeStyles(theme =>
  createStyles({
    cameraCard: {
      width: 720,
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

  const handleClickPhoto = () => {
    setImage(camera?.current?.takePhoto());
    setImageTaken(true);
  };

  const handleCancelPhoto = () => {
    setImageTaken(false);
    setImage("");
  };

  const handleFlipCamera = () => {
    if (cameraMode === "user") {
      setCameraMode("environment");
    } else {
      setCameraMode("user");
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
              switchCamera: undefined,
              canvas: undefined,
            }}
            facingMode={cameraMode}
            aspectRatio={5 / 9}
          />
        )}
        {imageTaken && (
          <img
            src={image}
            width={"100%"}
            height={"100%"}
            alt="test"
            style={{ transform: "rotateY(180deg)" }}
          />
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
            <IconButton disabled={imageTaken}>
              <CameraIcon
                className={classes.cameraIcon}
                htmlColor="#E34234"
                onClick={handleClickPhoto}
              />
            </IconButton>
          </Grid>
          <Grid item style={{ marginTop: 5 }}>
            <IconButton onClick={handleFlipCamera}>
              <FlipCameraAndroidIcon className={classes.flipCameraIcon} />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CameraPage;
