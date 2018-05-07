import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { EditorAppService } from '../../@editor-engine/editor-app.service';
import EditorApp from '../../@editor-engine/classes/editorApp';
import { EditorSceneService } from '../../@editor-engine/editor-scene.service';
import { AssetControllerService } from '../../@editor-engine/asset-controller.service';




@Component({
  selector: 'app-post-reality',
  templateUrl: './post-reality.component.html',
  styleUrls: ['./post-reality.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostRealityComponent implements AfterViewInit {
  public text: string;

  constructor(
    private editorAppService: EditorAppService,
    private editorSceneService: EditorSceneService,
    private assetCtrlService: AssetControllerService,
  ) {}

  ngAfterViewInit(): void {
    // throw new Error("Method not implemented.");
    // TODO: figure out how to keep this persistent through pages
    if (this.editorAppService.App == null) {
      this.editorAppService.App = new EditorApp('render-canvas');
      this.editorAppService.App.initScene();
      // console.log('enditor-engine is null');
      // this.assetCtrlService.AssetController.initMainAssets(
      //   this.editorAppService.App.scene
      // );
      // this.editorAppService.App.doRender();
    }
    this.editorSceneService.Scene = this.editorAppService.App.scene;
    this.assetCtrlService.AssetController = this.editorAppService.App.assetController;
    this.editorAppService.App.doRender();
  }

  setTextData(): void {
    if (this.text === '') { return; }
    // TODO: set text of selected text component
    this.editorAppService.App.setComponentText(this.text);
  }

}
