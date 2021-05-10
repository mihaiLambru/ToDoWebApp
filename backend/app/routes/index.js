const taskRoutes = require('./task_routes');

module.exports = function (app, db) {
    taskRoutes(app, db); 
};
