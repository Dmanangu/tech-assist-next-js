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
    minHeight: "80vh",
  },
  loginCard: {
    marginTop: 250,
    marginLeft: 550,
    width: 500,
    height: 250,
    backgroundColor: "#e3dddd",
    opacity: 0.8,
  },
  supportCard: {
    marginLeft: "65%",
    marginTop: "5%",
    width: 500,
    height: 500,
    backgroundColor: "#e4dee0",
  },
  color: {
    backgroundColor: "#f5970a",
  },
  center: {
    textAlign: "center",
    padding: 20,
  },
});

export default useStyles;
