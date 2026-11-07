export interface Character {
  id: string;
  name: string;
  actor: string;
  role: string;
  image: string;
  quote: string;
  bio: string;
  clearance: string;
}

export interface Accolade {
  outlet: string;
  quote: string;
  critic: string;
  score?: string;
}

export interface SoundtrackTrack {
  id: string;
  trackNumber: number;
  title: string;
  duration: string;
  notes: string;
  fundamentalFreq: number; // For real Web Audio score synthesis
}

export interface FilmStill {
  id: string;
  url: string;
  title: string;
  caption: string;
  aspect: string;
}

export interface ShowtimeTheater {
  id: string;
  name: string;
  format: 'IMAX 70mm' | 'Dolby Cinema' | 'Laser 4K';
  address: string;
  times: string[];
}

export interface MovieProfile {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  director: string;
  writer: string;
  composer: string;
  cinematographer: string;
  releaseDate: string;
  runtime: string;
  rating: string;
  aspectRatio: string;
  soundFormat: string;
  heroImage: string;
  secondaryImage: string;
  logline: string;
  synopsis: string;
  directorStatement: string;
  missionDossier: {
    label: string;
    value: string;
  }[];
  accolades: Accolade[];
  characters: Character[];
  stills: FilmStill[];
  soundtrack: SoundtrackTrack[];
  theaters: {
    city: string;
    items: ShowtimeTheater[];
  }[];
}

export const MOVIES: Record<string, MovieProfile> = {
  'astraea-deep-horizon': {
    id: 'astraea-deep-horizon',
    title: 'ASTRAEA: DEEP HORIZON',
    subtitle: 'A Christopher Nolan Film',
    tagline: '1.2 Billion Miles from Earth, Silence Has a Frequency.',
    director: 'Christopher Nolan',
    writer: 'Jonathan Nolan & Christopher Nolan',
    composer: 'Hans Zimmer',
    cinematographer: 'Hoyte van Hoytema, ASC, FSF, NSC',
    releaseDate: 'November 14, 2026',
    runtime: '2h 48m',
    rating: 'PG-13 (Intense Peril, Language & Cosmic Suspense)',
    aspectRatio: '1.43:1 (IMAX 70mm Exclusive) / 2.39:1',
    soundFormat: 'IMAX 12-Channel / Dolby Atmos 9.1.4',
    heroImage: '/src/assets/images/poster_space_odyssey_1794077120443.jpg',
    secondaryImage: '/src/assets/images/hero_cyber_dystopia_1794077119555.jpg',
    logline: 'Stationed 1.2 billion miles from Earth near an uncharted pulsating nebula, a lone deep-space maintenance engineer discovers that the station’s automated navigational AI has been receiving anomalous signals originating from the core of Jupiter.',
    synopsis: 'Set in the late 21st century aboard the Astraea Deep Orbital Research Facility—stationed at the gravitational balance point between Jupiter and its outer magnetosphere—the expedition was chartered to probe primordial cosmic radiation. When an unscheduled orbital decay warning triggers a blackout, Chief Engineer Dr. Gabriel Vance ventures outside the pressurized envelope to manually calibrate the magnetic shielding array. What he discovers is not an equipment fault, but a structured geometric electromagnetic pulse propagating backwards against time.',
    directorStatement: '“Astraea was conceived as a testament to physical scale and experiential cinema. We built a fully pressurized 120-ton modular habitat on Stage 5 and flew custom 70mm IMAX rigs on hydraulic gimbals. In an age of synthetic spectacle, we wanted every breath inside the helmet, every shudder of the hull, and every light from the Jovian storm to feel terrifyingly physical.” — Christopher Nolan',
    missionDossier: [
      { label: 'Orbital Station', value: 'Astraea Modular Facility Mark IV' },
      { label: 'Coordinates', value: 'Jovian Lagrange L4 (1.28 Billion km)' },
      { label: 'Atmospheric Envelope', value: '78% N2, 21% O2, 1% Argon at 101.3 kPa' },
      { label: 'Signal Modulation', value: 'Tachyon Phase Inversion (942.8 THz)' },
      { label: 'Mission Classification', value: 'Omega Level · Deep Space Treaty' },
      { label: 'Primary Propulsion', value: 'Magnetoplasmadynamic Ion Drive' },
    ],
    accolades: [
      {
        outlet: 'Variety',
        critic: 'Owen Gleiberman',
        quote: 'A staggering achievement of cosmic awe and raw psychological tension. Christopher Nolan pushes large-format cinema into the infinite.',
        score: '5/5',
      },
      {
        outlet: 'Rolling Stone',
        critic: 'David Fear',
        quote: 'Hypnotic, terrifying, and transcendent. Cillian Murphy delivers a masterclass in solitary resilience against the abyss.',
        score: '10/10',
      },
      {
        outlet: 'The Hollywood Reporter',
        critic: 'David Rooney',
        quote: 'Hans Zimmer’s monumental pipe-organ and analog synth score vibrates in your chest. An absolute must-see on the giant 70mm IMAX screen.',
        score: 'Must-See',
      },
    ],
    characters: [
      {
        id: 'gabriel-vance',
        name: 'Dr. Gabriel Vance',
        actor: 'Cillian Murphy',
        role: 'Chief Orbital Engineer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        quote: '“If the station stops rotating, we don’t just lose gravity—we lose our grip on what is real.”',
        bio: 'A veteran of three lunar industrial tours, Vance was selected for Astraea due to his rare intuition with high-stress closed-loop lifesupport and magnetohydrodynamic systems.',
        clearance: 'Alpha Clearance · Station Operations',
      },
      {
        id: 'maya-lin',
        name: 'Dr. Maya Lin',
        actor: 'Florence Pugh',
        role: 'Astrobiologist & Signal Analyst',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
        quote: '“This isn’t noise from the nebula. It’s syntax. Someone has been listening to us for ten thousand years.”',
        bio: 'Pioneered theoretical quantum xenobiology at Oxford before accepting a 5-year isolation deployment to decode non-linear atmospheric anomalies in deep space.',
        clearance: 'Special Mission Liaison · Quantum Science',
      },
      {
        id: 'marcus-hayes',
        name: 'Commander Marcus Hayes',
        actor: 'Daniel Kaluuya',
        role: 'Mission Commander',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        quote: '“Our orders are unambiguous: protect the telemetry. At any cost.”',
        bio: 'Former deep-orbit test pilot who weathered the Europa Orbital Incident. Hayes represents the iron discipline needed when 800 days from rescue.',
        clearance: 'Omega Command · Executive Authority',
      },
      {
        id: 'kenji-sato',
        name: 'Dr. Kenji Sato',
        actor: 'Hiroyuki Sanada',
        role: 'Quantum Systems Architect',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop',
        quote: '“The mathematics do not lie. Space-time is folding inward along the station’s longitudinal axis.”',
        bio: 'The chief designer behind Astraea’s artificial intelligence core and optical navigational interferometer.',
        clearance: 'Cybernetic Systems Authority',
      },
    ],
    stills: [
      {
        id: 'still-1',
        url: '/src/assets/images/poster_space_odyssey_1794077120443.jpg',
        title: 'The Spacewalk Above the Violet Nebula',
        caption: 'Filmed on 70mm IMAX 15-perf film with custom carbon-fiber camera housings pressurized for extreme zero-g gimbals.',
        aspect: '16:9',
      },
      {
        id: 'still-2',
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
        title: 'Atmospheric Storm of Jupiter',
        caption: 'Simulated utilizing fluid dynamics and practical projection mapping onto cylindrical mirrors inside the cockpit.',
        aspect: '16:9',
      },
      {
        id: 'still-3',
        url: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop',
        title: 'The Modular Centrifuge Airlock',
        caption: 'A 1:1 scale steel construction allowing 360-degree continuous camera dollies without ceiling cuts.',
        aspect: '16:9',
      },
      {
        id: 'still-4',
        url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
        title: 'Core Telemetry Array',
        caption: 'Practical CRT vector monitors and vintage aeronautic switchgear used to minimize digital interface latency.',
        aspect: '16:9',
      },
    ],
    soundtrack: [
      {
        id: 'track-1',
        trackNumber: 1,
        title: 'Orbit of Astraea (Main Theme)',
        duration: '6:42',
        notes: 'Featuring the 4-manual cathedral pipe organ recorded in London paired with Moog modular sub-bass.',
        fundamentalFreq: 65.4, // C2
      },
      {
        id: 'track-2',
        trackNumber: 2,
        title: 'The Whispering Nebula',
        duration: '5:18',
        notes: 'Bowed Tibetan singing bowls layered with analog tape delay and crystal cellos.',
        fundamentalFreq: 73.4, // D2
      },
      {
        id: 'track-3',
        trackNumber: 3,
        title: 'Tachyon Breach & Descent',
        duration: '7:55',
        notes: 'Crescendo brass cluster at 130 BPM mimicking the frantic resonance of the centrifuge thrusters.',
        fundamentalFreq: 82.4, // E2
      },
      {
        id: 'track-4',
        trackNumber: 4,
        title: '1.2 Billion Miles to Dawn',
        duration: '4:22',
        notes: 'Solo french horn and meditative string quintet recorded at Abbey Road Studios.',
        fundamentalFreq: 55.0, // A1
      },
    ],
    theaters: [
      {
        city: 'New York',
        items: [
          {
            id: 't-ny-1',
            name: 'AMC Lincoln Square IMAX',
            format: 'IMAX 70mm',
            address: '1998 Broadway, New York, NY 10023',
            times: ['11:00 AM', '2:45 PM', '6:30 PM', '10:15 PM'],
          },
          {
            id: 't-ny-2',
            name: 'Regal Union Square ScreenX',
            format: 'Dolby Cinema',
            address: '850 Broadway, New York, NY 10003',
            times: ['1:15 PM', '5:00 PM', '8:45 PM'],
          },
        ],
      },
      {
        city: 'Los Angeles',
        items: [
          {
            id: 't-la-1',
            name: 'TCL Chinese Theatre IMAX',
            format: 'IMAX 70mm',
            address: '6925 Hollywood Blvd, Hollywood, CA 90028',
            times: ['12:30 PM', '4:15 PM', '8:00 PM', '11:45 PM'],
          },
          {
            id: 't-la-2',
            name: 'Universal Cinema AMC at CityWalk',
            format: 'IMAX 70mm',
            address: '100 Universal City Plaza, Universal City, CA 91608',
            times: ['1:00 PM', '4:45 PM', '8:30 PM'],
          },
        ],
      },
      {
        city: 'London',
        items: [
          {
            id: 't-lon-1',
            name: 'BFI IMAX Waterloo',
            format: 'IMAX 70mm',
            address: '1 Charlie Chaplin Walk, South Bank, London SE1 8XR',
            times: ['10:45 AM', '2:30 PM', '6:15 PM', '10:00 PM'],
          },
          {
            id: 't-lon-2',
            name: 'Odeon Luxe Leicester Square',
            format: 'Dolby Cinema',
            address: '24-26 Leicester Square, London WC2H 7LQ',
            times: ['12:00 PM', '3:45 PM', '7:30 PM'],
          },
        ],
      },
      {
        city: 'Tokyo',
        items: [
          {
            id: 't-tok-1',
            name: 'Grand Cinema Sunshine Ikebukuro',
            format: 'IMAX 70mm',
            address: '1-30-3 Higashiikebukuro, Toshima City, Tokyo',
            times: ['11:30 AM', '3:10 PM', '6:50 PM', '10:30 PM'],
          },
        ],
      },
    ],
  },

  'neon-replicant': {
    id: 'neon-replicant',
    title: 'NEON REPLICANT: 2099',
    subtitle: 'A Denis Villeneuve Vision',
    tagline: 'When Memories Can Be Fabricated, What Remains Human?',
    director: 'Denis Villeneuve',
    writer: 'Clara Vance & Shinji Aramaki',
    composer: 'Benjamin Wallfisch & Hans Zimmer',
    cinematographer: 'Roger Deakins, ASC, BSC',
    releaseDate: 'December 18, 2026',
    runtime: '2h 38m',
    rating: 'R (Pervasive Gritty Violence, Language & Nudity)',
    aspectRatio: '2.39:1 Anamorphic Panavision',
    soundFormat: 'Dolby Atmos / 7.1 Linear PCM',
    heroImage: '/src/assets/images/hero_cyber_dystopia_1794077119555.jpg',
    secondaryImage: '/src/assets/images/poster_crime_noir_1794077121685.jpg',
    logline: 'In a rain-drenched Neo-Tokyo choked by corporate megastructures and synthetic memory traffickers, a rogue bio-detective uncovers an existential contagion that bleeds human memories into black-market neural wetware.',
    synopsis: 'Neo-Tokyo, 2099. Acid rain washes over endless holographic skyscrapers as the border between organic cognition and synthetic consciousness dissolves into profitable commodities. Detective Takeshi Vance hunts unauthorized replicant memories—until he recovers an encrypted neural chip carrying the childhood reflections of the megacorporation’s reclusive founder.',
    directorStatement: '“We aimed to capture the melancholic beauty of rain reflecting on neon glass. This is not clean digital science fiction; it is wet, tactile, heavy, and deeply human.” — Denis Villeneuve',
    missionDossier: [
      { label: 'Metropolis', value: 'Neo-Tokyo Metropolitan Sector 04' },
      { label: 'Atmospheric Acid Index', value: 'pH 3.8 (Severe Rain Hazard)' },
      { label: 'Synthetic Wetware', value: 'Nexus-X Synaptic Bio-Cores' },
      { label: 'Regulatory Agency', value: 'Repression & Memory Oversight Bureau' },
      { label: 'Memory Retention Half-Life', value: '72 Hours Without Cryo-Stabilizer' },
    ],
    accolades: [
      {
        outlet: 'IndieWire',
        critic: 'David Ehrlich',
        quote: 'A visual triumph that stands alongside the greatest cyberpunk films in history. Pure cinematic poetry in motion.',
        score: 'A',
      },
      {
        outlet: 'Empire',
        critic: 'Nick de Semlyen',
        quote: 'Dazzling, moody, and deeply poignant. The lighting design alone is worth the price of admission.',
        score: '5/5',
      },
    ],
    characters: [
      {
        id: 'takeshi-vance',
        name: 'Takeshi Vance',
        actor: 'Takeshi Kaneshiro',
        role: 'Rogue Memory Detective',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        quote: '“I have solved fifty-four murders, but not one of those memories belonged to me.”',
        bio: 'Discharged from the Special Investigations Division after surviving a cortical neural spike.',
        clearance: 'Sector 04 Enforcement',
      },
      {
        id: 'elena-rostova',
        name: 'Elena Rostova',
        actor: 'Elena Rostova',
        role: 'Synthetic Memory Architect',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
        quote: '“Pain is the hardest thing to forge. That is how you know it was real.”',
        bio: 'The chief memory designer for Arasaka Bio-Dynamics who disappeared into the neon undercity.',
        clearance: 'Level 9 Executive Security',
      },
    ],
    stills: [
      {
        id: 'nr-still-1',
        url: '/src/assets/images/hero_cyber_dystopia_1794077119555.jpg',
        title: 'The Neon Underbelly of Sector 04',
        caption: 'Shot on location with custom sodium-vapor lighting rigs and water recycling tankers.',
        aspect: '16:9',
      },
    ],
    soundtrack: [
      {
        id: 'nr-track-1',
        trackNumber: 1,
        title: 'Rain on Shinjuku Overpass',
        duration: '5:40',
        notes: 'Vintage CS-80 synthesizers paired with analog tape saturation.',
        fundamentalFreq: 58.2, // A#1
      },
      {
        id: 'nr-track-2',
        trackNumber: 2,
        title: 'Synthetic Tears & Cortical Drift',
        duration: '4:55',
        notes: 'Bowed bass guitar with shimmer reverb reverb tails.',
        fundamentalFreq: 65.4,
      },
    ],
    theaters: [
      {
        city: 'Tokyo',
        items: [
          {
            id: 't-tok-2',
            name: 'Toho Cinemas Shinjuku IMAX',
            format: 'IMAX 70mm',
            address: '1-19-1 Kabukicho, Shinjuku City, Tokyo',
            times: ['12:00 PM', '3:30 PM', '7:00 PM', '10:30 PM'],
          },
        ],
      },
      {
        city: 'New York',
        items: [
          {
            id: 't-ny-3',
            name: 'Alamo Drafthouse Lower Manhattan',
            format: 'Dolby Cinema',
            address: '28 Liberty St, New York, NY 10005',
            times: ['1:30 PM', '5:15 PM', '9:00 PM'],
          },
        ],
      },
    ],
  },
};
