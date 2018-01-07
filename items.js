//////////////////// ITEM ///////////////////

function getIMGITEM(name){
	var itemIMG = new Image();
	itemIMG.src = "items/" + name + ".png";
	var itemReady = false;
	itemIMG.onload = function(){itemReady = true;};

	this.img = itemIMG;
	this.ready = itemReady;
}

function animateITEM(w, h, sequenceSet, fps, fpr){
	this.width = w;
	this.height = h;
	this.sequenceSet = sequenceSet;
	this.fps = fps;            //frame speed
  	this.fpr = fpr;            //# of frames per row
  	this.ct = 0;
  	this.curFrame = 0;
	this.curSeq = sequenceSet[0];
}

function animSet(name, sequence){
	this.name = name;
	this.sequence = sequence;
}

function ITEM(name, x, y, ba=null, text=null, thru=false, show=true, animation=null){
	var set = new getIMGITEM(name);

	this.name = name;
	this.x = x;
	this.y = y;
	this.area = ba;
	this.text = text;
	this.text_index = 0;
	this.thru = thru;
	this.show = show;
	this.animation = animation;

	this.img = set.img;
	this.ready = set.ready;
}

//area for collision (x and y are relative to the object starting from the top right)
function boundArea(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}



var poles = new ITEM("poles", 12, 7, new boundArea(0, 0, 2, 3));
var dummy = new ITEM("dummy", 15, 8, new boundArea(0,0,1,1), ["..."]);
var car = new ITEM("car2", 5, 21, new boundArea(0, 0, 3, 2));
var cloud1 = new ITEM("clouds", 33, 22, null, null, true, true, 
	new animateITEM(16, 16, [new animSet("seq", [0,2,4,3,1])], 32, 5));
var cloud2 = new ITEM("clouds", 31, 23, null, null, true, true,
	new animateITEM(16, 16, [new animSet("seq", [1,3,0,2,4])], 56, 5));
var cloud3 = new ITEM("clouds", 35, 23, null, null, true, true, 
	new animateITEM(16, 16, [new animSet("seq", [2,1,3,4,0])], 75, 5));
var cloud4 = new ITEM("clouds", 33, 24, null, null, true, true, 
	new animateITEM(16, 16, [new animSet("seq", [4,0,2,1,3])], 49, 5));


var items = [poles, car, dummy, cloud1, cloud2, cloud3, cloud4];