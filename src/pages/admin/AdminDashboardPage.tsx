import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Mail,
  Send,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  MessageSquare,
  Upload,
  RefreshCw,
  Phone,
  Building,
} from 'lucide-react';
import { Logo } from '../../components/Logo';
import { useContent } from '../../context/ContentContext';

type AdminTab =
  | 'overview'
  | 'content'
  | 'services'
  | 'student-loans'
  | 'investments'
  | 'contact'
  | 'emails'
  | 'media'
  | 'settings';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { refreshContent } = useContent();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Stats & Overview
  const [stats, setStats] = useState<any>({
    totalStudentLoans: 0,
    newStudentLoans: 0,
    totalInvestments: 0,
    newInvestments: 0,
    totalMessages: 0,
    newMessages: 0,
    totalEmailsSent: 0,
    activeServices: 0,
    recentActivity: [],
  });

  // Content Editor State
  const [siteContent, setSiteContent] = useState<any>(null);
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);

  // Services State
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  // Student Loans State
  const [loanEnquiries, setLoanEnquiries] = useState<any[]>([]);
  const [loanStatusFilter, setLoanStatusFilter] = useState('ALL');
  const [loanSearch, setLoanSearch] = useState('');
  const [selectedLoan, setSelectedLoan] = useState<any | null>(null);

  // Investments State
  const [invEnquiries, setInvEnquiries] = useState<any[]>([]);
  const [invStatusFilter, setInvStatusFilter] = useState('ALL');
  const [invSearch, setInvSearch] = useState('');
  const [selectedInv, setSelectedInv] = useState<any | null>(null);

  // Contact Messages State
  const [contactMsgs, setContactMsgs] = useState<any[]>([]);
  const [contactStatusFilter, setContactStatusFilter] = useState('ALL');
  const [contactSearch, setContactSearch] = useState('');
  const [selectedMsg, setSelectedMsg] = useState<any | null>(null);

  // Email Composer State
  const [emailLogs, setEmailLogs] = useState<any[]>([]);
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailEnquiryId, setEmailEnquiryId] = useState('');
  const [emailEnquiryType, setEmailEnquiryType] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccessMessage, setEmailSuccessMessage] = useState<string | null>(null);

  // Media Library State
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'hero' | 'service' | 'about' | 'general'>('general');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  // Settings State
  const [settingsForm, setSettingsForm] = useState<any>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Verification & Auth check
  useEffect(() => {
    const storedToken = localStorage.getItem('emunahh_admin_token');
    const storedUser = localStorage.getItem('emunahh_admin_user');

    if (!storedToken) {
      navigate('/admin/login');
      return;
    }

    setToken(storedToken);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchInitialData(storedToken);
  }, [navigate]);

  const authHeaders = (t?: string) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${t || token}`,
  });

  const fetchInitialData = async (authToken: string) => {
    try {
      const headers = authHeaders(authToken);

      const [statsRes, contentRes, servicesRes, loansRes, invRes, contactRes, emailsRes, mediaRes, settingsRes] =
        await Promise.allSettled([
          fetch('/api/admin/stats', { headers }),
          fetch('/api/admin/content', { headers }),
          fetch('/api/admin/services', { headers }),
          fetch('/api/admin/enquiries/student-loans', { headers }),
          fetch('/api/admin/enquiries/investments', { headers }),
          fetch('/api/admin/enquiries/contact', { headers }),
          fetch('/api/admin/emails/logs', { headers }),
          fetch('/api/admin/media', { headers }),
          fetch('/api/admin/settings', { headers }),
        ]);

      if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
        setStats(await statsRes.value.json());
      }
      if (contentRes.status === 'fulfilled' && contentRes.value.ok) {
        const data = await contentRes.value.json();
        setSiteContent(data.content);
      }
      if (servicesRes.status === 'fulfilled' && servicesRes.value.ok) {
        const data = await servicesRes.value.json();
        setServicesList(data.services || []);
      }
      if (loansRes.status === 'fulfilled' && loansRes.value.ok) {
        const data = await loansRes.value.json();
        setLoanEnquiries(data.enquiries || []);
      }
      if (invRes.status === 'fulfilled' && invRes.value.ok) {
        const data = await invRes.value.json();
        setInvEnquiries(data.enquiries || []);
      }
      if (contactRes.status === 'fulfilled' && contactRes.value.ok) {
        const data = await contactRes.value.json();
        setContactMsgs(data.messages || []);
      }
      if (emailsRes.status === 'fulfilled' && emailsRes.value.ok) {
        const data = await emailsRes.value.json();
        setEmailLogs(data.logs || []);
      }
      if (mediaRes.status === 'fulfilled' && mediaRes.value.ok) {
        const data = await mediaRes.value.json();
        setMediaList(data.media || []);
      }
      if (settingsRes.status === 'fulfilled' && settingsRes.value.ok) {
        const data = await settingsRes.value.json();
        setSettingsForm(data.settings || {});
      }
    } catch (err) {
      console.error('Failed fetching admin data:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: authHeaders(),
      });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('emunahh_admin_token');
    localStorage.removeItem('emunahh_admin_user');
    navigate('/admin/login');
  };

  // Content update handler
  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteContent) return;

    try {
      setIsSavingContent(true);
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(siteContent),
      });

      if (res.ok) {
        setContentSaveSuccess(true);
        await refreshContent();
        setTimeout(() => setContentSaveSuccess(false), 3000);
      }
    } catch (err) {
      alert('Failed saving content updates.');
    } finally {
      setIsSavingContent(false);
    }
  };

  // Status update helpers
  const updateLoanStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/student-loans/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setLoanEnquiries((prev) => prev.map((item) => (item.id === id ? data.enquiry : item)));
        if (selectedLoan && selectedLoan.id === id) {
          setSelectedLoan(data.enquiry);
        }
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const updateInvStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/investments/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setInvEnquiries((prev) => prev.map((item) => (item.id === id ? data.enquiry : item)));
        if (selectedInv && selectedInv.id === id) {
          setSelectedInv(data.enquiry);
        }
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/contact/${id}/status`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setContactMsgs((prev) => prev.map((item) => (item.id === id ? data.message : item)));
        if (selectedMsg && selectedMsg.id === id) {
          setSelectedMsg(data.message);
        }
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  // Open Reply in Email Composer
  const openEmailReply = (to: string, subject: string, enquiryId: string, enquiryType: string) => {
    setEmailTo(to);
    setEmailSubject(subject.startsWith('Re:') ? subject : `Re: ${subject}`);
    setEmailBody(`Dear Customer,\n\nThank you for contacting Emunahh-Invest Limited regarding your ${enquiryType.toLowerCase()}.\n\nWith best regards,\nEmunahh-Invest Advisory Desk`);
    setEmailEnquiryId(enquiryId);
    setEmailEnquiryType(enquiryType);
    setActiveTab('emails');
  };

  // Send Email Handler
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailTo || !emailSubject || !emailBody) return;

    try {
      setIsSendingEmail(true);
      const res = await fetch('/api/admin/emails/send', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          to: emailTo,
          subject: emailSubject,
          body: emailBody,
          enquiryId: emailEnquiryId,
          enquiryType: emailEnquiryType,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setEmailSuccessMessage(data.message);
        setEmailLogs((prev) => [data.log, ...prev]);
        setEmailSubject('');
        setEmailBody('');
        setTimeout(() => setEmailSuccessMessage(null), 4000);
      }
    } catch (err) {
      alert('Error sending email message.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Media Upload Handler
  const handleMediaUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    try {
      setIsUploadingMedia(true);
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onload = async () => {
        const base64Data = reader.result as string;

        const res = await fetch('/api/admin/media/upload', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({
            title: uploadTitle || uploadFile.name,
            filename: uploadFile.name,
            base64Data,
            category: uploadCategory,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setMediaList((prev) => [data.media, ...prev]);
          setUploadFile(null);
          setUploadTitle('');
          alert('Image uploaded successfully!');
        }
      };
    } catch (err) {
      alert('Error uploading media asset.');
    } finally {
      setIsUploadingMedia(false);
    }
  };

  // Settings Save Handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingsForm) return;

    try {
      setIsSavingSettings(true);
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(settingsForm),
      });

      if (res.ok) {
        setSettingsSuccess(true);
        await refreshContent();
        setTimeout(() => setSettingsSuccess(false), 3000);
      }
    } catch (err) {
      alert('Error saving system settings.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#17202A] flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="bg-[#071A2B] text-white border-b border-[#071A2B] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-block">
              <Logo variant="dark" size="sm" />
            </Link>
            <div className="hidden sm:block h-6 w-px bg-white/20" />
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C6A15B]">
              <span>Executive Management Control</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#087A5A]" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body: Sidebar Navigation + Dynamic Tab Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Tabs (3 cols) */}
        <aside className="lg:col-span-3 space-y-2">
          
          <div className="p-4 bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs mb-4">
            <div className="text-[10px] uppercase font-bold text-[#087A5A] tracking-wider">
              Signed in Officer
            </div>
            <div className="text-sm font-bold text-[#071A2B] truncate">
              {user?.email || 'admin@emunahhinvest.com'}
            </div>
            <div className="text-[11px] text-gray-500">Full Administrator Rights</div>
          </div>

          <nav className="space-y-1 bg-white p-2 rounded-lg border border-[#071A2B]/10 shadow-2xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#071A2B] text-white'
                  : 'text-[#17202A] hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#C6A15B]" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors ${
                activeTab === 'content'
                  ? 'bg-[#071A2B] text-white'
                  : 'text-[#17202A] hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4 text-[#087A5A]" />
              <span>Website Content</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors ${
                activeTab === 'services'
                  ? 'bg-[#071A2B] text-white'
                  : 'text-[#17202A] hover:bg-gray-50'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#087A5A]" />
              <span>Services</span>
            </button>

            <button
              onClick={() => setActiveTab('student-loans')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors ${
                activeTab === 'student-loans'
                  ? 'bg-[#071A2B] text-white'
                  : 'text-[#17202A] hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-[#087A5A]" />
                <span>Student Loans</span>
              </div>
              {stats.newStudentLoans > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#087A5A] text-white">
                  {stats.newStudentLoans}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('investments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors ${
                activeTab === 'investments'
                  ? 'bg-[#071A2B] text-white'
                  : 'text-[#17202A] hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-[#C6A15B]" />
                <span>Investments</span>
              </div>
              {stats.newInvestments > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#087A5A] text-white">
                  {stats.newInvestments}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors ${
                activeTab === 'contact'
                  ? 'bg-[#071A2B] text-white'
                  : 'text-[#17202A] hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#087A5A]" />
                <span>Contact Messages</span>
              </div>
              {stats.newMessages > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#087A5A] text-white">
                  {stats.newMessages}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('emails')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors ${
                activeTab === 'emails'
                  ? 'bg-[#071A2B] text-white'
                  : 'text-[#17202A] hover:bg-gray-50'
              }`}
            >
              <Send className="w-4 h-4 text-[#087A5A]" />
              <span>Email Dispatch</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors ${
                activeTab === 'media'
                  ? 'bg-[#071A2B] text-white'
                  : 'text-[#17202A] hover:bg-gray-50'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#087A5A]" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#071A2B] text-white'
                  : 'text-[#17202A] hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4 text-gray-400" />
              <span>System Settings</span>
            </button>
          </nav>
        </aside>

        {/* Content Area (9 cols) */}
        <main className="lg:col-span-9">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs space-y-1">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Student Loan Enquiries
                  </div>
                  <div className="text-2xl font-extrabold text-[#071A2B]">
                    {stats.totalStudentLoans}
                  </div>
                  <div className="text-xs text-[#087A5A] font-semibold">
                    {stats.newStudentLoans} pending review
                  </div>
                </div>

                <div className="p-5 bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs space-y-1">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Investment Enquiries
                  </div>
                  <div className="text-2xl font-extrabold text-[#071A2B]">
                    {stats.totalInvestments}
                  </div>
                  <div className="text-xs text-[#087A5A] font-semibold">
                    {stats.newInvestments} pending review
                  </div>
                </div>

                <div className="p-5 bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs space-y-1">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Contact Messages
                  </div>
                  <div className="text-2xl font-extrabold text-[#071A2B]">
                    {stats.totalMessages}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stats.newMessages} unaddressed
                  </div>
                </div>

                <div className="p-5 bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs space-y-1">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Emails Delivered
                  </div>
                  <div className="text-2xl font-extrabold text-[#071A2B]">
                    {stats.totalEmailsSent}
                  </div>
                  <div className="text-xs text-[#087A5A] font-semibold">
                    Resend gateway online
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-6 bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-[#071A2B]">Administrative Shortcuts</h3>
                  <p className="text-xs text-gray-500">Quickly jump to primary tasks and customer enquiries.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('student-loans')}
                    className="px-3.5 py-2 bg-[#087A5A] hover:bg-[#04513E] text-white text-xs font-bold rounded-md transition-colors"
                  >
                    View Student Loans ({stats.newStudentLoans})
                  </button>
                  <button
                    onClick={() => setActiveTab('emails')}
                    className="px-3.5 py-2 bg-[#071A2B] hover:bg-[#087A5A] text-white text-xs font-bold rounded-md transition-colors"
                  >
                    Compose Direct Email
                  </button>
                  <button
                    onClick={() => setActiveTab('content')}
                    className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-[#071A2B] text-xs font-bold rounded-md transition-colors"
                  >
                    Edit Website Copy
                  </button>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#071A2B]">Recent Inbound Activity</h3>
                  <span className="text-xs text-gray-500">Live synchronization</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8F7F3] text-gray-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Reference</th>
                        <th className="px-6 py-3">Client / Student</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {stats.recentActivity.map((act: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-3 font-semibold text-[#071A2B]">{act.type}</td>
                          <td className="px-6 py-3 font-mono font-bold text-[#087A5A]">{act.ref}</td>
                          <td className="px-6 py-3 font-medium text-gray-800">{act.name}</td>
                          <td className="px-6 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                act.status === 'NEW'
                                  ? 'bg-amber-100 text-amber-800'
                                  : act.status === 'CONTACTED'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {act.status}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-gray-500">
                            {new Date(act.date).toLocaleDateString('en-GB')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: WEBSITE CONTENT (CMS) */}
          {activeTab === 'content' && siteContent && (
            <div className="bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-[#071A2B]">Website Content Management</h3>
                  <p className="text-xs text-gray-500">
                    Edits made here update the public website in real-time and persist to the database.
                  </p>
                </div>
                {contentSaveSuccess && (
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Saved to live website!</span>
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveContent} className="space-y-8">
                
                {/* HERO SECTION CMS */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#087A5A] uppercase tracking-wider">
                    Hero Section Copy
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">Eyebrow Text</label>
                      <input
                        type="text"
                        value={siteContent.hero.eyebrow}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            hero: { ...siteContent.hero, eyebrow: e.target.value },
                          })
                        }
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">Highlight Word</label>
                      <input
                        type="text"
                        value={siteContent.hero.highlightWord}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            hero: { ...siteContent.hero, highlightWord: e.target.value },
                          })
                        }
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">Main Heading</label>
                    <input
                      type="text"
                      value={siteContent.hero.heading}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          hero: { ...siteContent.hero, heading: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">Supporting Description</label>
                    <textarea
                      rows={3}
                      value={siteContent.hero.description}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          hero: { ...siteContent.hero, description: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">Primary CTA Button</label>
                      <input
                        type="text"
                        value={siteContent.hero.primaryCta}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            hero: { ...siteContent.hero, primaryCta: e.target.value },
                          })
                        }
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">Secondary CTA Button</label>
                      <input
                        type="text"
                        value={siteContent.hero.secondaryCta}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            hero: { ...siteContent.hero, secondaryCta: e.target.value },
                          })
                        }
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>
                  </div>
                </div>

                {/* ABOUT SECTION CMS */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="text-xs font-bold text-[#087A5A] uppercase tracking-wider">
                    About Emunahh-Invest Section
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">Headline</label>
                    <input
                      type="text"
                      value={siteContent.about.headline}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          about: { ...siteContent.about, headline: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">Company Story Intro</label>
                    <textarea
                      rows={3}
                      value={siteContent.about.intro}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          about: { ...siteContent.about, intro: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">Mission Statement</label>
                      <textarea
                        rows={3}
                        value={siteContent.about.mission}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            about: { ...siteContent.about, mission: e.target.value },
                          })
                        }
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">Vision Statement</label>
                      <textarea
                        rows={3}
                        value={siteContent.about.vision}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            about: { ...siteContent.about, vision: e.target.value },
                          })
                        }
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>
                  </div>
                </div>

                {/* CONTACT INFO CMS */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="text-xs font-bold text-[#087A5A] uppercase tracking-wider">
                    Office & Contact Information
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">Office Address</label>
                    <input
                      type="text"
                      value={siteContent.contact.officeAddress}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          contact: { ...siteContent.contact, officeAddress: e.target.value },
                        })
                      }
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">Primary Phone</label>
                      <input
                        type="text"
                        value={siteContent.contact.phone}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            contact: { ...siteContent.contact, phone: e.target.value },
                          })
                        }
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">Secondary Phone</label>
                      <input
                        type="text"
                        value={siteContent.contact.secondaryPhone}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            contact: { ...siteContent.contact, secondaryPhone: e.target.value },
                          })
                        }
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">WhatsApp Desk</label>
                      <input
                        type="text"
                        value={siteContent.contact.whatsapp}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            contact: { ...siteContent.contact, whatsapp: e.target.value },
                          })
                        }
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSavingContent}
                    className="px-6 py-3 bg-[#087A5A] hover:bg-[#04513E] text-white text-xs font-bold rounded-md transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingContent ? 'Saving Changes...' : 'Save & Publish to Live Site'}</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 3: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-[#071A2B]">Services Portfolio</h3>
                  <p className="text-xs text-gray-500">Configure financial services, ordering, and publication state.</p>
                </div>
                <button
                  onClick={() => setIsAddingService(true)}
                  className="px-3.5 py-2 bg-[#087A5A] hover:bg-[#04513E] text-white text-xs font-bold rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="space-y-4">
                {servicesList.map((srv, idx) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-md border border-[#071A2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#087A5A]/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#087A5A]">#{srv.order || idx + 1}</span>
                        <h4 className="text-sm font-bold text-[#071A2B]">{srv.title}</h4>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            srv.category === 'featured'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {srv.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-1">{srv.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingService(srv)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#071A2B] hover:bg-gray-100 rounded-md border border-gray-200 flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Service Modal */}
              {editingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                  <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <h4 className="text-sm font-bold text-[#071A2B]">Edit Service: {editingService.title}</h4>
                      <button onClick={() => setEditingService(null)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-[#071A2B] mb-1">Title</label>
                        <input
                          type="text"
                          value={editingService.title}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#071A2B] mb-1">Tagline</label>
                        <input
                          type="text"
                          value={editingService.tagline}
                          onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#071A2B] mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingService.description}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          await fetch(`/api/admin/services/${editingService.id}`, {
                            method: 'PUT',
                            headers: authHeaders(),
                            body: JSON.stringify(editingService),
                          });
                          setServicesList((prev) =>
                            prev.map((s) => (s.id === editingService.id ? editingService : s))
                          );
                          setEditingService(null);
                          await refreshContent();
                        }}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-md"
                      >
                        Save Service
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: STUDENT LOAN ENQUIRIES */}
          {activeTab === 'student-loans' && (
            <div className="bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-[#071A2B]">Student Loan Enquiries</h3>
                  <p className="text-xs text-gray-500">Track and process direct education financing submissions.</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Filter */}
                  <select
                    value={loanStatusFilter}
                    onChange={(e) => setLoanStatusFilter(e.target.value)}
                    className="text-xs p-2 border border-gray-200 rounded-md bg-white text-[#071A2B] font-semibold"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                  </select>

                  {/* Search input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search name, ref, campus..."
                      value={loanSearch}
                      onChange={(e) => setLoanSearch(e.target.value)}
                      className="text-xs pl-8 pr-3 py-2 border border-gray-200 rounded-md"
                    />
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Enquiries List */}
              <div className="space-y-3">
                {loanEnquiries
                  .filter((e) => (loanStatusFilter === 'ALL' ? true : e.status === loanStatusFilter))
                  .filter((e) =>
                    loanSearch
                      ? e.fullName.toLowerCase().includes(loanSearch.toLowerCase()) ||
                        e.reference.toLowerCase().includes(loanSearch.toLowerCase()) ||
                        e.institution.toLowerCase().includes(loanSearch.toLowerCase())
                      : true
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg border border-[#071A2B]/10 hover:border-[#087A5A]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-xs text-[#087A5A]">{item.reference}</span>
                          <span className="font-bold text-sm text-[#071A2B]">{item.fullName}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.status === 'NEW'
                                ? 'bg-amber-100 text-amber-800'
                                : item.status === 'CONTACTED'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          <strong>{item.institution}</strong> · {item.course} · Amount:{' '}
                          <span className="font-semibold text-[#071A2B]">{item.amount || 'Tuition'}</span>
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Phone: <a href={`tel:${item.phone}`} className="text-[#071A2B] font-semibold">{item.phone}</a>
                          {item.email && <> · Email: <span className="font-medium">{item.email}</span></>}
                          {' '}· Submitted: {new Date(item.createdAt).toLocaleDateString('en-GB')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Status Select */}
                        <select
                          value={item.status}
                          onChange={(e) => updateLoanStatus(item.id, e.target.value)}
                          className="text-xs p-1.5 border border-gray-200 rounded-md font-semibold bg-white"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="IN PROGRESS">IN PROGRESS</option>
                          <option value="RESOLVED">RESOLVED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>

                        {/* Reply Button */}
                        <button
                          onClick={() =>
                            openEmailReply(
                              item.email || '',
                              `Regarding your Student Loan Application ${item.reference}`,
                              item.id,
                              'Student Loan'
                            )
                          }
                          className="px-3 py-1.5 bg-[#071A2B] hover:bg-[#087A5A] text-white text-xs font-bold rounded-md transition-colors flex items-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>

                        <button
                          onClick={() => setSelectedLoan(item)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#071A2B] text-xs font-bold rounded-md"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Student Loan Details Modal */}
              {selectedLoan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                  <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#087A5A]">
                          {selectedLoan.reference}
                        </span>
                        <h4 className="text-base font-bold text-[#071A2B]">{selectedLoan.fullName}</h4>
                      </div>
                      <button onClick={() => setSelectedLoan(null)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-gray-500 block">Institution:</span>
                        <span className="font-bold text-[#071A2B]">{selectedLoan.institution}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Course / Programme:</span>
                        <span className="font-bold text-[#071A2B]">{selectedLoan.course}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Purpose / Invoice Details:</span>
                        <span className="text-gray-800">{selectedLoan.purpose || 'Direct tuition fee remittance.'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Tuition / Facility Amount:</span>
                        <span className="font-bold text-[#087A5A]">{selectedLoan.amount || 'Pending invoice validation'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Student Message:</span>
                        <span className="text-gray-700">{selectedLoan.message || 'No additional note provided.'}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-gray-500 block">Contact Info:</span>
                        <div>Phone: <strong>{selectedLoan.phone}</strong></div>
                        <div>Email: <strong>{selectedLoan.email || 'N/A'}</strong></div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedLoan(null)}
                        className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          const item = selectedLoan;
                          setSelectedLoan(null);
                          openEmailReply(
                            item.email || '',
                            `Emunahh-Invest Student Loan Review: ${item.reference}`,
                            item.id,
                            'Student Loan'
                          );
                        }}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-md flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Compose Email</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 5: INVESTMENT ENQUIRIES */}
          {activeTab === 'investments' && (
            <div className="bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-[#071A2B]">Investment Enquiries</h3>
                  <p className="text-xs text-gray-500">Corporate treasury and wealth management client inquiries.</p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={invStatusFilter}
                    onChange={(e) => setInvStatusFilter(e.target.value)}
                    className="text-xs p-2 border border-gray-200 rounded-md font-semibold bg-white"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {invEnquiries
                  .filter((e) => (invStatusFilter === 'ALL' ? true : e.status === invStatusFilter))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg border border-[#071A2B]/10 hover:border-[#087A5A]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-xs text-[#087A5A]">{item.reference}</span>
                          <span className="font-bold text-sm text-[#071A2B]">{item.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {item.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-700">
                          <strong>Interest:</strong> {item.investmentInterest} · Amount: {item.amount || 'Custom Mandate'}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Phone: {item.phone} · Email: {item.email || 'N/A'} · Submitted: {new Date(item.createdAt).toLocaleDateString('en-GB')}
                        </div>
                        {item.message && (
                          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md mt-1">
                            "{item.message}"
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={item.status}
                          onChange={(e) => updateInvStatus(item.id, e.target.value)}
                          className="text-xs p-1.5 border border-gray-200 rounded-md font-semibold bg-white"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="IN PROGRESS">IN PROGRESS</option>
                          <option value="RESOLVED">RESOLVED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>

                        <button
                          onClick={() =>
                            openEmailReply(
                              item.email || '',
                              `Investment Advisory Briefing: ${item.reference}`,
                              item.id,
                              'Investment'
                            )
                          }
                          className="px-3 py-1.5 bg-[#071A2B] hover:bg-[#087A5A] text-white text-xs font-bold rounded-md transition-colors flex items-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT MESSAGES */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-[#071A2B]">General Contact Submissions</h3>
                  <p className="text-xs text-gray-500">Inbound inquiries from the Lagos walk-in and contact desk.</p>
                </div>
              </div>

              <div className="space-y-3">
                {contactMsgs.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-lg border border-[#071A2B]/10 hover:border-[#087A5A]/50 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-xs text-[#087A5A]">{msg.reference}</span>
                        <span className="font-bold text-sm text-[#071A2B]">{msg.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700">
                          {msg.service}
                        </span>
                      </div>
                      <div className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-md">
                        {msg.message}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        Phone: {msg.phone} · Email: {msg.email || 'N/A'} · Received: {new Date(msg.createdAt).toLocaleDateString('en-GB')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={msg.status}
                        onChange={(e) => updateContactStatus(msg.id, e.target.value)}
                        className="text-xs p-1.5 border border-gray-200 rounded-md font-semibold bg-white"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>

                      <button
                        onClick={() =>
                          openEmailReply(
                            msg.email || '',
                            `Emunahh-Invest Inquiry Response: ${msg.reference}`,
                            msg.id,
                            'General Message'
                          )
                        }
                        className="px-3 py-1.5 bg-[#087A5A] hover:bg-[#04513E] text-white text-xs font-bold rounded-md transition-colors flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: EMAIL DISPATCH & HISTORY */}
          {activeTab === 'emails' && (
            <div className="space-y-6">
              
              {/* Compose Email Panel */}
              <div className="bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-[#071A2B]">Corporate Email Composer</h3>
                    <p className="text-xs text-gray-500">Send direct communications to clients via Resend gateway.</p>
                  </div>
                  {emailSuccessMessage && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                      {emailSuccessMessage}
                    </span>
                  )}
                </div>

                <form onSubmit={handleSendEmail} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#071A2B] mb-1">Recipient Email</label>
                      <input
                        type="email"
                        required
                        placeholder="client@example.com"
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#071A2B] mb-1">Subject Line</label>
                      <input
                        type="text"
                        required
                        placeholder="Re: Emunahh-Invest Student Loan Application"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#087A5A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#071A2B] mb-1">Message Content</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Dear Client, We have reviewed your invoice..."
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#087A5A] font-mono text-xs"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSendingEmail}
                      className="px-6 py-2.5 bg-[#087A5A] hover:bg-[#04513E] text-white text-xs font-bold rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSendingEmail ? 'Dispatching Message...' : 'Dispatch Email'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Email Sent History */}
              <div className="bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs p-6 space-y-4">
                <h3 className="text-sm font-bold text-[#071A2B]">Dispatched Email Audit Log</h3>
                <div className="space-y-3">
                  {emailLogs.map((log) => (
                    <div key={log.id} className="p-3.5 rounded-md border border-gray-100 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-[#071A2B]">To: {log.to}</div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {log.status}
                        </span>
                      </div>
                      <div className="font-medium text-gray-800">{log.subject}</div>
                      <p className="text-gray-600 text-[11px] line-clamp-2">{log.body}</p>
                      <div className="text-[10px] text-gray-400">
                        Dispatched by: {log.senderName} · {new Date(log.sentAt).toLocaleString('en-GB')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 8: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-[#071A2B]">Media Assets & Image Library</h3>
                  <p className="text-xs text-gray-500">Upload and assign brand imagery for Hero, Services, and About sections.</p>
                </div>
              </div>

              {/* Image Upload Form */}
              <form onSubmit={handleMediaUpload} className="p-4 rounded-lg bg-[#F8F7F3] border border-[#071A2B]/10 space-y-4">
                <div className="text-xs font-bold text-[#071A2B] uppercase tracking-wider">
                  Upload New Visual Asset
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#071A2B] mb-1">Asset Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Lagos Corporate Meeting"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#071A2B] mb-1">Category Target</label>
                    <select
                      value={uploadCategory}
                      onChange={(e: any) => setUploadCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-white font-semibold"
                    >
                      <option value="general">General</option>
                      <option value="hero">Hero Section</option>
                      <option value="service">Service Feature</option>
                      <option value="about">About Section</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#071A2B] mb-1">Select File (JPG / PNG)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadFile(e.target.files[0]);
                        }
                      }}
                      className="w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#087A5A] file:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={!uploadFile || isUploadingMedia}
                    className="px-4 py-2 bg-[#087A5A] hover:bg-[#04513E] text-white text-xs font-bold rounded-md disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingMedia ? 'Uploading...' : 'Upload Asset'}</span>
                  </button>
                </div>
              </form>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {mediaList.map((item) => (
                  <div key={item.id} className="rounded-lg border border-[#071A2B]/10 overflow-hidden bg-white shadow-2xs space-y-2">
                    <div className="h-40 bg-gray-100 overflow-hidden">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 space-y-1">
                      <div className="font-bold text-xs text-[#071A2B] truncate">{item.title}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{item.category}</div>
                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={async () => {
                            if (!siteContent) return;
                            setSiteContent({
                              ...siteContent,
                              hero: { ...siteContent.hero, imageUrl: item.url },
                            });
                            alert('Assigned as Hero Image! Remember to click "Save & Publish" on the Content tab.');
                          }}
                          className="text-[11px] font-bold text-[#087A5A] hover:underline"
                        >
                          Set as Hero Image
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete this media asset?')) {
                              await fetch(`/api/admin/media/${item.id}`, {
                                method: 'DELETE',
                                headers: authHeaders(),
                              });
                              setMediaList((prev) => prev.filter((m) => m.id !== item.id));
                            }
                          }}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && settingsForm && (
            <div className="bg-white rounded-lg border border-[#071A2B]/10 shadow-2xs p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-[#071A2B]">System & Notification Settings</h3>
                  <p className="text-xs text-gray-500">Configure administrative notifications, routing, and sender information.</p>
                </div>
                {settingsSuccess && (
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
                    Settings Updated!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#071A2B] mb-1">Company Legal Name</label>
                    <input
                      type="text"
                      value={settingsForm.companyName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#071A2B] mb-1">Enquiries Notification Email</label>
                    <input
                      type="email"
                      value={settingsForm.notificationEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, notificationEmail: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#071A2B] mb-1">Outbound Email Sender Name</label>
                    <input
                      type="text"
                      value={settingsForm.emailSenderName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, emailSenderName: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#071A2B] mb-1">Reply-To Email</label>
                    <input
                      type="email"
                      value={settingsForm.replyToEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, replyToEmail: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#071A2B] mb-1">Registered Corporate Address</label>
                  <input
                    type="text"
                    value={settingsForm.officeAddress}
                    onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSavingSettings}
                    className="px-6 py-2.5 bg-[#087A5A] hover:bg-[#04513E] text-white text-xs font-bold rounded-md transition-colors shadow-xs"
                  >
                    {isSavingSettings ? 'Saving Settings...' : 'Save Configuration'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
