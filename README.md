# Yorkville Advisors Landing Page

A React-based landing page for Yorkville Advisors with integrated email form submissions.

## Email Integration Setup

This project uses EmailJS to send form submissions directly to hello@yorkville.global. To set up email functionality:

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a free account
3. Create a new service (Gmail, Outlook, etc.)

### 2. Create Email Templates
Create two email templates in your EmailJS dashboard:

#### Business Form Template (template_business):
```
Subject: New Business Support Request - {{business_name}}

Form Type: {{form_type}}
Submission Date: {{submission_date}}

Business Information:
- Business Name: {{business_name}}
- Contact Name: {{contact_name}}
- Email: {{email}}
- Years in Operation: {{years_in_operation}}
- Business Size: {{business_size}}

Requirements:
- Ideal Outcomes: {{ideal_outcomes}}
- Other Outcomes: {{other_outcome}}
- Seeking Investment: {{seeking_investment}}
- Investment Amount: {{investment_amount}}

Contact Email: {{email}}
```

#### Finance Professional Template (template_finance):
```
Subject: New Finance Professional Application - {{full_name}}

Form Type: {{form_type}}
Submission Date: {{submission_date}}

Professional Information:
- Full Name: {{full_name}}
- Email: {{email}}
- Years of Experience: {{years_experience}}
- Entity Size: {{entity_size}}
- LinkedIn: {{linkedin_url}}

Interests & Availability:
- Core Interests: {{core_interests}}
- Weekly Commitment: {{weekly_commitment}} hours
- Content Contribution: {{content_contribution}}

Contact Email: {{email}}
```

### 3. Update Configuration
Create a `.env.local` file in your project root with your EmailJS credentials:
```
VITE_EMAILJS_SERVICE_ID=service_q1t117q
VITE_EMAILJS_TEMPLATE_ID_BUSINESS=your_business_template_id
VITE_EMAILJS_TEMPLATE_ID_FINANCE=your_finance_template_id
VITE_EMAILJS_PUBLIC_KEY=z0b-6L3lS39kuY5t1
```

Or update these values directly in `src/services/emailService.js`:
- `EMAILJS_SERVICE_ID`: service_q1t117q (already configured)
- `EMAILJS_TEMPLATE_ID_BUSINESS`: Your business form template ID
- `EMAILJS_TEMPLATE_ID_FINANCE`: Your finance professional template ID
- `EMAILJS_PUBLIC_KEY`: z0b-6L3lS39kuY5t1 (already configured)

### 4. Test the Integration
1. Fill out and submit both forms
2. Check that emails are received at hello@yorkville.global
3. Verify all form data is properly formatted in the emails
4. Use the browser console to check for any EmailJS errors

### 5. Testing EmailJS Connection
You can test the EmailJS connection by opening the browser console and running:
```javascript
// Import the test function (if available in global scope)
testEmailJSConnection();
```

## Features
- Responsive design with Tailwind CSS
- Two interactive forms (Business Support & Finance Professional)
- Email integration with EmailJS
- Form validation and error handling
- Loading states and success messages
- Professional UI with hover effects and animations

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```