var $isFighterChosen = false;
var $isDefenderChosen = false;
var $isGameOn = false;

var $fighter;
var $defender;
var $fighterHP;
var $fighterAP;
var $fighterCAP;
var $defenderHP;
var $defenderAP;
var $defenderCAP;
var fighterScoreDiv;
var defenderScoreDiv;

var defenderCount = [];


var characters = {

	rama: {
		name: 'rama',
		healthPoints: 100,
		attackPower: 10,
		counterAttackPower: 3

	},

	ravana: {
		name: 'ravana',
		healthPoints: 80,
		attackPower: 5,
		counterAttackPower: 2
	},

	kumbakarna: {
		name: 'kumbakarna',
		healthPoints: 50,
		attackPower: 3,
		counterAttackPower: 1
	},

	tataka : {
		name:'tataka',
		healthPoints: 30,
		attackPower: 2,
		counterAttackPower: 1
	}
}

var game = {	

	init: function(){
		$("#attackBtn").attr("disabled", true);
		$("#resetBtn").hide();
	},

	reset: function(){
		$isDefenderChosen = false;
    	$isGameOn = false;
    	$fighterHP = characters[$fighter].healthPoints;
    	$defenderHP = characters[$defender].healthPoints;
    	$fighterAP = characters[$fighter].attackPower;
    	$defenderAP = characters[$defender].attackPower;
    	$("#attackBtn").attr("disabled", true);
	}
}


$(document).ready(function(){

	game.init();

	//select the fighter, enable attack button
	$('.charImage').on('click', function(){
		sound('select');
		if(!$isFighterChosen){
			$fighter = $(this).data('name');
			$(this).css("border", "5px solid #00FF00");
			$(this).appendTo('#fighterDiv');
			
			$isFighterChosen = true;
			$isGameOn = true;
			
			$fighterHP = characters[$fighter].healthPoints;
			$fighterAP = characters[$fighter].attackPower;
			$fighterCAP = characters[$fighter].counterAttackPower;
			
			$fighterScoreDiv = $('#' + $fighter +'Fig');
		
		}else if (!$isDefenderChosen){
			if($isFighterChosen && ($(this).data('name') === $fighter)){
				alert('You cannot choose the fighter');
			}else{
			
				$defender = $(this).data('name');
				$isDefenderChosen = true;
				$(this).css("border", "5px solid #FF0000");
				$(this).appendTo('#defenderDiv');
				
				$defenderHP = characters[$defender].healthPoints;
				$defenderAP = characters[$defender].attackPower;
				$defenderCAP = characters[$defender].counterAttackPower;
				
				$defenderScoreDiv = $('#' + $defender +'Fig');

				defenderCount.push($defender);
			}
		
		}else{
			alert("The game is on...wait.")
		}

		$("#attackBtn").attr("disabled", false);
		console.log($fighter, $defender);

		$("#resetBtn").on('click', function(){
			location.reload();
		});

	});


	$("#attackBtn").on('click', function(){

		sound('attack');
		//console.log(fighterScoreDiv, defenderScoreDiv);
		
		// fighter attack, fighterHP - defenderCAP, update Div
		$fighterHP -= $defenderCAP;
		$($fighterScoreDiv).html($fighterHP);

		//console.log('fighterAP=', $fighterAP, "fighterCAP=", $fighterCAP);


		$defenderHP -=$fighterAP;
		$fighterAP = $fighterAP + $fighterCAP;
		$($defenderScoreDiv).html($defenderHP);

		var $status = 'You attacked ' + $defender + ' for ' + $fighterAP + ' points!' + '</br>'+
					$defender + ' attacked you back with ' + $defenderCAP + ' points ';	

		$('#attackStatus').html($status);
		$('#attackStatus').css('color', '#FF8C00');

		console.log($fighterHP, $defenderHP);


		if($defenderHP <=0){
			console.log('defenderCount' , defenderCount.length);
			if(defenderCount.length <3)
			{
				$('#attackStatus').html('You defeated ' + $defender + '!' + '</br>' + 'Pick another Defender!' );
					sound('win');	
			}else{
				$('#attackStatus').html('You defended all Enemies! <br> Press Reset to Play again!');
				sound('victory');
				$("#resetBtn").show();
			}
			
			$('#attackStatus').css('color', 'green');
			var id= "#" + $defender;

			// console.log('defender' + id);

			$(id).hide('slow');

			game.reset();

		}else if ($fighterHP <=0){
			var id= "#" + $fighter;
			var $status = 'You have been defeated! Game over! Play Again!'
			$('#attackStatus').html($status);
			$("#attackBtn").attr("disabled", true);
			
			$("#resetBtn").show();

		}

	});

	function sound(str){
    var audio = document.createElement("audio");
    if(str ==="attack"){
    	audio.src = "assets/sounds/attack.wav";
	}else if(str === "select"){
		audio.src = "assets/sounds/select.wav";
	}else if(str === "win"){
		audio.src = "assets/sounds/win.wav";
	}else if(str === "victory"){
		audio.src = "assets/sounds/victory.wav";
	}
    audio.play();   
	}




$(function() {
var body = $('body');
var backgrounds = new Array(
'url("assets/images/Ramayana-bg.jpg")',
'url("assets/images/Ramayana-bg2.jpg")',
'url("assets/images/Ramayana-bg3.jpg")',
'url("assets/images/Ramayana-bg4.jpg")',
'url("assets/images/Ramayana-bg5.jpg")',
'url("assets/images/Ramayana-bg6.jpg")',
'url("assets/images/Ramayana-bg7.jpg")',
'url("assets/images/Ramayana-bg8.jpg")',
'url("assets/images/Ramayana-bg9.jpg")',
'url("assets/images/Ramayana-bg10.jpg")',
'url("assets/images/Ramayana-bg11.jpg")'
);

var current = 0;

function nextBackground() {
	body.css(
	'background',
		backgrounds[current = ++current % backgrounds.length]
	);

	body.css('background-size',  'cover');

	setTimeout(nextBackground, 5000);
}
setTimeout(nextBackground, 10000);
body.css('background', backgrounds[0]);
body.css('background-size',  'cover');

});


$('#audioBtn').on('click', function(){
	var source = "assets/sounds/war.mp3";

	if($('#sound').attr('src') === source){
		$('#sound').attr('src', " ");
	}else{
		$('#sound').attr('src', source)
	}
});


});