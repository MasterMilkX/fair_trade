//Game code//


//////////////////         SETUP          ///////////////

/*global cast*/
/*global npcs*/

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
var collideTiles = [4];
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

//journal system
var journalIMG = new Image();
journalIMG.src = "gui/journal.png";
var journalReady = false;
journalIMG.onload = function(){journalReady = true;};


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


//other stuffs
var items = [];



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
[0,0,0,0,0,0,4,4,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,0,0,0,0,0,0],
[0,0,0,0,0,4,4,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,0,0,0,0,0],
[0,0,0,0,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,0,0,0,0],
[0,0,0,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,0,0,0],
[0,0,0,4,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1,4,0,0,0],
[0,0,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,4,4,0,0],
[0,0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0,0],
[0,4,4,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,4,4,0],
[0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0],
[4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4],
[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
[4,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,4],
[4,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
[4,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,4],
[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
[4,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
[4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,3,1,1,1,1,4,4],
[0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,0],
[0,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,0],
[0,0,4,4,1,1,1,1,1,1,1,1,1,1,1,4,4,4,0,0,0,0,0,4,4,4,1,1,1,1,1,1,1,1,1,1,4,4,0,0],
[0,0,0,4,4,4,4,1,1,1,1,1,1,4,4,4,0,0,0,0,0,0,0,0,0,4,4,4,1,1,1,1,1,4,4,4,4,0,0,0],
[0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

level_loaded = true;

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
		var curspeed = (sprite.board ? sprite.hover_speed : sprite.speed);

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

		if(n == person)
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
		if(t_ba == null)
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
	if(other_pers.moving)
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

		if((kyle.y >= (canvas.height / 2)) && (kyle.y <= (map.length * size) - (canvas.height / 2)))
			camera.y = kyle.y - (canvas.height / 2);
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
		if(sprite.action == "idle" && !sprite.board)
			sequence = sprite.idleNorth;
		else 
			sequence = sprite.moveNorth;
	}
	else if(sprite.dir == "south"){
		if(sprite.action == "idle"  && !sprite.board)
			sequence = sprite.idleSouth;
		else 
			sequence = sprite.moveSouth;
	}
	else if(sprite.dir == "west"){
		if(sprite.action == "idle"  && !sprite.board)
			sequence = sprite.idleWest;
		else 
			sequence = sprite.moveWest;
	}
	else if(sprite.dir == "east"){
		if(sprite.action == "idle"  && !sprite.board)
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
	if(item.animation !== null)
		updatesprite(item.animation);
	drawItem(item);
}

//show dialog gui
function drawDialog(){
	var dialogue = story.dialogue;
	var choice = story.choice_box;
	if(dialogue.show){
		ctx.drawImage(dialogIMG, camera.x, camera.y);
		wrapText(dialogue.text[dialogue.index], camera.x + 20, camera.y + 260)
	
		if(choice.show){
			for(var c=0;c<choice.options.length;c++){
				var cx = camera.x+232;
				var cy = camera.y+216+(-23*(c+1));
				ctx.drawImage(optionIMG, cx, cy);
				ctx.font = "12px Fixedsys";
				ctx.fillText(choice.options[choice.options.length-(c+1)], cx+8, cy+14);
			}

			ctx.drawImage(selectIMG, camera.x+232, camera.y+216+(23*(choice.index-choice.options.length)));
		}
	}
}
var indexOffset;

function drawJournal(){
	var j = story.journal;

	if(j.show){
		//w:112 h:240
		ctx.drawImage(journalIMG, camera.x+200, camera.y+24);
		
		//set the cutoff
		var max = (j.entries.length > 9 ? 9 : j.entries.length);
		if(j.index >= (j.window+10))
			j.window = j.index-9;
		else if(j.index < (j.window))
			j.window--;

		//var indexOffset;
		if (j.index == (j.window+9))
			indexOffset = 9
		else if(j.index == (j.window))
			indexOffset = 0;
		else
			indexOffset = j.index - j.window;

		for(var i=0;i<=max;i++){
			var ix = camera.x+200;
			var iy = camera.y+24+(23*(i));
			ctx.font = "12px Fixedsys";
			ctx.fillStyle = "#000000";
			ctx.fillText(j.entries[i+j.window], ix+8, iy+14);
		}
		
		ctx.drawImage(selectIMG, 
			0, 0,
			80, 24,
			camera.x+200, camera.y+24+(23*(indexOffset)),
			112, 24);
	}
}

function drawGUI(){
	drawJournal();
	drawDialog();
}

//wrap the text if overflowing on the dialog
function wrapText(text, x, y) {
	ctx.font = "20px Fixedsys";
	ctx.fillStyle = "#000000"

	var maxWidth = 280;
	var lineHeight = 30;
	var words = text.split(' ');
	var line = '';

	for(var n=0;n<words.length;n++) {
		var testLine = line + words[n] + ' ';
		var metrics = ctx.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && n > 0) {
			ctx.fillText(line, x, y);
			line = words[n] + ' ';
			y += lineHeight;
		}
		else {
			line = testLine;
		}
	}
	ctx.fillText(line, x, y);
}


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
	if(story.cutscene && story.choice_box.show){
		var c = story.choice_box;
		if(e.keyCode == downKey || e.keyCode == rightKey)
			story.choice_box.index = (c.index + 1) % c.options.length;
		else if(e.keyCode == upKey || e.keyCode == leftKey)
			story.choice_box.index = ((c.index + c.options.length) - 1) % c.options.length;
	}

	if(story.journal.show){
		var i = story.journal;
		if(e.keyCode == downKey || e.keyCode == rightKey)
			story.journal.index = (i.index + 1) % i.bag.length;
		else if(e.keyCode == upKey || e.keyCode == leftKey)
			story.journal.index = ((i.index + i.bag.length) - 1) % i.bag.length;
	}
});

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
	if(!kyle.moving && !kyle.interact  && !story.pause && !story.journal.show){
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
var reInteract = false;
function actionKeys(){

	//interact [Z]
	var dialogue = story.dialogue;
	if(keys[a_key] && !kyle.interact && !kyle.moving && normal_game_action() && !story.journal.show){
		for(var i=0;i<items.length;i++){
			if(canInteract(kyle, items[i]) && items[i].text){
				story.trigger = "touch_" + items[i].name;
				reInteract = false;
				kyle.other = items[i];
				kyle.interact = true;
				dialogue.text = items[i].text;
				dialogue.index = 0;
				return;
			}
		}
		for(var i=0;i<npcs.length;i++){
			if(canTalk(kyle, npcs[i]) && npcs[i].text){
				story.trigger = "talk_" + npcs[i].name;
				reInteract = false;
				kyle.other = npcs[i];
				kyle.other.interact = true;
				faceOpposite(kyle.other);
				kyle.interact = true;
				dialogue.text = npcs[i].text;
				dialogue.index = 0;
				clearInterval(npcs[i].wt);
				npcs[i].wt = 0;
				
				return;
			}
		}
	}else if(keys[a_key] && dialogue.show && reInteract){
		reInteract = false;
		if(dialogue.index +1 == dialogue.text.length){
			//select item if options showing
			if(story.choice_box.show){
				story.trigger = "> " + story.choice_box.options[story.choice_box.index];
			}
			
			kyle.interact = false;
			kyle.other.interact = false;
			
		}else{
			dialogue.index++;
		//console.log('next')
		}
	}

	//hoverboard
	if(keys[a_key] && normal_game_action() && !kyle.interact && !story.journal.show){
		reInteract = false;
		kyle.board = !kyle.board;
	}

	//journal
	if(keys[b_key] && normal_game_action()){
		reInteract = false;
		story.journal.show = !story.journal.show;
		console.log("show journal");
	}
}


function normal_game_action(){
	return (reInteract && !story.pause);
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
	

	if(kyle.interact){
		story.dialogue.show = true;
	}else
		story.dialogue.show = false;
	

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
	settings += " --- " + story.dialogue.index;

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

main();