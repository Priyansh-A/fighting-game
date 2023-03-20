const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const Gravity = 0.7

const background = new Sprite({
    position: {
    x: 0,
    y: 0
    },
    imageSrc: './img/background.png'
})
const shop = new Sprite({
    position: {
    x: 620,
    y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    frameMax: 6,
})

const player = new Fighter({
    position:{

    x: 0 ,
    y: 0
}, 

offset:{
    x:0,
    y:0
},
velocity:{
    x:0,
    y:0

},
imageSrc: './img/Evil-wizard/Sprites/Idle.png',
frameMax: 8,
scale:2.5,
offset:{
    x:200 , 
    y:268
},
sprites:{
    Idle :{
    imageSrc:'./img/Evil-wizard/Sprites/Idle.png',
    frameMax: 8
    },
    Run :{
    imageSrc:'./img/Evil-wizard/Sprites/Run.png',
    frameMax: 8,
    },
    Jump :{
    imageSrc:'./img/Evil-wizard/Sprites/Jump.png',
    frameMax: 2,
    },
    Fall :{
    imageSrc:'./img/Evil-wizard/Sprites/Fall.png',
    frameMax: 2,
    },
    Attack1 :{
    imageSrc:'./img/Evil-wizard/Sprites/Attack1.png',
    frameMax: 8,
    },

    takeHit:{
        imageSrc:'./img/Evil-wizard/Sprites/Take hit.png',
        frameMax: 3,
    }, 
    Death:{
        imageSrc:'./img/Evil-wizard/Sprites/Death.png',
        frameMax: 7,
    }}
    ,
    attackBox: {
        offset:{
            x:200 ,
            y:50
        },
        width:100,
        height:50

    }

    

}

)


const enemy = new Fighter({
    position:{

    x: 800 ,
    y: 100
},

offset:{
    x:50,
    y:0
},
velocity:{
    x:0,
    y:0
},

color: 'Blue',
imageSrc: './img/Huntress/Sprites/Idle.png',
frameMax: 8,
scale:3.25,
offset:{
    x:200 , 
    y:165
},
sprites:{
    Idle :{
    imageSrc:'./img/Huntress/Sprites/Idle.png',
    frameMax: 8
    },
    Run :{
    imageSrc:'./img/Huntress/Sprites/Run.png',
    frameMax: 8,
    },
    Jump :{
    imageSrc:'./img/Huntress/Sprites/Jump.png',
    frameMax: 2,
    },
    Fall :{
    imageSrc:'./img/Huntress/Sprites/Fall.png',
    frameMax: 2,
    },
    Attack1 :{
    imageSrc:'./img/Huntress/Sprites/Attack1.png',
    frameMax: 5,
    },
    takeHit:{
    imageSrc:'./img/Huntress/Sprites/Take hit.png',
    frameMax: 3,

    },
    Death:{
    imageSrc:'./img/Huntress/Sprites/Death.png',
    frameMax: 8,

    },
},
    attackBox: {
        offset:{
            x:-210,
            y:50
        },
        width:60,
        height:50

    }
})

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
}


decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    // shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    // player movement
    if(keys.a.pressed && player.lastKey == 'a'){
        player.velocity.x = -5
        player.switchSprite('Run')
    }
    else if (keys.d.pressed && player.lastKey == 'd'){
        player.velocity.x = 5
        player.switchSprite('Run')

    } 

    else if(keys.w.pressed && player.lastKey == 'w'){
        player.velocity.y = -15;
    
    }

    else{
        player.switchSprite('Idle')
    
        }
        // While jumping
    if(player.velocity.y < 0){
player.switchSprite('Jump')
    }
    else if(player.velocity.y > 0){
        player.switchSprite('Fall')
    }
// enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft'){
        enemy.velocity.x = -5
        enemy.switchSprite('Run')
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight'){
        enemy.velocity.x = 5
    enemy.switchSprite('Run')
    }

    else if(keys.ArrowUp.pressed && enemy.lastKey == 'ArrowUp'){
    enemy.velocity.y = -15;
}
else{
    enemy.switchSprite('Idle')

    }
    if(enemy.velocity.y < 0){
        enemy.switchSprite('Jump')
            }
            else if(enemy.velocity.y > 0){
                enemy.switchSprite('Fall')
            }
        
    
// detect the collision
if(rectangularCollision({
    rectangle1: player,
    rectangle2:enemy}) && player.isAttacking && player.frameCurrent === 3){
    enemy.takeHit()
    player.isAttacking = false;
    gsap.to('#enemy-health',{
        width:enemy.health + '%'
    })

}
// if the player misses 
if(player.isAttacking && player.frameCurrent === 3){
    player.isAttacking = false
}
// player gets hit here

if(rectangularCollision({
    rectangle1: enemy,
    rectangle2:player}) && enemy.isAttacking && enemy.frameCurrent === 3){
        player.takeHit()
    enemy.isAttacking = false;
    gsap.to('#player-health',{
        width:player.health + '%'
    })

}
if(enemy.isAttacking && enemy.frameCurrent === 3){
    enemy.isAttacking = false
}
// game ending based on the health
if(enemy.health <= 0 || player.health<=0){
    determineWinner({player, enemy , timerId})

}


}   




animate()
// eventlistners
window.addEventListener('keydown', (event)=>{
    if(!player.dead){
    switch (event.key) {
    case 'd' :
        keys.d.pressed = true;
        player.lastKey = 'd'
        break
    case 'a':
        keys.a.pressed = true;
        player.lastKey = 'a'
        break
    case 'w':
        keys.w.pressed = true;
        player.lastKey = 'w'
        break
    }
}
    if(!enemy.dead){
    switch(event.key){
        case 'ArrowRight' :
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            enemy.lastKey = 'ArrowUp'
            break
        case 'ArrowDown':
            enemy.attack()
            break
        case ' ':
            player.attack()
            break
        }
    }
    }


)

window.addEventListener('keyup', (event)=>{
    switch (event.key) {
        case 'd' :
        keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
        break
        case 'w':
            keys.w.pressed = false;
        break
    }
    switch(event.key){
        case 'ArrowRight' :
            keys.ArrowRight.pressed = false;
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false;
            break
            case 'ArrowUp':
                keys.ArrowUp.pressed = false;
            break    
    }


    })
    
