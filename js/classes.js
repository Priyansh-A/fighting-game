class Sprite {
    constructor({position, imageSrc , scale = 1, frameMax = 1 , offset = {x:0, y:0}}){
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.offset = offset
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
}

    draw(){
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.frameMax),
            0,
            this.image.width / this.frameMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            ( this.image.width / this.frameMax)* this.scale,
             this.image.height * this.scale);
    }

animateFrames(){
    this.framesElapsed++

    if(this.framesElapsed % this.framesHold === 0){
    if(this.frameCurrent < this.frameMax - 1){
        this.frameCurrent++
    } 
    else{
        this.frameCurrent = 0
    }
    
}
}


    update(){
        this.draw()
        this.animateFrames()
    }

}


class Fighter extends Sprite {
constructor({
    position, 
    velocity,
    color = 'red',
    imageSrc ,
    scale = 1, 
    frameMax = 1, 
    offset = {x:0, y:0},
    sprites,
    attackBox = { offset: {} ,
        width: undefined, 
        height: undefined
    }}
){
        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset
        })
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset : attackBox.offset,
            width: attackBox.width  ,
            height: attackBox.height
        }
        this.health = 100;
        this.isAttacking;
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 8
        this.color = color
        this.sprites = sprites
        this.dead = false

        for(const sprite in sprites){
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
        }

    }

    update(){
        this.draw()

        if(!this.dead){
        this.animateFrames()
        }
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y        
        this.position.x +=this.velocity.x
        this.position.y += this.velocity.y;
        //gravity taking place

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 96){
            this.velocity.y = 0;
            this.position.y = 330
        }
        else{
        this.velocity.y += Gravity;
        }

    }
    attack(){
        this.switchSprite('Attack1')
        this.isAttacking = true;

    }

    takeHit(){
        this.health -= 20;
    if(this.health<= 0){
    this.switchSprite('Death')   
    } else{
        this.switchSprite('takeHit')

    }

    }



    switchSprite(sprite){
        if(this.image === this.sprites.Death.image)
    {
        if(this.frameCurrent === this.sprites.Death.frameMax - 1){
            this.dead = true
        }
        return
    } 
        // overriting all animations with attack
        if(this.image === this.sprites.Attack1.image && this.frameCurrent < this.sprites.Attack1.frameMax - 1 )
        return
        // overriting with hit
if(
    this.image === this.sprites.takeHit.image &&
    this.frameCurrent < this.sprites.takeHit.frameMax - 1)
    return

        switch(sprite){
        case 'Idle':
            if(this.image !== this.sprites.Idle.image){
            this.image = this.sprites.Idle.image
            this.frameMax = this.sprites.Idle.frameMax
            this.frameCurrent = 0
        }
                break
                case 'Run':
            if(this.image !== this.sprites.Run.image){
            this.image = this.sprites.Run.image
            this.frameMax = this.sprites.Run.frameMax
            this.frameCurrent = 0

            }
    
                    break
                    case 'Jump':
                        if(this.image !== this.sprites.Jump.image){
                        this.image = this.sprites.Jump.image
                        this.frameMax = this.sprites.Jump.frameMax
            this.frameCurrent = 0
                    }
                    break
                    case 'Fall':
                        if(this.image !== this.sprites.Fall.image){
                        this.image = this.sprites.Fall.image
                        this.frameMax = this.sprites.Fall.frameMax
            this.frameCurrent = 0
                    }
                    break
                    case 'Attack1':
                        if(this.image !== this.sprites.Attack1.image){
                        this.image = this.sprites.Attack1.image
                        this.frameMax = this.sprites.Attack1.frameMax
                        this.frameCurrent = 0
                    }
                    break
                    case 'takeHit':
                        if(this.image !== this.sprites.takeHit.image){
                        this.image = this.sprites.takeHit.image
                        this.frameMax = this.sprites.takeHit.frameMax
                        this.frameCurrent = 0
                    }
                    break
                    case 'Death':
                        if(this.image !== this.sprites.Death.image){
                        this.image = this.sprites.Death.image
                        this.frameMax = this.sprites.Death.frameMax
                        this.frameCurrent = 0
                    }
                    break
        }
    }
}
