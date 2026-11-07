import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, X, ChevronDown, Check, User, HelpCircle, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface NavbarProps {
  currentProfile: UserProfile;
  profiles: UserProfile[];
  onSelectProfile: (profile: UserProfile) => void;
  onOpenProfilesModal: () => void;
  notifications: NotificationItem[];
  onNotificationClick: (mediaId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  availableGenres: string[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProfile,
  profiles,
  onSelectProfile,
  onOpenProfilesModal,
  notifications,
  onNotificationClick,
  searchQuery,
  onSearchChange,
  activeNav,
  onNavClick,
  selectedGenre,
  onGenreChange,
  availableGenres,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchToggle = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else if (!searchQuery) {
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'tv', label: 'TV Shows' },
    { id: 'movies', label: 'Movies' },
    { id: 'new', label: 'New & Popular' },
    { id: 'my-list', label: 'My List' },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#141414]/95 backdrop-blur-md shadow-lg shadow-black/40'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between gap-6 px-4 md:px-12 py-3 md:py-4">
        {/* Zone 1: Netflix Wordmark Logo + Category Sub-header */}
        <div className="flex items-center gap-6 md:gap-10 shrink-0">
          <button
            onClick={() => onNavClick('home')}
            className="flex items-center gap-1 group focus:outline-none"
            aria-label="Netflix Home"
          >
            {/* Authentic Netflix Arched Wordmark Style */}
            <span className="font-display text-2xl md:text-3xl font-black tracking-tight text-[#E50914] drop-shadow-sm select-none transition-transform group-hover:scale-105 duration-200">
              NETFLIX
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavClick(link.id)}
                  className={`whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-300 hover:text-white font-normal'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Secondary Zone: Genre Filter (when in TV or Movies) + Search + Notifications + Profile */}
        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          {/* Genre selector when viewing TV Shows or Movies */}
          {(activeNav === 'tv' || activeNav === 'movies') && (
            <div className="relative hidden sm:block">
              <select
                value={selectedGenre}
                onChange={(e) => onGenreChange(e.target.value)}
                className="appearance-none bg-black/60 border border-neutral-700 hover:border-neutral-500 text-xs text-white py-1.5 pl-3 pr-8 rounded-none cursor-pointer focus:outline-none focus:border-white transition-colors"
              >
                <option value="all">Genres: All</option>
                {availableGenres.map((g) => (
                  <option key={g} value={g} className="bg-[#181818] text-white">
                    {g}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}

          {/* Interactive Search Bar */}
          <div
            className={`flex items-center transition-all duration-300 ${
              isSearchOpen
                ? 'bg-black/80 border border-white/80 px-2.5 py-1 w-44 md:w-64'
                : 'bg-transparent border border-transparent p-1 w-8 md:w-8'
            }`}
          >
            <button
              onClick={handleSearchToggle}
              className="text-neutral-200 hover:text-white focus:outline-none shrink-0"
              aria-label="Search movies and series"
            >
              <Search className="w-5 h-5" />
            </button>
            {isSearchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Titles, people, genres..."
                className="bg-transparent text-white text-xs md:text-sm pl-2 pr-1 w-full focus:outline-none placeholder:text-neutral-500"
              />
            )}
            {isSearchOpen && searchQuery && (
              <button
                onClick={() => {
                  onSearchChange('');
                  searchInputRef.current?.focus();
                }}
                className="text-neutral-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Kids Mode Toggle */}
          <button
            onClick={() => {
              const kidsProfile = profiles.find((p) => p.isKids);
              if (kidsProfile) onSelectProfile(kidsProfile);
            }}
            className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
              currentProfile.isKids
                ? 'bg-[#E50914] text-white'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Kids
          </button>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="text-neutral-200 hover:text-white focus:outline-none relative p-1 transition-transform hover:scale-105"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#E50914] rounded-full ring-2 ring-black" />
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 md:w-96 bg-[#181818]/95 border border-neutral-800 rounded shadow-2xl backdrop-blur-md overflow-hidden z-50">
                <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Notifications ({notifications.length})
                  </span>
                  <span className="text-[11px] text-neutral-400">Mark all as read</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-neutral-800/60">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onNotificationClick(item.mediaId);
                        setIsNotificationsOpen(false);
                      }}
                      className="p-3 flex items-start gap-3 hover:bg-neutral-800/50 cursor-pointer transition-colors"
                    >
                      <img
                        src={item.imageUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-16 h-10 object-cover rounded shrink-0 bg-neutral-800"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                          <span className="text-[10px] text-neutral-500 shrink-0">{item.timeAgo}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-2 mt-0.5">{item.message}</p>
                      </div>
                      {item.unread && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E50914] shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-1.5 group focus:outline-none"
              aria-label="Profile and settings"
            >
              <div
                className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold shadow bg-gradient-to-br ${currentProfile.avatarColor}`}
              >
                <span>{currentProfile.avatarIcon}</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-200 ${
                  isProfileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#181818]/95 border border-neutral-800 rounded shadow-2xl backdrop-blur-md py-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-neutral-800">
                  <p className="text-[11px] text-neutral-400">Signed in as</p>
                  <p className="font-semibold text-white truncate">{currentProfile.name}</p>
                </div>

                {/* Profile Switcher List */}
                <div className="py-2 border-b border-neutral-800">
                  <p className="px-3 pb-1.5 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                    Switch Profiles
                  </p>
                  {profiles.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => {
                        onSelectProfile(profile);
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-neutral-800 text-left transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs bg-gradient-to-br ${profile.avatarColor}`}
                        >
                          {profile.avatarIcon}
                        </div>
                        <span className={profile.id === currentProfile.id ? 'font-bold text-white' : 'text-neutral-300'}>
                          {profile.name}
                        </span>
                      </div>
                      {profile.id === currentProfile.id && (
                        <Check className="w-3.5 h-3.5 text-[#E50914]" />
                      )}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      onOpenProfilesModal();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-neutral-400 hover:text-white flex items-center gap-2 transition-colors mt-1"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Manage Profiles</span>
                  </button>
                </div>

                <div className="py-1">
                  <a
                    href="#account"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-neutral-300 hover:text-white flex items-center gap-2 hover:bg-neutral-800"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Account</span>
                  </a>
                  <a
                    href="#help"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-neutral-300 hover:text-white flex items-center gap-2 hover:bg-neutral-800"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Help Center</span>
                  </a>
                  <button
                    onClick={() => {
                      onSelectProfile(profiles[0]);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-neutral-400 hover:text-white flex items-center gap-2 hover:bg-neutral-800 border-t border-neutral-800 mt-1 pt-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign out of Netflix</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="flex md:hidden items-center justify-around px-2 py-2 border-t border-neutral-800/60 bg-black/40 text-xs">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavClick(link.id)}
            className={`px-2 py-1 transition-colors ${
              activeNav === link.id ? 'text-white font-bold' : 'text-neutral-400'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
};
