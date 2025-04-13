# Updating Your Firebase Rules

You currently have default development rules with expiration date:
```json
{
  "rules": {
    ".read": "now < 1726513200000",  // 2024-9-17
    ".write": "now < 1726513200000",  // 2024-9-17
  }
}
```

These rules are insecure and are causing permission errors with your updated code. Follow these steps to fix the issue:

## Step 1: Update the Realtime Database Rules

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project "image-generation-app-ce29e"
3. Click on "Realtime Database" in the left sidebar
4. Click on the "Rules" tab
5. Replace the existing rules with these secure rules:

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "userMessages": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

6. Click "Publish" to save the changes

## Step 2: Update the Storage Rules

1. In the Firebase Console, go to "Storage" in the left sidebar
2. Click on the "Rules" tab
3. Replace the existing rules with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Default deny all
    match /{allPaths=**} {
      allow read, write: if false;
    }
    
    // Allow users to access their own image files
    match /images/{userId}/{imageId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Click "Publish" to save the changes

## Step 3: Update Your Local Code

The Dashboard component has been updated to use user-specific paths:
- Messages are now stored at `userMessages/{userId}/`
- Images are stored at `images/{userId}/`

These changes ensure that:
1. Each user can only read/write their own data
2. Authentication is required for all operations
3. Data is organized by user ID

## Step 4: Test Your App

After updating both the rules and code, try using your app again. The permission error should be resolved, and you should be able to:
1. Send prompts
2. Generate images
3. See your message history

If you still encounter issues, please check the browser console for specific error messages. 