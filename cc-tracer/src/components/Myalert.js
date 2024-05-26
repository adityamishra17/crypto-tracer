import { Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import React from "react";
import { CryptoState } from "../CryptoContext";

const Myalert = () => {
    const { alert, setAlert } = CryptoState();

    /* code for positon of alert message start here--- */
    const [state] = React.useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal} = state;

    /* code for positon of alert message end here--- */
  
    const handleCloseAlert = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setAlert({ open: false });
    };
  
    return (
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleCloseAlert}
          elevation={10}
          variant="filled"
          severity={alert.type}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    );
  };
  
  export default Myalert;