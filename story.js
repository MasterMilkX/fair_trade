/*global levelList*/

var story = {
	//character stats
	kyle : null,

	//level data
	size : 16,
	pause : false,

	//mission
	events : [ //new event("Casette Present", "Reciever"),
			   new event("Lucky", "Punch Me"),
			   new event("Gamer", "High Score")],
	storyIndex : 0,
	taskIndex : 0,
	trigger : "none",

	//dialogue
	dialogue : {
		text : "",
		index : 0,
		show : false
	},

	//choice 
	choice_box : {
		options : [],
		index : 0,
		show : false
	},

	//inventory
	journal : {
		entries : ['hover board', 'guitar pick', 'banana', 
		'your mom', 'doggo', 'pikachu', 
		'communism', 'dick fingers', 'fart in a jar',
		'space book', 'piggy', 'hacker manifesto'],
		index : 0, 
		show : 0,
		window : 0
	},

	curItem : "",

	world_clock : {
		time : [9,0],
		day : 1,
		show : true,
	}

};

function event(mission, task){
	this.mission = mission;
	this.task = task;
}



function getEvent(mission){
	for(var m=0;m<story.events.length;m++){
		if(story.events[m].mission === mission)
			return story.events[m];
	}
}

function getCharbyName(name){
	for(var c=0;c<story.level.chars.length;c++){
		var char = story.level.chars[c];
		if(char.name === name)
			return char;
	}
	return null;
}


//the entire script for the game
function play(){
	//make local variables
	var area = story.area;
	var trigger = story.trigger;
	var storyIndex = story.storyIndex;
	var taskIndex = story.taskIndex;
	var cutscene = story.cutscene;
	var dialogue = story.dialogue;
	var choice = story.choice_box;

}