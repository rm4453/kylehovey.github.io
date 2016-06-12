// Global constants to store menu data
MENU_OPTIONS = {
	constant : {
		menu : {
			"Constant Color" : {
				menu : [
					{
						type : "slider",
						label : "Red",
						id : "constant-R",
						range : [0, 255],
						color : "crimson"
					},
					{
						type : "slider",
						label : "Green",
						id : "constant-G",
						range : [0, 255],
						color : "forestgreen"
					},
					{
						type : "slider",
						label : "Blue",
						id : "constant-B",
						range : [0, 255],
						color : "navy"
					}
				],
				callback: staticColor
			},
			"Static Pattern" : {
				menu : [
				],
				callback: staticPattern
			}
		}
	},
	animated : {
		menu : {
			"Color Waves" : {
				menu : [
					{
						type : "slider",
						label : "Rate",
						id : "colorsin-rate",
						range : [1, 10],
						color : "slateBlue"
					},
					{
						type : "slider",
						label : "Ripple Factor",
						id : "colorsin-ripples",
						range : [1, 10],
						color : "slateBlue"
					}
				],
				callback : animationSelected
			},
			"Sound Reactive" : {
				menu : {
					type : "dropdown",
					label : "Sound Mode",
					id : "sound-mode",
					values : [
						"Sound Bar"
					]
				},
				callback : soundAnimation
			}
		}
	}
}

// Set panel to a static pattern
function staticPattern(){
}

// Set panel to given color
function staticColor(){
	console.log("called");
}

// Start animating with the given pattern
function animationSelected(){
}

// Start animating with respect to sound
function soundAnimation(){
}
