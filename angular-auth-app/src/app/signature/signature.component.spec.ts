import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { SignatureComponent } from './signature.component';

const apiUrl = 'http://localhost:8000/api'; // Define API URL as a constant

describe('SignatureComponent', () => {
  let component: SignatureComponent;
  let fixture: ComponentFixture<SignatureComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignatureComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SignatureComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error if email or file missing on submit', () => {
    component.email = '';
    component.selectedFile = null;
    component.onSubmit();
    expect(component.error).toBe('Please provide both email and signature image');
  });

  it('should make POST request and handle successful response', () => {
    component.email = 'test@example.com';
    component.selectedFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    component.onSubmit();

    const req = httpTestingController.expectOne(`${apiUrl}/predict_signature/`);
    expect(req.request.method).toBe('POST');
    req.flush({
      client: 'test@example.com',
      prediction: 'Genuine',
      confidence: '95.00%'
    });

    expect(component.isLoading).toBeFalse();
    expect(component.result).toEqual({
      client: 'test@example.com',
      prediction: 'Genuine',
      confidence: '95.00%'
    });
    expect(component.error).toBeNull();
  });

  it('should handle error response', () => {
    component.email = 'test@example.com';
    component.selectedFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    component.onSubmit();

    const req = httpTestingController.expectOne(`${apiUrl}/predict_signature/`);
    req.flush({ error: 'Client not found' }, { status: 404, statusText: 'Not Found' });

    expect(component.isLoading).toBeFalse();
    expect(component.error).toBe('Client not found');
    expect(component.result).toBeNull();
  });

  it('should update selectedFile on file input change', () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } } as any;
    component.onFileSelected(event);
    expect(component.selectedFile).toBe(file);
  });
});