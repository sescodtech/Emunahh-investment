export type ApplicationServiceSlug =
  | 'education-financing'
  | 'travel-financing'
  | 'business-financing'
  | 'personal-finance'
  | 'investment-services';

export type FieldType = 'text' | 'date' | 'select' | 'textarea';

export interface ApplicationQuestion {
  key: string;
  label: string;
  help?: string;
  placeholder?: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
}

export interface ApplicationJourney {
  slug: ApplicationServiceSlug;
  label: string;
  shortDescription: string;
  amountLabel: string;
  questions: ApplicationQuestion[];
}

export const applicationJourneys: Record<ApplicationServiceSlug, ApplicationJourney> = {
  'education-financing': {
    slug: 'education-financing',
    label: 'Education Financing',
    shortDescription: 'For education, tuition and approved learning-related commitments.',
    amountLabel: 'Estimated funding requirement',
    questions: [
      { key: 'applicant_role', label: 'Your role', type: 'select', required: true, options: ['Student / learner', 'Parent / guardian', 'Sponsor', 'Other'] },
      { key: 'institution_name', label: 'Institution or education provider', type: 'text', required: true, placeholder: 'Name of institution or provider' },
      { key: 'programme', label: 'Programme or course', type: 'text', required: true, placeholder: 'Programme, course or qualification' },
      { key: 'study_location', label: 'Study location', type: 'text', placeholder: 'Country / region of study' },
      { key: 'payment_deadline', label: 'Payment deadline', type: 'date', help: 'If a deadline has already been communicated.' },
    ],
  },
  'travel-financing': {
    slug: 'travel-financing',
    label: 'Travel Financing',
    shortDescription: 'For eligible, defined travel-related financial commitments.',
    amountLabel: 'Estimated travel funding requirement',
    questions: [
      { key: 'travel_purpose', label: 'Travel purpose', type: 'select', required: true, options: ['Business', 'Education', 'Medical', 'Family / personal', 'Relocation', 'Other'] },
      { key: 'destination', label: 'Destination', type: 'text', required: true, placeholder: 'Country / city or region' },
      { key: 'planned_travel_date', label: 'Planned travel date', type: 'date' },
      { key: 'cost_scope', label: 'What should the financing support?', type: 'textarea', required: true, placeholder: 'Briefly describe the main travel-related costs.' },
    ],
  },
  'business-financing': {
    slug: 'business-financing',
    label: 'Business Financing',
    shortDescription: 'For eligible businesses with a defined commercial funding purpose.',
    amountLabel: 'Estimated financing requirement',
    questions: [
      { key: 'business_name', label: 'Business / organisation name', type: 'text', required: true },
      { key: 'industry', label: 'Industry / sector', type: 'text', required: true, placeholder: 'e.g. logistics, retail, technology' },
      { key: 'years_operating', label: 'Years operating', type: 'select', required: true, options: ['Less than 1 year', '1–2 years', '3–5 years', '6–10 years', 'More than 10 years'] },
      { key: 'financing_purpose', label: 'Financing purpose', type: 'select', required: true, options: ['Working capital', 'Inventory / stock', 'Equipment / assets', 'Expansion', 'Contract / project execution', 'Other'] },
      { key: 'turnover_range', label: 'Indicative annual turnover range', type: 'text', placeholder: 'Optional range in your reporting currency' },
    ],
  },
  'personal-finance': {
    slug: 'personal-finance',
    label: 'Personal Finance',
    shortDescription: 'For eligible individuals with a clear personal funding requirement.',
    amountLabel: 'Estimated personal financing requirement',
    questions: [
      { key: 'finance_purpose', label: 'Purpose of financing', type: 'textarea', required: true, placeholder: 'Briefly describe the financial requirement.' },
      { key: 'employment_status', label: 'Employment / income profile', type: 'select', required: true, options: ['Employed', 'Self-employed', 'Business owner', 'Professional / consultant', 'Other'] },
      { key: 'income_range', label: 'Indicative income range', type: 'text', placeholder: 'Optional range in your reporting currency' },
      { key: 'timing', label: 'When is the funding required?', type: 'text', placeholder: 'e.g. within 30 days' },
    ],
  },
  'investment-services': {
    slug: 'investment-services',
    label: 'Investment Services',
    shortDescription: 'Start an investment conversation around objective, horizon and liquidity needs.',
    amountLabel: 'Indicative investment amount / range',
    questions: [
      { key: 'client_type', label: 'Client type', type: 'select', required: true, options: ['Individual', 'Family / household', 'Business', 'Institution / organisation', 'Other'] },
      { key: 'investment_objective', label: 'Primary investment objective', type: 'select', required: true, options: ['Capital preservation', 'Income', 'Long-term growth', 'Diversification', 'Defined future commitment', 'Other'] },
      { key: 'investment_horizon', label: 'Expected investment horizon', type: 'select', required: true, options: ['Less than 1 year', '1–3 years', '3–5 years', '5+ years', 'Not yet decided'] },
      { key: 'liquidity_needs', label: 'Liquidity expectations', type: 'textarea', required: true, placeholder: 'Tell us when you may need access to some or all of the capital.' },
    ],
  },
};

export const applicationServiceSlugs = Object.keys(applicationJourneys) as ApplicationServiceSlug[];

export const currencyOptions = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'AED', 'CHF', 'SGD', 'ZAR', 'OTHER'];
