


$(document).ready(function(){
   //Tools******************

var sleep = function(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
    break;
    }
  }
};


	//Variables******************

	var goldValue = document.getElementById('Gold');
	var playerGoldClick = document.getElementById('Dragon');
	var eWeapon = document.getElementById('Equip');
	var playerDefend = document.getElementById('Knight');
	var playerPotion1Click = document.getElementById('p1');
	var playerWeapon1Click = document.getElementById('s1');
	var soldout1 = false;
	var playerWeapon2Click = document.getElementById('s2');
	var soldout2 = false;
	var playerWeapon3Click = document.getElementById('s3');
	var soldout3 = false;
	var goldGain = 1;
	var winGame = false;
	var gold = 0;
	var getGoldGain = document.getElementById('GGain');
	var hp = 100;
	var health = document.getElementById('Health');
	var getHealthChange = document.getElementById('HChange');
	var defending = false;
	var playerDied = false;
	var clickCount = 0;
	var clickSlash = document.getElementById('Slash');
	var slashSpeed = 400;
	var lastSlash = document.getElementById('Lslash');
	var defBlur = document.getElementById('Dblur');
	var clickOff = false;
	var backFlash = document.getElementById('Bgflash');

	//Functions******************

	function clickCounter() {
		clickCount += 1;
		if (clickCount == 1) {
			clickSlash.src ="images/slash1.png";
			$('#Slash').show();
			$('#Slash').fadeOut(slashSpeed);
		} else if (clickCount == 2) {
			clickSlash.src ="images/slash2.png";
			$('#Slash').show();
			$('#Slash').fadeOut(slashSpeed);
		} else if (clickCount == 3) {
			clickSlash.src ="images/slash3.png";
			$('#Slash').show();
			$('#Slash').fadeOut(slashSpeed);
			clickCount = 0;
		}
	}



	playerDefend.addEventListener('mouseover', function(event) {
		if (winGame == false) {
			if (playerDied == false) {
			playerDefend.src = "images/knightd.png";
			eWeapon.style.visibility = "hidden";
			defending = true;
			// sleep(2000);
			// playerDefend.src = "images/knight.png"
			// defending = false;
			}
		}
	})

	playerDefend.addEventListener('mouseout', function(event) {
		if (winGame == false) {
			if (playerDied == false) {
				playerDefend.src = "images/knight.png";
				eWeapon.style.visibility = "visible";
				defending = false;
				// sleep(2000);
				// playerDefend.src = "images/knight.png"
				// defending = false;
			}
		}
	})



	playerGoldClick.addEventListener('click', function(event) {
		if (playerDied == false) {
			if (winGame == false) {
				playerDefend.src = "images/knight.png";
				eWeapon.style.visibility = "visible";
				clickCounter();
				gold += goldGain;
				getGoldGain.innerHTML = ("+"+goldGain);
				$('#GGain').show();
				$('#GGain').fadeOut(slashSpeed);

				//innerHTML is the content of an element - this is basically taking the number of gold and displaying it in html.
				goldValue.innerHTML = gold;
			} else if (winGame == true && clickOff == false) {
				clickOff = true;
				
				playerGoldClick.src = "images/dragonded.png"
				lastSlash.src ="images/finalslash.png";

				$('#Lslash').show();
				$('#Lslash').fadeOut(1000);
				//I want the dragon to pause, shake, change color, fade out, then get replaced with a treasure hoard.
				backFlash.src = "images/phbgflash.png";
				$('#Bgflash').show();
				setTimeout(function(){ dedDrag(); }, 2000);
			 	// });



				// $('#Dragon').effect( "shake", {times:40}, 5000);
				// $('#Dragon').color( rgba(100,200,255,0.5) );
				// $('#Dragon').fadeOut(5000);
				
			}
		} else if (playerDied == true) {
			goldGain = 0;
		}
	})

	//Lesser Potion
	playerPotion1Click.addEventListener('click', function(event) {
		if (playerDied == false) {
			//If you have the money and you're hurt...
			if (gold >= 40 && hp <= 99) {
				gold -= 40;
				hp += 20;
				//If you've gained more than 100 hp...
				if (hp >= 100) {
					hp = 100;

				}
				goldValue.innerHTML = gold;
				health.innerHTML = hp;
			}
		}
	})

	//Bronze Sword
	playerWeapon1Click.addEventListener('click', function(event) {
		if (playerDied == false) {
			if (gold >= 20 && soldout1 == false) {
				gold -= 20;
				slashSpeed = 200;
				goldGain = 3;
				playerWeapon1Click.src = "images/soldout.png";
				goldValue.innerHTML = gold;
				soldout1 = true;
				eWeapon.src = "images/esword1.png";
			}
		}
	})

	//Silver Blade
	playerWeapon2Click.addEventListener('click', function(event) {
		if (playerDied == false) {
			if (gold >= 50 && soldout2 == false) {
				gold -= 50;
				slashSpeed = 100;
				goldGain = 5;
				playerWeapon1Click.src = "images/soldout.png";
				playerWeapon2Click.src = "images/soldout.png";
				goldValue.innerHTML = gold;
				soldout1 = true;
				soldout2 = true;
				eWeapon.src = "images/esword2.png";
			}
		}
	})

	//Dragon Slayer
	playerWeapon3Click.addEventListener('click', function(event) {
		if (playerDied == false) {
			if (gold >= 100 && soldout3 == false) {
				gold -= 100;
				playerWeapon1Click.src = "images/soldout.png";
				playerWeapon2Click.src = "images/soldout.png";
				playerWeapon3Click.src = "images/soldout.png";
				goldValue.innerHTML = gold;
				soldout1 = true;
				soldout2 = true;
				soldout3 = true;
				winGame = true;
				eWeapon.src = "images/esword3.png";
			}
		}
	})

	function celebrate1() {
		playerDefend.src = "images/knighty1.png"
		eWeapon.style.visibility = "hidden";
		gold = 1000000;
		goldValue.innerHTML = gold;
		setTimeout(function(){ celebrate2(); }, 400);
	}
	function celebrate2() {
		playerDefend.src = "images/knighty2.png"
		setTimeout(function(){ celebrate1(); }, 400);
	}

	function dedDrag() {
		$('#Bgflash').fadeOut(5000);
	    $('#Shaker').effect( "shake", {times:40}, 5000);
	    $('#Dragon').fadeOut(5000);
	    setTimeout(function(){ celebrate1(); }, 7000);
		
	}

	function delayer() {
		$('#Flavor').hide();
		setTimeout(function(){ randomAttack(); }, 3000);
	}

	function randomAttack() {
		playerGoldClick.src = "images/dragon.png";
		// playerDefend.src = "images/knight.png";
		// eWeapon.style.visibility = "visible";
		var ranNum = Math.floor((Math.random() * 5000) + 1000);
	    setTimeout(function(){ attacking(); }, ranNum);
	}

	function attacking() {
		if (winGame == true) {
			
		} else if (winGame == false) {
			playerGoldClick.src = "images/dragona.png";
			setTimeout(function(){ attackKnight(); }, 1000);
		}

	}

	function attackKnight() {
		//playerGoldClick.src = "images/dattack.png";
		
		if (winGame == true) {
			
		} else if (winGame == false) {
			if (defending == true) {
				$('#Flavor').show();
				$('#Flavor').fadeOut();
				playerDefend.src = "images/knightd.png"
				defBlur.src ="images/dblur.png";
				$('#Dblur').show();
				$('#Dblur').fadeOut();
				randomAttack();
			} else if (defending == false) {
				var ranDam = Math.floor((Math.random() * 50) + 5);
				hp -= ranDam;
				health.innerHTML = hp;
				if (hp <= 0) {
					hp = 0;
					health.innerHTML = hp;
					playerDied = true;
					defBlur.src ="images/dblur.png";
					$('#Dblur').show();
					$('#Dblur').fadeOut();
					playerDefend.src = "images/RIP.png";
					eWeapon.style.visibility = "hidden";

				} else {
					playerGoldClick.src = "images/dragon.png";
					getHealthChange.innerHTML = ("-"+ranDam);
					$('#HChange').show();
					$('#HChange').fadeOut(2000);
					knightHit();
				}

			}
		}
	}

	function knightHit() {
		if (winGame == true) {
			
		} else if (winGame == false) {
			playerGoldClick.src = "images/dragon.png"
			playerDefend.src = "images/knighthit.png"
			eWeapon.style.visibility = "hidden";
			setTimeout(function(){ randomAttack(); }, 1000);
		}
	}



	delayer();



	//Functions******************



	//Pseudo*******************



	//Runners******************

	 


})






