let axisX: BABYLON.LinesMesh;
let xChar: BABYLON.Mesh;
let axisY: BABYLON.LinesMesh;
let yChar: BABYLON.Mesh;
let axisZ: BABYLON.LinesMesh;
let zChar: BABYLON.Mesh;

function showWorldAxis(size: number, scene: BABYLON.Scene): void {
  const makeTextPlane: (t: string, c: string, s: number) => BABYLON.Mesh = (text: string, color: string, size: number) => {
    const dynamicTexture: BABYLON.DynamicTexture = new BABYLON.DynamicTexture('DynamicTexture', 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color , 'transparent', true);
    const plane: BABYLON.Mesh = BABYLON.Mesh.CreatePlane('TextPlane', size, scene, true) as BABYLON.Mesh;
    const mat: BABYLON.StandardMaterial = new BABYLON.StandardMaterial('TextPlaneMaterial', scene);
    mat.backFaceCulling = false;
    mat.specularColor = new BABYLON.Color3(0, 0, 0);
    mat.diffuseTexture = dynamicTexture;
    plane.material = mat;
  return plane;
    };
  axisX = BABYLON.Mesh.CreateLines('w_axisX', [
    BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
    new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ], scene);
  axisX.color = new BABYLON.Color3(1, 0, 0);
  xChar = makeTextPlane('X', 'red', size / 10);
  xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
  axisY = BABYLON.Mesh.CreateLines('w_axisY', [
      BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
      new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
      ], scene);
  axisY.color = new BABYLON.Color3(0, 1, 0);
  yChar = makeTextPlane('Y', 'green', size / 10);
  yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
  axisZ = BABYLON.Mesh.CreateLines('w_axisZ', [
      BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
      new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
      ], scene);
  axisZ.color = new BABYLON.Color3(0, 0, 1);
  zChar = makeTextPlane('Z', 'blue', size / 10);
  zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
}

function hideWorldAxis(scene: BABYLON.Scene): void {
  scene.removeMesh(axisX);
  scene.removeMesh(axisY);
  scene.removeMesh(axisZ);
  scene.removeMesh(xChar);
  scene.removeMesh(yChar);
  scene.removeMesh(zChar);
}

export { showWorldAxis, hideWorldAxis };
