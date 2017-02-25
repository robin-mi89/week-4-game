class Ship {
    constructor(name, hp, atk, counter, img){
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.counter = counter;
        this.img = img;
    }
}
var startSound = ["assets/sounds/start1.mp3", "assets/sounds/start2.mp3", "assets/sounds/start3.mp3"];
var winSound = ["assets/sounds/win1.mp3", "assets/sounds/win2.mp3", "assets/sounds/win3.mp3"];
var loseSound = ["assets/sounds/lose1.mp3", "assets/sounds/lose2.mp3", "assets/sounds/lose3.mp3"];

var tieInterceptor = new Ship("tie/in Interceptor", 100, 25, 25, "assets/images/tieinterceptor.jpg");
var tieFighter = new Ship("tie/ln Fighter", 120, 15, 15, "assets/images/tiefighter.jpg");
var ywing = new Ship("Y-Wing Starfighter", 180, 10, 10, "assets/images/ywing.jpg");
var xwing = new Ship("T65 X-Wing", 130, 20, 20, "assets/images/xwing.jpg");

var allChars = [xwing, ywing, tieFighter, tieInterceptor];
var hasUserShip = false;
var hasDefender = false;
var lost = false;
var won = false;
var atkIncrease = 6;

$(document).ready(function() {

reset();

function fight(attacker, defender)
{
    defender.hp -= attacker.atk;
    $("#userReport").text("You hit " + defender.name + " for " + attacker.atk + " damage.");
    $(".defender-ship > .ship-hp").text("HP: " + defender.hp);
    if (defender.hp <= 0)
    {
        win();
        return;
    }
    attacker.hp -= defender.counter;
    $(".friendly-ship > .ship-hp").text("HP: " + attacker.hp);
    $("#enemyReport").text(defender.name + " counter attacked for " + defender.counter + " damage.");
    if (attacker.hp <= 0)
    {
        $(".user-ship").empty();
        lose();
    }
    attacker.atk += atkIncrease;
    
}

function win()
{
    $(".defender-ship").remove();
    hasDefender = false;
    if ($.trim($(".enemy-ship").html()) == "") //no more enemys remaining
    {
         $("<audio></audio>").attr({ 
		'src':  winSound[Math.floor(Math.random() * 3)],
		'autoplay':'autoplay'
	    }).appendTo($(".audio"));

        won = true;
        $("#userReport").text("You Win!");
        $("#enemyReport").text("");
    }
}

function lose()
{
    $("<audio></audio>").attr({ 
		'src':  loseSound[Math.floor(Math.random() * 3)],
		'autoplay':'autoplay'
	}).appendTo($(".audio"));

    lost = true;
    $("#userReport").text("You Lose, Please Click Reset to Play Again.");
    $("#enemyReport").text("");
}



$("body").on("click", "div.ship", function(){
    if (!lost && !won)
    {
        if (!hasUserShip)
        {
            $("#rowUserChar").append( $(this));
            $(this).removeClass("neutral-ship");
            $(this).addClass("friendly-ship");
            var ship = $(this).data("ship");
            console.log(ship);
            hasUserShip = true;

            var neutToEnemy = $(".neutral-ship");
            neutToEnemy.addClass("enemy-ship");
            neutToEnemy.removeClass("neutral-ship");
            $("#rowEnemies").append($(neutToEnemy));
        }
        else
        {
            if (!$(this).hasClass("friendly-ship") && !hasDefender)
            {
            $(this).removeClass("enemy-ship");
            $(this).addClass("defender-ship");
            $("#rowDefender").append($(this));
            hasDefender = true;
            }
        } 
    }
});

$("#attack").on("click", function(){
    if (hasUserShip && hasDefender && !lost && !won)
    {
    fight($(".friendly-ship").data("ship"), $(".defender-ship").data("ship"));
    }
});

$("#reset").on("click", function(){
    reset();
});

function reset(){
 tieInterceptor = new Ship("tie/in Interceptor", 100, 25, 25, "assets/images/tieinterceptor.jpg");
 tieFighter = new Ship("tie/ln Fighter", 120, 15, 15, "assets/images/tiefighter.jpg");
 ywing = new Ship("Y-Wing Starfighter", 180, 10, 10, "assets/images/ywing.jpg");
 xwing = new Ship("T65 X-Wing", 140, 20, 20, "assets/images/xwing.jpg");

 allChars = [xwing, ywing, tieFighter, tieInterceptor];
 hasUserShip = false;
 hasDefender = false;
 lost = false;
 won = false;

//removes all ships 
$(".neutral-ship , .friendly-ship, .defender-ship, .enemy-ship").remove();


//adds ships from original variables. 
 for (i=0; i < allChars.length; i++)
{
    var shipDiv = $("<div>");
    shipDiv.addClass("neutral-ship");
    shipDiv.addClass("ship");
    
     var name = $("<p>");
     name.addClass("ship-name");
     name.text(allChars[i].name);
     var health = $("<p>");
     health.addClass("ship-hp");
     health.text("HP: " + allChars[i].hp);
     shipDiv.data("ship", allChars[i]);

    var shipImg = $("<div>");
    shipImg.addClass("ship-img");
    
    var img = $("<img>", { 
    src: allChars[i].img,
    width: "90px", 
    height: "90px"
    });

    shipImg.append(img);
    shipDiv.append(name);
    shipDiv.append(shipImg);
    shipDiv.append(health);
    $("#rowChooseChar").append(shipDiv);
}

// var random = Math.floor(Math.random() * 3);
   $("<audio></audio>").attr({ 
		'src':  startSound[Math.floor(Math.random() * 3)],
		'autoplay':'autoplay'
	}).appendTo($(".audio"));
    
}

});