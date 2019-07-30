import { TestBed } from '@angular/core/testing';

import { RiskScoreService } from './risk-score.service';

describe('RiskScoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiskScoreService = TestBed.get(RiskScoreService);
    expect(service).toBeTruthy();
  });
});
