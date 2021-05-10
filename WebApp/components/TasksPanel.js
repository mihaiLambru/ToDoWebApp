import React, { useEffect, useState } from 'react';
import axios from '../axios';

import * as actionCreators from '../store/actions/index';
import { connect } from 'react-redux';
import Task from './Task';
import { useRouter } from 'next/router';
import styled from 'styled-components'
import useTaskAction from '../functions/useTaskAction';

const Wrapper = styled.div`
    width:100%;
    height:100%;
    margin:auto;
    text-align:center;
    position:relative;

`
const Input = styled.input`
    position:sticky;
    top:0px;
    transition: 0.5s ease-out;
    padding: 10px;
    box-shadow: 2px 2px 5px white;
    background-color:#A7AAE4;
    border:1px solid #A7AAE4;
    margin-left:10px;
    margin-right:10px;
    margin-bottom:40px;
    width:40%;
    :focus{
        outline:none;
        padding-bottom:15px;
        margin-bottom: 35px;
        border: 1px solid white;
    }
    border-radius:20px;
`
const TasksWrapper = styled.div`

`
const TasksPanel = (props) => {
    const [completeTaskHandler, deleteTaskHandler] = useTaskAction(props.tasksData.tasks, props.setTasksArray);
    const [newTask, setNewTask] = useState("");
    const [searchValue, setSearchValue] = useState("")
    const router = useRouter();
    const { userId } = router.query;

    useEffect(() => {
        if (userId === undefined) {
            return;
        }
        axios.get("task", {
            params: { userId: userId }
        })
            .then((res) => {
                const data = res.data.map(element => ({ ...element, isShown: true }));
                props.setTasksArray(data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [userId])

    const addNewTask = (event) => {
        if (event.key === 'Enter') {
            const task = {
                userId: userId,
                title: newTask
            }
            axios.post("task", {
                ...task
            })
                .then((res) => {
                    const updatedTasksArray = [...props.tasksData.tasks];
                    const addedTask = { ...res.data, isShown: true };
                    updatedTasksArray.push(addedTask);
                    props.setTasksArray(updatedTasksArray);
                    setNewTask("");
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
    }
    const filterResults = (filter, array) => {
        filter = filter.toUpperCase();
        let updatedArray = array.map(element => ({ ...element, isShown: false }));
        let shownValues = 0;
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            let title = element.title;
            if (title.toUpperCase().indexOf(filter) > -1) {
                updatedArray[i].isShown = true;
                shownValues++;
                if (shownValues === 3) i = array.length
            }
        }
        return updatedArray;
    }
    const searchHandler = (event) => {
        const value = event.target.value
        //filter deleted tasks
        let updatedArray = props.tasksData.tasks.filter(element => element.isDeleted !== true);
        //if search input is empty
        if (value === "") {
            //set isShown = true
            updatedArray = updatedArray.map(element => ({ ...element, isShown: true }));
            props.setTasksArray(updatedArray);
        }
        //if searching...
        else {
            updatedArray = filterResults(value, updatedArray);
        }
        //set state
        props.setTasksArray(updatedArray);
        setSearchValue(value);
    }
    return (
        <Wrapper>
            <Input type="text" placeholder="Add..." value={newTask} onKeyDown={addNewTask} onChange={(event) => setNewTask(event.target.value)} />
            <Input type="text" placeholder="Search..." value={searchValue} onChange={searchHandler} />
            <TasksWrapper>
                {props.tasksData.tasks.map((task, index) => (
                    task.isShown ?
                        <Task
                            completeHandler={() => completeTaskHandler(index)}
                            deleteHandler={() => deleteTaskHandler(index)}
                            key={index}
                            taskData={task}
                        />
                        : null
                ))}
            </TasksWrapper>
        </Wrapper >
    )
}


const mapStateToProps = state => {
    return {
        tasksData: state.tasks,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTasksArray: (tasksArray) => dispatch(actionCreators.setTasks(tasksArray)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TasksPanel);