# Firebase Setup Guide for GlitzGlam

This guide will help you set up Firebase for your GlitzGlam website.

## Prerequisites

1. A Google account
2. Access to the [Firebase Console](https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "glitzglam")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set up Firestore Database

1. In your Firebase project, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can change security rules later)
4. Select a location for your database (choose the closest to your users)
5. Click "Done"

## Step 3: Set up Firebase Storage

1. In your Firebase project, click on "Storage" in the left sidebar
2. Click "Get started"
3. Start in test mode for development
4. Choose the same location as your Firestore database
5. Click "Done"

## Step 4: Get Your Firebase Configuration

1. In your Firebase project, click on the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click on "Web" icon `</>`
5. Register your app with a nickname (e.g., "glitzglam-web")
6. Copy the Firebase configuration object

## Step 5: Update Your Project

1. Open `src/lib/firebase.ts`
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

## Step 6: Set up Firestore Collections

Your app will automatically create the following collections when data is first added:

### Products Collection
- Collection name: `products`
- Documents will contain:
  - `name` (string)
  - `price` (number)
  - `category` (string)
  - `description` (string)
  - `imageUrl` (string)
  - `inStock` (boolean)
  - `featured` (boolean)
  - `createdAt` (timestamp)
  - `rating` (number)

### Contacts Collection
- Collection name: `contacts`
- Documents will contain:
  - `name` (string)
  - `email` (string)
  - `phone` (string, optional)
  - `subject` (string, optional)
  - `message` (string)
  - `timestamp` (timestamp)
  - `status` (string: 'read' | 'unread')

## Step 7: Configure Firestore Security Rules

For production, you should set up proper security rules:

1. Go to Firestore Database in Firebase Console
2. Click on "Rules" tab
3. Update rules for your security requirements. Example rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to products for all users
    match /products/{document} {
      allow read: if true;
      allow write: if false; // Only allow writes through admin panel
    }
    
    // Allow write access to contacts for all users (for contact form)
    match /contacts/{document} {
      allow read: if false; // Only admin should read
      allow create: if true; // Anyone can submit contact form
      allow update, delete: if false;
    }
  }
}
```

## Step 8: Configure Storage Rules

For production, set up proper security rules for Firebase Storage:

1. Go to Storage in Firebase Console
2. Click on "Rules" tab
3. Update rules as needed. Example rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if false; // Only allow uploads through admin panel
    }
  }
}
```

## Step 9: Test Your Setup

1. Run your development server: `npm run dev`
2. Navigate to `/admin` and login with password: `admin123`
3. Try adding a test product to verify Firebase integration
4. Go to `/contact` and submit a test message
5. Check your Firebase Console to see if data is being stored

## Security Considerations

⚠️ **Important**: The current setup uses test mode for Firebase security rules, which allows read/write access to all users. For production deployment:

1. Set up proper Firestore security rules (see Step 7)
2. Configure Storage security rules (see Step 8)
3. Implement proper authentication if needed
4. Consider rate limiting and other security measures

## Troubleshooting

### Common Issues:

1. **"Permission denied" errors**: Check your Firestore security rules
2. **Image upload fails**: Verify Storage is properly configured and rules allow uploads
3. **Configuration errors**: Double-check your Firebase config object
4. **CORS errors**: Make sure your domain is authorized in Firebase settings

### Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Storage Security](https://firebase.google.com/docs/storage/security)

## Production Deployment

When ready for production:

1. Update Firebase security rules
2. Set up proper authentication if needed
3. Configure environment variables
4. Deploy to Firebase Hosting or your preferred platform

## Firebase Hosting (Optional)

To deploy to Firebase Hosting:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build your app: `npm run build`
5. Deploy: `firebase deploy`

Enjoy your new boutique website! 🛍️✨