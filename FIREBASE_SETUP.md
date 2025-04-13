# Firebase Security Rules Setup

## Overview
This document explains how to deploy the security rules for Firebase Realtime Database and Storage to fix permission issues.

## Prerequisites
- Make sure you have the Firebase CLI installed:
```bash
npm install -g firebase-tools
```
- Ensure you're logged in to Firebase:
```bash
firebase login
```

## Steps to Deploy Rules

1. Make sure you have the following files in your project:
   - `database.rules.json` - Rules for Firebase Realtime Database
   - `storage.rules` - Rules for Firebase Storage

2. You can deploy these rules in two ways:

### Option 1: Using the provided script
```bash
# Make the script executable
chmod +x deploy-rules.sh

# Run the script
./deploy-rules.sh
```

### Option 2: Manual deployment
```bash
# Deploy database rules
firebase deploy --only database

# Deploy storage rules
firebase deploy --only storage
```

## Verifying the Rules

After deployment, you can verify the rules are properly applied:

1. Go to the Firebase console: https://console.firebase.google.com/
2. Select your project
3. Check the rules in:
   - Realtime Database > Rules
   - Storage > Rules

## Security Rule Explanation

### Database Rules
The database rules are structured to:
- Deny access by default
- Allow users to read and write only to their own data under `userMessages/{userId}`

### Storage Rules
The storage rules are structured to:
- Deny access by default
- Allow authenticated users to upload files to their own folders (`images/{userId}/*`)
- Allow any authenticated user to read images

## Troubleshooting

If you continue to experience permission issues after deploying the rules:

1. Make sure your app is using the correct paths:
   - Messages should be saved to `userMessages/{userId}`
   - Images should be uploaded to `images/{userId}/`

2. Verify that the user is properly authenticated before they attempt to write data

3. Check the Firebase console logs for any permission errors 