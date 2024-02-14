//router.js
const pingRouter = require('./pingRouter');
const sseRouter = require('./sseRouter')

exports.routes = ({ app }) => {
    app.use('/api/ping/check-cctv', pingRouter);
    // app.use('/events', sseRouter);

};
