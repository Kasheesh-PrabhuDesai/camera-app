import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Grid,
  Button,
  makeStyles,
  createStyles,
} from "@material-ui/core";
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
    cameraSubHeader: {
      color: "#000000",
      fontWeight: 500,
      fontSize: 18,
      textAlign: "center",
    },
    cameraSubTitle: {
      color: "#454545",
      fontWeight: 400,
      fontSize: 16,
    },
    cardAvatar: {
      width: 164,
      height: 164,
      [theme.breakpoints.down("sm")]: {
        width: 84,
        height: 84,
      },
    },
    avatarText: {
      marginLeft: 20,
      [theme.breakpoints.down("sm")]: {
        marginLeft: 10,
        display: "flex",
      },
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

interface InstructionsPageProps {
  setCameraPage: (arg: boolean) => void;
}

export default function InstructionsPage({
  setCameraPage,
}: InstructionsPageProps) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.cameraCard}>
        <CardContent>
          <Typography className={classes.cameraTitle}>
            Do you have a document you would like to upload? Thats great
          </Typography>
          <br />
          <Typography className={classes.cameraSubHeader}>
            With just three simple steps you can get your job done
          </Typography>
          <br />
          <List style={{ maxWidth: "100%" }}>
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
                  2. Upload the document using the finish button. Enter your
                  desired email address and click continue.
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
                  3. Sit back and relax. We will process your photo and email it
                  as a pdf document!
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
              onClick={() => setCameraPage(true)}
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
    </>
  );
}
