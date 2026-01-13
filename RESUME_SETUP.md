# 📄 Resume Setup Instructions

## ✅ Resume Download Button is Now Fixed!

I've updated the download button to properly link to a resume PDF file.

---

## 🚨 IMPORTANT: Add Your Resume PDF

You need to add your actual resume file to make the download work:

### **Option 1: Add Your Existing Resume (Recommended)**

1. **Prepare your resume:**
   - Make sure you have your resume as a **PDF file**
   - Name it: `resume.pdf`

2. **Add it to your project:**
   - Place the file in: `/Users/jirehb.custodio/my-portfolio/public/resume.pdf`
   - Or in VS Code: Drag your PDF into the `public` folder

3. **That's it!** The button will automatically download your resume.

---

### **Option 2: Create a New Resume**

If you need to create a new resume, you can:

1. **Use online tools:**
   - [Canva Resume Builder](https://www.canva.com/resumes/templates/)
   - [Novo Resume](https://novoresume.com/)
   - [Resume.io](https://resume.io/)
   - [FlowCV](https://flowcv.com/)

2. **Or use Google Docs/Word:**
   - Create your resume
   - Export as PDF
   - Name it `resume.pdf`
   - Add to `public` folder

---

## 📋 What Should Your Resume Include?

Based on your portfolio, include:

### **Contact Information**
- Name: Jireh B. Custodio
- Email: your-email@example.com
- Phone: Your phone number
- Location: Naga City, Philippines
- Portfolio: https://your-portfolio-url.com
- GitHub: https://github.com/jirehcustodio
- LinkedIn: Your LinkedIn profile

### **Professional Summary**
Detail-oriented Computer Engineering graduate with expertise in web development, cloud computing, and cybersecurity. Currently serving as IT Support at LGU Naga City's MyNaga App, with proven experience in building full-stack applications and municipal management systems.

### **Technical Skills**
- **Frontend:** JavaScript, TypeScript, React, Next.js, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Python
- **Databases:** MySQL, MongoDB, PostgreSQL
- **Tools:** Figma, Cisco Networking, Cloud Computing
- **Other:** Java, HTML/CSS

### **Work Experience**

**IT Support - MyNaga App**  
*LGU Naga City | 2025 - Present*
- Support cloud-based system deployments and maintain secure public digital infrastructure
- Develop and maintain CRUD applications for municipal data management
- Build specialized systems for environmental management (CENRO)

**Safety Officer 2**  
*BESO COSH | 2024 - 2025*
- Managed safety protocols and compliance
- Conducted safety audits and training

**IT Support Engineer**  
*LGU Naga City | 2024*
- Supported IT infrastructure and systems
- Provided technical support for municipal operations

**Production Assistant Intern**  
*Shot Studio | 2024 - 2025*
- Assisted in multimedia production
- Managed technical equipment

**Freelance Web Developer & Multimedia Specialist**  
*Self-employed | 2020 - Present*
- Built websites and multimedia solutions for creatives and small businesses
- Delivered 10+ successful projects

### **Key Projects**

**MyNaga CRUD Application**
- Built comprehensive data management system for LGU Naga City
- Technologies: Next.js, TypeScript, React, Tailwind CSS
- Link: https://mynaga-crud-app.vercel.app/

**MyNaga CENRO System**
- Environmental permit and compliance tracking system
- Technologies: Next.js, TypeScript, Database Integration
- Link: https://mynaga-crud-app.vercel.app/cenro

**WAM Dashboard**
- Web analytics and monitoring dashboard
- Technologies: Next.js, TypeScript, Chart.js
- Link: https://wamdashboard.netlify.app/

**Professional Portfolio**
- Modern portfolio with real-time testimonials and analytics
- Technologies: Next.js 15, TypeScript, Supabase, Framer Motion

### **Education**

**Bachelor of Science in Computer Engineering**  
*Your University Name | Graduation Year*
- Relevant coursework: Software Engineering, Database Systems, Network Security

### **Certifications**
- Cloud Systems Analyst
- Safety Officer Level 2
- [Any other certifications you have]

### **Languages**
- English: Fluent
- Filipino: Native

---

## 🎨 Resume Design Tips

1. **Keep it to 1-2 pages** (preferably 1 page)
2. **Use a clean, professional design**
3. **Include links** to your portfolio and projects
4. **Quantify achievements** (e.g., "Built 3+ municipal systems serving 100+ users")
5. **Use action verbs** (Built, Developed, Implemented, Managed)
6. **Tailor it** to the jobs you're applying for

---

## ✅ Testing the Download

After adding your resume PDF:

1. **Run your dev server:**
   ```bash
   npm run dev
   ```

2. **Open:** http://localhost:3000

3. **Scroll to About section**

4. **Click "Download Resume" button**

5. **Your resume should download!** 🎉

---

## 🚀 Deploy the Changes

After adding your resume:

```bash
# Stage changes
git add public/resume.pdf src/app/components/About.tsx

# Commit
git commit -m "✨ Add resume download functionality with PDF file"

# Push to deploy
git push origin main
```

---

## 🔒 Privacy Note

Your resume will be **publicly accessible** at:
- `https://your-domain.com/resume.pdf`

If you want to protect it:
1. Add authentication
2. Use a password-protected PDF
3. Generate unique download links

---

## 📊 Download Tracking

The button now tracks downloads in Google Analytics:
- Event: `download_resume`
- Category: `engagement`
- Label: `Resume Download`

Check your analytics dashboard to see how many people download your resume!

---

## ❓ Need Help?

If the download still doesn't work:
1. Make sure the file is named exactly `resume.pdf`
2. Make sure it's in the `public` folder
3. Clear your browser cache
4. Restart the dev server

**Now just add your resume PDF to the public folder and you're done!** 📄✨
