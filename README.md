# AI Automation Specialist Portfolio

A modern, professional freelancing portfolio website built with Django, featuring AI automation services, 3D animations, and dark/light mode toggle.

## 🚀 Features

### Core Pages
- **Home/About Me** - Professional introduction with 3D animated effects
- **Services** - Comprehensive automation solutions
- **Projects** - Detailed project showcase with benefits
- **Contact** - User-friendly form with auto-response system

### Key Features
- ✨ **3D Background Animations** - Three.js powered particle system
- 🌙 **Dark/Light Mode Toggle** - Persistent theme switching
- 📱 **Responsive Design** - Mobile-first approach
- 📊 **Analytics Tracking** - Page views and project interactions
- 📧 **Contact Form Automation** - Auto-response and admin notifications
- 🎨 **Modern UI/UX** - Professional design with smooth animations

### Services Offered
1. **Workflow Automation** (n8n, Zapier, Make)
2. **AI Chatbots** (voice/text, GPT-based, customer support)
3. **API Integrations** (CRM, payment, scheduling)
4. **Data Automation** (scraping, cleaning, reporting)
5. **AI Tools** (custom AI for business tasks)

### Featured Projects
1. **AI Agent Chatbot** - Intelligent FAQ and booking system
2. **Email Responder Automation** - Smart categorization with n8n
3. **WhatsApp Responder Automation** - AI-powered messaging
4. **Lead Generation Workflow** - Google Maps/LinkedIn automation
5. **Contact Form Automation** - Complete inquiry management

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Django 4.2.7
- **Database**: SQLite
- **3D Graphics**: Three.js
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## 📦 Installation

### Prerequisites
- Python 3.8+
- pip (Python package installer)

### Setup Instructions

1. **Clone or Download** the project files to your local machine

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Database Migrations**
   ```bash
   python manage.py migrate
   ```

4. **Create Admin User** (Optional)
   ```bash
   python manage.py createsuperuser
   ```

5. **Start Development Server**
   ```bash
   python manage.py runserver
   ```

6. **Access the Website**
   - Main site: http://127.0.0.1:8000/
   - Admin panel: http://127.0.0.1:8000/admin/
   - Admin credentials: username: `admin`, password: `admin123`

## 🎯 Usage

### Navigation
- **Home**: Landing page with hero section and featured content
- **Services**: Detailed service offerings with benefits
- **Projects**: Project showcase with technical details
- **Contact**: Contact form with instant feedback

### Theme Toggle
- Click the moon/sun icon in the navigation to switch between dark and light modes
- Theme preference is saved in browser localStorage

### Contact Form
- Fill out the contact form to send inquiries
- Auto-response emails are sent to users
- Admin notifications are sent for new submissions
- All submissions are stored in the database

### Admin Panel
- Access at `/admin/` to view:
  - Contact form submissions
  - Page view analytics
  - Project view tracking

## 📁 Project Structure

```
portfolio/
├── manage.py                 # Django management script
├── requirements.txt          # Python dependencies
├── README.md                # This file
├── portfolio/               # Django project settings
│   ├── __init__.py
│   ├── settings.py          # Project configuration
│   ├── urls.py             # Main URL routing
│   ├── wsgi.py             # WSGI configuration
│   └── asgi.py             # ASGI configuration
├── main/                   # Main Django app
│   ├── __init__.py
│   ├── admin.py            # Admin interface
│   ├── apps.py             # App configuration
│   ├── models.py           # Database models
│   ├── views.py            # View functions
│   └── urls.py             # App URL routing
├── templates/              # HTML templates
│   ├── base.html           # Base template
│   └── main/               # App-specific templates
│       ├── home.html
│       ├── services.html
│       ├── projects.html
│       └── contact.html
└── static/                 # Static files
    ├── css/
    │   └── style.css       # Main stylesheet
    └── js/
        ├── script.js       # Main JavaScript
        └── three-animations.js  # 3D animations
```

## 🎨 Customization

### Colors and Themes
- Edit CSS variables in `static/css/style.css`
- Modify `:root` and `.dark-mode` selectors for theme colors

### Content Updates
- Update service descriptions in `templates/main/services.html`
- Modify project details in `templates/main/projects.html`
- Change contact information in templates and `main/views.py`

### 3D Animations
- Customize particle system in `static/js/three-animations.js`
- Adjust animation parameters and colors

## 📧 Email Configuration

### Development (Current)
- Emails are printed to console
- No actual emails are sent

### Production Setup
Update `portfolio/settings.py`:
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'your-smtp-host'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email'
EMAIL_HOST_PASSWORD = 'your-password'
```

## 🚀 Deployment

### Production Checklist
1. Set `DEBUG = False` in settings.py
2. Configure proper email settings
3. Set up static file serving
4. Use a production database (PostgreSQL recommended)
5. Configure proper security settings
6. Set up SSL/HTTPS

### Static Files
```bash
python manage.py collectstatic
```

## 📊 Analytics

The website tracks:
- Page views with IP addresses and user agents
- Project interaction tracking
- Contact form submissions
- All data is stored in SQLite database

## 🤝 Support

For questions or support regarding this portfolio website, please contact through the contact form on the website.

## 📄 License

This project is created for portfolio purposes. Feel free to use and modify as needed.

---

**Built with ❤️ using Django, Three.js, and modern web technologies**

