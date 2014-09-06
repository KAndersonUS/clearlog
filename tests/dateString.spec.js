describe("dateString", function () {
	var now = new Date();
	// then = July 4, 1776 9:05:03am
	var then = new Date(1776, 6, 4, 9, 5, 3, 46);
	var bibleTimes = new Date(4, 11, 25, 20, 15, 13, 555);
	bibleTimes.setFullYear(4, 11, 25);

	// basic replacements
	it("should replace 'yyyy' with a 4 digit year", function () {
		expect(dateString(now, "yyyy").length).toBe(4);
		expect(dateString(then, "yyyy")).toBe("1776");
		expect(dateString(bibleTimes, "yyyy")).toBe("0004");
	});
	it("should replace 'yy' with a 2 digit year", function () {
		expect(dateString(now, "yy").length).toBe(2);
		expect(dateString(then, "yy")).toBe("76");
		expect(dateString(bibleTimes, "yy")).toBe("04");
	});
	it("should replace 'y' with a 1 digit year", function () {
		expect(dateString(now, "y").length).toBe(1);
		expect(dateString(then, "y")).toBe("6");
		expect(dateString(bibleTimes, "y")).toBe("4");
	});
	it("should replace 'MMMM' with the full month name", function () {
		expect(dateString(then, "MMMM")).toBe("July");
		expect(dateString(bibleTimes, "MMMM")).toBe("December");
	});
	it("should replace 'MMM' with an abbreviated month name", function () {
		expect(dateString(then, "MMM")).toBe("Jul");
		expect(dateString(bibleTimes, "MMM")).toBe("Dec");
	});
	it("should replace 'MM' with the month number, 1 count, padded", function () {
		expect(dateString(then, "MM")).toBe("07");
		expect(dateString(bibleTimes, "MM")).toBe("12");
	});
	it("should replace 'M' with the month number, 1 count", function () {
		expect(dateString(then, "M")).toBe("7");
		expect(dateString(bibleTimes, "M")).toBe("12");
	});
	it("should replace 'dd' with the day of the month, 1 count, padded", function () {
		expect(dateString(then, "dd")).toBe("04");
		expect(dateString(bibleTimes, "dd")).toBe("25");
	});
	it("should replace 'd' with the day of the month, 1 count", function () {
		expect(dateString(then, "d")).toBe("4");
		expect(dateString(bibleTimes, "d")).toBe("25");
	});
	it("should replace 'HH' with the local hour, padded", function () {
		expect(dateString(then, "HH")).toBe("09");
		expect(dateString(bibleTimes, "HH")).toBe("20");
	});
	it("should replace 'H' with the local hour", function () {
		expect(dateString(then, "H")).toBe("9");
		expect(dateString(bibleTimes, "H")).toBe("20");
	});
	it("should replace 'hh' with the local hour, (1-12), padded", function () {
		expect(dateString(then, "hh")).toBe("09");
		expect(dateString(bibleTimes, "hh")).toBe("08");
	});
	it("should replace 'h' with the local hour (1-12)", function () {
		expect(dateString(then, "h")).toBe("9");
		expect(dateString(bibleTimes, "h")).toBe("8");
	});
	it("should replace 'a' with AM or PM", function () {
		expect(dateString(then, "a")).toBe("AM");
		expect(dateString(bibleTimes, "a")).toBe("PM");
	});
	it("should replace 'mm' with the minutes, padded", function () {
		expect(dateString(then, "mm")).toBe("05");
		expect(dateString(bibleTimes, "mm")).toBe("15");
	});
	it("should replace 'm' with the minutes", function () {
		expect(dateString(then, "m")).toBe("5");
		expect(dateString(bibleTimes, "m")).toBe("15");
	});
	it("should replace 'ss' with the seconds, padded", function () {
		expect(dateString(then, "ss")).toBe("03");
		expect(dateString(bibleTimes, "ss")).toBe("13");
	});
	it("should replace 's' with the seconds", function () {
		expect(dateString(then, "s")).toBe("3");
		expect(dateString(bibleTimes, "s")).toBe("13");
	});
	it("should replace 'sss' with the milliseconds, padded", function () {
		expect(dateString(then, ".sss")).toBe(".046");
		expect(dateString(bibleTimes, ".sss")).toBe(".555");
	});
	it("should replace 'ww' with the week of the year, padded", function () {
		expect(dateString(new Date(2014, 0, 1), "ww")).toBe('00');
		expect(dateString(new Date(2014, 0, 8), "ww")).toBe('01');
		expect(dateString(new Date(2014, 0, 14), "ww")).toBe('02');
		expect(dateString(new Date(2014, 11, 17), "ww")).toBe('50');
		expect(dateString(new Date(2014, 11, 24), "ww")).toBe('51');
		expect(dateString(new Date(2014, 11, 31), "ww")).toBe('52');
	});
	it("should replace 'w' with the week of the year", function () {
		expect(dateString(new Date(2014, 0, 1), "w")).toBe('0');
		expect(dateString(new Date(2014, 0, 8), "w")).toBe('1');
		expect(dateString(new Date(2014, 0, 14), "w")).toBe('2');
		expect(dateString(new Date(2014, 11, 17), "w")).toBe('50');
		expect(dateString(new Date(2014, 11, 24), "w")).toBe('51');
		expect(dateString(new Date(2014, 11, 31), "w")).toBe('52');
	});
	it("should replace 'EEEE' with the day of the week", function () {
		expect(dateString(then, "EEEE")).toBe("Thursday");
		expect(dateString(bibleTimes, "EEEE")).toBe("Saturday");
	});
	it("should replace 'EEE' with the abbreviated day of the week", function () {
		expect(dateString(then, "EEE")).toBe("Thu");
		expect(dateString(bibleTimes, "EEE")).toBe("Sat");
	});

	// multiple replacements
	it("should convert any string into a formatted datestring", function () {
		expect(dateString(then, "dd/MM/yy HH:mm")).toBe("04/07/76 09:05");
		expect(dateString(then, "EEE dd/MM/yyyy h:mma")).toBe("Thu 04/07/1776 9:05AM");
		expect(dateString(then, "Some Extra Text: EEE dd/MM/yyyy h:mma")).toBe("Some ExtrAM Text: Thu 04/07/1776 9:05AM");
	});
});