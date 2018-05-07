import { TestBed, inject } from '@angular/core/testing';

import { EditorSceneService } from './editor-scene.service';

describe('EditorSceneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorSceneService]
    });
  });

  it('should be created', inject([EditorSceneService], (service: EditorSceneService) => {
    expect(service).toBeTruthy();
  }));
});
