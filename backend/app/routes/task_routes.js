const fs = require('fs');
const fileName = 'D:\\Proiecte\\ToDoWebApp\\backend\\app\\data\\taskData.json';

function readFile(execute) {
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        execute(JSON.parse(data));
    });
}
module.exports = function (app, db) {

    app.post('/task', (req, res) => {
        try {
            readFile((tasksData) => {
                const sentObj = req.body
                //check validity
                console.log(sentObj);
                if (sentObj.userId < 0 && sentObj.userId === undefined && sentObj.title === undefined) {
                    res.status(400).send({ message: "Invalid data format!" })
                    return;
                }

                if (tasksData.length > 0)
                    sentObj.id = tasksData[tasksData.length - 1].id + 1
                else
                    sentObj.id = 1

                sentObj.completed = false;
                tasksData.push(sentObj)
                //write to file
                fs.writeFile(fileName, JSON.stringify(tasksData), err => { if (err) throw err; })
                res.status(201).send({ ...sentObj })
            })
        }
        catch (err) {
            console.log(err);
            res.status(400).send({ message: "Error: " + err.message });
        }
    });
    app.get("/task", (req, res) => {
        readFile((data) => {
            const userId = req.query.userId;
            //validare parametru
            if (userId === undefined) {
                res.status(400).send({ message: "User ID not provided!" })
                return;
            }
            let filtredTasks = data.filter(task => task.userId == userId);

            res.status(200).send(filtredTasks);
        })

    })
    app.delete("/task", (req, res) => {
        readFile((tasksData) => {
            const taskId = req.query.taskId;
            //validare parametru
            if (taskId == undefined && taskId == null && taskId == "") {
                res.status(400).send({ message: "Task ID not provided!" })
                return;
            }
            let deletedTask = null;
            tasksData = tasksData.filter(task => {
                if (task.id == taskId) {
                    deletedTask = { ...task };
                    return false;
                }
                return true
            });
            //write to file
            fs.writeFile(fileName, JSON.stringify(tasksData), err => { if (err) throw err; })


            let message = "No task deleted!";
            if (deletedTask !== null) {
                message = `Task [${deletedTask.title}] was succesfully deleted!`;
            }

            res.status(200).send({ message: message });
        })
    })
    app.put("/task", (req, res) => {//editare
        readFile((tasksData) => {

            const taskId = req.query.taskId;
            const completedStatus = req.body.completed;
            //validation
            if (taskId === undefined || completedStatus === undefined) {
                res.status(400).send({ message: "Task ID not provided!" })
                return;
            }
            let modifiedTask = null;
            tasksData = tasksData.map(task => {
                if (task.id == taskId) {
                    modifiedTask = { ...task };
                    modifiedTask.completed = completedStatus;
                    task.completed = completedStatus;
                }
                return task
            });
            //write to file
            fs.writeFile(fileName, JSON.stringify(tasksData), err => { if (err) throw err; })

            let message = "No task deleted!";
            if (modifiedTask !== null) {
                message = `Task [${modifiedTask.title}] was succesfully deleted!`;
            }

            res.status(200).send({ message: message });
        })
    })
};
