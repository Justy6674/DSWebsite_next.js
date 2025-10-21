# Halaxy Integration TODO

## Phase 1: Backend Infrastructure ✅ COMPLETE
- [x] Create `halaxy-webhook` edge function for receiving webhooks
- [x] Create `halaxy-auth` edge function for OAuth flow
- [x] Create `halaxy-api` edge function for proxying API calls
- [x] Create database tables: `halaxy_links`, `patient_data_cache`, `audit_logs`
- [x] Implement token encryption/decryption functions
- [x] Set up RLS policies for all tables
- [x] Configure webhooks in Halaxy (3 webhooks: Patient Created, Appointment Created, Appointment Updated)

## Phase 2: Automatic Patient Matching 🔄 IN PROGRESS
- [x] Add Date of Birth field to signup form
- [x] Create `match-halaxy-patient` edge function
- [x] Implement automatic matching on signup (email + DOB verification)
- [x] Store complete session object in AuthContext
- [x] Add patient matching hook (`usePatientMatching`)
- [ ] Test patient matching flow end-to-end
- [ ] Add admin panel to manually link unmatched patients

## Phase 3: Portal UI Components 📋 TODO
- [ ] Add `HalaxyAuthCard` component to portal dashboard
- [ ] Create "Connect to Halaxy" flow UI
- [ ] Implement OAuth callback handling
- [ ] Display connection status and expiration warnings
- [ ] Add "Disconnect" functionality

## Phase 3: Data Display 📋 TODO
- [ ] Display appointments from Halaxy in portal
- [ ] Show invoices in billing section
- [ ] Display documents/results in documents section
- [ ] Implement data refresh mechanism
- [ ] Add loading states and error handling

## Phase 4: Testing & Refinement 🧪 TODO
- [ ] Test webhook data flow (create test appointment in Halaxy)
- [ ] Test OAuth connection flow
- [ ] Test token refresh when expired
- [ ] Test data caching and invalidation
- [ ] Error handling and user feedback

## Phase 5: Admin Features 👨‍⚕️ TODO
- [ ] Admin view of all Halaxy connections
- [ ] Manual sync trigger for practitioners
- [ ] Connection health monitoring
- [ ] Audit log viewing

---

**Current Status**: Phase 1 complete, moving to Phase 2 - building portal UI components
**Next Step**: Add HalaxyAuthCard to portal dashboard to enable user connections
