// Class definition for sound-reactive environment
//
// Author: Kyle Hovey

function Environment() {
	// Storage of environment variables
	this.geography = new Array();

	// Add something to the environment
	this.addFeature = function(feature) {
		// Add it to the geography
		this.geography.push({
			feature : feature.feature,
			name : feature.name,
			animated : feature.animated
		});
	};

	// Start animating the environment
	this.start = function() {
		// Save a reference to this
		var self = this;
		this.time = setInterval(function() {
			// Clear the canvas
			draw.clear();

			// For each geographic feature
			for (var i = 0; i < self.geography.length; i++) {
				// If animated
				if (self.geography[i].animated) {
					// Update the animated item
					self.geography[i].feature.update();
				}
			}
		}, 20);
	};

	// Stop animating the environment
	this.stop = function() {
		clearInterval(this.time);
	};
};
