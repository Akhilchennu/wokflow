import React,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '20%',
        padding: '0px 16px 16px',
        boxSizing: 'border-box',
        margin: '16px'
    },
    margintop: {
        marginTop: '16px'
    },
    PENDING: {
        fill: '#c9c9c9',
        cursor:'pointer'
    },
    COMPLETED: {
        fill: '#13b74e',
        cursor:'pointer'
    },
    name:{
        paddingTop:'16px'
    }
}));

const WorkFlowContainer=(props)=>{

    const classes = useStyles();

    const [show,setShow]=useState("hidden");
    const {data:{workFlowName,workFlowId,workFlowStatus},indexValue,deleteData}=props;

    const deleteClick=()=>{
        deleteData(workFlowId);
    }

    return(
      <Paper className={classes.container} onMouseOver={()=>setShow("visible")} onMouseLeave={()=>setShow("hidden")}>
          <HighlightOffIcon className="iconStyle" visibility={show} onClick={()=>deleteClick()}/>
      <TextField
                type="text"
                disabled
                variant="outlined"
                fullWidth
                className={classes.margintop}
                value={workFlowName}
            />
      <div className={classes.margintop}>
      <span>{workFlowStatus}</span>
      <CheckCircleIcon className={`${classes[workFlowStatus]} floatStyle`}/>
      </div>
      </Paper>    
    );
}

export default WorkFlowContainer