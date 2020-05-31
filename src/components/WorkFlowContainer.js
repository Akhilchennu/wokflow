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
    },
    delete:{
        fill:'#fd072a'
    }
}));

const WorkFlowContainer=(props)=>{

    const classes = useStyles();

    const [show,setShow]=useState("hidden");
    const {data:{workFlowName,workFlowId,workFlowStatus,taskData},indexValue,
    deleteData,modifyStatus,cardClick}=props;

    const deleteClick=()=>{
        deleteData(workFlowId);
    }

    const statusClick=(event)=>{
        event.preventDefault();
        let status='PENDING'
        if(workFlowStatus === 'PENDING'){
            let  done=true;
            for(let i=0;i<taskData.length;i++){
                 if(taskData[i].taskStatus !== 'completed'){
                     done=false;
                     break;
                 }
            }
             if(done){
                 status='COMPLETED';
             }
        }else if(workFlowStatus === 'COMPLETED'){
            status='PENDING'
        }

        if(workFlowStatus !== status){
            modifyStatus(workFlowId,status);
        }
        event.stopPropagation();
    }

    const workCardClick=()=>{
       cardClick(workFlowId,workFlowName);
    }

    return(
      <Paper className={classes.container} onClick={()=>workCardClick()} onMouseOver={()=>setShow("visible")} onMouseLeave={()=>setShow("hidden")}>
          <HighlightOffIcon className={`${classes.delete} iconStyle`} visibility={show} onClick={()=>deleteClick()}/>
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
      <CheckCircleIcon className={`${classes[workFlowStatus]} floatStyle`} onClick={(event)=>statusClick(event)}/>
      </div>
      </Paper>    
    );
}

export default WorkFlowContainer