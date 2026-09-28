import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Body parsing with support for media uploads
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// CORS and Preflight Request Handling (vital for iframes and cross-origin admin requests)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Static uploads route
// On Vercel's read-only filesystem, only /tmp is writable, and even that does
// not persist between invocations or across function instances. Uploaded
// files (e.g. an admin-uploaded logo) will therefore work within a single
// warm request but are not a durable production storage layer on Vercel —
// see the deployment notes in README for a persistent alternative.
const UPLOADS_DIR = process.env.VERCEL
  ? path.join('/tmp', 'emunahh-uploads')
  : path.join(__dirname, 'data', 'uploads');
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (err) {
  console.error('Could not create uploads directory (non-fatal):', err);
}
app.use('/uploads', express.static(UPLOADS_DIR));

// DB Persistence File
// Same caveat as UPLOADS_DIR above: /tmp on Vercel is not durable storage.
const DB_FILE = process.env.VERCEL
  ? path.join('/tmp', 'emunahh_db.json')
  : path.join(__dirname, 'data', 'emunahh_db.json');

// Types
export interface ServiceRecord {
  id: string;
  slug: string;
  title: string;
  category: 'featured' | 'supporting';
  tagline: string;
  description: string;
  bullets: string[];
  imageUrl?: string;
  isPublished: boolean;
  order: number;
}

export interface StudentLoanEnquiry {
  id: string;
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  course: string;
  purpose: string;
  amount: string;
  message?: string;
  status: 'NEW' | 'CONTACTED' | 'IN PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
}

export interface InvestmentEnquiry {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  investmentInterest: string;
  amount?: string;
  message?: string;
  status: 'NEW' | 'CONTACTED' | 'IN PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'IN PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
}

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  body: string;
  enquiryId?: string;
  enquiryType?: string;
  sentAt: string;
  status: 'SENT' | 'DELIVERED' | 'FAILED';
  senderName: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  title: string;
  size?: number;
  uploadedAt: string;
  category: 'hero' | 'service' | 'about' | 'general';
}

export interface SiteContent {
  hero: {
    eyebrow: string;
    heading: string;
    highlightWord: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    imageUrl: string;
  };
  about: {
    title: string;
    headline: string;
    intro: string;
    secondaryIntro: string;
    mission: string;
    vision: string;
    values: Array<{ title: string; desc: string }>;
  };
  investment: {
    heading: string;
    tagline: string;
    description: string;
  };
  studentLoans: {
    heading: string;
    tagline: string;
    description: string;
  };
  contact: {
    officeAddress: string;
    phone: string;
    secondaryPhone: string;
    email: string;
    whatsapp: string;
    hours: string;
    socialTwitter?: string;
    socialLinkedIn?: string;
  };
  footer: {
    statement: string;
  };
}

export interface SiteSettings {
  companyName: string;
  companyEmail: string;
  notificationEmail: string;
  phone: string;
  secondaryPhone: string;
  whatsapp: string;
  officeAddress: string;
  emailSenderName: string;
  replyToEmail: string;
  websiteUrl: string;
  logoUrl: string;
}

interface DatabaseSchema {
  siteContent: SiteContent;
  services: ServiceRecord[];
  studentLoanEnquiries: StudentLoanEnquiry[];
  investmentEnquiries: InvestmentEnquiry[];
  contactMessages: ContactMessage[];
  emailLogs: EmailLog[];
  media: MediaItem[];
  settings: SiteSettings;
}

// Initial Database Seeding
const initialData: DatabaseSchema = {
  siteContent: {
    hero: {
      eyebrow: 'EMUNAHH-INVEST LIMITED',
      heading: 'Financial Solutions Designed for Your Next Chapter.',
      highlightWord: 'Next Chapter.',
      description: 'Practical financial solutions designed to support students, individuals and businesses in achieving meaningful financial goals.',
      primaryCta: 'EXPLORE OUR SOLUTIONS',
      secondaryCta: 'GET STARTED',
      imageUrl: '/src/assets/images/nigerian_professional_hero_1790151218863.webp',
    },
    about: {
      title: 'CORPORATE HERITAGE & DISCIPLINE',
      headline: 'An Established Financial Institution Founded on Integrity and Accessibility',
      intro: 'Emunahh-Invest Limited is a registered Nigerian financial and investment company headquartered in Lagos. Founded on the core conviction that finance should be clear, accountable, and accessible, we bridge critical funding gaps for students, disciplined professionals, and growing commercial enterprises.',
      secondaryIntro: 'Unlike speculative operations or predatory instant-app lenders, we provide human-centered, structured facilities with legally executed terms, direct institutional settlements, and transparent repayment schedules.',
      mission: 'To deliver transparent, dependable education financing and disciplined wealth solutions that accelerate academic excellence and commercial progress across Nigeria.',
      vision: 'To be recognized across Nigeria as the premier trusted private finance house, distinguished by transformative education loans and sound commercial support.',
      values: [
        { title: 'Transparency', desc: 'Every repayment schedule and contractual covenant is formalized in clear terms with zero hidden fees.' },
        { title: 'Professionalism', desc: 'Rigorous institutional underwriting standards and capital preservation disciplines across all portfolios.' },
        { title: 'Accessibility', desc: 'Direct-to-institution disbursements and responsive advisory support designed to serve real-world timelines.' },
        { title: 'Customer Focus', desc: 'Long-term partnership built around student academic matriculation, personal stability, and enterprise growth.' },
      ],
    },
    investment: {
      heading: 'GROW WITH PURPOSE.',
      tagline: 'Capital Preservation Mandate',
      description: 'Structured wealth allocation designed for corporate treasuries, Nigerian professionals, and diaspora investors seeking reliable home-country deployment without speculative volatility.',
    },
    studentLoans: {
      heading: 'YOUR EDUCATION IS AN INVESTMENT IN YOUR FUTURE.',
      tagline: 'Tuition Protection Facility',
      description: 'Direct institutional tuition remittance for accredited Nigerian universities, postgraduate programs, and professional exam bodies—ensuring studies continue without disruption.',
    },
    contact: {
      officeAddress: '33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.',
      phone: '+234 802 319 0807',
      secondaryPhone: '+234 817 917 1456',
      email: 'contact@emunahhinvest.com',
      whatsapp: '0802 319 0807',
      hours: 'Monday – Friday: 8:30 AM – 5:00 PM (WAT)',
      socialTwitter: 'https://twitter.com/emunahhinvest',
      socialLinkedIn: 'https://linkedin.com/company/emunahh-invest',
    },
    footer: {
      statement: 'Emunahh-Invest Limited is an incorporated financial and investment company in the Federal Republic of Nigeria, dedicated to ethical credit, student advancement, and sound asset deployment.',
    },
  },
  services: [
    {
      id: 'srv-1',
      slug: 'student-loans',
      title: 'Student Loans / Education Financing',
      category: 'featured',
      tagline: 'Direct Tuition Support for Nigerian Scholars',
      description: 'Structured tuition financing remitted directly to accredited tertiary institutions, law schools, and professional exam bodies with predictable sponsor amortization.',
      bullets: [
        'Direct institutional tuition remittance to school bank accounts',
        'Predictable monthly sponsor amortizations with grace periods',
        'Coverage across accredited federal, state, and private universities',
        'Applicable for Nigerian Law School, ICAN, and postgraduate courses',
      ],
      imageUrl: '/src/assets/images/nigerian_graduate_success_1790142702336.webp',
      isPublished: true,
      order: 1,
    },
    {
      id: 'srv-2',
      slug: 'investments',
      title: 'Investment Services',
      category: 'supporting',
      tagline: 'Capital Preservation & Wealth Advisory',
      description: 'Disciplined wealth placements anchored on real-economy productive assets, formalized legal contracts, and zero speculative crypto or forex exposure.',
      bullets: [
        'Principal protection mandate on productive commercial assets',
        'Goal-aligned tenures (6, 12, and 24-month horizon placements)',
        'Fully formalized legal contracts and regulatory governance',
      ],
      imageUrl: '/src/assets/images/african_investment_meeting_1790151240660.webp',
      isPublished: true,
      order: 2,
    },
    {
      id: 'srv-3',
      slug: 'business-financing',
      title: 'Business Financing',
      category: 'supporting',
      tagline: 'Working Capital for Verified Enterprises',
      description: 'Commercial credit underwritten on verifiable bank statement turnover and inventory velocity rather than prohibitive property collateral.',
      bullets: [
        'Merchant inventory restocking and supply cycle financing',
        'Revolving operational working capital for established SMEs',
        'Practical underwriting based on verifiable commercial flow',
      ],
      imageUrl: '/src/assets/images/lagos_commercial_enterprise_1790142716551.webp',
      isPublished: true,
      order: 3,
    },
    {
      id: 'srv-4',
      slug: 'personal-finance',
      title: 'Personal Financial Solutions',
      category: 'supporting',
      tagline: 'Salary-Backed Liquidity Lines',
      description: 'Transparent personal facilities engineered for verified corporate professionals to meet milestone commitments without compounding surprises.',
      bullets: [
        'Salary-backed liquidity lines for verified employees',
        'Transparent milestone repayment schedules in plain terms',
        'No invasive automated data scraping or arbitrary charges',
      ],
      imageUrl: '/src/assets/images/lagos_financial_hq_1790142688340.webp',
      isPublished: true,
      order: 4,
    },
  ],
  studentLoanEnquiries: [
    {
      id: 'enq-sl-1',
      reference: 'EMU-SL-100201',
      fullName: 'Chidera Okafor',
      email: 'c.okafor@example.edu.ng',
      phone: '+234 817 917 1456',
      institution: 'University of Lagos (UNILAG)',
      course: 'B.Sc. Economics (Final Year)',
      purpose: 'Final session tuition fee and faculty clearance.',
      amount: '₦450,000',
      message: 'Need prompt settlement before course registration portal closes.',
      status: 'NEW',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'enq-sl-2',
      reference: 'EMU-SL-100202',
      fullName: 'Amina Bello',
      email: 'amina.bello@example.com',
      phone: '+234 803 445 9912',
      institution: 'Nigerian Law School (Bwari, Abuja)',
      course: 'Bar Part II Vocational Training',
      purpose: 'Bar school hostel accommodation and academic syllabus tuition.',
      amount: '₦1,200,000',
      message: 'Sponsor is a civil servant with verified salary payroll statements.',
      status: 'CONTACTED',
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
  ],
  investmentEnquiries: [
    {
      id: 'enq-inv-1',
      reference: 'EMU-INV-300101',
      name: 'Dr. Adeyemi Olukoya',
      email: 'adeyemi.olukoya@example.com',
      phone: '+234 802 888 1234',
      investmentInterest: 'Fixed Wealth Placement (12 Months)',
      amount: '₦15,000,000',
      message: 'Seeking corporate treasury placement for medical practice reserve funds with capital preservation focus.',
      status: 'IN PROGRESS',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  ],
  contactMessages: [
    {
      id: 'msg-101',
      reference: 'EMU-MSG-5001',
      name: 'Folashade Adeleke',
      email: 'f.adeleke@example.com',
      phone: '+234 809 112 3344',
      service: 'General Advisory',
      message: 'Would like to visit the Lagos office on Friday regarding education financing requirements for my daughter.',
      status: 'RESOLVED',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
  ],
  emailLogs: [
    {
      id: 'eml-1',
      to: 'c.okafor@example.edu.ng',
      subject: 'Acknowledgment: Student Loan Application EMU-SL-100201',
      body: 'Dear Chidera, thank you for submitting your student loan enquiry. Our Lagos education desk has received your invoice details.',
      enquiryId: 'enq-sl-1',
      enquiryType: 'Student Loan',
      sentAt: new Date(Date.now() - 3600000).toISOString(),
      status: 'DELIVERED',
      senderName: 'Emunahh-Invest Advisory Desk',
    },
  ],
  media: [
    {
      id: 'med-1',
      filename: 'nigerian_professional_hero_1790151218863.webp',
      url: '/src/assets/images/nigerian_professional_hero_1790151218863.webp',
      title: 'Hero Professional Executive',
      uploadedAt: new Date().toISOString(),
      category: 'hero',
    },
    {
      id: 'med-2',
      filename: 'nigerian_graduate_success_1790142702336.webp',
      url: '/src/assets/images/nigerian_graduate_success_1790142702336.webp',
      title: 'Student Loan Graduation Success',
      uploadedAt: new Date().toISOString(),
      category: 'service',
    },
    {
      id: 'med-3',
      filename: 'african_investment_meeting_1790151240660.webp',
      url: '/src/assets/images/african_investment_meeting_1790151240660.webp',
      title: 'Investment Advisory Boardroom',
      uploadedAt: new Date().toISOString(),
      category: 'about',
    },
  ],
  settings: {
    companyName: 'Emunahh-Invest Limited',
    companyEmail: 'contact@emunahhinvest.com',
    notificationEmail: 'sescowemp@gmail.com',
    phone: '+234 802 319 0807',
    secondaryPhone: '+234 817 917 1456',
    whatsapp: '0802 319 0807',
    officeAddress: '33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.',
    emailSenderName: 'Emunahh-Invest Advisory Desk',
    replyToEmail: 'contact@emunahhinvest.com',
    websiteUrl: 'https://emunahhinvest.com',
    logoUrl: '',
  },
};

// Database Loader & Persister
function loadDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      return {
        ...initialData,
        ...parsed,
        siteContent: { ...initialData.siteContent, ...(parsed.siteContent || {}) },
        settings: { ...initialData.settings, ...(parsed.settings || {}) },
      };
    }
  } catch (err) {
    console.error('Error loading DB file, falling back to initial data:', err);
  }
  saveDb(initialData);
  return initialData;
}

function saveDb(data: DatabaseSchema): void {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving DB file:', err);
  }
}

// In-memory active DB instance
let db: DatabaseSchema = loadDb();

// Admin Authentication Middleware
// Supabase Auth owns credentials and sessions. This API only verifies the
// presented Supabase access token and checks the protected profiles.role.
async function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || '';
  const secretKey = process.env.SUPABASE_SECRET_KEY || '';

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. A valid Supabase session is required.' });
  }
  if (!supabaseUrl || !publishableKey || !secretKey) {
    return res.status(503).json({ error: 'Supabase server authentication is not configured.' });
  }

  const accessToken = authHeader.slice('Bearer '.length).trim();
  try {
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: publishableKey, Authorization: `Bearer ${accessToken}` },
    });
    if (!userResponse.ok) {
      return res.status(401).json({ error: 'Your administrator session is invalid or expired.' });
    }

    const authUser = await userResponse.json() as { id: string; email?: string; user_metadata?: Record<string, unknown> };
    const profileResponse = await fetch(
      `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(authUser.id)}&select=role,full_name`,
      { headers: { apikey: secretKey, Authorization: `Bearer ${secretKey}` } },
    );

    if (!profileResponse.ok) {
      return res.status(503).json({ error: 'Unable to verify administrator permissions.' });
    }

    const profiles = await profileResponse.json() as Array<{ role?: string; full_name?: string | null }>;
    const profile = profiles[0];
    if (!['super_admin','admin'].includes(profile?.role || '')) {
      return res.status(403).json({ error: 'This account is not authorized for the administrator portal.' });
    }

    (req as Request & { adminUser?: { id: string; email?: string; full_name?: string | null } }).adminUser = {
      id: authUser.id,
      email: authUser.email,
      full_name: profile.full_name || null,
    };
    return next();
  } catch (error) {
    console.error('[Supabase Admin Auth]', error);
    return res.status(503).json({ error: 'Unable to verify the administrator session.' });
  }
}

// Resend Email Dispatch Helper
async function dispatchEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `${db.settings.emailSenderName} <onboarding@resend.dev>`,
          to: [to],
          reply_to: db.settings.replyToEmail,
          subject,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Resend Error]', errorText);
        return false;
      }
      return true;
    } catch (err) {
      console.error('[Resend Network Error]', err);
      return false;
    }
  } else {
    // In dev / unconfigured mode: Simulate successful email dispatch and log cleanly
    console.log(`[Email Dispatch Simulation]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${htmlContent.replace(/<[^>]*>/g, '')}`);
    return true;
  }
}

// Send Admin Notification Helper
async function notifyAdminNewEnquiry(type: string, ref: string, name: string, phone: string, details: string) {
  const adminEmail = db.settings.notificationEmail || 'sescowemp@gmail.com';
  const subject = `New ${type} Enquiry — ${ref} (${name})`;
  const html = `
    <div style="font-family: Arial, sans-serif; color: #17202A; line-height: 1.6; max-width: 600px; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
      <h2 style="color: #e7020b; margin-top: 0;">EMUNAHH-INVEST LIMITED</h2>
      <h3 style="color: #0d0a64;">New ${type} Submission Received</h3>
      <p>A new enquiry was just submitted through the public portal:</p>
      <ul>
        <li><strong>Reference:</strong> ${ref}</li>
        <li><strong>Full Name:</strong> ${name}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Details:</strong> ${details}</li>
        <li><strong>Timestamp:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' })} WAT</li>
      </ul>
      <p>Log in to the <a href="${db.settings.websiteUrl}/admin" style="color: #e7020b; font-weight: bold;">Admin Portal</a> to review and reply directly.</p>
    </div>
  `;

  await dispatchEmail(adminEmail, subject, html);
}

// ==========================================
// PUBLIC API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    institution: db.settings.companyName,
    location: db.settings.officeAddress,
    timestamp: new Date().toISOString(),
  });
});

// Get Public Site Content
app.get('/api/content', (req: Request, res: Response) => {
  res.json({
    success: true,
    content: db.siteContent,
  });
});

// Get Published Services
app.get('/api/services', (req: Request, res: Response) => {
  const activeServices = db.services
    .filter((s) => s.isPublished)
    .sort((a, b) => a.order - b.order);
  res.json({
    success: true,
    services: activeServices,
  });
});

// Get Public Settings
app.get('/api/settings', (req: Request, res: Response) => {
  const { companyName, companyEmail, phone, secondaryPhone, whatsapp, officeAddress, websiteUrl, logoUrl } = db.settings;
  res.json({
    companyName,
    companyEmail,
    phone,
    secondaryPhone,
    whatsapp,
    officeAddress,
    websiteUrl,
    logoUrl,
  });
});

// Public Student Loan Submission
app.post('/api/enquiries/student-loans', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, institution, course, purpose, amount, message } = req.body;

    if (!fullName || !phone || !institution) {
      return res.status(400).json({ error: 'Full name, phone, and tertiary institution are required.' });
    }

    const reference = `EMU-SL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newEnquiry: StudentLoanEnquiry = {
      id: `enq-sl-${Date.now()}`,
      reference,
      fullName,
      email: email || '',
      phone,
      institution,
      course: course || 'General Programme',
      purpose: purpose || 'Tuition & Registration',
      amount: amount || 'Underwriting Review',
      message: message || '',
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    db.studentLoanEnquiries.unshift(newEnquiry);
    saveDb(db);

    // Notify Admin
    notifyAdminNewEnquiry('Student Loan', reference, fullName, phone, `${institution} — ${course} (${amount || 'Tuition'})`);

    // Acknowledge to student if email provided
    if (email) {
      const studentAckHtml = `
        <div style="font-family: Arial, sans-serif; color: #17202A; line-height: 1.6; max-width: 600px; padding: 20px;">
          <h2 style="color: #e7020b;">EMUNAHH-INVEST LIMITED</h2>
          <p>Dear ${fullName},</p>
          <p>We have received your Student Loan enquiry for <strong>${institution}</strong> (Reference: <strong>${reference}</strong>).</p>
          <p>Our Lagos educational finance desk will review your submission and contact you via phone/WhatsApp within standard business hours.</p>
          <p>Direct Desk: +234 802 319 0807 | 33, Crossway Plaza, New Oko Oba, Lagos.</p>
        </div>
      `;
      dispatchEmail(email, `Application Acknowledgment: ${reference} — Emunahh-Invest Limited`, studentAckHtml);
    }

    return res.status(201).json({
      success: true,
      message: 'Student loan enquiry registered successfully.',
      reference,
      enquiry: newEnquiry,
    });
  } catch (err) {
    console.error('Student loan submission error:', err);
    return res.status(500).json({ error: 'Server error processing student loan enquiry.' });
  }
});

// Public Investment Enquiry Submission
app.post('/api/enquiries/investments', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, investmentInterest, amount, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Full name and telephone number are required.' });
    }

    const reference = `EMU-INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const newEnquiry: InvestmentEnquiry = {
      id: `enq-inv-${Date.now()}`,
      reference,
      name,
      email: email || '',
      phone,
      investmentInterest: investmentInterest || 'Wealth Management & Placements',
      amount: amount || '',
      message: message || '',
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    db.investmentEnquiries.unshift(newEnquiry);
    saveDb(db);

    // Notify Admin
    notifyAdminNewEnquiry('Investment', reference, name, phone, `${investmentInterest} (${amount || 'Bespoke'})`);

    return res.status(201).json({
      success: true,
      message: 'Investment inquiry registered successfully.',
      reference,
      enquiry: newEnquiry,
    });
  } catch (err) {
    console.error('Investment submission error:', err);
    return res.status(500).json({ error: 'Server error processing investment inquiry.' });
  }
});

// Public General Contact Message
app.post('/api/enquiries/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Name, phone, and message content are required.' });
    }

    const reference = `EMU-MSG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      reference,
      name,
      email: email || '',
      phone,
      service: service || 'General Advisory',
      message,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    db.contactMessages.unshift(newMsg);
    saveDb(db);

    // Notify Admin
    notifyAdminNewEnquiry('Contact Message', reference, name, phone, message);

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received by the Lagos advisory desk.',
      reference,
    });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ error: 'Server error processing contact message.' });
  }
});

// Legacy backward-compatible application endpoint
app.post('/api/applications', (req: Request, res: Response) => {
  const { service, fullName, phone, email, amount, institutionOrBusiness, details } = req.body;
  if (!fullName || !phone) {
    return res.status(400).json({ error: 'Full name and phone number are required.' });
  }

  const reference = `EMU-${Math.floor(100000 + Math.random() * 900000)}`;
  const record: StudentLoanEnquiry = {
    id: `enq-sl-${Date.now()}`,
    reference,
    fullName,
    phone,
    email: email || '',
    institution: institutionOrBusiness || 'Direct Application',
    course: service || 'General',
    purpose: details || '',
    amount: amount || '',
    status: 'NEW',
    createdAt: new Date().toISOString(),
  };

  db.studentLoanEnquiries.unshift(record);
  saveDb(db);

  return res.status(201).json({
    success: true,
    message: 'Application registered successfully.',
    reference,
    record,
  });
});

// Lookup Application Reference
app.get('/api/applications/:ref', (req: Request, res: Response) => {
  const ref = req.params.ref.toUpperCase();
  const loan = db.studentLoanEnquiries.find((e) => e.reference.toUpperCase() === ref);
  const inv = db.investmentEnquiries.find((e) => e.reference.toUpperCase() === ref);
  const contact = db.contactMessages.find((e) => e.reference.toUpperCase() === ref);

  const foundRecord = loan || inv || contact;
  if (!foundRecord) {
    return res.status(404).json({
      found: false,
      error: 'Reference not found. Please verify your reference number or contact our Lagos desk.',
    });
  }

  return res.json({
    found: true,
    application: foundRecord,
  });
});

// ==========================================
// ADMIN AUTH & MANAGEMENT ROUTES
// ==========================================

// Admin Login
app.post('/api/admin/login', (_req: Request, res: Response) => {
  return res.status(410).json({ error: 'Legacy admin login is disabled. Authenticate with Supabase Auth.' });
});

// One-time administrator bootstrap.
// During the initial deployment only, the first authenticated user is promoted
// to admin when no administrator profile exists. After an admin profile exists,
// no automatic promotion can occur.
app.post('/api/admin/bootstrap', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || '';
  const secretKey = process.env.SUPABASE_SECRET_KEY || '';

  if (!authHeader?.startsWith('Bearer ') || !supabaseUrl || !publishableKey || !secretKey) {
    return res.status(403).json({ error: 'Administrator bootstrap is not available.' });
  }

  try {
    const accessToken = authHeader.slice('Bearer '.length).trim();
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: publishableKey, Authorization: `Bearer ${accessToken}` },
    });
    if (!userResponse.ok) return res.status(401).json({ error: 'Invalid Supabase session.' });

    const user = await userResponse.json() as { id: string; email?: string };

    const adminCheck = await fetch(
      `${supabaseUrl}/rest/v1/profiles?role=eq.admin&select=id&limit=1`,
      { headers: { apikey: secretKey, Authorization: `Bearer ${secretKey}` } },
    );
    if (!adminCheck.ok) return res.status(502).json({ error: 'Unable to verify administrator bootstrap state.' });

    const admins = await adminCheck.json() as Array<{ id: string }>;
    if (admins.length > 0) {
      return res.status(403).json({ error: 'An administrator already exists.' });
    }

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({ id: user.id, role: 'admin' }),
    });

    if (!insertResponse.ok) {
      const details = await insertResponse.text();
      console.error('[Admin Bootstrap]', details);
      return res.status(502).json({ error: 'Unable to create the administrator profile.' });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error('[Admin Bootstrap]', error);
    return res.status(500).json({ error: 'Administrator bootstrap failed.' });
  }
});

// Verify Current Admin
app.get('/api/admin/me', authenticateAdmin, (req: Request, res: Response) => {
  res.json({
    authenticated: true,
    user: {
      email: (req as Request & { adminUser?: { email?: string } }).adminUser?.email || '',
      role: 'ADMIN',
      company: db.settings.companyName,
    },
  });
});

// Admin Logout
app.post('/api/admin/logout', authenticateAdmin, (_req: Request, res: Response) => {
  return res.json({ success: true });
});

// Admin Dashboard Overview Stats
app.get('/api/admin/stats', authenticateAdmin, (req: Request, res: Response) => {
  const newStudentLoans = db.studentLoanEnquiries.filter((e) => e.status === 'NEW').length;
  const newInvestments = db.investmentEnquiries.filter((e) => e.status === 'NEW').length;
  const newMessages = db.contactMessages.filter((e) => e.status === 'NEW').length;

  res.json({
    totalStudentLoans: db.studentLoanEnquiries.length,
    newStudentLoans,
    totalInvestments: db.investmentEnquiries.length,
    newInvestments,
    totalMessages: db.contactMessages.length,
    newMessages,
    totalEmailsSent: db.emailLogs.length,
    activeServices: db.services.filter((s) => s.isPublished).length,
    recentActivity: [
      ...db.studentLoanEnquiries.slice(0, 5).map((e) => ({
        type: 'Student Loan',
        ref: e.reference,
        name: e.fullName,
        date: e.createdAt,
        status: e.status,
      })),
      ...db.investmentEnquiries.slice(0, 5).map((e) => ({
        type: 'Investment',
        ref: e.reference,
        name: e.name,
        date: e.createdAt,
        status: e.status,
      })),
      ...db.contactMessages.slice(0, 5).map((e) => ({
        type: 'Contact Message',
        ref: e.reference,
        name: e.name,
        date: e.createdAt,
        status: e.status,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8),
  });
});

// Admin Site Content Management
app.get('/api/admin/content', authenticateAdmin, (req: Request, res: Response) => {
  res.json({ content: db.siteContent });
});

app.put('/api/admin/content', authenticateAdmin, (req: Request, res: Response) => {
  try {
    const updatedContent = req.body;
    db.siteContent = {
      ...db.siteContent,
      ...updatedContent,
    };
    saveDb(db);
    res.json({ success: true, message: 'Website content updated successfully.', content: db.siteContent });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update website content.' });
  }
});

// Admin Services Management
app.get('/api/admin/services', authenticateAdmin, (req: Request, res: Response) => {
  res.json({ services: db.services });
});

app.post('/api/admin/services', authenticateAdmin, (req: Request, res: Response) => {
  try {
    const { title, slug, category, tagline, description, bullets, imageUrl } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Service title and description are required.' });
    }

    const newService: ServiceRecord = {
      id: `srv-${Date.now()}`,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      category: category || 'supporting',
      tagline: tagline || '',
      description,
      bullets: Array.isArray(bullets) ? bullets : bullets ? bullets.split('\n').filter(Boolean) : [],
      imageUrl: imageUrl || '',
      isPublished: true,
      order: db.services.length + 1,
    };

    db.services.push(newService);
    saveDb(db);
    res.status(201).json({ success: true, service: newService });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service.' });
  }
});

app.put('/api/admin/services/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Service not found.' });
  }

  db.services[index] = {
    ...db.services[index],
    ...req.body,
  };
  saveDb(db);
  res.json({ success: true, service: db.services[index] });
});

app.delete('/api/admin/services/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  db.services = db.services.filter((s) => s.id !== id);
  saveDb(db);
  res.json({ success: true, message: 'Service removed.' });
});

// Admin Student Loan Enquiries Management
app.get('/api/admin/enquiries/student-loans', authenticateAdmin, (req: Request, res: Response) => {
  const { status, search } = req.query;
  let list = db.studentLoanEnquiries;

  if (status && status !== 'ALL') {
    list = list.filter((e) => e.status === status);
  }

  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(
      (e) =>
        e.fullName.toLowerCase().includes(q) ||
        e.reference.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.institution.toLowerCase().includes(q)
    );
  }

  res.json({ enquiries: list });
});

app.patch('/api/admin/enquiries/student-loans/:id/status', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const enquiry = db.studentLoanEnquiries.find((e) => e.id === id);
  if (!enquiry) {
    return res.status(404).json({ error: 'Enquiry record not found.' });
  }

  enquiry.status = status;
  saveDb(db);
  res.json({ success: true, enquiry });
});

// Admin Investment Enquiries Management
app.get('/api/admin/enquiries/investments', authenticateAdmin, (req: Request, res: Response) => {
  const { status, search } = req.query;
  let list = db.investmentEnquiries;

  if (status && status !== 'ALL') {
    list = list.filter((e) => e.status === status);
  }

  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.reference.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.investmentInterest.toLowerCase().includes(q)
    );
  }

  res.json({ enquiries: list });
});

app.patch('/api/admin/enquiries/investments/:id/status', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const enquiry = db.investmentEnquiries.find((e) => e.id === id);
  if (!enquiry) {
    return res.status(404).json({ error: 'Enquiry record not found.' });
  }

  enquiry.status = status;
  saveDb(db);
  res.json({ success: true, enquiry });
});

// Admin Contact Messages Management
app.get('/api/admin/enquiries/contact', authenticateAdmin, (req: Request, res: Response) => {
  const { status, search } = req.query;
  let list = db.contactMessages;

  if (status && status !== 'ALL') {
    list = list.filter((e) => e.status === status);
  }

  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.reference.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.message.toLowerCase().includes(q)
    );
  }

  res.json({ messages: list });
});

app.patch('/api/admin/enquiries/contact/:id/status', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const msg = db.contactMessages.find((m) => m.id === id);
  if (!msg) {
    return res.status(404).json({ error: 'Message record not found.' });
  }

  msg.status = status;
  saveDb(db);
  res.json({ success: true, message: msg });
});

// Admin Email Management
app.get('/api/admin/emails/logs', authenticateAdmin, (req: Request, res: Response) => {
  res.json({ logs: db.emailLogs });
});

app.post('/api/admin/emails/send', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { to, subject, body, enquiryId, enquiryType } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({ error: 'Recipient email, subject line, and message body are required.' });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; color: #17202A; line-height: 1.6; max-width: 600px; padding: 20px;">
        <h2 style="color: #e7020b; margin-top: 0;">EMUNAHH-INVEST LIMITED</h2>
        <div style="font-size: 15px; color: #17202A; white-space: pre-wrap;">${body}</div>
        <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;" />
        <p style="font-size: 12px; color: #64748B;">
          <strong>Emunahh-Invest Limited</strong><br/>
          33, Crossway Plaza, Beside UBA, Charity Road, New Oko Oba, Lagos, Nigeria.<br/>
          Direct Desk: +234 802 319 0807 | Alternative: +234 817 917 1456
        </p>
      </div>
    `;

    const dispatched = await dispatchEmail(to, subject, html);

    const logEntry: EmailLog = {
      id: `eml-${Date.now()}`,
      to,
      subject,
      body,
      enquiryId: enquiryId || '',
      enquiryType: enquiryType || 'Direct Reply',
      sentAt: new Date().toISOString(),
      status: dispatched ? 'DELIVERED' : 'FAILED',
      senderName: db.settings.emailSenderName,
    };

    db.emailLogs.unshift(logEntry);
    saveDb(db);

    res.status(201).json({
      success: true,
      message: dispatched ? 'Email delivered successfully.' : 'Email recorded in log queue.',
      log: logEntry,
    });
  } catch (err) {
    console.error('Send email error:', err);
    res.status(500).json({ error: 'Server error dispatching email.' });
  }
});

// Admin Media Library
app.get('/api/admin/media', authenticateAdmin, (req: Request, res: Response) => {
  res.json({ media: db.media });
});

app.post('/api/admin/media/upload', authenticateAdmin, (req: Request, res: Response) => {
  try {
    const { title, base64Data, filename, category } = req.body;

    if (!base64Data || !filename) {
      return res.status(400).json({ error: 'Base64 image data and filename are required.' });
    }

    const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 image data format.' });
    }

    const buffer = Buffer.from(matches[2], 'base64');
    const safeFilename = `${Date.now()}_${filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const filePath = path.join(UPLOADS_DIR, safeFilename);

    fs.writeFileSync(filePath, buffer);

    const mediaItem: MediaItem = {
      id: `med-${Date.now()}`,
      filename: safeFilename,
      url: `/uploads/${safeFilename}`,
      title: title || filename,
      size: buffer.length,
      uploadedAt: new Date().toISOString(),
      category: category || 'general',
    };

    db.media.unshift(mediaItem);
    saveDb(db);

    res.status(201).json({ success: true, media: mediaItem });
  } catch (err) {
    console.error('Media upload error:', err);
    res.status(500).json({ error: 'Failed to save media upload.' });
  }
});

app.delete('/api/admin/media/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const item = db.media.find((m) => m.id === id);
  if (item && item.url.startsWith('/uploads/')) {
    const filePath = path.join(UPLOADS_DIR, item.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn('Failed to delete file from disk:', err);
      }
    }
  }

  db.media = db.media.filter((m) => m.id !== id);
  saveDb(db);
  res.json({ success: true, message: 'Media item deleted.' });
});

// Admin Settings
app.get('/api/admin/settings', authenticateAdmin, (req: Request, res: Response) => {
  res.json({ settings: db.settings });
});

app.put('/api/admin/settings', authenticateAdmin, (req: Request, res: Response) => {
  try {
    db.settings = {
      ...db.settings,
      ...req.body,
    };
    saveDb(db);
    res.json({ success: true, message: 'Settings saved successfully.', settings: db.settings });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings.' });
  }
});

// Advanced administrative user management. Supabase Auth remains the credential authority.
app.get('/api/admin/users', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const supabaseUrl=(process.env.SUPABASE_URL||'').replace(/\/$/,''); const secret=process.env.SUPABASE_SECRET_KEY||'';
    if(!supabaseUrl||!secret) return res.status(503).json({error:'Supabase server credentials are not configured.'});
    const response=await fetch(`${supabaseUrl}/rest/v1/profiles?select=id,full_name,role,created_at,updated_at&order=created_at.desc`,{headers:{apikey:secret,Authorization:`Bearer ${secret}`}});
    if(!response.ok) return res.status(502).json({error:'Unable to load users.'});
    const profiles=await response.json() as any[];
    return res.json({users:profiles});
  }catch(e){return res.status(500).json({error:'Unable to load users.'});}
});

app.post('/api/admin/users', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const actor=(req as Request & {adminUser?:{id:string}}).adminUser; const {email,password,full_name,role='staff'}=req.body||{};
    if(!email||!password||!full_name) return res.status(400).json({error:'Full name, email and temporary password are required.'});
    if(!['super_admin','admin','editor','staff'].includes(role)) return res.status(400).json({error:'Invalid role.'});
    const supabaseUrl=(process.env.SUPABASE_URL||'').replace(/\/$/,''); const secret=process.env.SUPABASE_SECRET_KEY||'';
    if(!supabaseUrl||!secret) return res.status(503).json({error:'Supabase server credentials are not configured.'});
    const create=await fetch(`${supabaseUrl}/auth/v1/admin/users`,{method:'POST',headers:{apikey:secret,Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify({email,password,email_confirm:true,user_metadata:{full_name}})});
    const created=await create.json() as any; if(!create.ok) return res.status(create.status).json({error:created?.msg||created?.message||'Unable to create authentication user.'});
    const profile=await fetch(`${supabaseUrl}/rest/v1/profiles`,{method:'POST',headers:{apikey:secret,Authorization:`Bearer ${secret}`,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify({id:created.id,full_name,role})});
    if(!profile.ok){await fetch(`${supabaseUrl}/auth/v1/admin/users/${created.id}`,{method:'DELETE',headers:{apikey:secret,Authorization:`Bearer ${secret}`}});return res.status(502).json({error:'User created in Auth but profile creation failed; creation was rolled back.'});}
    await fetch(`${supabaseUrl}/rest/v1/audit_logs`,{method:'POST',headers:{apikey:secret,Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify({actor_id:actor?.id||null,action:'Created administrative user',entity_type:'profiles',entity_id:created.id,metadata:{email,role}})});
    return res.status(201).json({success:true,user:{id:created.id,email,full_name,role}});
  }catch(e){console.error('[Admin Users]',e);return res.status(500).json({error:'Unable to create administrative user.'});}
});

// ==========================================
// VITE / EXPRESS SERVER
// Vite owns the frontend during development. Express provides the API and
// serves the built Vite app for a traditional Node deployment. On Vercel,
// api/[...slug].ts imports this Express app as a serverless function.
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api/')) return next();
  const indexFile = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexFile)) return res.sendFile(indexFile);
  return res.status(404).send('Frontend build not found. Run npm run build first.');
});

if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EMUNAHH-INVEST API server running on http://0.0.0.0:${PORT}`);
  });
}

export default app;
