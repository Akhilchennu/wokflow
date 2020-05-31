import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    noTask: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height:'70vh'
    }
}));

const Nomessages = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.noTask}>
            <span>{`${props.message}..`}</span>
        </div>
    );
}

export default Nomessages;