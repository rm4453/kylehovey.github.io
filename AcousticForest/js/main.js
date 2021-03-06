// Javascript onload

$(function() {
	// Hide ending overlay
	$("#overlay-end").hide();

	// Initialize canvas
	var canvas = $("#drawing-board")[0];

	// Create context
	var ctx = canvas.getContext("2d");

	// Create object for canvas
	draw = {
		canvas : canvas,
		ctx : ctx,
		resize : function() {
			// Resize this canvas to full
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		},
		clear : function() {
			// Clear the canvas
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	draw.resize();

	// Initialize the analyzer context object
	var AudioContext = (window.AudioContext || window.webkitAudioContext || false);

	// Only do things if we can
	if (AudioContext) {
		audioTools = new AudioContext();

		// Create the environment
		environment = new Environment();

		// Create stars
		var stars = new Stars({
			nStars : 200,
			fWindow : [0.5, 0.55],
			glow : 20
		});

		// Mountain colors
		var colors = [
			"#425172",
			"#2A3251",
			"#111F3A",
			"#1B2538"
		];

		// Mountain frequency windows
		var fWindows = [
			[0, 0.2],
			[0.2, 0.4],
			[0.4, 0.6],
			[0.55, 0.65]
		];
		
		// Create empty mountain range
		var range = new Array();

		// For each color, create a mountain
		for (var i = 1; i < colors.length + 1; i++) {
			range.push(new Mountain({
				height : draw.canvas.height/(2*i),
				offset : draw.canvas.height/(4*i) + draw.canvas.height/5,
				randLevel : 0.5,
				randFalloff : 0.9,
				points : 200,
				color : colors[i - 1],
				fWindow : fWindows[i - 1],
				scaling : (i == 1) ? 2 : 1
			}));
		}

		// Create a campfire
		var fire = new CampFire({
			emberWidth : 20,
			pixelDim : [50, 100],
			falloff : 0.9,
			randLevel : 50,
			sigShift : 50,
			sigScale : 10,
			colors : [
				[255, 149, 104, 0],
				[255, 100, 50, 1],
				[200, 51, 0, 1]
			],
			position : [
				draw.canvas.width/2,
				draw.canvas.height
			],
			fWindow : [0, 0.5]
		});

		// Add the stars to environment
		environment.addFeature({
			feature : stars,
			animated : true
		});

		// Add the mountains to environment
		$.each(range, function(i, mountain) {
			environment.addFeature({
				feature : mountain,
				animated : true
			});
		});

		// Create ground up to the mountain
		makeGround = function(){
			// Find height
			this.height = draw.canvas.height*(1 - 0.2625);

			// Update function
			this.update = function() {

				// Create gradient
				var grad = draw.ctx.createLinearGradient(
					0,
					draw.canvas.height,
					0,
					this.height
				);

				// Add colors
				grad.addColorStop(0, "#0F271E");
				grad.addColorStop(1, "#1B2538");

				// Set fill style and make rectangle
				draw.ctx.fillStyle = grad;
				draw.ctx.fillRect(
					0,
					this.height,
					draw.canvas.width,
					draw.canvas.height - this.height
				);
			};
		};
		ground = new makeGround();

		// Add the ground
		environment.addFeature({
			feature : ground,
			animated : true
		});
		
		// Add the campfire
		environment.addFeature({
			feature : fire,
			animated : true
		});

		// Start the environment
		environment.start();
		
		// Grab our audio element
		audio = document.getElementById("main-track");

		// Create analyser
		analyser = new AudioAnalyser(audio);

		// Play audio and start analysis
		audio.play();
		analyser.start();

		// Fade out beginning overlay
		$("#overlay-begin").fadeOut(13000);

		// Begin timer to fade out at end
		setTimeout(function() {
			$("#overlay-end").fadeIn(13000);
		}, 264000);
	} else {
		// No Audio context, tell user the sad news
		sweetAlert(
			":(",
			"Your web browser does not support the audio tools needed for this visualizer. Try using Chrome on a desktop for best results.",
			"error");
	}

	// LISTENERS
	$(window).on('keyup', function(event) {
		if (event.keyCode == 0 || event.keyCode == 32) {
			// Spacebar to pause/play
			if (audio.paused) {
				analyser.stop();
				audio.play();
			} else {
				analyser.start();
				audio.pause();
			}
		}
	}).resize(function(event) {
		// Resize canvas
		draw.resize();
	});
});
