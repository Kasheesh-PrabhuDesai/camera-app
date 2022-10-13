import { Grid, makeStyles, createStyles, Card } from "@material-ui/core";
import Webcam from "react-webcam";
// import Camera from "react-html5-camera-photo";

const useStyles = makeStyles(theme =>
  createStyles({
    cameraCard: {
      width: 720,
      height: 580,
    },
    container: {
      height: "80vh",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

const videoConstraints = {
  width: 720,
  height: 480,
  facingMode: { exact: "environment" },
};

const CameraPage = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Card className={classes.cameraCard}>
        <Webcam
          audio={false}
          height={480}
          screenshotFormat="image/jpeg"
          width={720}
          videoConstraints={videoConstraints}
        />
      </Card>
    </Grid>
  );
};

export default CameraPage;
