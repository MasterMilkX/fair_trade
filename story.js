/*global levelList*/

var story = {
	//character stats
	kyle : null,

	//level data
	size : 16,
	pause : false,

	//mission
	//quest : "Introduction",
	quest : "Begin",
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

	corrupt : false

};

//reset the gui and cutscene stuff within the game
function endScene(){
	story.taskIndex = 0;
	story.dialogue.show = false;
	story.dialogue.text = "";
	story.choice_box.show = false;
	story.cutscene = false;
	story.kyle.other.interact = false;
	story.kyle.interact = false;
	story.dialogue.index = 0;
	story.trigger = "none";
}


//check for trigger words
function triggerWord(word){
	if(word === "touch_keyhole"){
		if(story.kyle.tradeItem === "special key" || story.kyle.tradeItem === "corrupt key" || story.kyle.tradeItem === "master key")
			return true;
		else 
			return false;
	}else if(word === "touch_dummy"){
		return false;
	}else{
		return true;
	}	
	
	/*
	if(story.quest === "Introduction"){
		if(word === "talk_Kimi")
			return true;
	}else if(story.quest === "Kimi")
		return true;
	else if(story.quest === "Sid")
		return true;
	else if(story.quest === "Chi")
		return true;
	else if(story.quest === "Grace")
		return true;
	else if(story.quest === "Amber")
		return true;
	else if(story.quest === "Kay")
		return true;
	*/
}

function newDialog(dialogue){
	story.dialogue.text = dialogue;
	story.dialogue.show = true;
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
	var questItem;
	var kyle;
	if(story.kyle){
		kyle = story.kyle;
		questItem = kyle.tradeItem;
	}


if(story.quest === "Begin"){
	if(trigger === "touch_coin"){
		story.cutscene = true;
		if(taskIndex == 0){
			newDialog(["(you picked up | the token)"])
			coin.show = false;
			story.kyle.tradeIndex = 6;
			story.kyle.tradeItem = "token";
		}else if(taskIndex == 1){
			story.quest = "Introduction";
			endScene();
		}
	}
}

else if(story.quest === "Introduction"){

	////////////////////
	//START KIMI QUEST//
	///////////////////
	if(trigger === "talk_Kimi"){
		story.cutscene = true;
		if(taskIndex == 0){
			newDialog(["...", "...Uh, hi?"]);
		}else if(taskIndex == 1){
			newChoice(["Hi.", "Hi?", "Hi!"]);
		}
	}

	//SAY HI
	else if(trigger === "> Hi."){
		if(taskIndex == 2){
			endChoice();
			newDialog(["...", "...Right", 
						"I don't think | I've seen you | around", "Who are you?"]);
		}else if(taskIndex == 3){
			newChoice(["Kyle", "Kyle I | guess", "Kyle?", "I'm Kyle!"])
		}
	}else if(trigger === "> Hi?"){
		if(taskIndex == 2){
			endChoice()
			newDialog(["Hmm...", "You seem | unsure of that",
					"I don't think | I've seen you | around", "Who are you?"]);
		}else if(taskIndex == 3){
			newChoice(["Kyle", "Kyle I | guess", "Kyle?", "I'm Kyle!"])
		}
	}else if(trigger === "> Hi!"){
		if(taskIndex == 2){
			endChoice()
			newDialog(["!", 
							"God you're | chipper", 
							"It's almost | annoying actually",
							"I don't think | I've seen you | around", "Who are you?"]);
		}else if(taskIndex == 3){
			newChoice(["Kyle", "Kyle I | guess", "Kyle?", "I'm Kyle!"])
		}
	}

	//WHO ARE YOU?
	else if(trigger === "> Kyle" && kyle.other.name == "Sid"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["Hmm...", "Ok then... | Kyle...",
					"I'm Kimi",
					"How'd you get | that token?"])
		}else if(taskIndex == 5){
			newChoice(["Found it", "Do you | want it?", "Beats me"]);
		}
	}else if(trigger === "> Kyle I | guess" && kyle.other.name == "Sid"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["Kyle I. Guess?", 
				"That's quite a | name", 
				"I'll call you | Kyle for short",
				"I'm Kimi",
				"How'd you get | that token?"])
		}else if(taskIndex == 5){
			newChoice(["Found it", "Do you | want it?", "Beats me"]);
		}
	}else if(trigger === "> Kyle?" && kyle.other.name == "Sid"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["You don't know?", 
						"... Well...", 
						"I guess people | don't really have | a choice on what | they get to be | called",
						"I'm Kimi", 
						"How'd you get | that token?"])
		}else if(taskIndex == 5){
			newChoice(["Found it", "Do you | want it?", "Beats me"]);
		}
	}else if(trigger === "> I'm Kyle!" && kyle.other.name == "Sid"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["Wow...", "You seem pretty | proud of that", 
				"Kyle's an OK name | I suppose...",
				"I'm Kimi",
				"How'd you get | that token?"]);
		}else if(taskIndex == 5){
			newChoice(["Found it", "Do you | want it?", "Beats me"]);
		}
	}

	//GET THE TOKEN?
	else if(trigger === "> Found it"){
		if(taskIndex == 6){
			endChoice();
			newDialog(["Lucky you", "That token can get | you a lot here",
						"I'll trade you | something for it", 
						"On this world, we | get what we need | by trading",
						"I need something | very important",
						"And I can give | you something | important in | return",
						"If you give me | the token, I'll | give you | something that | you can trade | with other people",
						"So what do you | say?"])
		}else if(taskIndex == 7){
			newChoice(["Deal", "No deal"])
		}
	}else if(trigger === "> Do you | want it?"){
		if(taskIndex == 6){
			endChoice();
			newDialog(["Sure...", "But people don't | just give things | away around here",
						"I'll trade you | something for it", 
						"On this world, we | get what we need | by trading",
						"I need something | very important",
						"And I can give | you something | important in | return",
						"If you give me | the token, I'll | give you | something that | you can trade | with other people",
						"So what do you | say?"])
		}else if(taskIndex == 7){
			newChoice(["Deal", "No deal"])
		}
	}else if(trigger === "> Beats me"){
		if(taskIndex == 6){
			endChoice();
			newDialog(["Hmm...", 
						"I'll trade you | something for it", 
						"On this world, we | get what we need | by trading",
						"I need something | very important",
						"And I can give | you something | important in | return",
						"If you give me | the token, I'll | give you | something that | you can trade | with other people",
						"So what do you | say?"])
		}else if(taskIndex == 7){
			newChoice(["Deal", "No deal"])
		}
	}

	//DEAL OR NO DEAL
	else if(trigger === "> Deal" && kyle.other.name == "Kimi"){
		if(taskIndex == 8){
			endChoice();
			newDialog(["Cool",
					"(you give the | token to Kimi)",
					"Take this",
					"(you got a flute | from Kimi)",
					"You can't play it | - even if you | tried",
					"There's another | person around | that can though - | or would at least | find some use for | it",
					"Go find them, and | they'll probably | trade you | something for it",
					"When you find | something that I | could use, come | back to me",
					"I'll give you | something you | need",
					"It's a fair trade"])
		}else if(taskIndex == 9){
			story.quest = "Kimi"
			story.kyle.tradeItem = "flute";
			story.kyle.tradeIndex = 7;
			endScene();
		}
	}else if(trigger === "> No deal" && kyle.other.name == "Kimi"){
		if(taskIndex == 8){
			endChoice();
			newDialog(["Hmm...",
					"Think again...",
					"Are you REALLY | sure, Kyle?"])
		}else if(taskIndex == 9){
			newChoice(["I changed | my mind", "Just | kidding", "You can | have it"])
		}
	}else if(trigger === "> I changed | my mind" && kyle.other.name == "Kimi"){
		if(taskIndex == 10){
			endChoice();
			newDialog(["No use fighting | it",
					"(you give the | token to Kimi)",
					"Take this",
					"(you got a flute | from Kimi)",
					"You can't play it | - even if you | tried",
					"There's another | person around | that can though - | or would at least | find some use for | it",
					"Go find them, and | they'll probably | trade you | something for it",
					"When you find | something that I | could use, come | back to me",
					"I'll give you | something you | need",
					"It's a fair trade"])
		}else if(taskIndex == 11){
			story.quest = "Kimi"
			story.kyle.tradeItem = "flute";
			story.kyle.tradeIndex = 7;
			endScene();
		}
	}else if(trigger === "> Just | kidding"){
		if(taskIndex == 10){
			endChoice();
			newDialog(["No use fighting | it",
					"(you give the | token to Kimi)",
					"Take this",
					"(you got a flute | from Kimi)",
					"You can't play it | - even if you | tried",
					"There's another | person around | that can though - | or would at least | find some use for | it",
					"Go find them, and | they'll probably | trade you | something for it",
					"When you find | something that I | could use, come | back to me",
					"I'll give you | something you | need",
					"It's a fair trade"])
		}else if(taskIndex == 11){
			story.quest = "Kimi"
			story.kyle.tradeItem = "flute";
			story.kyle.tradeIndex = 7;
			endScene();
		}
	}else if(trigger === "> You can | have it" && kyle.other.name == "Kimi"){
		if(taskIndex == 10){
			endChoice();
			newDialog(["No use fighting | it",
					"(you give the | token to Kimi)",
					"Take this",
					"(you got a flute | from Kimi)",
					"You can't play it | - even if you | tried",
					"There's another | person around | that can though - | or would at least | find some use for | it",
					"Go find them, and | they'll probably | trade you | something for it",
					"When you find | something that I | could use, come | back to me",
					"I'll give you | something you | need",
					"It's a fair trade"])
		}else if(taskIndex == 11){
			story.quest = "Kimi"
			story.kyle.tradeItem = "flute";
			story.kyle.tradeIndex = 7;
			endScene();
		}
	}



	///////////////////
	//START SID QUEST//
	///////////////////
	if(trigger === "talk_Sid"){
		story.cutscene = true;
		if(taskIndex == 0){
			newDialog(["Whoa!",
			"Hey, I didn't | see you there!",
			"How's it going, | dude? I'm Sid"])
		}else if(taskIndex == 1){
			newChoice(["Kyle", "Name's | Kyle", "I think | I'm Kyle", "Sup? I'm | Kyle"]);
		}
	}
	//name choice
	else if(trigger === "> Kyle" && kyle.other.name == "Sid"){
		if(taskIndex == 2){
			endChoice();
			newDialog(["Nice... That's a | pretty great | name",
					"Hey do you have | any records?",
					"I've gotten | really into | vinyl lately"])
		}else if(taskIndex == 3){
			newChoice(["Nope, | sorry", "No, but | I have | this", "I broke | them"]);
		}
	}else if(trigger === "> Name's | Kyle" && kyle.other.name == "Sid"){
		if(taskIndex == 2){
			endChoice();
			newDialog(["Coolio dude!",
					"Nice to meet you",
					"Hey do you have | any records?",
					"I've gotten | really into | vinyl lately"])
		}else if(taskIndex == 3){
			newChoice(["Nope, | sorry", "No, but | I have | this", "I broke | them"]);
		}
	}else if(trigger === "> I think | I'm Kyle" && kyle.other.name == "Sid"){
		if(taskIndex == 2){
			endChoice();
			newDialog(["You think?",
				"Well.. I'll call | you Kyle until | you feel like | being called | something else",
					"Hey do you have | any records?",
					"I've gotten | really into | vinyl lately"])
		}else if(taskIndex == 3){
			newChoice(["Nope, | sorry", "No, but | I have | this", "I broke | them"]);
		}
	}else if(trigger === "> Sup? I'm | Kyle" && kyle.other.name == "Sid"){
		if(taskIndex == 2){
			endChoice();
			newDialog(["Man... you seem | cool Kyle!",
					"Hey do you have | any records?",
					"I've gotten | really into | vinyl lately"])
		}else if(taskIndex == 3){
			newChoice(["Nope, | sorry", "No, but | I have | this", "I broke | them"]);
		}
	}
	//no record
	else if(trigger === "> Nope, | sorry"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["Ah no worries my | dude",
						"They're hard to | come by anyways",
						"Yo! What's that?"]);
		}else if(taskIndex == 5){
			newChoice(["A token?", "I don't | know", "I found | it"]);
		}
	}else if(trigger === "> No, but | I have | this"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["Have what?",
						"Yo! What's that?"]);
		}else if(taskIndex == 5){
			newChoice(["A token?", "I don't | know", "I found | it"]);
		}
	}else if(trigger === "> I broke | them"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["Aw bummer...",
						"Oh well!",
						"Yo! What's that?"]);
		}else if(taskIndex == 5){
			newChoice(["A token?", "I don't | know", "I found | it"]);
		}
	}

	//show token
	else if(trigger === "> A token?"){
		if(taskIndex == 6){
			endChoice();
			newDialog(["A token...",
					"That seems about | right!",
					"I'll trade you | something really | cool for it",
					"Really really | cool"])
		}else if(taskIndex == 7){
			newChoice(["Deal", "No deal"]);
		}
	}else if(trigger === "> I don't | know"){
		if(taskIndex == 6){
			endChoice();
			newDialog(["It looks super | cool though!",
					"I'll trade you | something really | cool for it",
					"Really really | cool"])
		}else if(taskIndex == 7){
			newChoice(["Deal", "No deal"]);
		}
	}else if(trigger === "> I found | it"){
		if(taskIndex == 6){
			endChoice();
			newDialog(["Whoa really? | Just like that?",
					"Must be lucky!",
					"I'll trade you | something really | cool for it",
					"Really really | cool"])
		}else if(taskIndex == 7){
			newChoice(["Deal", "No deal"]);
		}
	}

	//deal or no deal
	else if(trigger === "> Deal" && kyle.other.name == "Sid"){
		if(taskIndex == 8){
			endChoice();
			newDialog(["Sweet! Thanks!",
				"(you give the | token to Sid)",
				"Here you go my | dude",
				"(you got a | mixtape from | Sid)",
				"That's one of my | fire mixtapes",
				"I've been | meaning to | spread the word | and tell people | about it",
				"But it's still | needs | something...",
				"Talk to people | about the | mixtape and | they'll probably | give you stuff | to trade for it",
				"If you can find | me the thing | that I need, | I'll trade you | something even | cooler, Kyle",
				"It'll be a fair | trade"])
		}else if(taskIndex == 9){
			story.quest = "Sid"
			story.kyle.tradeItem = "mixtape";
			story.kyle.tradeIndex = 14;
			endScene();
		}
	}else if(trigger === "> No deal" && kyle.other.name == "Sid"){
		if(taskIndex == 8){
			endChoice();
			newDialog(["Aw c'mon",
				"Really dude?",
				"Are you | ABSOLUTELY sure, | Kyle?"])
		}else if(taskIndex == 9){
			newChoice(["I | changed | my mind", "I don't | want it | anymore", "You can | have it"])
		}
	}else if((trigger === "> I | changed | my mind" || trigger === "> I don't | want it | anymore" || trigger === "> You can | have it") && kyle.other.name == "Sid"){
		if(taskIndex == 10){
			endChoice();
			newDialog(["Heh... that's | the spirit!",
				"(you give the | token to Sid)",
				"Here you go my | dude",
				"(you got a | mixtape from | Sid)",
				"That's one of my | fire mixtapes",
				"I've been | meaning to | spread the word | and tell people | about it",
				"But it's still | needs | something...",
				"Talk to people | about the | mixtape and | they'll probably | give you stuff | to trade for it",
				"If you can find | me the thing | that I need, | I'll trade you | something even | cooler, Kyle",
				"It'll be a fair | trade"])
		}else if(taskIndex == 11){
			story.quest = "Sid"
			story.kyle.tradeItem = "mixtape";
			story.kyle.tradeIndex = 14;
			endScene();
		}
	}



	/////////////////////
	//START GRACE QUEST//
	/////////////////////

	if(trigger === "talk_Grace"){
		story.cutscene = true;
		if(taskIndex == 0){
			newDialog(["*gasp*",
				"You scared the | life out of me!",
				"Haha! Just | kidding!",
				"I'm already a | ghost"])
		}else if(taskIndex == 1){
			newChoice(["You're | dead?", "You took | this | lightly", "A ghost | or a | spirit"]);
		}
	}
	//ghost?
	else if(trigger === "> You're | dead?"){
		if(taskIndex == 2){
			endChoice();
			newDialog(["Yep!",
				"It's ok though",
				"It's really | relaxing just | floating around",
				"I'm Grace by the | way",
				"What's your name?"]);
		}else if(taskIndex == 3){
			newChoice(["Kyle", "I'm Kyle", "Probably | Kyle", "Uh... | Kyle"])
		}
	}else if(trigger === "> You took | this | lightly"){
		if(taskIndex == 2){
			endChoice()
			newDialog(["Haha! That was a | great pun!",
				"I'm Grace by the | way",
				"What's your name?"]);
		}else if(taskIndex == 3){
			newChoice(["Kyle", "I'm Kyle", "Probably | Kyle", "Uh... | Kyle"])
		}
	}else if(trigger === "> A ghost | or a | spirit"){
		if(taskIndex == 2){
			endChoice()
			newDialog(["I'm a ghost but | full of spirit!",
				"I'm Grace by the | way",
				"What's your name?"]);
		}else if(taskIndex == 3){
			newChoice(["Kyle", "I'm Kyle", "Probably | Kyle", "Uh... | Kyle"])
		}
	}
	//what's your name
	else if(trigger === "> Kyle"  && kyle.other.name === "Grace"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["Kyle?",
				"That's a nice | name!",
				"Hey, what's that | thingy?"])
		}else if(taskIndex == 5){
			newChoice(["A | thingy?", "A token?", "Nothing"])
		}
	}else if(trigger === "> I'm Kyle"  && kyle.other.name === "Grace"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["Hi Kyle!",
				"Nice to meet you!",
				"Hey, what's that | thingy?"])
		}else if(taskIndex == 5){
			newChoice(["A | thingy?", "A token?", "Nothing"])
		}
	}else if(trigger === "> Probably | Kyle"  && kyle.other.name === "Grace"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["Probably?",
				"I don't meet a | lot of people | named \"Probably\"",
				"But I'll | definitely | remember \"Kyle\" | so I'll call you | that",
				"Hey, what's that | thingy?"])
		}else if(taskIndex == 5){
			newChoice(["A | thingy?", "A token?", "Nothing"])
		}
	}else if(trigger === "> Uh... | Kyle"  && kyle.other.name === "Grace"){
		if(taskIndex == 4){
			endChoice();
			newDialog(["Okee dokee Kyle!",
				"Hey, what's that | thingy?"])
		}else if(taskIndex == 5){
			newChoice(["A | thingy?", "A token?", "Nothing"])
		}
	}

	//what's that?
	else if(trigger === "> A | thingy?" && kyle.other.name === "Grace"){
		if(taskIndex == 6){
			endChoice();
			newDialog(["Yeah a thingy!",
				"A special thingy!",
				"Do you wanna | trade?",
				"I can give you | something really | nice for it~"])
		}else if(taskIndex == 7){
			newChoice(["Deal", "No deal"]);
		}
	}else if(trigger === "> A token?" && kyle.other.name === "Grace"){
		if(taskIndex == 6){
			endChoice();
			newDialog(["Yeah! One of | those things!",
				"I can't believe | you have one!",
				"Do you wanna | trade?",
				"I can give you | something really | nice for it~"])
		}else if(taskIndex == 7){
			newChoice(["Deal", "No deal"]);
		}
	}else if(trigger === "> Nothing" && kyle.other.name === "Grace"){
		if(taskIndex == 6){
			endChoice();
			newDialog(["Pssh... I can see | it clear as my | body, Kyle",
				"You've got a | thingy!",
				"Do you wanna | trade?",
				"I can give you | something really | nice for it~"])
		}else if(taskIndex == 7){
			newChoice(["Deal", "No deal"]);
		}
	}

	//deal or no deal
	else if(trigger === "> Deal" && kyle.other.name === "Grace"){
		if(taskIndex == 8){
			endChoice();
			newDialog(["Yay! I'm so | happy!",
				"(you give the | token to Grace)",
				"Thanks Kyle!",
				"Here... just as | promised",
				"(you got a fairy | from Grace)",
				"That's a magic | fairy I caught | that can heal",
				"I don't think | it'll work on you | since you look | pretty healthy",
				"And it doesn't | work on me | because I'm | already dead",
				"But if you give | it to someone | else who it CAN | work on, they'll | give you | something in | return",
				"If you find me | another thingy | I'll give you | another thingy",
				"I'll keep it a | fair trade",
				"Pinky promise!"]);
		}else if(taskIndex == 9){
			story.quest = "Grace"
			story.kyle.tradeItem = "fairy";
			story.kyle.tradeIndex = 21;
			endScene();
		}
	}else if(trigger === "> No deal" && kyle.other.name === "Grace"){
		if(taskIndex == 8){
			endChoice();
			newDialog(["Aw pleeaase Kyle?",
				"Can I PLEASE have | it?"]);
		}else if(taskIndex == 9){
			newChoice(["Sure why | not", "You can | have the | token", "Yeah of | course"])
		}
	}else if((trigger === "> Sure why | not" || trigger === "> You can | have the | token" || trigger === "> Yeah of | course") && kyle.other.name === "Grace"){
		if(taskIndex == 10){
			endChoice();
			newDialog(["I knew you'd | come around!",
				"(you give the | token to Grace)",
				"Thanks Kyle!",
				"Here... just as | promised",
				"(you got a fairy | from Grace)",
				"That's a magic | fairy I caught | that can heal",
				"I don't think | it'll work on you | since you look | pretty healthy",
				"And it doesn't | work on me | because I'm | already dead",
				"But if you give | it to someone | else who it CAN | work on, they'll | give you | something in | return",
				"If you find me | another thingy | I'll give you | another thingy",
				"I'll keep it a | fair trade",
				"Pinky promise!"]);
		}else if(taskIndex == 11){
			story.quest = "Grace"
			story.kyle.tradeItem = "fairy";
			story.kyle.tradeIndex = 21;
			endScene();
		}
	}


}





else if(story.quest === "Kimi"){
	if(story.kyle.tradeItem === "flute"){
		//non-questers
		if(trigger === "talk_Kimi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Yeah?"]);
			}else if(taskIndex == 1){
				newChoice(["Trade?", "Can you | play this | flute?"]);
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Kimi"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["...", "Are you kidding?", 
						"I'm the one who | gave you that",
						"Find someone | else who could | use it"])
			}else if(taskIndex == 3){
				endScene();
			}
			
		}else if(trigger === "> Can you | play this | flute?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["...", "A long time ago | I could", "I don't anymore"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Chi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Oh, what a | lovely flute."])
			}else if(taskIndex == 1){
				newChoice(["Thanks. | Kimi gave | it to me"])
			}
		}else if(trigger === "> Thanks. | Kimi gave | it to me"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Really?",
							"I never took | Kimi for a | musician",
							"Sid seems more | like the person | with an ear for | music"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Kay"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["AGH! What is | that?! A | weapon?!"])
			}else if(taskIndex == 1){
				newChoice(["It's a | flute"])
			}
		}else if(trigger === "> It's a | flute"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["A flute?",
							"Like the music?",
							"I don't trust it.",
							"I'd be careful | with that thing"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Grace"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Wow! A flute!", "It looks really | familiar..."])
			}else if(taskIndex == 1){
				newChoice(["Have you | seen this | before?"])
			}
		}else if(trigger === "> Have you | seen this | before?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Someone I used | to know had a | flute like that",
							"They played it | beautifully!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Amber"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Is that a | flute?"])
			}else if(taskIndex == 1){
				newChoice(["Yep"])
			}
		}else if(trigger === "> Yep"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Rad! It's | absolutely | gorgeous",
							"Seems pretty | old though...",
							"I only like new | stuff",
							"And vintage | stuff!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		//main quester
		if(trigger === "talk_Sid"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Whoa! Is that a | flute?"])
			}else if(taskIndex == 1){
				newChoice(["Trade?", "Ye"])
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Sid"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Heck yeah, dude! | I've always | wanted to learn | how to play a | flute",
					"(you give | the flute to | Sid)",
					"Now I can | finally play | that solo from | that one song",
					"Here take | this. It only | feels fair if I | give you | something in | return",
					"(you got a | S.A. Knife from | Sid)",
					"It's got all | sorts of | features and | tools on it",
					"You can totally | fix anything | with it"]);
			}else if(taskIndex == 3){
				story.kyle.tradeItem = "s.a. knife";
				story.kyle.tradeIndex = 8;
				endScene();
			}
		}else if(trigger === "> Ye"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Man I've always | wanted a flute!",
						"I bet you're | pretty good with | it",
						"Can you play | me a song?"])
			}else if(taskIndex == 3){
				newChoice(["Of course", "I don't | know how"])
			}
		}else if(trigger === "> Of course"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["(you try to play | the flute - but | no music comes | out)",
						"Hmm... must be | magic or | something"])
			}else if(taskIndex == 5){
				endScene();
			}
		}else if(trigger === "> I don't | know how"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Aw... that's | ok dude!", "Practice makes | perfect anyways!"])
			}else if(taskIndex == 5){
				endScene();
			}
		}
	}else if(story.kyle.tradeItem === "s.a. knife"){
		//non-questers
		if(trigger === "talk_Sid"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Yo bro!"]);
			}else if(taskIndex == 1){
				newChoice(["Trade?", "What does | the S.A. | mean?"]);
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Sid"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Haha! I gave you | that dude!",
							"I've fixed up | just about | everything on my | car",
							"Someone else | might need it as | a tool or weapon | though"])
			}else if(taskIndex == 3){
				endScene();
			}
		}else if(trigger === "> What does | the S.A. | mean?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Uh...", "Sushi Alliance?"]);
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Chi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Hmm... A thing?"])
			}else if(taskIndex == 1){
				newChoice(["A thingy"])
			}
		}else if(trigger === "> A thingy"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Well said, | friend",
							"An interesting | thingy indeed"]);
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Kimi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["A knife?"])
			}else if(taskIndex == 1){
				newChoice(["Gimme all | your | money, | punk"])
			}
		}else if(trigger === "> Gimme all | your | money, | punk"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["...",
						"You know I'm a | ninja/samurai, | right?",
						"With a much | bigger weapon?",
						"The odds are | not in your | favor, Kyle"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Grace"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["*gasp* What a | cool little | doo-dad!"])
			}else if(taskIndex == 1){
				newChoice(["I know | right?"])
			}
		}else if(trigger === "> I know | right?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["I bet you could | make or fix all | sorts of | things!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Amber"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Erm... What | does that do?"])
			}else if(taskIndex == 1){
				newChoice(["Lots o' | stuff"])
			}
		}else if(trigger === "> Lots o' | stuff"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Oh...",
							"Rad",
							"Kay likes | things that do | lots of stuff | too",
							"Or is it lots | of stuff that | do things?"])
			}else if(taskIndex == 3){
				endScene();
			}
		}


		//main questers
		if(trigger === "talk_Kay"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Careful with | that thing! ",
					"Do you know how | to use it?!"])
			}else if(taskIndex == 1){
				newChoice(["Trade?", "Mostly"])
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Kay"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["I mean... if | you're not gonna | use it",
					"I could use | the knife to | protect Amber | from invaders",
					"(you give | the S.A. Knife | to Kay)",
					"Well I found | this while | patrolling the | castle",
					"(you got a | feather from | Kay)",
					"I don't know | who or what it | came from but | you can keep it"])
			}else if(taskIndex == 3){
				story.kyle.tradeItem = "feather";
				story.kyle.tradeIndex = 9;
				endScene();
			}
		}else if(trigger === "> Mostly"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Mostly?!?!", "Oh jeez!", "You could be a | dangerous invader", "AAAAGHGHGH!!!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}
	}else if(story.kyle.tradeItem === "feather"){
		//non-questers
		if(trigger === "talk_Kay"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Agh! A feather! | A torture weapon!"]);
			}else if(taskIndex == 1){
				newChoice(["Trade?", "Torture?"]);
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Kay"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Well... I think | I gave that to | you",
							"And frankly that | thing scares me | to death"])
			}else if(taskIndex == 3){
				endScene();
			}
		}else if(trigger === "> Torture?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Tickle torture!",
							"It's horrible!", "It's like torture!",
							"...Wait.."])
			}else if(taskIndex == 3){
				endScene();
			}
		}


		if(trigger === "talk_Chi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Ah, a feather! | As light as the | soul"])
			}else if(taskIndex == 1){
				newChoice(["How much | do souls | weigh?"])
			}
		}else if(trigger === "> How much | do souls | weigh?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Hmm...",
							"As much as a | feather, I'd | wager!",
							"You should ask | Grace to be | sure"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Kimi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["A feather?"])
			}else if(taskIndex == 1){
				newChoice(["Don't | make me | use this!"])
			}
		}else if(trigger === "> Don't | make me | use this!"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["...",
						"You're gonna | tickle me to | death?",
						"Or are you just | trying to make | me smile?",
						"Either way - | it's not gonna | work, Kyle"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Sid"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["That's a big | feather!"])
			}else if(taskIndex == 1){
				newChoice(["It came | from a | big bird"])
			}
		}else if(trigger === "> It came | from a | big bird"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Must be exotic!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Amber"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["That feather | looks familiar"])
			}else if(taskIndex == 1){
				newChoice(["Kay gave | it to me"])
			}
		}else if(trigger === "> Kay gave | it to me"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Oh, right.",
							"It probably | fell out of his | helmet and | spooked him"])
			}else if(taskIndex == 3){
				endScene();
			}
		}


		//main questers
		if(trigger === "talk_Grace"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Wow! That | feather is | beautiful!"])
			}else if(taskIndex == 1){
				newChoice(["Trade?", "You think | so?"])
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Grace"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Oh definitely!",
						"I could | probably tickle | people with it | and have such a | fun time!",
						"(you give | the feather to | Grace)",
						"Hey! I | picked this the | other day",
						"(you got a | flower from | Grace)",
						"You should | give it to | someone special"]);
			}else if(taskIndex == 3){
				story.kyle.tradeItem = "flower";
				story.kyle.tradeIndex = 10;
				endScene();
			}
		}else if(trigger === "> You think | so?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Absolutely!","A beautiful | feather from a | beautiful | creature"])
			}else if(taskIndex == 3){
				endScene();
			}
		}
	}else if(story.kyle.tradeItem === "flower"){
		//non-questers
		if(trigger === "talk_Grace"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Do you like the | flower?"]);
			}else if(taskIndex == 1){
				newChoice(["Trade?", "I love | it"]);
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Grace"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Psh! You're | funny",
				"I gave it to | you silly!",
				"You should | give it to | someone to | brighten their | day"])
			}else if(taskIndex == 3){
				endScene();
			}
		}else if(trigger === "> I love | it"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["I'm so glad!",
							"I always loved | flowers too",
							"They smelled | amazing"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Kay"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Is that a | flower?"])
			}else if(taskIndex == 1){
				newChoice(["Will you | marry me?"])
			}
		}else if(trigger === "> Will you | marry me?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["!",
						"I think you're | supposed to | propose with a | ring..?!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Kimi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["A flower?"])
			}else if(taskIndex == 1){
				newChoice(["Pretty?"])
			}
		}else if(trigger === "> Pretty?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["I suppose...",
							"Smells nice at | least"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Sid"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Cool flower!"])
			}else if(taskIndex == 1){
				newChoice(["A | million | psychadel| -ic colors"])
			}
		}else if(trigger === "> A | million | psychadel| -ic colors"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Heh...I might | be slightly | color-blind",
							"It looks yellow | to me"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Amber"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Hey! What a | rare flower"])
			}else if(taskIndex == 1){
				newChoice(["Rare?"])
			}
		}else if(trigger === "> Rare?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["I don't see | them grow often",
							"Just around | Grace and Chi | once in a blue | moon or | whatever"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		//main questers
		if(trigger === "talk_Chi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["That is | certainly a | healthy flower"])
			}else if(taskIndex == 1){
				newChoice(["Trade?", "How can | you tell?"])
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Chi"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["I don't see why | not",
						"(you give the | flower to Chi)",
						"Wait I have an | idea",
						"(you got oil | from Chi)",
						"This oil is | made from the | same flower",
						"It takes 5 | years off your | life",
						"or at least | makes you feel | like it does",
						"It's full of | positive energy"]);

			}else if(taskIndex == 3){
				story.kyle.tradeItem = "oil";
				story.kyle.tradeIndex = 11;
				endScene();
			}
		}else if(trigger === "> How can | you tell?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["The petals and | the stem",
					"Not many | flowers like | that grow around | here", 
					"I haven't | seen them in | some time"])
			}else if(taskIndex == 3){
				endScene();
			}
		}
	}else if(story.kyle.tradeItem === "oil"){
		//non-questers
		if(trigger === "talk_Chi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Lovely fragrance | isn't it?"]);
			}else if(taskIndex == 1){
				newChoice(["Trade?", "How'd you | make it?"]);
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Chi"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["But alas, I am | the original | owner",
				"And the only | fragrance I use | is the natural | odor of nature"])
			}else if(taskIndex == 3){
				endScene();
			}
		}else if(trigger === "> How'd you | make it?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Old trade secret"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Kay"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["What's that | smell?"])
			}else if(taskIndex == 1){
				newChoice(["Oil"])
			}
		}else if(trigger === "> Oil"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Amber would | probably love | that",
						"She always | smells so nice | when I pass her"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Kimi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Hmm... smells | nice"])
			}else if(taskIndex == 1){
				newChoice(["How nice?"])
			}
		}else if(trigger === "> How nice?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["...",
							"Nice?"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Sid"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Whoa that | smells better | than my car!"])
			}else if(taskIndex == 1){
				newChoice(["Your car?"])
			}
		}else if(trigger === "> Your car?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Yeah... my car | smells like | pizza and | takeout food",
							"I love it!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Grace"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Wow! Did my | flower make | that?"])
			}else if(taskIndex == 1){
				newChoice(["Yep"])
			}
		}else if(trigger === "> Yep"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["It smells even | better than it | did as a | flower!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		//main questers
		if(trigger === "talk_Amber"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Oh! What smells | so heavenly?", "Is it that oil?"])
			}else if(taskIndex == 1){
				newChoice(["Trade?", "No, it's | just me"])
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Amber"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Yeah! It's looks | amazing!",
					"(you give | the oil to | Amber)",
					"Here you can | have this", 
					"(you got a | ribbon from | Amber)",
					"I've got a new | accessory so I | won't be needing | this old thing",
					"I feel 5 | years younger | and so positive!"]);

			}else if(taskIndex == 3){
				story.kyle.tradeItem = "ribbon";
				story.kyle.tradeIndex = 12;
				endScene();
			}
		}else if(trigger === "> No, it's | just me"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Oh boy!",
							"Whatever | you're doing | keep it up",
							"You'll have | people following | you wherever you | go smelling that | amazing"]);
			}else if(taskIndex == 3){
				endScene();
			}
		}
	}else if(story.kyle.tradeItem === "ribbon"){
		//non-questers
		if(trigger === "talk_Amber"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Hey~"]);
			}else if(taskIndex == 1){
				newChoice(["Trade?", "Happy | Birthday!"]);
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Amber"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Sweetie I gave | you that ribbon",
				"It's probably | not your style - | but there's | gotta be someone | who would rock | it"])
			}else if(taskIndex == 3){
				endScene();
			}
		}else if(trigger === "> Happy | Birthday!"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["?",
				"But it's not | my birthday",
				"... Are you | the present?"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Kay"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Ribbon?!"])
			}else if(taskIndex == 1){
				newChoice(["What's | wrong?"])
			}
		}else if(trigger === "> What's | wrong?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Ribbons are so | binding",
						"They can be | used as a | blindfold!",
						"Then who knows | what could | happen!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Chi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Ah a ribbon!"])
			}else if(taskIndex == 1){
				newChoice(["What do I | do with | it?"])
			}
		}else if(trigger === "> What do I | do with | it?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["You could use | it to wrap a | present",
							"There's no | better time | like the | present"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Sid"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["That ribbon | looks sleek"])
			}else if(taskIndex == 1){
				newChoice(["It's | really | long"])
			}
		}else if(trigger === "> It's | really | long"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Yeah, you could | probably jump | rope with it!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		if(trigger === "talk_Grace"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["What a pretty | ribbon!"])
			}else if(taskIndex == 1){
				newChoice(["I look | pretty?"])
			}
		}else if(trigger === "> I look | pretty?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Uh huh!",
							"You look just | like Kimi | actually!"])
			}else if(taskIndex == 3){
				endScene();
			}
		}

		//main questers
		if(trigger === "talk_Kimi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["...A ribbon?"])
			}else if(taskIndex == 1){
				newChoice(["Trade?", "How does | it make | me look?"])
			}
		}else if(trigger === "> Trade?" && story.kyle.other.name === "Kimi"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Hmm...",
				"I do need | a new ribbon",
				"And this one | looks...nice",
				"(you give Kimi | the ribbon)",
				"Ok... You got | me what I needed",
				"Here you go, | Kyle",
				"(you got | a special key from | Kimi)",
				"That's a fair | trade",
				"Take good care | of that key"]);

			}else if(taskIndex == 3){
				story.kyle.tradeItem = "special key";
				story.kyle.tradeIndex = 13;
				endScene();
			}
		}else if(trigger === "> How does | it make | me look?"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["...", "...Pretty?",
							"It's not really | your style to be | honest"]);
			}else if(taskIndex == 3){
				endScene();
			}
		}
	}else if(story.kyle.tradeItem === "special key"){

		if(trigger === "talk_Grace" || trigger === "talk_Chi" || trigger === "talk_Sid" || trigger === "talk_Amber" || trigger === "talk_Kay" || trigger === "talk_Kimi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Use the key"])
			}else if(taskIndex == 1){
				endScene();
			}
		}

		if(trigger === "touch_keyhole"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Use the key?"])
			}else if(taskIndex == 1){
				newChoice(["Leave", "Stay"]);
			}
		}else if(trigger === "> Stay"){
			if(taskIndex == 2){
				endChoice();
				endScene();
			}
		}
		//epilogue
		else if(trigger === "> Leave"){
			if(taskIndex == 2){
				endChoice();
				story.storyIndex = 1;
				newDialog(["(you find | yourself in a | room with | samurai swords | and watercolor | paintings hung | on the walls.)",
							"(you're sitting | on a pillow | with a teapot | filled with | jasmine tea and | 2 cups on a | table in front | of you)",
							"(the room smells | of flowers and | smoke - a | violin plays | faintly in the | distance)",
							"(you feel a | sense of | peace... | but incomplete)",
							"(try again?)"])
			}else if(taskIndex == 3){
				newChoice(["Yes", "No"]);
			}
		}else if(trigger === "> No"){
			if(taskIndex == 4){
				endChoice();
				endScene();
				story.cutscene = true;
			}
		}else if(trigger === "> Yes"){
			if(taskIndex == 4){
				endChoice();
				story.quest = "Begin";
				story.storyIndex = 0;
				story.kyle.tradeItem = "none";
				story.kyle.tradeIndex = 0;
				coin.show = true;
				endScene();
			}
		}
	}
}




else if(story.quest === "Sid"){
	//mixtape
	if(story.kyle.tradeItem === "mixtape"){
		if(story.kyle.other == null)
			return;

		//non-questors
		if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Yo!"])
				}else if(taskIndex == 1){
					newChoice("Trade?", "How can | I listen | to it?");
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog([	"lol",
						"I've listened to | that tape a | billion times | dude",
						"Figured out the | perfect sequence | of songs too!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> How can | I listen | to it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog([	"Oh! Right! So...",
						"... Um...",
						"Hmm...",
						"...",
						"No clue..."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...Is that a | tape?"]);
				}else if(taskIndex == 1){
					newChoice(["Yeah | it's | mixed"]);
				}
			}else if(trigger === "> Yeah | it's | mixed"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
							"With what and | what?"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ah, a mixed | tape!"]);
				}else if(taskIndex == 1){
					newChoice(["Can | music | touch | you?"]);
				}
			}else if(trigger === "> Can | music | touch | you?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Music can indeed | touch you",
						"Make sure you | give consent | first"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Cool mixtape."]);
				}else if(taskIndex == 1){
					newChoice(["Sid said | it's | fire"]);
				}
			}else if(trigger === "> Sid said | it's | fire"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["FIRE?!",
						"Put it out!!",
						"You could burn | down the castle | you maniac!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa, who's hot | jams?"]);
				}else if(taskIndex == 1){
					newChoice(["Sid made | it"]);
				}
			}else if(trigger === "> Sid made | it"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["No way!",
						"He's got good | taste",
						"Grace is a big | fan of his | tapes."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//quest recipient
		if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh! Is that | one of those | mixtapes I've | heard about?"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Yeah it's | fire"])
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh yes please!",
						"(you give Grace | the mixtape)",
						"Thanks! I'm so | excited to | listen to it!",
						"I found this | really pretty | gem - you can | have it",
						"(you got a | sapphire from | Grace)",
						"It matches your | hair and | clothes!"])
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "sapphire";
					story.kyle.tradeIndex = 15;
					endScene();
				}
			}else if(trigger === "> Yeah it's | fire"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh wow! I | haven't listened | to it yet",
						"I'll be sure to | keep an | extinguisher | around"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}

	//sapphire
	else if(story.kyle.tradeItem === "sapphire"){
		if(story.kyle.other == null)
			return;

		//non-questors
		if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hi!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "The blue | is | really | pretty"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog([	"Oh I don't need | it back",
						"I've stared at | it so much I'm | surprised I'm | not seeing blue!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> The blue | is | really | pretty"){
				if(taskIndex == 2){
					endChoice();
					newDialog([	"Yeah!",
						"It's almost | unreal!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Where'd you get | that sapphire?"]);
				}else if(taskIndex == 1){
					newChoice(["Grace | gave it | to me"]);
				}
			}else if(trigger === "> Grace | gave it | to me"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Hmm...",
						"Nice shade of | blue...",
						"Amber will | probably go | crazy for that | gem"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["A sapphire - | I've never seen | anything so blue"]);
				}else if(taskIndex == 1){
					newChoice(["What | about | the sky?"]);
				}
			}else if(trigger === "> What | about | the sky?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"The sky?",
						"I thought the | sky was | multicolored | pixels"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Agh! That gem is | so shiny it's | blinding!"]);
				}else if(taskIndex == 1){
					newChoice(["(point | it at | Kay)"]);
				}
			}else if(trigger === "> (point | it at | Kay)"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["AGH! My eyes!!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Dude! That's the | coolest rock | I've ever seen!"]);
				}else if(taskIndex == 1){
					newChoice(["How many | rocks | have you | seen?"]);
				}
			}else if(trigger === "> How many | rocks | have you | seen?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["At least...",
						"...",
						"15!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//quest recipient
		if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ohmigosh! That | gem!"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Razzle | Dazzle"])
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Wow really? | Thanks!",
						"(you give the | sapphire to | Amber)",
						"This'll look | great on my | crown",
						"Here take these",
						"(you got | slippers from | Amber)",
						"Those things are | super comfy",
						"They make you | feel like you're | walking on air"])
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "slippers";
					story.kyle.tradeIndex = 16;
					endScene();
				}
			}else if(trigger === "> Razzle | Dazzle"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["?",
							"Uh... ok?"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}else if(story.kyle.tradeItem === "slippers"){
		if(story.kyle.other == null)
			return;

		//non-questors
		if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey~"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Do you | have | these in | a size | 10?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog([	"Boy! I gave you | those slippers, | remember?",
						"*sigh* You're | funny"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Do you | have | these in | a size | 10?"){
				if(taskIndex == 2){
					endChoice();
					newDialog([	"Um...",
						"I don't think so"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Aw! Cute | slippers!"]);
				}else if(taskIndex == 1){
					newChoice(["Cute?"]);
				}
			}else if(trigger === "> Cute?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Definitely!",
						"If they were | bunnies they'd | be even cuter!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Those slippers | look comfortable"]);
				}else if(taskIndex == 1){
					newChoice(["Ultimate | comfort"]);
				}
			}else if(trigger === "> Ultimate | comfort"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["That's a key to | happiness!",
						"Live as | comfortably as | possible."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Are those magic | slippers?"]);
				}else if(taskIndex == 1){
					newChoice(["Magic?"]);
				}
			}else if(trigger === "> Magic?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Slippers can | make you move | quietly",
						"Like a ninja or | something",
						"Kimi would know"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Slippers?"]);
				}else if(taskIndex == 1){
					newChoice(["Fancy | socks"]);
				}
			}else if(trigger === "> Fancy | socks"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Bro!",
						"You make a good | point!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		//quest recipient
		if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hmm... | slippers..."]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Click | your | heels"])
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"Sure...",
						"They'll help me | sneak around",
						"(you give the | slippers to | Kimi)",
						"I don't really | use this thing | anymore since I | have my katana",
						"So you can have | it",
						"(you got a staff | from Kimi)",
						"Good for | whacking people"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "staff";
					story.kyle.tradeIndex = 17;
					endScene();
				}
			}else if(trigger === "> Click | your | heels"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...why would I | do that?",
						"This isn't some | kind of fairy | tale"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}else if(story.kyle.tradeItem === "staff"){
		if(story.kyle.other == null)
			return;

		//non-questors
		if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Yeah?"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Wanna | go?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"I gave you that | staff",
						"I'll stick with | my katana"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Wanna | go?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"You know the | reason I gave | you that staff | was because I | upgraded to a | katana",
						"Which means my | weapon is better | than the one you | currently have",
						"Are you serious?",]);
				}else if(taskIndex == 3){
					newChoice(["Yeah | let's | fight!", "I | changed | my mind"])
				}
			}else if(trigger === "> I | changed | my mind"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Smart"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> Yeah | let's | fight!"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Omae wa mou | shindeiru",
						"(nani?)",
						"(you get hit in | the face with | the butt of | Kimi's katana)",
						"I'll kill you - | I'm not even | worried about it"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*gasp* That | staff!"]);
				}else if(taskIndex == 1){
					newChoice(["What | about | it?"]);
				}
			}else if(trigger === "> What | about | it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["It looks so | cool!",
						"It makes you | look like a kung | fu master!",
						"Just like Chi!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["That's a really | long stick!"]);
				}else if(taskIndex == 1){
					newChoice(["It's a | staff"]);
				}
			}else if(trigger === "> It's a | staff"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Huh...",
					"Must have came | from a really | tall tree"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey! Watch where | you swing that | thing!"]);
				}else if(taskIndex == 1){
					newChoice(["Huh?"]);
				}
			}else if(trigger === "> Huh?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["(you turn around | swinging the | staff)",
						"AGH!",
						"(Kay ducks down)",
						"Careful!!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Can that thing | make you fly, | Kyle?"]);
				}else if(taskIndex == 1){
					newChoice(["Fly?"]);
				}
			}else if(trigger === "> Fly?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yeah dude!",
						"I saw a staff | that could make | a guy fly one | time!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		//quest recipient
		if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh my! That's | quite the | staff"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "I know | kung fu"])
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["It'd be my | pleasure",
						"Staffs are the | perfect | instrument of | balance",
						"(you give the | staff to Chi)",
						"I've just | freshly brewed | some of this tea",
						"I'll give you a | cup",
						"(you got tea | from Chi)",
						"It's chai... I | think"])
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "tea";
					story.kyle.tradeIndex = 18;
					endScene();
				}
			}else if(trigger === "> I know | kung fu"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Is that so?",
					"Can you | demonstrate for | me?"])
				}else if(taskIndex == 3){
					newChoice(["I'd | rather | not", "Of | course"]);
				}
			}else if(trigger === "> Of | course"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["(you try to | twirl the staff | but you end up | hitting yourself | in the face)",
					"...",
					"*snicker*"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> I'd | rather | not"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Understandable",
					"Power like that | should be | reserved as | protection"])
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}
	}else if(story.kyle.tradeItem === "tea"){
		if(story.kyle.other == null)
			return;

		//non-questors
		if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey~"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Please | sir, may | I have | some | more?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh I've got | plenty of tea",
						"You should share | the tea I gave | you with someone | who needs it"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Please | sir, may | I have | some | more?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["You must empty | your cup before | you can fill it | again"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ooo, tea!"]);
				}else if(taskIndex == 1){
					newChoice(["Want | some?"]);
				}
			}else if(trigger === "> Want | some?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I'd love to",
						"But | unfortunately | tea just goes | straight through | me",
						"Figuratively and | literally!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Is that tea?"]);
				}else if(taskIndex == 1){
					newChoice(["Yep"]);
				}
			}else if(trigger === "> Yep"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Hmm...",
						"I'm more of a | iced sugar-free | vanilla latte | with soy milk | and caramel | drizzle kind of | girl"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hmm... smells | like chai"]);
				}else if(taskIndex == 1){
					newChoice(["It is"]);
				}
			}else if(trigger === "> It is"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Ah...",
						"Personally, I | think jasmine is | better"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey, tea!"]);
				}else if(taskIndex == 1){
					newChoice(["Thirsty?"]);
				}
			}else if(trigger === "> Thirsty?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh nah bro. I've | got enough | energy drinks to | keep me awake | for an eternity",
						"Kay is probably | thirsty from | patrolling that | castle though",
						"And wearing that | heavy armor"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		//quest recipient
		if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*sigh* This | armor can get | heavy"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Can I | wear it?"])
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["You want to | trade my armor?",
						"Wait is that | tea?",
						"...",
						"I can't give you | the armor... But | I'm so | thirsty...",
						"Tell you what | I'll give you | something else | that I've had | for a while",
						"(you give the | tea to Kay)",
						"(you got an EP | Record from Kay)",
						"I don't remember | who I got that | record from...",
						"And the band | sounds really | obscure",
						"But thanks for | the tea!"])
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "ep record";
					story.kyle.tradeIndex = 19;
					endScene();
				}
			}else if(trigger === "> Can I | wear it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["?!",
							"This armor is | for knights | only!"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}else if(story.kyle.tradeItem === "ep record"){
		if(story.kyle.other == null)
			return;

		//non questors
		if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh... hi!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "How do I | play | this?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Um...",
						"Actually... I | gave that record | to you",
						"I don't have | time to play it",
						"I've got a | castle to | protect!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> How do I | play | this?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I think some | kind of spinny | thing",
						"I've seen them | before somewhere",
						"Can't | remember..."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What a cool | disk!"]);
				}else if(taskIndex == 1){
					newChoice(["Wanna | play | frisbee?"]);
				}
			}else if(trigger === "> Wanna | play | frisbee?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh my | coordination is | awful",
				"I'm not very | good at catching | anything",
				"I can't even | catch a cold!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey, that's | pretty retro!"]);
				}else if(taskIndex == 1){
					newChoice(["Groovy | man"]);
				}
			}else if(trigger === "> Groovy | man"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Right on!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Who's record is | that?"]);
				}else if(taskIndex == 1){
					newChoice(["Kay's"]);
				}
			}else if(trigger === "> Kay's"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"Kay listens to | music?",
						"I didn't think | he could hear | anything through | that metal | helmet"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ah, an | old-fashioned | vinyl record"]);
				}else if(taskIndex == 1){
					newChoice(["Old?"]);
				}
			}else if(trigger === "> Old?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Sid used to have | some a very long | time ago",
						"His music choice | was...",
						"...unique"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//quest recipient
		if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa! A | record! And my | favorite band | too!"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "It's my | favorite | band too"])
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Bro! It's just | what I wanted!",
						"And in mint | condition too!",
						"Kyle, my dude, | you've been a | real pal to me.",
						"I want you to | have this",
						"(you got a | special key from | Sid)",
						"Fair trade buddy",
						"I'll see you | later!"])
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "special key";
					story.kyle.tradeIndex = 20;
					endScene();
				}
			}else if(trigger === "> It's my | favorite | band too"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Really?",
						"What's your | favorite song?"]);
				}else if(taskIndex == 3){
					newChoice(["Uh", "I Can't | Remember", "Generic | Songname"])
				}
			}else if(trigger === "> Uh"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Oh man that's a | classic!",
					"The guitar solo | is just wicked"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> I Can't | Remember"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Oh that's pretty | popular",
						"That's what got | me into the band"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> Generic | Songname"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Dude! That's the | best one!",
						"You have great | taste, Kyle"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}
	}else if(story.kyle.tradeItem === "special key"){
		if(story.kyle.other == null)
			return;

		if(trigger === "talk_Grace" || trigger === "talk_Chi" || trigger === "talk_Sid" || trigger === "talk_Amber" || trigger === "talk_Kay" || trigger === "talk_Kimi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Use the key"])
			}else if(taskIndex == 1){
				endScene();
			}
		}

		if(trigger === "touch_keyhole"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Use the key?"])
			}else if(taskIndex == 1){
				newChoice(["Leave", "Stay"]);
			}
		}else if(trigger === "> Stay"){
			if(taskIndex == 2){
				endChoice();
				endScene();
			}
		}
		//epilogue
		else if(trigger === "> Leave"){
			if(taskIndex == 2){
				endChoice();
				story.storyIndex = 1;
				newDialog(["(you find | yourself in a | dark room filled | with flashing | blue neon | lights, fog, and | the static from | a TV)",
					"(you're sitting | on a bean bag | chair with a box | of pizza, empty | cans, and a | video game | controller in | front of you)",
					"(party music | plays loudly but | muffled in | another area - | the bass | vibrating | through your | core)",
					"(you feel a | sense of | peace... but | incomplete)",
							"(try again?)"])
			}else if(taskIndex == 3){
				newChoice(["Yes", "No"]);
			}
		}else if(trigger === "> No"){
			if(taskIndex == 4){
				endChoice();
				endScene();
				story.cutscene = true;
			}
		}else if(trigger === "> Yes"){
			if(taskIndex == 4){
				endChoice();
				story.quest = "Begin";
				story.storyIndex = 0;
				story.kyle.tradeItem = "none";
				story.kyle.tradeIndex = 0;
				coin.show = true;
				endScene();
			}
		}
	}
}
else if(story.quest === "Grace"){
	//fairy
	if(story.kyle.tradeItem === "fairy"){
		if(story.kyle.other == null)
			return;

		//non-questors
		if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hi Kyle!"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Is the | fairy | ok?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Hehe! I just gave | that to you Kyle!",
						"You better hurry | and find someone | who can use that | fairy",
						"They can get very | antsy"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Is the | fairy | ok?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yeah definitely!",
						"I asked her first | if it was ok",
						"Fairies love to | have companions"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What is that?"]);
				}else if(taskIndex == 1){
					newChoice(["A fairy"]);
				}
			}else if(trigger === "> A fairy"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"Does it grant | wishes or | something?"]);
				}else if(taskIndex == 3){
					newChoice(["No it | heals", "That's a | genie"]);
				}
			}else if(trigger === "> No it | heals"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["...",
					"Well it's | basically a | glow-in-the-dark | band-aid then"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> That's a | genie"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Oh...",
						"Let me know when | you find one then",
						"I've got a few | wishes to make"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa! A fairy!"]);
				}else if(taskIndex == 1){
					newChoice(["Does | that | make you | Peter | Pan?"]);
				}
			}else if(trigger === "> Does | that | make you | Peter | Pan?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Because of my red | hair?",
						"Ha! That's a good | one dude!",
						"Kay could be Hook | since he's got | that feather | thing!",
						"He might try to | take that fairy. | Heheh"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ah! A fairy!"]);
				}else if(taskIndex == 1){
					newChoice(["Where do | they | come | from?"]);
				}
			}else if(trigger === "> Where do | they | come | from?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Some say all | fairies have a | fairy godmother",
						"Others say they | come from a | magical world far | away from here",
						"But I believe | they are always | around us - just | in hiding",
						"Which is why I | always make sure | I do nothing | embarrassing..."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Wow! That's so | cool!"]);
				}else if(taskIndex == 1){
					newChoice(["Wanna | buy some | fairy | dust?"]);
				}
			}else if(trigger === "> Wanna | buy some | fairy | dust?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Uh...",
						"Say no to drugs | kids",
						"But thanks | anyways - drugs | are expensive"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questors
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What is that | glowing bug?",
					"It's... so pretty"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "A | magical | fairy"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...Really?",
						"I've always | wanted one of my | own!",
						"(you give Kay the | fairy)",
						"Now I'll be | practically | invincible!",
						"Here! You can | have this old | helmet",
						"(you got an old | helmet from Kay)",
						"I don't really | use it anymore - | I just got a new | helmet with much | better stats"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "old helmet";
					story.kyle.tradeIndex = 22;
					endScene();
				}
			}else if(trigger === "> A | magical | fairy"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["A fairy?!",
						"I've heard | stories of heroes | having fairy | companions with | them for | adventures",
						"They protected | them from harm | and healed their | wounds",
						"Those heroes were | legendary!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//old helmet
	else if(story.kyle.tradeItem === "old helmet"){
		if(story.kyle.other == null)
			return;
		//non-questors
		if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Uh, hi there"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Am I a | knight | now?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["No I don't need | it back",
						"My new helmet is | way better",
						"My head doesn't | ring when I get | hit anymore!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Am I a | knight | now?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Ha! Definitely | not!",
						"You have to go | through years of | training, swear | an oath, defeat | monsters, protect | princesses...",
						"But at least your | head's protected"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey, can you see | anything out of | that thing?"]);
				}else if(taskIndex == 1){
					newChoice(["30% of | stuff"]);
				}
			}else if(trigger === "> 30% of | stuff"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Well that's | better than | nothing!",
						"Safety is all | that matters!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa! I haven't | seen that helmet | in a while!"]);
				}else if(taskIndex == 1){
					newChoice(["Since | when?"]);
				}
			}else if(trigger === "> Since | when?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I think back when | we had all those | monsters invade",
						"They ended up | being really | nice!",
						"They were just | tourists, but Kay | still wanted to | fight them...",
						"He doesn't do | well with new | people"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ah a defensive | hat!"]);
				}else if(taskIndex == 1){
					newChoice(["... the | helmet?"]);
				}
			}else if(trigger === "> ... the | helmet?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh... right!",
						"I mistook it for | Kimi's training | dummy's accessory",
						"They look so | similar...",
						"Or at least serve | similar purposes"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Kay is that you?"]);
				}else if(taskIndex == 1){
					newChoice(["...yes?"]);
				}
			}else if(trigger === "> ...yes?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["But if you're | here...",
						"Then who's | watching the | castle?!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questors
		if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...Is that Kay's | helmet?"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "It's | mine now"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Sure...",
						"I can put it on | my dummy",
						"(you give the old | helmet to Kimi)",
						"Training just got | a lot more fun",
						"I won't be | needing this | anymore so you | can have it",
						"(you got a hat | from Kimi)",
						"It's antique... | mostly..."]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "hat";
					story.kyle.tradeIndex = 23;
					endScene();
				}
			}else if(trigger === "> It's | mine now"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Hmm...",
						"I doubt you could | see anything with | that thing",
						"And it makes you | look just as | dorky"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//hat
	else if(story.kyle.tradeItem === "hat"){
		if(story.kyle.other == null)
			return;
		//non-questors
		if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Uh huh?"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "How do I | look?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"I like the helmet | on my dummy | better",
						"If you don't like | the hat just | trade with | someone else"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> How do I | look?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"Like a dummy"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey nice hat!"]);
				}else if(taskIndex == 1){
					newChoice(["Hat | club?"]);
				}
			}else if(trigger === "> Hat | club?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Dude we could | totally start a | hat club!",
						"Only people with | the coolest hats | in the world can | join!"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh man that's a | great accessory | Kyle!"]);
				}else if(taskIndex == 1){
					newChoice(["You | think | so?"]);
				}
			}else if(trigger === "> You | think | so?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yeah it really | brings out your | eyes",
						"But Amber would | know best about | that kind of | fashion stuff"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Wow... that | hat...",
						"It looks like it | was passed down | for generations"]);
				}else if(taskIndex == 1){
					newChoice(["It's | from | Kimi"]);
				}
			}else if(trigger === "> It's | from | Kimi"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Ah! Of course!",
						"You must be quite | the master to | recieve such a | gift",
						"What a high | honor!"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey don't wear | that hat like | that!"]);
				}else if(taskIndex == 1){
					newChoice(["Like | this?"]);
				}
			}else if(trigger === "> Like | this?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["(you tilt the hat | down slightly)",
						"Stop! You'll | attract a sea | bear!"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questors
		if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa! Stylish | hat!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "It's an | antique"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yas!",
						"(you give the hat | to Amber)",
						"Ugh! It's so | vintage! I love | it!",
						"Hey you can have | this too",
						"(you got a pillow | from Amber)",
						"It's suuuuper | comfy",
						"With the perfect | support"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "pillow";
					story.kyle.tradeIndex = 24;
					endScene();
				}
			}else if(trigger === "> It's an | antique"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh no way!",
						"I'd pay $100 for | that hat",
						"No, $500!",
						"No! A million!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//pillow
	else if(story.kyle.tradeItem === "pillow"){
		if(story.kyle.other == null)
			return;
		//non-questors
		if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey~"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Pillow | fight?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Buddy I gave you | that pillow",
						"I've got PLENTY | more where that | came from",
						"But they're just | too comfy to give | up!"])
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Pillow | fight?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Heh... You're | talking to the | Queen of Pillow | Fights",
						"Are you sure?"]);
				}else if(taskIndex == 3){
					newChoice(["Let's | fight!", "I'm too | soft"]);
				}
			}else if(trigger === "> Let's | fight!"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["(Amber grabs a | body-sized pillow | and you ready | your pillow)",
						"(her pillow glows | blue and she hits | you in the face | with the force of | a truck)",
						"(you see stars | swirling above | you)",
						"I told you! I'm | the queen!"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> I'm too | soft"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["That's ok",
						"My reputation for | pillow fights is | intimidating I | know"])
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...fluffy"]);
				}else if(taskIndex == 1){
					newChoice(["Wanna | sleep on | it?"]);
				}
			}else if(trigger === "> Wanna | sleep on | it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I'll pass",
						"Ninjas don't need | sleep"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa that pillow | looks comfy!"])
				}else if(taskIndex == 1){
					newChoice(["Like | sleeping | on a | cloud"]);
				}
			}else if(trigger === "> Like | sleeping | on a | cloud"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh man! Clouds | are great",
						"I bet Chi sleeps | like a rock every | night"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["That pillow looks | sooo soft!"]);
				}else if(taskIndex == 1){
					newChoice(["It is!"]);
				}
			}else if(trigger === "> It is!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh, I'd take such | a long nap on | that pillow!",
						"I might never | wake up from that"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Who's pillow is | that?!"]);
				}else if(taskIndex == 1){
					newChoice(["Amber's"]);
				}
			}else if(trigger === "> Amber's"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["You stole a | pillow from | Amber?!",
						"That's a royal | crime!",
						"I could have you | arrested!",
						"Don't move I need | to write a | report!"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}


		//main questors
		if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Agh... my monkey | bottom..."])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Heh"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh? Really? Thank | you!",
						"(you give the | pillow to Chi)",
						"Ah! What relief!",
						"I've never sat on | anything so | comfortable",
						"I'll be able to | focus more during | meditations now",
						"Here take this",
						"(you got lucky | dice from Chi)",
						"May it bring you | good luck and | fortune!",
						"Or... a nice new | fashion | accessory!"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "lucky dice";
					story.kyle.tradeIndex = 25;
					endScene();
				}
			}else if(trigger === "> Heh"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["?",
						"Oh... yes I guess | \"monkey butts\" is | pretty funny",
						"Heheh!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//lucky dice
	else if(story.kyle.tradeItem === "lucky dice"){
		if(story.kyle.other == null)
			return;
		//non-questors
		if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hi there!"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "How much | luck is | in it?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh no thanks",
						"I've got all the | luck I need...",
						"Feel free to give | it to someone who | is having some | bad luck today"])
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> How much | luck is | in it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I'd say it's | about 99% luck | and 1% hot gas"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Is that dice?"]);
				}else if(taskIndex == 1){
					newChoice(["They're | lucky!"]);
				}
			}else if(trigger === "> They're | lucky!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yeah right...",
						"There's no such | thing as luck",
						"Sid would | probably believe | in gimmicks like | that though"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Aren't you lucky!"]);
				}else if(taskIndex == 1){
					newChoice(["Feeling | lucky | punk?"]);
				}
			}else if(trigger === "> Feeling | lucky | punk?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Always! I keep a | four leaf clover | and horseshoe | with me!"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey cool dice!"])
				}else if(taskIndex == 1){
					newChoice(["Wanna | play a | game?"]);
				}
			}else if(trigger === "> Wanna | play a | game?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Sure why not",
						"What number do | you guess it'll | roll on?"])
				}else if(taskIndex == 3){
					newChoice(["7", "2", "13"]);
				}
			}else if(trigger === "> 7"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["(you roll the | dice)",
						"(4 on one and 3 | on the other)",
						"Aw man! That was | lucky!"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> 2"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["(you roll the | dice)",
						"(snake eyes)",
						"SNAKE?! | AAAAGGGHHH!!"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> 13"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["(you roll the | dice)",
						"(6 on one and on | the other... a | 7?)",
						"...",
						"...",
						"WHAT?!"])
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Those dice look | really fancy"]);
				}else if(taskIndex == 1){
					newChoice(["Chi gave | them to | me"]);
				}
			}else if(trigger === "> Chi gave | them to | me"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Really?",
						"I bet they're | filled with good | luck!",
						"You should always | keep those on | you!",
						"Anything could | happen!"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}


		//main questors
		if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa! Lucky dice!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Place | your | bets!"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Sure!",
						"(you give the | lucky dice to | Sid)",
						"I can hang this | on my rearview | mirror of my car!",
						"I won't be | needing this | little guy | anymore so here | you go",
						"(you got a plush | puppy from Sid)",
						"He's cute but he | just took up way | to much space on | my dashboard",
						"And his eyes get | creepy after a | while..."]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "plush puppy";
					story.kyle.tradeIndex = 26;
					endScene();
				}
			}else if(trigger === "> Place | your | bets!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Aw jeez man!",
						"I don't have any | money!",
						"And just the | worst luck in | general when it | comes to gambling"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//plush puppy
	else if(story.kyle.tradeItem === "plush puppy"){
		if(story.kyle.other == null)
			return;

		//non-questors
		if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What's up dude?"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Is it | cursed?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Nooo way man! I | don't want it | back!",
						"Those eyes man...",
						"The eyes..."])
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Is it | cursed?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["No I don't think | so...",
						"It just stopped | being cute and | started being | more creepy"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What is that?"]);
				}else if(taskIndex == 1){
					newChoice(["A plush | puppy"]);
				}
			}else if(trigger === "> A plush | puppy"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"It's cute",
						"Almost makes me | sick"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh what a lovely | plush toy"]);
				}else if(taskIndex == 1){
					newChoice(["He does | tricks"]);
				}
			}else if(trigger === "> He does | tricks"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Really?"])
				}else if(taskIndex == 3){
					newChoice(["Just | kidding", "Of | course!"])
				}
			}else if(trigger === "> Just | kidding"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Ah...",
						"That'd be amazing | if an inanimate | object could | perform"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> Of | course!"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["(you throw the | plush puppy in | the air)",
						"(it does 4 flips | and lands | perfectly | rightside up on | the ground)",
						"WOW! I've never | seen anything | like that!",
						"You have it well | trained!"])
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Agh! A vicious | dog!"]);
				}else if(taskIndex == 1){
					newChoice(["It's not | real"]);
				}
			}else if(trigger === "> It's not | real"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["?",
						"Ah! I see...",
						"False alarm...",
						"It'd be a decent | decoy for a guard | dog though",
						"It could protect | Grace's grave | from invaders"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*gasp* The puppy | is adorbs!"]);
				}else if(taskIndex == 1){
					newChoice(["His | name's | Fanboi"]);
				}
			}else if(trigger === "> His | name's | Fanboi"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Aaawww... I bet | he's a big fan of | you",
						"His eyes are just | mesmorizing"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questors
		if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Aw what a cute | puppy!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "His | name's | Rufert"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["OMG! I'd love to!",
						"(you give the | plush puppy to | Grace)",
						"He's adorable! | Thank you Kyle!",
						"He can keep me | lots of company | when I get lonely",
						"Ok! I promised | you a thingy so | here you go!",
						"(you got a | special key from | Grace)",
						"Have fun Kyle! | And thanks again!"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "special key";
					story.kyle.tradeIndex = 27;
					endScene();
				}
			}else if(trigger === "> His | name's | Rufert"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["*gasp* That's the | best name for a | puppy!",
						"Especially a | stuffed one!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//special key
	else if(story.kyle.tradeItem === "special key"){
		if(story.kyle.other == null)
			return;

		if(trigger === "talk_Grace" || trigger === "talk_Chi" || trigger === "talk_Sid" || trigger === "talk_Amber" || trigger === "talk_Kay" || trigger === "talk_Kimi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Use the key"])
			}else if(taskIndex == 1){
				endScene();
			}
		}

		if(trigger === "touch_keyhole"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Use the key?"])
			}else if(taskIndex == 1){
				newChoice(["Leave", "Stay"]);
			}
		}else if(trigger === "> Stay"){
			if(taskIndex == 2){
				endChoice();
				endScene();
			}
		}
		//epilogue
		else if(trigger === "> Leave"){
			if(taskIndex == 2){
				endChoice();
				story.storyIndex = 1;
				newDialog(["(you find | yourself in a | green meadow | with blue skies | and warm rays of | sunshine beaming | down on you)",
					"(you're sitting | on a red and | white checkered | picnic blanket - | 2 plates of | vanilla cake on | either side of | you)",
					"(the wind blows | gently over the | hills - a soft | flute melody | playing far | away)",
					"(you feel a | sense of peace - | but incomplete)",
					"(try again?)"])
			}else if(taskIndex == 3){
				newChoice(["Yes", "No"]);
			}
		}else if(trigger === "> No"){
			if(taskIndex == 4){
				endChoice();
				endScene();
				story.cutscene = true;
			}
		}else if(trigger === "> Yes"){
			if(taskIndex == 4){
				endChoice();
				story.quest = "Begin";
				story.storyIndex = 0;
				story.kyle.tradeItem = "none";
				story.kyle.tradeIndex = 0;
				coin.show = true;
				endScene();
			}
		}
	}
}


}
