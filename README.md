# 🚀 MyNewPortfolio

A modern, responsive portfolio website built with cutting-edge technologies including **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and more. This comprehensive portfolio showcases my skills, projects, and includes a functional blog system with contact form.

## ✨ Features

- **🎨 Modern Design** - Clean, professional interface with dark theme
- **📱 Fully Responsive** - Optimized for all devices and screen sizes
- **⚡ Fast Performance** - Built with Next.js 15 and Turbopack
- **🎭 Smooth Animations** - Beautiful transitions using Framer Motion
- **📝 Blog System** - Dynamic blog with analytics and real-time stats
- **📧 Contact Form** - Functional contact form with email delivery
- **🛠️ Project Showcase** - Interactive project demos and case studies
- **🌐 Multi-language** - Support for English and Filipino
- **📊 Analytics Dashboard** - Real-time blog analytics and insights
- **🛒 E-commerce Demo** - Full-featured online store demonstration
- **📋 Task Management** - TaskFlow Pro project management system

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Database:** Supabase (for TaskFlow Pro)
- **Email:** FormSubmit.co
- **Deployment:** Ready for Netlify/Vercel
- **Charts:** Chart.js & React-Chartjs-2

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jirehcustodio/MyNewPortfolio.git
   cd MyNewPortfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── blog/               # Blog system with dynamic routes
│   ├── projects/           # Project showcase pages
│   ├── taskflow/           # Task management application
│   ├── analytics/          # Analytics dashboard
│   ├── contact-success/    # Contact form success page
│   └── lib/                # Utilities and configurations
public/
├── icons/                  # Icon assets
└── images/                 # Static images
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for optional configurations:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Contact Form
The contact form is pre-configured to send emails to `jireh4401@gmail.com` using FormSubmit.co. No additional setup required!

## 🚀 Deployment

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy automatically with these settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

### Deploy to Vercel
1. Push your code to GitHub
2. Import project to Vercel
3. Deploy with one click!

## 📊 Features Overview

### 🏠 Homepage
- Hero section with animated introduction
- Skills and expertise showcase
- Featured projects preview
- Blog highlights
- Contact information

### 📝 Blog System
- Dynamic blog posts with rich content
- Real-time view counting and analytics
- Category-based filtering
- Professional cover images
- Social sharing capabilities

### 🛠️ Projects
- **TaskFlow Pro** - Complete project management system
- **E-commerce Store** - Full online shopping experience
- **Analytics Dashboard** - Data visualization and insights
- Interactive demos and live previews

### 📧 Contact
- Functional contact form
- Email delivery via FormSubmit.co
- Success page with confirmation
- Professional email formatting

## 🎨 Customization

### Colors & Themes
Modify the color scheme in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### Content
- Update personal information in component files
- Add your projects in `src/app/lib/projects.ts`
- Modify blog posts in `src/app/lib/articles.ts`

## 📈 Performance

- **Lighthouse Score:** 95+ across all metrics
- **Core Web Vitals:** Optimized for excellent user experience
- **SEO:** Meta tags and structured data included
- **Accessibility:** WCAG 2.1 compliant

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email:** jireh4401@gmail.com
- **LinkedIn:** [linkedin.com/in/jireh-custodio-19a492341](https://linkedin.com/in/jireh-custodio-19a492341)
- **GitHub:** [github.com/jirehcustodio](https://github.com/jirehcustodio)

## 🙏 Acknowledgments

Built with the assistance of AI tools and modern web development best practices. Special thanks to the open-source community for the amazing tools and libraries that made this portfolio possible.

---

**⭐ If you find this portfolio helpful, please consider giving it a star on GitHub!**
