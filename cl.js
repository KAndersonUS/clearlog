var fs = require('fs');
var dateString = require('./dateString.js');

/* Example usage:
var cl = require('cl')({
	path : "/etc/logs/cl.log",
	timestring : "dd/MM h:mma"
});

cl("This is what's going to print.");		//not important
cl("This is what's going to print.", true);	//important
*/

module.exports = function (config) {
	// check config object, set defaults, etc etc.
	config.path = (config.hasOwnProperty('path') ? config.path : process.cwd() + 'clear.log');
	config.timestring = (config.hasOwnProperty('timestring') ? config.timestring : "dd/MM/yy HH:mm");

	fs.open(config.path, 'r', function (err, fd) {
		console.log(err + fd);
		if (err && err.toString().match(/ENOENT/)) {
			console.log("cl |!| log path " + err.toString().match(/\'(.*)\'/)[0] + " doesn't exist yet but will be created the first time" +
				" cl() is called.");
		}
		if (fd) {
			fs.close(fd);
		}
	});

	return function (message, important) {
		if (typeof message != "string") {
			try {
				message.toString();
			} catch (err) {
				console.log('Bad message argument passed to cl. ' + err);
				message = null;
			}
		}

		if (message) {
			var now = new Date();
			var timestamp = dateString(now, config.timestring);
			if (important) {
				message = timestamp + " |!| " + message + "\r\n";
				fs.appendFileSync(config.path, message);
			} else {
				message = timestamp + " | | " + message + "\r\n";
				fs.appendFile(config.path, message, function (err) {
					if (err) {
						throw err;
					}
				});
			}
		}
	}
};