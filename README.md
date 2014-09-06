#clearlog


clearlog is a convenience logger for node, written to help produce human-readable logs, separate from cluttered stdout. Nothing fancy.

The output is whatever you want it to be, preceeded by a custom timestamp and importance marker then appended to the log file.

###Example usage:

```node
var cl = require('clearlog')({
	path : "/etc/logs/cl.log",
	timestring : "dd/MM h:mma"
});

cl("Log anything.");
cl("Log anything important.", true);
```

###Output:

```
05/09 4:01PM | | Log anything.
05/09 4:01PM |!| Log anything important.
```

###Notes
require('cl') takes an optional object specifying the log's location and desired timestamp format.
####Default values

```javascript
{
    path : process.cwd() + "clear.log",
    timestring : "dd/MM/yy HH:mm"
}
```
####Timestamp formatting
Inspired by but not borrowed from [Angular.js' date filter](https://docs.angularjs.org/api/ng/filter/date).

Marking a log entry as important will perform a sync append to the log file - useful for events like `process.on('exit')`.


###TODO
* Add ASCII color support