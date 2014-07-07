var express = require("express"),
        app = express();

// Create static
app.use(express.static(__dirname));

var server = app.listen(3000, function () {
    console.log("Server running on port %d. http://localhost:%d", server.address().port, server.address().port);
});