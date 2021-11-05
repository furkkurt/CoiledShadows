var config = {
        type: Phaser.AUTO,
        width: 850,
        height: 450,
        scale: {
          mode: Phaser.Scale.FIT,
          //autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
            default: 'arcade',
					arcade: {gravity: {y: 200 }, debug: false}
        },
        scene:[preloader, prologue, level1, level2, level3, level4, cutscene1, level5, level6, level7, level8, tempEnd],
        pixelArt: true,
    };

var game = new Phaser.Game(config);
