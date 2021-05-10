import React, { useEffect, useState } from 'react';
import styled from 'styled-components'


import * as actionCreators from '../store/actions/index';
import { connect } from 'react-redux';

const Wrapper = styled.div`
    padding: 10px;
    box-shadow: 2px 2px 5px white;
    background-color:rgba(255,255,255,0.5);
    border-radius:20px;

`
const Data = styled.span`
    font-weight:bold;
    font-size:large;
`
const TasksDetails = (props) => {
    const [state, setState] = useState({ uncompletedTasks: 0, completedTasks: 0, totalTasks: 0 });


    useEffect(() => {
        const updatedState = { uncompletedTasks: 0, completedTasks: 0, totalTasks: 0 };
        props.tasksData.tasks.forEach(element => {
            if (element.isDeleted !== true) {
                if (element.completed) {
                    updatedState.completedTasks++;
                }
                else {
                    updatedState.uncompletedTasks++;
                }
                updatedState.totalTasks++;
            }
        });
        setState(updatedState);
    }, [props.tasksData.tasks])

    return (
        <Wrapper>
            <p>Uncompleted tasks: <Data>{state.uncompletedTasks}</Data></p>
            <p>Completed tasks: <Data>{state.completedTasks}</Data></p>
            <p>Total tasks : <Data>{state.totalTasks}</Data></p>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        tasksData: state.tasks,
    }
}

export default connect(mapStateToProps)(TasksDetails);