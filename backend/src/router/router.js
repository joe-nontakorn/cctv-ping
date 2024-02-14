//router.js
const pingRouter = require('./pingRouter');

exports.routes = ({ app }) => {
    app.use('/api/ping/check-cctv', pingRouter);
    // app.use('/events', sseRouter);

};
