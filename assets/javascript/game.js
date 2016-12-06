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
	var fighterScoreDiv;
	var defenderScoreDiv;


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
		healthPoints: 25,
		attackPower: 3,
		counterAttackPower: 1
	},

	tataka : {
		name:'tataka',
		healthPoints: 20,
		attackPower: 2,
		counterAttackPower: 1
	}
}


$(document).ready(function(){
	//disable attack button

	$("#attackBtn").attr("disabled", true);

	//select the fighter, enable attack button
	$('.charImage').on('click', function(){
		// 
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
			$defender = $(this).data('name');
			$isDefenderChosen = true;
			$(this).css("border", "5px solid #FF0000");
			$(this).appendTo('#defenderDiv');
			console.log($defender);
			$defenderHP = characters[$defender].healthPoints;
			$defenderAP = characters[$defender].attackPower;
			$defenderScoreDiv = $('#' + $defender +'Fig');
		}else{
			alert("The game is on...wait.")
		}

		$("#attackBtn").attr("disabled", false);
		console.log($fighter, $defender);
	});

	

	$("#attackBtn").on('click', function(){
		console.log(fighterScoreDiv, defenderScoreDiv);
		
		//Each time the player attacks, their character's Attack Power increases
		// by its base Attack Power.

		//For example, if the base Attack Power is 6, each attack will increase 
		//the Attack Power by 6 (12, 18, 24, 30 and so on).
		$fighterHP -= $defenderAP;
		$($fighterScoreDiv).html($fighterHP);

		console.log('fighterAP=', $fighterAP, $fighterCAP);
		$defenderHP -=$fighterAP;
		$fighterAP = $fighterAP + $fighterCAP;
		$($defenderScoreDiv).html($defenderHP);



		console.log($fighterHP, $defenderHP);

		if($defenderHP <=0){
			alert('you lose!');
		}


	})



});