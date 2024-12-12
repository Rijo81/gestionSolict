import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCameraPickerComponent } from './modal-camera-picker.component';

describe('ModalCameraPickerComponent', () => {
  let component: ModalCameraPickerComponent;
  let fixture: ComponentFixture<ModalCameraPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCameraPickerComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCameraPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
