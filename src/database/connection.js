const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

module.exports = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB');
        console.log(error);
        process.exit(1);
    }
};
