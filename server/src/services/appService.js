// Use global variables up here for persistent storage without a database

class AppService {
    constructor() {
        this.discussionTopic = '';
        this.usernames = [];
    }

    // Define functions here
    isEven(num) {
        return num % 2 === 0;
    }
}

module.exports = {
    AppService
}