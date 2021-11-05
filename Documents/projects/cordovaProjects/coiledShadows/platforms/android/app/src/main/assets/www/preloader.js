var firstLaunch = localStorage.getItem("first");
class preloader extends Phaser.Scene {
  constructor() {
    super("boot");
  }
  preload() {
    this.loading = this.add.text(340,175,"Loading...", {fontFamily: "AGoblinAppears", fontSize: "16px"}).setDepth(999);
    this.load.atlas("knight", "/assets/img/knight.png", "/assets/json/knight.json");
    this.load.image("cross", "assets/controller/cross.png");
    this.load.image("hidden", "assets/controller/hidden.png");
    this.load.image("swordico", "assets/controller/swordico.png");
    this.load.image("rollico", "assets/controller/rollico.png");
    this.load.tilemapTiledJSON("cutscene1", "assets/json/cutscene1.json");
    this.load.tilemapTiledJSON("level8", "assets/json/level8.json");
    this.load.tilemapTiledJSON("level7", "assets/json/level7.json");
    this.load.tilemapTiledJSON("level6", "assets/json/level6.json");
    this.load.tilemapTiledJSON("level5", "assets/json/level5.json");
    this.load.tilemapTiledJSON("level4", "assets/json/level4.json");
    this.load.tilemapTiledJSON("level3", "assets/json/level3.json");
    this.load.tilemapTiledJSON("level2", "assets/json/level2.json");
    this.load.tilemapTiledJSON("level1", "assets/json/level1.json");
    this.load.tilemapTiledJSON("prologue", "assets/json/prologue.json");
    this.load.image("tile", "assets/img/tile.png");
    this.load.image("coffin", "assets/img/coffinsingle.png");
    this.load.atlas("coffinAnims", "assets/img/coffin.png", "assets/json/coffin.json");
    this.load.image("door", "assets/img/door.png");
		this.load.image("door2Locked", "assets/img/doorLocked.png");
		this.load.image("door2Unlocked", "assets/img/doorUnlocked");
    this.load.atlas("skeleton", "assets/img/skeleton.png", "assets/json/skeleton.json");
    this.load.atlas("bone", "assets/img/bone.png", "assets/json/bone.json");
    this.load.image("hitbox", "assets/img/hitbox.png");
    this.load.image("bg1", "assets/img/bgtooga1.png");
    this.load.image("bg2", "assets/img/bgtooga2.png");
    this.load.image("bg3", "assets/img/bgtooga3.png");
    this.load.image("bg4", "assets/img/bgtooga4.png");
    this.load.image("bg5", "assets/img/bgtooga5.png");
    this.load.atlas("boneShatter", "assets/img/boneShatter.png", "assets/json/boneShatter.json");
    this.load.audio("theme_1", "assets/sound/theme_1.mp3");
    this.load.audio("theme_2", "assets/sound/theme_2.mp3");
    this.load.audio("theme_3", "assets/sound/theme_3.mp3");
    this.load.audio("bone", "assets/sound/bones-2.mp3");
    this.load.audio("shrine", "assets/sound/shrine.mp3");
    this.load.audio("theme2", "assets/sound/Detective.mp3");
    this.load.audio("theme3", "assets/sound/catchyswing.mp3");
    this.load.audio("prologueTheme", "assets/sound/Evil-02.mp3");
    this.load.atlas("smoke", "assets/img/smokeEdgeSingle.png", "assets/json/smokeEdgeSingle.json");
    this.load.image("smokeBody", "assets/img/smokebody.png");
    this.load.image("town", "assets/img/chaffton1.png");
    this.load.image("castle", "assets/img/castles.png");
    this.load.atlas("castleAnims", "assets/img/castleAnims.png", "assets/json/castleAnims.json");
		this.load.atlas("windowAnims", "assets/img/window.png", "assets/json/window.json");
		this.load.atlas("necromancer", "assets/img/necromancer.png", "assets/json/necromancer.json");
		this.load.atlas("normalSmoke", "assets/img/normalSmoke.png", "assets/json/normalSmoke.json");
		this.load.atlas("smokePrologueAnims", "assets/img/smokePrologue.png", "assets/json/smokePrologue.json");
		this.load.audio("whoosh", "assets/sound/whoosh1.mp3");
		this.load.audio("explosion", "assets/sound/DeathFlash.mp3");
		this.load.audio("crowdPanic", "assets/sound/crowd-panic-sound-effect-mp3cutn.mp3");
		this.load.audio("hitEffect", "assets/sound/hit01.mp3");
		this.load.spritesheet("tileset", "assets/img/tile.png", {frameWidth: 16, frameHeight: 16});
		this.load.image("food", "assets/img/food.png");
		this.load.audio("pizzaEffect", "assets/sound/pizza.mp3");
		this.load.image("armor", "assets/img/armor.png");
		this.load.audio("armorEffect", "assets/sound/çay.mp3");
		this.load.image("dagger", "assets/img/dagger.png");
		this.load.audio("daggerEffect", "assets/sound/dagger.mp3");
		this.load.audio("swordSwing", "assets/sound/hitEffect.mp3");
		this.load.atlas("ghost", "assets/img/ghost.png", "assets/json/ghost.json");
		this.load.audio("ghostEffect", "assets/sound/ghost.mp3");
		this.load.atlas("key", "assets/img/key.png", "assets/json/key.json");
		this.load.image("daggerico", "assets/controller/daggerico.png");
		this.load.image("platform", "assets/img/platform.png");
		this.load.atlas("dragon", "assets/img/dragon.png", "assets/json/dragon.json");
		this.load.atlas("dragonBlast", "assets/img/dragonBlast.png", "assets/json/dragonBlast.json")
		this.load.audio("dragonFlap", "assets/sound/dragonFlap.mp3");
		this.load.audio("dragonBreath", "assets/sound/dragonBreath.mp3");
		this.load.audio("dragonFire", "assets/sound/dragonFire.mp3");
		this.load.audio("walk", "assets/sound/walking.mp3")
		this.load.atlas("bat", "assets/img/bat.png", "assets/json/bat.json");
		this.load.atlas("leopard", "assets/img/leopard.png", "assets/json/leopard.json");
	}

  create() {
		//localStorage.clear();
		if(firstLaunch != "false"){
			localStorage.clear();
			localStorage.setItem("first", "false");
		}
		/android:screenOrientation="landscape"/
    //animations
		this.anims.create({
			key: "chestAnims",
			frameRate: 1,
			frames: this.anims.generateFrameNumbers("tileset", {start: 3, end: 3}),
			repeat: 0
		});
    this.anims.create({
      key:"idle",
      frames: [{key:"knight",frame:"1"},{key:"knight",frame:"idle2"}],
      frameRate:1,
      repeat:-1
    });

    this.anims.create({
      key:"roll",
      frames: [{key:"knight",frame:"1"},{key:"knight",frame:"roll2"},{key:"knight",frame:"roll3"},{key:"knight",frame:"roll4"},{key:"knight",frame:"roll5"},{key:"knight",frame:"roll6"}],
      frameRate:8,
      repeat: -1
    });

    this.anims.create({
      key: 'strike',
      frames: [{key:'knight',frame:"1"},{key:'knight',frame:"strike2"},{key:'knight',frame:"strike3"},{key:'knight',frame:"strike4"},{key:'knight',frame:"strike5"},{key:'knight',frame:"strike6"}],
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "walk",
      frames: [{key:"knight",frame:"walk2"},{key:"knight",frame:"walk3"},{key:"knight",frame:"walk4"},{key:"knight", frame:"walk3"}],
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: "jump",
      frames: [{key:"knight", frame:"walk3"}],
      frameRate: 1,
      repeat: -1
    });
		this.anims.create({
			key:"crouch",
			frames: [{key:"knight",frame:"crouch"}],
			frameRate: 1,
			repeat: -1
		});
		this.anims.create({
			key: "daggerThrow",
			frames: [{key:"knight",frame:"daggerThrow1"},{key:"knight",frame:"daggerThrow2"},{key:"knight",frame:"daggerThrow3"}],
			frameRate: 2,
			repeat: 0
		});
    this.anims.create({
      key: "coffinAnims",
      frames: [{key:"coffinAnims", frame:"0"},{key:"coffinAnims", frame:"1"}],
      frameRate: 60,
      repeat: 0 
    });
    this.anims.create({
      key:"skeletonWalk",
      frames: [{key:"skeleton", frame:"1"}, {key:"skeleton", frame:"walk2"}],
      frameRate: 3,
      repeat:-1
    });
    this.anims.create({
      key:"skeletonThrow",
      frames: [{key:"skeleton", frame:"1"},{key:"skeleton", frame:"throw2"}],
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key:"throwBone",
      frames: [{key:"bone", frame:"1"},{key:"bone", frame:"2"},{key:"bone", frame:"3"}],
      frameRate: 9,
      repeat: -1
    });
    this.anims.create({
      key:"boneShatter",
      frames: [{key:"boneShatter", frame:"1"},{key:"boneShatter", frame:"2"},{key:"boneShatter", frame:"3"}],
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key:"smokeAnims",
      frames: [{key:"smoke", frame:"1"},{key:"smoke", frame:"2"},{key:"smoke", frame:"3"},{key:"smoke", frame:"4"},{key:"smoke", frame:"5"}],
      frameRate: 2.5,
      repeat: -1
    });
		this.anims.create({
			key:"windowAnims",
			frames: [{key:"windowAnims", frame:"1"},{key:"windowAnims", frame:"2"},{key:"windowAnims", frame:"3"},{key:"windowAnims", frame:"4"},{key:"windowAnims", frame:"5"},{key:"windowAnims", frame:"6"},{key:"windowAnims", frame:"7"}],
			frameRate: 3,
			repeat: -1
		});
		this.anims.create({
			key: "necromancerIdle",
			frames: [{key:"necromancer", frame:"idle1"},{key:"necromancer", frame:"idle2"},{key:"necromancer", frame:"idle3"},{key:"necromancer", frame:"idle4"},{key:"necromancer", frame:"idle5"},{key:"necromancer", frame:"idle6"},{key:"necromancer", frame:"idle7"},{key:"necromancer", frame:"idle8"},{key:"necromancer", frame:"idle9"},{key:"necromancer", frame:"idle10"}],
			frameRate: 3,
			repeat: -1
		});
    this.anims.create({
			key: "necromancerWalk",
			frames: [{key:"necromancer", frame:"walk1"},{key:"necromancer", frame:"walk2"},{key:"necromancer", frame:"walk3"},{key:"necromancer", frame:"walk4"},{key:"necromancer", frame:"walk5"},{key:"necromancer", frame:"walk6"},{key:"necromancer", frame:"walk7"},{key:"necromancer", frame:"walk8"},{key:"necromancer", frame:"walk9"},{key:"necromancer", frame:"walk10"}],
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: "normalSmokeAnims",
			frames: [{key: "normalSmoke", frame:"1"},{key: "normalSmoke", frame:"2"},{key: "normalSmoke", frame:"3"},{key: "normalSmoke", frame:"4"},{key: "normalSmoke", frame:"5"},{key: "normalSmoke", frame:"6"},{key: "normalSmoke", frame:"7"},{key: "normalSmoke", frame:"8"}],
			frameRate: 2,
			repeat: -1
		});
		this.anims.create({
			key: "castleAnims",
			frames: [{key:"castleAnims", frame:"1"},{key:"castleAnims", frame:"2"},{key:"castleAnims", frame:"3"},{key:"castleAnims", frame:"4"}],
			frameRate: 1,
			repeat: 0
		});
		this.anims.create({
			key: "smokePrologueAnims",
			frames: [{key: "smokePrologueAnims", frame:"1"}, {key: "smokePrologueAnims", frame:"2"}, {key: "smokePrologueAnims", frame:"3"}, {key: "smokePrologueAnims", frame:"4"}, {key: "smokePrologueAnims", frame:"5"}, {key: "smokePrologueAnims", frame:"6"}, {key: "smokePrologueAnims", frame:"7"}, {key: "smokePrologueAnims", frame:"8"}, {key: "smokePrologueAnims", frame:"9"}, {key: "smokePrologueAnims", frame:"10"}, {key: "smokePrologueAnims", frame:"11"}, {key: "smokePrologueAnims", frame:"12"}, {key: "smokePrologueAnims", frame:"13"}, {key: "smokePrologueAnims", frame:"7"}, {key: "smokePrologueAnims", frame:"8"}, {key: "smokePrologueAnims", frame:"9"}, {key: "smokePrologueAnims", frame:"10"}, {key: "smokePrologueAnims", frame:"11"}, {key: "smokePrologueAnims", frame:"12"}, {key: "smokePrologueAnims", frame:"13"}, {key: "smokePrologueAnims", frame:"14"}, {key: "smokePrologueAnims", frame:"15"}, {key: "smokePrologueAnims", frame:"16"}, {key: "smokePrologueAnims", frame:"17"}],
			frameRate: 2,
			repeat: 0
		});
		this.anims.create({
			key: "ghostAnims",
			frames: [{key: "ghost", frame:"1"},{key: "ghost", frame:"2"}],
			frameRate: 2,
			repeat: -1
		});
		this.anims.create({
			key: "keyAnims",
			frames: [{key: "key", frame:"1"},{key: "key", frame:"2"},{key: "key", frame:"3"},{key: "key", frame:"4"},{key: "key", frame:"5"}],
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: "dragonIdle",
			frames: [{key: "dragon", frame:"fly33"},{key: "dragon", frame:"idle2"}],
			frameRate: 2,
			repeat: -1
		});
		this.anims.create({
			key: "dragonFly",
			frames: [{key: "dragon", frame:"fly1"},{key: "dragon", frame:"fly2"},{key: "dragon", frame:"fly33"},{key: "dragon", frame:"fly2"}],
			frameRate: 4,
			repeat: -1
		});
		this.anims.create({
			key: "dragonThirdPhaseAnims",
			frames: [{key: "dragon", frame: "thirdPhaseAnims1"},{key: "dragon", frame: "thirdPhaseAnims2"},{key: "dragon", frame: "thirdPhaseAnims3"}],
			frameRate: 4,
			repeat: -1
		});
		this.anims.create({
			key: "dragonBlast",
			frames: [{key: "dragonBlast", frame:"1"}, {key:"dragonBlast", frame:"2"}],
			frameRate: 2,
			repeat: -1
		});
		this.anims.create({
			key: "batFly",
			frames: [{key: "bat", frame:"1"},{key: "bat", frame:"2"},{key: "bat", frame:"3"},{key: "bat", frame:"2"}],
			frameRate: 8,
			repeat: -1
		});
		this.anims.create({
			key: "leopardRun",
			frames: [{key: "leopard", frame: "1"},{key:"leopard", frame: "2"},{key:"leopard", frame:"3"}],
			frameRate: 6,
			repeat: -1
		});
		if(window.localStorage.getItem("level") == undefined){
			this.scene.start("prologue");
		}
		else{
			this.scene.start(window.localStorage.getItem("level"))
			};
  }
}
