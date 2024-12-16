export type PlatformId = 'google-meet' | 'zoom' | 'teams' | 'cisco' | 'freeswitch';

export interface Platform {
  id: PlatformId;
  name: string;
  logo: string;
  description: string;
  setupInstructions: string[];
}

export interface Account {
  id: string;
  name: string;
  email: string;
  platform: PlatformId;
  status: '2fa-disabled' | '2fa-enabled' | 'pending';
  dateAdded: string;
}