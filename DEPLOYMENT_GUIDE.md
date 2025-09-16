# GoDaddy Deployment Guide for yorkville.global

## 🚀 **DEPLOYMENT STEPS**

### **Step 1: Build the Production Version**
```bash
# Install dependencies (if not already done)
npm install

# Create production build
npm run build:production
```

### **Step 2: Upload Files to GoDaddy**

#### **Files to Upload:**
1. **All contents of the `dist/` folder** → Upload to your `public_html` directory
2. **`.htaccess` file** → Upload to your `public_html` directory (root level)
3. **`robots.txt`** → Already included in dist folder
4. **`sitemap.xml`** → Already included in dist folder

#### **GoDaddy File Manager Steps:**
1. Log into your GoDaddy account
2. Go to "Web Hosting" → "Manage"
3. Open "File Manager"
4. Navigate to `public_html` folder
5. Delete any existing files (like default GoDaddy pages)
6. Upload all files from your `dist/` folder
7. Upload the `.htaccess` file to the root of `public_html`

### **Step 3: Verify SSL Certificate**

#### **Check SSL Status:**
1. In GoDaddy hosting panel, go to "SSL Certificates"
2. Ensure SSL is "Active" for yorkville.global
3. If not active, click "Set Up" and follow instructions

#### **Test SSL:**
- Visit: `https://yorkville.global`
- Should show green lock icon
- HTTP should automatically redirect to HTTPS

### **Step 4: Configure Domain Settings**

#### **DNS Settings (if needed):**
- Ensure A record points to your hosting IP
- Ensure CNAME for www points to yorkville.global
- TTL should be 3600 (1 hour) or less

### **Step 5: Test Everything**

#### **Functionality Tests:**
- ✅ Website loads at `https://yorkville.global`
- ✅ Forms submit successfully (test both forms)
- ✅ All navigation works
- ✅ Mobile responsiveness
- ✅ SSL certificate shows green lock
- ✅ HTTP redirects to HTTPS
- ✅ Analytics tracking (check in 24-48 hours)

#### **Performance Tests:**
- Use Google PageSpeed Insights: https://pagespeed.web.dev/
- Target: 90+ score for both mobile and desktop

#### **SEO Tests:**
- Google Search Console setup
- Submit sitemap: `https://yorkville.global/sitemap.xml`

## 🔧 **POST-DEPLOYMENT CONFIGURATION**

### **1. Google Analytics Setup**
1. Go to Google Analytics
2. Add property for `yorkville.global`
3. Verify tracking is working (may take 24-48 hours)

### **2. Google Search Console**
1. Add property: `https://yorkville.global`
2. Verify ownership (HTML file method recommended)
3. Submit sitemap: `https://yorkville.global/sitemap.xml`

### **3. Email Testing**
1. Test both contact forms
2. Verify emails arrive at hello@yorkville.global
3. Check spam folders initially

### **4. Security Verification**
- SSL Labs Test: https://www.ssllabs.com/ssltest/
- Security Headers: https://securityheaders.com/
- Target: A+ rating on both

## 📊 **MONITORING SETUP**

### **Analytics Dashboards:**
- Google Analytics: Real-time and audience reports
- Microsoft Clarity: User behavior and heatmaps
- Google Search Console: SEO performance

### **Performance Monitoring:**
- Google PageSpeed Insights (monthly)
- GTmetrix (optional)
- Uptime monitoring service (recommended)

### **Regular Maintenance:**
- Monthly performance checks
- Quarterly security updates
- Annual SSL certificate renewal (automatic with GoDaddy)

## 🆘 **TROUBLESHOOTING**

### **Common Issues:**

#### **SSL Not Working:**
- Wait 24-48 hours for propagation
- Contact GoDaddy support if still issues
- Check DNS settings

#### **Forms Not Working:**
- Verify EmailJS configuration
- Check browser console for errors
- Test with different browsers

#### **Slow Loading:**
- Check image optimization
- Verify .htaccess file is uploaded
- Test from different locations

#### **Analytics Not Tracking:**
- Wait 24-48 hours for data
- Check consent banner is working
- Verify tracking IDs in environment variables

## 📞 **SUPPORT CONTACTS**

- **GoDaddy Support:** 1-480-505-8877
- **Domain Issues:** GoDaddy Domain Management
- **Hosting Issues:** GoDaddy Web Hosting Support
- **SSL Issues:** GoDaddy SSL Support

## ✅ **DEPLOYMENT CHECKLIST**

- [ ] Production build created (`npm run build:production`)
- [ ] All files uploaded to `public_html`
- [ ] `.htaccess` file uploaded
- [ ] SSL certificate active
- [ ] Domain pointing to hosting
- [ ] Website loads at `https://yorkville.global`
- [ ] HTTP redirects to HTTPS
- [ ] Both forms working
- [ ] Mobile responsive
- [ ] Analytics tracking setup
- [ ] Google Search Console configured
- [ ] Performance score 90+
- [ ] Security headers active

**Your website is now live at https://yorkville.global! 🎉**