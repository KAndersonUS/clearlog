function dateString (date, ts) {
	if (!date) {
		throw new Error("dateString given bad date object.");
	} else {
		try {
			date.getUTCDate();
		} catch (err) {
			throw new Error("dateString needs a Date object");
		}
	}
	if (!ts || typeof ts != "string") {
		throw new Error("dateString didn't get a good datestring");
	}

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//	AngularJS date filter equivalents

//	 'yyyy': 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
	ts=ts.replace(/yyyy/g, function () {
		var year = (date.getFullYear()).toString();
		while (year.length < 4) {
			year = '0' + year;
		}
		return year;
	});
//	 'yy': 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
	ts=ts.replace(/yy/g, function () {
		var year = date.getFullYear().toString();
		while (year.length < 2) {
			year = '0' + year;
		}
		return year.substring(year.length-2, year.length);
	});
//	 'y': 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
	ts=ts.replace(/y/g, function () {
		var year = date.getFullYear().toString();
		return (year.substring(year.length-1,year.length));
	});

//	 'dd': Day in month, padded (01-31)
	ts=ts.replace(/dd/g, function () {
		var day = date.getDate().toString();
		while (day.length < 2) {
			day = '0' + day;
		}
		return day;
	});
//	 'd': Day in month (1-31)
	ts=ts.replace(/d/g, date.getDate());

//	 'HH': Hour in day, padded (00-23)
	ts=ts.replace(/\bHH/g, function () {
		var hour = date.getHours().toString();
		while (hour.length < 2) {
			hour = '0' + hour;
		}
		return hour;
	});
//	 'H': Hour in day (0-23)
	ts=ts.replace(/\bH/g, date.getHours());
//	 'hh': Hour in AM/PM, padded (01-12)
	ts=ts.replace(/\bhh/g, function () {
		var hour = date.getHours();
		var pm = false;
		if (hour == 0) {
			hour = 12;
		} else if (hour >= 12) {
			pm = true;
			hour = hour-12;
		}
		hour = hour.toString();
		while (hour.length < 2) {
			hour = '0' + hour;
		}
		return hour;
	});
//	 'h': Hour in AM/PM, (1-12)
	ts=ts.replace(/\bh/g, function () {
		var hour = date.getHours();
		var pm = false;
		if (hour == 0) {
			hour = 12;
		} else if (hour >= 12) {
			pm = true;
			hour = hour-12;
		}
		hour = hour.toString();
		return hour;
	});
//	 'mm': Minute in hour, padded (00-59)
	ts=ts.replace(/\bmm/g, function () {
		var mins = date.getMinutes().toString();
		while (mins.length < 2) {
			mins = '0' + mins;
		}
		return mins;
	});
//	 'm': Minute in hour (0-59)
	ts=ts.replace(/\bm/g, date.getMinutes());

//	 'sss' or 'sss': Millisecond in second, padded (000-999)
	ts=ts.replace(/sss/g, function () {
		var msecs = date.getMilliseconds().toString();
		while (msecs.length < 3) {
			msecs = '0' + msecs;
		}
		return msecs;
	});
//	 'ss': Second in minute, padded (00-59)
	ts=ts.replace(/ss/g, function () {
		var secs = date.getSeconds().toString();
		while (secs.length < 2) {
			secs = '0' + secs;
		}
		return secs;
	});
//	 's': Seconds in minute (0-59)
	ts=ts.replace(/s/g, date.getSeconds());


//	 'Z': 4 digit (+sign) representation of the timezone offset (-1200-+1200)
	ts=ts.replace(/Z/g, function () {
		var offset = (date.getTimezoneOffset()/60)*100;
		var neg = false;
		if (offset < 0) {
			neg = true;
		}
		offset = offset.toString();
		while (offset.length < 4) {
			offset = "0" + offset;
		}
		return (neg) ? offset : "+" + offset;
	});

//	 'ww': ISO-8601 week of year (00-53)
	ts=ts.replace(/\bww\b/g, function (){
		var jan1 = new Date(date.getFullYear(), 0, 1);
		var elapsed = date.getTime() - jan1.getTime() + (48*60*60*1000) - (jan1.getDay() - date.getDay())*(24*60*60*1000);
		var result = Math.floor(elapsed/(7*24*60*60*1000)).toString();
		if (result.length < 2) {
			result = "0" + result;
		}
		return result;
	});
//	 'w': ISO-8601 week of year (0-53)
	ts=ts.replace(/\bw\b/g, function (){
		var jan1 = new Date(date.getFullYear(), 0, 1);
		var elapsed = date.getTime() - jan1.getTime() + (48*60*60*1000) - (jan1.getDay() - date.getDay())*(24*60*60*1000);
		return Math.floor(elapsed/(7*24*60*60*1000)).toString();
	});


	// these are replaced with strings, so they're are toward the end.
	//	 'a': AM/PM marker
	ts=ts.replace(/a/g, function () {
		if (date.getHours() >= 12) {
			return "PM";
		} else {
			return "AM";
		}
	});

//	 'MMMM': Month in year (January-December)
	ts=ts.replace(/\bMMMM\b/g, months[date.getMonth()]);
//	 'MMM': Month in year (Jan-Dec)
	ts=ts.replace(/\bMMM\b/g, monthsShort[date.getMonth()]);
//	 'MM': Month in year, padded (01-12)
	ts=ts.replace(/\bMM\b/g, function () {
		var month = (date.getMonth()+1).toString();
		while (month.length < 2) {
			month = '0' + month;
		}
		return month;
	});
//	 'M': Month in year (1-12)
	ts=ts.replace(/\bM\b/g, date.getMonth()+1);

//	 'EEEE': Day in Week,(Sunday-Saturday)
	ts=ts.replace(/\bEEEE\b/g, days[date.getDay()]);
//	 'EEE': Day in Week, (Sun-Sat)
	ts=ts.replace(/\bEEE\b/g, daysShort[date.getDay()]);

	return ts;
}

module.exports = dateString;