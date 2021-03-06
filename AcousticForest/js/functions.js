// General purpose non-method functions
//
// Author: Kyle Hovey

// Find the pseudo-magnitude of a large array
function pMag(arr) {
	// Storage variables
	var out = 0;

	// Get intermittent samples of array
	for (var i = 0; i < arr.length; i += 5) {
		out += Math.pow(arr[i], 2);
	}

	// Return mag
	return Math.sqrt(out);
}

// Find the average of an array
function avg(arr) {
	// Generate output
	var out = 0;

	// Add up
	for (var i = 0; i < arr.length; i++) {
		out += arr[i];
	}

	// Return average
	return out/arr.length;
};

// Find the sectional average of an array
function secAvg(arr, start, end) {
	return avg(arr.slice(arr.length*start, arr.length*end));
};

// Normalize an array based upon a max value
function normalize(arr, maxVal) {
	// Create copy
	var myArr = new Array();

	// Normalize array
	for (var i = 0; i < arr.length; i++) {
		myArr.push(arr[i]/maxVal);
	}

	// Return it
	return myArr;
};

// Linear interpolate between two 4-vectors representing rgba
function lerp(A, B, t) {
	// Other portion of interval
	var s = 1 - t;

	// Generate out color
	var out = new Array();

	// Push back lerped values
	for (var i = 0; i < 3; i++) {
		out.push(Math.round(s*A[i] + t*B[i]));
	}

	// Push alpha channel separately (can't be rounded)
	out.push(s*A[3] + t*B[3]);

	// return the color
	return out;
}

// Convert color 4-vector into string rgba format
function toRGBA(arr) {
	return "rgba(" + arr.join(",") + ")";
}

// See if user is on mobile
function isMobile() {
	if(window.innerWidth <= 800 && window.innerHeight <= 600) {
		return true;
	} else {
		return false;
	}
}
