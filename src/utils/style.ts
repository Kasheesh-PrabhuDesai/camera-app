import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    navbar: {
      backgroundColor: "#228288",
    },
    brand: {
      color: "#FEFEFE",
      fontWeight: "bold",
      fontSize: "1.5rem",
      textAlign: "center",
    },
    main: {
      minHeight: "80vh",
    },
  })
);
export default useStyles;
