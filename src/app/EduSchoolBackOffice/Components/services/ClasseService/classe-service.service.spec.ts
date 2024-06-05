import { TestBed } from '@angular/core/testing';

import { HomeworkService } from '../../services/homeworkService/homework.service';

describe('HomeworkService', () => {
  let service: HomeworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
