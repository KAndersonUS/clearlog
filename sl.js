var fs = require('fs');
var dateString = require('./dateString.js');

// Example: var sl = require('sl')({[path], [timestring], [color]})
//			sl("This is what's going to print.")		//not important
//			sl("This is what's going to print.", true)	//important

module.exports = function (config) {
	// check config object, set defaults, etc etc.
	config.path = (config.hasOwnProperty('path') ? config.path : process.cwd() + 'simple.log');
	config.timestring = (config.hasOwnProperty('timestring') ? config.timestring : "dd/MM/yy HH:mm");

//	fs.open(config.path, 'r', function (err, fd) {
//		// should we test that the provided path exists, or just append away?
//	});

	return function (message, important) {
		// the workhorse that's called in code
		if (typeof message != "string") {
			try {
				message.toString();
			} catch (err) {
				console.log('Bad message argument passed to sl. ' + err);
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