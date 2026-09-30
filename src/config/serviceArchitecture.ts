export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceArchitecture {
  slug: string;
  legacyCmsSlug?: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  audience: string[];
  supportAreas: Array<{ title: string; description: string }>;
  process: ServiceProcessStep[];
  requirements: string[];
  considerations: string[];
  faqs: ServiceFAQ[];
  disclosure: string;
}

export const serviceArchitectures: Record<string, ServiceArchitecture> = {
  'education-financing': {
    slug: 'education-financing',
    legacyCmsSlug: 'student-loans',
    eyebrow: 'Education Financing',
    title: 'Structured support for important education commitments.',
    tagline: 'Education funding with a clear application, assessment and documentation process.',
    description:
      'Designed for eligible students, families and sponsors who need a structured way to address tuition and approved education-related costs without losing sight of affordability and repayment responsibilities.',
    audience: [
      'Students and professional learners with a defined education commitment',
      'Parents, guardians or sponsors supporting an eligible applicant',
      'Applicants who can provide clear institutional and financial documentation',
    ],
    supportAreas: [
      { title: 'Tuition and academic fees', description: 'Support for eligible fees connected to an approved programme or institution.' },
      { title: 'Professional education', description: 'Structured consideration for qualifying professional programmes and examinations.' },
      { title: 'Time-sensitive obligations', description: 'Assessment of education commitments with a defined payment timeline.' },
      { title: 'Sponsor-led applications', description: 'Applications may be structured around an eligible sponsor where appropriate.' },
    ],
    process: [
      { number: '01', title: 'Start an enquiry', description: 'Share the education objective, programme or institution and expected funding timeline.' },
      { number: '02', title: 'Provide information', description: 'Submit the applicant, sponsor and institutional information required for assessment.' },
      { number: '03', title: 'Review and structure', description: 'Eligible requests are reviewed for an appropriate funding and repayment structure.' },
      { number: '04', title: 'Document and proceed', description: 'Approved engagements move forward only after the relevant terms and obligations are documented.' },
    ],
    requirements: [
      'Applicant and sponsor identification information where applicable',
      'Programme, institution or education-provider details',
      'Evidence of the relevant fee or financial obligation',
      'Income, affordability or sponsor information requested during review',
      'Any additional documentation required for the specific application',
    ],
    considerations: [
      'An enquiry or application does not constitute an approval or funding commitment.',
      'Availability, amount and repayment structure depend on assessment and documentation.',
      'Applicants should understand the full repayment obligation before proceeding.',
    ],
    faqs: [
      { question: 'Can I enquire before I have every document?', answer: 'Yes. You can begin with the core information available. The review team can then explain what additional documentation is needed before an assessment can be completed.' },
      { question: 'Does submitting an application guarantee funding?', answer: 'No. Every request remains subject to eligibility review, documentation, affordability considerations and formal approval.' },
      { question: 'Can a parent, guardian or sponsor support the application?', answer: 'Where appropriate, the application can include sponsor information so the overall funding and repayment position can be considered.' },
    ],
    disclosure:
      'Education financing is subject to eligibility, assessment, documentation and approval. Final terms, repayment obligations and any applicable charges should be reviewed carefully before acceptance.',
  },
  'travel-financing': {
    slug: 'travel-financing',
    eyebrow: 'Travel Financing',
    title: 'Plan approved travel commitments with greater financial clarity.',
    tagline: 'Structured support for eligible travel-related expenses and defined travel objectives.',
    description:
      'For eligible clients with a genuine, documented travel requirement, Travel Financing provides a structured enquiry and assessment process around the expected cost, timing and repayment responsibility.',
    audience: [
      'Individuals with a defined and documentable travel objective',
      'Professionals and families planning eligible travel-related commitments',
      'Applicants who can demonstrate the purpose, timeline and expected cost of the trip',
    ],
    supportAreas: [
      { title: 'Travel costs', description: 'Consideration of eligible travel expenses tied to a clearly defined trip.' },
      { title: 'Booking commitments', description: 'Support may be assessed around approved booking or reservation obligations.' },
      { title: 'Professional travel', description: 'Eligible work, training or professional travel requirements may be considered.' },
      { title: 'Family travel planning', description: 'Structured consideration for qualifying family travel commitments.' },
    ],
    process: [
      { number: '01', title: 'Define the trip', description: 'Tell us the travel purpose, expected timing and estimated financial requirement.' },
      { number: '02', title: 'Share supporting details', description: 'Provide the information needed to understand the applicant and the travel commitment.' },
      { number: '03', title: 'Assessment', description: 'The request is reviewed alongside affordability, timing and documentation.' },
      { number: '04', title: 'Document the arrangement', description: 'Approved requests proceed only after the relevant terms and repayment obligations are clearly documented.' },
    ],
    requirements: [
      'Applicant identification and contact information',
      'Travel purpose and anticipated travel date',
      'Estimated travel requirement and supporting cost information',
      'Income or affordability information requested during assessment',
      'Additional documentation relevant to the purpose of travel',
    ],
    considerations: [
      'Travel arrangements should not be treated as funded until formal approval is completed.',
      'Assessment may consider timing, affordability and the quality of supporting information.',
      'Final facility terms may differ from the amount initially requested.',
    ],
    faqs: [
      { question: 'Should I make non-refundable travel commitments before approval?', answer: 'You should avoid assuming funding is available until the application has been formally assessed and approved.' },
      { question: 'What travel purposes can be considered?', answer: 'The team can review a range of genuine travel purposes. The specific eligibility and required evidence depend on the nature of the trip.' },
      { question: 'Can I enquire before all bookings are confirmed?', answer: 'Yes. An initial enquiry can establish the likely information and documentation required before a full assessment.' },
    ],
    disclosure:
      'Travel financing is subject to eligibility, assessment, documentation and approval. Applicants remain responsible for understanding booking terms, travel requirements and the repayment obligations associated with any approved facility.',
  },
  'business-financing': {
    slug: 'business-financing',
    legacyCmsSlug: 'business-financing',
    eyebrow: 'Business Financing',
    title: 'Capital structured around genuine commercial requirements.',
    tagline: 'Working-capital and commercial financing for eligible operating businesses.',
    description:
      'Business Financing is designed for established or verifiable enterprises seeking structured support for working capital, inventory, operating requirements or clearly defined growth activity.',
    audience: [
      'Operating businesses with a clear commercial funding objective',
      'Owners and authorised representatives able to provide business information',
      'Enterprises with verifiable activity, cash flow or contractual evidence',
    ],
    supportAreas: [
      { title: 'Working capital', description: 'Support for eligible short-term operating and cash-flow requirements.' },
      { title: 'Inventory and supply', description: 'Structured consideration for qualifying inventory or supply-cycle needs.' },
      { title: 'Commercial assets', description: 'Assessment of eligible business equipment or operating-asset requirements.' },
      { title: 'Contract execution', description: 'Consideration of verifiable commercial obligations with a defined source of repayment.' },
    ],
    process: [
      { number: '01', title: 'Explain the requirement', description: 'Provide the business profile, purpose of funding and requested timeframe.' },
      { number: '02', title: 'Share business information', description: 'Submit the operating, ownership and financial information relevant to the request.' },
      { number: '03', title: 'Commercial review', description: 'The request is assessed in the context of cash flow, purpose, repayment capacity and supporting evidence.' },
      { number: '04', title: 'Agree and document', description: 'Approved facilities proceed under clearly documented terms, conditions and repayment obligations.' },
    ],
    requirements: [
      'Business registration or equivalent legal-entity information',
      'Authorised applicant and ownership information',
      'Recent financial, banking or turnover evidence requested for review',
      'Documentation supporting the use of funds where relevant',
      'Any contract, invoice or commercial evidence applicable to the request',
    ],
    considerations: [
      'The amount requested should reflect a clear commercial purpose and repayment source.',
      'Business financing is not approved solely on the basis of projected growth.',
      'Additional information may be requested where the transaction or business structure requires it.',
    ],
    faqs: [
      { question: 'What should I prepare before starting?', answer: 'A concise explanation of the business, the funding purpose, the requested amount or range, and recent information that helps demonstrate operating activity and repayment capacity.' },
      { question: 'Can contract or invoice requirements be discussed?', answer: 'Yes. Where the commercial obligation is verifiable, the team can review the structure and explain the information required for assessment.' },
      { question: 'Does an application affect my existing business operations?', answer: 'The application process is an assessment only. Any approved facility will be governed by its final documented terms.' },
    ],
    disclosure:
      'Business financing is subject to eligibility, commercial assessment, documentation and approval. Applicants should assess affordability, cash-flow impact and all contractual obligations before accepting a facility.',
  },
  'personal-finance': {
    slug: 'personal-finance',
    legacyCmsSlug: 'personal-finance',
    eyebrow: 'Personal Finance',
    title: 'Structured support for genuine personal financial commitments.',
    tagline: 'Responsible financing for eligible individuals with a defined purpose and repayment plan.',
    description:
      'Personal Finance supports eligible clients who need a disciplined way to manage an important financial requirement, with clear documentation and a repayment structure considered against affordability.',
    audience: [
      'Professionals and eligible individuals with a defined financial need',
      'Applicants with verifiable income or a clear repayment source',
      'Clients seeking a structured alternative to an unplanned financial obligation',
    ],
    supportAreas: [
      { title: 'Planned personal commitments', description: 'Eligible obligations with a clear purpose, amount and timeframe.' },
      { title: 'Short-term liquidity', description: 'Structured consideration for qualifying temporary liquidity needs.' },
      { title: 'Professional expenses', description: 'Eligible professional or career-related commitments may be considered.' },
      { title: 'Family obligations', description: 'Assessment of genuine family financial commitments where appropriate.' },
    ],
    process: [
      { number: '01', title: 'Describe the need', description: 'Share the purpose, amount or range and timeframe of the financial requirement.' },
      { number: '02', title: 'Provide applicant information', description: 'Supply the identification, income and supporting information requested for review.' },
      { number: '03', title: 'Affordability review', description: 'The request is considered against the applicant profile and proposed repayment responsibility.' },
      { number: '04', title: 'Review final terms', description: 'Approved applications proceed only after the terms and obligations are clearly documented and accepted.' },
    ],
    requirements: [
      'Applicant identification and contact information',
      'Employment, income or repayment-source information',
      'Purpose and estimated amount of the financial requirement',
      'Supporting information requested for affordability review',
      'Any additional documentation relevant to the specific request',
    ],
    considerations: [
      'Borrow only for a clear need and within a repayment obligation you understand.',
      'An initial requested amount may be adjusted after assessment.',
      'Approval remains subject to eligibility, documentation and affordability review.',
    ],
    faqs: [
      { question: 'Can I start with an estimated amount?', answer: 'Yes. You can begin with an estimated range. The final amount, if any, is determined only after the application has been reviewed.' },
      { question: 'Will I know the repayment obligation before accepting?', answer: 'Yes. Any approved arrangement should be documented so you can review the applicable terms and obligations before proceeding.' },
      { question: 'Can self-employed applicants enquire?', answer: 'Yes. The relevant proof of income or repayment capacity may differ depending on the applicant profile.' },
    ],
    disclosure:
      'Personal financing is subject to eligibility, affordability assessment, documentation and approval. Clients should review the complete terms and ensure repayment obligations are appropriate for their circumstances before acceptance.',
  },
  'investment-services': {
    slug: 'investment-services',
    legacyCmsSlug: 'investments',
    eyebrow: 'Investment Services',
    title: 'Investment conversations built around objective, horizon and risk.',
    tagline: 'Structured investment support for clients seeking a disciplined and documented approach.',
    description:
      'Investment Services begins with the client objective rather than a headline return. The process is designed to clarify time horizon, liquidity needs, relevant risks and the structure of any investment opportunity before a decision is made.',
    audience: [
      'Individuals and organisations with a defined investment objective',
      'Clients seeking a structured discussion around horizon and liquidity needs',
      'Investors prepared to review relevant documentation, terms and risk considerations',
    ],
    supportAreas: [
      { title: 'Investment objective review', description: 'Clarify the purpose of the capital, intended horizon and key constraints.' },
      { title: 'Structured opportunities', description: 'Discuss opportunities that can be explained through documented terms and conditions.' },
      { title: 'Liquidity planning', description: 'Consider expected access to capital alongside the investment horizon.' },
      { title: 'Ongoing communication', description: 'Maintain professional communication throughout an active investment relationship.' },
    ],
    process: [
      { number: '01', title: 'Define the objective', description: 'Start with the purpose of the investment, expected horizon and liquidity expectations.' },
      { number: '02', title: 'Understand suitability', description: 'Discuss the client context, relevant constraints and the information required before proceeding.' },
      { number: '03', title: 'Review the structure', description: 'Consider the documented terms, material risks, time horizon and obligations of the opportunity.' },
      { number: '04', title: 'Make an informed decision', description: 'Proceed only after the relevant information has been reviewed and the client is comfortable with the documented arrangement.' },
    ],
    requirements: [
      'Client identification and contact information',
      'Investment objective and intended time horizon',
      'Indicative investment amount or range',
      'Liquidity expectations and relevant financial considerations',
      'Any additional information required for the specific investment discussion',
    ],
    considerations: [
      'Investment values and outcomes can vary; capital may be at risk depending on the structure.',
      'Past performance, where referenced, should not be treated as a guarantee of future results.',
      'Clients should review all material terms, risks and liquidity restrictions before making an investment decision.',
    ],
    faqs: [
      { question: 'Do you guarantee investment returns?', answer: 'No. Investment decisions involve risk and no responsible investment discussion should be based on a guaranteed outcome unless a specific contractual obligation legally provides otherwise.' },
      { question: 'What should I know before an investment discussion?', answer: 'It helps to know your objective, expected horizon, likely liquidity needs and the amount or range of capital you are considering.' },
      { question: 'Is an enquiry the same as committing capital?', answer: 'No. An enquiry begins a conversation. Any commitment should occur only after the relevant documentation and material considerations have been reviewed.' },
    ],
    disclosure:
      'Investment information on this website is general in nature and does not constitute a guarantee of performance or a personalised recommendation. Investment values can change and capital may be at risk. Review the applicable documentation and obtain independent professional advice where appropriate.',
  },
};

export const canonicalServiceSlugs = Object.keys(serviceArchitectures);
