var fs = require('fs');

// Example: var sl = require('sl')({[path], [filename], [timestring], [webView]})
//			sl("This is what's going to print.")		//not important
//			sl("This is what's going to print.", true)	//important

module.exports = function (config) {
	// check config object, set defaults, etc etc.

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
			var timestamp = now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear().toString().substring(2,4) + ' ' + ((now.getHours() < 10) ? '0'+now.getHours() : now.getHours()) + ':' + ((now.getMinutes() < 10) ? '0'+now.getMinutes() : now.getMinutes());
			if (important) {
				message = timestamp + " |!| " + message + "\r\n";
				fs.appendFileSync(process.cwd() + '/logs/simple.log', message);
			} else {
				message = timestamp + " | | " + message + "\r\n";
				fs.appendFile(process.cwd() + '/logs/simple.log', message, function (err) {
					if (err) {
						throw err;
					}
				});
			}
		}
	}
};

// TODO:
// module config object, including save path and filename, maybe a time format string?
//// multiple logs? just define multiple sl vars
// web viewer -> https + auth
//// web viewer would just read a file, not a database
//// themes
////// color coding for important?

// tailr
//// tail multiple files on one page