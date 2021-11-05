
class tempEnd extends Phaser.Scene {
  constructor() {
    super("tempEnd");
  }
  create(){	
    this.level1StoryText1 = this.add.text(20, 115, "Thanks for playing so far :D\n \nnew levels are on the way, please check for updates!", {fontFamily: "AGoblinAppears", fontSize: "16px"});
	}
}
