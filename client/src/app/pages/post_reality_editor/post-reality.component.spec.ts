import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRealityComponent } from './post-reality.component';

describe('PostRealityComponent', () => {
  let component: PostRealityComponent;
  let fixture: ComponentFixture<PostRealityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRealityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRealityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
