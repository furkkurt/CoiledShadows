var hp;
var fullhp;
var stablehp;
var daggers;
class prologue extends Phaser.Scene { constructor() {
    super("prologue");
  }

  create(){
		fullhp = 10;
		hp = fullhp;
		stablehp = fullhp;
		daggers = 0;
		/android:screenOrientation="landscape"/
		this.cameraman = this.physics.add.sprite(325,268,"knight");
		this.add.text(323, 275, "In far, wicked lands, where no plants grow,\n \n		and no life exists except for old crows\n \n				and a foolish young necromancer who's\n \n						examining the limits of his power...", {fontFamily: "AGoblinAppears", fontsize: "16px"}).setScale(.19);
		this.insideText = this.add.text(600, 100, "Things couldn't have gone worse...\n \n             He ends up summoning... something unheard of.", {fontFamily: "AGoblinAppears", fontSize: "16px"}).setScale(.25).setDepth(999);
		this.add.text(495, 225, "This cursed fog\n \n    began spreading all over the land,\n \n				swallowing everything on it's way...", {fontFamily: "AGoblinAppears", fontSize: "16px", backgroundColor: "black"}).setScale(.25).setDepth(-1);
    this.necromancer = this.physics.add.sprite(850, 112, "necromancer");
		this.necromancer.body.immovable = true;
		this.necromancer.body.allowGravity = false;
		this.necromancer.setDepth(1);
		this.necromancer.play("necromancerIdle");
		this.necromancer.flipX = true;
		this.cameraman.body.immovable = true;
    this.cameraman.body.allowGravity = false;
    this.cameraman.setVisible(false);
		this.cameraman.setScale(5.3);
    this.castle = this.physics.add.sprite(464, 168, "castleAnims");
    this.castle.body.immovable = true;
    this.castle.body.allowGravity = false;
		const map = this.make.tilemap({key: "prologue", tilewidth: 16, tileheight: 16});
    const tileset = map.addTilesetImage("tileset", "tile"); 
    const castle = map.addTilesetImage("castle", "castle");
    const bglayer = map.createLayer("bglayer", castle);
		const inbglayer = map.createLayer("inbglayer", tileset).setDepth(-3);
    const toplayer = map.createLayer("toplayer", tileset).setDepth(999);
		const windowlayer = map.createLayer("windowlayer", tileset);
	  windowlayer.setCollisionByExclusion([-1]);
		this.physics.add.collider(this.cameraman, windowlayer, (c, w) => {
			let windowAnims = this.add.sprite (w.x * 16 + 8, w.y * 16 + 8, "windowAnims");
			windowAnims.play("windowAnims");
			c.x = c.x + 16;
		}, null, this);
		this.cameras.main.setZoom(5);
    this.cameras.main.startFollow(this.cameraman);
    const town = this.add.tileSprite(0, -10, bglayer.width, bglayer.height, "town").setOrigin(0).setScale(.5).setScrollFactor(0);
		const bg4 = this.add.tileSprite(0, -60,bglayer.width,bglayer.height,"bg2").setOrigin(0).setScale(1).setScrollFactor(0);
    const bg3 = this.add.tileSprite(0, -60,bglayer.width,bglayer.height,"bg3").setOrigin(0).setScale(1).setScrollFactor(0);
    const bg2 = this.add.tileSprite(0, -60,bglayer.width,bglayer.height,"bg4").setOrigin(0).setScale(1).setScrollFactor(0);
    const bg1 = this.add.tileSprite(0, -60,bglayer.width,bglayer.height,"bg5").setOrigin(0).setScale(1).setScrollFactor(0);
    bg1.setDepth(-7);
    bg2.setDepth(-6);
    bg3.setDepth(-5);
    bg4.setDepth(-4);
		town.setDepth(-2);
		toplayer.setDepth(-3)
		town.setVisible(false);
    this.sound.play("prologueTheme");  
		
		this.cauldronSmoke = this.add.sprite(820, 90, "normalSmoke");
		this.cauldronSmoke.setDepth(1);
		this.cauldronSmoke.play("normalSmokeAnims");
		this.time.addEvent({
			delay: 4000,
			callback: () => {
				this.time.addEvent({
					delay: 500,
					callback: () => {
						this.cauldronSmoke.y = this.cauldronSmoke.y - .25;
					},
					loop: true,
					paused: false
				});
				this.time.addEvent({
					delay: 4000,
					callback: () => {
							this.cauldronSmoke.y = 90;
					},
					loop: true,
					paused: false
				});
			},
			loop: true,
			paused: false
		});
		this.act1 = this.time.addEvent({
      delay: 25,
      callback: () => {
				this.cameraman.setVelocityX(5);
				bg1.x = bg1.x - .005;
				bg2.x = bg2.x - .01;
				bg3.x = bg3.x - .02;
				bg4.x = bg4.x - .04;
      },
      loop: true,
      paused: false
    });
    this.act2 = this.time.addEvent({
      delay: 15000,
      callback: () => {
				this.act1.paused = true;
				this.cameraman.setVelocityX(0);
				this.cameraman.setVelocityY(-6);
      },
      loop: false,
      paused: false
    });
    this.act3 = this.time.addEvent({
      delay: 30000,
      callback: () => {
				this.act2.paused = true;
				this.cameraman.setVelocity(0);
      },
      loop: false,
      paused: false
    });
    this.act4 = this.time.addEvent({
      delay: 32000,
      callback: () => {
				this.act3.paused = true;
				this.cameraman.x = 600;
				this.cameraman.y = 100;
				this.act1.paused = false;
				
			},
    });
		this.act5 = this.time.addEvent({
			delay: 73500,
			callback: () => {
				this.insideText.destroy();
				this.act1.paused = true;
				this.act4.paused = true;
				this.cameraman.setVelocity(0);
			},
			loop: false,
			paused: false
		});
		this.act6 = this.time.addEvent({
			delay: 75000,
			callback: () => {
				this.sound.play("explosion");
				this.cauldronSmoke.setScale(3);
				this.time.addEvent({
					delay: 50,
					callback: () => {
						this.actshake1 = this.time.addEvent({
							delay: 200,
							callback: () => {
								this.cameraman.y = this.cameraman.y + 5;
							},
							loop: true,
							paused: false
						});
					},
					loop: false,
					paused: false
				});
				this.actshake2 = this.time.addEvent({
					delay: 200,
					callback: () => {
						this.cameraman.y = this.cameraman.y - 5;
					},
					loop: true,
					paused: false
				});
				this.time.addEvent({
					delay: 1000,
					callback: () => {
					  this.necromancer.flipX = false;
						this.necromancer.play("necromancerWalk");
						this.necromancer.setVelocityX(20);
					},
					loop: false,
					paused: false
				});
				this.time.addEvent({
					delay: 6000,
					callback: () => {
						this.actshake1.paused = true;
						this.actshake2.paused = true;
						this.necromancer.destroy()
					},
					loop: false,
					paused: false	
				});
			},
			loop: false,
			paused: false
		});
		this.act7 = this.time.addEvent({
			delay: 81000,
			callback: () => {
				this.sound.play("explosion");
				this.act6.paused = true;
				this.act3.paused = false;
				this.cameraman.x = 415;
			  this.cameraman.y = 140;
				this.castle.play("castleAnims");
					this.time.addEvent({
						delay: 5000,
						callback: () => {
							this.sound.play("whoosh", {volume: 0.5});
							this.smokePrologue = this.physics.add.sprite(465,130,"normalSmoke");
							this.smokePrologue.body.allowGravity = false;
							this.smokePrologue.body.immovable = true;
							this.smokePrologue.play("smokePrologueAnims");
							this.smokePrologue.setScale(3)
							this.time.addEvent({
								delay: 10500,
								callback: () => {
									this.sound.play("whoosh", {volume: 0.5});
									this.smokePrologue.setVelocityY(1)
								},
								loop: false,
								paused: false
							});
							this.time.addEvent({
                 delay: 11500,
                 callback: () => {
                   this.smokePrologue.destroy()
                 },
                 loop: false,
                 paused: false
               });
						},
						loop: false,
						paused: false
					});
			},
			loop: false,
			paused: false
		});
		this.act8 = this.time.addEvent({
			delay: 99000,
			callback: () => {
				this.cameraman.x = 560;
				this.cameraman.y = 268;
				town.setVisible(true);
				this.fogText = this.add.text(200, 250, "While all the kings and queens desperately\n \nhiring adventurers to stop the fog,\n \nno one is able to find\n \nthe source of it.", {fontFamily: "AGoblinAppears", fontSize: "16px"}).setScale(.225).setDepth(999);
				this.fogTextMove = this.time.addEvent({
					delay: 100,
					callback: () => {
						this.fogText.x = this.fogText.x + 1;
					},
					loop: true,
					paused: false
				});
				this.time.addEvent({delay: 4000, callback:() => {this.sound.play("crowdPanic", {volume: 0.4})}, loop: false});
				this.smokeBack = this.physics.add.sprite(292,273, "smokeBody").setScale(5).setVelocityX(10).setDepth(998);
				this.smokeBack.body.allowGravity = false; this.smokeBack.body.immovable = true;
			  this.smoke = this.physics.add.sprite(475, 270,"smokeBody").setVelocityX(10).setDepth(998); this.smoke.body.allowGravity = false; this.smoke.body.immovable = true;
		    this.smoke.play("smokeAnims");
				this.time.addEvent({
					delay: 29000,
					callback: () => {
						this.smokeBack.setVelocity(0);
						this.fogTextMove.paused = true;
					},
					loop:false
				});
			},
			loop: false,
			paused: false
		});
		this.time.addEvent({
			delay: 136000,
			callback: () => {
				localStorage.setItem("daggers", daggers);
				localStorage.setItem("hp", fullhp);
				window.localStorage.setItem("level","level1");
				this.sound.stopAll();
				this.scene.start("level1")
			},
			loop: false
		});
  }
}
