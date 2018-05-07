import { Injectable } from '@angular/core';
import { EditorSceneService } from './editor-scene.service';
import EditorApp from './classes/editorApp';

/** Holds singleton reference of the editor app. */
@Injectable()
export class EditorAppService {
  private _app: EditorApp;

  constructor(private editorScene: EditorSceneService) { }

  public get App(): EditorApp {
    return this._app;
  }

  public set App(v: EditorApp) {
    this._app = v;
  }
}
