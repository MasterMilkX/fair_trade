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
	if(story.kyle)
		var questItem = story.kyle.tradeItem;


if(story.quest === "Begin"){
	if(trigger === "touch_coin"){
		story.cutscene = true;
		if(taskIndex == 0){
			newDialog(["(you picked up | the token)"])
			coin.show = false;
			console.log("hey")
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
				newDialog(["You find | yourself in a | room with | samurai swords | and watercolor | paintings hung | on the walls.",
							"You're sitting | on a pillow | with a teapot | filled with | jasmine tea and | 2 cups on a | table in front | of you",
							"The room smells | of flowers and | smoke - a | violin plays | faintly in the | distance",
							"You feel a | sense of | peace... | but incomplete",
							"Try again?"])
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
