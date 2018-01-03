
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
		y : 15 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

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
		x : 13 * size, 
		y : 9 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["I AM ERROR"],
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundArea : new boundArea(8,6,7,5),
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
		x : 28 * size, 
		y : 20 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["I AM ERROR"],
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundArea : new boundArea(26,18, 9, 7),
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
		x : 28 * size, 
		y : 13 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["I AM ERROR"],
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundArea : new boundArea(24, 13, 10, 1),
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
		x : 28 * size, 
		y : 10 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["I AM ERROR"],
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundArea : new boundArea(26, 8, 4, 4),
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
		y : 16 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["I AM ERROR"],
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundArea : new boundArea(4, 13, 7, 4),
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
		x : 19 * size, 
		y : 19 * size,
		velX : 0,
		velY : 0,
		fps : 9,            //frame speed
		fpr : 3,            //# of frames per row
		show : true,

		//other properties
		text : ["I AM ERROR"],
		move : "drunk_walk",
		wt : 0,
		interact : false,
		boundArea : new boundArea(16, 17, 7, 5),
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

var cast = [kyle, kimi, chi, kay, amber, sid, grace]
var npcs = [kimi, chi, kay, amber, sid, grace]