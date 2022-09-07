import { Scene, GameObjects, Cameras } from "phaser";

export class MainScene extends Scene {
  private fullscreen!: GameObjects.Text;
  private title!: GameObjects.Text;
  private response!: GameObjects.Text;
  private apiButton!: GameObjects.Text;
  private camera!: Cameras.Scene2D.Camera;

  private initialWidth!: number;
  private initialHeight!: number;
  private resizeAllowed: boolean = true;

  init() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor("#24252A");

    this.initialWidth = this.scale.gameSize.width;
    this.initialHeight = this.scale.gameSize.height;

    window.addEventListener("resize", this.onResize.bind(this));
  }

  create() {
    const { centerX, centerY } = this.camera;
    this.input.on("gameobjectup", this.onGameObjectUp, this);

    this.title = this.createText("Phaser Web Test", centerX, centerY);
    this.apiButton = this.createText(
      "Make API call",
      centerX,
      centerY + 100,
      40
    );

    this.apiButton.setInteractive();
    this.apiButton.on("pointerup", this.onClickText, this);

    this.fullscreen = this.createText("Fullscreen", centerX, centerY - 100, 20);
    this.fullscreen.setInteractive();
    this.fullscreen.on("pointerup", this.toggleFullscreen, this);

    this.response = this.createText(
      "Waiting to make request to: https://jsonplaceholder.typicode.com/todos/1",
      centerX,
      centerY + 200,
      20
    );

    this.onResize();
  }

  createText(text: string, x: number, y: number, size: number = 80) {
    return this.add
      .text(x, y, text, {
        //@ts-ignore
        fontSize: size,
        fontFamily: "Rancho",
      })
      .setOrigin(0.5, 0.5);
  }

  toggleFullscreen() {
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    } else {
      this.scale.startFullscreen();
    }
  }

  onResize() {
    if (!this.resizeAllowed) return;
    const canvas = this.game.canvas;
    const container = canvas.parentElement;
    if (!canvas || !container) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    container.style.width = width + "px";
    container.style.height = height + "px";
    this.scale.resize(width, height);
    this.centerCameraOn(this.initialWidth / 2, this.initialHeight / 2);
  }

  centerCameraOn(x: number, y: number) {
    this.cameras.main.centerOn(x, y);
  }

  onGameObjectUp(_pointer: any, gameObject: any) {
    gameObject.emit("clicked", gameObject);
  }

  onClickText() {
    this.makeAPICall();
  }

  async makeAPICall() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const json = await response.json();
    this.response.setText(JSON.stringify(json, null, 2));
  }
}
