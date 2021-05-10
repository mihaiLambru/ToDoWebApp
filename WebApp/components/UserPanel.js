import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


import * as actionCreators from '../store/actions/index';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 10px;
    box-shadow: 2px 2px 5px white;
    background-color:rgba(255,255,255,0.5);
    margin-bottom:20%;
    border-radius:20px;
`
const Data = styled.span`
    font-weight:bold;
    font-size:large;
`

const UserPanel = (props) => {
    const router = useRouter();
    const { userId } = router.query;
    const [rating, setRating] = useState(0);
    useEffect(() => {
        let score = 0
        props.tasksData.tasks.forEach(element => {
            if (element.completed && element.isDeleted !== true) {
                score++;
            }
        });
        if (score > 10) setRating(1);
        else if (score > 50) setRating(2);
        else if (score > 100) setRating(3);
        else if (score > 150) setRating(4);
        else if (score > 500) setRating(5);
        else setRating(0);
    }, [props.tasksData.tasks])

    return (
        <Wrapper>

            <p>User ID: <Data>{userId}</Data></p>
            <p>Rating: <Data>{rating}</Data></p>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        tasksData: state.tasks,
    }
}
export default connect(mapStateToProps)(UserPanel);