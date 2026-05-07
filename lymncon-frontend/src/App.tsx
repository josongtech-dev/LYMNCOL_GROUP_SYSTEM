import { lazy, Suspense } from 'react'
import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { BRAND_COLORS } from './lymncon_component'

// Eagerly loaded: public/auth routes (small, immediate need)
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'

// Lazily loaded: admin routes (large, only needed post-auth)
const AdminDashboardPage       = lazy(() => import('./pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })))
const AdminApplicantsPage      = lazy(() => import('./pages/AdminApplicantsPage').then(m => ({ default: m.AdminApplicantsPage })))
const AdminContractorsPage     = lazy(() => import('./pages/AdminContractorsPage').then(m => ({ default: m.AdminContractorsPage })))
const AdminFinancePage         = lazy(() => import('./pages/AdminFinancePage').then(m => ({ default: m.AdminFinancePage })))
const AdminLegalTeamPage       = lazy(() => import('./pages/AdminLegalTeamPage').then(m => ({ default: m.AdminLegalTeamPage })))
const AdminClientsPage         = lazy(() => import('./pages/AdminClientsPage').then(m => ({ default: m.AdminClientsPage })))
const AdminProjectsPage        = lazy(() => import('./pages/AdminProjectsPage').then(m => ({ default: m.AdminProjectsPage })))
const AdminSettingsPage        = lazy(() => import('./pages/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })))
const AdminAnalyticsPage       = lazy(() => import('./pages/AdminAnalyticsPage').then(m => ({ default: m.AdminAnalyticsPage })))
const AdminHelpDeskPage        = lazy(() => import('./pages/AdminHelpDeskPage').then(m => ({ default: m.AdminHelpDeskPage })))
const AdminActivitiesPage      = lazy(() => import('./pages/AdminActivitiesPage').then(m => ({ default: m.AdminActivitiesPage })))
const AdminSecurityPage        = lazy(() => import('./pages/AdminSecurityPage').then(m => ({ default: m.AdminSecurityPage })))
const AdminPortalSettingsPage  = lazy(() => import('./pages/AdminPortalSettingsPage').then(m => ({ default: m.AdminPortalSettingsPage })))
const AdminLiveSiteMonitorPage = lazy(() => import('./pages/AdminLiveSiteMonitorPage').then(m => ({ default: m.AdminLiveSiteMonitorPage })))
const AdminGpsVerificationPage = lazy(() => import('./pages/AdminGpsVerificationPage').then(m => ({ default: m.AdminGpsVerificationPage })))
const AdminEscrowReleasesPage  = lazy(() => import('./pages/AdminEscrowReleasesPage').then(m => ({ default: m.AdminEscrowReleasesPage })))
const AdminMilestoneTrackingPage = lazy(() => import('./pages/AdminMilestoneTrackingPage').then(m => ({ default: m.AdminMilestoneTrackingPage })))
const AdminComplianceAuditsPage  = lazy(() => import('./pages/AdminComplianceAuditsPage').then(m => ({ default: m.AdminComplianceAuditsPage })))
const AdminUserProfilePage     = lazy(() => import('./pages/AdminUserProfilePage').then(m => ({ default: m.AdminUserProfilePage })))
const AdminNotificationsPage   = lazy(() => import('./pages/AdminNotificationsPage').then(m => ({ default: m.AdminNotificationsPage })))
const AdminUsersPage           = lazy(() => import('./pages/AdminUsersPage').then(m => ({ default: m.AdminUsersPage })))

function PageLoader() {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Spinner size="lg" color={BRAND_COLORS.blue} borderWidth="3px" />
    </Flex>
  )
}

function App() {
  return (
    <Box>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/"       element={<LandingPage />} />
          <Route path="/login"  element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin redirects */}
          <Route path="/admin-dashboard" element={<Navigate to="/admin/overview" replace />} />
          <Route path="/admin"           element={<Navigate to="/admin/overview" replace />} />

          {/* Admin — lazy loaded */}
          <Route path="/admin/overview"  element={<AdminDashboardPage />} />

          <Route path="/admin/applicants/finance"     element={<AdminApplicantsPage category="finance" />} />
          <Route path="/admin/applicants/contractors" element={<AdminApplicantsPage category="contractors" />} />
          <Route path="/admin/applicants/legal"       element={<AdminApplicantsPage category="legal" />} />
          <Route path="/admin/applicants/clients"     element={<AdminApplicantsPage category="clients" />} />

          <Route path="/admin/contractors"       element={<AdminContractorsPage />} />
          <Route path="/admin/finance"           element={<AdminFinancePage />} />
          <Route path="/admin/legal-team"        element={<AdminLegalTeamPage />} />
          <Route path="/admin/clients"           element={<AdminClientsPage />} />
          <Route path="/admin/projects"          element={<AdminProjectsPage />} />
          <Route path="/admin/settings"          element={<AdminSettingsPage />} />
          <Route path="/admin/analytics"         element={<AdminAnalyticsPage />} />
          <Route path="/admin/help-desk"         element={<AdminHelpDeskPage />} />
          <Route path="/admin/activities"        element={<AdminActivitiesPage />} />
          <Route path="/admin/security"          element={<AdminSecurityPage />} />
          <Route path="/admin/portal-settings"   element={<AdminPortalSettingsPage />} />
          <Route path="/admin/live-site-monitor" element={<AdminLiveSiteMonitorPage />} />
          <Route path="/admin/gps-verification"  element={<AdminGpsVerificationPage />} />
          <Route path="/admin/escrow-releases"   element={<AdminEscrowReleasesPage />} />
          <Route path="/admin/milestone-tracking" element={<AdminMilestoneTrackingPage />} />
          <Route path="/admin/compliance-audits" element={<AdminComplianceAuditsPage />} />
          <Route path="/admin/profile"           element={<AdminUserProfilePage />} />
          <Route path="/admin/users"             element={<AdminUsersPage />} />
          <Route path="/admin/notifications"     element={<AdminNotificationsPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Box>
  )
}

export default App
