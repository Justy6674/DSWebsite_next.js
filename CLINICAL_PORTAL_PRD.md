# 🏥 Downscale Clinical Portal - Product Requirements Document

**Version:** 1.0
**Date:** October 2024
**Owner:** Justin Black, Downscale Weight Loss Clinic
**Status:** Planning Phase

---

## 📋 **EXECUTIVE SUMMARY**

The Downscale Clinical Portal is a comprehensive patient education and engagement platform designed to transform traditional weight loss consultations into a continuous digital patient journey. This portal will serve as the primary touchpoint for patient education, resource access, and ongoing support between consultations.

### **Business Objectives**
- Create recurring patient engagement beyond consultations
- Reduce support workload through self-service resources
- Enable subscription revenue model ($19-39/month tiers)
- Establish competitive differentiation in telehealth market
- Build scalable patient education platform

---

## 🎯 **PRODUCT VISION**

**"Transform episodic patient consultations into continuous, supported weight loss journeys through structured educational pathways and practical tools."**

### **Success Metrics**
- **Patient Engagement:** 70%+ monthly active users
- **Revenue:** $10K+ MRR within 6 months
- **Retention:** <5% monthly churn rate
- **Support Reduction:** 40% decrease in basic enquiry calls
- **Clinical Outcomes:** Improved patient adherence and results

---

## 👥 **TARGET USERS**

### **Primary Users**
- **Current Patients:** Active in weight loss treatment
- **Maintenance Patients:** Reached goal weight, need ongoing support
- **New Patients:** Recently started treatment, need education

### **User Personas**
1. **Busy Professional Sarah (35):** Needs quick access to practical guides
2. **Parent David (42):** Wants family-friendly meal plans and time-efficient exercise
3. **Maintenance Michelle (48):** Seeks long-term sustainability resources

---

## 🏗️ **SYSTEM ARCHITECTURE**

### **Navigation Structure**
```
Dashboard
├── Medication Pillar 💊
├── Nutrition Pillar 🥗
├── Activity Pillar 🏃
├── Mental Health Pillar 🧠
├── Sleep + Recovery Pillar 😴
└── Shop Pillar 🛒
```

### **Content Hierarchy**
```
Pillar → Tile Categories → Individual Resources
```

### **Technical Stack**
- **Frontend:** Next.js with existing Downscale design system
- **Backend:** Supabase (existing infrastructure)
- **Storage:** Supabase Storage for files
- **Authentication:** Integrated with existing patient system
- **Admin:** Extension of current blog CMS

---

## 🎨 **DESIGN REQUIREMENTS**

### **DOWNSCALE UI DESIGN SYSTEM - MANDATORY COMPLIANCE**

#### **Colour System (Exact Hex Codes)**
- **Primary Brown**: `#b68a71` - Headers, buttons, accents, CTAs
- **Background Slate**: `#334155` - Main portal background
- **Card Slate**: `#475569` - ALL cards and secondary backgrounds
- **Darker Cards**: `#1e293b` - Feature cards
- **Foreground**: `#f8fafc` - Primary text (white/light)
- **Cream**: `#fef5e7` - Accent text and highlights

#### **CRITICAL DESIGN RULES - NON-NEGOTIABLE**
- ❌ **NO WHITE CARDS** - NEVER use white backgrounds
- ❌ **NO LIGHT CARDS** - All cards use bg-slate-800 (`#475569`) or bg-slate-900 (`#1e293b`)
- ❌ **NO EMOJIS** - Professional medical aesthetic only
- ✅ **Dark Theme Throughout** - Professional medical appearance
- ✅ **Brown Accents Only** - `#b68a71` on dark slate backgrounds

#### **Typography Scale**
- **Font Family**: Inter with system fallbacks
- **H1**: 64px, font-weight 800, white (`#f8fafc`)
- **H2**: 40px, font-weight 800, white (`#f8fafc`)
- **Body Text**: 16px, cream (`#fef5e7`)
- **Accent Text**: cream (`#fef5e7`)

#### **Card Component System**
```css
/* Service Cards - DARK ONLY */
background: #475569 (bg-slate-800)
border-radius: 12px (rounded-xl)
padding: 32px (p-8)
border: 1px solid #334155 (border-slate-700)

/* Feature Cards - DARKER ONLY */
background: #1e293b (bg-slate-900)
border-radius: 12px (rounded-xl)
padding: 24px (p-6)
border: 1px solid #334155 (border-slate-700)
```

#### **Button System**
```css
/* Primary CTA Buttons */
background: #b68a71 (primary brown)
color: #f8fafc (white text)
hover: #8B6F47 (darker brown)

/* Secondary Buttons */
background: #475569 (card slate)
color: #f8fafc (white text)
border: 1px solid #b68a71 (brown border)
```

### **UX Principles**
- **Mobile-First:** Primary usage on mobile devices
- **Progressive Disclosure:** Pillar → Tile → Content structure
- **Offline-Capable:** Downloadable resources for offline access
- **Search-Friendly:** Quick content discovery
- **Professional Medical Aesthetic:** Dark, trustworthy, clinical appearance

---

## 📚 **DETAILED FEATURE SPECIFICATIONS**

## **MEDICATION PILLAR 💊**

### **Core Features**
| Feature | Description | Content Type | Priority |
|---------|-------------|--------------|----------|
| Device Usage Videos | Pen injector demonstrations (Mounjaro, Wegovy) | Video embed | High |
| Product Information | Official medication sheets | PDF download | High |
| Research Library | Peer-reviewed GLP-1 studies | PDF + links | Medium |
| Side Effect Management | Practical management guides | PDF download | High |
| Week-by-Week Guides | Treatment expectation timelines | Interactive guides | High |
| Medication Comparison | Decision-making charts | Interactive tool | Medium |

### **Content Management**
- Upload video files or embed YouTube/Vimeo links
- PDF storage with download tracking
- External link management with click analytics
- Version control for updated medical information

---

## **NUTRITION PILLAR 🥗**

### **Core Features**
| Feature | Description | Content Type | Priority |
|---------|-------------|--------------|----------|
| Meal Plans | Lifestyle-integrated eating plans | PDF download | High |
| Recipe Library | Family-friendly Australian recipes | Searchable database | High |
| Macro Calculator | Personalised protein/carb/fat targets | Interactive tool | High |
| Protein Tracking | Daily protein goal tools | Interactive tracker | Medium |
| Educational Videos | Nutrition basics, label reading | Video embed | Medium |
| External Resources | Australian dietary guidelines | Curated links | Low |
| Podcast Library | Evidence-based nutrition content | Curated links | Low |
| Real-World Guides | Restaurant, travel, social eating | PDF guides | High |

### **Advanced Features**
- Recipe search and filtering
- Meal plan customisation based on preferences
- Macro tracking integration
- Shopping list generation

---

## **ACTIVITY PILLAR 🏃**

### **Core Features**
| Feature | Description | Content Type | Priority |
|---------|-------------|--------------|----------|
| Home Workout Programs | Resistance band routines | PDF + video | High |
| Exercise Videos | 5-minute desk exercises | Video library | High |
| No-Gym Movement | Bodyweight exercise guides | PDF guides | High |
| Tracking Integration | Apple Health, Fitbit connection | API integration | Medium |
| Education Content | Resistance training science | Articles/videos | Low |
| Podcast Library | Movement and habit formation | Curated links | Low |
| Life-Proof Alternatives | Backup exercise plans (A, B, C) | PDF guides | Medium |

### **Integration Requirements**
- Apple Health API for activity data
- Fitbit Web API for device integration
- Custom workout progress tracking

---

## **MENTAL HEALTH PILLAR 🧠**

### **Core Features**
| Feature | Description | Content Type | Priority |
|---------|-------------|--------------|----------|
| Stress Management | Practical stress reduction tools | PDF worksheets | High |
| Emotional Eating | Trigger identification strategies | Interactive guides | High |
| Identity Change | Behaviour modification worksheets | PDF worksheets | Medium |
| Maslow Assessment | Personal needs evaluation | Interactive tool | Medium |
| Mindfulness Resources | Meditation app links | Curated links | Low |
| Maintenance Framework | Decision-making tools | Interactive guides | High |
| CBT Resources | Thought pattern worksheets | PDF worksheets | Medium |

### **Content Approach**
- Practical, non-clinical language
- Self-assessment tools
- Progress tracking capabilities
- External app integrations

---

## **SLEEP + RECOVERY PILLAR 😴**

### **Core Features**
| Feature | Description | Content Type | Priority |
|---------|-------------|--------------|----------|
| Sleep Hygiene Guides | Practical sleep improvement | PDF guides | High |
| Educational Videos | Sleep metabolism connection | Video content | Medium |
| Relaxation Resources | Audio/video relaxation links | Curated links | Low |
| Sleep Tracking | Wearable device integration | API integration | Medium |
| Parent Strategies | Realistic sleep tips for busy parents | PDF guides | High |
| Research Articles | Sleep + weight loss studies | PDF library | Low |

---

## **SHOP PILLAR 🛒**

### **Core Features**
| Feature | Description | Content Type | Priority |
|---------|-------------|--------------|----------|
| Current Shop Integration | Embed existing shop | iFrame/redirect | High |
| Product Categories | Organised product browsing | Database | Medium |
| Educational Guides | Product need assessments | PDF guides | Low |
| Affiliate Links | Amazon, local supplier links | Link management | Medium |
| Product Reviews | Evidence-based recommendations | Articles | Low |

### **E-commerce Integration**
- Link to existing Downscale shop
- Affiliate tracking for revenue
- Product recommendation engine

---

## 🔧 **TECHNICAL SPECIFICATIONS**

### **Database Schema**
```sql
-- Portal structure
pillars (id, name, icon, description, order)
categories (id, pillar_id, name, description, order)
content_items (id, category_id, title, type, content_url, description)
user_progress (user_id, content_item_id, completed_at, progress_percentage)

-- Content management
content_types (id, name, mime_type, handler)
file_uploads (id, content_item_id, file_path, file_size, upload_date)
external_links (id, content_item_id, url, click_count, last_checked)
```

### **Content Types**
- **PDF Downloads:** Stored in Supabase Storage
- **Video Embeds:** YouTube/Vimeo integration
- **Interactive Tools:** React components
- **External Links:** Tracked and validated
- **Worksheets:** PDF with form capabilities

### **User Management**
- **Authentication:** Integrated with Supabase Auth
- **Subscription Tiers:** Free, Basic ($19/month), Premium ($39/month)
- **Progress Tracking:** Individual user journey analytics
- **Preferences:** Personalised content recommendations

---

## 🎛️ **ADMIN PANEL REQUIREMENTS**

### **Content Management Features**
- **Unified CMS:** Extend existing blog admin for portal content
- **File Upload:** Drag-and-drop PDF/image upload
- **Video Management:** Embed link management and previews
- **Category Management:** Pillar and category organisation
- **Content Scheduling:** Publish/unpublish content
- **Analytics Dashboard:** User engagement metrics

### **User Management**
- **Subscription Management:** Tier assignment and billing
- **Progress Analytics:** Individual user journey tracking
- **Engagement Reports:** Content popularity and usage
- **Support Tools:** User activity logs for support

### **Content Workflow**
```
Draft → Review → Publish → Analytics → Update
```

---

## 💰 **MONETISATION STRATEGY**

### **Subscription Tiers**

#### **Free Tier (Lead Generation)**
- Basic content access (limited per pillar)
- Email capture required
- Upgrade prompts throughout

#### **Basic Tier ($19/month)**
- Full access to all pillar content
- Download capabilities
- Basic progress tracking
- Email support

#### **Premium Tier ($39/month)**
- Everything in Basic
- Advanced interactive tools
- Priority support
- Early access to new content
- Monthly group Q&A sessions

### **Revenue Projections**
- **Month 6:** 100 Basic + 50 Premium = $2,950/month
- **Month 12:** 300 Basic + 150 Premium = $11,550/month
- **Month 24:** 500 Basic + 300 Premium = $21,200/month

---

## 🚀 **DEVELOPMENT ROADMAP**

### **Phase 1: Foundation (4 weeks)**
- [ ] Portal dashboard design and development
- [ ] Six pillar navigation structure
- [ ] Basic content display (PDF, links, videos)
- [ ] Admin panel extension for content management
- [ ] User authentication integration

### **Phase 2: Content Population (4 weeks)**
- [ ] Medication pillar content upload
- [ ] Nutrition pillar resources
- [ ] Activity pillar development
- [ ] Mental health resources
- [ ] Sleep pillar content
- [ ] Shop integration

### **Phase 3: Advanced Features (4 weeks)**
- [ ] Interactive tools (calculators, assessments)
- [ ] Progress tracking system
- [ ] Search functionality
- [ ] Mobile optimisation
- [ ] User preferences

### **Phase 4: Monetisation (2 weeks)**
- [ ] Subscription tier implementation
- [ ] Payment gateway integration
- [ ] Content gating by tier
- [ ] Analytics dashboard
- [ ] User onboarding flow

---

## 📊 **SUCCESS METRICS & KPIs**

### **Engagement Metrics**
- **Monthly Active Users:** Target 70% of registered users
- **Session Duration:** Target 15+ minutes average
- **Content Completion:** Track PDF downloads, video views
- **Return Visits:** Target 3+ visits per month per user

### **Business Metrics**
- **Subscription Conversion:** Target 15% free-to-paid conversion
- **Churn Rate:** Target <5% monthly churn
- **Revenue per User:** Track ARPU by tier
- **Support Ticket Reduction:** Target 40% decrease

### **Clinical Metrics**
- **Patient Adherence:** Track through engagement
- **Outcome Improvement:** Weight loss success correlation
- **Patient Satisfaction:** Net Promoter Score tracking

---

## 🔒 **COMPLIANCE & SECURITY**

### **Healthcare Compliance**
- **Australian Privacy Principles (APP):** Patient data protection
- **TGA Compliance:** Medication information accuracy
- **AHPRA Standards:** Professional healthcare delivery
- **Medical Disclaimers:** Clear educational vs medical advice

### **Data Security**
- **Encryption:** All patient data encrypted at rest and transit
- **Access Control:** Role-based permissions
- **Audit Logging:** All user actions tracked
- **Backup Strategy:** Regular automated backups

---

## 🎯 **IMMEDIATE NEXT STEPS**

### **Week 1-2: Foundation Setup**
1. **Database Design:** Finalise portal content schema
2. **Admin Extension:** Expand blog CMS for portal content
3. **Design System:** Create portal-specific components
4. **Content Audit:** Inventory existing resources for migration

### **Week 3-4: MVP Development**
1. **Dashboard Creation:** Six pillar landing page
2. **Content Display:** Basic PDF/video/link rendering
3. **Navigation:** Pillar → Category → Content flow
4. **Authentication:** User access control

### **Immediate Content Needs**
- Medication videos (Mounjaro, Wegovy device usage)
- Nutrition meal plans (family-friendly, Australian)
- Exercise routines (resistance band, home-based)
- Sleep hygiene guides (practical, parent-focused)

---

## 📞 **STAKEHOLDER APPROVAL**

**Project Owner:** Justin Black (Medical Director)
**Content Partner:** Bec (Practice Manager)
**Technical Lead:** Claude AI Development
**Timeline:** 12-week build to full launch
**Budget Allocation:** Development time + content creation

---

## 🆕 **ENHANCED PORTAL TRANSFORMATION (V2.0)**

### **📊 PERSONALIZED HEALTH DASHBOARD**

#### **Core Dashboard Features**
- **Real Health Metrics Header:** Current weight, waist measurement, % loss since starting
- **Personal Resource Library:** Save PDFs, videos, meal plans, assessments with progress tracking
- **Halaxy Portal Integration:** Permanent quick-access link to appointment/billing software
- **Health Progress Cards:** Starting vs current metrics, medication tracking, next appointments

#### **💧 SMART WATER REMINDER SYSTEM**

**Push Notification Features:**
- Customizable intervals (30min - 4hrs) with daily goals (1.5L - 4L)
- Smart timing avoiding sleep hours with progress visualization
- Web Push API integration with Service Worker for offline notifications

**Notification Tone Personalities:**
```javascript
toneStyles = {
  encouraging: "💪 You're crushing it! Time for hydration!",
  funny: "🐫 Even camels drink water... just saying",
  kind: "💙 Gentle reminder to care for yourself",
  crass: "🔥 Oi! Drink some bloody water!",
  clinical: "⚕️ Hydration checkpoint: Optimize cellular function"
}
```

#### **🧭 ENHANCED NAVIGATION ARCHITECTURE**

**Always-Present Sidebar:**
```
📊 My Dashboard
├── Health Metrics Summary
├── Saved Resources (PDFs, videos, tools)
├── Water Reminder Settings
├── Progress Charts
└── 🔗 Halaxy Portal (appointments/billing)

💊 Medication Management
├── Device Tutorial Videos
├── Product Information Library
├── Side Effect Tracker
└── Research Articles

🥗 Nutrition Hub
├── Personalized Meal Plans
├── Recipe Collection (saved favorites)
├── Macro Calculator & History
└── Restaurant/Travel Guides

🏃 Activity Tracker
├── Workout Programs (saved routines)
├── Exercise Video Library
├── Progress & Wearable Sync
└── Movement Reminders

🧠 Mental Wellness
├── Stress Management Tools
├── CBT Worksheets (saved/completed)
├── Identity Development
└── Mindfulness Resources

😴 Sleep Optimization
├── Sleep Hygiene Protocols
├── Recovery Tracking
├── Parent-Specific Strategies
└── Sleep Environment Setup

🛒 Product Hub
├── Pharmacy Orders
├── Supplement Recommendations
├── Device Reviews & Purchases
└── Affiliate Partner Stores
```

#### **🗄️ EXPANDED DATABASE SCHEMA**
```sql
-- Enhanced health tracking
user_health_metrics (user_id, weight, waist, body_fat, recorded_date)
user_medications (user_id, medication, dosage, time_taken, start_date)
user_baselines (user_id, starting_metrics, goal_metrics, start_date)

-- Personal resource library
user_saved_resources (user_id, resource_type, resource_id, saved_date, progress)
user_preferences (user_id, water_reminder_settings, notification_style, dashboard_layout)

-- Water reminder system
water_reminders (user_id, daily_goal, interval_minutes, tone_style, active_hours)
water_intake_log (user_id, amount_ml, recorded_time, reminder_triggered)

-- Engagement tracking
user_activities (user_id, activity_type, completed_date, notes)
progress_milestones (user_id, milestone_type, achieved_date, celebration_sent)
```

#### **📱 PROGRESSIVE WEB APP FEATURES**
- PWA capabilities with offline access to saved resources
- Push notification permissions with custom sound/vibration patterns
- Quick-action floating buttons and swipe gestures
- Respect user's Do Not Disturb settings with engagement analytics

#### **🎯 ENGAGEMENT & RETENTION FEATURES**
- Achievement badges for consistency and progress streaks
- Weekly progress reports with personalized coaching prompts
- Social sharing of milestones (optional) with celebration notifications
- Personal resource library with progress tracking on all saved content

---

**Document Status:** ✅ Enhanced V2.0 - Ready for Implementation
**Next Review:** Weekly progress updates
**Success Criteria:** Patient engagement + subscription revenue + health outcome tracking targets met**