class GamePad extends UIBlock{
    constructor(config) {
      super();
      this.emitter=EventDispatcher.getInstance();
      this.scene=config.scene;
      //dpad
      this.cross=this.scene.add.image(55, 25, "cross");
      this.cross.setScale(.1825);
      this.add(this.cross);
      this.cross.alpha=.4;
      this.cross.setScrollFactor(0);
      this.cross.setDepth(999);

      this.btnUp=this.scene.add.image(55, -5, "hidden");
      this.btnUp.setScale(.625);
      this.btnUp.alpha=.01;
      this.btnUp.setInteractive();
      this.btnUp.on("pointerdown", this.up.bind(this));
      this.btnUp.on("pointerup", this.upRelease.bind(this));
      this.btnUp.on("pointerout", this.upRelease.bind(this));
      this.add(this.btnUp);
      this.btnUp.setScrollFactor(0);
      this.btnUp.setDepth(999);
      
      this.btnDown=this.scene.add.image(55, 55, "hidden");
      this.btnDown.setScale(.625);
      this.btnDown.alpha=.01;
      this.btnDown.setInteractive();
      this.btnDown.on("pointerdown", this.down.bind(this));
      this.btnDown.on("pointerup", this.downRelease.bind(this));
      this.btnDown.on("pointerout", this.downRelease.bind(this));
      this.add(this.btnDown);
      this.btnDown.setScrollFactor(0);
      this.btnDown.setDepth(999);
      
      this.btnRight=this.scene.add.image(85, 25, "hidden");
      this.btnRight.setScale(.625);
      this.btnRight.alpha=.01;
      this.btnRight.setInteractive();
      this.btnRight.on("pointerdown", this.right.bind(this));
      this.btnRight.on("pointerup", this.rightRelease.bind(this));
      this.btnRight.on("pointerout", this.rightRelease.bind(this));
      this.add(this.btnRight);
      this.btnRight.setScrollFactor(0);
      this.btnRight.setDepth(999);
      
      this.btnLeft=this.scene.add.image(25, 25, "hidden");
      this.btnLeft.setScale(.625);
      this.btnLeft.alpha=.01;
      this.btnLeft.setInteractive();
      this.btnLeft.on("pointerdown", this.left.bind(this));
      this.btnLeft.on("pointerup", this.leftRelease.bind(this));
      this.btnLeft.on("pointerout", this.leftRelease.bind(this));
      this.add(this.btnLeft);
      this.btnLeft.setScrollFactor(0);
      this.btnLeft.setDepth(999);
			
			this.btnUpRight=this.scene.add.image(85, -5, "hidden");
			this.btnUpRight.setScale(.625);
			this.btnUpRight.alpha=.01;
			this.btnUpRight.setInteractive();
			this.btnUpRight.on("pointerdown", this.upRight.bind(this));
			this.btnUpRight.on("pointerup", this.upRightRelease.bind(this));
      this.btnUpRight.on("pointerout", this.upRightRelease.bind(this));
			this.add(this.btnUpRight);
			this.btnUpRight.setScrollFactor(0);
      this.btnUpRight.setDepth(999);
			
			this.btnUpLeft=this.scene.add.image(25, -5, "hidden");
			this.btnUpLeft.setScale(.625);
			this.btnUpLeft.alpha=.01;
			this.btnUpLeft.setInteractive();
			this.btnUpLeft.on("pointerdown", this.upLeft.bind(this));
			this.btnUpLeft.on("pointerup", this.upLeftRelease.bind(this));
      this.btnUpLeft.on("pointerout", this.upLeftRelease.bind(this));
			this.add(this.btnUpLeft);
			this.btnUpLeft.setScrollFactor(0);
      this.btnUpLeft.setDepth(999);

      //btns
      this.btnAttack=this.scene.add.image(270, 0, "swordico");
      this.btnAttack.setScale(2.5);
      this.btnAttack.alpha=.4;
      this.btnAttack.setInteractive();
      this.btnAttack.on("pointerdown", this.attack.bind(this));
      this.btnAttack.on("pointerup", this.attackRelease.bind(this));
      this.btnAttack.on("pointerout", this.attackRelease.bind(this));
      this.add(this.btnAttack);
      this.btnAttack.setScrollFactor(0);
      this.btnAttack.setDepth(999);

      this.btnDodge=this.scene.add.image(270, 50, "rollico");
      this.btnDodge.setScale(2.5);
      this.btnDodge.alpha=.4;
      this.btnDodge.setInteractive();
      this.btnDodge.on("pointerdown", this.roll.bind(this));
      this.btnDodge.on("pointerup", this.rollRelease.bind(this));
      this.btnDodge.on("pointerout", this.rollRelease.bind(this));
      this.add(this.btnDodge);
      this.btnDodge.setScrollFactor(0);
      this.btnDodge.setDepth(999);
  
			this.btnDagger=this.scene.add.image(280, -64, "daggerico");
			this.btnDagger.setScale(1.2);
			this.btnDagger.alpha=.4;
			this.btnDagger.setInteractive();
			this.btnDagger.on("pointerdown", this.dagger.bind(this));
			this.btnDagger.on("pointerup", this.daggerRelease.bind(this));
      this.btnDagger.on("pointerout", this.daggerRelease.bind(this));
			this.add(this.btnDagger);
			this.btnDagger.setScrollFactor(0);
			this.btnDagger.setDepth(999);
	}
  up() {
    this.btnUp.alpha=.5;
    this.emitter.emit("UP");
  }
  upRelease() {
    this.btnUp.alpha=.01;
  }
  down() {
    this.btnDown.alpha=.5;
    this.emitter.emit("DOWN");
  }
  downRelease() {
    this.btnDown.alpha=.01;
		this.emitter.emit("DOWN_RELEASE")
  }
  right() {
    this.btnRight.alpha=.5;
    this.emitter.emit("RIGHT");
  }
  rightRelease() {
    this.btnRight.alpha=.01;
    this.emitter.emit("X_RELEASE");
  }
  left() {
    this.btnLeft.alpha=.5;
    this.emitter.emit("LEFT");
  }
  leftRelease() {
    this.btnLeft.alpha=.01;
    this.emitter.emit("X_RELEASE");
  }
	upRight() {
		this.btnUpRight.alpha=.5;
		this.emitter.emit("UPRIGHT");
	}
  upRightRelease() {
		this.btnUpRight.alpha=.01;
		this.emitter.emit("UPRIGHT_RELEASE")
	}	
	upLeft() {
		this.btnUpLeft.alpha=.5;
		this.emitter.emit("UPLEFT");
	}
  upLeftRelease() {
		this.btnUpLeft.alpha=.01;
		this.emitter.emit("UPLEFT_RELEASE")
	}

  attack(){
    this.btnAttack.alpha=.8; 
    this.emitter.emit("ATTACK")
  }
  attackRelease(){
    this.btnAttack.alpha=.4;
  }
  roll(){
    this.btnDodge.alpha=.8;
    this.emitter.emit("ROLL")
  }
  rollRelease(){
    this.btnDodge.alpha=.4
  }
	dagger(){
		this.btnDagger.alpha=.8;
		if(daggers>0){
			this.emitter.emit("DAGGER")
		}
	}
	daggerRelease(){
		this.btnDagger.alpha=.4
	}
}

