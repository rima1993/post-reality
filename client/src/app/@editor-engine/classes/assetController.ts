import {
  AssetContainer,
  AssetsManager,
  MeshAssetTask,
  Scene,
  SceneLoader,
  Vector3,
  AbstractMesh,
  Mesh,
  TextureAssetTask,
  AbstractAssetTask,
  Texture,
  StandardMaterial
} from 'babylonjs';

export default class AssetController {

  public assetManager: AssetsManager;
  /**
   * Contains references to main meshes of each type of tiles.
   * Use this pool to close new tiles.
   */
  public tileMeshPool: Mesh[];
  /**
   * Contains all tile textures and meshes sequentially.
   */
  public tileContainer: AssetContainer;

  // TODO: make sure we are getting these from firebase.
  public loadedMarkerTextures: Texture[];

  private _contextScene: Scene;
  private _tileObjs: string[] = [
    'Title.obj',
    '3D.obj',
    'Medium.obj',
    'Small.obj'
  ];
  private _tileTextures: string[] = [
    '../../../assets/images/textures/B_title.png',
    '../../../assets/images/textures/B_3D.png',
    '../../../assets/images/textures/B_video.png',
    '../../../assets/images/textures/B_image.png',
    '../../../assets/images/textures/B_slide.png',
    '../../../assets/images/textures/B_text.png',
    '../../../assets/images/textures/B_audio.png',
    '../../../assets/images/textures/B_reaction.png',
    '../../../assets/images/textures/B_message.png'
  ];
  public get tileTexturePool(): Texture[] {
    return this.tileContainer.textures;
  }
  /* public get tileMeshesPool(): Mesh[] {
    const meshes = [];
    meshes.length = 4;
    let meshIndex = 0;
    for (let i = 0; i < meshes.length; i++) {
      meshes[i] = this.tileContainer.meshes[meshIndex];
      meshIndex += 3;
    }
    return meshes;
  } */

  constructor(/* scene: Scene */) {
    this.tileMeshPool = [];
    // there are currently only 4 types of tiles
    this.tileMeshPool.length = 4;
    this.loadedMarkerTextures = [];
    // this._contextScene = scene;
  }

  // TODO: figure out if we want to keep this around.
  public loadAssetContainer(scene: Scene) {
    for (let i = 0; i < this._tileObjs.length; i++) {
      const aContainer = SceneLoader.LoadAssetContainerAsync(
        '../../../assets/3D/',
        this._tileObjs[i],
        scene
      );
      aContainer
        .then((container: AssetContainer) => {
          // FIXME: don't use forEach for large lists.
          container.meshes.forEach((mesh: AbstractMesh) => {
            mesh.rotation = new Vector3(Math.PI / 2, 0, 0);
            mesh.position = new Vector3(0, 0.1, 0);
          });
          // TODO: call initializers dependent on these assets.
          // container.addAllToScene();
        })
        .catch((reason: any) => {
          console.log('Error loading assets into container: ' + reason);
        });
    }
  }

  public initMainAssets(scene: Scene, onFinishCallback: () => void) {
    // initiate tile container
    this.tileContainer = new AssetContainer(scene);
    this.assetManager = new AssetsManager(scene);
    this.loadTileAssets(this.assetManager);
    // this.loadMarkerAsset(this.assetManager);
    this.assetManager.load();
    this.assetManager.onFinish = (tasks: AbstractAssetTask[]) => {
      this.tileContainer.removeAllFromScene();
      onFinishCallback();
    };
  }

  private loadTileAssets(manager: AssetsManager) {
    for (let i = 0; i < this._tileObjs.length; i++) {
      const meshTask = manager.addMeshTask(
        'TileMeshLoadTask: ' + this._tileObjs[i],
        '',
        '../../../assets/3D/',
        this._tileObjs[i]
      );
      meshTask.onSuccess = (task: MeshAssetTask) => {
        for (let j = 0; j < task.loadedMeshes.length; j++) {
          const mesh = task.loadedMeshes[j];
          mesh.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
          if (j === 0) {
            mesh.name = this._tileObjs[i] + '_backdrop';
            this.tileMeshPool[i] = mesh as Mesh;
          } else {
            mesh.setParent(task.loadedMeshes[0]);
            if (j === 1) {
              mesh.name = this._tileObjs[i] + '_frame';
            } else if (j === 2) {
              mesh.name = this._tileObjs[i] + '_image';
            }
          }
          // assign all the loaded tile objs to the tileContainer
          this.tileContainer.meshes.push(mesh);
        }
      };
      meshTask.onError = (task: MeshAssetTask, msg: string, excpt: any) => {
        console.log(msg);
        console.log(excpt);
      };
    }
    const tempTxts: Texture[] = [];
    tempTxts.length = this._tileTextures.length;
    for (let i = 0; i < this._tileTextures.length; i++) {
      // get the texture file name by splitting it.
      const txtName = this._tileTextures[i].split(/\/|\\/).pop();
      const txtTask = manager.addTextureTask(
        'TileTextureLoadTask: ' + txtName,
        this._tileTextures[i]
      );
      txtTask.onSuccess = (task: TextureAssetTask) => {
        task.texture.name = txtName;
        task.texture.hasAlpha = true;
        task.texture.vScale = -1;
        // we don't use push because cannot be certain what index it will be assigned.
        tempTxts[i] = task.texture;
      };
      txtTask.onError = (task: TextureAssetTask, msg: string, excpt: any) => {
        console.log(msg);
        console.log(excpt);
      };
    }
    this.tileContainer.textures = tempTxts;
  }
  // TODO: retrieve marker asset from the user's account/upload.
  /* public loadMarkerAsset(manager: AssetsManager) {
    const txtTask = manager.addTextureTask(
      'MarkerTextureLoadTask: ' + 'Mickey',
      '../../../assets/images/textures/markers/a95928fe06334be5a0bf04c1785270c0.jpg'
    );
    txtTask.onSuccess = (task: TextureAssetTask) => {
      // FIXME: don't use push
      this.loadedMarkerTextures.push(task.texture);
    };
    txtTask.onError = (task: TextureAssetTask, msg: string, excpt: any) => {
      console.log(msg);
      console.log(excpt);
    };
  } */

  public loadMarkerTextures(textureUrls: string[], currMarkerMesh: Mesh) {
    this.assetManager.reset();
    const currMarkerTextures: Texture[] = [];
    // save current loaded marker texuture cache
    for (let i = 0; i < this.loadedMarkerTextures.length; i++) {
      currMarkerTextures.push(this.loadedMarkerTextures[i]);
      // this.loadedMarkerTextures[i].dispose();
    }
    // reset marker cache
    this.loadedMarkerTextures = [];
    this.loadedMarkerTextures.length = textureUrls.length;
    for (let i = 0; i < textureUrls.length; i++) {
      const txtTask = this.assetManager.addTextureTask(
        'MarkerTextureLoadTask: ',
        '../../../assets/images/textures/markers/' + textureUrls[i]
      );
      txtTask.onSuccess = (task: TextureAssetTask) => {
        // FIXME: don't use push
        // this.loadedMarkerTextures.push(task.texture);
        this.loadedMarkerTextures[i] = task.texture;
      };
      txtTask.onError = (task: TextureAssetTask, msg: string, excpt: any) => {
        console.log(msg);
        console.log(excpt);
      };
    }
    this.assetManager.onFinish = (task) => {
      // insert previous marker texture to infront of marker texture cache
      if (!currMarkerMesh.isVisible) { currMarkerMesh.isVisible = true; }
      (currMarkerMesh.material as StandardMaterial).diffuseTexture = this.loadedMarkerTextures[0];
      for (let i = 0; i < currMarkerTextures.length; i++) {
        // this.loadedMarkerTextures.unshift(currMarkerTextures[i]);
        currMarkerTextures[i].dispose();
      }
    };
    this.assetManager.load();
  }
}
