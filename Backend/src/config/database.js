const mongoose = require('mongoose')

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("Connected to Database")
            })
    } catch (error) {
        console.log("Database Connection Error: ", error)
    }
}

module.exports = ConnectDB