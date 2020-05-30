import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
import { useDispatch } from "react-redux";
import validator from 'validator';

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
    textTransform: 'capitalize',
  },
  checkboxStyle: {
    float: 'left',
    marginBottom: '24px'
  },
  link: {
    marginLeft: '5px'
  }
}));

const Login = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [rememberMe, setRememberme] = useState(false);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const handleChange = () => {
    setRememberme(!rememberMe);
  };

  const changeUserEmail = (event) => {
    setUserEmail(event.target.value);
    setEmailError();
  }
  const validateEmail = () => {
    if (userEmail === '' || !userEmail) {
      setEmailError('please enter email address');
    } else {
      const validEmail = validator.isEmail(userEmail);
      if (!validEmail) {
        setEmailError('enter valid email address');
      }
    }
  }

  const changeUserPassword = (event) => {
    setUserPassword(event.target.value);
    setPasswordError();
  }

  const validateUserPassword = () => {
    if (userPassword === '' || !userPassword) {
      setPasswordError('please enter password');
    } else if (userPassword.length < 8) {
      setPasswordError('min length of password is 8');
    }
  }

  const fieldKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userEmail && !userPassword) {
      setPasswordError('please enter password');
      setEmailError('please enter email address');
    } else if (userEmail && !userPassword && !validator.isEmail(userEmail)) {
      setPasswordError('please enter password');
      setEmailError('enter valid email address');
    } else if (!userEmail && userPassword && userPassword.length < 8) {
      setEmailError('please enter email address');
      setPasswordError('min length of password is 8');
    } else if (userEmail && !userPassword) {
      setPasswordError('please enter password');
    } else if (!userEmail && userPassword) {
      setEmailError('please enter email address');
    } else if (!validator.isEmail(userEmail)) {
      setEmailError('enter valid email address');
    } else if (userPassword.length < 8) {
      setPasswordError('min length of password is 8');
    } else if (userEmail && userPassword && !emailError && !passwordError) {
      dispatch({
        type: "AUTHENTICATE",
        login: true
      })
      props.history.push('/dashboard');
    }
  }

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
              startAdornment: <InputAdornment position="start"><MailOutlineIcon color={emailError ? "error" : "disabled"} /></InputAdornment>,
            }}
            onChange={(event) => { changeUserEmail(event) }}
            onBlur={() => validateEmail()}
            onKeyPress={(event) => fieldKeyPress(event)}
            helperText={emailError}
            value={userEmail}
            error={emailError ? true : false}
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
              startAdornment: <InputAdornment position="start"><VpnKeySharpIcon color={passwordError ? "error" : "disabled"} /></InputAdornment>,
            }}
            onChange={(event) => { changeUserPassword(event) }}
            onBlur={() => validateUserPassword()}
            onKeyPress={(event) => fieldKeyPress(event)}
            value={userPassword}
            helperText={passwordError}
            error={passwordError ? true : false}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
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
            className={`${classes.marginTop24} ${classes.loginButton}`}
            onClick={(event) => handleSubmit(event)}
            onKeyPress={(event) => fieldKeyPress(event)}>
            Login
            </Button>
          <div className={`${classes.marginTop24} font`}><span>Don't Have an account?.</span><a className={classes.link} href="/">Sign up here</a></div>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
