export default {
  palette: {
    primary: {
      light: "#33c9dc",
      dark: "#008394",
      main: "#00bcd4",
      contrastText: "#fff",
    },
    secondary: {
      dark: "#b22a00",
      light: "#ff6333",
      main: "#ff3d00",
      contrastText: "#fff",
    },
  },
  spread: {
    typography: {
      userNextVariant: true,
    },
    form: {
      textAlign: "center",
    },
    pageTitle: {
      margin: "30px auto 20px",
    },
    TextField: {
      margin: "10px auto",
    },
    button: {
      margin: "20px auto",
      position: "relative",
    },
    customError: {
      color: "#f44336",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      marginTop: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 150,
        height: 150,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "right",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#00bcd4",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
};
