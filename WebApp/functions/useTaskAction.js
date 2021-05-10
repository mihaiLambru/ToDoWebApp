import { useState, useEffect } from 'react';
import axios from '../axios';

function useTaskAction(arrayProp, setArrayProp) {


    const shouldUpdate = (updatedArray) => {
        if (!Array.isArray(updatedArray)) {
            return false;
        }
        else if (updatedArray === array) {
            return false;
        }
        return true;
    }

    const setArrayHandler = (updatedArray) => {
        if (shouldUpdate) {
            setArrayProp(updatedArray)
        }
    }

    const completeHandler = (index) => {

        axios.put("task", {
            completed: !arrayProp[index].completed
        }, {
            params: { taskId: arrayProp[index].id }
        })
            .then(() => {
                const updatedArray = [...arrayProp];
                updatedArray[index].completed = !arrayProp[index].completed;
                setArrayHandler(updatedArray);
            })
            .catch(err => {
                console.log(err.message);
            })

    }
    const deleteHandler = (index) => {

        axios.delete("task", {
            params: { taskId: arrayProp[index].id }
        })
            .then(() => {
                let updatedArray = [...arrayProp];
                updatedArray[index].isDeleted = true;
                setArrayHandler(updatedArray);
            })
            .catch(err => {
                console.log(err.message);
            })


    }


    return [(index) => completeHandler(index), (index) => deleteHandler(index)];
}

export default useTaskAction;