module.exports = function taskIsValid(task) {
    if (task.id < 0 && task.userId < 0 && task.title === undefined && task.completed === undefined)
        return false;

    tasksData.forEach(element => {
    });
    for (let i = 0; i <= tasksData.length; i++) {
        if (tasksData[i].id == task.id) return false

    }

    return true;
}

