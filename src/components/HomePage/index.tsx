import {
  Avatar,
  Button,
  Card,
  CardContent,
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import CameraPage from "../Camera";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

const useStyles = makeStyles(theme =>
  createStyles({
    cameraCard: {
      background: "#FEFEFE",
      margin: 20,
      boxShadow: "0px -2px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px 8px 8px 8px",
    },
    cameraTitle: {
      color: "#000000",
      fontWeight: 700,
      fontSize: 18,
      textAlign: "center",
    },
    camerasubHeader: {
      color: "#000000",
      fontWeight: 500,
      fontSize: 18,
      textAlign: "center",
    },
    cameraSubTitle: {
      color: "#000000",
      fontWeight: 500,
      fontSize: 18,
    },
    cardAvatar: {
      width: 164,
      height: 164,
    },
    avatarText: {
      marginLeft: 50,
    },
    divider: {
      margin: 30,
      border: "0.05px solid rgba(0, 0, 0, -0.55)",
    },
    buttonGrid: {
      marginTop: 30,
    },
    buttonIcon: {
      width: 28,
      height: 28,
    },
  })
);

const Home = () => {
  const classes = useStyles();

  const [cameraPage, setCameraPage] = useState<boolean>(false);

  const handleCameraPage = () => {
    setCameraPage(true);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      {!cameraPage && (
        <Card className={classes.cameraCard}>
          <CardContent>
            <Typography className={classes.cameraTitle}>
              Do you have a document you would like to scan? Thats great
            </Typography>
            <br />
            <Typography className={classes.camerasubHeader}>
              With just three simple steps you can get your job done
            </Typography>
            <br />
            <List style={{ width: "100%" }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src="/document-photo.jpg"
                    className={classes.cardAvatar}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText className={classes.avatarText}>
                  <Typography className={classes.cameraSubTitle}>
                    1. Click a photo of your document using your camera
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider className={classes.divider} />
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src="/upload-big.png"
                    className={classes.cardAvatar}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText className={classes.avatarText}>
                  <Typography className={classes.cameraSubTitle}>
                    2. Upload the document using the finish button
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider className={classes.divider} />
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src="/relax.jpg"
                    className={classes.cardAvatar}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText className={classes.avatarText}>
                  <Typography className={classes.cameraSubTitle}>
                    3. Sit back and relax. We will process your photo and email
                    it to you as a pdf document!
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
            <Grid
              container
              justifyContent="center"
              className={classes.buttonGrid}
            >
              <Button
                variant="contained"
                onClick={handleCameraPage}
                color="secondary"
                endIcon={<DirectionsRunIcon className={classes.buttonIcon} />}
              >
                <Typography style={{ textTransform: "initial" }}>
                  Lets Go
                </Typography>
              </Button>
            </Grid>
          </CardContent>
        </Card>
      )}
      {cameraPage && <CameraPage setCameraPage={setCameraPage} />}
    </Grid>
  );
};

export default Home;
