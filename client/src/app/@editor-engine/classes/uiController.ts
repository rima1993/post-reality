import * as BABYLON from 'babylonjs';
import 'babylonjs-gui';
import EditorApp from './editorApp';

export default class UIController {
  private _advanceTexture: BABYLON.GUI.AdvancedDynamicTexture;
  private _toolTip: BABYLON.GUI.Rectangle;

  public get toolTip(): BABYLON.GUI.Rectangle {
    return this._toolTip;
  }

  constructor(private app: EditorApp) {
    this._advanceTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      'mainUI'
    );
  }

  public init() {
    // Disbale 'righ-click' context menu
    window.addEventListener(
      'contextmenu',
      function(e) {
        e.preventDefault();
      },
      false
    );
    const button1 = BABYLON.GUI.Button.CreateSimpleButton('btn1', 'Title');
    button1.width = '90px';
    button1.height = '25px';
    button1.color = 'white';
    button1.cornerRadius = 20;
    button1.background = 'purple';
    button1.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    button1.onPointerUpObservable.add(() => {
      const clone = this.instantiatePresentationComponent('title', 'title');
      // (clone.material as BABYLON.StandardMaterial).diffuseTexture = this._loadedComponentTextures[0];
      this.app.setAsDraggableObj(clone);
      // this.app.PresentationElements.push(clone);
    });
    this._advanceTexture.addControl(button1);

    const button2 = BABYLON.GUI.Button.CreateSimpleButton('btn2', '3D');
    button2.width = '90px';
    button2.height = '25px';
    button2.color = 'white';
    button2.cornerRadius = 20;
    button2.background = 'red';
    button2.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    button2.top = '30px';
    button2.onPointerUpObservable.add(() => {
      const clone = this.instantiatePresentationComponent('big', '3d');
      this.app.setAsDraggableObj(clone);
      // this.app.PresentationElements.push(clone);
    });
    this._advanceTexture.addControl(button2);

    const button3 = BABYLON.GUI.Button.CreateSimpleButton('btn3', 'Video');
    button3.width = '90px';
    button3.height = '25px';
    button3.color = 'white';
    button3.cornerRadius = 20;
    button3.background = 'teal';
    button3.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    button3.top = '60px';
    button3.onPointerUpObservable.add(() => {
      const clone = this.instantiatePresentationComponent('med', 'video');
      this.app.setAsDraggableObj(clone);
      // this.app.PresentationElements.push(clone);
    });
    this._advanceTexture.addControl(button3);

    const button4 = BABYLON.GUI.Button.CreateSimpleButton('btn8', 'Image');
    button4.width = '90px';
    button4.height = '25px';
    button4.color = 'white';
    button4.cornerRadius = 20;
    button4.background = 'grey';
    button4.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button4.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    button4.top = '90px';
    // this._button8.left = "-70px";
    button4.onPointerUpObservable.add(() => {
      const clone = this.instantiatePresentationComponent('med', 'image');
      this.app.setAsDraggableObj(clone);
      // this.app.PresentationElements.push(clone);
    });
    this._advanceTexture.addControl(button4);

    const button5 = BABYLON.GUI.Button.CreateSimpleButton('btn6', 'SlideShow');
    button5.width = '90px';
    button5.height = '25px';
    button5.color = 'white';
    button5.cornerRadius = 20;
    button5.background = 'blue';
    button5.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button5.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    button5.top = '120px';
    button5.onPointerUpObservable.add(() => {
      const clone = this.instantiatePresentationComponent('med', 'slide');
      this.app.setAsDraggableObj(clone);
      // this.app.PresentationElements.push(clone);
    });
    this._advanceTexture.addControl(button5);

    const button6 = BABYLON.GUI.Button.CreateSimpleButton('btn7', 'Audio');
    button6.width = '90px';
    button6.height = '25px';
    button6.color = 'white';
    button6.cornerRadius = 20;
    button6.background = 'black';
    button6.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button6.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    button6.top = '150px';
    button6.onPointerUpObservable.add(() => {
      const clone = this.instantiatePresentationComponent('small', 'audio');
      this.app.setAsDraggableObj(clone);
      // this.app.PresentationElements.push(clone);
    });
    this._advanceTexture.addControl(button6);

    const button7 = BABYLON.GUI.Button.CreateSimpleButton('btn9', 'Reaction');
    button7.width = '90px';
    button7.height = '25px';
    button7.color = 'white';
    button7.cornerRadius = 20;
    button7.background = 'green';
    button7.top = '180px';
    button7.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button7.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    button7.onPointerUpObservable.add(() => {
      const clone = this.instantiatePresentationComponent('small', 'react');
      this.app.setAsDraggableObj(clone);
      // this.app.PresentationElements.push(clone);
    });
    this._advanceTexture.addControl(button7);

    const button8 = BABYLON.GUI.Button.CreateSimpleButton('btn10', 'Message');
    button8.width = '90px';
    button8.height = '25px';
    button8.color = 'white';
    button8.cornerRadius = 20;
    button8.background = 'magenta';
    button8.top = '210px';
    button8.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button8.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    button8.onPointerUpObservable.add(() => {
      const clone = this.instantiatePresentationComponent('small', 'message');
      this.app.setAsDraggableObj(clone);
      // this.app.PresentationElements.push(clone);
    });
    this._advanceTexture.addControl(button8);

    const button9 = BABYLON.GUI.Button.CreateSimpleButton('btn11', 'Text');
    button9.width = '90px';
    button9.height = '25px';
    button9.color = 'white';
    button9.cornerRadius = 20;
    button9.background = 'turquoise';
    button9.top = '240px';
    button9.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button9.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    button9.onPointerUpObservable.add(() => {
      const clone = this.instantiatePresentationComponent('med', 'text');
      this.app.setAsDraggableObj(clone);
      // this.app.PresentationElements.push(clone);
    });
    this._advanceTexture.addControl(button9);

    const button10 = BABYLON.GUI.Button.CreateSimpleButton('btn4', '<');
    button10.width = '90px';
    button10.height = '25px';
    button10.color = 'white';
    button10.cornerRadius = 20;
    button10.background = 'green';
    button10.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button10.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    button10.left = '-100px';
    let markerIndex = 0;
    button10.onPointerUpObservable.add(() => {
      const markerMat: BABYLON.StandardMaterial = this.app.marker
        .material as BABYLON.StandardMaterial;
      if (markerIndex > 0) {
        markerIndex--;
        markerMat.diffuseTexture = this.app.assetController.loadedMarkerTextures[
          markerIndex
        ];
        this.app.marker.dispose();
        this.app.marker = BABYLON.MeshBuilder.CreateGround(
          'ground',
          {
            width: markerMat.diffuseTexture.getSize().width / 100,
            height: markerMat.diffuseTexture.getSize().height / 100,
            subdivisions: 2
          },
          this.app.scene
        );
        this.app.marker.material = markerMat;
      }
    });
    this._advanceTexture.addControl(button10);

    const button11 = BABYLON.GUI.Button.CreateSimpleButton('btn5', '>');
    button11.width = '90px';
    button11.height = '25px';
    button11.color = 'white';
    button11.cornerRadius = 20;
    button11.background = 'green';
    button11.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button11.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    // this._button5.top = "120px";
    button11.left = '100px';
    button11.onPointerUpObservable.add(() => {
      const markerMat: BABYLON.StandardMaterial = this.app.marker
        .material as BABYLON.StandardMaterial;
      if (
        markerIndex <
        this.app.assetController.loadedMarkerTextures.length - 1
      ) {
        markerIndex++;
        markerMat.diffuseTexture = this.app.assetController.loadedMarkerTextures[
          markerIndex
        ];
        this.app.marker.dispose();
        this.app.marker = BABYLON.MeshBuilder.CreateGround(
          'ground',
          {
            width: markerMat.diffuseTexture.getSize().width / 100,
            height: markerMat.diffuseTexture.getSize().height / 100,
            subdivisions: 2
          },
          this.app.scene
        );
        this.app.marker.material = markerMat;
      }
    });
    this._advanceTexture.addControl(button11);

    const button12 = BABYLON.GUI.Button.CreateSimpleButton(
      'btn12',
      'Upload Marker'
    );
    button12.width = '140px';
    button12.height = '25px';
    button12.color = 'white';
    button12.cornerRadius = 20;
    button12.background = 'blue';
    button12.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    button12.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    // get a hold of input element
    /* const formEle = document.getElementById(
      'markerUploadPrompt'
    ) as HTMLFormElement; */
    // this is using PrimeNG component
    const formEle = document.getElementById('markerUploadPrompt');

    button12.onPointerUpObservable.add(() => {
      if (formEle.style.display !== 'block') {
        formEle.style.display = 'block';
      } else {
        formEle.style.display = 'none';
      }
    });
    this._advanceTexture.addControl(button12);

    const button13 = BABYLON.GUI.Button.CreateSimpleButton('btn13', 'Save');
    button13.width = '140px';
    button13.height = '25px';
    button13.color = 'white';
    button13.cornerRadius = 20;
    button13.background = 'red';
    button13.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    button13.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    button13.onPointerUpObservable.add(() => {
      this.app.savePresentation();
      window.alert('Presentation Saved!');
    });
    this._advanceTexture.addControl(button13);

    /* const submitBtn = document.getElementById('submitBtn') as HTMLInputElement;
    const button14 = BABYLON.GUI.Button.CreateSimpleButton('btn14', 'Submit');
    button14.width = '140px';
    button14.height = '25px';
    button14.color = 'white';
    button14.cornerRadius = 20;
    button14.background = 'orange';
    button14.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    button14.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    button14.top = '-30px';
    button14.onPointerUpObservable.add(() => {
      // get a hold of the marker upload submit button

      // TODO: add form validation for the inputs
      // set value of textInputElement to that of nameInputElement to send to server
      // simulate click to submit/send marker to server.
      // submitBtn.click();
      formEle.submit();
    });
    button14.isVisible = false;
    this.advanceTexture.addControl(button14); */

    // Create tooltip
    this.addToolTip(this._advanceTexture);
    // Send resize event to fix initial resize issue.
    window.dispatchEvent(new Event('resize'));
  }

  // TODO: Move these logic to someplace else.
  private instantiatePresentationComponent(
    dimension: string,
    type: string
  ): BABYLON.Mesh {
    let dIndex = 0;
    // let tIndex = 0;
    if (dimension === 'title') {
      dIndex = 0;
    }
    if (dimension === 'big') {
      dIndex = 1;
    }
    if (dimension === 'med') {
      dIndex = 2;
    }
    if (dimension === 'small') {
      dIndex = 3;
    }

    const clone = (this.app.assetController.tileMeshPool[
      dIndex
    ] as BABYLON.Mesh).clone(type);
    clone.position = new BABYLON.Vector3(0, 0.1, 0);

    const imageMesh = clone.getChildMeshes()[clone.getChildMeshes.length - 1];
    const newMaterial = new BABYLON.StandardMaterial(
      type + 'Material',
      this.app.scene
    );

    if (type === 'title') {
      newMaterial.diffuseTexture = this.app.assetController.tileTexturePool[0];
    }
    if (type === '3d') {
      newMaterial.diffuseTexture = this.app.assetController.tileTexturePool[1];
    }
    if (type === 'video') {
      newMaterial.diffuseTexture = this.app.assetController.tileTexturePool[2];
    }
    if (type === 'image') {
      newMaterial.diffuseTexture = this.app.assetController.tileTexturePool[3];
    }
    if (type === 'slide') {
      newMaterial.diffuseTexture = this.app.assetController.tileTexturePool[4];
    }
    if (type === 'text') {
      newMaterial.diffuseTexture = this.app.assetController.tileTexturePool[5];
    }
    if (type === 'audio') {
      newMaterial.diffuseTexture = this.app.assetController.tileTexturePool[6];
    }
    if (type === 'react') {
      newMaterial.diffuseTexture = this.app.assetController.tileTexturePool[7];
    }
    if (type === 'message') {
      newMaterial.diffuseTexture = this.app.assetController.tileTexturePool[8];
    }

    newMaterial.diffuseColor = BABYLON.Color3.White();
    imageMesh.material = newMaterial;

    return clone;
  }

  public toggleTooltip(mesh: BABYLON.Mesh) {
    if (this._toolTip._linkedMesh === mesh) {
      this._toolTip.isVisible = !this._toolTip.isVisible;
    } else {
      this._toolTip.isVisible = true;
    }
    this._toolTip.linkWithMesh(mesh);
  }

  public addToolTip(uiTexture: BABYLON.GUI.AdvancedDynamicTexture) {
    console.log('ToolTip Added');
    const options = {
      width: 100,
      height: 100,
      depth: 5
    };
    this._toolTip = new BABYLON.GUI.Rectangle();
    this._toolTip.width = '100px';
    this._toolTip.height = '80px';
    this._toolTip.cornerRadius = 5;
    this._toolTip.color = 'white';
    this._toolTip.thickness = 1;
    this._toolTip.background = '#5e7599';
    this._toolTip.linkOffsetX = 50;
    this._toolTip.isVisible = false;

    const rotYBtn = BABYLON.GUI.Button.CreateSimpleButton('but', 'Rotate');
    rotYBtn.height = '20px';
    rotYBtn.fontSize = 14;
    rotYBtn.cornerRadius = 5;
    rotYBtn.color = 'white';
    rotYBtn.verticalAlignment = 0;
    rotYBtn.background = 'transparent';
    this._toolTip.addControl(rotYBtn);
    rotYBtn.onPointerUpObservable.add((ev: BABYLON.GUI.Vector2WithInfo) => {
      if (ev.buttonIndex === 0) {
        this._toolTip._linkedMesh.rotate(
          BABYLON.Axis.Y,
          Math.PI / 2,
          BABYLON.Space.WORLD
        );
      }
    });

    const scaleDownBtn = BABYLON.GUI.Button.CreateSimpleButton(
      'scaleDownBtn',
      '-'
    );
    scaleDownBtn.height = '20px';
    scaleDownBtn.width = '40px';
    scaleDownBtn.fontSize = 14;
    scaleDownBtn.cornerRadius = 5;
    scaleDownBtn.color = 'white';
    scaleDownBtn.verticalAlignment = 0;
    scaleDownBtn.top = '20px';
    scaleDownBtn.left = '-20px';
    scaleDownBtn.background = 'transparent';
    this._toolTip.addControl(scaleDownBtn);
    scaleDownBtn.onPointerUpObservable.add(
      (ev: BABYLON.GUI.Vector2WithInfo) => {
        if (ev.buttonIndex === 0) {
          const curScale = this._toolTip._linkedMesh.scaling;
          this._toolTip._linkedMesh.scaling.set(
            curScale.x - 0.25,
            curScale.y - 0.25,
            curScale.z - 0.25
          );
        }
      }
    );

    const scaleUpBtn = BABYLON.GUI.Button.CreateSimpleButton('scaleUpBtn', '+');
    scaleUpBtn.height = '20px';
    scaleUpBtn.width = '40px';
    scaleUpBtn.fontSize = 14;
    scaleUpBtn.cornerRadius = 5;
    scaleUpBtn.color = 'white';
    scaleUpBtn.verticalAlignment = 0;
    scaleUpBtn.top = '20px';
    scaleUpBtn.left = '20px';
    scaleUpBtn.background = 'transparent';
    this._toolTip.addControl(scaleUpBtn);
    scaleUpBtn.onPointerUpObservable.add((ev: BABYLON.GUI.Vector2WithInfo) => {
      if (ev.buttonIndex === 0) {
        const curScale = this._toolTip._linkedMesh.scaling;
        this._toolTip._linkedMesh.scaling.set(
          curScale.x + 0.25,
          curScale.y + 0.25,
          curScale.z + 0.25
        );

        /* this._toolTip._linkedMesh.rotate(
          BABYLON.Axis.X,
          Math.PI / 2,
          BABYLON.Space.LOCAL
        ); */
      }
    });

    const setTileDataBtn = BABYLON.GUI.Button.CreateSimpleButton(
      'setDataBtn',
      'Set Data'
    );
    setTileDataBtn.height = '20px';
    setTileDataBtn.fontSize = 14;
    setTileDataBtn.cornerRadius = 5;
    setTileDataBtn.color = 'white';
    setTileDataBtn.verticalAlignment = 0;
    setTileDataBtn.top = '40px';
    setTileDataBtn.background = 'transparent';
    this._toolTip.addControl(setTileDataBtn);
    const textInput = document.getElementById('input');
    setTileDataBtn.onPointerUpObservable.add(ev => {
      if (ev.buttonIndex === 0) {
        if (textInput.style.display !== 'block') {
          textInput.style.display = 'block';
          textInput.focus();
        } else {
          textInput.style.display = 'none';
        }
        // this._toolTip._linkedMesh.dispose();
        // console.log(this._toolTip._linkedMesh);
      }
      this._toolTip.isVisible = false;
    });

    const rmvTileBtn = BABYLON.GUI.Button.CreateSimpleButton(
      'removeBtn',
      'Remove'
    );
    rmvTileBtn.height = '20px';
    rmvTileBtn.fontSize = 14;
    rmvTileBtn.cornerRadius = 5;
    rmvTileBtn.color = 'white';
    rmvTileBtn.verticalAlignment = 0;
    rmvTileBtn.top = '60px';
    rmvTileBtn.background = 'transparent';
    this._toolTip.addControl(rmvTileBtn);
    rmvTileBtn.onPointerUpObservable.add(ev => {
      if (ev.buttonIndex === 0) {
        this._toolTip._linkedMesh.dispose();
        // console.log(this._toolTip._linkedMesh);
      }
      this._toolTip.isVisible = false;
    });

    this._advanceTexture.addControl(this._toolTip);
  }
}
