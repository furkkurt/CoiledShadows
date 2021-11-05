class cutscene1 extends Phaser.Scene {
	constructor() {
		super("cutscene1");
	}
	create(){
		this.sound.stopAll();
		this.sound.play("prologueTheme");
		const map = this.make.tilemap({key: "cutscene1", tileWidth: 16, tileHeight:16});
    const tileset = map.addTilesetImage("tile", "tile");
    const toplayer = map.createLayer("toplayer", tileset);
		toplayer.setCollisionByExclusion([-1]);
		const insidebglayer = map.createLayer("insidebglayer", tileset);
		insidebglayer.setDepth(-99);
		insidebglayer.setScrollFactor(.1);
		insidebglayer.alpha = .4;
		const outsidebglayer = map.createLayer("outsidebglayer", tileset);
		this.cameraman = this.physics.add.sprite(75 * 16, 9 * 16,"knight");
		this.cameraman.body.immovable = true;
    this.cameraman.body.allowGravity = false;
    this.cameraman.setVisible(false);
		this.cameraman.setScale(5.3);
		this.knight=this.physics.add.sprite(76 * 16, 9 * 16,"knight");
		this.knight.play("strike");
    this.knight.setCollideWorldBounds = true;
    this.knight.onWorldBounds = true;
    this.knight.body.setSize(this.knight.width/1.5,this.knight.height,true);
		this.knight.setDepth(2);
		this.dragon=this.physics.add.sprite(78 * 16, 9 * 16 - 10, "dragon");
		this.dragon.body.allowGravity = false;
		this.dragon.body.immovable = true;
		this.dragon.flipX = true;
		this.dragon.setScale(2);
		this.dragon.body.setOffset(8,0);
		this.dragon.play("dragonIdle");
		this.physics.add.collider(toplayer, this.knight);
		//this.physics.add.collider(toplayer, this.dragon);
    this.cameras.main.startFollow(this.cameraman);
    this.cameras.main.setZoom(3);	
		this.time.addEvent({
			delay: 700,
			callback: () => {this.knight.play("idle")}
		});
		this.time.addEvent({
			delay: 500,
			callback: () => {
				this.sound.play("dragonFire", {volume:2});
				this.dragon.play("dragonFly");
				this.dragon.setVelocityX(30);
				this.dragon.setVelocityY(-15);
			}
		});
		this.time.addEvent({
			delay: 2000,
			callback: ()=> {
				this.dragon.setVelocity(0);
			}
		});
		this.time.addEvent({
			delay: 3000,
			callback: ()=>{
				this.dragon.setVelocityX(-150);
				this.dragon.setVelocityY(20)
			}
		});
		this.time.addEvent({
			delay: 3250,
			callback:()=>{
				this.dragon.setVelocityY(-20);
				this.knight.body.allowGravity = false;
				this.knight.x = this.knight.x + 32;
				this.knight.setVelocityX(-150);
				this.knight.setVelocityY(-20);
				this.knight.play("walk")
			}
		});
		this.time.addEvent({
			delay: 6000,
			callback:()=>{
				const bg5 = this.add.tileSprite(0, -140,outsidebglayer.width,outsidebglayer.height,"bg1").setOrigin(0).setScale(2).setScrollFactor(0);
				const bg4 = this.add.tileSprite(0, -140,outsidebglayer.width,outsidebglayer.height,"bg2").setOrigin(0).setScale(2).setScrollFactor(0);
				const bg3 = this.add.tileSprite(0, -140,outsidebglayer.width,outsidebglayer.height,"bg3").setOrigin(0).setScale(2).setScrollFactor(0);
				const bg2 = this.add.tileSprite(0, -140,outsidebglayer.width,outsidebglayer.height,"bg4").setOrigin(0).setScale(2).setScrollFactor(0);
				const bg1 = this.add.tileSprite(0, -140,outsidebglayer.width,outsidebglayer.height,"bg5").setOrigin(0).setScale(2).setScrollFactor(0);
				bg1.setDepth(-7);
				bg2.setDepth(-6);
				bg3.setDepth(-5);
				bg4.setDepth(-4);
				bg5.setDepth(-3);
				insidebglayer.setVisible(false);
				this.cameraman.x = 13 * 16;
				this.cameraman.y = 38 * 16;
			}
		});
		this.time.addEvent({
			delay: 7000,
			callback:()=>{
				this.dragon.x = 10 * 16;
				this.dragon.y = 45 * 16;
				this.knight.x = 10 * 16;
				this.knight.y = 47 * 16;
				this.dragon.setVelocity(90,-90);
				this.dragon.flipX = true;
				this.knight.setVelocity(90,-90);
				this.knight.play("strike")
			}
		});
		this.time.addEvent({
			delay: 8500,
			callback: () => {
				this.sound.play("dragonFire", {volume:2});
				this.knight.setVelocity(0);
				this.knight.body.allowGravity = true;
				this.knight.play("idle");
			}
		});
		this.time.addEvent({
			delay: 10000,
			callback: () => {
				localStorage.setItem("level", "level5");
				this.sound.stopAll();
				this.scene.start("level5")
			}
		});
	}
}
