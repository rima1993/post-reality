import { Injectable } from '@angular/core';
import AssetController from './classes/assetController';

@Injectable()
export class AssetControllerService {

  private assetController: AssetController;

  constructor() { }

  public get AssetController(): AssetController {
    if (this.assetController == null) {
      this.assetController = new AssetController();
    }
    return this.assetController;
  }
  public set AssetController(v: AssetController) {
    this.assetController = v;
  }
}
