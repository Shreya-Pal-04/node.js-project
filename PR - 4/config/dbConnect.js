const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(
        "mongodb+srv://shreya_db_user:shr%401234@practicecluster.vnl1eb0.mongodb.net/bookstoreDB"
    )
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));
};

module.exports = dbConnect;