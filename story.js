/*global levelList*/

var story = {
	//character stats
	kyle : null,

	//level data
	size : 16,
	pause : false,

	//mission
	//quest : "Introduction",
	quest : "Introduction",
	storyIndex : 0,
	taskIndex : 0,
	trigger : "none",
	cutscene : false,

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
		lines : [],
		show : false
	},

	curItem : ""

};

//reset the gui and cutscene stuff within the game
function endScene(){
	story.taskIndex = 0;
	story.dialogue.show = false;
	story.choice_box.show = false;
	story.cutscene = false;
	story.kyle.other.interact = false;
	story.kyle.interact = false;
	story.dialogue.index = 0;
}


//check for trigger words
function triggerWord(word){
	if(story.quest === "Introduction"){
		if(word === "talk_Kimi")
			return true;
	}
}

//count the lines from each choice given
function countChoice(){
	var choice = story.choice_box;
	var lines = [];
	for(var c=0;c<choice.options.length;c++){
		lines.push(choice.options[c].split(" | ").length);
	}
	choice.lines = lines;
}

//make new choice boxes
function newChoice(options){
	story.choice_box.show = true;
	story.choice_box.options = options;
	countChoice();
}

//reset the choice options
function endChoice(){
	story.choice_box.show = false;
	story.choice_box.index = 0;
	story.choice_box.lines = [];
}

//the entire script for the game
function play(){
	//make local variables
	var trigger = story.trigger;
	var storyIndex = story.storyIndex;
	var taskIndex = story.taskIndex;
	var cutscene = story.cutscene;
	var dialogue = story.dialogue;
	var choice = story.choice_box;


if(story.quest === "Introduction" && storyIndex == 0){
	//START KIMI QUEST
	if(trigger === "talk_Kimi"){
		story.cutscene = true;
		if(taskIndex == 0){
			dialogue.text = ["...", "...Uh, hi?"];
			dialogue.show = true;
		}else if(taskIndex == 1){
			//newChoice(["Hi", "...hi", "Hi there!"]);
			newChoice(["Hi", "...hi", "How's it | going?"]);
		}
	}else if(trigger === "> Hi"){
		if(taskIndex == 2){
			endChoice();
			dialogue.text = ["...", "Ok then..."];
			dialogue.show = true;
		}else if(taskIndex == 3){
			endScene();
		}
	}else if(trigger === "> ...hi"){
		if(taskIndex == 2){
			endChoice()
			dialogue.text = ["Well somebody's | moody", 
							"And for once | it's not me"];
			dialogue.show = true;
		}else if(taskIndex == 3){
			endScene();
		}
	}else if(trigger === "> Hi there!" || trigger === "> How's it | going?"){
		if(taskIndex == 2){
			endChoice()
			dialogue.text = ["!", 
							"God you're | chipper", 
							"It's almost | annoying actually"];
			dialogue.show = true;
		}else if(taskIndex == 3){
			endScene();
		}
	}
}

/*
//test option and inventory
if(aMission("Lucky") && storyIndex == 0){
	var ev = getEvent("Lucky");
	if(ev.task === "Punch Me"){
		if(area === "q2_newton"){
			if(trigger === "talk_damon"){
				story.cutscene = true;
				if(taskIndex == 0){
					dialogue.text = ["Damon: Feeling lucky?"];
					choice.show = true;
					choice.options = ["Sure?", "Not really"];
					dialogue.show = true;
				}else{
					reset();
				}
			}
			else if(trigger === "> Sure?" && taskIndex == 1){
				dialogue.text = ["Damon: Then punch me! I dare you!"];
				choice.show = true;
				choice.options = ["Punch", "Don't Punch"];
				dialogue.show = true;			
			}else if(trigger === "> Not really"){
				if(taskIndex == 1){
					choice.show = false;
					dialogue.text = ["Damon: Ha! Didn't think so!"];
					dialogue.show = true;
				}else{
					story.taskIndex = 0;
					story.cutscene = false;
				}
			}else if(trigger === "> Punch"){
				if(taskIndex == 2){
					choice.show = false;
					dialogue.text = ["POW!", 
									"Damon: Whoa! That's quite a punch!",
									"I underestimated you, " + story.natName + "!", 
									"Here's a prize",
									story.natName + " got a badge...?",
									"Damon: That'll show everyone you're not", "somebody to mess with!"];
					dialogue.show = true;
				}else{
					getCharbyName("damon").text = ["Damon: That'll show everyone you're not", "somebody to mess with!"]
					story.inventory.bag.push("punch badge");
					ev.task = "Go for a walk";
					story.cutscene = false;
					story.taskIndex = 0;
				}
			}else if(trigger === "> Don't Punch"){
				if(taskIndex == 2){
					choice.show = false;
					dialogue.text = ["Damon: Chicken..."];
					dialogue.show = true;
				}else{
					story.taskIndex = 0;
					story.cutscene = false;
				}
			}
		}
	}else if(ev.task === "Go for a walk"){
		if(area === "q2_newton"){
			if(trigger === "talk_damon"){
				story.cutscene = true;
				if(taskIndex == 0){
					dialogue.text = ["Damon: Hey " + story.natName + ", let's go for a space walk"]
					dialogue.show = true;
				}else if(taskIndex == 1){
					dialogue.show = false;
					dialogue.index = 0;
					story.nat.board = false;
					//goto 
					var damon = getCharbyName("damon");
					gotoPos(damon, [13, 21], story.level, story.size);
					story.taskIndex = 2;
				}else if(taskIndex == 2){
					var damon = getCharbyName("damon");
					var dx = Math.floor(damon.x/story.size);
					var dy = Math.floor(damon.y/story.size);

					follow(story.nat, damon)

					if((dx == 13) && (dy == 21) && (!damon.moving))
						story.taskIndex = 3;					
					
				}else if(taskIndex == 3){
					story.nat.following = false;
					faceOpposite(getCharbyName("damon"), story.nat)
					dialogue.text = ["Damon: That was a fun walk"];
					dialogue.show = true;
				}else{
					getCharbyName("damon").text = ["Damon: That's enough walking for today..."]
					story.storyIndex = 1;
					dialogue.show = false;
					story.cutscene = false;
					story.events.splice(story.events.indexOf(ev), 1);
				}
			}
		}
	}
}
*/

}
