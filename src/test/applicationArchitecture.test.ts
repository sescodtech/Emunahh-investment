import { describe, expect, it } from 'vitest';
import { applicationJourneys, applicationServiceSlugs, currencyOptions } from '../config/applicationArchitecture';

describe('application architecture', () => {
  it('contains exactly the five canonical service journeys', () => {
    expect(applicationServiceSlugs.sort()).toEqual([
      'business-financing',
      'education-financing',
      'investment-services',
      'personal-finance',
      'travel-financing',
    ].sort());
  });

  it('gives every journey a professional first-stage data set', () => {
    for (const slug of applicationServiceSlugs) {
      const journey = applicationJourneys[slug];
      expect(journey.label.length).toBeGreaterThan(3);
      expect(journey.preparation.length).toBeGreaterThanOrEqual(4);
      expect(journey.questions.filter((question) => question.required).length).toBeGreaterThanOrEqual(3);
      expect(new Set(journey.questions.map((question) => question.key)).size).toBe(journey.questions.length);
      expect(journey.amountRequired).toBe(true);
    }
  });

  it('collects travel purpose, destination, dates and repayment context', () => {
    const keys = applicationJourneys['travel-financing'].questions.map((question) => question.key);
    expect(keys).toContain('travel_purpose');
    expect(keys).toContain('destination');
    expect(keys).toContain('planned_travel_date');
    expect(keys).toContain('cost_scope');
    expect(keys).toContain('repayment_profile');
  });

  it('keeps the shared currency list international and extensible', () => {
    expect(currencyOptions).toContain('USD');
    expect(currencyOptions).toContain('GBP');
    expect(currencyOptions).toContain('EUR');
    expect(currencyOptions).toContain('OTHER');
    expect(new Set(currencyOptions).size).toBe(currencyOptions.length);
  });
});
