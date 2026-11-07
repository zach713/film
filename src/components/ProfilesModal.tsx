import React, { useState } from 'react';
import { X, Plus, Trash2, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfilesModalProps {
  profiles: UserProfile[];
  currentProfile: UserProfile;
  onSelectProfile: (profile: UserProfile) => void;
  onUpdateProfiles: (profiles: UserProfile[]) => void;
  onClose: () => void;
}

export const ProfilesModal: React.FC<ProfilesModalProps> = ({
  profiles,
  currentProfile,
  onSelectProfile,
  onUpdateProfiles,
  onClose,
}) => {
  const [isManaging, setIsManaging] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileIsKids, setNewProfileIsKids] = useState(false);
  const [selectedAvatarIcon, setSelectedAvatarIcon] = useState('🎬');

  const avatarChoices = ['🎬', '🍿', '🚀', '⚡', '👑', '🐺', '🦊', '🦄', '🎧', '👾'];
  const colorGradients = [
    'from-red-600 to-rose-900',
    'from-blue-600 to-indigo-900',
    'from-emerald-600 to-teal-900',
    'from-amber-500 to-orange-700',
    'from-purple-600 to-violet-900',
  ];

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;

    const newProfile: UserProfile = {
      id: `user-${Date.now()}`,
      name: newProfileName.trim(),
      avatarColor: colorGradients[profiles.length % colorGradients.length],
      avatarIcon: selectedAvatarIcon,
      isKids: newProfileIsKids,
      language: 'English',
    };

    const updated = [...profiles, newProfile];
    onUpdateProfiles(updated);
    onSelectProfile(newProfile);
    setIsAdding(false);
    setNewProfileName('');
    onClose();
  };

  const handleDeleteProfile = (id: string) => {
    if (profiles.length <= 1) return;
    const updated = profiles.filter((p) => p.id !== id);
    onUpdateProfiles(updated);
    if (currentProfile.id === id) {
      onSelectProfile(updated[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141414] flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-neutral-400 hover:text-white p-2 rounded-full focus:outline-none"
        aria-label="Close profiles"
      >
        <X className="w-7 h-7" />
      </button>

      <div className="max-w-2xl w-full text-center space-y-8">
        {!isAdding ? (
          <>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-normal">
              {isManaging ? 'Manage Profiles' : "Who's watching?"}
            </h2>

            {/* Profile Avatars Grid */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-4">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="group flex flex-col items-center gap-3 cursor-pointer"
                  onClick={() => {
                    if (isManaging) return;
                    onSelectProfile(profile);
                    onClose();
                  }}
                >
                  <div className="relative">
                    <div
                      className={`w-24 md:w-32 h-24 md:h-32 rounded-md flex items-center justify-center text-4xl md:text-5xl shadow-xl transition-all duration-200 border-2 bg-gradient-to-br ${
                        profile.avatarColor
                      } ${
                        profile.id === currentProfile.id
                          ? 'border-white scale-105'
                          : 'border-transparent group-hover:border-white group-hover:scale-105'
                      }`}
                    >
                      <span>{profile.avatarIcon}</span>
                    </div>

                    {isManaging && profiles.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProfile(profile.id);
                        }}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        title="Delete profile"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <span className="text-sm md:text-base font-medium text-neutral-400 group-hover:text-white transition-colors">
                    {profile.name}
                  </span>
                </div>
              ))}

              {/* Add Profile Tile */}
              {profiles.length < 5 && (
                <div
                  className="group flex flex-col items-center gap-3 cursor-pointer"
                  onClick={() => setIsAdding(true)}
                >
                  <div className="w-24 md:w-32 h-24 md:h-32 rounded-md border-2 border-neutral-700 hover:border-white flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200 group-hover:scale-105 bg-neutral-900">
                    <Plus className="w-10 h-10" />
                  </div>
                  <span className="text-sm md:text-base font-medium text-neutral-400 group-hover:text-white transition-colors">
                    Add Profile
                  </span>
                </div>
              )}
            </div>

            {/* Manage Profiles Button */}
            <div className="pt-6">
              <button
                onClick={() => setIsManaging(!isManaging)}
                className="border border-neutral-600 hover:border-white text-neutral-400 hover:text-white text-sm uppercase tracking-wider font-semibold py-2 px-6 transition-colors"
              >
                {isManaging ? 'Done' : 'Manage Profiles'}
              </button>
            </div>
          </>
        ) : (
          /* Add Profile Form */
          <div className="max-w-md mx-auto text-left bg-[#181818] p-6 rounded-lg border border-neutral-800 space-y-5">
            <h3 className="text-2xl font-bold text-white font-display">Add Profile</h3>
            <p className="text-xs text-neutral-400">
              Add a profile for another person watching Netflix on this account.
            </p>

            <form onSubmit={handleCreateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Profile Name
                </label>
                <input
                  type="text"
                  required
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="e.g. Cinema Buff"
                  className="w-full bg-[#2a2a2a] text-white text-sm px-3 py-2 rounded border border-neutral-700 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Pick an Avatar Icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {avatarChoices.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedAvatarIcon(icon)}
                      className={`w-9 h-9 rounded flex items-center justify-center text-lg bg-[#2a2a2a] border transition-all ${
                        selectedAvatarIcon === icon
                          ? 'border-[#E50914] scale-110'
                          : 'border-transparent hover:border-neutral-500'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="kids-toggle"
                  checked={newProfileIsKids}
                  onChange={(e) => setNewProfileIsKids(e.target.checked)}
                  className="accent-[#E50914] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="kids-toggle" className="text-xs text-neutral-300 cursor-pointer">
                  Kid? (Only shows TV shows and movies rated for children)
                </label>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase px-5 py-2.5 rounded transition-colors"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="border border-neutral-600 hover:border-white text-neutral-400 hover:text-white text-xs uppercase px-5 py-2.5 rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
