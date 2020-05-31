import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import Nomessages from '../components/Nomessage';
import WorkFowContainer from '../components/WorkFlowContainer'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    mainBlock: {
        height: '100px',
        padding: '24px',
        boxSizing: 'border-box',
        display: 'flex'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        bottom: '10px'
    },
    create:{
        textTransform:'capitalize',
        padding:'24px',
        backgroundColor:'#14bc50',
        marginLeft:'auto',
        '&:hover': {
            backgroundColor: '#14bc50'
          }
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: '24px'
    }
}));

const WorkFlow = (props) => {

    const classes = useStyles();

    const WorkFlowData = useSelector(state => state.workFlow || {});

    const dispatch = useDispatch();

    const createWorkflow=(event)=>{
        const workData={...WorkFlowData};
        const workFlowId=uuidv4();
        const workFlowName='';
        workData[workFlowId]={
            workFlowName:'',
            workFlowId,
            taskData:[],
            workFlowStatus:'PENDING'
        }
        dispatch({
            type: "UPDATEWORKFLOW",
            updatedWorkFlow: workData
        })
        dispatch({
            type:"TASKDATA",
            updatedWorkFlowId:workFlowId,
            updatedWorkFlowname:workFlowName
        })
        props.history.push('/create');
    }

    const deleteData=(deleteId)=>{
        const data={...WorkFlowData}
        delete data[deleteId];
        dispatch({
            type: "UPDATEWORKFLOW",
            updatedWorkFlow: data
        })
    }

    const modifyStatus=(statusId,status)=>{
        const data={...WorkFlowData};
        data[statusId].workFlowStatus=status;
        dispatch({
            type: "UPDATEWORKFLOW",
            updatedWorkFlow: data
        })
    }

    const cardClick=(id,name)=>{
        dispatch({
            type:"TASKDATA",
            updatedWorkFlowId:id,
            updatedWorkFlowname:name
        })
        props.history.push('/create');
    }

    console.log(WorkFlowData)
    return (
        <div>
            <Paper elevation={3} className={classes.mainBlock}>
                <Paper component="form" className={classes.root}>
                    <IconButton className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Workflows"
                        inputProps={{ 'aria-label': 'search Workflows' }}
                    />
                </Paper>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="filter">Filter</InputLabel>
                    <Select
                        labelId="filter_label"
                        id="filter"
                        // value={age}
                        // onChange={handleChange}
                        label="Filter"
                    >
                        <MenuItem value={"ALL"}>ALL</MenuItem>
                        <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                        <MenuItem value={"PENDING"}>PENDING</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained" color="primary"
                    startIcon={<AddIcon />}
                    className={`${classes.create}`}
                    onClick={(event)=>createWorkflow(event)}
                    >
                    Create Workflow
            </Button>
            </Paper>
            <div className={classes.container}>
            {Object.keys(WorkFlowData).length>0?Object.keys(WorkFlowData).map((data,index)=>{
                   return <WorkFowContainer data={WorkFlowData[data]} key={WorkFlowData[data].workFlowId}
                    indexValue={index} deleteData={(deleteId)=>deleteData(deleteId)}
                    modifyStatus={(statusId,status)=>modifyStatus(statusId,status)}
                    cardClick={(id,name)=>cardClick(id,name)}/>
            }):
             <Nomessages message="Create WorkFlow" />}
             </div>
        </div>
    );
}

export default WorkFlow