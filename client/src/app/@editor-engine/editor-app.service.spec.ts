import { TestBed, inject } from '@angular/core/testing';

import { EditorAppService } from './editor-app.service';

describe('EditorAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorAppService]
    });
  });

  it('should be created', inject([EditorAppService], (service: EditorAppService) => {
    expect(service).toBeTruthy();
  }));
});
