import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    header: {
        height: '64px',
        backgroundColor: '#a900b0',
        boxSizing: 'border-box',
        display: 'block',
        padding:'16px' 
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

    const classes = useStyles();
  
  return (
    <header className={classes.header}>
    <h3 className={classes.heading}>FLOWAPP</h3>
    <Button variant="contained" className={classes.logOut} >Logout</Button>
    </header>
  );
}

export default Header;
