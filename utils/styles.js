import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#a5a3a8",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minWidth: "85vw",
    minHeight: "85vh",
  },
  color: {
    backgroundColor: "#f5970a",
  },
  footer: {
    textAlign: "center",
  },
});

export default useStyles;
