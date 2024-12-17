import { Platform } from '../types/integration';

export const platforms: Platform[] = [
  {
    id: 'google-meet',
    name: 'Google Meet',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg',
    description: 'Connect your Google Workspace account to monitor Google Meet calls.',
    setupInstructions: [
      'Sign in with your Google Workspace admin account',
      'Grant necessary permissions for call monitoring',
      'Add team members to start monitoring their calls'
    ]
  },
  {
    id: 'zoom',
    name: 'Zoom',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/512px-Zoom_Communications_Logo.svg.png',
    description: 'Monitor Zoom meetings across your organization.',
    setupInstructions: [
      'Sign in with your Zoom admin account',
      'Install our Zoom Marketplace app',
      'Configure monitoring settings in Zoom admin panel'
    ]
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/512px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png',
    description: 'Integrate with Microsoft Teams for comprehensive call monitoring.',
    setupInstructions: [
      'Sign in with your Microsoft 365 admin account',
      'Add our app to your Teams organization',
      'Configure Teams policies for call monitoring'
    ]
  },
  {
    id: 'cisco',
    name: 'CISCO',
    logo: 'https://www.svgrepo.com/show/331733/cisco.svg',
    description: 'Monitor Cisco Webex meetings and calls.',
    setupInstructions: [
      'Connect with your Cisco Webex admin credentials',
      'Configure Webex API integration',
      'Set up monitoring preferences'
    ]
  },
  {
    id: 'freeswitch',
    name: 'FreeSWITCH',
    logo: 'https://freeswitch.org/wp-content/uploads/2019/10/logo.png',
    description: 'Monitor FreeSWITCH VoIP calls and conferences.',
    setupInstructions: [
      'Configure FreeSWITCH server connection',
      'Set up event socket listener',
      'Configure call monitoring rules'
    ]
  }
];
