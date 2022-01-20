function end_game() {
	game_over_text = document.getElementById("game_over");
	game_over_text.style.display = "block"; // Makes the game over sign visible

	clearInterval(game_play);
	clearInterval(spawn_wood_interval);
}

function point_and_gravity() {
	canvas = document.getElementById("canvas");
	
	score = document.getElementById("score");
	score.innerHTML =  parseInt(score.innerHTML) + 1;

	character = document.getElementById("character");

	current_y = document.getElementById("character").style.top

	new_y = (parseInt(current_y.replace(/px/,""))+1)+"px"

	character.style.top = new_y;
	
	if (character.getBoundingClientRect().top >= canvas.getBoundingClientRect().bottom) {
		end_game();
	}

	wood = document.getElementById("a_wood");
	
	// Get the ending x of wood
	ending_wood = wood.getBoundingClientRect().x + 350

	// Get the x position of character 
	charcter_x = character.getBoundingClientRect().x

	// If character's x position is between the wood
	if (charcter_x >= wood.getBoundingClientRect().x && charcter_x <= ending_wood) {

		// Get the ending of the wood's y position
		ending_wood = wood.getBoundingClientRect().y + 60

		// Get the character's y position
		character_y_start = character.getBoundingClientRect().y;
		character_y_end = character.getBoundingClientRect().y - character.style.height.replace("px","");
		
		character_y_middle = character.getBoundingClientRect().y - (character.style.height.replace("px",""))/2;
		
		// If head below wood top AND head above wood bottom
		if (character_y_start >= wood.getBoundingClientRect().y && character_y_start <= ending_wood) {
			end_game()
		}

		// If feet below wood top AND above wood bottom
		else if (character_y_end >= wood.getBoundingClientRect().y && character_y_end <= ending_wood) {
			end_game()
		}

		// If middle below wood top AND above wood bottom
		else if (character_y_middle >= wood.getBoundingClientRect().y && character_y_middle <= ending_wood) {
			end_game()
		}
	}
}

// Detects keyboard clicks
window.addEventListener('keydown', function (key_pressed) {
	// If it's the space bar, run the following
	if (key_pressed.key == " ") {
	  	  
	  	canvas = document.getElementById("canvas");
		character = document.getElementById("character");

	  	new_y = (parseInt(current_y.replace(/px/,""))-50)+"px"

		// Only moves the character up if it will not go outside of the border
		if (character.getBoundingClientRect().top >= canvas.getBoundingClientRect().top) {
			character.style.top = new_y;
		}
  }
}, false);


function spawn_wood() {
	canvas = document.getElementById("canvas");

	const new_wood = document.createElement("img");

	new_wood.src = "images/obstacle.png";
	new_wood.classList.add("wood");
	new_wood.setAttribute("id","a_wood");
	
	// Puts it somewhere random
	new_wood.style.top = Math.floor(Math.random() * 11) + "0%";

	// Remove the wood when it's animation ends
	new_wood.addEventListener("animationend", function() {
		this.remove();
    });

	canvas.appendChild(new_wood);
}

// Runs every 10ms
const game_play = setInterval(point_and_gravity, 10);

// Spawns every 5 seconds
const spawn_wood_interval = setInterval(spawn_wood, 5000);
