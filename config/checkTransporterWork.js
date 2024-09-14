const transporter = require("./transporter.js")

module.exports = function () {
    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("готово к отправке!");
            console.log(success);
        }
    });
};