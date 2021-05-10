import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import styled, { css, keyframes } from 'styled-components';
import axios from '../axios';

const disappear = keyframes`
    from {
        transform: scale(1);
        height:50px;
        padding: 10px;
        margin-bottom:20px;
     }
     to {
        transform: scale(0);
        height:0px;
        padding: 0px;
        margin-bottom:0px;
     }
`
const appear = keyframes`
    from {
        transform: scale(0.6);
     }
     to {
        transform: scale(1);
     }
`
const animation = props => {
    if (props.isDeleted) {
        return css`${disappear}`
    }
    else {
        return css`${appear}`
    }
}
const TaskDiv = styled.div`
   
    transition:0.5s ease-out;
    display:flex;
    width:100%;
    box-shadow: 2px 2px 5px ${props => props.completed ? "rgba(103, 251, 103,1)" : "white"};
    background-color: ${props => props.completed ? "rgba(103, 251, 103,0.5)" : "rgba(255,255,255,0.5)"};
    border-radius:10px;
    padding:1%;


    :hover{
        background-color: ${props => props.completed ? "rgba(103, 251, 103,0.8)" : "rgba(255,255,255,0.8)"};
        cursor:pointer;
    }
    /*DELETE PROPS*/
    overflow:auto;
    animation:${animation}  0.5s ease-out;
    opacity:${props => props.isDeleted ? "1" : "1"};
    height:${props => props.isDeleted ? "0px" : "100%"};
    padding: ${props => props.isDeleted ? "0px" : "10px"};
    margin-bottom:${props => props.isDeleted ? "0px" : "20px"};
`
const DeleteButton = styled.button`
    transition: 0.5s ease-out;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-radius: 50px;
    height: 50px;
    width: 50px;
    :hover{
        background-color:rgba(255, 99, 71, 0.294);
        cursor:pointer;
    }
    margin-left:auto;

    
`


const Task = (props) => {

    const deleteHandler = (event) => {
        event.stopPropagation();
        props.deleteHandler();
    }
    return (
        <TaskDiv
            completed={props.taskData.completed}
            isDeleted={props.taskData.isDeleted === true}
            onClick={props.completeHandler}
        >
            <p >{props.taskData.title}</p>
            <DeleteButton
                onClick={deleteHandler}>
                <DeleteIcon color="secondary" />
            </DeleteButton>
        </TaskDiv>
    )
}

export default Task;