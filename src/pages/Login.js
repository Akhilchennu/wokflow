import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';

const useStyles = makeStyles((theme) => ({
  AppHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    minHeight: '76vh'
  },
  appBase: {
    padding: `8% 4% 10% 4%`,
    textAlign: 'center'
  },
  marginTop24: {
    marginTop: '24px'
  },
  loginButton: {
    width: '100%',
    display: 'block',
    // backgroundColor:'#3a5cd9',
    textTransform:'capitalize',
  },
  checkboxStyle:{
    float:'left',
    marginBottom:'24px'
  }
}));

function Login() {
  const classes = useStyles();

  const handleChange = (event) => {
  };

  return (
    <div className={classes.AppHeader}>
      <Paper className="paperStyle" elevation={3}>
        <div className={classes.appBase}>
          <div className="header">Login</div>
          <TextField
            id="email"
            type="text"
            fullWidth
            required
            autoComplete="off"
            variant="outlined"
            placeholder="Email"
            className={classes.marginTop24}
            InputProps={{
              startAdornment: <InputAdornment position="start"><MailOutlineIcon color="disabled"/></InputAdornment>,
            }}
          />
          <TextField
            id="password"
            type="password"
            fullWidth
            required
            className={classes.marginTop24}
            autoComplete="off"
            variant="outlined"
            placeholder="Password"
            InputProps={{
              startAdornment: <InputAdornment position="start"><VpnKeySharpIcon color="disabled"/></InputAdornment>,
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={true}
                onChange={handleChange}
                name="Remember me"
                color="primary"
              />
            }
            className={`${classes.checkboxStyle} ${classes.marginTop24}`}
            label="Remember me"
          />
          <Button
            variant="contained" color="primary"
            className={`${classes.marginTop24} ${classes.loginButton}`}>
            Login
            </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
