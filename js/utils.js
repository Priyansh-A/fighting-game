function rectangularCollision({rectangle1 , rectangle2}){
    return(rectangle1.attackBox.position.x + rectangle1.attackBox.width>= rectangle2.position.x && rectangle1.attackBox.position.x<= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y +rectangle1.attackBox.height>= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y +enemy.height
    ) 
    }
    function determineWinner({player, enemy, timerId}){
        clearTimeout(timerId)
        document.getElementById('end-text').style.display =  'flex'
        if(player.health === enemy.health){
    
            document.getElementById('end-text').innerHTML =  'Tie'
        }
        else if(player.health> enemy.health){
            document.getElementById('end-text').innerHTML = 'Player 1 Wins'
    
        }
        else if(player.health < enemy.health){
            document.getElementById('end-text').innerHTML = 'Player 2 Wins'
    
        }
    }
    
    let timer = 50;
let timerId
function decreaseTimer(){

    if(timer>0){
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.getElementById('timer').innerHTML= timer
    }
    if(timer === 0){
        determineWinner({player, enemy, timerId})
}
}
