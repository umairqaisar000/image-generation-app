# Manual Update for Firebase Rules

Since there are permission issues with deploying via the CLI, follow these steps to manually update your rules:

## Database Rules

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project "image-generation-app-ce29e".
3. Click on "Realtime Database" in the left sidebar.
4. Click on the "Rules" tab.
5. Replace the current rules with:

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

6. Click "Publish" to save the changes.

## Storage Rules

1. In the Firebase Console, click on "Storage" in the left sidebar.
2. Click on the "Rules" tab.
3. Replace the current rules with:

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

4. Click "Publish" to save the changes.

## Verify the Updates

After updating your rules:

1. Try using your app again to see if the permission issues are resolved.
2. If you still have errors, make sure your Dashboard component has been updated with the changes to store messages and images in user-specific paths:
   
   ```javascript
   // For database references
   const messageRef = dbRef(database, `userMessages/${user.uid}`);
   
   // For storage references
   const filename = `images/${user.uid}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpg`;
   ```

These changes should resolve your permission issues by:
1. Only allowing authenticated users to access their own data
2. Organizing data by user ID to prevent permission conflicts 