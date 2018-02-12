/*global levelList*/

var story = {
	//character stats
	kyle : null,

	//level data
	size : 16,
	pause : false,

	//mission
	//quest : "Introduction",
	quest : "Kyle",
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

	kyleCt : 0,

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


if(story.quest === "Kyle"){

	//TRIGGERS AN NPC QUEST

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

	//FINISHED GAME
	if(story.kyleCt >= 7){
		coin.show = false;
		dummy.x = 19;
		dummy.y = 14;
		kimi.show = false;
		sid.show = false;
		grace.show = false;
		chi.show = false;
		kay.show = false;
		amber.show = false;
		if(trigger === "touch_dummy"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["...",
				"You redeemed | yourself by | helping others",
				"Here's your key",
				"(you got a | special key from | the dummy)",
				"Goodbye Kyle",
				"And thank you",
				"(the dummy | disappears)"]);
			}else if(taskIndex == 1){
				dummy.show = false;
				story.kyle.tradeItem = "special key";
				story.kyle.tradeIndex = 55;
				endScene();
			}
		}
	}
	


	if(story.kyle == null || story.kyle.other == null)
		return;


	////////////////////
	//START KYLE QUEST//
	////////////////////

	//CORRUPT KEY QUEST
	if(story.kyle.tradeItem === "corrupt key"){
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
				newDialog(["(you find | yourself | surrounded by | darkness - you | are very cold)",
					"(something | doesn't feel | right - a | unbalance and | conflict)",
					"(you are very | uncomfortable)",
					"(try again?)"])
			}else if(taskIndex == 3){
				newChoice(["Yes", "No"]);
			}
		}else if(trigger === "> No"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["GAME OVER"]);
			}
		}else if(trigger === "> Yes"){
			if(taskIndex == 4){
				endChoice();
				story.quest = "Kyle";
				story.storyIndex = 0;
				story.kyle.tradeItem = "none";
				story.kyle.tradeIndex = 0;
				story.kyleCt = 0;
				coin.show = true;
				endScene();
			}
		}

	}
	//FINAL KEY QUEST
	else if(story.kyle.tradeItem === "special key"){
		if(story.kyle.other == null)
			return;

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
				newDialog(["(you find | yourself in a | bright, warm and | comfortable area)",
				"(you see all of | your friends | smiling and | laughing in the | distance)",
				"(they wave to you | and you walk to | join them)",
				"(you feel a sense | of total peace | and complete)",
				"(THE END)"])
			}
		}

	}


	//NPC INTERACTION QUEST
	else{

	////////
	//KIMI//
	////////
	if(story.kyle.other.name === "Kimi"){
		if(trigger === "talk_Kimi"){
			story.cutscene = true;
			coin.show = false;
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
		else if(trigger === "> Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Hmm...", "Ok then... | Kyle...",
						"I'm Kimi",
						"What are you | doing here?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> Kyle I | guess"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Kyle I. Guess?", 
					"That's quite a | name", 
					"I'll call you | Kyle for short",
					"I'm Kimi",
					"What are you | doing here?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> Kyle?"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["You don't know?", 
							"... Well...", 
							"I guess people | don't really have | a choice on what | they get to be | called",
							"I'm Kimi", 
							"What are you | doing here?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> I'm Kyle!"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Wow...", "You seem pretty | proud of that", 
					"Kyle's an OK name | I suppose...",
					"I'm Kimi",
					"What are you | doing here?"]);
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}

		//WHAT DO YOU WANT?
		else if(trigger === "> I need | to talk | to you"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Hm...",
				"I don't talk | Kyle...",
				"Let's do | something | different",
				"If you really | know me - if | you've been here | before",
				"Then answer these | questions",
				"If you get enough | right, I'll give | you what you need",
				"Deal?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I need | some | -thing"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Uh huh...",
				"We all do Kyle",
				"Let's do | something | different",
				"If you really | know me - if | you've been here | before",
				"Then answer these | questions",
				"If you get enough | right, I'll give | you what you need",
				"Deal?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I don't | know"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Oh...",
				"You don't | remember?",
				"What a shame...",
				"I can help",
				"Let's do | something | different",
				"If you really | know me - if | you've been here | before",
				"Then answer these | questions",
				"If you get enough | right, I'll give | you what you need",
				"Deal?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}

		//DEAL
		else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Suit yourself",
				"Take this then",
				"(you got a | corrupt key from | Kimi)",
				"It's a way out | but you won't | like it",
				"Come back when | you know more | about this world"])
			}else if(taskIndex == 9){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}

		//QUIZ
		else if(trigger === "> Deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Ok...",
				"What instrument | do I play?"])
			}else if(taskIndex == 9){
				newChoice(["Violin", "Bass", "Flute"]);
			}
		}
		else if(trigger === "> Flute"){
			if(taskIndex == 10){
				endChoice();
				newDialog(["...",
					"I did...",
					"Well, you got the | first question | right",
					"What weapon do I | use?"]);
			}else if(taskIndex == 11){
				newChoice(["Staff", "Katana", "Arrow"]);
			}
		}else if(trigger === "> Katana"){
			if(taskIndex == 12){
				endChoice();
				newDialog(["...",
					"I do..",
					"That seemed | obvious",
					"I'm a | ninja/samurai | after all..",
					"Who do I give | letters to?"]);
			}else if(taskIndex == 13){
				newChoice(["Sid", "Grace", "Chi", "Amber", "Kay"]);
			}
		}else if(trigger === "> Grace"){
			if(taskIndex == 14){
				endChoice();
				newDialog(["...",
					"That's true..",
					"She doesn't | remember me | though - or what | I did",
					"That's probably | for the best...",
					"Congrats, you | passed Kyle"]);
			}else if(taskIndex == 15){
				newChoice(["Are you | ok?", "Now | what?", "That's | it?"]);
			}
		}

		//WRONG ANSWER
		else if((trigger === "> Violin") || (trigger === "> Bass")){
			if(taskIndex == 10){
				endChoice();
				newDialog(["...", "Sorry", "Wrong answer",
					"Take this then",
				"(you got a | corrupt key from | Kimi)",
				"It's a way out | but you won't | like it",
				"Come back when | you know more | about this world"]);
			}else if(taskIndex == 11){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}else if((trigger === "> Arrow") || (trigger === "> Staff")){
			if(taskIndex == 12){
				endChoice();
				newDialog(["...", "Sorry", "Wrong answer",
					"Take this then",
				"(you got a | corrupt key from | Kimi)",
				"It's a way out | but you won't | like it",
				"Come back when | you know more | about this world"]);
			}else if(taskIndex == 13){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}else if((trigger === "> Sid") || (trigger === "> Chi") || (trigger === "> Amber") || (trigger === "> Kay")){
			if(taskIndex == 14){
				endChoice();
				newDialog(["...", "Sorry", "Wrong answer",
					"Take this then",
				"(you got a | corrupt key from | Kimi)",
				"It's a way out | but you won't | like it",
				"Come back when | you know more | about this world"]);
			}else if(taskIndex == 15){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}


		//NOW WHAT
		else if(trigger === "> Are you | ok?"){
			if(taskIndex == 16){
				endChoice();
				newDialog(["...",
					"Fine I guess",
					"Lonely and | miserable as | usual"]);
			}else if(taskIndex == 17){
				newChoice(["Why?", "Don't be | upset", "What | about | Grace?"]);
			}
		}else if((trigger === "> Why?") || (trigger === "> Don't be | upset") || (trigger === "> What | about | Grace?")){
			if(taskIndex == 18){
				endChoice();
				newDialog(["...", "You're looking | for peace right?",
				"No matter how | hard you try you | feel incomplete?"]);
			}else if(taskIndex == 19){
				newChoice(["Yeah", "How'd | you know?", "What?"]);
			}
		}else if((trigger === "> Yeah") || (trigger === "> How'd | you know?") || (trigger === "> What?")){
			if(taskIndex == 20){
				endChoice();
				newDialog(["It doesn't exist",
				"You did something | in your past life | and now you're | stuck here",
				"Looking for a | non-existent | peace"]);
			}else if(taskIndex == 21){
				newChoice(["What | about | you?", "What did | you do?", "How did | you get | stuck?"]);
			}
		}
		//KIMI'S STORY
		else if((trigger === "> What | about | you?") || (trigger === "> What did | you do?") || (trigger === "> How did | you get | stuck?")){
			if(taskIndex == 22){
				endChoice();
				newDialog(["Me?",
					"...",
					"I tried to help | someone I loved",
					"But ended up just | making it | worse...",
					"She wasn't happy | with her life",
					"And everything I | did couldn't make | her feel better",
					"So she asked me | for one final | solution - and I | obliged",
					"I gave her | nightshade",
					"Now she's gone...",
					"But she haunts | me, and she | doesn't remember | me - or what we | used to be",
					"She's happy | though... but for | the wrong | reasons...",
					"I couldn't help | her... And I | don't | understand...",
					"I'm just lonely | and guilty now... | It's not fair..."]);
			}else if(taskIndex == 23){
				newChoice(["It's | gonna be | OK", "You're | not | alone", "You care | a lot"]);
			}
		}
		//ACCEPTANCE
		else if((trigger === "> It's | gonna be | OK") || (trigger === "> You're | not | alone") || (trigger === "> You care | a lot")){
			if(taskIndex == 24){
				endChoice();
				newDialog(["...",
				"Thanks Kyle",
				"I guess... If you | care about | someone...",
				"You have to help | them through | whatever they're | going through",
				"You have to keep | them safe and | protect them but | also take care of | yourself",
				"Death shouldn't | ever be a | solution",
				"Everything will | end up being OK | in the end",
				"I wish I realized | that before...",
				"...",
				"Thank you Kyle",
				"I feel at peace | now - I guess I | was wrong",
				"It does exist",
				"Here take this",
				"(you got a katana | from Kimi)",
				"I'm going to use | my key",
				"Thanks again for | your help",
				"I'll see you | around",
				"(Kimi disappears)"]);
			}else if(taskIndex == 25){
				kimi.show = false;
				story.kyleCt++;
				story.kyle.tradeItem = "katana";
				story.kyle.tradeIndex = 49;
				endScene();
			}
		}
	}


	///////
	//SID//
	///////

	if(story.kyle.other.name === "Sid"){
		if(trigger === "talk_Sid"){
			story.cutscene = true;
			coin.show = false;
			if(taskIndex == 0){
				newDialog(["Whoa!",
				"Hey, I didn't | see you there!",
				"How's it going, | dude? I'm Sid"])
			}else if(taskIndex == 1){
				newChoice(["Kyle", "Name's | Kyle", "I think | I'm Kyle", "Sup? I'm | Kyle"]);
			}
		}
		//name choice
		else if(trigger === "> Kyle"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Nice... That's a | pretty great | name",
						"Hey do you have | any records?",
						"I've gotten | really into | vinyl lately"])
			}else if(taskIndex == 3){
				newChoice(["Nope, | sorry", "What's a | record?", "I broke | them"]);
			}
		}else if(trigger === "> Name's | Kyle"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Coolio dude!",
						"Nice to meet you",
						"Hey do you have | any records?",
						"I've gotten | really into | vinyl lately"])
			}else if(taskIndex == 3){
				newChoice(["Nope, | sorry", "What's a | record?", "I broke | them"]);
			}
		}else if(trigger === "> I think | I'm Kyle"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["You think?",
					"Well.. I'll call | you Kyle until | you feel like | being called | something else",
						"Hey do you have | any records?",
						"I've gotten | really into | vinyl lately"])
			}else if(taskIndex == 3){
				newChoice(["Nope, | sorry", "What's a | record?", "I broke | them"]);
			}
		}else if(trigger === "> Sup? I'm | Kyle"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Man... you seem | cool Kyle!",
						"Hey do you have | any records?",
						"I've gotten | really into | vinyl lately"])
			}else if(taskIndex == 3){
				newChoice(["Nope, | sorry", "What's a | record?", "I broke | them"]);
			}
		}
		//no record
		else if(trigger === "> Nope, | sorry"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Ah no worries my | dude",
							"They're hard to | come by anyways",
							"So what's up, my | dude?"]);
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> What's a | record?"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["They're like | really huge | CDs",
							"It's pretty old | school stuff",
							"So what's up, my | dude?"]);
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> I broke | them"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Aw bummer...",
							"Oh well!",
							"So what's up, my | dude?"]);
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}

		//lets talk
		else if(trigger === "> I need | to talk | to you"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Oh yeah?",
				"A TALK talk, huh?",
				"Oh man...",
				"So here's what's | gonna happen",
				"You've been here | before, amiright?",
				"So then we've | been bros before | - and you know me | like a true bro",
				"I'll quiz you",
				"If you get all | the question | right, you win!",
				"Cool beans?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I need | some | -thing"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Yeah?",
					"I think I can | help!",
					"So here's what's | gonna happen",
					"You've been here | before, amiright?",
					"So then we've | been bros before | - and you know me | like a true bro",
					"I'll quiz you",
					"If you get all | the question | right, you win!",
					"Cool beans?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I don't | know"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Haha! I feel you | bro",
					"Maybe I can help | you remember",
					"So here's what's | gonna happen",
					"You've been here | before, amiright?",
					"So then we've | been bros before | - and you know me | like a true bro",
					"I'll quiz you",
					"If you get all | the question | right, you win!",
					"Cool beans?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}

		//DEAL
		else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Aw, ok",
				"Here you go then",
				"(you got a | corrupt key from | Sid)",
				"It's kinda crappy | to be honest",
				"But it'll take | you where you | need to go",
				"I hope we're bros | in another life!"])
			}else if(taskIndex == 9){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}

		//QUIZ
		else if(trigger === "> Deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Sweeeet! Ok | Question 1:",
				"What do I put my | music on?"])
			}else if(taskIndex == 9){
				newChoice(["CD", "Mixtape", "Vinyl"]);
			}
		}else if(trigger === "> Mixtape"){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Correct!",
					"Gotta go old | school",
					"Heh heh",
					"Question 2:",
					"What's my | favorite soda?"])
			}else if(taskIndex == 11){
				newChoice(["Cola", "Ginger | beer", "Orange | soda", "Root | beer"]);
			}
		}else if(trigger === "> Root | beer"){
			if(taskIndex == 12){
				endChoice();
				newDialog(["Right again!",
					"Best party drink | ever!",
					"Ok last | question...",
					"Who did I give my | last record to?"]);
			}else if(taskIndex == 13){
				newChoice(["Kimi", "Grace", "Chi", "Amber", "Kay"]);
			}
		}else if(trigger === "> Kay"){
			if(taskIndex == 14){
				endChoice();
				newDialog(["Yeah!",
					"He borrowed it | for a bit",
					"I didn't even | know he liked | music", 
					"You get to stay | here and party | with me forever!",
					"Yaaay... Heh..."])
			}else if(taskIndex == 15){
				newChoice(["Forever?", "I don't | want to | party", "That's | not what | I need"]);
			}
		}

		//WRONG CHOICES
		else if((trigger === "> CD") || (trigger === "> Vinyl")){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Aww duuude!", "Not quite!",
					"Well, here you | go then",
					"(you got a | corrupt key from | Sid)",
					"It's kinda crappy | to be honest",
					"But it'll take | you where you | need to go",
					"I hope we're bros | in another life!"]);
			}else if(taskIndex == 11){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}else if((trigger === "> Cola") || (trigger === "> Ginger | Beer") || (trigger === "> Orange | soda")){
			if(taskIndex == 12){
				endChoice();
				newDialog(["Aww duuude!", "Not quite!",
					"Well, here you | go then",
					"(you got a | corrupt key from | Sid)",
					"It's kinda crappy | to be honest",
					"But it'll take | you where you | need to go",
					"I hope we're bros | in another life!"]);
			}else if(taskIndex == 13){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}else if((trigger === "> Kimi") || (trigger === "> Grace") || (trigger === "> Chi") || (trigger === "> Amber")){
			if(taskIndex == 14){
				endChoice();
				newDialog(["Aww duuude!", "Not quite!",
					"Well, here you | go then",
					"(you got a | corrupt key from | Sid)",
					"It's kinda crappy | to be honest",
					"But it'll take | you where you | need to go",
					"I hope we're bros | in another life!"]);
			}else if(taskIndex == 15){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}


		//PARTY ON
		else if(trigger === "> Forever?"){
			if(taskIndex == 16){
				endChoice();
				newDialog(["Yeah...",
					"It's... not as | great as it | sounds in | reality...",
					"I'm stuck here... | Just like | everyone else",
				"You're trying to | find that sense | of peace or | something, right?"])
			}else if(taskIndex == 17){
				newChoice(["Yeah", "How'd | you know?", "What?"]);
			}
		}else if(trigger === "> I don't | want to | party"){
			if(taskIndex == 16){
				endChoice();
				newDialog(["Ah...",
					"I understand...",
					"To be honest, | I've gotten a | little sick of | partying too",
					"I'm stuck here... | Just like | everyone else",
				"You're trying to | find that sense | of peace or | something, right?"])
			}else if(taskIndex == 17){
				newChoice(["Yeah", "How'd | you know?", "What?"]);
			}
		}else if(trigger === "> That's | not what | I need"){
			if(taskIndex == 16){
				endChoice();
				newDialog(["Oh...",
					"Yeah I guess | partying isn't a | priority given | the situation",
					"I'm stuck here... | Just like | everyone else",
				"You're trying to | find that sense | of peace or | something, right?"])
			}else if(taskIndex == 17){
				newChoice(["Yeah", "How'd | you know?", "What?"]);
			}
		}
		
		//SID'S STORY
		else if((trigger === "> Yeah") || (trigger === "> How'd | you know?") || (trigger === "> What?")){
			if(taskIndex == 18){
				endChoice();
				newDialog(["Heh.. Well... | I'm in the same | boat", 
					"I can't remember | how long I've | been here - I've | never found it"])
			}else if(taskIndex == 19){
				newChoice(["You're | stuck?", "You | don't | party?", "Never?"]);
			}
		}
		else if((trigger === "> You're | stuck?") || (trigger === "> You | don't | party?") || (trigger === "> Never?")){
			if(taskIndex == 20){
				endChoice();
				newDialog(["Yeaaaahhh....",
				"I... uhh... went | a little | overboard one | night",
				"Made some really | bad decisions and | did some bad | things",
				"I had no idea - I | ignored my limits | because I thought | it was cool",
				"I was having such | a fun time - I | was the life of | the party!",
				"So when I drove | home, there was | this sign that | was broken",
				"And the road just | took a sharp turn | and then...",
				"I ended up here!",
				"I mean everyone | is nice and it's | cool and | everything but...",
				"I still screwed | up... BIG TIME",
				"Whoops... heh..."])
			}else if(taskIndex == 21){
				newChoice(["It's | gonna be | ok", "Be more | careful", "Stay | safe"]);
			}
		}else if((trigger === "> It's | gonna be | ok") || (trigger === "> Be more | careful") || (trigger === "> Stay | safe")){
			if(taskIndex == 22){
				endChoice();
				newDialog(["Yeah...",
				"Yeah! You're | right Kyle!",
				"I need to own up | to my mistakes!",
				"Set limits! | Protect myself! | Watch out for bad | signs - literally | and figuratively",
				"Thanks a billion | dude",
				"I found my peace! | I finally found | it!",
				"Here! Take this - | I insist",
				"(you got a beanie | from Sid)",
				"I'm gonna go and | use my key",
				"I hope you find | yours too dude",
				"Maybe we can | chill or hang | later",
				"I'll be looking | for you",
				"(Sid disappears)"])
			}else if(taskIndex == 23){
				sid.show = false;
				story.kyleCt++;
				story.kyle.tradeItem = "beanie";
				story.kyle.tradeIndex = 50;
				endScene();
			}
		}

	}


	/////////
	//GRACE//
	/////////

	if(story.kyle.other.name === "Grace"){
		if(trigger === "talk_Grace"){
			story.cutscene = true;
			coin.show = false;
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
		else if(trigger === "> Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Kyle?",
					"That's a nice | name!",
					"So did you need | anything?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> I'm Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Hi Kyle!",
					"Nice to meet you!",
					"So did you need | anything?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> Probably | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Probably?",
					"I don't meet a | lot of people | named \"Probably\"",
					"But I'll | definitely | remember \"Kyle\" | so I'll call you | that",
					"So did you need | anything?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> Uh... | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Okee dokee Kyle!",
					"So did you need | anything?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}
		//lets talk
		else if(trigger === "> I need | to talk | to you"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Really?",
				"I love talking to | people!",
				"*gasp* Let's play | a game!",
				"\"How well do you | know me?\"",
				"I'll make it | super duper easy | too",
				"When you get them | all right | something special | happens!",
				"Sound fun?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I need | some | -thing"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["You do?",
				"OK! I could | probably help you | get it!",
				"*gasp* Let's play | a game!",
				"\"How well do you | know me?\"",
				"I'll make it | super duper easy | too",
				"When you get them | all right | something special | happens!",
				"Sound fun?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I don't | know"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Aaaw...",
				"We'll figure it | out together, OK?",
				"*gasp* Let's play | a game!",
				"\"How well do you | know me?\"",
				"I'll make it | super duper easy | too",
				"When you get them | all right | something special | happens!",
				"Sound fun?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}

		//DEAL
		else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Aaawww ok Kyle",
				"Well you can have | this anyways",
				"(you got a | corrupt key from | Grace)",
				"Personally I | don't like using | that key",
				"But it's a key! | And keys always | lead somewhere",
				"Maybe something | on the otherside | can help you | figure out what | you need",
				"Nice seeing you | Kyle!"])
			}else if(taskIndex == 9){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}
		//QUIZ
		else if(trigger === "> Deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Yay! This is | gonna be so fun!",
				"Alrighty...",
				"What's my | favorite thing in | the whole world?"])
			}else if(taskIndex == 9){
				newChoice(["The | world", "Your | grave", "Flowers"]);
			}
		}
		else if(trigger === "> Flowers"){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Uh huh!",
					"That's why I put | them all around | my grave",
					"It makes it super | pretty!",
					"What's my | favorite cake | flavor?"])
			}else if(taskIndex == 11){
				newChoice(["Vanilla", "Choco | -late", "Yellow"]);
			}
		}else if(trigger === "> Vanilla"){
			if(taskIndex == 12){
				endChoice();
				newDialog(["That's right!",
					"It's soooooo good | - I could eat a | whole cake by | myself!",
					"Who makes really | awesome mixtapes | for me?"]);
			}else if(taskIndex == 13){
				newChoice(["Kimi", "Sid", "Chi", "Amber", "Kay"]);
			}
		}else if(trigger === "> Sid"){
			if(taskIndex == 14){
				endChoice();
				newDialog(["Yeah!",
					"He makes them | straight out of | his car too!",
					"I really love the | violin in some of | the songs",
					"Kyle! You did so | well!",
					"Congratulations!"]);
			}else if(taskIndex == 15){
				newChoice(["Do I win | a prize?", "What | happens?", "Now | what?"]);
			}
		}


		else if((trigger === "> The | world") || (trigger === "> Your | grave")){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Aw not quite",
				"Well you can have | this anyways",
				"(you got a | corrupt key from | Grace)",
				"Personally I | don't like using | that key",
				"But it's a key! | And keys always | lead somewhere",
				"Maybe something | on the otherside | can help you | figure out what | you need",
				"Nice seeing you | Kyle!"]);
			}else if(taskIndex == 11){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}else if((trigger === "> Yellow") || (trigger === "> Choco | -late")){
			if(taskIndex == 12){
				endChoice();
				newDialog(["Aw not quite",
				"Well you can have | this anyways",
				"(you got a | corrupt key from | Grace)",
				"Personally I | don't like using | that key",
				"But it's a key! | And keys always | lead somewhere",
				"Maybe something | on the otherside | can help you | figure out what | you need",
				"Nice seeing you | Kyle!"]);
			}else if(taskIndex == 13){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}else if((trigger === "> Kimi") || (trigger === "> Chi") || (trigger === "> Kay") || (trigger === "> Amber")){
			if(taskIndex == 14){
				endChoice();
				newDialog(["Aw not quite",
				"Well you can have | this anyways",
				"(you got a | corrupt key from | Grace)",
				"Personally I | don't like using | that key",
				"But it's a key! | And keys always | lead somewhere",
				"Maybe something | on the otherside | can help you | figure out what | you need",
				"Nice seeing you | Kyle!"]);
			}else if(taskIndex == 15){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}


		//NOW WHAT?
		else if((trigger === "> Do I win | a prize?") || (trigger === "> What | happens?") || (trigger === "> Now | what?")){
			if(taskIndex == 16){
				endChoice();
				newDialog(["Hm...",
					"I don't know | actually",
					"I feel like I've | always been here",
					"I can't really | remember anything | - what happened | before or what | happens after",
					"But that's OK! I | kinda like it | here!"]);
			}else if(taskIndex == 17){
				newChoice(["You | don't | remem | -ber?", "You like | it?", "It's ok?"])
			}
		}
		//GRACE'S STORY
		else if((trigger === "> You | don't | remem | -ber?") || (trigger === "> You like | it?") || (trigger === "> It's ok?")){
			if(taskIndex == 18){
				endChoice();
				newDialog(["Yeah!",
				"I mean I get | letters from Kimi | sometimes",
				"She tells me | stories about | this one girl - | she seems really | sad",
				"And this other | girl who tries to | help her not be | sad",
				"I don't | understand it but | I really want to",
				"But other times | Kimi writes me | really pretty | haikus",
				"It's like I've | read them before | but I know I | haven't - almost | like a nostalgic | feeling",
				"So yeah! I've got | my letters, my | flowers, my | music, my grave",
				"It's fun!",
				"But I still feel | like I'm missing | something..."]);
			}else if(taskIndex == 19){
				newChoice(["It's | gonna be | OK", "Reflect | on life", "Look for | more"]);
			}
		}
		else if((trigger === "> It's | gonna be | OK") || (trigger === "> Reflect | on life") || (trigger === "> Look for | more")){
			if(taskIndex == 20){
				endChoice();
				newDialog(["*gasp* You're | right Kyle!",
				"I'm happy for | what I have, but | I still need to | have a goal",
				"I should talk to | Kimi about the | letters - I never | had a chance to",
				"And even though I | look on the | bright side of | life, I have to | remember that | everything isn't | viewed through | rose colored | lenses",
				"There's pain and | incompleteness - | but it'll be OK",
				"Hey...",
				"I felt | something... Just | now...",
				"It's like... | peace?",
				"That's weird - | even though I'm | dead, I've never | felt this feeling | before",
				"I like it!",
				"Thanks Kyle! You | rock",
				"This is special | to me but I want | you to have it",
				"(you got a soul | from Grace)",
				"I think I'm gonna | head out and look | for more in the | second life I was | given",
				"I'll see you on | the other side | Kyle!",
				"(Grace | disappears)"]);
			}else if(taskIndex == 21){
				grace.show = false;
				story.kyleCt++;
				story.kyle.tradeItem = "soul";
				story.kyle.tradeIndex = 51;
				endScene();
			}
		}
	}


	///////
	//CHI//
	///////

	if(story.kyle.other.name === "Chi"){
		if(trigger === "talk_Chi"){
			story.cutscene = true;
			coin.show = false;
			if(taskIndex == 0){
				newDialog(["Oh, hello",
					"How are you | today?"]);
			}else if(taskIndex == 1){
				newChoice(["Great!", "I'm not | sure", "Meh"]);
			}
		}
		//how are you?
		else if(trigger === "> Great!"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["That's fantastic!",
				"I hope your day | continues to stay | positive!",
				"Nice to meet you",
				"My name is Chi",
				"And you are?"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Kyle I | suppose", "You can | call me | Kyle", "I am | Kyle"])
			}
		}else if(trigger === "> I'm not | sure"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Well that's | alright",
				"The day still has | potential to | become | interesting!",
				"Nice to meet you",
				"My name is Chi",
				"And you are?"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Kyle I | suppose", "You can | call me | Kyle", "I am | Kyle"])
			}
		}else if(trigger === "> Meh"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Oh I'm sorry to | hear that",
				"Well there's | always tomorrow!",
				"Nice to meet you",
				"My name is Chi",
				"And you are?"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Kyle I | suppose", "You can | call me | Kyle", "I am | Kyle"])
			}
		}
		//name
		else if(trigger === "> Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Kyle?",
				"The name suits | you!",
				"Now... What can I | do for you today?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> Kyle I | suppose"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["You suppose?",
				"Well if that's | what feels right | to you, then Kyle | it shall be",
				"Now... What can I | do for you today?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> You can | call me | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Excellent!",
				"Kyle it is!",
				"Now... What can I | do for you today?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> I am | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Ah, Kyle!",
				"What a great | name!",
				"Now... What can I | do for you today?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}
		//lets talk
		else if(trigger === "> I need | to talk | to you"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["A talk?",
				"So be it! Let's | talk",
				"But first... A | test of wits!",
				"I'll challenge | you to a few | short questions",
				"If you answer | correctly then I | shall aid you in | your journey for | information",
				"So what is your | decision?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I need | some | -thing"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Ah of course!",
				"I can be of | assistance",
				"But first... A | test of wits!",
				"I'll challenge | you to a few | short questions",
				"If you answer | correctly then I | shall aid you in | your journey for | information",
				"So what is your | decision?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I don't | know"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Well that's quite | alright",
				"Perhaps I can | enlighten you",
				"But first... A | test of wits!",
				"I'll challenge | you to a few | short questions",
				"If you answer | correctly then I | shall aid you in | your journey for | information",
				"So what is your | decision?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}

		//DEAL
		else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Very well - I can | respect that",
				"Take this item | instead",
				"(you got a | corrupt key from | Chi)",
				"It may not be | your preference | for answers",
				"But it is answers | regardless",
				"Take care, Kyle"])
			}else if(taskIndex == 9){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}

		//QUIZ
		else if(trigger === "> Deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Excellent!",
				"We'll begin...",
				"What lucky item | do I hold?"]);
			}else if(taskIndex == 9){
				newChoice(["Dice", "Clover", "Penny"]);
			}
		}else if(trigger === "> Dice"){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Correct!",
					"It comes in | pairs! Double | the luck",
					"What do I | collect?"]);
			}else if(taskIndex == 11){
				newChoice(["Stamps", "Bugs", "Bottle | -caps"]);
			}
		}else if(trigger === "> Bottle | -caps"){
			if(taskIndex == 12){
				endChoice();
				newDialog(["Yes!",
					"I predict that | someday it will | become a very | valuable currency",
					"Who uses the oils | I make from | flowers?"]);
			}else if(taskIndex == 13){
				newChoice(["Kimi", "Sid", "Grace", "Kay", "Amber"]);
			}
		}else if(trigger === "> Amber"){
			if(taskIndex == 14){
				endChoice();
				newDialog(["Right!",
					"She is quite the | fan of the | essence of nature",
					"Well done Kyle",
					"You've completed | the questionaire"]);
			}else if(taskIndex == 15){
				newChoice(["What do | I get?", "Now | what?", "Cool"]);
			}
		}

		else if((trigger === "> Clover") || (trigger === "> Penny")){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Unfortunately | that is incorrect",
					"Oh well...",
				"Take this item | instead",
				"(you got a | corrupt key from | Chi)",
				"It may not be | your preference | for answers",
				"But it is answers | regardless",
				"Take care, Kyle"])
			}else if(taskIndex == 11){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}
		else if((trigger === "> Stamps") || (trigger === "> Bugs")){
			if(taskIndex == 12){
				endChoice();
				newDialog(["Unfortunately | that is incorrect",
					"Oh well...",
				"Take this item | instead",
				"(you got a | corrupt key from | Chi)",
				"It may not be | your preference | for answers",
				"But it is answers | regardless",
				"Take care, Kyle"])
			}else if(taskIndex == 13){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}
		else if((trigger === "> Kimi") || (trigger === "> Sid") || (trigger === "> Grace") || (trigger === "> Kay")){
			if(taskIndex == 14){
				endChoice();
				newDialog(["Unfortunately | that is incorrect",
					"Oh well...",
				"Take this item | instead",
				"(you got a | corrupt key from | Chi)",
				"It may not be | your preference | for answers",
				"But it is answers | regardless",
				"Take care, Kyle"])
			}else if(taskIndex == 15){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}

		//Prize
		else if(trigger === "> What do | I get?"){
			if(taskIndex == 16){
				endChoice();
				newDialog(["You are now | smarter than you | were before we | started this | conversation",
				"Now if you'll | excuse me I'll go | back to my | meditating"]);
			}else if(taskIndex == 17){
				newChoice(["I still | need | some | -thing", "Please | help", "What?"]);
			}
		}else if(trigger === "> Now | what?"){
			if(taskIndex == 16){
				endChoice();
				newDialog(["Whatever you | wish!",
				"Now if you'll | excuse me I'll go | back to my | meditating"]);
			}else if(taskIndex == 17){
				newChoice(["I still | need | some | -thing", "Please | help", "What?"]);
			}
		}else if(trigger === "> Cool"){
			if(taskIndex == 16){
				endChoice();
				newDialog(["Yes it is very | cool indeed!",
				"Now if you'll | excuse me I'll go | back to my | meditating"]);
			}else if(taskIndex == 17){
				newChoice(["I still | need | some | -thing", "Please | help", "What?"]);
			}
		}

		//help
		else if((trigger === "> I still | need | some | -thing") || (trigger === "> Please | help") || (trigger === "> What?")){
			if(taskIndex == 18){
				endChoice();
				newDialog(["?",
				"Oh... I'm sorry | Kyle but...",
				"What you seek is | practically | impossible",
				"It's peace right?"])
			}else if(taskIndex == 19){
				newChoice(["Yes", "I think | so", "Maybe"]);
			}
		}else if((trigger === "> Yes") || (trigger === "> I think | so") || (trigger === "> Maybe")){
			if(taskIndex == 20){
				endChoice();
				newDialog(["*sigh* Peace is | hard to come by",
				"So I've just | dedicated the | rest of my life | and focus to | meditating and | studying my state | of mind",
				"It's not peace | but it's a nice | alternative"]);
			}else if(taskIndex == 21){
				newChoice(["Why?", "No way", "There's | gotta be | more"]);
			}
		}
		//CHI'S STORY
		else if((trigger === "> Why?") || (trigger === "> No way") || (trigger === "> There's | gotta be | more")){
			if(taskIndex == 22){
				endChoice();
				newDialog(["Kyle...",
				"A long time ago, | I used to be | absorbed in | frivolous matters",
				"I would dedicate | myself to being | the very best and | being a | perfectionist",
				"I wanted every | material | possession, have | the most money, | be the top in my | career and | lifestyle",
				"It ultimately got | me nowhere - and | I dissolved | relationships | with others",
				"Now I'm here... | And I have all | the energy in the | world to focus on | one thing - like | I've always | wanted",
				"So again... | please excuse me | while I meditate"]);
			}else if(taskIndex == 23){
				newChoice(["It's | gonna be | OK", "Take a | break", "Find a | balance"]);
			}
		}else if((trigger === "> It's | gonna be | OK") || (trigger === "> Take a | break") || (trigger === "> Find a | balance")){
			if(taskIndex == 24){
				endChoice();
				newDialog(["Hmm...",
				"I never thought | about that",
				"And I've done | nothing but think | about how to find | peace",
				"But I've missed | the entire point | - I focus too | hard",
				"I need to relax, | and focus on | different things",
				"There is a | solution and a | finishing point | but no rush to | reach it",
				"It's good to have | a goal - but | shutting out the | rest of the world | to achieve it | doesn't help | anyone",
				"Thank you Kyle!",
				"I feel truly | enlightened... | and at true | peace!",
				"Here, keep this | as a token of my | gratitude",
				"(you got a cloud | from Chi)",
				"My meditation is | done and my goal | complete",
				"I think I'll go | take a break and | use my key",
				"May we cross | paths again, Kyle",
				"(Chi disappears)"]);
			}else if(taskIndex == 25){
				chi.show = false;
				story.kyleCt++;
				story.kyle.tradeItem = "cloud";
				story.kyle.tradeIndex = 52;
				endScene();
			}
		}
	}	


	///////
	//KAY//
	///////

	if(story.kyle.other.name === "Kay"){
		if(trigger === "talk_Kay"){
			story.cutscene = true;
			coin.show = false;
			if(taskIndex == 0){
				newDialog(["HALT! Who goes | there?"]);
			}else if(taskIndex == 1){
				newChoice(["Uh...", "No one", "Me! | Fight | me!"]);
			}
		}
		//how are you?
		else if(trigger === "> Uh..."){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Not another word!",
				"You're new here | so I'll go easy | on you",
				"What is your | name, stranger?"
				])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Um... | Kyle?", "The | Mighty | Kyle", "I go by | Kyle"])
			}
		}else if(trigger === "> No one"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Ha! Do you take | me for a fool?",
				"My helmet limits | my visibility but | there is | DEFINITELY | someone right in | front of me",
				"What is your | name, stranger?"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Um... | Kyle?", "The | Mighty | Kyle", "I go by | Kyle"])
			}
		}else if(trigger === "> Me! | Fight | me!"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["What?!",
				"I haven't had a | challenge in | years!",
				"I'm a little | rusty...",
				"In skill not just | armor",
				"What is your | name, stranger?"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Um... | Kyle?", "The | Mighty | Kyle", "I go by | Kyle"])
			}
		}
		//name
		else if(trigger === "> Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Kyle?",
				"Not a very | threatening name",
				"Alright then, | \"Kyle\"...",
				"You can call me | Kay - Sir Kay!",
				"I protect this | castle and the | beautiful lady | who inhabits it!",
				"So what is your | business here?"
				])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> Um... | Kyle?"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Ha! You don't | even know your | own name?",
				"You poor soul",
				"Alright then, | \"Kyle\"...",
				"You can call me | Kay - Sir Kay!",
				"I protect this | castle and the | beautiful lady | who inhabits it!",
				"So what is your | business here?"
				])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> The | Mighty | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Mighty?!",
				"Pssh... uh I | mean...",
				"Yeah... mighty | where YOU come | from I guess",
				"Alright then, | \"Kyle\"...",
				"You can call me | Kay - Sir Kay!",
				"I protect this | castle and the | beautiful lady | who inhabits it!",
				"So what is your | business here?"
				])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> I go by | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Ah... I see",
				"Kyyylleee...",
				"Alright then, | \"Kyle\"...",
				"You can call me | Kay - Sir Kay!",
				"I protect this | castle and the | beautiful lady | who inhabits it!",
				"So what is your | business here?"
				])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}

		//lets talk
		else if(trigger === "> I need | to talk | to you"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Talk?!",
				"Well then Kyle",
				"Before we | continue with | this issue you | have - I'll test | to see if you are | worthy",
				"Is this fair?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I need | some | -thing"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Agh!",
				"A request?",
				"All right then...",
				"Well then Kyle",
				"Before we | continue with | this issue you | have - I'll test | to see if you are | worthy",
				"Is this fair?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I don't | know"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Hmm...",
				"That's a problem",
				"Well then Kyle",
				"Before we | continue with | this issue you | have - I'll test | to see if you are | worthy",
				"Is this fair?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}

		//DEAL
		else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["I see...",
				"Well in that | case!",
				"I can give you | this instead",
				"(you got a | corrupt key from | Kay)",
				"In all honesty, | it's not the best | thing in the | world",
				"But! A key is a | key! And you'll | have to make do | until you feel | worthy enough"])
			}else if(taskIndex == 9){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}

		//QUIZ
		else if(trigger === "> Deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["All right!",
				"What did I win my | medal for?"]);
			}else if(taskIndex == 9){
				newChoice(["1st | place", "Best | Armor", "Good | Spirit"]);
			}
		}else if(trigger === "> Good | Spirit"){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Correct!",
					"Good spirit will | always see you | through a battle | if not your | weapon",
					"What color is my | ideal sword?"]);
			}else if(taskIndex == 11){
				newChoice(["Black", "Silver", "Gold"]);
			}
		}else if(trigger === "> Black"){
			if(taskIndex == 12){
				endChoice();
				newDialog(["Yes!",
					"Honestly not for | the strength of | the metal - I | just think it | looks more | intimidating",
					"Who makes the | best tea?"]);
			}else if(taskIndex == 13){
				newChoice(["Kimi", "Sid", "Grace", "Chi", "Amber"]);
			}
		}else if(trigger === "> Chi"){
			if(taskIndex == 14){
				endChoice();
				newDialog(["Ha! Right!",
					"It's absolutely | heavenly actually",
				"Good show Kyle! | You passed!"]);
			}else if(taskIndex == 15){
				newChoice(["What do | I win?", "Now | what?", "Am I a | knight | now?"]);
			}
		}

		else if((trigger === "> 1st | place") || (trigger === "> Best | Armor")){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Alas you are | wrong, Kyle...",
				"Well anyways!",
				"I can give you | this instead",
				"(you got a | corrupt key from | Kay)",
				"In all honesty, | it's not the best | thing in the | world",
				"But! A key is a | key! And you'll | have to make do | until you feel | worthy enough"])
			}else if(taskIndex == 11){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}
		else if((trigger === "> Silver") || (trigger === "> Gold")){
			if(taskIndex == 12){
				endChoice();
				newDialog(["Alas you are | wrong, Kyle...",
				"Well anyways!",
				"I can give you | this instead",
				"(you got a | corrupt key from | Kay)",
				"In all honesty, | it's not the best | thing in the | world",
				"But! A key is a | key! And you'll | have to make do | until you feel | worthy enough"])
			}else if(taskIndex == 13){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}
		else if((trigger === "> Kimi") || (trigger === "> Sid") || (trigger === "> Grace") || (trigger === "> Amber")){
			if(taskIndex == 14){
				endChoice();
				newDialog(["Alas you are | wrong, Kyle...",
				"Well anyways!",
				"I can give you | this instead",
				"(you got a | corrupt key from | Kay)",
				"In all honesty, | it's not the best | thing in the | world",
				"But! A key is a | key! And you'll | have to make do | until you feel | worthy enough"])
			}else if(taskIndex == 15){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}

		//Prize
		else if(trigger === "> What do | I win?"){
			if(taskIndex == 16){
				endChoice();
				newDialog(["Kyle!",
					"It's not about | winning - it's | about having fun",
					"Now you can go | forth with your | new title of | \"Test | Completer\""]);
			}else if(taskIndex == 17){
				newChoice(["I still | need | some | -thing", "Help | me", "You're | my only | hope"]);
			}
		}else if(trigger === "> Now | what?"){
			if(taskIndex == 16){
				endChoice();
				newDialog(["Um... Well...",
					"Whatever you want | I suppose!",
					"Now you can go | forth with your | new title of | \"Test | Completer\""]);
			}else if(taskIndex == 17){
				newChoice(["I still | need | some | -thing", "Help | me", "You're | my only | hope"]);
			}
		}else if(trigger === "> Am I a | knight | now?"){
			if(taskIndex == 16){
				endChoice();
				newDialog(["Knighthood?",
					"For completing a | test?",
					"HAHAHAHAHA!",
					"I wish it was | that easy...",
				"Now you can go | forth with your | new title of | \"Test | Completer\""]);
			}else if(taskIndex == 17){
				newChoice(["I still | need | some | -thing", "Help | me", "You're | my only | hope"]);
			}
		}

		//PEACE
		else if((trigger === "> I still | need | some | -thing") || (trigger === "> Help | me") || (trigger === "> You're | my only | hope")){
			if(taskIndex == 18){
				endChoice();
				newDialog(["?!",
				"Oh boy...",
				"Uh... Listen | Kyle...",
				"This isn't going | to be easy to | take in...",
				"That thing you | need? It's | peace... Is that | right?"]);
			}else if(taskIndex == 19){
				newChoice(["Yes!", "Of | course", "Yessir"]);
			}
		}else if((trigger === "> Yes!") || (trigger === "> Of | course") || (trigger === "> Yessir")){
			if(taskIndex == 20){
				endChoice();
				newDialog(["Yes... well...",
				"No one has ever | been able to find | it",
				"I've searched for | it - EVERYWHERE",
				"Not for myself | but mostly for | Amber",
				"It's my fault | she's here | anyways"]);
			}else if(taskIndex == 21){
				newChoice(["What do | you | mean?", "Your | fault?", "Why for | Amber?"]);
			}
		}
		//KAY'S STORY
		else if((trigger === "> What do | you | mean?") || (trigger === "> Your | fault?") || (trigger === "> Why for | Amber?")){
			if(taskIndex == 22){
				endChoice();
				newDialog(["Well...",
				"Back in the days | of knights and | princesses",
				"A knight was | supposed to | protect his | princess",
				"And I wasn't | the... best of | the knights",
				"I fell asleep on | the job and | lacked motivation | to train and go | on quests",
				"I said no | whenever anyone | asked me to do | anything",
				"And one day - | when I was | supposed to be on | patrol and | guarding the | castle",
				"Invaders came | and... burned the | castle down...",
				"It's all my | fault!",
				"So now I protect | the castle with | my soul and | patrol the | entrance non-stop | everyday!",
				"I know it can | never make up for | what happened",
				"I'm still the | worst knight ever"]);
			}else if(taskIndex == 23){
				newChoice(["It's | gonna be | OK", "You're a | good | knight", "You can | do it"]);
			}
		}else if((trigger === "> It's | gonna be | OK") || (trigger === "> You're a | good | knight") || (trigger === "> You can | do it")){
			if(taskIndex == 24){
				endChoice();
				newDialog(["?",
				"Really?",
				"You think so?",
				"...",
				"OK!",
				"I slacked off in | the past and it | cost me my life | and others lives",
				"But my history | doesn't define me | - I'll rise up to | any challenge now",
				"My motivation and | drive is stronger | than ever - and | I'll protect | people",
				"I'm a good knight | for what I choose | to do now - not | what I've done in | the past",
				"Thank you Kyle! | Thank you so | much!",
				"I found my peace | and completed my | lifelong quest",
				"I can't grant you | knighthood - but | I'll give you the | second best",
				"(you got a shield | from Kay)",
				"My key calls to | me so I shall | part ways with | you",
				"Please take care | of Amber for me",
				"I'd be honored to | meet you again",
				"(Kay disappears)"]);
			}else if(taskIndex == 25){
				kay.show = false;
				story.kyleCt++;
				story.kyle.tradeItem = "shield";
				story.kyle.tradeIndex = 53;
				endScene();
			}
		}
	}


	/////////
	//AMBER//
	/////////

	if(story.kyle.other.name === "Amber"){
		//hair
		if(trigger === "talk_Amber"){
			story.cutscene = true;
			coin.show = false;
			if(taskIndex == 0){
				newDialog(["Oh",
					"My",
					"Gosh!",
					"Who did your | hair? I love it!"]);
			}else if(taskIndex == 1){
				newChoice(["I dunno", "It's | natural", "I did"]);
			}
		}else if(trigger === "> I dunno"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Ooohh ok...",
				"I see how it | is...",
				"You wanna keep | your mysterious | hairdresser all | to yourself?",
				"I can respect | that",
				"I'd probably do | the same thing if | I had someone who | could work magic | on my hair",
				"Oh! I'm Amber - | THE Amber"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Name's | Kyle", "It's | Kyle?", "The Kyle"]);
			}
		}else if(trigger === "> It's | natural"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["No way!",
				"I've never seen | anyone just born | with that hair | color",
				"Except in | cartoons or | something",
				"Oh! I'm Amber - | THE Amber"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Name's | Kyle", "It's | Kyle?", "The Kyle"]);
			}
		}else if(trigger === "> I did"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Whoa! You did?",
				"You must be a | really good | stylist!",
				"You gotta do mine | sometime! Please? | Pretty Please?",
				"Oh! I'm Amber - | THE Amber"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Name's | Kyle", "It's | Kyle?", "The Kyle"]);
			}
		}

		//introducing kyle
		else if(trigger === "> Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Hey Kyle",
				"What's shakin'?",
				"So Kyle...",
				"What brings you | to these parts?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> Name's | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Wow, your name's | as cool as your | hair",
				"So Kyle...",
				"What brings you | to these parts?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> It's | Kyle?"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Kyle?",
				"Do you not know?",
				"Oh whatever - I | like the name | Kyle so I'll | still call you | that",
				"So Kyle...",
				"What brings you | to these parts?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}else if(trigger === "> The Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Oooh! I've never | heard of you",
				"You must be a | rising star! | Rad...",
				"So Kyle...",
				"What brings you | to these parts?"])
			}else if(taskIndex == 5){
				newChoice(["I need | to talk | to you", "I need | some | -thing", "I don't | know"]);
			}
		}

		//lets talk
		else if(trigger === "> I need | to talk | to you"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Yaaas!",
				"I haven't had | anyone else to | talk to besides | Kay in forever!",
				"Ok - first things | first",
				"We gotta lay down | the law and I | gotta see if | you're legit",
				"I'm gonna quiz | you on stuff | about me",
				"If you get them | all right then | we're green - | super green",
				"You feel me?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I need | some | -thing"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Oh really?",
				"I might have | something around | her for you",
				"Ok - first things | first",
				"We gotta lay down | the law and I | gotta see if | you're legit",
				"I'm gonna quiz | you on stuff | about me",
				"If you get them | all right then | we're green - | super green",
				"You feel me?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> I don't | know"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Wooooow",
				"Was it one of | those moments | where you walked | into a room and | you forget what | you went in for?",
				"I get those all | the time",
				"Ok - first things | first",
				"We gotta lay down | the law and I | gotta see if | you're legit",
				"I'm gonna quiz | you on stuff | about me",
				"If you get them | all right then | we're green - | super green",
				"You feel me?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}

		//DEAL
		else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["OK OK",
				"I'm not gonna | force you into | anything don't | worry",
				"But here this | might help you | anyways",
				"(you got a | corrupt key from | Amber)",
				"It may or may not | help you - I | dunno",
				"But I hope you | find what you | needed!"])
			}else if(taskIndex == 9){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}

		//QUIZ
		else if(trigger === "> Deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Raaaad!",
				"Let's do this",
				"What's my | favorite flower?"]);
			}else if(taskIndex == 9){
				newChoice(["Daisy", "Rose", "Violet"]);
			}
		}else if(trigger === "> Rose"){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Of course!",
					"They're the | absolute best | flowers",
					"Every romantic | movie uses them!",
					"What do I use to | call Kay?"]);
			}else if(taskIndex == 11){
				newChoice(["Phone", "Whistle", "Horn"]);
			}
		}else if(trigger === "> Horn"){
			if(taskIndex == 12){
				endChoice();
				newDialog(["Yepperoni!",
					"He made it | himself too - | it's cute",
					"Who's got the | best fashion | sense - other | than me and you"]);
			}else if(taskIndex == 13){
				newChoice(["Kimi", "Sid", "Grace", "Chi", "Kay"]);
			}
		}else if(trigger === "> Kimi"){
			if(taskIndex == 14){
				endChoice();
				newDialog(["Uh yeah!",
					"Our styles are | surprisingly | similar",
					"She gives me her | old hats and I | give her ribbons | and slippers | sometimes",
					"Kyle! You did | awesome!",
					"I'm so proud - | you know me so | well!"]);
			}else if(taskIndex == 15){
				newChoice(["Can you | help me?", "Now | what?", "Is there | more?"]);
			}
		}

		else if((trigger === "> Daisy") || (trigger === "> Violet")){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Oooooh that's | not right!",
				"I'm really | sorry...",
				"But here this | might help you | anyways",
				"(you got a | corrupt key from | Amber)",
				"It may or may not | help you - I | dunno",
				"But I hope you | find what you | needed!"])
			}else if(taskIndex == 11){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}
		else if((trigger === "> Silver") || (trigger === "> Gold")){
			if(taskIndex == 12){
				endChoice();
				newDialog(["Oooooh that's | not right!",
				"I'm really | sorry...",
				"But here this | might help you | anyways",
				"(you got a | corrupt key from | Amber)",
				"It may or may not | help you - I | dunno",
				"But I hope you | find what you | needed!"])
			}else if(taskIndex == 13){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}
		else if((trigger === "> Kay") || (trigger === "> Sid") || (trigger === "> Grace") || (trigger === "> Chi")){
			if(taskIndex == 14){
				endChoice();
				newDialog(["Oooooh that's | not right!",
				"I'm really | sorry...",
				"But here this | might help you | anyways",
				"(you got a | corrupt key from | Amber)",
				"It may or may not | help you - I | dunno",
				"But I hope you | find what you | needed!"])
			}else if(taskIndex == 15){
				story.kyle.tradeItem = "corrupt key";
				story.kyle.tradeIndex = 5;
				endScene();
			}
		}

		//help
		else if((trigger === "> Can you | help me?") || (trigger === "> Is there | more?") || (trigger === "> Now | what?")){
			if(taskIndex == 16){
				endChoice();
				newDialog(["Umm....",
				"Actually Kyle - | and don't be mad",
				"I know what you | need",
				"It's that | complete peace | stuff right?"]);
			}else if(taskIndex == 17){
				newChoice(["Yep", "Uh huh", "Correcto"])
			}
		}
		else if((trigger === "> Yep") || (trigger === "> Uh huh") || (trigger === "> Correcto")){
			if(taskIndex == 18){
				endChoice();
				newDialog(["I knew it!",
				"Yeah so we're all | out of that",
				"And by \"all | out\" I mean we | never had it to | begin with - no | one did",
				"Everyone is | supposed to find | it on their own",
				"It's so hard - | it's like a | puzzle to solve",
				"Something to do | with fixing our | old selves or | something"]);
			}else if(taskIndex == 19){
				newChoice(["Puzzle?", "Old | self?", "Fix?"]);
			}
		}
		//AMBER'S STORY
		else if((trigger === "> Puzzle?") || (trigger === "> Old | self?") || (trigger === "Fix?")){
			if(taskIndex == 20){
				endChoice();
				newDialog(["Yep",
				"My old self was | soooooo pathetic | - not gonna lie",
				"Old Amber isn't | as cool as new | Amber",
				"I used to be so | self-conscious",
				"I thought people | were always | watching me and | judging me",
				"Well... everyone | watches | princesses",
				"But I was always | the center of | gossip and people | would say things | about me behind | my back",
				"I'd hear rumors | about people | talking about how | I looked, or what | I said, or how I | acted",
				"I felt like I | couldn't trust | anyone - or | myself",
				"Why would people | do such things?"]);
			}else if(taskIndex == 21){
				newChoice(["It's | gonna be | OK", "Don't | worry", "Haters | gonna | hate"]);
			}
		}else if((trigger === "> It's | gonna be | OK") || (trigger === "> Don't | worry") || (trigger === "> Haters | gonna | hate")){
			if(taskIndex == 22){
				endChoice();
				newDialog(["...",
				"YEAH!",
				"HECK YEAH!",
				"You're so right | Kyle!",
				"Why should I let | other people make | me feel so bad | about myself?",
				"I barely know | them! And they | barely know me",
				"My self-esteem | almost shattered | because people | were just hating",
				"The people that | really care about | me will see me | for my true self | - past my | insecurities",
				"And those other | jerks can just | suck it - cuz' | they don't matter | anyways!",
				"Ahhh... I feel so | relieved!",
				"Is this... that | peace?",
				"I love it!",
				"Thanks Kyle! I | totally owe you | one!",
				"Actually - I have | an idea",
				"Take this - it | doesn't hold any | power over me now",
				"(you got a crown | from Amber)",
				"Wow! I think I'll | use that key I | got a long time | ago",
				"Everything's so | fantastic now",
				"Kyle - I'll catch | you later",
				"Maybe if you | wanna go shopping | or something",
				"Byyyyeee~",
				"(Amber | disappears)"]);
			}else if(taskIndex == 23){
				amber.show = false;
				story.kyleCt++;
				story.kyle.tradeItem = "crown";
				story.kyle.tradeIndex = 54;
				endScene();
			}
		}
	}


	/////////
	//DUMMY//
	/////////
	if(story.kyleCt == 7){

	}


	}


}

else if(story.quest === "Introduction"){

	////////////////////
	//START KIMI QUEST//
	///////////////////
	if(story.kyle.other.name === "Kimi"){
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
		else if(trigger === "> Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Hmm...", "Ok then... | Kyle...",
						"I'm Kimi",
						"How'd you get | that token?"])
			}else if(taskIndex == 5){
				newChoice(["Found it", "Do you | want it?", "Beats me"]);
			}
		}else if(trigger === "> Kyle I | guess"){
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
		}else if(trigger === "> Kyle?"){
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
		}else if(trigger === "> I'm Kyle!"){
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
		else if(trigger === "> Deal"){
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
		}else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Hmm...",
						"Think again...",
						"Are you REALLY | sure, Kyle?"])
			}else if(taskIndex == 9){
				newChoice(["I changed | my mind", "Just | kidding", "You can | have it"])
			}
		}else if(trigger === "> I changed | my mind"){
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
		}else if(trigger === "> You can | have it"){
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
	}


	///////////////////
	//START SID QUEST//
	///////////////////
	if(story.kyle.other.name === "Sid"){
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
		else if(trigger === "> Kyle"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Nice... That's a | pretty great | name",
						"Hey do you have | any records?",
						"I've gotten | really into | vinyl lately"])
			}else if(taskIndex == 3){
				newChoice(["Nope, | sorry", "No, but | I have | this", "I broke | them"]);
			}
		}else if(trigger === "> Name's | Kyle"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Coolio dude!",
						"Nice to meet you",
						"Hey do you have | any records?",
						"I've gotten | really into | vinyl lately"])
			}else if(taskIndex == 3){
				newChoice(["Nope, | sorry", "No, but | I have | this", "I broke | them"]);
			}
		}else if(trigger === "> I think | I'm Kyle"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["You think?",
					"Well.. I'll call | you Kyle until | you feel like | being called | something else",
						"Hey do you have | any records?",
						"I've gotten | really into | vinyl lately"])
			}else if(taskIndex == 3){
				newChoice(["Nope, | sorry", "No, but | I have | this", "I broke | them"]);
			}
		}else if(trigger === "> Sup? I'm | Kyle"){
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
		else if(trigger === "> Deal"){
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
		}else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Aw c'mon",
					"Really dude?",
					"Are you | ABSOLUTELY sure, | Kyle?"])
			}else if(taskIndex == 9){
				newChoice(["I | changed | my mind", "I don't | want it | anymore", "You can | have it"])
			}
		}else if((trigger === "> I | changed | my mind" || trigger === "> I don't | want it | anymore" || trigger === "> You can | have it")){
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
	}


	/////////////////////
	//START GRACE QUEST//
	/////////////////////

	if(story.kyle.other.name === "Grace"){
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
		else if(trigger === "> Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Kyle?",
					"That's a nice | name!",
					"Hey, what's that | thingy?"])
			}else if(taskIndex == 5){
				newChoice(["A | thingy?", "A token?", "Nothing"])
			}
		}else if(trigger === "> I'm Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Hi Kyle!",
					"Nice to meet you!",
					"Hey, what's that | thingy?"])
			}else if(taskIndex == 5){
				newChoice(["A | thingy?", "A token?", "Nothing"])
			}
		}else if(trigger === "> Probably | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Probably?",
					"I don't meet a | lot of people | named \"Probably\"",
					"But I'll | definitely | remember \"Kyle\" | so I'll call you | that",
					"Hey, what's that | thingy?"])
			}else if(taskIndex == 5){
				newChoice(["A | thingy?", "A token?", "Nothing"])
			}
		}else if(trigger === "> Uh... | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Okee dokee Kyle!",
					"Hey, what's that | thingy?"])
			}else if(taskIndex == 5){
				newChoice(["A | thingy?", "A token?", "Nothing"])
			}
		}

		//what's that?
		else if(trigger === "> A | thingy?"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Yeah a thingy!",
					"A special thingy!",
					"Do you wanna | trade?",
					"I can give you | something really | nice for it~"])
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> A token?"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Yeah! One of | those things!",
					"I can't believe | you have one!",
					"Do you wanna | trade?",
					"I can give you | something really | nice for it~"])
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> Nothing"){
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
		else if(trigger === "> Deal"){
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
		}else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Aw pleeaase Kyle?",
					"Can I PLEASE have | it?"]);
			}else if(taskIndex == 9){
				newChoice(["Sure why | not", "You can | have the | token", "Yeah of | course"])
			}
		}else if((trigger === "> Sure why | not" || trigger === "> You can | have the | token" || trigger === "> Yeah of | course")){
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

	///////////////////
	//START CHI QUEST//
	///////////////////
	if(story.kyle.other.name === "Chi"){
		if(trigger === "talk_Chi"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Oh, hello",
					"How are you | today?"]);
			}else if(taskIndex == 1){
				newChoice(["Great!", "I'm not | sure", "Meh"]);
			}
		}
		//how are you?
		else if(trigger === "> Great!"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["That's fantastic!",
				"I hope your day | continues to stay | positive!",
				"Nice to meet you",
				"My name is Chi",
				"And you are?"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Kyle I | suppose", "You can | call me | Kyle", "I am | Kyle"])
			}
		}else if(trigger === "> I'm not | sure"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Well that's | alright",
				"The day still has | potential to | become | interesting!",
				"Nice to meet you",
				"My name is Chi",
				"And you are?"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Kyle I | suppose", "You can | call me | Kyle", "I am | Kyle"])
			}
		}else if(trigger === "> Meh"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Oh I'm sorry to | hear that",
				"Well there's | always tomorrow!",
				"Nice to meet you",
				"My name is Chi",
				"And you are?"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Kyle I | suppose", "You can | call me | Kyle", "I am | Kyle"])
			}
		}
		//name
		else if(trigger === "> Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Kyle?",
				"The name suits | you!",
				"Apologies for | intruding... But | what is that item | you have there?"])
			}else if(taskIndex == 5){
				newChoice(["This?", "A token", "It's an | illusion"]);
			}
		}else if(trigger === "> Kyle I | suppose"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["You suppose?",
				"Well if that's | what feels right | to you, then Kyle | it shall be",
				"Apologies for | intruding... But | what is that item | you have there?"])
			}else if(taskIndex == 5){
				newChoice(["This?", "A token", "It's an | illusion"]);
			}
		}else if(trigger === "> You can | call me | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Excellent!",
				"Kyle it is!",
				"Apologies for | intruding... But | what is that item | you have there?"])
			}else if(taskIndex == 5){
				newChoice(["This?", "A token", "It's an | illusion"]);
			}
		}else if(trigger === "> I am | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Ah, Kyle!",
				"What a great | name!",
				"Apologies for | intruding... But | what is that item | you have there?"])
			}else if(taskIndex == 5){
				newChoice(["This?", "A token", "It's an | illusion"]);
			}
		}
		//token
		else if(trigger === "> This?"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Ah yes!",
				"That item you | have is very | special!",
				"I have a | proposition...",
				"I'll trade you | something in my | possession for | that token in | your possession",
				"And I'll trade | you whatever else | you want or need | if you can bring | me another item",
				"Do we have a | deal?"])
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> A token"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["A token!",
				"I haven't seen | one in ages!",
				"I have a | proposition...",
				"I'll trade you | something in my | possession for | that token in | your possession",
				"And I'll trade | you whatever else | you want or need | if you can bring | me another item",
				"Do we have a | deal?"])
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> It's an | illusion"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Haha! Kyle...",
				"I know illusions | when I see one - | and that right | there is not an | illusion",
				"I have a | proposition...",
				"I'll trade you | something in my | possession for | that token in | your possession",
				"And I'll trade | you whatever else | you want or need | if you can bring | me another item",
				"Do we have a | deal?"])
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}
		//deal or no deal
		else if(trigger === "> Deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Fantastic!",
				"(you give the | token to Chi)",
				"And as promised, | here is my item",
				"(you got an | energy ball from | Chi)",
				"That's pure | energy",
				"Someone else in | the world could | make some good | use of that",
				"If you find that | someone, you can | start a chain of | trading and end | up with something | of greater value",
				"Return to me when | you think you've | got an item I | could use",
				"I'll make it a | fair trade"])
			}else if(taskIndex == 9){
				story.quest = "Chi"
				story.kyle.tradeItem = "energy ball";
				story.kyle.tradeIndex = 28;
				endScene();
			}
		}else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Aahh... Kyle...",
					"Reconsider my | offer CAREFULLY",])
			}else if(taskIndex == 9){
				newChoice(["Never | mind", "My | mistake", "You can | have it"])
			}
		}else if((trigger === "> Never | mind") || (trigger === "> My | mistake") || (trigger === "> You can | have it")){
			if(taskIndex == 10){
				endChoice();
				newDialog(["A wise decision | friend",
				"(you give the | token to Chi)",
				"And as promised, | here is my item",
				"(you got an | energy ball from | Chi)",
				"That's pure | energy",
				"Someone else in | the world could | make some good | use of that",
				"If you find that | someone, you can | start a chain of | trading and end | up with something | of greater value",
				"Return to me when | you think you've | got an item I | could use",
				"I'll make it a | fair trade"])
			}else if(taskIndex == 11){
				story.quest = "Chi"
				story.kyle.tradeItem = "energy ball";
				story.kyle.tradeIndex = 28;
				endScene();
			}
		}
	}

	///////////////////
	//START KAY QUEST//
	///////////////////
	if(story.kyle.other.name === "Kay"){
		if(trigger === "talk_Kay"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["HALT! Who goes | there?"]);
			}else if(taskIndex == 1){
				newChoice(["Uh...", "No one", "Me! | Fight | me!"]);
			}
		}
		//how are you?
		else if(trigger === "> Uh..."){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Not another word!",
				"You're new here | so I'll go easy | on you",
				"What is your | name, stranger?"
				])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Um... | Kyle?", "The | Mighty | Kyle", "I go by | Kyle"])
			}
		}else if(trigger === "> No one"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Ha! Do you take | me for a fool?",
				"My helmet limits | my visibility but | there is | DEFINITELY | someone right in | front of me",
				"What is your | name, stranger?"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Um... | Kyle?", "The | Mighty | Kyle", "I go by | Kyle"])
			}
		}else if(trigger === "> Me! | Fight | me!"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["What?!",
				"I haven't had a | challenge in | years!",
				"I'm a little | rusty...",
				"In skill not just | armor",
				"What is your | name, stranger?"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Um... | Kyle?", "The | Mighty | Kyle", "I go by | Kyle"])
			}
		}
		//name
		else if(trigger === "> Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Kyle?",
				"Not a very | threatening name",
				"Alright then, | \"Kyle\"...",
				"You can call me | Kay - Sir Kay!",
				"I protect this | castle and the | beautiful lady | who inhabits it!",
				"Say... What's | that in your | pocketses?"
				])
			}else if(taskIndex == 5){
				newChoice(["A token", "Pocket | lint", "My | precious"]);
			}
		}else if(trigger === "> Um... | Kyle?"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Ha! You don't | even know your | own name?",
				"You poor soul",
				"Alright then, | \"Kyle\"...",
				"You can call me | Kay - Sir Kay!",
				"I protect this | castle and the | beautiful lady | who inhabits it!",
				"Say... What's | that in your | pocketses?"
				])
			}else if(taskIndex == 5){
				newChoice(["A token", "Pocket | lint", "My | precious"]);
			}
		}else if(trigger === "> The | Mighty | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Mighty?!",
				"Pssh... uh I | mean...",
				"Yeah... mighty | where YOU come | from I guess",
				"Alright then, | \"Kyle\"...",
				"You can call me | Kay - Sir Kay!",
				"I protect this | castle and the | beautiful lady | who inhabits it!",
				"Say... What's | that in your | pocketses?"
				])
			}else if(taskIndex == 5){
				newChoice(["A token", "Pocket | lint", "My | precious"]);
			}
		}else if(trigger === "> I go by | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Ah... I see",
				"Kyyylleee...",
				"Alright then, | \"Kyle\"...",
				"You can call me | Kay - Sir Kay!",
				"I protect this | castle and the | beautiful lady | who inhabits it!",
				"Say... What's | that in your | pocketses?"
				])
			}else if(taskIndex == 5){
				newChoice(["A token", "Pocket | lint", "My | precious"]);
			}
		}

		//token
		else if(trigger === "> A token"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["A token?!",
				"How rare!",
				"I'll trade you a | valuable treasure | for it",
				"A one-of-a-kind | item",
				"What do you say, | Kyle?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> Pocket | lint"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Aside from | that...",
				"That shiny coin!",
				"I'll trade you a | valuable treasure | for it",
				"A one-of-a-kind | item",
				"What do you say, | Kyle?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> My | precious"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["!",
				"Ok then...",
				"I'll trade you a | valuable treasure | for it",
				"A one-of-a-kind | item",
				"What do you say, | Kyle?"]);
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}

		//deal or no deal
		else if(trigger === "> Deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Tally ho!",
				"(you give the | token to Kay)",
				"Right then! A | deal's a deal",
				"(you got a | medallion from | Kay)",
				"See! Really | valuable, huh?",
				"However, Kyle, I | need another | favor to ask of | you",
				"I need a special | item",
				"You can obtain it | through trading | that medallion | with others",
				"Come back to me | when you have | said item and | I'll give you | another thing you | need for your | journey",
				"By my knight's | honor, it's a | fair trade"]);
			}else if(taskIndex == 9){
				story.quest = "Kay"
				story.kyle.tradeItem = "medallion";
				story.kyle.tradeIndex = 35;
				endScene();
			}
		}else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Kyle!",
				"Don't be daft | man!",
				"Are you quite | sure?"])
			}else if(taskIndex == 9){
				newChoice(["My | mistake", "Here you | go", "I don't | need it"]);
			}
		}else if((trigger === "> My | mistake") || (trigger === "> Here you | go") || (trigger === "> I don't | need it")){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Much obliged",
				"(you give the | token to Kay)",
				"Right then! A | deal's a deal",
				"(you got a | medallion from | Kay)",
				"See! Really | valuable, huh?",
				"However, Kyle, I | need another | favor to ask of | you",
				"I need a special | item",
				"You can obtain it | through trading | that medallion | with others",
				"Come back to me | when you have | said item and | I'll give you | another thing you | need for your | journey",
				"By my knight's | honor, it's a | fair trade"]);
			}else if(taskIndex == 11){
				story.quest = "Kay"
				story.kyle.tradeItem = "medallion";
				story.kyle.tradeIndex = 35;
				endScene();
			}
		}

	}

	/////////////////////
	//START AMBER QUEST//
	/////////////////////
	if(story.kyle.other.name === "Amber"){
		//hair
		if(trigger === "talk_Amber"){
			story.cutscene = true;
			if(taskIndex == 0){
				newDialog(["Oh",
					"My",
					"Gosh!",
					"Who did your | hair? I love it!"]);
			}else if(taskIndex == 1){
				newChoice(["I don't | know", "It's | natural", "I did"]);
			}
		}else if(trigger === "> I don't | know"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Ooohh ok...",
				"I see how it | is...",
				"You wanna keep | your mysterious | hairdresser all | to yourself?",
				"I can respect | that",
				"I'd probably do | the same thing if | I had someone who | could work magic | on my hair",
				"Oh! I'm Amber - | THE Amber"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Name's | Kyle", "It's | Kyle?", "The Kyle"]);
			}
		}else if(trigger === "> It's | natural"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["No way!",
				"I've never seen | anyone just born | with that hair | color",
				"Except in | cartoons or | something",
				"Oh! I'm Amber - | THE Amber"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Name's | Kyle", "It's | Kyle?", "The Kyle"]);
			}
		}else if(trigger === "> I did"){
			if(taskIndex == 2){
				endChoice();
				newDialog(["Whoa! You did?",
				"You must be a | really good | stylist!",
				"You gotta do mine | sometime! Please? | Pretty Please?",
				"Oh! I'm Amber - | THE Amber"])
			}else if(taskIndex == 3){
				newChoice(["Kyle", "Name's | Kyle", "It's | Kyle?", "The Kyle"]);
			}
		}

		//introducing kyle
		else if(trigger === "> Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Hey Kyle",
				"What's shakin'?",
				"Hey Kyle... | What's that?"])
			}else if(taskIndex == 5){
				newChoice(["What?", "Where?", "That?"]);
			}
		}else if(trigger === "> Name's | Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Wow, your name's | as cool as your | hair",
				"Hey Kyle... | What's that?"])
			}else if(taskIndex == 5){
				newChoice(["What?", "Where?", "That?"]);
			}
		}else if(trigger === "> It's | Kyle?"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Kyle?",
				"Do you not know?",
				"Oh whatever - I | like the name | Kyle so I'll | still call you | that",
				"Hey Kyle... | What's that?"])
			}else if(taskIndex == 5){
				newChoice(["What?", "Where?", "That?"]);
			}
		}else if(trigger === "> The Kyle"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["Oooh! I've never | heard of you",
				"You must be a | rising star! | Rad...",
				"Hey Kyle... | What's that?"])
			}else if(taskIndex == 5){
				newChoice(["What?", "Where?", "That?"]);
			}
		}
		//token
		else if(trigger === "> What?"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["That thing!",
				"In your pocket!",
				"That token?",
				"Kyle, my guy, I | loooove those | things",
				"I'll trade you | something for it",
				"It's cool I | promise",
				"Cool?"])
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> Where?"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["In your pocket...",
				"Is that a token?",
				"Kyle, my guy, I | loooove those | things",
				"I'll trade you | something for it",
				"It's cool I | promise",
				"Cool?"])
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}else if(trigger === "> That?"){
			if(taskIndex == 6){
				endChoice();
				newDialog(["Yeah that!",
				"A token!",
				"Kyle, my guy, I | loooove those | things",
				"I'll trade you | something for it",
				"It's cool I | promise",
				"Cool?"])
			}else if(taskIndex == 7){
				newChoice(["Deal", "No deal"]);
			}
		}
		//deal
		else if(trigger === "> Deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Lit! Thanks Kyle~",
				"(you give the | token to Amber)",
				"Ok here's my | stuff",
				"(you got a rose | from Amber)",
				"Don't take it | personally",
				"I'm not asking | you out or | anything LOL",
				"I just need one | more thing - so | if you give that | to someone they | can probably give | you another thing",
				"And then the next | person can give | you something for | that and so on...",
				"You feel me?",
				"If you can bring | me something | cool, I'll give | you something I | know you'll love",
				"Sound cool?",
				"Fair trade Kyle. | Fair trade."]);
			}else if(taskIndex == 9){
				story.quest = "Amber"
				story.kyle.tradeItem = "rose";
				story.kyle.tradeIndex = 42;
				endScene();
			}
		}else if(trigger === "> No deal"){
			if(taskIndex == 8){
				endChoice();
				newDialog(["Ugh... | Kyyyyllleee",
				"Don't be | laaaaaame...",
				"Pleeeeasssee?"]);
			}else if(taskIndex == 9){
				newChoice(["How | could I | say no?", "I'm | kidding", "Of | course!"]);
			}
		}else if((trigger === "> How | could I | say no?") || (trigger === "> I'm | kidding") || (trigger === "> Of | course!")){
			if(taskIndex == 10){
				endChoice();
				newDialog(["Thaaaanks Kyle~",
				"(you give the | token to Amber)",
				"Ok here's my | stuff",
				"(you got a rose | from Amber)",
				"Don't take it | personally",
				"I'm not asking | you out or | anything LOL",
				"I just need one | more thing - so | if you give that | to someone they | can probably give | you another thing",
				"And then the next | person can give | you something for | that and so on...",
				"You feel me?",
				"If you can bring | me something | cool, I'll give | you something I | know you'll love",
				"Sound cool?",
				"Fair trade Kyle. | Fair trade."])
			}else if(taskIndex == 11){
				story.quest = "Amber"
				story.kyle.tradeItem = "rose";
				story.kyle.tradeIndex = 42;
				endScene();
			}
		}
	}
}


//hello my name is chelsea nand

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
				newDialog(["GAME OVER"]);
			}
		}else if(trigger === "> Yes"){
			if(taskIndex == 4){
				endChoice();
				story.quest = "Kyle";
				story.storyIndex = 0;
				story.kyle.tradeItem = "none";
				story.kyle.tradeIndex = 0;
				coin.show = true;
				story.kyleCt = 0;
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
						"I thought the | sky was | deep black"]);
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
					"(you're sitting | on a bean bag | chair with a box | of pizza, empty | cans of root | beer, and a | video game | controller in | front of you)",
					"(party music | plays loudly but | muffled in | another area - | the bass | vibrating | through your | core)",
					"(you feel a | sense of | peace... but | incomplete)",
							"(try again?)"])
			}else if(taskIndex == 3){
				newChoice(["Yes", "No"]);
			}
		}else if(trigger === "> No"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["GAME OVER"]);
			}
		}else if(trigger === "> Yes"){
			if(taskIndex == 4){
				endChoice();
				story.quest = "Kyle";
				story.storyIndex = 0;
				story.kyle.tradeItem = "none";
				story.kyle.tradeIndex = 0;
				coin.show = true;
				story.kyleCt = 0;
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
				newDialog(["GAME OVER"]);
			}
		}else if(trigger === "> Yes"){
			if(taskIndex == 4){
				endChoice();
				story.quest = "Kyle";
				story.storyIndex = 0;
				story.kyle.tradeItem = "none";
				story.kyle.tradeIndex = 0;
				coin.show = true;
				story.kyleCt = 0;
				endScene();
			}
		}
	}
}




else if(story.quest === "Chi"){
	//energy ball
	if(story.kyle.tradeItem === "energy ball"){
		if(story.kyle.other == null)
			return;
		//non questors
		if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Why hello!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?",  "What | kind of | energy | is this?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh I gave you | that energy ball | if I recall | correctly",
						"You should trade | it with someone | else who needs | the energy",
						"Quickly! While | it's still fresh | and raw!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> What | kind of | energy | is this?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["That is pure raw | energy!",
						"Condensed into a | small sphere!",
						"It's both chaotic | and balanced | power all in one"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...What's that | glowing ball?"]);
				}else if(taskIndex == 1){
					newChoice(["Pure | energy"]);
				}
			}else if(trigger === "> Pure | energy"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Pure? Yeah | right...",
						"It's probably | watered down with | an energy drink"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Wow! That's a | huge energy ball!"]);
				}else if(taskIndex == 1){
					newChoice(["It took | 7 | episodes | to form"]);
				}
			}else if(trigger === "> It took | 7 | episodes | to form"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Only 7?",
						"I've waited whole | seasons to make | energy like that"])
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Wait! What's | that?"]);
				}else if(taskIndex == 1){
					newChoice(["Kaaaa | meeee"]);
				}
			}else if(trigger === "> Kaaaa | meeee"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["(the energy ball | glows)",
					"Wait! Don't do | it!"])
				}else if(taskIndex == 3){
					newChoice(["Rasengan", "haaa | meee"]);
				}
			}else if(trigger === "> Rasengan"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["(a tiny ball of | energy forms in | your palm but | fizzles out)",
						"Ha! You're | technique has | failed you!",
						"You need more | training!"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> haaa | meee"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["(the energy ball | glows brighter)",
					"I'm warning you!"])
				}else if(taskIndex == 5){
					newChoice(["HA!", "HADOUKEN"]);
				}
			}else if(trigger === "> HA!"){
				if(taskIndex == 6){
					endChoice();
					newDialog(["(a beam of energy | explodes from | your hands just | barely missing | Kay)",
						"AAGHGHGHGHGH!!!!"])
				}else if(taskIndex == 7){
					endScene();
				}
			}else if(trigger === "> HADOUKEN"){
				if(taskIndex == 6){
					endChoice();
					newDialog(["(a small blast of | energy comes out | of your hands but | fizzles out)",
						"Heh! You had me | going there for | a second!"])
				}else if(taskIndex == 7){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*gasp* Is that | one of those | fancy night | lights?"]);
				}else if(taskIndex == 1){
					newChoice(["Not | really?"]);
				}
			}else if(trigger === "> Not | really?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Ugh... that's | lame",
						"It's pretty | though - Grace | would probably | love it | regardless"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}


		//main questor
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa! What is | that?",
						"It's like a | bouncy ball full | of energy!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Bouncy?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Sure! I'd have so | much fun bouncing | it!",
						"(you give the | energy ball to | Grace)",
						"Oh man! It's just | full of energy!",
						"Here you can have | this!",
						"(you got poison | from Grace)",
						"I honestly can't | remember where it | came from",
						"It smells kinda | bitter so I | wouldn't | recommend | drinking it"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "poison";
					story.kyle.tradeIndex = 29;
					endScene();
				}
			}else if(trigger === "> Bouncy?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yeah!",
						"It looks like one | of those little | balls you get out | of a toy capsule | machine"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//poison
	else if(story.kyle.tradeItem === "poison"){
		if(story.kyle.other == null)
			return;
		//non questors
		if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hiya!"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Poison | is bad"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Aw... I don't | want it back but | thanks",
						"Solids and | liquids don't | really have an | effect on me | anyways",
						"I miss vanilla | cake soooo much!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Poison | is bad"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["You're right!",
						"But one man's | poison is | another's elixir",
						"...That's the | saying right?"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey, what kind of | drink is that?"]);
				}else if(taskIndex == 1){
					newChoice(["Bitter | kind"]);
				}
			}else if(trigger === "> Bitter | kind"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Bitter? Bleh!",
						"Kimi likes bitter | drinks though",
						"I'll never | understand it"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Poison?!"]);
				}else if(taskIndex == 1){
					newChoice(["Have you | seen | this?"]);
				}
			}else if(trigger === "> Have you | seen | this?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Only once before",
						"I wouldn't hold | onto that for | long",
						"It might slip | into your skin | and give you | negative feelings"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*gasp* ASSASSIN!"]);
				}else if(taskIndex == 1){
					newChoice(["What?"]);
				}
			}else if(trigger === "> What?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["You're here to | poison Amber!",
						"I won't let you, | fiend!",
						"You'll have to | get past me and | my | semi-predictable | patrol route!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ooo! Is that | perfume?"]);
				}else if(taskIndex == 1){
					newChoice(["Nope!"]);
				}
			}else if(trigger === "> Nope!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Pssh...",
						"You're probably | just trying to | hog it all for | yourself",
						"I see you"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questor
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["That poison..."])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "What | kind of | poison | is it?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I guess...",
						"It's good for | ninja | assassination | missions",
						"(you give the | poison to Kimi)",
						"Take this",
						"(you got an arrow | head from Kimi)",
						"I found it a | while back stuck | in my ninja poles",
						"I don't have a | bow to use it so | it's no use to me",
						"Besides... blades | are better"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "arrow head";
					story.kyle.tradeIndex = 30;
					endScene();
				}
			}else if(trigger === "> What | kind of | poison | is it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...Nightshade",
						"Also known as | belladonna"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//arrow head
	else if(story.kyle.tradeItem === "arrow head"){
		if(story.kyle.other == null)
			return;
		//non questors
		if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What?"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Who shot | the | arrow?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Didn't you hear | me before?",
						"I don't have a | bow so why would | I want it back?"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Who shot | the | arrow?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...Beats me",
						"Rival ninjas I | guess?"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa that looks | so cool!"]);
				}else if(taskIndex == 1){
					newChoice(["How | cool?"]);
				}
			}else if(trigger === "> How | cool?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Like wearing | sunglasses | indoors, socks | with sandals, and | frosted hair | kinda cool!",
						"Ironically cool!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What a sharp | arrow head"]);
				}else if(taskIndex == 1){
					newChoice(["Pointy | too"]);
				}
			}else if(trigger === "> Pointy | too"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I wouldn't | recommend | shooting it in | the air then",
						"Unless you want | to add a bit of | extra danger to | your life",
						"We all have our | own little | hobbies"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["I like your metal | triangle!"]);
				}else if(taskIndex == 1){
					newChoice(["I think | it's a | diamond"]);
				}
			}else if(trigger === "> I think | it's a | diamond"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["That's a cool | shape too!",
						"It matches Kay's | metal cylindar | helmet thingy"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What's that rock?"]);
				}else if(taskIndex == 1){
					newChoice(["An arrow | head"]);
				}
			}else if(trigger === "> An arrow | head"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Head?",
						"Where's the rest | of it's body | then?"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questor
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Agh! That looks | pointy!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Wanna | play | darts?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Uh... yeah I'll | take it off your | hands",
						"That's a | dangerous weapon! | It must be put in | good hands",
						"(you give the | arrow head to | Kay)",
						"Well... you can | have this",
						"(you got a horn | from Kay)",
						"I'm the only one | protecting the | castle so it's | not like I can | call anyone with | it"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "horn";
					story.kyle.tradeIndex = 31;
					endScene();
				}
			}else if(trigger === "> Wanna | play | darts?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Definitely not!",
						"You'll shoot my | eye out!",
						"And I don't trust | your aim"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		
	}
	//horn
	else if(story.kyle.tradeItem === "horn"){
		if(story.kyle.other == null)
			return;
		//non questors
		if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh! Uh, hi"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "How do I | play it?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I gave you that | horn",
						"You don't want it | anymore?!",
						"That horn's been | passed down for | generations!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> How do I | play it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["You shouldn't | ever!",
						"It's only to be | used in dire | emergencies!",
						"Like an invasion | or flying snake | attack"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Dude! Blow that | horn!"]);
				}else if(taskIndex == 1){
					newChoice(["doot | doot!"]);
				}
			}else if(trigger === "> doot | doot!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yeah man!",
						"We should throw a | parade",
						"But...",
						"Confetti is kinda | hard to come by | these days...",
						"And floats are | hard to make...",
						"...",
						"We can keep it in | mind!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Is that Kay's | horn?"]);
				}else if(taskIndex == 1){
					newChoice(["Awoooo!"]);
				}
			}else if(trigger === "> Awoooo!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Uh oh...",
						"Kay only blows | that horn for | trouble",
						"Now Amber will | think something's | wrong",
						"You better go | calm her down",
						"Tell her to | remember her deep | breathing"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Wowsers! A real | horn!"]);
				}else if(taskIndex == 1){
					newChoice(["Noot | noot!"]);
				}
			}else if(trigger === "> Noot | noot!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Aaaaawww!",
						"You sound just | like a baby | penguin!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What the..."]);
				}else if(taskIndex == 1){
					newChoice(["brrpphh!"]);
				}
			}else if(trigger === "> brrpphh!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["(Kimi doesn't | flinch but looks | very annoyed)",
						"(she continues to | stare at you and | slowly reaches | for her katana's | hilt)"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questor
		if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey is that a | horn?"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Toot | toot!"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Sure!",
						"I can use it to | call Kay whenever | I need him to get | me something",
						"(you give the | horn to Amber)",
						"Speaking of which | - I'm done with | this pizza he | brought me",
						"You can have the | leftovers!",
						"(you got pizza | from Amber)",
						"There's enough | slices left to | share",
						"Or save for later | - your choice"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "pizza";
					story.kyle.tradeIndex = 32;
					endScene();
				}
			}else if(trigger === "> Toot | toot!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yaass!",
						"Blow that horn, | boi!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		
	}
	
	//pizza
	else if(story.kyle.tradeItem === "pizza"){
		if(story.kyle.other == null)
			return;
		//non questors
		if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey there!"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Is this | deep | dish?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Noooo way!",
						"I'm going on a | diet so I don't | even wanna look | at that pizza | anymore",
						"Despite how | deliciously | mouthwatering it | looks"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Is this | deep | dish?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Deeper than Chi's | philosophical | questions!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["That pizza looks | familiar..."]);
				}else if(taskIndex == 1){
					newChoice(["Uh..."]);
				}
			}else if(trigger === "> Uh..."){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Hey that's | Amber's favorite!",
						"You two have | similar taste!",
						"She and Sid were | the only ones I | knew of who like | deep dish",
						"But now there's 3 | on that list"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*achoo*"]);
				}else if(taskIndex == 1){
					newChoice(["Are you | ok?"]);
				}
			}else if(trigger === "> Are you | ok?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yes I'm fine",
						"I'm just allergic | to cheese",
						"I'm lactose | intolerant you | see"]);
				}else if(taskIndex == 3){
					newChoice(["So you | sneezed?", "What | about | milk?",  "Can you | cut | cheese?"]);
				}
			}else if(trigger === "> So you | sneezed?"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["It's the smell of | the cheese",
						"...",
						"I wouldn't | question it too | much"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> What | about | milk?"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Oh milk is | absolutely fine",
					"It's one of my | favorite drinks | actually",
						"...",
						"I wouldn't | question it too | much"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> Can you | cut | cheese?"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Heheh...",
						"I can...",
						"...",
						"I wouldn't | question it too | much"])
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oooo pizza!"]);
				}else if(taskIndex == 1){
					newChoice(["Want a | slice?"]);
				}
			}else if(trigger === "> Want a | slice?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["No thank you!",
					"I'm more of a | calzone and pizza | roll kinda gal",
					"I also can't eat",
					"I'm a little | dead",
					"Hehe!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...Is that pizza?"]);
				}else if(taskIndex == 1){
					newChoice(["Cheesy | goodness"]);
				}
			}else if(trigger === "> Cheesy | goodness"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Ha...",
						"A greasy mess is | more like it"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		

		//main questor
		if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Yo! Is that a | pizza?"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "I need | more | pizza"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh bro! Thanks!",
						"(you give the | pizza to Sid)",
						"Now I can eat all | the pizza I want",
						"Here I still have | this box that was | sitting in my car",
						"(you got takeout | food from Sid)",
						"I think it was | only in there | for...",
						"...A week?",
						"It should still | be good though!"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "takeout food";
					story.kyle.tradeIndex = 33;
					endScene();
				}
			}else if(trigger === "> I need | more | pizza"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["No problemo dude!",
						"I know the secret | to make infinite | pizza",
						"(Sid cuts a large | rectangle down | the middle of the | pizza)",
						"(he merges the 2 | leftover halves | back into one to | make it whole)",
						"Ta-da! Infinite | pizza"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//takeout food
	else if(story.kyle.tradeItem === "takeout food"){
		if(story.kyle.other == null)
			return;
		//non questors
		if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Heyo!"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "What's | this | green | stuff?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Ah bro I couldn't | eat another bite | of that",
						"It actually | started making me | sick",
						"...Because of how | much I ate!",
						"Definitely not | because of the | age... heh heh..."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> What's | this | green | stuff?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["?",
						"Oh! Uh...",
						"Vegetables I | hope!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["!",
						"UGH! What is | that?!"]);
				}else if(taskIndex == 1){
					newChoice(["Takeout | food"]);
				}
			}else if(trigger === "> Takeout | food"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["That smells worse | than a stink | bomb!",
						"Chi would | probably eat | that garbage",
						"I don't think | he's ever had a | sense of smell"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*sniff sniff*",
						"(Kay dry heaves)",
						"HRRGHH!"]);
				}else if(taskIndex == 1){
					newChoice(["(open | the box)"]);
				}
			}else if(trigger === "> (open | the box)"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...Why...",
						"...must you...",
						"...torture me...",
						"...villain?!",
						"(Kay faints)"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*gasp* What a | cute little box!"]);
				}else if(taskIndex == 1){
					newChoice(["It's a | takeout | box"]);
				}
			}else if(trigger === "> It's a | takeout | box"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["It's so compact | and efficient!",
						"It's like a tiny | white lunchbox!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["OMG What is | that smell?!"]);
				}else if(taskIndex == 1){
					newChoice(["Did you | fart?"]);
				}
			}else if(trigger === "> Did you | fart?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["What?!",
						"A lady never | farts!",
						"...When other | people are | present at least",
						"It's like that | tree falling in | the forest | anecdote"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questor
		if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Is that takeout | food?"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Smells | bad?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh that'd be just | amazing!",
						"(you give the | takeout food to | Chi)",
						"Aaahh... noodles! | My favorite!",
						"Tonight I shall | feast!",
						"Thank you again, | Kyle",
						"I am a monkey of | my word so here | you are",
						"(you got a | special key from | Chi)",
						"Safe travels, my | friend"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "special key";
					story.kyle.tradeIndex = 34;
					endScene();
				}
			}else if(trigger === "> Smells | bad?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["No the opposite!",
						"I haven't eaten | food in an | eternity so | everything smells | delicious",
						"Perks of fasting | I suppose"]);
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
				newDialog(["(you find | yourself on a | mountain cliff | with a running | waterfall on | either side of | you)",
					"(you're sitting | on a bed of | flowers | surrounded by | warm candles and | a plate of wafer | cookies)",
					"(the sunset in | the distance | makes the sky a | deep red-orange | mixture and you | hear bells chime | in the distance)",
					"(you feel a | sense of peace - | but incomplete)",
					"(try again?)"])
			}else if(taskIndex == 3){
				newChoice(["Yes", "No"]);
			}
		}else if(trigger === "> No"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["GAME OVER"]);
			}
		}else if(trigger === "> Yes"){
			if(taskIndex == 4){
				endChoice();
				story.quest = "Kyle";
				story.storyIndex = 0;
				story.kyle.tradeItem = "none";
				story.kyle.tradeIndex = 0;
				coin.show = true;
				story.kyleCt = 0;
				endScene();
			}
		}
	}
}


//KAY 
else if(story.quest === "Kay"){
	//medallion
	if(story.kyle.tradeItem === "medallion"){
		if(story.kyle.other == null)
			return;

		//non-questors
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["AGH!", "Oh, it's you, | Kyle"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Did you | win | this?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Although I would | miss that | medallion, I | cannot trade it | back",
						"Trade with | someone else who | would value that | medal",
						"Eventually you | will obtain what | I need"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Did you | win | this?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Indeed!",
						"In a sparring | competition!",
						"It's not first | prize since I got | knocked out in | the first round",
						"But it's a | medallion for | having the best | spirit!",
						"So it still | counts!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...That's an...",
					"...interesting | fashion statement"]);
				}else if(taskIndex == 1){
					newChoice(["(strike | a pose)"]);
				}
			}else if(trigger ===  "> (strike | a pose)"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["(you strike a | stylish pose and | a sparkle shines | off the | medallion)",
						"...",
						"(Kimi looks | slightly | uncomfortable)"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa! Did you win | that medal in a | fight?"]);
				}else if(taskIndex == 1){
					newChoice(["An | awesome | fight"]);
				}
			}else if(trigger ===  "> An | awesome | fight"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Broooooo",
						"That's so cool!",
						"I want you on my | team if I ever | get into a | rumble!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh wow! That's a | shiny necklace!"]);
				}else if(taskIndex == 1){
					newChoice(["It's a | medal- | lion"]);
				}
			}else if(trigger === "> It's a | medal- | lion"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["A medallion?",
						"You must have | done something | really cool to | get it though!",
						"That's impressive"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey, I've seen | that somewhere | before",
						"\"Good Spirit | Award\"?",]);
				}else if(taskIndex == 1){
					newChoice(["I got | spirit! | Yes I do"]);
				}
			}else if(trigger === "> I got | spirit! | Yes I do"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Whoa! You really | do!",
						"Almost more than | Chi actually!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		
		//main questor
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh! A power | medallion!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Power?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I'd be honored to | trade!",
						"(you give the | medallion to Chi)",
						"It's both | pleasing to the | eye and a | confidence | booster",
						"Here take this | with you",
						"(you got a bottle | from Chi)",
						"An empty bottle | is much like a | young mind",
						"It can be filled | with anything!"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "bottle";
					story.kyle.tradeIndex = 36;
					endScene();
				}
			}else if(trigger === "> Power?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["That's right",
						"Wearing that | medallion gives | you super | strength",
						"Or at least acts | as a placebo to | make you think | you're super | strong"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}

	//bottle
	else if(story.kyle.tradeItem === "bottle"){
		if(story.kyle.other == null)
			return;
		
		//non-quest
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Why hello!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "What was | in this?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh no thank you",
						"I have no more | use for that | bottle",
						"Since I... drank | all the contents | already...",
						"Haha..."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> What was | in this?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...Uh..",
						"Special chakra | enhancing elixir!",
						"Heh heh..."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What is that? A | poisonous gas?!"]);
				}else if(taskIndex == 1){
					newChoice(["In the | bottle?"]);
				}
			}else if(trigger ===  "> In the | bottle?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yes!",
						"You be careful | with that thing, | Kyle!",
						"If you release | it, the whole | world could | become infected!",
						"What kind of gas | is in it?!"]);
				}else if(taskIndex == 3){
					newChoice(["A fart", "Hydrogen", "Essence | of | waffle"])
				}
			}else if(trigger === "> A fart"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["That's the worse | kind!",
						"Don't release | that evil unto | us!"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> Hydrogen"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["HYDROGEN?!",
						"You madman!"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> Essence | of | waffle"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Oh...",
						"That's not too | bad I guess..."]);
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey, what's that | clear stuff in | there?"]);
				}else if(taskIndex == 1){
					newChoice(["Air?"]);
				}
			}else if(trigger ===  "> Air?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Or... it could be | an invisibility | potion!",
						"That'd be so | cool!",
						"Kimi would be | impossible to | find with that | stuff"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*gasp* A bottle!"]);
				}else if(taskIndex == 1){
					newChoice(["Why are | you | excited?"]);
				}
			}else if(trigger === "> Why are | you | excited?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["You can put so | much stuff into | bottles!",
					"Fairies, potions, | secret messages, | tiny ships...",
					"The possibilities | are endless"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh hey! Nice | bottle"]);
				}else if(taskIndex == 1){
					newChoice(["It's | empty"]);
				}
			}else if(trigger === "> It's | empty"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["It's got a nice | aesthetic with it | though",
				"You could | decorate it or | something"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questor
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...",
					"Is that an empty | bottle?"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "It's | filled | with air"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Fine by me",
						"(you give the | bottle to Kimi)",
						"I was going to | put this in the | bottle when I got | a chance",
						"But it'd probably | be easier to just | have you deliver | this to me",
						"(you got a letter | from Kimi)",
						"Don't you DARE | open it!",
						"I'll kill you | myself",
						"The person who | it's for will | know it's | addressed to them",
						"Don't let anyone | else read it | either",
						"I'll have to kill | them too - and | that's just too | much effort"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "letter";
					story.kyle.tradeIndex = 37;
					endScene();
				}
			}else if(trigger === "> It's | filled | with air"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"...Yeah",
						"I guess you're | right"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}

	//letter
	else if(story.kyle.tradeItem === "letter"){
		if(story.kyle.other == null)
			return;
		
		//non-quest
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Uh.. yeah?"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Do you | have a | crush?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Why would I want | my own letter | back?",
						"I already know | what it says"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Do you | have a | crush?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["(Kimi's eyes turn | red)",
						"(she draws her | katana and holds | it to your face)",
						"(you fall | backwards in | shock)"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["A letter?"]);
				}else if(taskIndex == 1){
					newChoice(["You've | got | mail...?"]);
				}
			}else if(trigger === "> You've | got | mail...?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Not for me",
						"I get all my | letters through | the wind",
						"...It's hard to | transcribe"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ooo! A letter!"]);
				}else if(taskIndex == 1){
					newChoice(["You've | got | mail...?"]);
				}
			}else if(trigger === "> You've | got | mail...?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Nah I didn't | expect any | letters",
						"Only a package",
						"It's supposed to | be another car so | the box should be | really big",
						"...Unless I got | the toy car | again...",
						"Aw jeez"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Is that a letter?"]);
				}else if(taskIndex == 1){
					newChoice(["You've | got | mail...?"]);
				}
			}else if(trigger === "> You've | got | mail...?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Sorry, Kyle",
						"Amber's the only | one who writes to | me",
						"Well... more like | calls to me from | the castle when | she needs | something",
						"Grace sure does | get a lot of | letters though",
						"It might be for | her"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa, a letter!"]);
				}else if(taskIndex == 1){
					newChoice(["You've | got | mail...?"]);
				}
			}else if(trigger === "> You've | got | mail...?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["No way!",
						"Letters are so | old schooled",
						"I get all my | information | through social | media like a | normal person"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		//main questor
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey a letter!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "You've | got | mail...?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Ok!",
						"(you give the | letter to Grace)",
						"Oh! It's from | Kimi!",
						"I'll read it | later - she | probably doesn't | want anyone else | to know",
						"She's so private! | But I respect it",
						"Oh right! I need | to give you | something right?",
						"(you got | headphones from | Grace)",
						"They keep falling | through my head | so I just listen | to my music out | loud now"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "headphones";
					story.kyle.tradeIndex = 38;
					endScene();
				}
			}else if(trigger === "> You've | got | mail...?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Hmm.. I can't | remember..",
						"Maybe?",
						"I always love | getting mail!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}

	//headphones
	else if(story.kyle.tradeItem === "headphones"){
		if(story.kyle.other == null)
			return;
		
		//non-quest
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Where's | the | wire?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Haha! I gave | those to you!",
						"Are they not your | favorite color or | something?",
						"I can understand | - blue would | probably be your | favorite color | instead"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Where's | the | wire?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I can't remember | if I bought them | because they were | wireless...",
						"Or if I just lost | the wire to | them..."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ah, nice | headphones"]);
				}else if(taskIndex == 1){
					newChoice(["Do you | listen | to music"]);
				}
			}else if(trigger === "> Do you | listen | to music"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Just the sound of | nature",
						"It's a great | album! I highly | recommend it",
						"Though Sid would | probably prefer | his \"indie rock\""]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...Headphones?"]);
				}else if(taskIndex == 1){
					newChoice(["Wanna | listen?"]);
				}
			}else if(trigger === "> Wanna | listen?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"...It's not | connected to | anything",
						"Though I do enjoy | the sound of | silence"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whose headphones | are those?"]);
				}else if(taskIndex == 1){
					newChoice(["Grace's"]);
				}
			}else if(trigger === "> Grace's"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I thought they | looked familiar!",
						"I prefer earbuds | anyways",
						"Headphones got in | the way of my | helmet and just | looked weird"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Cool headphones!"]);
				}else if(taskIndex == 1){
					newChoice(["How | cool?"]);
				}
			}else if(trigger === "> How | cool?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Super cool!",
						"They make you | look hipster or | something"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		//main questor
		else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Yo! Sick | headphones bro!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "The bass | is | turned | up"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Dude! Heck yeah | I'll trade!",
						"(you give the | headphones to | Sid)",
						"Aw man - my music | is gonna sound | unreal in these | things",
						"Here you go my | dude",
						"(you got a DVD | from Sid)",
						"That's one of my | favorite movies",
						"I've seen it so | many times I can | basically quote | it line for line",
						"\"Never fear - I | is here\"",
						"Classic!"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "dvd";
					story.kyle.tradeIndex = 39;
					endScene();
				}
			}else if(trigger === "> The bass | is | turned | up"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh no way!",
						"I love extra bass | in my songs!",
						"You can really | FEEL the music"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}

	//dvd
	else if(story.kyle.tradeItem === "dvd"){
		if(story.kyle.other == null)
			return;
		
		//non-quest
		else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What's good, bro?"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "How many | times | have you | seen it?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Aw that's ok dude",
						"I can play that | movie in my brain | from start to | finish whenever I | want"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> How many | times | have you | seen it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Hmm...",
						"37?",
						"Or was it 137?"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ah, what an | inspiring movie"]);
				}else if(taskIndex == 1){
					newChoice(["Is it?"]);
				}
			}else if(trigger === "> Is it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Absolutely!",
						"It promotes the | freedom of | information!",
						"Even by... | somewhat illegal | means"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh no..."]);
				}else if(taskIndex == 1){
					newChoice(["?"]);
				}
			}else if(trigger === "> ?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I hate that movie",
					"It doesn't even | portray the | culture correctly",
					"Amber would | probably find it | ironically cool"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["That movie!"]);
				}else if(taskIndex == 1){
					newChoice(["What | about | it?"]);
				}
			}else if(trigger === "> What | about | it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["The title!",
						"It's like | invaders - but | with computers!",
						"But they're the | good guys so it's | confusing!",
						"Agh! They must be | stopped, Kyle!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh wow! That's | such a fun movie!"]);
				}else if(taskIndex == 1){
					newChoice(["Fun?"]);
				}
			}else if(trigger === "> Fun?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yeah!",
						"It's a great date | night movie",
						"Or just if you | want a good laugh"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		//main questor
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa! Is that the | movie that I | think it is?"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Yes?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Sure!",
						"Now I don't have | to keep recording | it when it comes | on cable",
						"(you give the DVD | to Amber)",
						"I've stopped | watching sad | romantic movies | and dramas lately",
						"So I guess I | don't need this | old thing anymore",
						"(you got a | handkerchief from | Amber)",
						"That's made of | pure silk and | tears!"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "handkerchief";
					story.kyle.tradeIndex = 40;
					endScene();
				}
			}else if(trigger === "> Yes?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Uuuughhh... I | love that movie",
						"It's so bad it's | good!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//handkerchief
	else if(story.kyle.tradeItem === "handkerchief"){
		if(story.kyle.other == null)
			return;

		//non questor
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey there~"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Is this | clean?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Ew no!",
						"Uh I mean...",
						"Thanks but that's | ok...",
						"You might need it | later if someone | gets their heart | broken"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Is this | clean?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Uh...",
						"I think a part of | that corner is?"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["That handkerchief",
						"It's filled with | emotion!"]);
				}else if(taskIndex == 1){
					newChoice(["What | kind?"]);
				}
			}else if(trigger === "> What | kind?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Negative, | positive, neutral",
						"It's quite a | mixture",
						"Like an emotion | stew!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...Is that",
						"A handkerchief?"]);
				}else if(taskIndex == 1){
					newChoice(["Full of | tears"]);
				}
			}else if(trigger === "> Full of | tears"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
					"Ew...",
					"Emotions are | disgusting"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Is that a towel?"]);
				}else if(taskIndex == 1){
					newChoice(["Not | exactly"]);
				}
			}else if(trigger === "> Not | exactly"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh well!",
						"Just don't panic!",
						"Keep that on you | at all times"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Aaaww... whose | handkerchief is | that?"]);
				}else if(taskIndex == 1){
					newChoice(["Amber's"]);
				}
			}else if(trigger === "> Amber's"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh man!",
						"I read somewhere | that princesses | used to give | favors to knights | before battle or | jousts",
						"Kay would | probably go | absolutely crazy | for something | like that"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		
		//main questor
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Is that my lady's | 'kerchief!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Yeah | it's got | her | tears"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["It'd be the | highest honor a | knight can | recieve!",
						"A favor from his | lady!",
						"(you give the | handkerchief to | Kay)",
						"AH! I am a true | champion of my | lady now!",
						"Thank you Kyle",
						"You have done me | a grand favor",
						"And now as | promised I return | the favor unto | you",
						"(you got a | special key from | Kay)",
						"Good luck on your | journey, kind | stranger",
						"May we meet again | in the next life!"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "special key";
					story.kyle.tradeIndex = 41;
					endScene();
				}
			}else if(trigger === "> Yeah | it's got | her | tears"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Amber's tears?",
						"Why was she | crying?",
						"Who made her cry?",
						"I'll banish them!"]);
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
				newDialog(["(you find | yourself in a | large throne room | with banners | hanging from the | ceiling and | stained-glass | windows flooding | light into the | room)",
					"(you're standing | next to the | throne in a full | suit of diamond | armor holding a | black steel sword | - the throne is | empty)",
					"(outside you hear | festival music | and people | laughing and | singing - a long | table covered in | meats, drink, and | desserts before | you)",
					"(you feel a sense | of peace - but | incomplete)",
					"(try again?)"])
			}else if(taskIndex == 3){
				newChoice(["Yes", "No"]);
			}
		}else if(trigger === "> No"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["GAME OVER"]);
			}
		}else if(trigger === "> Yes"){
			if(taskIndex == 4){
				endChoice();
				story.quest = "Kyle";
				story.storyIndex = 0;
				story.kyle.tradeItem = "none";
				story.kyle.tradeIndex = 0;
				coin.show = true;
				story.kyleCt = 0;
				endScene();
			}
		}
	}
}


//AMBER 
else if(story.quest === "Amber"){
	//rose
	if(story.kyle.tradeItem === "rose"){
		if(story.kyle.other == null)
			return;

		//non questors
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey Kyle~"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Is it | really a | rose?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Kyyllleee...",
						"I already picked | it! I don't want | it back",
						"And it hurt a | lot.",
						"You should give | it to someone you | like instead"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Is it | really a | rose?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Of course!",
					"\"A rose by any | other name would | smell as sweet\"",
					"...Could just be | a red flower | though"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["A red rose?"]);
				}else if(taskIndex == 1){
					newChoice(["Fills my | dreams"]);
				}
			}else if(trigger === "> Fills my | dreams"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["What dreams?",
						"No one even | sleeps around | here"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Man that is a | pretty flower!"]);
				}else if(taskIndex == 1){
					newChoice(["Sharp | too"]);
				}
			}else if(trigger === "> Sharp | too"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Really?",
						"I guess it keeps | people from | picking it",
						"Otherwise | EVERYONE would | have roses and it | probably wouldn't | be as treasured"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What an intricate | pattern!"]);
				}else if(taskIndex == 1){
					newChoice(["On the | rose?"]);
				}
			}else if(trigger === "> On the | rose?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yes!",
						"It weaves in and | out of it's own | petals",
						"It's even more | intricate than | Grace's roses"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["A princess rose!"]);
				}else if(taskIndex == 1){
					newChoice(["A what?"]);
				}
			}else if(trigger === "> A what?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Princess roses | are magical",
						"They usually have | enchanted spells | on it",
						"Be careful with | the petals!",
						"You might | accidentally | curse someone!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questor
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*gasp* That rose | is even prettier | than the ones | around my grave!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "It's | special"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yay! Thanks!",
						"(you give the | rose to Grace)",
				"Oh! Here I have | something too!",
				"(you got a shadow | from Grace)",
				"I don't think | it's mine because | I can't really | make shadows",
				"But it's gotta | belong to | someone!",
				"I hope they find | their rightful | owner - it seemed | really sad"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "shadow";
					story.kyle.tradeIndex = 43;
					endScene();
				}
			}else if(trigger === "> It's | special"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["OMG I love it!",
						"I believe every | flower is special",
						"But special | flowers are SUPER | special!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//rose
	else if(story.kyle.tradeItem === "shadow"){
		if(story.kyle.other == null)
			return;

		//non questors
		else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hi!"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Which | way does | it face?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh, no that's ok",
						"I just want that | shadow to find a | nice home",
						"A grave can get | kinda spooky with | a shadow around | it all the time",
						"No offense to the | shadow!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Which | way does | it face?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh... hmmm...",
						"North?",
						"Sometimes south?",
						"I think it | depends on it's | mood"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oooo spooky | shadow!"]);
				}else if(taskIndex == 1){
					newChoice(["It's my | Hallo | -ween | costume"]);
				}
			}else if(trigger === "> It's my | Hallo | -ween | costume"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["That's a snazzy | costume!",
						"Seems hard to put | on and take off | though",
						"I could see Kimi wearing it"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Whoa! Is that a | shadow?"]);
				}else if(taskIndex == 1){
					newChoice(["It's not | mine"]);
				}
			}else if(trigger === "> It's not | mine"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["It's not yours?",
						"I've never seen | someone with | another person's | shadow",
						"That must be some | CRAZY magic | trick!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["How ominous"]);
				}else if(taskIndex == 1){
					newChoice(["How?"]);
				}
			}else if(trigger === "> How?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Shadows are the | darkness to our | light selves",
						"Then again - | neither can live | without the other",
						"So they also | represent harmony | and balance"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["AGH! What is that | beast?!"]);
				}else if(taskIndex == 1){
					newChoice(["A | shadow?"]);
				}
			}else if(trigger === "> A | shadow?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["How do you hit | it?!",
						"It isn't affected | by anything | physical!",
						"It's invincible!",
						"Run for your | life!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questor
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...",
						"That shadow | doesn't match | your body shape"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "It's my | friend"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Hmm...",
						"Yeah I guess it | fits me better",
						"(you give the | shadow to Kimi)",
						"This'll help me | hide a lot better",
						"Oh... Um I guess | you can have | this?",
						"(you got a | bottlecap from | Kimi)",
						"...It had a nice | design on it so I | kept it",
						"But some people | use it as | currency"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "bottlecap";
					story.kyle.tradeIndex = 44;
					endScene();
				}
			}else if(trigger === "> It's my | friend"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh... my | apologies",
						"What's it's name?"]);
				}else if(taskIndex == 3){
					newChoice(["Shadow", "Grey", "Light"]);
				}
			}else if(trigger === "> Shadow"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["...",
					"Your shadow's | name is Shadow?",
					"How edgy..."]);
				}else if(taskIndex == 5){
					endChoice();
				}
			}else if(trigger === "> Grey"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Grey?",
					"I guess that's a | pretty good name | for a shadow"]);
				}else if(taskIndex == 5){
					endChoice();
				}
			}else if(trigger === "> Light"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Light?",
					"Hmm... I like | it...",
					"It's ironic..."]);
				}else if(taskIndex == 5){
					endChoice();
				}
			}
		}
	}
	//bottlecap
	else if(story.kyle.tradeItem === "bottlecap"){
		if(story.kyle.other == null)
			return;

		//non questors
		else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Yeah?"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Why do | you have | this?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...No?",
						"I gave that one | to you",
						"I know it's junk | - just convince | someone else to | trade with you"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Why do | you have | this?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"I just think | they're neat..."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Are you starting | a collection of | those?"]);
				}else if(taskIndex == 1){
					newChoice(["Why?"]);
				}
			}else if(trigger === "> Why?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Chi's into | collecting those | things",
						"He thinks the | apocolypse is | coming and that | bottlecaps will | become the new | currency",
						"...Or he just | really likes the | design"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey is that a | bottlecap?"]);
				}else if(taskIndex == 1){
					newChoice(["Yep!"]);
				}
			}else if(trigger === "> Yep!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Coooool!",
						"What soda was it | from?"]);
				}else if(taskIndex == 3){
					newChoice(["Cola", "Root | beer", "Ginger | beer", "Orange | soda"]);
				}
			}else if(trigger === "> Cola"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Classic!",
						"They're great for | sharing",
						"Or bets to chug | them in less than | a minute - heh | heh"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> Root | beer"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Ah, that's my | favorite!",
					"I could drink | that stuff by the | keg!"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> Ginger | beer"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Whoa!",
					"You're pretty | intense dude!",
					"Those things | always burn the | back of my throat"])
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> Orange | soda"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Aw man those are | the best!",
					"The perfect | amount of orange | and fizz"])
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey I've seen | those before!"]);
				}else if(taskIndex == 1){
					newChoice(["On | bottles?"]);
				}
			}else if(trigger === "> On | bottles?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yeah!",
						"They're better | than can sodas | because it's like | you get a little | souvenir when | you're done"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["What kind of | medal is that?"]);
				}else if(taskIndex == 1){
					newChoice(["The | cool | badge"]);
				}
			}else if(trigger === "> The | cool | badge"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["...",
						"...I want one..."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		//main questor
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ah! A bottlecap!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "What's | so | special | about | it?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh! You're too | generous",
					"(you give the | bottlecap to Chi)",
					"Here you go - | nectar of the | gods",
					"(you got water | from Chi)",
					"Make sure you | stay hydrated!"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "water";
					story.kyle.tradeIndex = 45;
					endScene();
				}
			}else if(trigger === "> What's | so | special | about | it?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["That's a rare | bottlecap",
						"The soda itself | is delicious but | it's the | bottlecap that | holds the real | value"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//water
	else if(story.kyle.tradeItem === "water"){
		if(story.kyle.other == null)
			return;

		//non questors
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Why hello"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Where | did you | get this"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Ah, that's quite | alright",
						"I am extremely | hydrated at the | moment",
						"Actually...",
						"I might be a | little too | hydrated..."]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Where | did you | get this"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Every few years | it rains on this | world",
						"On those few | chances I collect | the rain water | and purify it",
						"I keep gallons | stored in my | secret stash"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ugh waaater!"]);
				}else if(taskIndex == 1){
					newChoice(["Is that | good?"]);
				}
			}else if(trigger === "> Is that | good?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yes! Water is | great!",
						"You should drink | about 2 liters a | day",
						"Or a whole lake | if you can!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ah! Water!"]);
				}else if(taskIndex == 1){
					newChoice(["So pure"]);
				}
			}else if(trigger === "> So pure"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh man that must | be spring water | from a secret | mountain or | something",
						"It'll probably | cleanse your | whole soul!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["... Is that | water?"]);
				}else if(taskIndex == 1){
					newChoice(["Yep!"]);
				}
			}else if(trigger === "> Yep!"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Water sucks",
						"Gatorade is | better",
						"...But stay | hydrated",
						"Sid tends to | forget that often"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Water?!"]);
				}else if(taskIndex == 1){
					newChoice(["What's | wrong?"]);
				}
			}else if(trigger === "> What's | wrong?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["That'll rust my | armor!",
						"It'll be almost | useless after | that!",
						"That's why I hate | the rain"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questor
		else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh man... my head | hurts"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Rough | night?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh man! You're a | life saver!",
						"(you give the | water to Sid)",
						"Oh hey! This | thing fell off of | my car",
						"(you got a chain | from Sid)",
						"I don't know what | it goes to but | it's probably | nothing important",
						"Looks pretty cool | though!"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "chain";
					story.kyle.tradeIndex = 46;
					endScene();
				}
			}else if(trigger === "> Rough | night?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Heh...",
						"Rough but fun my | dude!",
						"10/10 would do | again"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//chain
	else if(story.kyle.tradeItem === "chain"){
		if(story.kyle.other == null)
			return;

		//non questors
		else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey bro!"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Why is | it so | small?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["No thanks!",
						"That chain just | gives me anxiety | just looking at | it",
						"There's | DEFINITELY | something missing | from my car...",
						"So better to just | ignore it!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> Why is | it so | small?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I can't tell if | it came from my | car...",
						"Or old | jewreley...",
						"Or maybe a tiny | car!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Why do you have | chains?"]);
				}else if(taskIndex == 1){
					newChoice(["I'm in a | gang"]);
				}
			}else if(trigger === "> I'm in a | gang"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Whoa!",
						"Do you know any | signs?"]);
				}else if(taskIndex == 3){
					newChoice(["Heck ye", "Nah"]);
				}
			}else if(trigger === "> Heck ye"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["(you attempt to | form a series of | complex gestures | with your hands)",
						"(3 clones of | yourself | spontaneously | appear beside | you)",
						"...",
						"You're in a ninja | gang?!"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}else if(trigger === "> Nah"){
				if(taskIndex == 4){
					endChoice();
					newDialog(["Heh...",
						"Kyle you're such | a poser",
						"It's still cool | though~"]);
				}else if(taskIndex == 5){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oooo chains!"]);
				}else if(taskIndex == 1){
					newChoice(["Oooo?"]);
				}
			}else if(trigger === "> Oooo?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["I was making | spooky ghosts | noises like with | rattling chains!",
						"OoooOOOoooO!",
						"Ha ha!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...A chain?"]);
				}else if(taskIndex == 1){
					newChoice(["Fun huh?"]);
				}
			}else if(trigger === "> Fun huh?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["?!",
						"(Kimi looks away | startled and | confused)"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Ah! Break free of | those chains!"]);
				}else if(taskIndex == 1){
					newChoice(["...I am | free"]);
				}
			}else if(trigger === "> ...I am | free"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh!",
						"I thought Kay | took you | prisoner...",
						"But congrats on | being a free man!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questor
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["That's a small | chain you have | there"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "For | small | hands"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Hmm... I have had | this thing I've | wanted to do but | I've been too shy | to try",
						"(you give the | chain to Kay)",
						"Ok... give me a | second",
						"(Kay turns | around, hunched | over, making | grunting noises)",
						"Ok I'm done!",
						"(Kay turns back | to face you - his | hands are rough | and he's out of | breath)",
						"Ta-da",
						"(you got an | amulet from Kay)",
						"Well what do you | think?",
						"I've been trying | my hand at | jewreley making",
						"...",
						"What did you | think I was doing | with the chain?"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "amulet";
					story.kyle.tradeIndex = 47;
					endScene();
				}
			}else if(trigger === "> For | small | hands"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Ah yes!",
						"Those fiends | could slip right | out of normal | chains!",
						"Smart thinking!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
	}
	//amulet
	else if(story.kyle.tradeItem === "amulet"){
		if(story.kyle.other == null)
			return;

		//non questors
		else if(story.kyle.other.name === "Kay"){
			if(trigger === "talk_Kay"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Oh hi"]);
				}else if(taskIndex == 1){
					newChoice(["Trade?", "How'd | you make | this?"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Oh no, I don't | wear things I | make",
						"Besides it | doesn't match my | eyes"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}else if(trigger === "> How'd | you make | this?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Um...",
						"A secret trick a | wise man taught | me",
						"I think he was | also a wizard and | a baker on the | side"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}
		else if(story.kyle.other.name === "Chi"){
			if(trigger === "talk_Chi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["That amulet... ",
								"It's so | enchanting!"]);
				}else if(taskIndex == 1){
					newChoice(["Is it | magic?"]);
				}
			}else if(trigger === "> Is it | magic?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["It could be!",
				"Amulets that red | and bright | usually hold some | sort of mystical | power",
				"It could be a | horcrux! Or hold | a soul!",
				"...Or just be a | really nice | fashion statement"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Grace"){
			if(trigger === "talk_Grace"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["*gasp* That's so | pretty!"]);
				}else if(taskIndex == 1){
					newChoice(["Pretty?"]);
				}
			}else if(trigger === "> Pretty?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yeah it's | gorgeous!",
						"I bet everywhere | you go people | fall in love with | you when you have | that on!"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Kimi"){
			if(trigger === "talk_Kimi"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["...Hmm..",
						"Pretty..."]);
				}else if(taskIndex == 1){
					newChoice(["Does it | match my | eyes?"]);
				}
			}else if(trigger === "> Does it | match my | eyes?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Definitely not",
						"Glowing white is | hard to match"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}else if(story.kyle.other.name === "Sid"){
			if(trigger === "talk_Sid"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["Hey that's a | really fancy | amulet!"]);
				}else if(taskIndex == 1){
					newChoice(["Kay made | it"]);
				}
			}else if(trigger === "> Kay made | it"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Kay can make | jewreley?",
				"Man, he's a guy | of many talents",
				"If Amber knew | that, she'd be | all over him",
				"He'd have to quit | his job as a | knight and become | an artisan for | her"]);
				}else if(taskIndex == 3){
					endScene();
				}
			}
		}

		//main questor
		else if(story.kyle.other.name === "Amber"){
			if(trigger === "talk_Amber"){
				story.cutscene = true;
				if(taskIndex == 0){
					newDialog(["That amulet...",
						"It's gorgeous!"])
				}else if(taskIndex == 1){
					newChoice(["Trade?", "Kay made | it"]);
				}
			}else if(trigger === "> Trade?"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Yes please!",
						"(you give the | amulet to Amber)",
						"Oh it looks | amazing on me!",
						"I'm going to wear | it everyday for | the rest of my | life",
						"Thanks, Kyle!",
						"You're the best",
						"Oh! Here's that | cool thing I | promised you",
						"(you got a | special key from | Amber)",
						"I hope you have a | great time!",
						"I'll see you | around!"]);
				}else if(taskIndex == 3){
					story.kyle.tradeItem = "special key";
					story.kyle.tradeIndex = 48
					endScene();
				}
			}else if(trigger === "> Kay made | it"){
				if(taskIndex == 2){
					endChoice();
					newDialog(["Kay made that?",
						"I didn't know he | was so talented!",
						"I'll have to give | him a promotion!"]);
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
				newDialog(["(you find | yourself in a | large throne room | with banners | hanging from the | ceiling and | stained-glass | windows flooding | light into the | room)",
					"(you're sitting | on the throne in | colorfully | expensive clothes | - an empty, shiny | suit of armor | stands next to | you)",
					"(outside you hear | festival music | and people | laughing and | singing - a long | table covered in | meats, drink, and | desserts before | you)",
					"(you feel a sense | of peace - but | incomplete)",
					"(try again?)"])
			}else if(taskIndex == 3){
				newChoice(["Yes", "No"]);
			}
		}else if(trigger === "> No"){
			if(taskIndex == 4){
				endChoice();
				newDialog(["GAME OVER"]);
			}
		}else if(trigger === "> Yes"){
			if(taskIndex == 4){
				endChoice();
				story.quest = "Kyle";
				story.storyIndex = 0;
				story.kyle.tradeItem = "none";
				story.kyle.tradeIndex = 0;
				coin.show = true;
				story.kyleCt = 0;
				endScene();
			}
		}
	}
}
}
