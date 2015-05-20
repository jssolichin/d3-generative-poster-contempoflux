var large24x36Version = false;

/*** Options ***/
var margin = {
		top: 120,
		right: 0,
		bottom: 0,
		left:85 
	},
	width = 990 - margin.left - margin.right,
	height = 1526 - margin.top - margin.bottom,
	letterOffset = {
		x: 235,
		y: 330
	},
	graphicOption = {
		total: 10,
		max: 350,
		min: 50
	},
	informationOption = {
		lineHeight: 50,
		secondColumnOffset: 340
	},
	uclaArtsScale = .5,
	multiColor = true; //If false, we use the grey for outlines
	colors = ["#237ddd", "#ff5206", "gold"],
	oneColorIndex = undefined, //if want one color poster, type in index of color from colors
	grey =["#777"];


if(large24x36Version){
	//24x36 is about twice as big as tabloid, but we need to do some minor modifications

	width = 1050 - margin.left - margin.right,
	height = 1526 - margin.top - margin.bottom,
	letterOffset = {
		x: 265,
		y: 350
	};
	informationOption.secondColumnOffset += 5;

	width *=2;
	height *=2;
	margin.top *=2;
	margin.left *=2;
	letterOffset.x *=2;
	letterOffset.y *=2;
	informationOption.lineHeight *=2;
	informationOption.secondColumnOffset *= 2;
	uclaArtsScale *=2;

}

/*** Main Contents ***/
var text = "CONTEMPOFLUX";
var musicians = [{
	musician: "Paul Lansky",
	song: "Horizons"
}, {
	musician: "Henri Dutilleux",
	song: "Sonatine"
}, {
	musician: "Morton Feldman",
	song: "The Viola in My Life"
}, {
	musician: "Tristan Perich",
	song: "qsqsqsqsqqqqqqqqq"
}, {
	musician: "Mario Davidovsky",
	song: "Synchronisms No. 6"
}, {
	musician: "Lou Harrison",
	song: "Tributes to Charon"
}, {
	musician: "Lou Harrison",
	song: "Vestiunt Silve"
}, {
	musician: "Steve Reich",
	song: "Nagoya Marimbas"
}, {
	musician: "Akira Nishimura",
	song: "Madoromi I"
}];

var additionalInformation = [
	"Free Admission",
	" ",
	"Sunday",
	"June 7th, 2015",
	"2:30PM",
	" ",
	"Jan Popper Theater",
	"Schoenberg Hall"
];

/*** Helper Functions ***/

//Given an index, return where that letter should be placed
var positioner = function(i) {
	return "translate(" + (i % 4) * (letterOffset.x+33) + "," + Math.floor(i / 4) * letterOffset.y + ")"
}

//Generate a random number between min and max
var randomBetween = function(min, max) {
	return Math.floor(Math.random() * max) + min;
}

/*** Canvas Generator ***/
var container = d3.select("body")
	.append("div")
	.attr("id", "poster");

var svg = container.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/*** Graphic Generator ***/
var g = svg.append("g")
	.attr("class", "graphic")

var letters = g.append("g")
	.attr("class", "letters")

var letter = letters
	.selectAll("g")
	.data(text)
	.enter()
	.append("g")
	.attr("transform", function(d, i) {
		return positioner(i);
	})
	.each(function(d, i) {
		var $element = d3.select(this)

		for (var i = 0; i < graphicOption.total; i++) {
			$element
				.append("text")
				.attr("class", "outline")
				.style('stroke-width', function (){return large24x36Version ? 1 : undefined;})
				.style("font-size", function() {
					return randomBetween(graphicOption.min, graphicOption.max) + "em";
				})
				.style("opacity", function (){
					return 1;
				})
				.style("stroke", function (){
					var index = parseInt(randomBetween(0,colors.length))

					if(oneColorIndex == undefined)
						selectedColor = index;
					else
						selectedColor = oneColorIndex;

					return multiColor ? colors[selectedColor] : grey;
				})
				.text(function() {
					return d;
				})
		}

	})

/*** Main title ***/
var readableLetters = g.append("g")
	.attr("class", "readable-letters")
var readableLetter = readableLetters
	.selectAll("g")
	.data(text)
	.enter()
	.append("g")
	.attr("transform", function(d, i) {
		return positioner(i);
	})
	.append("text")
	.attr("class", "outline")
	.style('font-size', function (){return large24x36Version ? '14.5em' : undefined;})
	.text(function() {
		var d = d3.select(this.parentNode).datum();
		return d;
	});

/*** Information ***/

var information = svg
	.append("g")
	.attr("class", "information")
	.attr("transform", "translate(" + (0 - 12) + "," + letterOffset.y * 2.6 + ")")
	.style('font-size', function (){return large24x36Version ? '3.2em' : undefined;});

information
	.append("text")
	.attr("transform", "translate(" + (letterOffset.x) + "," + 0 + ")")
	.attr("class", "information-header")
	.style('letter-spacing', function (){return large24x36Version ? '1em' : undefined;})
	.html("Spring 2015");

information
	.append("text")
	.attr("transform", "translate(" + (letterOffset.x) + "," + informationOption.lineHeight + ")")
	.attr("class", "information-header")
	.style('letter-spacing', function (){return large24x36Version ? '1em' : undefined;})
	.html("Chamber Music Concert");

var musician = information.append("g")
	.attr("transform", "translate(" + (letterOffset.x) + "," + informationOption.lineHeight*3 + ")")
	.attr("class", "information-body")
	.selectAll("text")
	.data(musicians)
	.enter()
	.append("text")
	.attr("transform", function(d, i) {
		return "translate(" + Math.floor(i/5)*informationOption.secondColumnOffset + "," + i%5 * informationOption.lineHeight + ")"
	})
	.html(function(d,i) {
		return "<tspan>" + d.musician + "</tspan>  " + d.song;
	});

/*** Sidebar ***/

var sidebar = information
	.append("g")
	.attr("transform", "translate(" + 0 + "," + 0 + ")");

var sidebarContent = sidebar.append("g")
	.attr("class", "sidebar-body")
	.selectAll("text")
	.data(additionalInformation)
	.enter()
	.append("text")
	.classed("bold", function(d, i) {
		return i == 0;
	})
	.attr("transform", function(d, i) {
		return "translate(" + 0 + "," + i * informationOption.lineHeight + ")"
	})
	.html(function(d) {
		return d;
	});

/*** UCLA ARTS Credit ***/
var uclaArtsWrapper = information.append("g")
	.attr("transform", "translate(0,"+ informationOption.lineHeight*9 +")")

var uclaArts = uclaArtsWrapper
	.append("g")
	.attr("transform", "scale("+uclaArtsScale+")translate(0,-20)");

uclaArts.append("path")
	.attr("d", "M17.227,80.535c4.191,9.205,10.964,16.56,19.269,21.71l4.03-24.101C28.917,72.89,19.362,65.915,12.872,58.419C12.59,65.864,13.961,73.403,17.227,80.535 M124.045,33.477C111.871,6.789,78.094-4.31,48.588,8.691c-3.306,1.46-6.409,3.165-9.313,5.083c9.915-0.053,21.042,1.891,32.207,6c30.07,11.087,49.098,33.77,42.445,50.661c-6.408,16.26-34.264,21.223-63.205,11.688l3.589,27.267c12.213,2.642,25.675,1.511,38.333-4.07C122.152,92.315,136.219,60.151,124.045,33.477z M4.893,30.284c-3.388,8.641-0.081,18.794,7.979,28.135c0.686-17.273,10.321-34.111,26.403-44.645C22.426,13.852,9.083,19.66,4.893,30.284z")

uclaArts.append("path")
	.attr("d", "M29.522,41.71c-0.041-0.499,0-1.206,0-1.55l0.725-8.365h2.739l-0.765,8.431c-0.162,1.84,0.564,3.126,2.379,3.126c1.855,0,2.86-1.313,3.022-2.942l0.766-8.615h2.742l-0.766,8.508c-0.283,3.285-2.46,5.741-5.966,5.741C31.656,46.044,29.884,44.271,29.522,41.71")

uclaArts.append("path")
	.attr("d", "M42.259,38.873c0.323-4.004,3.062-7.342,7.738-7.342c1.209,0,2.419,0.277,3.588,1.038l-0.322,3.322c-1.089-1.417-2.339-1.655-3.549-1.655c-2.9,0-4.513,2.023-4.715,4.586c-0.242,2.495,1.049,4.516,3.871,4.516c1.247,0,2.539-0.353,3.909-1.719l-0.282,3.4c-1.332,0.722-2.581,1.051-3.829,1.051C44.031,46.072,41.896,42.631,42.259,38.873")

uclaArts.append("path")
	.attr("d", "M55.761,31.795h2.742l-1.008,11.359c0,0,3.79,0,3.909,0c0.282,0,1.209-0.012,1.492-0.026c-0.041,0.13-0.283,2.613-0.283,2.613h-8.06L55.761,31.795")

uclaArts.append("path")
	.attr("d", "M70.717,31.149l-0.201,0.013l-7.499,14.58h2.904l1.048-2.208h5.28l0.646,2.208h2.901L70.717,31.149 M69.99,37.007c0.081-0.196,0.162-0.446,0.202-0.589h0.04c0.04,0.17,0.081,0.38,0.121,0.589c0.162,0.635,1.21,4.165,1.21,4.165h-3.468C68.096,41.171,69.95,37.1,69.99,37.007z")

uclaArts.append("path")
	.attr("d", "M49.15,68.886l-0.924-3.102h-5.283l-0.965,3.102h-5.24l6.407-17.588h4.92l6.369,17.588H49.15 M46.693,60.766c-0.605-2.258-0.888-3.215-1.13-4.385c-0.202,1.169-0.484,2.155-1.129,4.385l-0.322,1.158h2.903L46.693,60.766z")

uclaArts.append("path")
	.attr("d", "M66.565,68.886l-2.863-5.923h-1.976v5.923H56.93V51.298h7.861c4.111,0,6.853,1.562,6.853,5.726c0,2.641-1.21,4.269-3.146,5.149l3.508,6.713H66.565 M64.67,55.277h-2.943v3.836h2.863c1.613,0,2.218-0.71,2.218-1.958C66.808,56.055,66.203,55.277,64.67,55.277z")

uclaArts.append("polyline")
	.attr("points", "82.971,55.54 82.971,68.886 78.094,68.886 78.094,55.54 73.177,55.54 73.177,51.298 87.888,51.298 87.888,55.54 82.971,55.54")

uclaArts.append("path")
	.attr("d", "M96.475,69.159c-2.863,0-5.603-0.932-7.418-2.14l2.381-3.81c1.247,0.88,3.505,1.747,5.118,1.747c1.731,0,2.296-0.289,2.296-1.127c0-0.646-0.646-1.052-2.981-1.604c-4.234-0.986-6.288-2.127-6.288-5.648c0-3.309,2.699-5.556,6.934-5.556c2.981,0,5.158,0.736,7.014,2.035l-2.379,3.823c-1.533-1.05-3.103-1.656-4.878-1.656c-1.451,0-1.813,0.447-1.813,1.079c0,0.655,0.645,0.945,2.903,1.484c4.393,1.05,6.369,2.401,6.369,5.699C103.731,67.495,100.666,69.159,96.475,69.159")

uclaArtsWrapper.append("text")
	.attr("transform", "translate("+letterOffset.x+",20)")
	.html("Presented by \n The Herb Alpert School of Music.");

