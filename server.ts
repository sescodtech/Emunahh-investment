import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for applications and inquiries
interface ApplicationRecord {
  reference: string;
  service: string;
  fullName: string;
  phone: string;
  email?: string;
  amount?: string;
  institutionOrBusiness?: string;
  details?: string;
  createdAt: string;
  status: 'Pending Verification' | 'Document Review' | 'Advisory Approved' | 'Disbursed';
}

const applicationsDatabase: Map<string, ApplicationRecord> = new Map();

// Seed a sample reference for tracking tests
applicationsDatabase.set('EMU-100201', {
  reference: 'EMU-100201',
  service: 'student_loan',
  fullName: 'Chidera Okafor',
  phone: '+234 817 917 1456',
  email: 'c.okafor@example.edu.ng',
  amount: '₦450,000',
  institutionOrBusiness: 'University of Lagos (UNILAG)',
  details: 'Second semester faculty tuition and registration.',
  createdAt: new Date().toISOString(),
  status: 'Pending Verification',
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    institution: 'EMUNAHH-INVEST LIMITED',
    location: '33, Crossway Plaza, New Oko Oba, Lagos, Nigeria',
    timestamp: new Date().toISOString(),
  });
});

// Submit Application
app.post('/api/applications', (req: Request, res: Response) => {
  try {
    const { service, fullName, phone, email, amount, institutionOrBusiness, details } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ error: 'Full name and phone number are required.' });
    }

    const reference = `EMU-${Math.floor(100000 + Math.random() * 900000)}`;
    const record: ApplicationRecord = {
      reference,
      service: service || 'student_loan',
      fullName,
      phone,
      email: email || '',
      amount: amount || '',
      institutionOrBusiness: institutionOrBusiness || '',
      details: details || '',
      createdAt: new Date().toISOString(),
      status: 'Pending Verification',
    };

    applicationsDatabase.set(reference, record);

    return res.status(201).json({
      success: true,
      message: 'Application registered successfully.',
      reference,
      record,
    });
  } catch (err) {
    console.error('Application submission error:', err);
    return res.status(500).json({ error: 'Internal server error processing application.' });
  }
});

// Lookup Application Status by Reference
app.get('/api/applications/:ref', (req: Request, res: Response) => {
  const { ref } = req.params;
  const application = applicationsDatabase.get(ref.toUpperCase());

  if (!application) {
    return res.status(404).json({
      found: false,
      error: 'Application reference not found. Please verify your reference or contact our Lagos desk.',
    });
  }

  return res.json({
    found: true,
    application,
  });
});

// Submit Contact Inquiry
app.post('/api/inquiries', (req: Request, res: Response) => {
  try {
    const { name, phone, email, service, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required.' });
    }

    console.log(`[Emunahh Inquiry] Received message from ${name} (${phone}) for ${service}`);

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received by the Lagos advisory team.',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Inquiry error:', err);
    return res.status(500).json({ error: 'Internal server error processing inquiry.' });
  }
});

// Mount Vite or serve static production build
async function setupServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EMUNAHH-INVEST LIMITED server running on port ${PORT}`);
  });
}

setupServer();
