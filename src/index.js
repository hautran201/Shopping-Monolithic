const express = require('express');

const AppExpress = require('./app-express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');

const StartServer = async () => {
    const app = express();

    await databaseConnection();

    await AppExpress(app);

    app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
    });
};

StartServer();
