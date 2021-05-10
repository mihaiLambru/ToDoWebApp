import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from '../axios';
import Task from '../components/Task';

//redux
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import tasksReducer from '../store/reducers/tasksReducer';
import TasksDetails from '../components/TasksDetails';
import UserPanel from '../components/UserPanel';
import TasksPanel from '../components/TasksPanel';
import BackgroundEffect from '../components/BackgroundEffect'

import styled from 'styled-components';


const rootReducer = combineReducers({
    tasks: tasksReducer,
});


const store = createStore(rootReducer);

const Wrapper = styled.div`
    display: inline-flex;
    width:100%;
    font-family:Bradley Hand, cursive;
    color:#6d2d00;
`
const InfoPanelDiv = styled.div`
    display:block;
    top:20px;
    position:sticky;
    width:15%;
    z-index:10;
    margin-right: 0%;
    margin-left:2%;
    height:100%;

`
const TasksPanelDiv = styled.div`
    display: inline-block;
    margin:auto;
    margin-top:20px;
    width:55%;
    z-index:10;
`

const indexPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    useEffect(() => {
        if (userId === undefined) {
            router.push('/?userId=1');
        }
    }, [])

    return (
        <Provider store={store}>
            <Wrapper>
                <InfoPanelDiv>
                    <UserPanel />
                    <TasksDetails />
                </InfoPanelDiv>
                <TasksPanelDiv>
                    <TasksPanel />
                </TasksPanelDiv>
            </Wrapper>
            <BackgroundEffect />
        </Provider>)
}
export default indexPage;