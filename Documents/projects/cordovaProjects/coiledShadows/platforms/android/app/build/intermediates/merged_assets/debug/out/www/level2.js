var knight;
var isStriking;
var rolling2 = false;
var daggerSprite;
var daggerCollideSkeleton = false;
var keyReached = false;
var finish2 = false;
var daggers2 = parseInt(localStorage.getItem("daggers"));
var daggerThrown;
var fullhp = parseInt(localStorage.getItem("hp"));
var hp = fullhp;
var crouching;
class level2 extends Phaser.Scene {
	constructor() {
		super("level2");
	}
	create(){
		/android:screenOrientation="landscape"/
		this.emitter=EventDispatcher.getInstance();
    this.gamePad = new GamePad({scene: this});
		this.gamePad.x = 0; this.gamePad.y = 0;
		this.gamePad.x = 275; this.gamePad.y = 225;
		this.setListeners();
		daggers2 = parseInt(localStorage.getItem("daggers"));
		//PLAYER
		keyReached = false;
    knight=this.physics.add.sprite(10 * 16, 9 * 16,"knight");
    knight.play("idle");
    knight.setCollideWorldBounds = true;
    knight.onWorldBounds = true;
    knight.body.setSize(knight.width/1.5,knight.height,true);
		this.offsetset = this.time.addEvent({
			delay: 100,
			callback: () => {
				if (knight.flipX == true){
					knight.body.setOffset(12,0);
				}
				else{
					knight.body.setOffset(0,0)
				}
			},
			loop: true,
			paused: false
		});
    knight.body.immovable = true;
    knight.setDepth(997);
		this.daggerSprite = this.physics.add.sprite(0, 0, "dagger");
		this.daggerSprite.setDepth(999);
		this.daggerSprite.body.allowGravity = false;
		this.daggerSprite.body.immovable = true;

		//LAYERS AND TEXT
    this.hpText = this.add.text(285, 155, "HP: " + hp + "/" + fullhp, {fontFamily: "AGoblinAppears", fontSize: "16px"}).setScale(.33).setDepth(999).setScrollFactor(0);
    this.daggerText = this.add.text(490,155, "Daggers: " + daggers2, {fontFamily: "AgoblinAppears", fontSize: "16px"}).setScale(.33).setDepth(999).setScrollFactor(0);
		const map = this.make.tilemap({key: "level2", tileWidth: 16, tileHeight:16});
    const tileset = map.addTilesetImage("tile", "tile");
    const coffinTile = map.addTilesetImage("coffin", "coffin");
    const doorTile = map.addTilesetImage("door", "door");
		const ghostTile = map.addTilesetImage("ghost", "ghost");
    const toplayer = map.createLayer("toplayer", tileset);
    const coffinlayer = map.createLayer("coffinlayer", coffinTile);
    coffinlayer.y = coffinlayer.y - 16;
		const door2Tile = map.addTilesetImage("door2", "door2Locked");
		const doorlayer = map.createLayer("doorlayer", door2Tile);
		doorlayer.y = doorlayer.y - 18;
    const insidebglayer = map.createLayer("insidebglayer", tileset);
		insidebglayer.setDepth(-99);
		insidebglayer.setScrollFactor(.1);
		insidebglayer.alpha = .4;
		const chestlayer = map.createLayer("chestlayer", tileset);
		const ghostlayer = map.createLayer("ghostlayer", ghostTile);
		const keylayer = map.createLayer("keylayer", tileset);
		const skeletonBorderLayer = map.createLayer("skeletonBorderLayer", tileset);
		skeletonBorderLayer.setCollisionByExclusion([-1]);
		skeletonBorderLayer.setVisible(false);
		toplayer.setCollisionByExclusion([-1]);
    coffinlayer.setCollisionByExclusion([-1]);
		doorlayer.setCollisionByExclusion([-1]);
		chestlayer.setCollisionByExclusion([-1]);
		ghostlayer.setCollisionByExclusion([-1]);
		keylayer.setCollisionByExclusion([-1]);
    toplayer.setDepth(-1);
		//MAIN COLLIDER, MUSIC AND CAMERA
    this.physics.add.collider(toplayer, knight);
    this.cameras.main.startFollow(knight);
    this.cameras.main.setZoom(3);
    this.sound.play("theme_2",{loop: true, volume:.2});

		this.physics.add.collider(knight, doorlayer, (k,d) => {
			if (keyReached == true){
				let doorSprite = this.physics.add.sprite(d.x * 16 + 16, d.y * 16, "hitbox");
				doorSprite.body.allowGravity = false;
				doorSprite.body.immovable = true;
				doorSprite.setVisible(false);
				
				this.physics.add.overlap(knight, doorSprite, (p, d) => {
					finish2 = true;
					let text = this.add.text(d.x - 48, d.y + 24, "Press down to enter.", {fontFamily: "AGoblinAppears", fontSize:"16px"}).setScale(.33);
				},null,this);
				
				d.x = 0;
				d.y = 0;
			}
			else{
				if (k.flipX == true){
				  k.x = k.x - 10
				}
				else {
					k.x = k.x + 10
				}
			}
		},null,this);

		//KEY COLLIDER
		this.physics.add.collider(knight, keylayer, (p, k) => {
			let keySprite = this.physics.add.sprite(k.x * 16 + -32, k.y * 16, "key");
			keySprite.body.allowGravity = false;
			keySprite.body.immovable = true;
			this.physics.add.overlap(knight, keySprite, (p,k) => {
				this.keyUp.paused = true;
				this.keyDown.paused = true;
				this.pauseKey.paused = true;
				keyReached = true;
				k.setActive(false);
			  k.setVelocity(0);
				k.setVisible(false);
				//this.time.addEvent({delay: 15000, callback: () => {keySprite.destroy()}})
			},null,this)	
			keySprite.play("keyAnims");
			keySprite.setVelocityX(-23);
			k.x = 0; k.setVisible(false);
			
			this.pauseKey = this.time.addEvent({
				delay: 13000,
				callback: () => {keySprite.setVelocityX(0)}
			});
			
			this.keyUp = this.time.addEvent({delay: 250, callback:()=>{
				keySprite.setVelocityY(-8);
				
				this.time.addEvent({delay: 400,callback:()=>{
						this.keyUp.paused = true;
					}	
				});

				this.time.addEvent({delay: 400,callback:()=>{
						this.keyDown.paused = false;
					}	
				});
			},loop: true, paused: false});
			
			this.keyDown = this.time.addEvent({delay: 100, callback:()=>{
				keySprite.setVelocityY(5);
				
				this.time.addEvent({delay: 400,callback:()=>{
					this.keyDown.paused = true;
				}})
				
				this.time.addEvent({delay: 400,callback:()=>{
					this.keyUp.paused = false;
				}});
			},loop: true, paused: true});	
		},null,this);
		//GHOST COLLIDER
		this.physics.add.collider(knight, ghostlayer, (p, g) => {
			this.sound.play("ghostEffect", {volume:".2"});
			let ghostSprite = this.physics.add.sprite(g.x * 16, g.y * 16);
			ghostSprite.body.allowGravity = false;
			ghostSprite.body. immovable = true;
			ghostSprite.play("ghostAnims");
			ghostSprite.setVelocityX(60);
			ghostSprite.body.setSize(20,20,true);
			let direction = this.time.addEvent({delay: 3000, callback:()=>{ghostSprite.flipX = false; ghostSprite.setVelocityX(-60); directionChange.paused = false; direction.paused = true}, loop: true});
			let directionChange = this.time.addEvent({delay: 3000, callback:()=>{ghostSprite.flipX = true; ghostSprite.setVelocityX(60); directionChange.paused = true; direction.paused = false}, loop: true, paused: true});
			g.x = 0;
			g.setVisible(false);
			this.physics.add.collider(knight, ghostSprite, (p, g) => {
				this.onAir.paused = false;
				p.setVelocityY(-60);
				if (g.flipX == true){
					p.setVelocityX(90);
				}
				else{
					p.setVelocityX(-90)
				}
			}, null, this);
		},null, this);

		//CHEST COLLIDER
		this.physics.add.collider(knight, chestlayer, (p, c) => {
			let chestAnimsSprite = this.add.sprite(c.x * 16 + 8, c.y * 16 + 8,"hitbox");
			chestAnimsSprite.play("chestAnims");
			let randomNum = Math.floor(Math.random() * 3);
			if (randomNum == 1){
				let food = this.physics.add.sprite(chestAnimsSprite.x, chestAnimsSprite.y, "food");
				food.body.allowGravity = false;
				food.body.immovable = true;
				this.sound.play("pizzaEffect");
				this.physics.add.overlap(knight, food, (p, f) => {
				f.destroy(); 
				hp=fullhp;
				this.hpText.destroy();
				this.hpText = this.add.text(285, 155, "HP: " + hp + "/" + fullhp, {fontFamily: "AGoblinAppears", fontSize: "16px"}).setScale(.33).setDepth(999).setScrollFactor(0);
				},null, this);
			}
			else if(randomNum == 2){
				let armor = this.physics.add.sprite(chestAnimsSprite.x, chestAnimsSprite.y, "armor");
				armor.body.allowGravity = false;
				armor.body.immovable = true;
				this.sound.play("armorEffect")
				this.physics.add.overlap(knight, armor, (p, ç) => {
				fullhp = fullhp + .25; 
				ç.destroy();
				this.hpText.destroy();
				this.hpText = this.add.text(285, 155, "HP: " + hp + "/" + fullhp, {fontFamily: "AGoblinAppears", fontSize: "16px"}).setScale(.33).setDepth(999).setScrollFactor(0);
				},null, this);
			}
			else {
				let subWeapon = this.physics.add.sprite(chestAnimsSprite.x, chestAnimsSprite.y, "dagger");
				subWeapon.body.allowGravity = false;
				subWeapon.body.immovable = true;
				this.sound.play("daggerEffect");
				this.physics.add.overlap(knight, subWeapon, (p, d) => {d.destroy(); daggers2 = daggers2 + 1; this.daggerText.destroy(); this.daggerText = this.add.text(490,155, "Daggers: " + daggers2, {fontFamily: "AgoblinAppears", fontSize: "16px"}).setScale(.33).setDepth(999).setScrollFactor(0)},null, this);
			};
			c.setVisible(false);
			c.x = 0;
			c.y = 0;
		}, null, this);

		//COFFIN COLLIDER
		this.physics.add.collider(knight, coffinlayer, (p, r) => {
      this.sound.play("bone", {volume:.4});
      let coffinAnims = this.add.sprite(r.x * 16 + 16, r.y * 16, "coffin");
      coffinAnims.play("coffinAnims")
      let skeleton = this.physics.add.sprite(r.x * 16, r.y * 16,"skeleton");
      this.physics.add.collider(toplayer, skeleton);
			this.physics.add.collider(skeletonBorderLayer, skeleton);
      skeleton.body.setSize(knight.width/2,knight.height,true);
			skeleton.body.setOffset(2,0);
			skeleton.play("skeletonWalk"); 
      this.time.addEvent({delay: 50, callback: ()=>{if (knight.x - skeleton.x < 0){skeleton.flipX = false} else {skeleton.flipX = true;}}, loop: true});
      let chaseing = this.time.addEvent({
        delay: 666,
        callback: ()=>{
          if (Math.abs(skeleton.x - knight.x)>70){
            throwBone.paused = true;
            skeleton.play("skeletonWalk");
            if (skeleton.flipX == true){
              skeleton.setVelocityX(20)
            }
            else {
              skeleton.setVelocityX(-20)
            }
          };

          if (Math.abs(50 <= Math.abs(skeleton.x - knight.x)&& Math.abs(skeleton.x - knight.x) <=70)){
            skeleton.setVelocityX(0);
            throwBone.paused = false
          };

          if (Math.abs(skeleton.x - knight.x)<50){
            throwBone.paused = true;
            skeleton.play("skeletonWalk");
            if (skeleton.flipX == true){
              skeleton.setVelocityX(-20);
            }
            else {
              skeleton.setVelocityX(20);
            };
          };
        },
          loop: true,
          paused: false
      });
      
      let throwBone = this.time.addEvent({
        delay: 1500,
        callback: ()=>{
          this.sound.play("bone", {volume:.4});
          skeleton.play("skeletonThrow");
          let bone = this.physics.add.sprite(skeleton.x, skeleton.y, "bone");
          bone.play("throwBone");
          bone.setVelocityY(-120);
          if (skeleton.flipX == true){
            bone.setVelocityX(60);
          }
          else {
            bone.setVelocityX(-60);
          };
          this.physics.add.collider(bone, knight, (b, p) => {
						this.hitEffect.paused = false;
            let brokenBone = this.physics.add.sprite(bone.x, bone.y + 8, "bone");
            brokenBone.play("boneShatter");
            this.physics.add.collider(knight, brokenBone, (p, b) => {
              brokenBone.setVelocityY(-120);
              if (skeleton.flipX == true){
                brokenBone.setVelocityX(30);
              }
              else {
                brokenBone.setVelocityX(-30)
              };
            }, null, this);
            this.time.addEvent({
              delay: 1000,
              callback: ()=>{
                brokenBone.destroy()
              },
              loop: false
            });
            bone.destroy()
            hp = hp-2;
            this.hpText.destroy();
            this.hpText = this.add.text(285, 155, "hp: " + hp + "/" + fullhp, {fontFamily: "AGoblinAppears", fontSize: "16px"}).setScale(.33).setDepth(999).setScrollFactor(0);
            if (hp <= 0){this.sound.stopAll(); fullhp = stablehp; hp = fullhp; daggers2 = 0; rolling2 = false; this.scene.start(window.localStorage.getItem("level"))};
          }, null, this);
          this.time.addEvent({
            delay: 1499,
            callback: ()=>{
              bone.destroy();
            }
          });
        },
        loop: true,
        paused: true
      });
			this.hitEffect = this.time.addEvent({
				delay: 275,
				callback: () => {
					this.sound.play("hitEffect",{volume:".4"});
					this.hitEffectPause.paused = false
				},
				loop: true,
				paused: true
			});
			this.hitEffectPause = this.time.addEvent({
				delay: 250,
				callback: () => {
					this.hitEffect.paused = true;
					this.hitEffectPause.paused = true;
				},
				loop: true,
				paused: true,
			});
      this.killedBySword = this.time.addEvent({
        delay: 50,
        callback: () => {
          if (isStriking == true && Math.abs(knight.x - skeleton.x)<35){
            if(knight.flipX == skeleton.flipX){
							this.hitEffect.paused = false;
							this.time.addEvent({delay: 200, callback: () => {this.anims.pauseAll()}, loop: false});
							this.time.addEvent({delay: 500, callback: () => {this.anims.resumeAll()}, loop: false});
              chaseing.paused = true;
              throwBone.paused = true;
              this.time.addEvent({delay: 200, callback: () => {skeleton.destroy()}, loop: false});
							this.killedBySword.paused = true
						}
          }
        },
        loop: true,
				paused: false
      });

			this.killedByDagger = this.time.addEvent({
				delay: 50,
				callback: () => {
					if (daggerCollideSkeleton == true){
						chaseing.paused = true;
						throwBone.paused = true;
						skeleton.destroy();
						daggerSprite.destroy();
						this.killedByDagger.paused = true;
					}
				},
				loop: true,
				paused: false
			});

			this.physics.add.collider(skeleton, this.daggerSprite, (s,d) => {s.destroy(); d.x = 0; d.y = 0; d.setVelocity(0); d.setVisible(false); chaseing.paused = true; throwBone.paused = true},null, this)
      r.setVisible(false);
      r.x = 0;
    }, null, this);
		//OTHER TIME EVENTS
		//FALL RESTART
    this.time.addEvent({
      delay: 500,
      callback: ()=>{if (knight.y>750){this.sound.stopAll(); fullhp = stablehp; hp = fullhp; daggers2 = 0; rolling2 = false; this.scene.start(window.localStorage.getItem("level"))}},
      loop: true,
    });
		//CONTROLS
    this.move = this.time.addEvent({
      delay: 150,
      callback: ()=>{
        if (knight.flipX == true){
          knight.x = knight.x-6;
          knight.setVelocityX(-.1)
        }
        else {
          knight.x = knight.x +6;
          knight.setVelocityX(.1);
        };
      },
        loop: true,
        paused: true
    });
    this.moveAnimsFix = this.time.addEvent({
      delay: 666.666,
      callback: ()=>{
        if (this.move.paused == false){
          knight.play("walk")
        }
      },
      loop: true
    });
    this.onAir = this.time.addEvent({
      delay: 250,
      callback: ()=>{
        if(knight.body.onFloor() && crouching != true){
					knight.setVelocity(0);
          knight.play("idle");
          this.onAir.paused = true;
        }
      },
      loop: true,
      paused: true
    });
    this.roll = this.time.addEvent({
      delay: 75,
      callback: ()=>{
        if (knight.flipX == false){
          knight.x = knight.x+6;
          knight.setVelocityX(+.1)
        }
        else {
          knight.x = knight.x -6;
          knight.setVelocityX(-.1)
        };
      },
      loop: true,
      paused: true
    });
	};

	//GAMEPAD 2 (FUNCTIONS)
  setListeners(){
    this.emitter.on("UP", this.jump.bind(this));
    this.emitter.on("DOWN", this.down.bind(this));
		this.emitter.on("DOWN_RELEASE", this.downRelease.bind(this));
    this.emitter.on("RIGHT", this.walkRight.bind(this));
    this.emitter.on("LEFT", this.walkLeft.bind(this));
		this.emitter.on("UPRIGHT", this.jumpRight.bind(this));
		this.emitter.on("UPRIGHT_RELEASE", this.walkStop.bind(this));
		this.emitter.on("UPLEFT", this.jumpLeft.bind(this));
		this.emitter.on("UPLEFT_RELEASE", this.walkStop.bind(this));
		this.emitter.on("X_RELEASE", this.walkStop.bind(this));
    this.emitter.on("ATTACK", this.attack.bind(this));
    this.emitter.on("ROLL", this.dodgeRoll.bind(this));
		this.emitter.on("DAGGER", this.daggerThrow.bind(this));
	};
 
  jump(){
    if(knight.body.onFloor()){
      knight.play("jump");
      knight.setVelocityY(-100);
      this.onAir.paused = false;
    }
  };
  jumpRight(){
    if(knight.body.onFloor()){
			knight.flipX = false;
      knight.play("jump");
      knight.setVelocityY(-100);
			knight.setVelocityX(30);
      this.onAir.paused = false;
    }
  };
	jumpLeft(){
    if(knight.body.onFloor()){
			knight.flipX = true;
      knight.play("jump");
      knight.setVelocityY(-100);
			knight.setVelocityX(-30);
      this.onAir.paused = false;
    }
  };
	down(){
		this.offsetset.paused = true;
		crouching = true;
		knight.play("crouch");
		knight.body.setSize(knight.width/1.25,knight.height/1.5,true);
		knight.body.setOffset(0,10);
		if (knight.body.onFloor() == false && knight.body.onWall == true){
			knight.y = knight.y - 8;
		};
		if (finish2 == true){
			finish2 = false;
			localStorage.setItem("daggers", daggers2);
			localStorage.setItem("hp", fullhp);
			localStorage.setItem("level", "level3");
			this.sound.stopAll();
			this.scene.start("level3")
		}
  };
	downRelease(){
		knight.play("idle");
		knight.body.setSize(knight.width/1.5,knight.height,false);
		knight.body.setOffset(0,0);
		this.offsetset.paused = false;	
	};
  walkRight(){
    if (isStriking !== true){
      this.move.paused = false;
      knight.play("walk");
      knight.flipX = false
    }
  };
  walkLeft(){
    if (isStriking !== true){
      this.move.paused = false;
      knight.play("walk");
      knight.flipX = true
    }
  };
  walkStop(){
    this.move.paused = true;
    knight.setVelocityX(0);
    knight.play("idle")
  };

  attack(){
		this.sound.play("swordSwing");
    knight.play("strike");
		this.offsetset.paused = true;
		knight.body.width = 32;
		if (knight.flipX == true){
			knight.body.setOffset(-2,0)
		}
    this.time.addEvent({
      delay:751,
      callback: ()=> {
        knight.play("idle")
      }
    });
    this.time.addEvent({
      delay: 200,
      callback: ()=>{
        isStriking = true
      },
      loop: false
    });
    this.time.addEvent({
      delay: 700,
      callback: () =>{
        isStriking = false
				this.offsetset.paused = false;
				knight.body.width=18;
      },
      loop: false
    });
  };

  dodgeRoll(){
		if (rolling2 == false) {
			rolling2 = true;
			knight.play("roll");
			this.roll.paused=false;
			knight.setVelocityY(-30);
			this.time.addEvent({
				delay: 751,
				callback: ()=>{
					this.roll.paused = true;
					knight.play("idle");
					rolling2 = false;
				},
			});
	  }
  };
	
	daggerThrow(){
		if(daggers2>0 && daggerThrown != true){
		daggerThrown = true;
		knight.play("daggerThrow");
		daggers2 = daggers2 - 1;
		this.daggerText.destroy();
		this.daggerText = this.add.text(490,155, "Daggers: " + daggers2, {fontFamily: "AgoblinAppears", fontSize: "16px"}).setScale(.33).setDepth(999).setScrollFactor(0);
	  this.time.addEvent({
			delay: 1100,
			callback: () => {
				this.daggerSprite.setVisible(true);
				this.daggerSprite.setDepth(9999);
				this.daggerSprite.x = knight.x;
				this.daggerSprite.y = knight.y;
				if (knight.flipX == true){
					this.daggerSprite.setVelocityX(-150)
					this.daggerSprite.flipX = true;
				}
				else{
					this.daggerSprite.setVelocityX(150)
				};
			},
			loop: false
		});
		this.time.addEvent({
			delay: 1150,
			callback: () => {
				knight.play("idle");
				daggerThrown = false;
			},
			loop: false
		})
	}
	}
}
