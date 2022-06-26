import { COURSES } from './../../../../server/db-data';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });
    service = TestBed.inject(CoursesService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('findAllCourses', () => {
    it('should return all courses', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.findAllCourses().subscribe(res => {
        expect(res.length).toEqual(12);
      });
      const req = httpTestingController.expectOne('/api/courses');
      expect(req.request.method).toEqual('GET');
      req.flush({ payload: Object.values(COURSES) });
      httpTestingController.verify();
    });
  });
});
