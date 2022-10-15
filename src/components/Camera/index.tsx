import {
  Grid,
  makeStyles,
  createStyles,
  Card,
  Button,
  IconButton,
  CardMedia,
  Box,
} from "@material-ui/core";
import { MouseEvent, useRef, useState } from "react";
import { Camera, CameraProps } from "react-camera-pro";
import CameraIcon from "@material-ui/icons/Camera";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import mailjet from "../../utils/emailHelper";
import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";

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

const A4_PAPER_DIMENSIONS = {
  width: 210,
  height: 297,
};

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
    console.log(image);
    // emailjs.send("gmail", "kasheesh", { image }, "4AwZYNQkMFKQOSS7z").then(
    //   result => {
    //     console.log(result);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  };

  const generatePdfFromImages = async () => {
    // Default export is A4 paper, portrait, using millimeters for units.
    const doc = new jsPDF();
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    const imgElement = document.createElement("img");
    imgElement.src = image;

    // We let the images add all pages,
    // therefore the first default page can be removed.
    doc.deletePage(1);

    doc.addPage();
    // doc.addImage(
    //   imgElement.src,
    //   "image/jpeg",
    //   // Images are vertically and horizontally centered on the page.
    //   (A4_PAPER_DIMENSIONS.width - imgElement.width) / 2,
    //   (A4_PAPER_DIMENSIONS.height - imgElement.height) / 2,
    //   imgElement.width / 2,
    //   imgElement.height / 2
    // );
    doc.addImage(image, "JPEG", 0, 0, width, height);

    // Creates a PDF and opens it in a new browser tab.
    const pdfURL = doc.output("datauri");
    emailjs.send("gmail", "kasheesh", { pdfURL }, "4AwZYNQkMFKQOSS7z").then(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
    window.open(pdfURL as any, "_blank");
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
          // <ReactCrop
          //   crop={crop}
          //   onChange={(_, percentCrop) => setCrop(percentCrop)}
          //   ruleOfThirds
          //   keepSelection
          //   onComplete={crop => handleCropImageNow(crop)}
          // >
          <img
            src={image}
            alt="test"
            style={{
              transform: cameraMode === "user" ? "rotateY(180deg)" : "",
            }}
          />
          // </ReactCrop>
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
                type="submit"
                onClick={generatePdfFromImages}
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
