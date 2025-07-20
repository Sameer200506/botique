# GlitzGlam - Elegant Fashion Website

A beautiful, responsive boutique website built with React, TypeScript, Tailwind CSS, and Firebase integration.

## ✨ Features

### 🏠 **Home Page**
- Elegant hero section with call-to-action
- Featured categories showcase
- Responsive design with smooth animations
- Beautiful gradient backgrounds and shadows

### 🛍️ **Products Page**
- Product grid/list view toggle
- Category filtering
- Firebase Firestore integration
- Favorites functionality with local storage
- Product ratings and stock status
- Responsive product cards with hover effects

### 📧 **Contact Page**
- Contact form with Firebase integration
- Contact information display
- FAQ section
- Form validation and success/error handling

### 🔐 **Admin Panel**
- Password-protected admin access (demo: `admin123`)
- Product upload with image preview
- Firebase Storage integration for images
- Contact message management
- Product inventory management

## 🎨 Design System

### Color Palette
- **Primary**: Elegant burgundy (#8B2635)
- **Secondary**: Warm gold (#D4AF37)
- **Accent**: Soft cream (#F5E6D3)
- **Background**: Clean white with warm undertones

### Features
- Custom gradients and shadows
- Smooth animations and transitions
- Mobile-first responsive design
- Accessible color contrast
- Beautiful typography hierarchy

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd glitzglam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions)
   - Create a Firebase project
   - Enable Firestore Database
   - Enable Firebase Storage
   - Get your Firebase configuration
   - Update `src/lib/firebase.ts` with your config

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Website: `http://localhost:8080`
   - Admin Panel: `http://localhost:8080/admin` (password: `admin123`)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── Navigation.tsx      # Main navigation component
│   └── loading-spinner.tsx # Loading spinner component
├── pages/
│   ├── Home.tsx           # Landing page
│   ├── Products.tsx       # Products catalog
│   ├── Contact.tsx        # Contact form
│   ├── Admin.tsx          # Admin dashboard
│   └── NotFound.tsx       # 404 page
├── lib/
│   ├── firebase.ts        # Firebase configuration
│   └── utils.ts           # Utility functions
├── hooks/
│   └── use-toast.ts       # Toast notification hook
└── index.css              # Global styles and design system
```

## 🔧 Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui
- **Backend**: Firebase (Firestore + Storage)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks + Local Storage

## 🛠️ Firebase Integration

### Collections Used:
- **products**: Store product information and metadata
- **contacts**: Store contact form submissions

### Storage:
- **products/**: Product images uploaded via admin panel

### Security:
- Currently uses Firebase test mode (suitable for development)
- For production: implement proper security rules and authentication

## 🔒 Admin Features

Access the admin panel at `/admin` with password: `admin123`

### Product Management:
- Add new products with images
- Set product details (name, price, category, description)
- Toggle stock status and featured status
- Image upload with preview

### Contact Management:
- View all contact form submissions
- Mark messages as read/unread
- Filter and sort messages
- Real-time message count

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Adapted layouts for medium screens
- **Desktop**: Full-featured desktop experience
- **Touch Friendly**: Optimized for touch interactions

## 🎯 Key Features

### User Experience:
- Fast loading with optimized images
- Smooth animations and micro-interactions
- Intuitive navigation and user flows
- Accessible design with proper contrast

### Performance:
- Lazy loading for images
- Efficient Firebase queries
- Optimized bundle size
- Fast development server

## 🚀 Deployment

### Firebase Hosting (Recommended):
```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Other Platforms:
The built files in `dist/` can be deployed to any static hosting service like Vercel, Netlify, or traditional web servers.

## 🔄 Future Enhancements

- [ ] User authentication system
- [ ] Shopping cart functionality
- [ ] Order management
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced product search
- [ ] Customer reviews and ratings
- [ ] Wishlist functionality
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes. Please ensure you have proper licensing for production use.

## 🆘 Support

For setup help and troubleshooting:
- Check [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for Firebase configuration
- Review the console for any error messages
- Ensure all dependencies are properly installed

---

**Built with ❤️ for elegant fashion and beautiful code**