import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "../../utils/style";

function Layout({ children, description, title }: any) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar disableGutters>
            <Box display="flex" width={"95%"} justifyContent={"center"}>
              <Typography className={classes.brand}>
                MieterEngel Coding Challenge
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        {/* <footer className={classes.footer}>
          <Typography>
            Developed with ❤️️ in Aachen by Kasheesh PrabhuDesai
          </Typography>
        </footer> */}
      </ThemeProvider>
    </div>
  );
}

export default Layout;
