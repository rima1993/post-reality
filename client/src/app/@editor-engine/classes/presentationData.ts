import * as BABYLON from 'babylonjs';
import 'babylonjs-inspector';
import 'babylonjs-serializers';

// export default interface PresentationData { }
export default interface PresentationData {
  name: string; markerID: string; position: string[]; scale: string[]; rotation: string[]; size: number[];
}

// export default interface PresentationDataList extends Array<PresentationData>{}
