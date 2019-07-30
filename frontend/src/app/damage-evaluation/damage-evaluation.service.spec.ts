import { TestBed } from '@angular/core/testing';

import { DamageEvaluationService } from './damage-evaluation.service';

describe('DamageEvaluationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DamageEvaluationService = TestBed.get(DamageEvaluationService);
    expect(service).toBeTruthy();
  });
});
