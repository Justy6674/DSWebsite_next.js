import { Route, Router, Switch } from "wouter";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";
import TermsAndConditions from "./pages/TermsAndConditions";
import MedicareInfo from "./pages/MedicareInfo";
import MedicalWeightManagement from "./pages/MedicalWeightManagement";
import NutritionMealPlanning from "./pages/NutritionMealPlanning";
import MovementActivityPrograms from "./pages/MovementActivityPrograms";
import MentalHealthSupport from "./pages/MentalHealthSupport";
import SleepRecoveryOptimization from "./pages/SleepRecoveryOptimization";
import GoalSettingMaintenance from "./pages/GoalSettingMaintenance";
import MeetTheTeam from "./pages/MeetTheTeam";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogProfessional from "./pages/BlogProfessional";
import BlogSimple from "./pages/BlogSimple";
import BlogDark from "./pages/BlogDark";
import BlogPost from "./pages/BlogPost";
import Calculator from "./pages/Calculator";
import AdminStudio from "./pages/AdminStudio";
import BlogAdminOptimized from "./pages/BlogAdminOptimized";
import AdminLoginSimple from "./pages/AdminLoginSimple";
import NotFound from "./pages/not-found";
import ToolsPage from "./pages/ToolsPage";
import PricingPage from "./pages/PricingPage";
import HowItWorks from "./pages/HowItWorks";
import ConditionsPage from "./pages/ConditionsPage";
// Location pages
import WeightLossClinicSydney from "./pages/locations/WeightLossClinicSydney";
import WeightLossClinicMelbourne from "./pages/locations/WeightLossClinicMelbourne";
import WeightLossClinicBrisbane from "./pages/locations/WeightLossClinicBrisbane";
import WeightLossClinicPerth from "./pages/locations/WeightLossClinicPerth";
import WeightLossClinicAdelaide from "./pages/locations/WeightLossClinicAdelaide";
import WeightLossClinicGoldCoast from "./pages/locations/WeightLossClinicGoldCoast";
import WeightLossClinicCanberra from "./pages/locations/WeightLossClinicCanberra";
import WeightLossClinicNewcastle from "./pages/locations/WeightLossClinicNewcastle";
import WeightLossClinicHobart from "./pages/locations/WeightLossClinicHobart";
import WeightLossClinicDarwin from "./pages/locations/WeightLossClinicDarwin";
import WeightLossClinicGeelong from "./pages/locations/WeightLossClinicGeelong";
import WeightLossClinicSunshineCoast from "./pages/locations/WeightLossClinicSunshineCoast";
import WeightLossClinicWollongong from "./pages/locations/WeightLossClinicWollongong";
import Complaints from "./pages/ComplaintsPage";

// CRITICAL robots.txt fallback - serving from React route as absolute last resort
export function RobotsTxt() {
  // This is a client-side fallback for robots.txt
  // It's not ideal but will work if the direct Express route fails
  return (
    <Route path="/robots.txt">
      <pre style={{ fontFamily: "monospace" }}>
        {`User-agent: *
Allow: /
Sitemap: https://downscale.health/sitemap.xml`}
      </pre>
    </Route>
  );
}

export default function App() {
  return (
    <div data-prerender="true">
      <Router>
        <RobotsTxt />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/faq" component={Faq} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/data-deletion" component={DataDeletion} />
          <Route path="/terms" component={TermsAndConditions} />
          <Route path="/medicare" component={MedicareInfo} />
          <Route path="/medical-weight-management" component={MedicalWeightManagement} />
          <Route path="/nutrition-meal-planning" component={NutritionMealPlanning} />
          <Route path="/movement-activity-programs" component={MovementActivityPrograms} />
          <Route path="/mental-health-support" component={MentalHealthSupport} />
          <Route path="/sleep-recovery-optimisation" component={SleepRecoveryOptimization} />
          <Route path="/goal-setting-maintenance" component={GoalSettingMaintenance} />
          <Route path="/about" component={MeetTheTeam} />
          <Route path="/meet-the-team" component={MeetTheTeam} />
          <Route path="/team" component={MeetTheTeam} />
          <Route path="/services" component={Services} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/blog" component={Blog} />
          <Route path="/research" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/studio" component={AdminStudio} />
          <Route path="/tools" component={ToolsPage} />
          <Route path="/pricing" component={PricingPage} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/conditions" component={ConditionsPage} />
          {/* Location pages */}
          <Route path="/weight-loss-clinic-sydney" component={WeightLossClinicSydney} />
          <Route path="/weight-loss-clinic-melbourne" component={WeightLossClinicMelbourne} />
          <Route path="/weight-loss-clinic-brisbane" component={WeightLossClinicBrisbane} />
          <Route path="/weight-loss-clinic-perth" component={WeightLossClinicPerth} />
          <Route path="/weight-loss-clinic-adelaide" component={WeightLossClinicAdelaide} />
          <Route path="/weight-loss-clinic-gold-coast" component={WeightLossClinicGoldCoast} />
          <Route path="/weight-loss-clinic-canberra" component={WeightLossClinicCanberra} />
          <Route path="/weight-loss-clinic-newcastle" component={WeightLossClinicNewcastle} />
          <Route path="/weight-loss-clinic-hobart" component={WeightLossClinicHobart} />
          <Route path="/weight-loss-clinic-darwin" component={WeightLossClinicDarwin} />
          <Route path="/weight-loss-clinic-geelong" component={WeightLossClinicGeelong} />
          <Route path="/weight-loss-clinic-sunshine-coast" component={WeightLossClinicSunshineCoast} />
          <Route path="/weight-loss-clinic-wollongong" component={WeightLossClinicWollongong} />
          <Route path="/complaints" component={Complaints} />
          {/* Legacy admin routes - migrated to Sanity Studio */}
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </Router>
    </div>
  );
}