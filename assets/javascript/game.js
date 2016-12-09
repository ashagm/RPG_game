var isFighterChosen = false;
var isDefenderChosen = false;
var isGameOn = false;

var fighter;
var defender;
var fighterHP;
var fighterAP;
var fighterCAP;
var defenderHP;
var defenderAP;
var defenderCAP;
var fighterScoreDiv;
var defenderScoreDiv;

var defenderCount = [];

var characters = {

	rama: {
		name: 'rama',
		healthPoints: 160,
		attackPower: 10,
		counterAttackPower: 20

	},

	ravana: {
		name: 'ravana',
		healthPoints: 130,
		attackPower: 15,
		counterAttackPower: 10
	},

	kumbakarna: {
		name: 'kumbakarna',
		healthPoints: 180,
		attackPower: 7,
		counterAttackPower: 5
	},

	tataka : {
		name:'tataka',
		healthPoints: 112,
		attackPower: 10,
		counterAttackPower: 3
	}
}


$(document).ready(function(){

	init();

	$('.charImage').on('click', function(){
		sound('select');

		if(!isFighterChosen){
			fighter = $(this).data('name');
			// consider using 'addClass' and add the class in CSS first
			$(this).css("border", "5px solid #00FF00");
			$(this).appendTo('#fighterDiv');
			
			isFighterChosen = true;
			isGameOn = true;
			
			fighterHP = characters[fighter].healthPoints;
			fighterAP = characters[fighter].attackPower;
			fighterCAP = characters[fighter].counterAttackPower;
			
			fighterScoreDiv = $('#' + fighter +'Fig');
		
		}else if (!isDefenderChosen){

			if(isFighterChosen && 
						($(this).data('name') === fighter)){
				alert('You cannot pick the warrior as the defender!');
			}else{
				$("#attackBtn").show();
				$("#attackBtn").attr("disabled", false);

				defender = $(this).data('name');
				isDefenderChosen = true;
				$(this).css("border", "5px solid #FF0000");
				$(this).appendTo('#defenderDiv');
				
				defenderHP = characters[defender].healthPoints;
				defenderAP = characters[defender].attackPower;
				defenderCAP = characters[defender].counterAttackPower;
				
				defenderScoreDiv = $('#' + defender +'Fig');

				defenderCount.push(defender);
			}
		
		}else{
			alert("The game is on...wait.")
		}

		$("attackBtn").show();
		
		console.log(fighter, defender);

	});

	$("#resetBtn").on('click', function(){
		location.reload();
	});


	$("#attackBtn").on('click', function(){

		sound('attack');
		 // $(this).effect( "shake", {times:5}, 100);
		 // $('#attackDiv').effect( "bounce", "fast" );

		console.log("Before attack..");
		console.log('fighterHP=', fighterHP, ' fighterAP=', fighterAP, " fighterCAP=", fighterCAP);
		console.log('defenderHP=', defenderHP, ' defenderAP=', defenderAP, " defenderCAP=", defenderCAP);
		
		fighterHP -= defenderCAP;
		$(fighterScoreDiv).html(fighterHP);		

		//fighter attacks
		defenderHP -=fighterAP;
		fighterAP = fighterAP + fighterCAP;
		$(defenderScoreDiv).html(defenderHP);

		
		var status = 'You attacked ' + defender + ' ' + fighterAP + ' times!' + '</br>'+
					defender + ' attacked you back ' + defenderCAP + ' times! ';	

		$('#attackStatus').html(status);
		$('#attackStatus').css('color', '#FF8C00');

		console.log("After attack..");
		console.log('fighterHP=', fighterHP, ' fighterAP=', fighterAP, " fighterCAP=", fighterCAP);
		console.log('defenderHP=', defenderHP, ' defenderAP=', defenderAP, " defenderCAP=", defenderCAP);


		if(defenderHP <=0){
			// console.log('defenderCount' , defenderCount.length);
			
			if(defenderCount.length <3)
			{
				$('#attackStatus').html('You defeated ' + defender + '!' + '</br>' + 'Pick another Defender!' );
					sound('win');	
			}else{
				$('#attackStatus').html('VICTORY!! You ' + fighter + ' defeateded all Enemies!');
				sound('victory');
				$("#resetBtn").show();
			}
			
			$('#attackStatus').css('color', 'green');
			var id= "#" + defender;

			$(id).hide('slow');

			reset();

		}else if (fighterHP <=0){
			var id= "#" + fighter;
			var status = 'You ' + fighter + ' have been defeated by ' + defender ;
	
			$('#attackStatus').html(status);
			$("#attackBtn").attr("disabled", true);
			$(id).hide('slow');
			
			$("#resetBtn").show();

		}

	});


	function init(){
		$("#attackBtn").attr("disabled", true);
		$("#attackBtn").hide();
		$("#resetBtn").hide();

		jQuery.each(characters, function( i, val ) {
			var fig= i+'Fig';
  			$( "#" + (i+'Fig')).html(characters[i].healthPoints);
		});

		// $('#ramaFig').html(characters['rama'].healthPoints);
		// $('#ravanaFig').html(characters['ravana'].healthPoints);
		// $('#kumbakarnaFig').html(characters['kumbakarna'].healthPoints);
		// $('#tatakaFig').html(characters['tataka'].healthPoints);
	}
	
	function reset(){
		isDefenderChosen = false;
    	isGameOn = false;
    	// $fighterHP = characters[$fighter].healthPoints;
    	defenderHP = characters[defender].healthPoints;
    	// $fighterAP = characters[$fighter].attackPower;
    	defenderAP = characters[defender].attackPower;
    	$("#attackBtn").attr("disabled", true);
    	$("#attackBtn").hide();
	}

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
'url("assets/images/Ramayana-bg11.jpg")',
'url("assets/images/Ramayana-bg14.jpg")'
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