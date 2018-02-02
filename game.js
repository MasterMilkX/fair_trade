//Game code//


//////////////////         SETUP          ///////////////

/*global cast*/
/*global npcs*/
/*global items*/

//set up the canvas
var canvas = document.createElement("canvas");
canvas.id = "game";
var ctx = canvas.getContext("2d");
canvas.width = 160;
canvas.height = 144;
document.body.appendChild(canvas);

//background image
var bgPNG = new Image();
bgPNG.src = "map/background.png";
bgPNG.onload = function(){
	ctx.drawImage(bgPNG, 0, 0);
};

//level
var map = [];
var rows = 30;
var cols = 40;
var size = 16;
var level_loaded = false;
var collideTiles = [4, 7, 8, 10,11,12,13,14,15,19,20,24,25,29,30,31,33,34];
var tiles = new Image();
tiles.src = "map/tileset.png";
var tilesReady = false;
tiles.onload = function(){
	tilesReady = true;
};
var tpr = 5; //tiles per row

//camera
var camera = {
	x : 0,
	y : 0
};

//////   gui   //////
//dialog
var dialogIMG = new Image();
dialogIMG.src = 'gui/dialog.png';
var dialogReady = false;
dialogIMG.onload = function(){dialogReady = true;};

var optionIMG = new Image();
optionIMG.src = "gui/choice_box.png";
var optionReady = false;
optionIMG.onload = function(){optionReady = true;};

var selectIMG = new Image();
selectIMG.src = "gui/select_box.png";
var selectReady = false;
selectIMG.onload = function(){selectReady = true;};

//quest object
var tradeObjIMG = new Image();
tradeObjIMG.src = "items/trades.png";
var tradeReady = false;
tradeObjIMG.onload = function(){tradeReady = true;};

//endgame cover
var endgameIMG = new Image();
endgameIMG.src = "gui/end_game.png";
var endgameReady = false;
endgameIMG.onload = function(){endgameReady = true;};


// directionals
var upKey = 38;     //[Up]
var leftKey = 37;   //[Left]
var rightKey = 39;  //[Rigt]
var downKey = 40;   //[Down]
var moveKeySet = [upKey, leftKey, rightKey, downKey];

// A and B
var a_key = 90;   //[Z]
var b_key = 88;   //[X]

// select and start
var select_key = 16;   //[Shift]
var start_key = 13;   //[Enter]

var actionKeySet = [a_key, b_key, select_key, start_key];
var keys = [];




//////////////////    GENERIC FUNCTIONS   ///////////////


//checks if an element is in an array
function inArr(arr, e){
	if(arr.length == 0)
		return false;
	return arr.indexOf(e) !== -1
}


//////////////////     LEVEL FUNCTIONS    ////////////////

function init(){
	//set the world map
	map = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,0,0,0,0,0,0,0],
[0,0,0,0,0,0,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,4,4,0,0,0,0,0,0],
[0,0,0,0,0,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,10,11,12,13,14,1,4,4,0,0,0,0,0],
[0,0,0,0,4,4,1,1,1,2,2,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,15,16,17,18,19,1,1,4,4,0,0,0,0],
[0,0,0,4,4,1,6,1,1,1,1,1,1,1,1,2,1,1,1,5,1,3,1,1,1,1,1,20,21,22,23,24,1,1,1,4,4,0,0,0],
[0,0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,25,26,27,28,29,1,1,1,1,4,0,0,0],
[0,0,4,4,1,1,3,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,30,31,32,33,34,1,1,1,1,4,4,0,0],
[0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
[0,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,0],
[0,4,1,1,1,1,1,1,2,1,1,3,1,1,1,2,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,6,1,1,1,4,0],
[4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,4,4],
[4,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,4],
[4,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
[4,1,1,1,1,3,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,4],
[4,1,2,1,1,1,1,1,1,1,1,1,1,5,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,3,1,5,1,1,4],
[4,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,6,1,1,4],
[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,4],
[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,4],
[4,4,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,9,8,1,9,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4],
[0,4,1,3,6,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,1,1,1,1,1,1,1,1,3,1,1,6,1,1,1,1,4,0],
[0,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,1,1,1,1,1,1,1,2,1,1,1,1,1,1,4,4,0],
[0,0,4,4,1,1,1,1,5,6,1,1,1,1,1,4,4,4,0,0,0,0,4,4,4,1,1,1,1,1,1,1,1,1,1,1,4,4,0,0],
[0,0,0,4,4,4,4,1,1,1,1,1,1,4,4,4,0,0,0,0,0,0,0,0,4,4,4,1,1,1,1,1,1,4,4,4,4,0,0,0],
[0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

level_loaded = true;
	story.kyle = kyle;
}



//////////////////  PLAYER CONTROLS /////////////////



//directional movement
function goNorth(sprite){
	if(!sprite.moving){
		sprite.initPos = Math.floor(sprite.y / size) * size;
		sprite.lastPos = [Math.floor(sprite.x / size), Math.floor(sprite.y / size)];
		sprite.dir = "north";
		sprite.action = "travel";
	}
}
function goSouth(sprite){
	if(!sprite.moving){
		sprite.initPos = Math.floor(sprite.y / size) * size;
		sprite.lastPos = [Math.floor(sprite.x / size), Math.floor(sprite.y / size)];
		sprite.dir = "south";
		sprite.action = "travel";
	}
}
function goEast(sprite){
	if(!sprite.moving){
		sprite.initPos = Math.floor(sprite.x / size) * size;
		sprite.lastPos = [Math.floor(sprite.x / size), Math.floor(sprite.y / size)];
		sprite.dir = "east";
		sprite.action = "travel";
	}
}
function goWest(sprite){
	if(!sprite.moving){
		sprite.initPos = Math.floor(sprite.x / size) * size;
		sprite.lastPos = [Math.floor(sprite.x / size), Math.floor(sprite.y / size)];
		sprite.dir = "west";
		sprite.action = "travel";
	}
}

//movement on the map
function travel(sprite){
	if(sprite.action == "travel"){   //continue if allowed to move
		var curspeed = sprite.speed;

		//travel north
		if(sprite.dir == "north"){
			if(Math.floor(sprite.y) > (sprite.initPos - size) && !collide(sprite)){
				sprite.velY = curspeed;
				sprite.y += velControl(Math.floor(sprite.y), -sprite.velY, (sprite.initPos - size));
				sprite.moving = true;
			}else{
				sprite.velY = 0;
				sprite.action = "idle";
				sprite.moving = false;
			}
		}else if(sprite.dir == "south"){
			if(Math.floor(sprite.y) < (sprite.initPos + size) && !collide(sprite)){
				sprite.velY = curspeed;
				sprite.y += velControl(Math.floor(sprite.y), sprite.velY, (sprite.initPos + size));
				sprite.moving = true;
			}else{
				sprite.velY = 0;
				sprite.action = "idle";
				sprite.moving = false;
			}
		}else if(sprite.dir == "east"){
			if(Math.floor(sprite.x) < (sprite.initPos + size) && !collide(sprite)){
				sprite.velX = curspeed;
				sprite.x += velControl(Math.floor(sprite.x), sprite.velX, (sprite.initPos + size));
				sprite.moving = true;
			}else{
				sprite.velX = 0;
				sprite.action = "idle";
				sprite.moving = false;
			}
		}else if(sprite.dir == "west"){
			if(Math.floor(sprite.x) > (sprite.initPos - size) && !collide(sprite)){
				sprite.velX = curspeed;
				sprite.x += velControl(Math.floor(sprite.x), -sprite.velX, (sprite.initPos - size));
				sprite.moving = true;
			}else{
				sprite.velX = 0;
				sprite.action = "idle";
				sprite.moving = false;
			}
		}
	}
}

//velocity control
function velControl(cur, value, max){
	//increment or decrement
	if(value > 0){
		if((cur + value) > max)
			return velControl(cur, Math.floor(value/2), max);
		else
			return value;
	}else if(value < 0){
		if((cur + value) < max)
			return velControl(cur, Math.floor(value/2), max);
		else
			return value;
	}else{
		return 1;
	}
}




/////////////////   COLLISIONS   ////////////////////



//if hit a collision point on the wall
function hitWall(person){
	if(!level_loaded)
		return false;

	//get the positions
	var rx;
	var ry;
	if(person.dir === "north" || person.dir === "west"){
		rx = Math.ceil(person.x / size);
		ry = Math.ceil(person.y / size);
	}else if(person.dir === "south" || person.dir === "east"){
		rx = Math.floor(person.x / size);
		ry = Math.floor(person.y / size);
	}
	

	//edge of map = undecided
	if(rx-1 < 0 || rx+1 >= cols || ry-1 < 0 || ry+1 >= cols)
		return;

	//decide if adjacent to person
	if(person.dir == "north" && inArr(collideTiles, map[ry-1][rx]))
		return true;
	else if(person.dir == "south" && inArr(collideTiles, map[ry+1][rx]))
		return true;
	else if(person.dir == "east" && inArr(collideTiles, map[ry][rx+1]))
		return true;
	else if(person.dir == "west" && inArr(collideTiles, map[ry][rx-1]))
		return true;
	else
		return false;
}


//if hit another person
function hitNPC(person){

	//get the positions
	var rx;
	var ry;
	if(person.dir === "north" || person.dir === "west"){
		rx = Math.ceil(person.x / size);
		ry = Math.ceil(person.y / size);
	}else if(person.dir === "south" || person.dir === "east"){
		rx = Math.floor(person.x / size);
		ry = Math.floor(person.y / size);
	}

	//decide if adjacent to person
	var ouch = false;
	for(var i=0;i<npcs.length;i++){
		var n = npcs[i];

		if(n == person || !n.show)
			continue;

		nx = Math.floor(n.x / size);
		ny = Math.floor(n.y / size);

		if(person.dir == "north" && (rx == nx) && (ry-1 == ny))
			ouch = true;
		else if(person.dir == "south" && (rx == nx) && (ry+1 == ny))
			ouch = true;
		else if(person.dir == "east" && (rx+1 == nx) && (ry == ny))
			ouch = true;
		else if(person.dir == "west" && (rx-1 == nx) && (ry == ny))
			ouch = true;
	}
	return ouch;
}

//if hit an item's boundary
function hitItem(person){
	//get the positions
	var rx;
	var ry;
	if(person.dir === "north" || person.dir === "west"){
		rx = Math.ceil(person.x / size);
		ry = Math.ceil(person.y / size);
	}else if(person.dir === "south" || person.dir === "east"){
		rx = Math.floor(person.x / size);
		ry = Math.floor(person.y / size);
	}
	
	//decide if adjacent to person
	var ouch = false;
	for(var i=0;i<items.length;i++){
		var t = items[i];
		var t_ba = t.area;
		if(t_ba == null || !t.show)
			continue;

		//get bounding box area
		var xArea = [];
		for(var z=0;z<t_ba.w;z++){
			xArea.push(t_ba.x+t.x+z);
		}
		var yArea = [];
		for(var z=0;z<t_ba.h;z++){
			yArea.push(t_ba.y+t.y+z);
		}

		//console.log(xArea + "\t" + yArea);


		if(person.dir == "north" && inArr(xArea, rx) && inArr(yArea, ry-1))
			ouch = true;
		else if(person.dir == "south" && inArr(xArea, rx) && inArr(yArea, ry+1))
			ouch = true;
		else if(person.dir == "east" && inArr(xArea, rx+1) && inArr(yArea, ry))
			ouch = true;
		else if(person.dir == "west" && inArr(xArea, rx-1) && inArr(yArea, ry))
			ouch = true;	
	}
	return ouch;

}

//if hit a specific boundary area
function hitBoundary(sprite, boundary){
	//boundary in the form [x,y,w,h]
	if(boundary == null){
		return false;
	}
	
	//get the positions
	var rx;
	var ry;
	if(sprite.dir === "north" || sprite.dir === "west"){
		rx = Math.ceil(sprite.x / size);
		ry = Math.ceil(sprite.y / size);
	}else if(sprite.dir === "south" || sprite.dir === "east"){
		rx = Math.floor(sprite.x / size);
		ry = Math.floor(sprite.y / size);
	}
	

	//edge of map = undecided
	if(rx-1 < 0 || rx+1 >= cols || ry-1 < 0 || ry+1 >= cols)
		return;

	//get bounding box area
	var xArea = [];
	for(var z=0;z<boundary.w;z++){
		xArea.push(boundary.x+z);
	}
	var yArea = [];
	for(var z=0;z<boundary.h;z++){
		yArea.push(boundary.y+z);
	}

	//console.log(xArea + "\t" + yArea);

	if(sprite.dir == "north" && (!inArr(xArea, rx) || !inArr(yArea, ry-1)))
		return true;
	else if(sprite.dir == "south" && (!inArr(xArea, rx) || !inArr(yArea, ry+1)))
		return true;
	else if(sprite.dir == "east" && (!inArr(xArea, rx+1) || !inArr(yArea, ry)))
		return true;
	else if(sprite.dir == "west" && (!inArr(xArea, rx-1) || !inArr(yArea, ry)))
		return true;
	
	return false;
}

//if hit another generic object
function hitOther(sprite, other){
	//get the positions
	var rx;
	var ry;
	if(sprite.dir === "north" || sprite.dir === "west"){
		rx = Math.ceil(sprite.x / size);
		ry = Math.ceil(sprite.y / size);
	}else if(sprite.dir === "south" || sprite.dir === "east"){
		rx = Math.floor(sprite.x / size);
		ry = Math.floor(sprite.y / size);
	}

	//decide if adjacent to sprite
	var nx = Math.floor(other.x / size);
	var ny = Math.floor(other.y / size);

	if(sprite.dir == "north" && (rx == nx) && (ry-1 == ny))
		return true;
	else if(sprite.dir == "south" && (rx == nx) && (ry+1 == ny))
		return true;
	else if(sprite.dir == "east" && (rx+1 == nx) && (ry == ny))
		return true;
	else if(sprite.dir == "west" && (rx-1 == nx) && (ry == ny))
		return true;

	return false;
}


//grouped collision checker
function collide(sprite, boundary=null){
	return hitNPC(sprite) || hitItem(sprite) || hitWall(sprite) || hitBoundary(sprite, boundary)
}


///////////////   INTERACT   ////////////////



//the interact function
function canInteract(person, item){
	if(!item.show)
		return false;

	//get the positions
		var rx;
		var ry;
		if(person.dir === "north" || person.dir === "west"){
			rx = Math.ceil(person.x / size);
			ry = Math.ceil(person.y / size);
		}else if(person.dir === "south" || person.dir === "east"){
			rx = Math.floor(person.x / size);
			ry = Math.floor(person.y / size);
		}
	
		//decide if adjacent to person
		var t = item;
		var xArea = [];
		var yArea = [];
		if(t.area !== null){
			var t_ba = item.area;

			//get bounding box area
			for(var z=0;z<t_ba.w;z++){
				xArea.push(t_ba.x+t.x+z);
			}
			for(var z=0;z<t_ba.h;z++){
				yArea.push(t_ba.y+t.y+z);
			}
		}else{
			xArea.push(t.x);
			yArea.push(t.y);
		}
		

		//determine if able to interact
		if(person.dir == "north" && (inArr(xArea, rx) && inArr(yArea, ry-1)))
			return true;
		else if(person.dir == "south" && (inArr(xArea, rx) && inArr(yArea, ry+1)))
			return true;
		else if(person.dir == "east" && (inArr(xArea, rx+1) && inArr(yArea, ry)))
			return true;
		else if(person.dir == "west" && (inArr(xArea, rx-1) && inArr(yArea, ry)))
			return true;
	
	return false;
}

//the talk function
function canTalk(person, other_pers){
	if(other_pers.moving || !other_pers.show)
		return false;

	//get the positions
		var rx;
		var ry;
		if(person.dir === "north" || person.dir === "west"){
			rx = Math.ceil(person.x / size);
			ry = Math.ceil(person.y / size);
		}else if(person.dir === "south" || person.dir === "east"){
			rx = Math.floor(person.x / size);
			ry = Math.floor(person.y / size);
		}
	
		//decide if adjacent to person
		nx = Math.floor(other_pers.x / size);
		ny = Math.floor(other_pers.y / size);

		if(person.dir == "north" && (rx == nx) && (ry-1 == ny))
			return true;
		else if(person.dir == "south" && (rx == nx) && (ry+1 == ny))
			return true;
		else if(person.dir == "east" && (rx+1 == nx) && (ry == ny))
			return true;
		else if(person.dir == "west" && (rx-1 == nx) && (ry == ny))
			return true;
}	

//faces the main character
function faceOpposite(npc){
	if(kyle.dir === "north")
		npc.dir = "south";
	else if(kyle.dir === "south")
		npc.dir = "north"
	else if(kyle.dir === "west")
		npc.dir = "east"
	else if(kyle.dir === "east")
		npc.dir = "west"
}

//non-cutscene specific behavior
function defaultBehavior(npc){
	if(!story.cutscene){
		if(npc.interact){
			clearInterval(npc.wt);
			npc.wt = 0;
		}
		if(npc.move === "drunk_walk" && !npc.interact && npc.show){
			if(npc.wt == 0 && !npc.moving){
				npc.wt = setInterval(function(){
					drunkardsWalk(npc, npc.boundary);
					clearInterval(npc.wt);
					npc.wt = 0;
				}, (Math.random() * 2 + 1)*1000);
			}
		}
	}else{
	  clearInterval(npc.wt);
	  npc.wt = 0;
	}
}



///////////////////   CAMERA  /////////////////////


//if within the game bounds
function withinBounds(x,y){
	var xBound = (x >= Math.floor(camera.x / 16) - 1) && (x <= Math.floor(camera.x / 16) + (canvas.width / 16));
	return xBound;
}

//have the camera follow the player
function panCamera(){
	if(level_loaded){
		//camera displacement
		if((kyle.x >= (canvas.width / 2)) && (kyle.x <= (map[0].length * size) - (canvas.width / 2)))
			camera.x = kyle.x - (canvas.width / 2);

		if((kyle.y >= (canvas.height / 2) - size/2) && (kyle.y <= (map.length * size) - (canvas.height / 2)))
			camera.y = kyle.y - (canvas.height / 2 - size/2);
	}
	
}

//reset the camera's position on the player
function resetCamera(){
	camera.x = 0;
	camera.y = 0;

	if((kyle.x > (map[0].length * size) - (canvas.width / 2)))
		camera.x = (map[0].length * size) - canvas.width;

	if((kyle.y > (map.length * size) - (canvas.height / 2)))
		camera.y = (map.length * size) - canvas.height;
}




///////////////////    NPCS    //////////////////



//random walking
function drunkardsWalk(sprite, boundary=null){
	var dice;
	var directions = ["north", "south", "west", "east"];
	if(!sprite.moving){
		var pseudoChar = {dir : directions[0], x : sprite.x, y : sprite.y}
		//check if it would hit other character
		do{
			dice = Math.floor(Math.random() * directions.length);
			pseudoChar.dir = directions.splice(dice, 1)[0];

			//no options left
			if(directions.length == 0)
				return;
		
		}while(collide(pseudoChar, boundary) || hitOther(pseudoChar, kyle))

		//move in direction
		if(pseudoChar.dir === "north"){
			goNorth(sprite);
		}else if(pseudoChar.dir === "south"){
			goSouth(sprite);
		}else if(pseudoChar.dir === "west"){
			goWest(sprite);
		}else if(pseudoChar.dir === "east"){
			goEast(sprite);
		}
	}
}

//look in random directions
function drunkardsLook(sprite){
	var dice;
	var directions = ["north", "south", "west", "east"];
	dice = Math.floor(Math.random() * 4);
	sprite.dir = directions[dice];
}

//act upon the robot pathQueue
function smallStep(robot){
	if(robot.pathQueue.length != 0 && !robot.moving){       //if not already moving and not an empty pathQueue
		var nextStep = robot.pathQueue[0];
		var curX = Math.floor(robot.x / 16);
		var curY = Math.floor(robot.y / 16);

		//changing y pos
		if(curX == nextStep[0]){
			if(nextStep[1] < curY)
				goNorth(robot);
			else if(nextStep[1] > curY)
				goSouth(robot);
		}   
		//changing x pos    
		else if(curY == nextStep[1]){
			if(nextStep[0] < curX)
				goWest(robot);
			else if(nextStep[0] > curX)
				goEast(robot);
		}
		//remove the node once reached
		robot.lastPos = robot.pathQueue.shift();
		//robot.lastPos = [Math.floor(robot.x / size), Math.floor(robot.y / size)];
	}
}


///////////////////  RENDER  //////////////////////

//check for render ok
function checkRender(){
	//tiles
	if(!tilesReady){
		tiles.onload = function(){
			tilesReady = true;
		};
	}

	//kyle
	if(!kyle.ready){
		kyle.img.onload = function(){kyle.ready = true;}
		if(kyle.img.width !== 0){
			kyle.ready = true;
		}
	}

	//npcs
	for(var a=0;a<npcs.length;a++){
		if(!npcs[a].ready){
			if(npcs[a].img.width !== 0){
				npcs[a].ready = true;
			}
		}
	}

	//item
	for(var i=0;i<items.length;i++){
		if(!items[i].ready){
			if(items[i].img.width !== 0){
				items[i].ready = true;
			}
		}
	}

	//gui
	if(!dialogReady){
		dialogIMG.onload = function(){dialogReady = true;};
	}
	if(!tradeReady){
		tradeObjIMG.onload = function(){tradeReady = true;};
	}
}

//rendering function for the map
function drawMap(){
	if(tilesReady && level_loaded){
		for(var y = 0; y < rows; y++){
			for(var x = 0; x < cols; x++){
				//if(withinBounds(x,y)){
					//ctx.drawImage(tiles, size * map[y][x], 0, size, size, (x * size), (y * size), size, size);
					ctx.drawImage(tiles, 
					size * Math.floor(map[y][x] % tpr), size * Math.floor(map[y][x] / tpr), 
					size, size, 
					(x * size), (y * size), 
					size, size);
				//}
			}
		}
	}
}

//draw a character sprite
function drawsprite(sprite){
	updatesprite(sprite);
	rendersprite(sprite);
}

//update animation
function updatesprite(sprite){
	//update the frames
	if(sprite.ct == (sprite.fps - 1))
		sprite.curFrame = (sprite.curFrame + 1) % sprite.seqlength;
		
	sprite.ct = (sprite.ct + 1) % sprite.fps;
}
//draw the sprite
function rendersprite(sprite){
	//set the animation sequence
	var sequence;
	if(sprite.dir == "north"){
		if(sprite.action == "idle")
			sequence = sprite.idleNorth;
		else 
			sequence = sprite.moveNorth;
	}
	else if(sprite.dir == "south"){
		if(sprite.action == "idle")
			sequence = sprite.idleSouth;
		else 
			sequence = sprite.moveSouth;
	}
	else if(sprite.dir == "west"){
		if(sprite.action == "idle")
			sequence = sprite.idleWest;
		else 
			sequence = sprite.moveWest;
	}
	else if(sprite.dir == "east"){
		if(sprite.action == "idle")
			sequence = sprite.idleEast;
		else 
			sequence = sprite.moveEast;
	}
	
	//get the row and col of the current frame
	var row = Math.floor(sequence[sprite.curFrame] / sprite.fpr);
	var col = Math.floor(sequence[sprite.curFrame] % sprite.fpr);
	
	var curheight = sprite.height;
	var offY = sprite.offsetY;
	var sprIMG = sprite.img;

	if(sprite.show && sprite.ready){
		ctx.drawImage(sprIMG, 
		col * sprite.width, row * curheight, 
		sprite.width, curheight,
		sprite.x - sprite.offsetX, sprite.y - offY, 
		sprite.width, curheight);
	}
}


//draw an item
function drawItem(item){
	if(item.ready && item.show){
		if(item.animation !== null){
			var itemANIM = item.animation;
			itemANIM.seqlength = itemANIM.curSeq.sequence.length;

			//console.log(item.name + ": " + item.animation.ct);

			//get the row and col of the current frame
			var row = Math.floor(itemANIM.curSeq.sequence[itemANIM.curFrame] / itemANIM.fpr);
			var col = Math.floor(itemANIM.curSeq.sequence[itemANIM.curFrame] % itemANIM.fpr);

			//console.log("r: " + row + "\tc: " + col + "\tf: " + itemANIM.curFrame)

			ctx.drawImage(item.img, 
				col * itemANIM.width, row * itemANIM.height, 
				itemANIM.width, itemANIM.height,
				item.x*size, item.y*size, 
				itemANIM.width, itemANIM.height);
		}else{
			ctx.drawImage(item.img, item.x*size, item.y*size);
	  	}
	}
}

//update and draw an item
function renderItem(item){
	if(item.animation !== null){
		item.animation.seqlength = item.animation.curSeq.sequence.length;
		updatesprite(item.animation);
	}
	  
	drawItem(item);
}


//show dialog gui
function drawDialog(){
	var dialogue = story.dialogue;
	var choice = story.choice_box;
	if(dialogue.show && dialogReady){
		ctx.drawImage(dialogIMG, camera.x, camera.y);
		//wrapText(dialogue.text[dialogue.index], camera.x + 12, camera.y + 116)
		showText();

		/*
		if(choice.show){
			//choice boxes
			for(var c=0;c<choice.options.length;c++){
				var cx = camera.x+6;
				var cy = camera.y+95+(-11*(c+1));
				ctx.drawImage(optionIMG, cx, cy);
				ctx.font = "6px Gameboy";
				ctx.fillText(choice.options[choice.options.length-(c+1)], cx+4, cy+9);
			}

			//select
			ctx.drawImage(selectIMG, camera.x+6, camera.y+95+(11*(choice.index-choice.options.length)));
		}
		*/

		
		if(choice.show){
			//get the maximum x length
			var longest = 10;
			if(!hasMultiLine()){
				longest = bigChoice(choice.options);
			}

			//choice boxes
			var cx = camera.x+3;
			for(var c=0;c<choice.options.length;c++){
				var cy = camera.y+95+(-((optionIMG.height-2)/2)*(sumLines(c)));

				//var cy = camera.y+95+(-(optionIMG.height-1)*((sumLines(c)*11)+1));
				ctx.drawImage(optionIMG, 0,0, optionIMG.width, optionIMG.height, 
								cx, cy, (longest/10)*(optionIMG.width), (choice.lines[c]/2)*optionIMG.height);
				choiceText(choice.options[c], choice.lines[c], cy+9);

				//ctx.font = "6px Gameboy";
				//ctx.fillText(choice.options[choice.options.length-(c+1)], cx+4, cy+9);
			}

			//select
			var cy2 = camera.y+95-((optionIMG.height-2)/2)*(sumLines(choice.index));
			//((((optionIMG.height-2)/2)*(sumLines(choice.index)))*(choice.index-choice.options.length)), 

			ctx.drawImage(selectIMG, 0,0, selectIMG.width, selectIMG.height, 
								cx, cy2,
								(longest/10)*(selectIMG.width), (choice.lines[choice.index]/2)*selectIMG.height);
		}
		
	}
}

//find the longest line of text
function bigChoice(arr){
	var longest = 0;
	for(var i=0;i<arr.length;i++){
		longest = (arr[i].length > longest ? arr[i].length : longest);
	}
	return longest+1;
}

//wrap the text if overflowing on the choice box
function choiceText(text, lines, y) {
	var texts = text.split(" | ");
	ctx.font = "6px Gameboy";
	for(var l=0;l<lines;l++){
		ctx.fillText(texts[l], camera.x+7, y+(l*9));
	}
}	

//
function sumLines(i){
	var lines = story.choice_box.lines;
	var sum = 0;
	for(var l=i;l<lines.length;l++){
		sum += lines[l];
	}
	return sum;
}

function hasMultiLine(){
	for(var l=0;l<story.choice_box.lines.length;l++){
		if(story.choice_box.lines[l] > 1)
			return true;
	}
	return false;
}


function drawTrade(){
	var row = Math.floor(kyle.tradeIndex / 7);
	var col = Math.floor(kyle.tradeIndex % 7);

	if(tradeReady)
		ctx.drawImage(tradeObjIMG,
			col * 16, row * 16,
			16, 16, 
			camera.x + 144, camera.y + 0, 
			16, 16
		)
}

function drawEndGame(){
	if(endgameReady && story.storyIndex == 1){
		ctx.drawImage(endgameIMG,camera.x,camera.y);
	}else if(!endgameReady){
		endgameIMG.onload = function(){endgameReady = true;}
	}
}

function drawGUI(){
	//drawJournal();
	drawTrade();
	drawEndGame();
	drawDialog();
}

//typewriter functions
var tw = 0;
var curLine = 0;						//current line index
var curText = "";
var text_speed = 85;
var text_time = 0;					//typewriter effect
var texting = false;				//currently typing
var lineTexts = ["", ""];		//the two lines that can be shown on screen
var maxWidth = 140;
var lineHeight = 16;
var jump = -1;

function typewrite(){	
	//pre-processing and reset
	if(!texting){
		curText = story.dialogue.text[story.dialogue.index];		//set the text to the NPC or item text 
		if(!curText)
			return;

		//check if section jump
		if(jump == -1){
			var jumper = curText.match(/<[0-9]+>/g);
			if(jumper){
				curText = curText.replace(/<[0-9]+>/g, "");
				jump = parseInt(jumper[0].replace(/[<>]/g, ""));
			}
		}
		curText = curText.replace(/<[0-9]+>/g, "");		//catch the stragler
		tw = 0;
		//console.log("restart")
		curLine = 0;
		clearText();
		ctx.font = "8px Gameboy";
		ctx.fillStyle = "#000000"
		texting = true;
	}
	if(tw < curText.length){
		//if at a new line reset
		if(curText[tw] === "|"){
			tw++;
			curLine++;
			if(curLine > 1){
				lineTexts[0] = lineTexts[1];
				lineTexts[1] = "";
			}
		}
		//append letters
		else{
			if(curLine == 0)
				lineTexts[0] += curText[tw];
			else
				lineTexts[1] += curText[tw];
		}
		text_time = setTimeout(typewrite, text_speed);
		tw++;
	}else{
		texting = false;
		clearTimeout(text_time);
		//console.log("done");
	}
}

function clearText(){
	lineTexts[0] = "";
	lineTexts[1] = "";
	clearTimeout(text_time);
}

function showText(){
	ctx.fillText(lineTexts[0], camera.x + 12, camera.y + 116);
	ctx.fillText(lineTexts[1], camera.x + 12, camera.y + 116 + lineHeight);
}

//split the text up
/*
function breakText(text, max){
	var words = text.split(' ');

	//figure out the breakoff point
	if(text.length > max){
		var retText = "";
		var breakLine = "";
		var breakIndex = 0;
		while(breakIndex < words.length){

			while((breakLine + words[breakIndex + " "]).length() < max){
				breakLine += (words[breakIndex] + " ");
				breakIndex++;
			}
			retText += (breakLine + "| ");

		}
		retText += (breakLine);
		return retText;

	}else{
		return text
	}

	//reset the words
	//nevermind

}
*/

//render everything 
function render(){
	checkRender();
	ctx.save();

	ctx.translate(-camera.x, -camera.y);

	//clear eveoything
	ctx.clearRect(camera.x, camera.y, canvas.width,canvas.height);
	
	//re-draw bg
	var ptrn = ctx.createPattern(bgPNG, 'repeat'); // Create a pattern with this image, and set it to "repeat".
	ctx.fillStyle = ptrn;
	ctx.fillRect(camera.x, camera.y, canvas.width, canvas.height);
	
	//draw the map
	drawMap();

	//draw the buildings if behind kyle

	for(var i=0;i<items.length;i++){
		if(items[i].thru)
			renderItem(items[i]);
	}

	//if npc behind kyle
	for(var c=0;c<npcs.length;c++){
		if(kyle.y >= npcs[c].y)
			drawsprite(npcs[c]);
	}

	//draw kyle
	drawsprite(kyle);

	//if npc in front of kyle
	for(var c=0;c<npcs.length;c++){
		if(kyle.y < npcs[c].y)
			drawsprite(npcs[c]);
	}

	for(var i=0;i<items.length;i++){
		if(!items[i].thru)
			renderItem(items[i]);
	}

	drawGUI();


	//if(story.area === "vals")
		//drawTestMap(levelList[1]);

	ctx.restore();
	// requestAnimationFrame(render);

}

////////////////////   KEY FUNCTIONS  //////////////////



// key events
var keyTick = 0;
var kt = null; 

//check for keydown
document.body.addEventListener("keydown", function (e) {
	//scroll through the options to choose for dialog
	if(story.cutscene && story.choice_box.show){
		var c = story.choice_box;
		if(e.keyCode == downKey || e.keyCode == rightKey)
			story.choice_box.index = (c.index + 1) % c.options.length;
		else if(e.keyCode == upKey || e.keyCode == leftKey)
			story.choice_box.index = ((c.index + c.options.length) - 1) % c.options.length;
	}
});

//determine if valud key to press
document.body.addEventListener("keydown", function (e) {
	if(inArr(moveKeySet, e.keyCode)){
		keys[e.keyCode] = true;
	}else if(inArr(actionKeySet, e.keyCode)){
		keys[e.keyCode] = true;
	}
});

//check for key released
document.body.addEventListener("keyup", function (e) {
	if(inArr(moveKeySet, e.keyCode)){
		keys[e.keyCode] = false;
	}else if(inArr(actionKeySet, e.keyCode)){
		keys[e.keyCode] = false;
		reInteract = true;
		text_speed = 85;
	}
});

//prevent scrolling with the game
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if(([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)){
        e.preventDefault();
    }
}, false);


//check if any directional key is held down
function anyKey(){
	return (keys[upKey] || keys[downKey] || keys[leftKey] || keys[rightKey])
}

//movement arrow keys
function moveKeys(){
	if(!kyle.moving && !kyle.interact  && !story.pause && !story.cutscene){
		if(keyTick < 1){
		if(keys[leftKey])         //left key
			kyle.dir = "west";
		else if(keys[rightKey])    //right key
			kyle.dir = "east";
		else if(keys[upKey])    //up key
			kyle.dir = "north";
		else if(keys[downKey])    //down key
			kyle.dir = "south";
		}else{
		if(keys[leftKey])         //left key
			goWest(kyle);
		else if(keys[rightKey])    //right key
			goEast(kyle);
		else if(keys[upKey])    //up key
			goNorth(kyle);
		else if(keys[downKey])    //down key
			goSouth(kyle);
		}
	}
}


//action and interaction keys
var reInteract = true;
var cutT = 0;
function actionKeys(){
	//interact [Z]
	var dialogue = story.dialogue;
	if(keys[a_key] && !kyle.interact && !kyle.moving && normal_game_action()){
		for(var i=0;i<items.length;i++){
			if(canInteract(kyle, items[i]) && items[i].text){
				story.trigger = "touch_" + items[i].name;
				reInteract = false;
				kyle.other = items[i];
				kyle.interact = true;

				if(!story.cutscene && !triggerWord(story.trigger)){
					dialogue.text = items[i].text;
					dialogue.index = 0;
					typewrite();
				}else{
					dialogue.index = 0;
					play();
					typewrite();
				}
				return;
			}
		}
		for(var i=0;i<npcs.length;i++){
			if(canTalk(kyle, npcs[i]) && npcs[i].text){
				story.trigger = "talk_" + npcs[i].name;

				//setup
				reInteract = false;
				kyle.other = npcs[i];
				kyle.other.interact = true;
				faceOpposite(kyle.other);
				kyle.interact = true;
				clearInterval(npcs[i].wt);
				npcs[i].wt = 0;

				//normal interaction
				if(!story.cutscene && !triggerWord(story.trigger)){
					dialogue.text = npcs[i].text;
					dialogue.index = npcs[i].text_index;
					typewrite();
				}
				//cutscene interaction
				else{
					dialogue.index = 0;
					play();
					typewrite();
				}
				return;
			}
		}
	}
	//finished current dialogue text
	else if(keys[a_key] && dialogue.show && reInteract && !texting){
		var other = kyle.other;
		reInteract = false;
		//end of dialogue
		if(dialogue.index +1 == dialogue.text.length){
			kyle.interact = false;

			//select item if options showing
			if(story.choice_box.show){
				story.trigger = "> " + story.choice_box.options[story.choice_box.index];
				story.taskIndex++;
				dialogue.index = 0;
				play();
				typewrite();
				return;
			}

			//normal reset
			if(!story.cutscene){
				kyle.other.interact = false;
				if(jump !== -1){
					kyle.other.text_index = jump;
					jump = -1;
				}
				dialogue.index = 0;
			}else{
				story.taskIndex++;
			}
		}
		//still more dialogue left
		else{
			kyle.other.text_index++;
			dialogue.index++;
			typewrite();
		}
	}
	//increase typewriter speed 
	else if(keys[a_key] && dialogue.show && texting){
		text_speed = 40;
		reInteract = false;
	}

}


function normal_game_action(){
	return (!story.cutscene && reInteract && !story.pause);
}


//main running function for the game
function main(){
	requestAnimationFrame(main);
	canvas.focus();
	render();

	//play the story
	play();

	//player movement
	if(!story.pause)
		travel(kyle);

	panCamera();

	//npc movement
	if(!story.pause){
		for(var n = 0;n<npcs.length;n++){
			var npc = npcs[n];
			travel(npc);
			defaultBehavior(npc);
		}
	}
	

	if(!story.cutscene){
		if(kyle.interact){
			story.dialogue.show = true;
		}else
			story.dialogue.show = false;
	}
	

	//keyboard ticks
	var akey = anyKey();
	if(akey && kt == 0){
		kt = setInterval(function(){keyTick+=1}, 75);
	}else if(!akey){
		clearInterval(kt);
		kt = 0;
		keyTick=0;
	}
	moveKeys();
	actionKeys();

	///////////////    DEBUG   //////////////////

	var pixX = Math.round(kyle.x / size);
	var pixY = Math.round(kyle.y / size);

	if(npcs.length > 0){
		var nx = Math.round(npcs[0].x / size);
		var ny = Math.round(npcs[0].y / size);
	}

	var settings = "X: " + Math.round(kyle.x) + " | Y: " + Math.round(kyle.y);
	settings += " --- Pix X: " + pixX + " | Pix Y: " + pixY;
	settings += " --- " + story.cutscene + " | " + story.dialogue.index + " | " + story.taskIndex;
	settings += " --- " + story.trigger
	/*
	if(npcs.length > 0){
		settings += " --- " + npcs[0].lastPos;
		//settings += " (" + npcs[0].x + ", " + npcs[0].y + ")";
	}

	settings += " ---";
	for(var a=0;a<story.kyle.pathQueue.length;a++){
		settings += " [" + story.kyle.pathQueue[a].toString() + "], ";  
	}
	*/
	
	document.getElementById('debug').innerHTML = settings;

	//console.log(keys);

}

function skip(quest, tradeItem, tradeIndex){
	story.quest = quest;
	kyle.tradeItem = tradeItem;
	kyle.tradeIndex = tradeIndex;
	coin.show = false;
}

main();