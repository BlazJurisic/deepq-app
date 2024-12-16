import React from 'react';
import { AlertCircle, Check } from 'lucide-react';
import AccessibilityInfo from './AccessibilityInfo';

interface StepProps {
  number: number;
  title: string;
  description: string;
  completed?: boolean;
}

function SetupStep({ number, title, description, completed }: StepProps) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg bg-background-card border">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        completed ? 'bg-green-500' : 'bg-purple-600'
      }`}>
        {completed ? (
          <Check className="w-5 h-5 text-white" />
        ) : (
          <span className="text-white font-medium">{number}</span>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-content-primary mb-1">{title}</h3>
        <p className="text-content-secondary">{description}</p>
      </div>
    </div>
  );
}

export default function GoogleMeetSetup() {
  return (
    <div className="space-y-6">
      <div className="bg-background-card p-6 rounded-lg border">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg"
              alt="Google Meet"
              className="w-12 h-12"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-content-primary mb-2">
              Google Meet Integration
            </h2>
            <p className="text-content-secondary mb-4">
              Connect your Google Workspace account to enable real-time deepfake detection during Google Meet calls.
            </p>
            <div className="flex items-center text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-lg">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>Admin privileges required for setup</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SetupStep
          number={1}
          title="Sign in with Google Workspace"
          description="Use your Google Workspace admin account to authorize the integration."
        />
        <SetupStep
          number={2}
          title="Configure Permissions"
          description="Grant necessary permissions for call monitoring and analysis."
        />
        <SetupStep
          number={3}
          title="Add Team Members"
          description="Specify which team members' calls should be monitored for deepfake detection."
        />
      </div>

      <div className="flex space-x-4">
        <button
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none transition-colors"
          aria-label="Start Google Meet integration setup"
        >
          Start Setup
        </button>
        <button
          className="px-6 py-3 border text-content-primary hover:bg-background-primary rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none transition-colors"
          aria-label="View integration documentation"
        >
          View Documentation
        </button>
      </div>

      <AccessibilityInfo />
    </div>
  );
}