import { Injectable } from '@angular/core';
import { Scene } from 'babylonjs';

/** Holds a singleton reference of the scene. */
@Injectable()
export class EditorSceneService {

  private bScene: Scene;

  constructor() { }

  public get Scene(): Scene {
    return this.bScene;
  }

  public set Scene(v: Scene) {
    this.bScene = v;
  }

}
