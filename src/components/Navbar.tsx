import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Disc, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { cn } from '../lib/utils';
import { DEFAULT_LOGO } from '../lib/brand';

const USER_LINKS = [
  { name: 'Artists', href: '/artists' },
  { name: 'Releases', href: '/releases' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'News', href: '/news' },
  { name: 'Submit Demo', href: '/submit-demo' },
];

const ADMIN_LINKS = [
  { name: 'Overview', href: '/admin' },
  { name: 'Artists', href: '/admin/artists' },
  { name: 'Releases', href: '/admin/releases' },
  { name: 'Events', href: '/admin/events' },
  { name: 'News', href: '/admin/news' },
  { name: 'Demos', href: '/admin/demos' },
  { name: 'Settings', href: '/admin/settings' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const config = useQuery(api.config.get);
  const customLogo = config?.logoUrl || null;

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('user'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const links = isAdminPath ? ADMIN_LINKS : USER_LINKS;

  const getAccountLink = () => {
    if (isAdminPath) return "/";
    if (isLoggedIn) return "/profile";
    return "/login";
  };

  const getAccountLabel = () => {
    if (isAdminPath) return "Exit Admin";
    if (isLoggedIn) return "Profile";
    return "Account";
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500 border-b py-4'
      )}
      style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--border)' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Mobile Header Layout */}
        <div className="flex items-center justify-between w-full md:hidden">
          <button
            className="text-[var(--foreground)] p-2 -ml-2 active:scale-95 transition-transform touch-manipulation"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-8 h-8 overflow-hidden">
              <img src={customLogo || DEFAULT_LOGO} alt="1DORUZ Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-[16px] font-bold tracking-[0.1em] text-[var(--foreground)] whitespace-nowrap uppercase">
              1DORUZ <span className="text-brand-red-500 font-light">RECORDS</span>
            </span>
          </Link>

          <Link
            to={getAccountLink()}
            className="p-2 -mr-2 text-brand-red-500 active:scale-95 transition-transform touch-manipulation"
          >
            <User size={20} />
          </Link>
        </div>

        {/* Desktop Logo Layout */}
        <Link to="/" className="hidden md:flex items-center gap-4 shrink-0 group">
          <div className="w-10 h-10 overflow-hidden group-hover:scale-105 transition-transform">
              <img src={customLogo || DEFAULT_LOGO} alt="1DORUZ Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-[0.05em] text-[var(--foreground)] whitespace-nowrap">
              1DORUZ <span className="text-brand-red-500 font-light">RECORDS</span>
            </span>
          </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'relative text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-brand-red-500',
                location.pathname === link.href ? 'text-brand-red-500' : 'text-[var(--secondary)]'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-[var(--foreground)]/20 mx-2" />
          <Link
            to={getAccountLink()}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red-500 hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
          >
            <User size={14} /> {getAccountLabel()}
          </Link>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-[var(--nav-bg)] backdrop-blur-sm md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-[280px] bg-[var(--card)] border-r border-brand-red-500/10 p-8 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <span className="font-serif text-xl font-bold tracking-widest text-[var(--foreground)]">MENU</span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 -mr-2 text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-8">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-[14px] font-bold uppercase tracking-[0.2em] transition-colors',
                        location.pathname === link.href ? 'text-brand-red-500' : 'text-[var(--secondary)]'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto pt-10 border-t border-[var(--border)]">
                  <Link
                    to={getAccountLink()}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full border border-brand-red-500 px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-red-500 hover:bg-brand-red-500 hover:text-[var(--background)] transition-colors"
                  >
                    <User size={16} /> {getAccountLabel()}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
