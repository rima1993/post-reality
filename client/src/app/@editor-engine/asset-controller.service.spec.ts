import { TestBed, inject } from '@angular/core/testing';

import { AssetControllerService } from './asset-controller.service';

describe('AssetControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetControllerService]
    });
  });

  it('should be created', inject([AssetControllerService], (service: AssetControllerService) => {
    expect(service).toBeTruthy();
  }));
});
