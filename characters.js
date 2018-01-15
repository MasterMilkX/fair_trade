
//SETUP
var size = 16;

//area for collision (x and y are relative to the object starting from the top right)
function boundArea(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}


//KYLE
var kyleIMG = new Image();
kyleIMG.src = "chars/kyle.png";
var kyleReady = false;
kyleIMG.onload = function(){kyleReady = true;};

var kyle = {
		//sprite properties
		name : "Kyle",
		width : 16,
		height : 16,
		dir : "south",
		action : "idle",
		img : kyleIMG,
		ready : kyleReady,
		offsetX : 0,
		offsetY : 0,

		//movement
		speed : 1,
		initPos : 0,
		moving : false,
		x : 20 * size, 
		y : 12 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//trade properties
		tradeIndex : 0,
		tradeItem : "none",

		//other properties
		interact : false,
		other : null,
		pathQueue : [],
		lastPos : [],
		following : false,

		//walk animation
		idleNorth : [10,10,10,10],
		idleSouth : [1,1,1,1],
		idleWest : [4,4,4,4],
		idleEast : [7,7,7,7],

		//movement animation
		moveNorth : [9,10,11,10],
		moveSouth : [0,1,2,1],
		moveWest : [3,4,5,4],
		moveEast : [6,7,8,7],

		seqlength : 4,
		curFrame : 0,
		ct : 0
};

//KIMI
var kimiIMG = new Image();
kimiIMG.src = "chars/kimi.png";
var kimiReady = false;
kimiIMG.onload = function(){kimiReady = true;};

var kimi = {
		//sprite properties
		name : "Kimi",
		width : 16,
		height : 16,
		dir : "south",
		action : "idle",
		img : kimiIMG,
		ready : kimiReady,
		offsetX : 0,
		offsetY : 0,

		//movement
		speed : 1,
		initPos : 0,
		moving : false,
		x : 15 * size, 
		y : 7 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["*sigh*", 
			"Of course you | come to me first", 
			"Must be my lucky | day...<0>"],
		text_index : 0,
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundary : new boundArea(11,6,6,5),
		other : null,
		pathQueue : [],
		lastPos : [],
		following : false,

		//walk animation
		idleNorth : [10,10,10,10],
		idleSouth : [1,1,1,1],
		idleWest : [4,4,4,4],
		idleEast : [7,7,7,7],

		//movement animation
		moveNorth : [9,10,11,10],
		moveSouth : [0,1,2,1],
		moveWest : [3,4,5,4],
		moveEast : [6,7,8,7],

		seqlength : 4,
		curFrame : 0,
		ct : 0
};

//CHI
var chiIMG = new Image();
chiIMG.src = "chars/chi.png";
var chiReady = false;
chiIMG.onload = function(){chiReady = true;};

var chi = {
		//sprite properties
		name : "Chi",
		width : 16,
		height : 16,
		dir : "south",
		action : "idle",
		img : chiIMG,
		ready : chiReady,
		offsetX : 0,
		offsetY : 0,

		//movement
		speed : 1,
		initPos : 0,
		moving : false,
		x : 33 * size, 
		y : 23 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["I sense a calm | nature in you", 
		"And also a desire | to help others!<0>"],
		text_index : 0,
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundary : new boundArea(31,22, 5, 3),
		other : null,
		pathQueue : [],
		lastPos : [],
		following : false,

		//walk animation
		idleNorth : [10,10,10,10],
		idleSouth : [1,1,1,1],
		idleWest : [4,4,4,4],
		idleEast : [7,7,7,7],

		//movement animation
		moveNorth : [9,10,11,10],
		moveSouth : [0,1,2,1],
		moveWest : [3,4,5,4],
		moveEast : [6,7,8,7],

		seqlength : 4,
		curFrame : 0,
		ct : 0
};

//KAY
var kayIMG = new Image();
kayIMG.src = "chars/kay.png";
var kayReady = false;
kayIMG.onload = function(){kayReady = true;};

var kay = {
		//sprite properties
		name : "Kay",
		width : 16,
		height : 16,
		dir : "south",
		action : "idle",
		img : kayIMG,
		ready : kayReady,
		offsetX : 0,
		offsetY : 0,

		//movement
		speed : 1,
		initPos : 0,
		moving : false,
		x : 29 * size, 
		y : 11 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["Are you an | invader?!", "Wait! Let me | find my sword!", "Don't move!<1>"],
		text_index : 0,
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundary : new boundArea(27, 11, 5, 1),
		other : null,
		pathQueue : [],
		lastPos : [],
		following : false,

		//walk animation
		idleNorth : [10,10,10,10],
		idleSouth : [1,1,1,1],
		idleWest : [4,4,4,4],
		idleEast : [7,7,7,7],

		//movement animation
		moveNorth : [9,10,11,10],
		moveSouth : [0,1,2,1],
		moveWest : [3,4,5,4],
		moveEast : [6,7,8,7],

		seqlength : 4,
		curFrame : 0,
		ct : 0
};

//AMBER
var amberIMG = new Image();
amberIMG.src = "chars/amber.png";
var amberReady = false;
amberIMG.onload = function(){amberReady = true;};

var amber = {
		//sprite properties
		name : "Amber",
		width : 16,
		height : 16,
		dir : "south",
		action : "idle",
		img : amberIMG,
		ready : amberReady,
		offsetX : 0,
		offsetY : 0,

		//movement
		speed : 1,
		initPos : 0,
		moving : false,
		x : 29 * size, 
		y : 8 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["Hey, you're | pretty stylish", "Who dyed your | hair?<1>"],
		text_index : 0,
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundary : new boundArea(28, 7, 3, 3),
		other : null,
		pathQueue : [],
		lastPos : [],
		following : false,

		//walk animation
		idleNorth : [10,10,10,10],
		idleSouth : [1,1,1,1],
		idleWest : [4,4,4,4],
		idleEast : [7,7,7,7],

		//movement animation
		moveNorth : [9,10,11,10],
		moveSouth : [0,1,2,1],
		moveWest : [3,4,5,4],
		moveEast : [6,7,8,7],

		seqlength : 4,
		curFrame : 0,
		ct : 0
};

//SID
var sidIMG = new Image();
sidIMG.src = "chars/sid.png";
var sidReady = false;
sidIMG.onload = function(){sidReady = true;};

var sid = {
		//sprite properties
		name : "Sid",
		width : 16,
		height : 16,
		dir : "south",
		action : "idle",
		img : sidIMG,
		ready : sidReady,
		offsetX : 0,
		offsetY : 0,

		//movement
		speed : 1,
		initPos : 0,
		moving : false,
		x : 6 * size, 
		y : 23 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["Whoa! I didn't | see you!", "Hey... Do you | have any records?", "I've gotten | really into vinyl | lately<1>"],
		text_index : 0,
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundary : new boundArea(4, 20, 5, 5),		//aaayyyy
		other : null,
		pathQueue : [],
		lastPos : [],
		following : false,

		//walk animation
		idleNorth : [10,10,10,10],
		idleSouth : [1,1,1,1],
		idleWest : [4,4,4,4],
		idleEast : [7,7,7,7],

		//movement animation
		moveNorth : [9,10,11,10],
		moveSouth : [0,1,2,1],
		moveWest : [3,4,5,4],
		moveEast : [6,7,8,7],

		seqlength : 4,
		curFrame : 0,
		ct : 0
};

//GRACE
var graceIMG = new Image();
graceIMG.src = "chars/grace.png";
var graceReady = false;
graceIMG.onload = function(){graceReady = true;};

var grace = {
		//sprite properties
		name : "Grace", 
		width : 16,
		height : 16,
		dir : "south",
		action : "idle",
		img : graceIMG,
		ready : graceReady,
		offsetX : 0,
		offsetY : 0,

		//movement
		speed : 1,
		initPos : 0,
		moving : false,
		x : 20 * size, 
		y : 22 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["What a beautiful | day!", 
			"The grass is | especially green | today!",
			"Like a #60B820 | kind of green!<0>"],
		text_index : 0,
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundary : new boundArea(18, 21, 4, 3),
		other : null,
		pathQueue : [],
		lastPos : [],
		following : false,

		//walk animation
		idleNorth : [10,10,11,11],
		idleSouth : [1,1,2,2],
		idleWest : [4,4,5,5],text_index : 0,
		idleEast : [7,7,8,8],

		//movement animation
		moveNorth : [9,10,11,10],
		moveSouth : [0,1,2,1],
		moveWest : [3,4,5,4],
		moveEast : [6,7,8,7],

		seqlength : 4,
		curFrame : 0,
		ct : 0
};

var cast = [kyle, kimi, chi, kay, amber, sid, grace]
var npcs = [kimi, chi, kay, amber, sid, grace]



