import { Grid, makeStyles, createStyles, Card } from "@material-ui/core";
import Camera from "react-html5-camera-photo";

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

const CameraPage = () => {
  const classes = useStyles();

  const handleTakePhoto = (dataUri: string) => {
    // Do stuff with the photo...
    console.log(dataUri);
  };

  return (
    <Grid container className={classes.container}>
      <Card className={classes.cameraCard}>
        <Camera
          onTakePhoto={dataUri => {
            handleTakePhoto(dataUri);
          }}
        />
      </Card>
    </Grid>
  );
};

export default CameraPage;
