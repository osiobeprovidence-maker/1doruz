import { useState, useEffect, useRef, type FormEvent, type DragEvent, type ElementType, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Image,
  Globe,
  Check,
  Save,
  Upload,
  Loader2,
  Mail,
  Users,
  Shield,
  Bell,
  Puzzle,
  CreditCard,
  Key,
  Cloud,
  FileText,
  Settings2,
  ArrowLeft,
  X,
  ExternalLink,
  Info,
} from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const ACCENT = '#F5B301';

const PAGE_BG = '#0B0E11';
const SIDEBAR_BG = '#101318';
const PANEL_BG = '#171B23';
const CARD_BG = '#1D2330';
const INPUT_BG = '#131721';
const BORDER = '#222836';
const INPUT_BORDER = '#2A3140';

interface NavItem {
  id: string;
  label: string;
  icon: ElementType;
  description: string;
  soon?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'brand', label: 'Brand & Logo', icon: Image, description: 'Logo, colors, and visual identity' },
  { id: 'metadata', label: 'Site Metadata', icon: Globe, description: 'Title, description, and SEO' },
  { id: 'domain', label: 'Domain Settings', icon: Cloud, description: 'Custom domain and SSL', soon: true },
  { id: 'email', label: 'Email Settings', icon: Mail, description: 'SMTP and notification sender', soon: true },
  { id: 'users', label: 'User Management', icon: Users, description: 'Roles, permissions, invites', soon: true },
  { id: 'security', label: 'Security', icon: Shield, description: '2FA, sessions, audit logs', soon: true },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Email and webhook alerts', soon: true },
  { id: 'integrations', label: 'Integrations', icon: Puzzle, description: 'API keys and third-party tools', soon: true },
  { id: 'billing', label: 'Billing', icon: CreditCard, description: 'Plans, invoices, usage', soon: true },
  { id: 'api', label: 'API Access', icon: Key, description: 'API tokens and rate limits', soon: true },
];

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-8">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: `${ACCENT}15` }}
      >
        <Settings2 size={28} style={{ color: ACCENT }} />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">{label}</h2>
      <p className="text-sm" style={{ color: '#7E8794' }}>
        This section is under development and will be available soon.
      </p>
    </div>
  );
}

function DropZone({ onFile, isUploading }: { onFile: (f: File) => void; isUploading: boolean }) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      onFile(file);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFile(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleInput} />
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !preview && inputRef.current?.click()}
        className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer min-h-[200px] p-8"
        style={{
          borderColor: dragging ? ACCENT : dragging ? ACCENT : preview ? '#2A3140' : '#2A3140',
          backgroundColor: dragging ? `${ACCENT}08` : '#131721',
        }}
      >
        {preview ? (
          <div className="relative w-full flex flex-col items-center gap-4">
            <img src={preview} alt="logo preview" className="max-h-[120px] object-contain rounded-lg" />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className="text-xs font-medium flex items-center gap-1.5 transition-colors hover:text-white"
                style={{ color: ACCENT }}
              >
                <Upload size={14} /> Replace image
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                className="text-xs font-medium flex items-center gap-1.5 transition-colors"
                style={{ color: '#7E8794' }}
              >
                <X size={14} /> Remove
              </button>
            </div>
          </div>
        ) : (
          <>
            {isUploading ? (
              <Loader2 size={32} className="animate-spin" style={{ color: ACCENT }} />
            ) : (
              <>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${ACCENT}12` }}
                >
                  <Upload size={20} style={{ color: ACCENT }} />
                </div>
                <p className="text-sm font-medium text-white mb-1">Drag & drop your logo here</p>
                <p className="text-xs" style={{ color: '#7E8794' }}>
                  or <span style={{ color: ACCENT }}>click to browse</span>
                </p>
                <p className="text-[11px] mt-3" style={{ color: '#5A6577' }}>
                  PNG, JPG, SVG or WebP &mdash; max 5MB
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const stored = localStorage.getItem('user');
  const userData = stored ? JSON.parse(stored) : null;
  const callerId = userData?.id;

  const siteConfig = useQuery(api.config.get);

  const [activeSection, setActiveSection] = useState('brand');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [logoUrl, setLogoUrl] = useState('');
  const [logoText, setLogoText] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  const [siteDescription, setSiteDescription] = useState('');

  const updateConfig = useMutation(api.config.update);
  const generateUploadUrl = useMutation(api.config.generateUploadUrl);
  const saveLogo = useMutation(api.config.saveLogo);

  useEffect(() => {
    if (siteConfig) {
      setLogoUrl(siteConfig.logoUrl || '');
      setLogoText(siteConfig.logoText || '');
      setPrimaryColor(siteConfig.primaryColor || '');
      setSiteTitle(siteConfig.siteTitle || '');
      setSiteDescription(siteConfig.siteDescription || '');
    } else {
      setLogoText('1DORUZ');
      setPrimaryColor('#C5A059');
      setSiteTitle('1DORUZ RECORDS | Premium Independent Label');
    }
  }, [siteConfig]);

  const handleUpload = async (file: File) => {
    if (!callerId || !file) return;
    setIsUploading(true);
    try {
      const uploadUrl = await generateUploadUrl({ callerId: callerId as any });
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: file,
      });
      const { storageId } = await response.json();
      await saveLogo({ callerId: callerId as any, storageId: storageId as any });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      alert('Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!callerId) return;
    setIsSaving(true);
    try {
      await updateConfig({
        callerId: callerId as any,
        logoUrl: logoUrl || undefined,
        logoText,
        primaryColor,
        siteTitle,
        siteDescription: siteDescription || undefined,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      alert('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden flex" style={{ backgroundColor: PAGE_BG }}>
      {/* Sidebar */}
      <aside
        className="w-[260px] shrink-0 border-r hidden lg:flex flex-col"
        style={{ backgroundColor: SIDEBAR_BG, borderColor: BORDER }}
      >
        <div className="p-6 border-b" style={{ borderColor: BORDER }}>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: ACCENT }}>
            Control Panel
          </span>
          <h2 className="text-lg font-bold text-white mt-1 tracking-tight">Settings</h2>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative"
                style={{
                  backgroundColor: active ? `${ACCENT}0D` : 'transparent',
                  color: active ? '#FFFFFF' : '#7E8794',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = '#1A1F29';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ backgroundColor: ACCENT }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    backgroundColor: active ? `${ACCENT}15` : '#171B23',
                    color: active ? ACCENT : '#5A6577',
                  }}
                >
                  <Icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm truncate">{item.label}</span>
                  {item.soon && (
                    <span
                      className="text-[10px] font-medium uppercase tracking-wider"
                      style={{ color: '#5A6577' }}
                    >
                      Coming soon
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ backgroundColor: '#171B23' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: ACCENT }}>
              {userData?.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{userData?.email || 'Admin'}</p>
              <p className="text-[10px]" style={{ color: '#7E8794' }}>Super admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile nav bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: SIDEBAR_BG, borderColor: BORDER }}>
        <div className="flex items-center justify-between px-4 h-14">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: ACCENT }}>Control Panel</span>
            <h2 className="text-sm font-bold text-white">Settings</h2>
          </div>
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="text-sm font-medium px-4 py-2 rounded-lg border appearance-none cursor-pointer"
            style={{ backgroundColor: INPUT_BG, color: '#FFFFFF', borderColor: INPUT_BORDER }}
          >
            {NAV_ITEMS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}{item.soon ? ' (Soon)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        <form onSubmit={handleSave} className="p-6 lg:p-10 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-xl border p-8 lg:p-10" style={{ backgroundColor: PANEL_BG, borderColor: BORDER }}>
                {activeSection === 'brand' && (
                  <div className="space-y-10">
                    <div>
                      <h1 className="text-2xl font-bold text-white tracking-tight">Brand & Logo</h1>
                      <p className="text-sm mt-1" style={{ color: '#7E8794' }}>Manage your brand identity, logo, and accent color.</p>
                    </div>

                    <div className="space-y-8">
                      {/* Logo upload */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-3">Logo</label>
                        <DropZone onFile={handleUpload} isUploading={isUploading} />
                        <div className="flex items-center gap-2 mt-2">
                          <Info size={12} style={{ color: '#5A6577' }} />
                          <p className="text-[11px]" style={{ color: '#5A6577' }}>Uploaded logo displays in the navigation bar and marketing materials.</p>
                        </div>
                      </div>

                      {/* Logo URL */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Logo URL</label>
                        <input
                          type="url"
                          value={logoUrl}
                          onChange={(e) => setLogoUrl(e.target.value)}
                          placeholder="https://example.com/logo.png"
                          className="w-full rounded-lg border text-sm transition-all duration-150 px-4 py-3 focus:outline-none placeholder:text-[#5A6577]"
                          style={{
                            backgroundColor: INPUT_BG,
                            borderColor: INPUT_BORDER,
                            color: '#FFFFFF',
                          }}
                          onFocus={(e) => { e.target.style.borderColor = ACCENT; }}
                          onBlur={(e) => { e.target.style.borderColor = INPUT_BORDER; }}
                        />
                        <p className="text-xs mt-1.5" style={{ color: '#5A6577' }}>A direct URL to your logo. Overrides uploaded logo when set.</p>
                      </div>

                      {/* Logo text */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Logo Text (fallback)</label>
                        <input
                          type="text"
                          value={logoText}
                          onChange={(e) => setLogoText(e.target.value)}
                          placeholder="1DORUZ"
                          className="w-full rounded-lg border text-sm transition-all duration-150 px-4 py-3 focus:outline-none"
                          style={{
                            backgroundColor: INPUT_BG,
                            borderColor: INPUT_BORDER,
                            color: '#FFFFFF',
                          }}
                          onFocus={(e) => { e.target.style.borderColor = ACCENT; }}
                          onBlur={(e) => { e.target.style.borderColor = INPUT_BORDER; }}
                        />
                      </div>

                      {/* Brand color */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Brand Color</label>
                        <div className="flex items-center gap-4">
                          <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-12 h-12 rounded-lg border cursor-pointer"
                            style={{ borderColor: INPUT_BORDER, backgroundColor: 'transparent' }}
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <input
                              type="text"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              placeholder="#C5A059"
                              className="flex-1 rounded-lg border text-sm transition-all duration-150 px-4 py-3 font-mono focus:outline-none"
                              style={{
                                backgroundColor: INPUT_BG,
                                borderColor: INPUT_BORDER,
                                color: '#FFFFFF',
                              }}
                              onFocus={(e) => { e.target.style.borderColor = ACCENT; }}
                              onBlur={(e) => { e.target.style.borderColor = INPUT_BORDER; }}
                            />
                            <div
                              className="w-12 h-12 rounded-lg border shrink-0"
                              style={{ backgroundColor: primaryColor || '#C5A059', borderColor: INPUT_BORDER }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'metadata' && (
                  <div className="space-y-10">
                    <div>
                      <h1 className="text-2xl font-bold text-white tracking-tight">Site Metadata</h1>
                      <p className="text-sm mt-1" style={{ color: '#7E8794' }}>Control your site title, description, and SEO settings.</p>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Site Title</label>
                        <input
                          type="text"
                          value={siteTitle}
                          onChange={(e) => setSiteTitle(e.target.value)}
                          placeholder="1DORUZ RECORDS | Premium Independent Label"
                          className="w-full rounded-lg border text-sm transition-all duration-150 px-4 py-3 focus:outline-none"
                          style={{
                            backgroundColor: INPUT_BG,
                            borderColor: INPUT_BORDER,
                            color: '#FFFFFF',
                          }}
                          onFocus={(e) => { e.target.style.borderColor = ACCENT; }}
                          onBlur={(e) => { e.target.style.borderColor = INPUT_BORDER; }}
                        />
                        <p className="text-xs mt-1.5" style={{ color: '#5A6577' }}>Used in browser tabs, search results, and social previews.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Site Description</label>
                        <textarea
                          value={siteDescription}
                          onChange={(e) => setSiteDescription(e.target.value)}
                          placeholder="Describe your label for search engines and social sharing."
                          rows={5}
                          className="w-full rounded-lg border text-sm transition-all duration-150 px-4 py-3 focus:outline-none resize-none leading-relaxed"
                          style={{
                            backgroundColor: INPUT_BG,
                            borderColor: INPUT_BORDER,
                            color: '#FFFFFF',
                          }}
                          onFocus={(e) => { e.target.style.borderColor = ACCENT; }}
                          onBlur={(e) => { e.target.style.borderColor = INPUT_BORDER; }}
                        />
                        <p className="text-xs mt-1.5" style={{ color: '#5A6577' }}>A short description that appears in search engine results.</p>
                      </div>

                      {/* SEO preview card */}
                      <div className="rounded-xl border p-5" style={{ backgroundColor: CARD_BG, borderColor: BORDER }}>
                        <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#7E8794' }}>Search preview</p>
                        <div className="space-y-1">
                          <p className="text-sm text-green-400 truncate">https://www.1doruz.com</p>
                          <p className="text-base font-semibold text-white truncate">{siteTitle || '1DORUZ RECORDS'}</p>
                          <p className="text-sm" style={{ color: '#B5BDC9' }}>
                            {siteDescription || 'Describe your label for search engines and social sharing.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(() => {
                  const soon = NAV_ITEMS.find((n) => n.soon && n.id === activeSection);
                  return soon ? <ComingSoon label={soon.label} /> : null;
                })()}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Save bar */}
          {['brand', 'metadata'].includes(activeSection) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-center justify-end gap-4"
            >
              <button
                type="submit"
                disabled={isSaving}
                className="relative overflow-hidden rounded-lg text-sm font-semibold px-8 py-3 flex items-center gap-2.5 transition-all duration-200 shadow-lg"
                style={{
                  backgroundColor: ACCENT,
                  color: '#0B0E11',
                  opacity: isSaving ? 0.7 : 1,
                }}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check size={16} />
                    Saved
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </motion.div>
          )}
        </form>
      </main>
    </div>
  );
}
