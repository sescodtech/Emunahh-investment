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

export interface SupportingDocument {
  key: string;
  label: string;
  help?: string;
  required?: boolean;
}

export interface ApplicationJourney {
  slug: ApplicationServiceSlug;
  label: string;
  shortDescription: string;
  amountLabel: string;
  amountHelp: string;
  amountRequired: boolean;
  preparation: string[];
  supportingDocuments: SupportingDocument[];
  questions: ApplicationQuestion[];
}

export const applicationJourneys: Record<ApplicationServiceSlug, ApplicationJourney> = {
  'education-financing': {
    slug: 'education-financing',
    label: 'Education Financing',
    shortDescription: 'For education, tuition and approved learning-related commitments.',
    amountLabel: 'Estimated funding requirement',
    amountHelp: 'Use an estimated amount or range if the final invoice is not yet available.',
    amountRequired: true,
    preparation: ['Institution or provider details', 'Programme or course information', 'Fee requirement and timing', 'Applicant or sponsor repayment context'],
    supportingDocuments: [
      { key: 'identity', label: 'Government-issued identification', required: true },
      { key: 'admission', label: 'Admission / offer letter', required: true },
      { key: 'fees', label: 'Fee invoice or official fee schedule', required: true },
      { key: 'income', label: 'Applicant / sponsor proof of income', required: true },
      { key: 'bank_statement', label: 'Recent bank statement(s)', required: false },
    ],
    questions: [
      { key: 'applicant_role', label: 'Your role in the application', type: 'select', required: true, options: ['Student / learner', 'Parent / guardian', 'Sponsor', 'Other'] },
      { key: 'institution_name', label: 'Institution or education provider', type: 'text', required: true, placeholder: 'Name of institution or provider' },
      { key: 'programme', label: 'Programme or course', type: 'text', required: true, placeholder: 'Programme, course or qualification' },
      { key: 'study_location', label: 'Study location', type: 'text', required: true, placeholder: 'Country / region of study' },
      { key: 'programme_start_date', label: 'Programme start date', type: 'date' },
      { key: 'payment_deadline', label: 'Fee payment deadline', type: 'date', help: 'If a deadline has already been communicated.' },
      { key: 'repayment_profile', label: 'Expected repayment source', type: 'select', required: true, options: ['Employment income', 'Business income', 'Sponsor / household income', 'Other documented income'] },
    ],
  },
  'travel-financing': {
    slug: 'travel-financing',
    label: 'Travel Financing',
    shortDescription: 'For eligible, defined travel-related financial commitments.',
    amountLabel: 'Estimated travel funding requirement',
    amountHelp: 'Include the estimated total amount you would like the team to consider.',
    amountRequired: true,
    preparation: ['Purpose and destination', 'Expected travel dates', 'Main travel costs', 'Repayment source or income profile'],
    supportingDocuments: [
      { key: 'identity', label: 'Government-issued identification', required: true },
      { key: 'itinerary', label: 'Travel itinerary / booking / quotation', required: true },
      { key: 'travel_purpose', label: 'Supporting document for the travel purpose', help: 'For example: invitation, admission, medical document or relocation evidence.', required: false },
      { key: 'income', label: 'Proof of income or repayment source', required: true },
      { key: 'bank_statement', label: 'Recent bank statement(s)', required: false },
    ],
    questions: [
      { key: 'travel_purpose', label: 'Travel purpose', type: 'select', required: true, options: ['Business', 'Education', 'Medical', 'Family / personal', 'Relocation', 'Other'] },
      { key: 'destination', label: 'Destination', type: 'text', required: true, placeholder: 'Country / city or region' },
      { key: 'planned_travel_date', label: 'Planned departure date', type: 'date', required: true },
      { key: 'planned_return_date', label: 'Expected return date', type: 'date', help: 'Leave blank for relocation or one-way travel.' },
      { key: 'travel_stage', label: 'Current travel stage', type: 'select', required: true, options: ['Early planning', 'Dates selected', 'Bookings in progress', 'Bookings confirmed', 'Other'] },
      { key: 'cost_scope', label: 'What should the financing support?', type: 'textarea', required: true, placeholder: 'For example: fares, accommodation, approved fees or other defined travel-related costs.' },
      { key: 'repayment_profile', label: 'Expected repayment source', type: 'select', required: true, options: ['Employment income', 'Business income', 'Household / sponsor income', 'Other documented income'] },
    ],
  },
  'business-financing': {
    slug: 'business-financing',
    label: 'Business Financing',
    shortDescription: 'For eligible businesses with a defined commercial funding purpose.',
    amountLabel: 'Estimated financing requirement',
    amountHelp: 'Use an estimated requirement or range if the final amount is still being refined.',
    amountRequired: true,
    preparation: ['Business identity and sector', 'Operating history', 'Funding purpose', 'Turnover and repayment context'],
    supportingDocuments: [
      { key: 'business_registration', label: 'Business registration / incorporation document', required: true },
      { key: 'director_identity', label: 'Director / authorised representative identification', required: true },
      { key: 'bank_statement', label: 'Recent business bank statement(s)', required: true },
      { key: 'financials', label: 'Management accounts or financial statements', required: false },
      { key: 'transaction_support', label: 'Relevant contract, invoice, quotation or purchase order', required: false },
    ],
    questions: [
      { key: 'business_name', label: 'Business / organisation name', type: 'text', required: true },
      { key: 'registration_jurisdiction', label: 'Registration jurisdiction', type: 'text', required: true, placeholder: 'Country / region where the business is registered' },
      { key: 'industry', label: 'Industry / sector', type: 'text', required: true, placeholder: 'e.g. logistics, retail, technology' },
      { key: 'years_operating', label: 'Years operating', type: 'select', required: true, options: ['Less than 1 year', '1–2 years', '3–5 years', '6–10 years', 'More than 10 years'] },
      { key: 'financing_purpose', label: 'Financing purpose', type: 'select', required: true, options: ['Working capital', 'Inventory / stock', 'Equipment / assets', 'Expansion', 'Contract / project execution', 'Other'] },
      { key: 'turnover_range', label: 'Indicative annual turnover range', type: 'text', required: true, placeholder: 'Range in your reporting currency' },
      { key: 'repayment_source', label: 'Primary repayment source', type: 'textarea', required: true, placeholder: 'Briefly explain the business cash flow expected to service the facility.' },
      { key: 'funding_timing', label: 'When is the financing required?', type: 'text', required: true, placeholder: 'e.g. within 30 days' },
    ],
  },
  'personal-finance': {
    slug: 'personal-finance',
    label: 'Personal Finance',
    shortDescription: 'For eligible individuals with a clear personal funding requirement.',
    amountLabel: 'Estimated personal financing requirement',
    amountHelp: 'Provide the amount or a realistic range required for the stated purpose.',
    amountRequired: true,
    preparation: ['Purpose of financing', 'Employment or income profile', 'Repayment source', 'Required timing'],
    supportingDocuments: [
      { key: 'identity', label: 'Government-issued identification', required: true },
      { key: 'income', label: 'Proof of income / employment', required: true },
      { key: 'bank_statement', label: 'Recent bank statement(s)', required: true },
      { key: 'purpose_document', label: 'Invoice, quotation or other purpose document', required: false },
    ],
    questions: [
      { key: 'finance_purpose', label: 'Purpose of financing', type: 'textarea', required: true, placeholder: 'Briefly describe the financial requirement.' },
      { key: 'employment_status', label: 'Employment / income profile', type: 'select', required: true, options: ['Employed', 'Self-employed', 'Business owner', 'Professional / consultant', 'Other'] },
      { key: 'employer_or_business', label: 'Employer / business name', type: 'text', placeholder: 'Optional at this initial enquiry stage' },
      { key: 'income_range', label: 'Indicative income range', type: 'text', required: true, placeholder: 'Range in your reporting currency' },
      { key: 'repayment_source', label: 'Expected repayment source', type: 'select', required: true, options: ['Salary / employment income', 'Business income', 'Professional / contract income', 'Other documented income'] },
      { key: 'timing', label: 'When is the funding required?', type: 'text', required: true, placeholder: 'e.g. within 30 days' },
    ],
  },
  'investment-services': {
    slug: 'investment-services',
    label: 'Investment Services',
    shortDescription: 'Start an investment conversation around objective, horizon, experience and liquidity needs.',
    amountLabel: 'Indicative investment amount / range',
    amountHelp: 'An indicative range helps the team prepare for the conversation. It does not create a commitment.',
    amountRequired: true,
    preparation: ['Investment objective', 'Expected time horizon', 'Liquidity needs', 'General investment experience'],
    supportingDocuments: [
      { key: 'identity', label: 'Government-issued identification / KYC document', required: true },
      { key: 'source_of_funds', label: 'Supporting source-of-funds document', required: false },
      { key: 'entity_document', label: 'Corporate / institutional document (where applicable)', required: false },
    ],
    questions: [
      { key: 'client_type', label: 'Client type', type: 'select', required: true, options: ['Individual', 'Family / household', 'Business', 'Institution / organisation', 'Other'] },
      { key: 'investment_objective', label: 'Primary investment objective', type: 'select', required: true, options: ['Capital preservation', 'Income', 'Long-term growth', 'Diversification', 'Defined future commitment', 'Other'] },
      { key: 'investment_horizon', label: 'Expected investment horizon', type: 'select', required: true, options: ['Less than 1 year', '1–3 years', '3–5 years', '5+ years', 'Not yet decided'] },
      { key: 'investment_experience', label: 'General investment experience', type: 'select', required: true, options: ['Limited / first investment discussion', 'Some prior investment experience', 'Experienced investor', 'Institutional / professional context'] },
      { key: 'liquidity_needs', label: 'Liquidity expectations', type: 'textarea', required: true, placeholder: 'Tell us when you may need access to some or all of the capital.' },
      { key: 'source_of_funds', label: 'General source of investment funds', type: 'select', required: true, options: ['Employment / professional income', 'Business income', 'Savings', 'Asset or business proceeds', 'Institutional funds', 'Other lawful source'] },
    ],
  },
};

export const applicationServiceSlugs = Object.keys(applicationJourneys) as ApplicationServiceSlug[];

export const currencyOptions = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'AED', 'CHF', 'SGD', 'ZAR', 'OTHER'];
