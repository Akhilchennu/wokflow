import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
    pending: {
        fill: '#c9c9c9',
    },
    completed: {
        fill: '#13b74e'
    },
    inprogress: {
        fill: '#3e7be8'
    }

}));

const TaskContainer = (props) => {

    const classes = useStyles();

    const { modifyTask, tasks, taskData: { id, taskName, taskDescription, taskStatus }, modifyData,
        indexValue, addError, length, propageteError } = props;

    const taskNameChange = (event) => {
        const data = {
            id,
            taskName: event.target.value,
            taskDescription,
            taskStatus
        }
        modifyData(data, indexValue)
    }

    const taskDescriptionChange = (event) => {
        const data = {
            id,
            taskName,
            taskDescription: event.target.value,
            taskStatus
        }
        modifyData(data, indexValue)
    }

    const onStatusClick = (event) => {
        if (tasks[indexValue].taskName === '' || !tasks[indexValue].taskName) {
            propageteError();
        } else {
            const status = taskStatus === 'pending' ? 'inprogress' : taskStatus === 'inprogress' ? 'completed' : 'pending';
            const updateData = [...tasks];
            if (taskStatus === 'completed') {
                if (updateData.length > 0) {
                    for (let i = indexValue; i < updateData.length; i++) {
                        updateData[i].taskStatus = 'pending';
                    }
                } else {
                    updateData[indexValue].taskStatus = 'pending';
                }
            } else if (taskStatus === 'inprogress') {
                if (updateData.length > 0) {
                    let done = true;
                    for (let i = 0; i < indexValue; i++) {
                        if (updateData[i].taskStatus !== 'completed') {
                            done = false;
                            break;
                        }
                    }
                    if (done) {
                        updateData[indexValue].taskStatus = 'completed';
                    }
                } else {
                    updateData[indexValue].taskStatus = 'completed';
                }
            } else if (taskStatus === 'pending') {
                updateData[indexValue].taskStatus = 'inprogress';
            }
            modifyTask(updateData)
        }
    }

    return (
        <Paper className={classes.container}>
            <CheckCircleIcon className={`${classes[taskStatus]} iconStyle`} onClick={() => onStatusClick()} />
            <TextField
                type="text"
                required
                autoComplete="off"
                variant="outlined"
                placeholder="Task Name"
                fullWidth
                className={classes.margintop}
                value={taskName}
                onChange={(event) => taskNameChange(event)}
                helperText={addError && length - 1 === indexValue && "Add details to continue"}
                error={addError && length - 1 === indexValue ? true : false}
            />
            <TextField
                multiline
                rows={10}
                variant="outlined"
                fullWidth
                className={classes.margintop}
                value={taskDescription}
                onChange={(event) => taskDescriptionChange(event, indexValue)}
            />
        </Paper>
    );
}

export default TaskContainer;