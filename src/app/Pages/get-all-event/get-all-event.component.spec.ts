import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllEventComponent } from './get-all-event.component';

describe('GetAllEventComponent', () => {
  let component: GetAllEventComponent;
  let fixture: ComponentFixture<GetAllEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
