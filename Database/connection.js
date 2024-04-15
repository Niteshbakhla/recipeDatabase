const mongoose = require("mongoose");

exports.connectDB = async () => {

            try {
                        const connection = await mongoose.connect("mongodb+srv://niteshbakhla007:X0pK8AZQlxweln44@cluster0.ibimqi0.mongodb.net/")

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
