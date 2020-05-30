import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSelector  } from 'react-redux';
import { useDispatch  } from "react-redux";
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    header: {
        height: '64px',
        backgroundColor: '#a900b0',
        boxSizing: 'border-box',
        display: 'block',
        padding:'16px' ,
        border:'0.5px solid #00000030'
    },
    heading:{
        float:'left',
        margin:0,
        color:'#fff'
    },
    logOut:{
        float:'right',
        backgroundColor:'#fff',
        textTransform:'capitalize',
        height:'30px'
    }
}));

const Header=(props)=> {
    const dispatch = useDispatch();
    const loginSession = useSelector(state => state.loginSession || false);
    const classes = useStyles();

    const logOut=async ()=>{
       await dispatch({
            type: "AUTHENTICATE",
            login:false
        })
        props.history.push('/');
    }
  
  return (
    <header className={classes.header}>
    <h3 className={classes.heading}>FLOWAPP</h3>
    {loginSession?<Button variant="contained" className={classes.logOut} onClick={()=>logOut()}>Logout</Button>:null}
    </header>
  );
}

export default withRouter(Header);
