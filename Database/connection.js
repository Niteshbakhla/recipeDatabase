const mongoose = require("mongoose");

exports.connectDB = async () => {

            try {
                        const connection = await mongoose.connect(process.env.MONGO_URL)

                        if (connection.STATES.connected === 1) {
                                    console.log(`Database is connected!`);
                        } else if (connection.STATES.connecting === 2) {
                                    console.log("Database is connecting......")
                        } else if (connection.STATES.disconnecting === 3) {
                                    console.log("Database is disconnecting ")
                        }
                        else if (connection.STATES.disconnected === 0) {
                                    console.log("Database is disconnected!")
                        }
            } catch (error) {
                        console.log(error.message);
            }
};
