import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import TaskContainer from '../components/TaskContainer';
import Nomessages from '../components/Nomessage';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    mainBlock: {
        height: '100px',
        padding: '24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row'
    },
    save: {
        height: '38px',
        textTransform: 'capitalize',
        margin: theme.spacing(1),
    },
    add: {
        height: '38px',
        textTransform: 'capitalize',
        margin: theme.spacing(1),
        backgroundColor: '#14bc50',
        '&:hover': {
            backgroundColor: '#14bc50'
        }
    },
    name: {
        marginRight: 'auto',
        margin: theme.spacing(1)
    },
    delete: {
        height: '38px',
        textTransform: 'capitalize',
        margin: theme.spacing(1),
        backgroundColor: '#fd072a',
        '&:hover': {
            backgroundColor: '#fd072a'
        }
    },
    shuffle: {
        height: '38px',
        textTransform: 'capitalize',
        margin: theme.spacing(1),
        backgroundColor: '#7800b7',
        '&:hover': {
            backgroundColor: '#7800b7'
        }
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: '24px'
    },
    show:{
        display:'flex'
    },
    hide:{
        display:'none'
    } 
}));

const CreateTasks = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const workFlowId = useSelector(state => state.workFlowId);
    const WorkFlowData = useSelector(state => state.workFlow);
    const { workFlowName, taskData,workFlowStatus } = WorkFlowData[workFlowId];
    const [tasks, setTasks] = useState(taskData);
    const [name, setName] = useState(workFlowName);
    const [nameError, setNameError] = useState();
    const [addError, setaddError] = useState(false);

    const setWorkFlowName = (event) => {
        setName(event.target.value);
        setNameError();
    }

    const addTask = () => {
        const length = tasks.length;
        if ((length > 0 && tasks[length - 1].taskName !== '') || length === 0) {
            const id = uuidv4();
            const taskName = '';
            const taskDescription = '';
            const taskStatus = 'pending';
            const taskData = [...tasks];
            taskData.push({ id, taskName, taskDescription, taskStatus });
            setTasks(taskData);
            setaddError(false);
        } else {
            setaddError(true);
            const taskData = [...tasks];
            setTasks(taskData);
        }
    }

    const deleteTask = () => {
        const previousData = [...tasks]
        previousData.pop();
        setTasks(previousData)
    }

    const saveTask = () => {
        const length = tasks.length;
        if (!name && length > 0 && tasks[length - 1].taskName === '') {
            setNameError("please provide workflow name");
            setaddError(true);
            const taskData = [...tasks];
            setTasks(taskData);
        } else if (!name && length > 0 && tasks[length - 1].taskName !== '') {
            setNameError("please provide workflow name");
        } else if (name && length > 0 && tasks[length - 1].taskName === '') {
            setaddError(true);
            const taskData = [...tasks];
            setTasks(taskData);
        } else if (!name && length === 0) {
            setNameError("please provide workflow name");
        } else {
            setNameError();
            const updatedData = { ...WorkFlowData };
            updatedData[workFlowId].workFlowName = name;
            updatedData[workFlowId].taskData = tasks;
            if(workFlowStatus === 'COMPLETED'){
                let done=true;
                for(let i=0;i<tasks.length;i++){
                    if(tasks[i].taskStatus !=="completed"){
                        done=false;
                    }
                }
                if(!done){
                    updatedData[workFlowId].workFlowStatus="PENDING"
                }
            }
            dispatch({
                type: "UPDATEWORKFLOW",
                updatedWorkFlow: updatedData
            })
            dispatch({
                type:"TASKDATA",
                updatedWorkFlowId:'',
                updatedWorkFlowname:''
            })
            props.history.push('/dashboard');
        }
    }

    const shuffleTask = () => {
      const data=[...tasks];
      const shuffleData=_.shuffle(data);
      setTasks(shuffleData);
    }

    const modifyData = (data, index) => {
        const taskData = [...tasks];
        taskData[index] = data;
        setTasks(taskData);
        setaddError(false);
    }

    const modifyTask = (data) => {
        setTasks(data);
    }

    const propageteError = () => {
        setaddError(true)
    }
    return (
        <div>
            <Paper elevation={3} className={classes.mainBlock}>
                <TextField
                    id="name"
                    type="text"
                    required
                    autoComplete="off"
                    variant="outlined"
                    placeholder="WORKFLOW NAME"
                    size="small"
                    className={classes.name}
                    onChange={(event) => setWorkFlowName(event)}
                    value={name}
                    helperText={nameError}
                    error={nameError ? true : false}
                />
                <Button
                    variant="contained" color="primary"
                    className={`${classes.shuffle} ${workFlowStatus==="COMPLETED"?classes.show:classes.hide}`}
                    startIcon={<ShuffleIcon />}
                    onClick={() => shuffleTask()}
                >
                    Shuffle
                </Button>
                <Button
                    variant="contained" color="primary"
                    className={`${classes.delete}`}
                    startIcon={<ClearIcon />}
                    onClick={() => deleteTask()}
                >
                    Delete
                </Button>
                <Button
                    variant="contained" color="primary"
                    className={`${classes.add}`}
                    startIcon={<AddIcon />}
                    onClick={() => addTask()}
                >
                    Add Node
                </Button>
                <Button
                    variant="contained" color="primary"
                    className={`${classes.save}`}
                    onClick={() => saveTask()}
                >
                    Save
                </Button>
            </Paper>
            <div className={classes.container}>
                {tasks.length > 0 ? tasks.map((value, index) => {
                    return <TaskContainer key={value.id} taskData={value} indexValue={index}
                        modifyData={(data, index) => modifyData(data, index)} addError={addError}
                        modifyTask={(data) => modifyTask(data)} length={tasks.length} tasks={tasks}
                        propageteError={() => propageteError()} />
                }) : <Nomessages message="Add tasks" />}
            </div>
        </div>
    );
}

export default CreateTasks