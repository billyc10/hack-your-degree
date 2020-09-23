// Use global variables up here for persistent storage without a database

class AppService {
    constructor() {
        let discussionTopic = '';
        let wordmap = '';
        let cloud = '';
    }

    // Define functions here
    isEven(num) {
        return num % 2 === 0;
    }
}

module.exports = {
    AppService
}