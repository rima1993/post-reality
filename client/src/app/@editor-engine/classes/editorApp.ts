import * as BABYLON from 'babylonjs';
import 'babylonjs-inspector';
import 'babylonjs-loaders';
import AssetController from './assetController';
import UIController from './uiController';
import { showWorldAxis, hideWorldAxis } from './worldAxis';
import PresentationData from './presentationData';

export default class EditorApp {
  public canvas: HTMLCanvasElement;
  public engine: BABYLON.Engine;
  public scene: BABYLON.Scene;
  public camera: BABYLON.ArcRotateCamera;
  public light: BABYLON.Light;
  public marker: BABYLON.Mesh;
  public assetController: AssetController;
  public uiController: UIController;

  private _bgPlane: BABYLON.Mesh;
  private _draggableObjs: BABYLON.Mesh[] = [];
  private _currDraggingObj: BABYLON.Mesh;
  private readonly NUMBER_PRECISION = 6;

  constructor(canvasID: string) {
    this.canvas = document.getElementById(canvasID) as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(this.canvas, true, {doNotHandleContextLost: false});
    this.assetController = new AssetController();
  }

  public initScene(): BABYLON.Scene {
    this.scene = new BABYLON.Scene(this.engine);
    // this.scene.useRightHandedSystem = true;
    this.camera = new BABYLON.ArcRotateCamera(
      'camera1',
      0,
      0,
      5,
      BABYLON.Vector3.Zero(),
      this.scene
    );
    this.camera.setPosition(new BABYLON.Vector3(0, 20, -0.0001));
    this.camera.attachControl(this.canvas, false);
    this.camera.upperBetaLimit = Math.PI / 3;
    this.camera.lowerRadiusLimit = 6;
    this.camera.upperRadiusLimit = 20;
    this.light = new BABYLON.DirectionalLight(
      'light1',
      new BABYLON.Vector3(0, -1, 1),
      this.scene
    );
    this.light.intensity = 0.8;
    // console.log(BABYLON.OBJFileLoader);
    this.registerKeyEventHandlers();
    this.registerPointerEventHandler();
    this.assetController.initMainAssets(this.scene, () => {
      this.uiController = new UIController(this);
      this.uiController.init();
      // TODO: don't make mesh with static size.
      const texture = this.assetController.loadedMarkerTextures[0];
      const material = new BABYLON.StandardMaterial(
        'markerMaterial',
        this.scene
      );
      material.backFaceCulling = true;
      material.diffuseTexture = texture;
      const w = texture ? texture.getSize().width : 10;
      const h = texture ? texture.getSize().height : 10;
      this.marker = BABYLON.MeshBuilder.CreateGround(
        'markerMesh',
        {
          width: w,
          height: h,
          subdivisions: 2
        },
        this.scene
      );
      if (texture == null) {
        this.marker.isVisible = false;
      }
      this.marker.material = material;
      this.marker.position.set(0, -0.1, 0);
      this.camera.setTarget(this.marker);
      this._bgPlane = BABYLON.MeshBuilder.CreateGround(
        'bgPlane',
        { width: 500, height: 500 },
        this.scene
      );
      this._bgPlane.scaling.y = 2;
      this._bgPlane.position.z = 0;
      this._bgPlane.position.y = -10;
      this._bgPlane.material = new BABYLON.StandardMaterial(
        'bgMaterail',
        this.scene
      );
      this._bgPlane.material.alpha = 0.5;
    });
    return this.scene;
  }

  public doRender(): void {
    // console.log('should be rendering');
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }

  private registerKeyEventHandlers(): void {
    window.onkeyup = (event: KeyboardEvent): any => {
      if (event.key === '`') {
        if (this.scene.debugLayer.isVisible()) {
          this.scene.debugLayer.hide();
          hideWorldAxis(this.scene);
        } else {
          this.scene.debugLayer.show();
          showWorldAxis(5, this.scene);
        }
      } else if (event.key === '\\') {
        this.savePresentation();
      }
    };
  }

  public setComponentText(text: string): void {
    const selectedMesh = this.uiController.toolTip._linkedMesh.getChildMeshes()[1];
    const dynamicTexture = new BABYLON.DynamicTexture(
      'dynamic_texture',
      512,
      this.scene,
      true
    );
    dynamicTexture.hasAlpha = true;
    // dynamicTexture.vScale = -1;
    // dynamicTexture.uScale = -1;
    const dynamicMaterial = new BABYLON.StandardMaterial('mat', this.scene);
    dynamicMaterial.diffuseTexture = dynamicTexture;
    // dynamicMaterial.diffuseColor = BABYLON.Color3.White();
    dynamicMaterial.backFaceCulling = false;
    selectedMesh.material = dynamicMaterial;
    const clearColor = '#555555';
    const font = 'bold 70px Segoe UI';
    const invertY = false;
    const color = 'white';
    const x = 10;
    const y = 70 + 10;
    // dynamicTexture.drawText(text, x, y, font, color, clearColor, true, true);
    const textureContext = dynamicTexture.getContext();
    textureContext.font = font;
    textureContext.save();
    textureContext.fillStyle = 'white';
    textureContext.textAlign = 'centre';
    this.wrapText(
      textureContext,
      text,
      x,
      y,
      440,
      100
    );
    textureContext.restore();
    dynamicTexture.update(invertY);
    // dynamicTexture.scale(500);
  }

  private wrapText(context: CanvasRenderingContext2D, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  // Draggable objs logic:
  public setAsDraggableObj(mesh: BABYLON.Mesh): void {
    this._draggableObjs.push(mesh);
  }
  private getGroundPosition(): BABYLON.Vector3 | null {
    // use predicate to get position on the groun
    let pickInfo: BABYLON.PickingInfo | null;
    if (this._currDraggingObj) {
      pickInfo = this.scene.pick(
        this.scene.pointerX,
        this.scene.pointerY,
        (mesh: BABYLON.Mesh) => {
          return mesh === this._bgPlane;
        }
      );
    } else {
      pickInfo = this.scene.pick(
        this.scene.pointerX,
        this.scene.pointerY,
        (mesh: BABYLON.Mesh) => {
          return mesh === this.marker;
        }
      );
    }
    if (pickInfo.hit) {
      return pickInfo.pickedPoint;
    }
    return null;
  }
  private registerPointerEventHandler(): void {
    let dragStartPoint: BABYLON.Vector3;
    const hl = new BABYLON.HighlightLayer('hl1', this.scene);
    const onPointerDown: (e: PointerEvent) => void = (
      event: PointerEvent
    ): void => {
      if (event.button === 2) {
        // tslint:disable-next-line:no-shadowed-variable
        let pickInfo = this.scene.pick(
          this.scene.pointerX,
          this.scene.pointerY,
          (mesh: BABYLON.Mesh) => {
            return this._draggableObjs.indexOf(mesh) > -1;
          }
        );
        if (pickInfo.hit) {
          // show the control popup menu.
          // console.log('showtooltip');
          this.uiController.toggleTooltip(pickInfo.pickedMesh as BABYLON.Mesh);
          // this._uiController.toolTip.isVisible = false;
        } else {
          // click on the marker/plane
          pickInfo = this.scene.pick(
            this.scene.pointerX,
            this.scene.pointerY,
            (mesh: BABYLON.Mesh) => {
              return mesh === this.marker;
            }
          );
          if (pickInfo.hit) {
            // console.log('hitting marker');
            this.uiController.toolTip.isVisible = false;
          }
        }
        return;
      }

      // check if we are under a mesh
      const pickInfo = this.scene.pick(
        this.scene.pointerX,
        this.scene.pointerY,
        (mesh: BABYLON.Mesh) => {
          return this._draggableObjs.indexOf(mesh) > -1;
        }
      );
      if (pickInfo.hit) {
        this._currDraggingObj = pickInfo.pickedMesh as BABYLON.Mesh;
        // this._currMesh.setParent(null);
        dragStartPoint = this.getGroundPosition();
        // (this._currMesh.getChildMeshes()[0].material as BABYLON.StandardMaterial).diffuseColor = BABYLON.Color3.Yellow();
        hl.addMesh(
          this._currDraggingObj.getChildMeshes()[0] as BABYLON.Mesh,
          BABYLON.Color3.Green()
        );
        if (dragStartPoint) {
          setTimeout(() => {
            if (this._currDraggingObj) {
              // this._currMesh.rotation = BABYLON.Vector3.Zero();
              // let newMesh = this._currMesh
            }
            this.camera.detachControl(this.canvas);
          }, 0);
        }
      }
    };

    const onPointerUp: (e: PointerEvent) => void = (
      event: PointerEvent
    ): void => {
      if (dragStartPoint) {
        this.camera.attachControl(this.canvas, true);
        if (this._currDraggingObj) {
          const pickInfo: BABYLON.PickingInfo | null = this.scene.pick(
            this.scene.pointerX,
            this.scene.pointerY,
            (mesh: BABYLON.Mesh) => {
              return mesh.name === 'ground'; // groun/marker is right under pointer
            },
            false
          );
          if (pickInfo.pickedMesh !== null) {
            // this._currMesh.position = pickInfo!.pickedPoint!;
            // write logic for dropping the object
          } else {
            // this._currMesh.position = BABYLON.Vector3.Zero();
          }
          hl.removeMesh(
            this._currDraggingObj.getChildMeshes()[0] as BABYLON.Mesh
          );
          // this._currMesh.rotationQuaternion = BABYLON.Quaternion.Identity();
          // if ((this._camera.beta / Math.PI + 0.5) % 2 !== 0) {
          //   this._currMesh.rotate(BABYLON.Axis.X, Math.PI, BABYLON.Space.LOCAL);
          //   this._currMesh.position.y = -(this._currMesh.getBoundingInfo()
          //     .boundingBox.extendSize.y + this._options.depth / 2);
          // } else {
          //   this._currMesh.position.y = this._currMesh.getBoundingInfo()
          //     .boundingBox.extendSize.y + this._options.depth / 2;
          // }
        }
        // this._currMesh.setParent(this._marker);
        // this._currMesh.renderingGroupId = 1;
        dragStartPoint = null;
        return;
      }
    };
    const onPointerMove: (e: PointerEvent) => void = (
      event: PointerEvent
    ): void => {
      if (!dragStartPoint) {
        return;
      }

      const current: BABYLON.Vector3 | null = this.getGroundPosition();

      if (!current) {
        return;
      }

      const diff: BABYLON.Vector3 = current.subtract(dragStartPoint);
      if (!this._currDraggingObj) {
        this._currDraggingObj.moveWithCollisions(diff);
      } else {
        this._currDraggingObj.position.addInPlace(diff);
      }
      dragStartPoint = current;
    };

    this.scene.onPointerDown = onPointerDown;
    this.scene.onPointerUp = onPointerUp;
    this.scene.onPointerMove = onPointerMove;
  }

  // Persistent data logic
  private parseNumber(key: any, value: any): boolean {
    return typeof value === 'number'
      ? parseFloat(value.toFixed(this.NUMBER_PRECISION))
      : value;
  }
  public savePresentation() {
    const seriTrans = [];
    let fileName = (this.marker.material as BABYLON.StandardMaterial)
      .diffuseTexture.name;
    fileName = fileName.split(/\/|\\/).pop();
    for (let i = 0; i < this._draggableObjs.length; i++) {
      // TODO: might need to use something else besided draggleObjs in the future
      const posX: string = this._draggableObjs[i].position.x.toString();
      const posY: string = this._draggableObjs[i].position.y.toString();
      const posZ: string = this._draggableObjs[i].position.z.toString();
      const pos = [posX, posY, posZ];
      const rotX: string = this._draggableObjs[i].rotation.x.toString();
      const rotY: string = this._draggableObjs[i].rotation.y.toString();
      const rotZ: string = this._draggableObjs[i].rotation.z.toString();
      const rot = [rotX, rotY, rotZ];
      const scalX: string = this._draggableObjs[i].scaling.x.toString();
      const scalY: string = this._draggableObjs[i].scaling.y.toString();
      const scalZ: string = this._draggableObjs[i].scaling.z.toString();
      const scal = [scalX, scalY, scalZ];
      const seriazliedTransform: PresentationData = {
        name: this._draggableObjs[i].name,
        markerID: fileName,
        position: pos,
        rotation: rot,
        scale: scal,
        size: []
      };
      seriTrans.push(seriazliedTransform);
    }
    let strTransData: string;
    try {
      // strScene = JSON.stringify(serializedScene, this.parseNumber, "\t");
      // strScene = JSON.stringify(serializedMesh, this.parseNumber, "\t");
      // strScene = strScene.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
      strTransData = JSON.stringify(seriTrans, this.parseNumber, '\t');
      strTransData = strTransData.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
    } catch (err) {
      // strScene = JSON.stringify(serializedScene);
      // strScene = JSON.stringify(serializedMesh);
      strTransData = JSON.stringify(seriTrans);
    }
    this.saveString(strTransData, fileName);
  }
  private saveString(text: string, fileName: string): void {
    /* let meshes: BABYLON.Mesh[] = [];
        for (let i = 0; i < this._presObjs.length; i++) {
            meshes.push(this._presObjs[i]);
            for (let j = 0; j < this._presObjs[i].getChildMeshes().length; j++) {
                meshes.push(this._presObjs[i].getChildMeshes()[j] as BABYLON.Mesh);
            }
        } */

    // let obj = BABYLON.OBJExport.OBJ(this._presObjs[0].getChildMeshes() as BABYLON.Mesh[], true, "mat", true);
    // let obj = BABYLON.OBJExport.OBJ(meshes, true, "mat", true);
    // let blob = new Blob ( [ obj ], { type : "octet/stream" } );
    const blob: Blob = new Blob([text], {
      type: 'text/plain'
    });
    this.save(blob, fileName);
  }
  private save(blob: Blob, fileName: string): void {
    // let link: HTMLAnchorElement = document.createElement("a");
    // link.style.display = "none";
    // document.body.appendChild(link);
    // link.href = URL.createObjectURL(blob);
    // link.download = fileName;
    // link.click();
    // TODO: have this save to used account in firebase
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    const form: FormData = new FormData();
    form.append('scene', blob, fileName);
    // TODO: remove static code
    xhr.open('POST', '/api/vuforia/save/scene', true);
    xhr.send(form);
  }
}
