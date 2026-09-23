export type ServiceType = 
  | 'student_loan'
  | 'investment'
  | 'personal_finance'
  | 'business_financing'
  | 'other_services';

export interface ServiceItem {
  id: ServiceType;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  ctaLabel: string;
  targetAudience: string;
}

export interface ApplicationFormData {
  fullName: string;
  phone: string;
  email: string;
  service: ServiceType;
  amount: string;
  institutionOrBusiness: string;
  message: string;
}
