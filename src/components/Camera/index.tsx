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
  const [output, setOutput] = useState<string>("");
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
  const [croppedImage, setCroppedImage] = useState<boolean>(false);

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

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

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

  const handleSaveImage = () => {
    setCroppedImage(true);
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
        {imageTaken && !croppedImage && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            ruleOfThirds
            keepSelection
            onComplete={crop => handleCropImageNow(crop)}
          >
            <img
              src={image}
              alt="test"
              style={{
                transform: cameraMode === "user" ? "rotateY(180deg)" : "",
              }}
            />
          </ReactCrop>
        )}
        {croppedImage && <img src={output} alt="croppedImage" />}
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
          {imageTaken && !croppedImage && (
            <Grid item style={{ marginTop: 25 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveImage}
              >
                Crop
              </Button>
            </Grid>
          )}
          {imageTaken && croppedImage && (
            <Grid item style={{ marginTop: 25 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSaveImage}
              >
                Finish
              </Button>
            </Grid>
          )}
          {!imageTaken && (
            <Grid item style={{ marginTop: 5 }}>
              <IconButton onClick={handleFlipCamera} disabled={imageTaken}>
                <FlipCameraAndroidIcon className={classes.flipCameraIcon} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Card>
    </Grid>
  );
};

export default CameraPage;
