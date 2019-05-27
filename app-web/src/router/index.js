import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Payouts from '@/components/Payouts.vue'
import Releases from '@/components/Releases.vue'
import Profile from '@/components/Profile.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import Courses from '@/components/Courses.vue'
import Course from '@/components/Course.vue'
import Leads from '@/components/Leads.vue'
import Instagram from '@/components/Instagram.vue'
import Projects from '@/components/Projects.vue'
import ForgotPassword from '@/components/ForgotPassword.vue'
import ResetPassword from '@/components/ResetPassword.vue'
import ErrorGuide from '@/components/ErrorGuide.vue'
import FirstLogin from '@/components/FirstLogin.vue'
import LeadReport from '@/components/LeadReport.vue'
import Lesson from '@/components/Lesson.vue'
import Terms from '@/components/Terms.vue'
import SerieImporterPage from '@/components/Courses/SerieImporterPage.vue'
import Websites from '@/components/Websites.vue'
import Groups from '@/components/Groups.vue'
import Cookies from '@/components/Cookies.vue'
import ProductSalePage from '@/components/ProductSalePage.vue'
import ProductCheckoutPage from '@/components/ProductCheckoutPage.vue'
import ProductCheckoutSuccessPage from '@/components/ProductCheckoutSuccessPage.vue'
import ProductCheckoutCancelPage from '@/components/ProductCheckoutCancelPage.vue'
import Contact from '@/components/Contact.vue'
import SignUp from '@/components/Signup.vue'
import HomeMensal from '@/components/Home/HomeMensal.vue'
import AboutUs from '@/components/AboutUs.vue'
import Certificate from '@/components/Certificate.vue'
import Order from '@/components/Order.vue'
import CoursesPerPoints from '@/components/CoursesPerPoints'
import Invites from '@/components/Invites.vue'
import ChainOfKnowledge from '@/components/ChainOfKnowledge.vue'
import Reward from '@/components/Reward.vue'
import Page from '@/components/Page.vue'
import Community from '@/components/Community.vue'
import CommunityNewPost from '@/components/CommunityNewPost.vue'
import CommunityPost from '@/components/CommunityPost.vue'
import Perfil from '@/components/Perfil.vue'
import Lessons from '@/components/Lessons.vue'
import Search from '@/components/Search.vue'
import Userscatalog from '@/components/Userscatalog.vue'
import AudioLessons from '@/components/AudioLessons.vue'
import TextLessons from '@/components/TextLessons.vue'
import ExamLessons from '@/components/ExamLessons.vue'
import LoginIntegrationCallback from '@/components/LoginIntegrationCallback.vue'
import ProfileAccountSettings from '@/components/ProfileAccountSettings.vue'
import ProfilePublicSettings from '@/components/ProfilePublicSettings.vue'
import ProfileSubscriptions from '@/components/ProfileSubscriptions.vue'
import ProfilePublic from '@/components/ProfilePublic.vue'
import EventManager from '@/components/EventManager'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        herobody: HomeMensal
      }
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/eventmanager',
      name: 'EventManager',
      component: EventManager
    },
    {
      path: '/examLessons',
      name: 'ExamLessons',
      component: ExamLessons
    },
    {
      path: '/textlessons',
      name: 'TextLessons',
      component: TextLessons
    },
    {
      path: '/audiolessons',
      name: 'AudioLessons',
      component: AudioLessons
    },
    {
      path: '/userscatalog',
      name: 'Userscatalog',
      component: Userscatalog
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/lessons',
      name: 'Lessons',
      component: Lessons
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/community/posts/:slug',
      name: 'CommunityPost',
      component: CommunityPost
    },
    {
      path: '/community/new-post',
      name: 'CommunityNewPost',
      component: CommunityNewPost
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        auth: true
      }
    },

    {
      path: '/leads',
      name: 'Leads',
      component: Leads,
      meta: {
        auth: true
      }
    },

    {
      path: '/certificates/:certificateIdOrHash',
      name: 'Certificate',
      component: Certificate
    },

    {
      path: '/instagram',
      name: 'Instagram',
      component: Instagram,
      meta: {
        auth: true
      }
    },

    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      meta: {
        auth: true
      }
    },

    {
      path: '/signup',
      name: 'Signup',
      components: {herobody: SignUp}
    },

    {
      path: '/websites',
      name: 'Websites',
      component: Websites,
      meta: {
        auth: true
      }
    },

    {
      path: '/groups',
      name: 'Groups',
      component: Groups,
      meta: {
        auth: true
      }
    },

    {
      path: '/login',
      name: 'Login',
      components: {
        herobody: Login
      }
    },

    {
      path: '/login/:provider/callback',
      name: 'LoginIntegrationCallback',
      components: {
        herobody: LoginIntegrationCallback
      }
    },

    {
      path: '/register',
      name: 'Register',
      component: Register
    },

    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        auth: true
      }
    },

    {
      path: '/profile/account-settings',
      name: 'ProfileAccountSettings',
      component: ProfileAccountSettings,
      meta: {
        auth: true
      }
    },

    {
      path: '/profile/public-settings',
      name: 'ProfilePublicSettings',
      component: ProfilePublicSettings,
      meta: {
        auth: true
      }
    },

    {
      path: '/profile/subscriptions',
      name: 'ProfileSubscriptions',
      component: ProfileSubscriptions,
      meta: {
        auth: true
      }
    },

    {
      path: '/profiles/:slug',
      name: 'ProfilePublic',
      component: ProfilePublic
    },

    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {
        auth: true
      }
    },

    {
      path: '/releases',
      name: 'Releases',
      component: Releases,
      meta: {
        auth: true
      }
    },

    {
      path: '/Payouts',
      name: 'Payouts',
      component: Payouts,
      meta: {
        auth: true
      }
    },

    {
      path: '/courses',
      name: 'Courses',
      component: Courses,
      meta: {
        auth: true
      }
    },

    {
      path: '/courses/:courseSlug',
      name: 'course',
      component: Course,
      meta: {
        auth: true
      }
    },

    {
      path: '/courses/vimeo-importer/:courseSlug/:serieSlug',
      name: 'vimeo-importer',
      component: SerieImporterPage,
      meta: {
        auth: true
      }
    },

    {
      path: '/courses/:courseSlug/:serieSlug/:lessonSlug',
      name: 'lesson',
      component: Lesson,
      meta: {
        auth: true
      }
    },

    {
      path: '/courses-dev/:courseSlug/:serieSlug/:lessonSlug',
      name: 'lessons',
      component: Lessons,
      meta: {
        auth: true
      }
    },
    //ExamLessons, TextLessons, AudioLessons, Lessons


    {
      path: '/p/:publisherSlug/:productSlug',
      name: 'ProductSalePage',
      component: ProductSalePage
    },

    {
      path: '/p/:publisherSlug/:productSlug/checkout',
      name: 'ProductCheckoutPage',
      component: ProductCheckoutPage
    },

    {
      path: '/p/:publisherSlug/:productSlug/checkout-success',
      name: 'ProductCheckoutSuccessPage',
      component: ProductCheckoutSuccessPage
    },

    {
      path: '/p/:publisherSlug/:productSlug/checkout-cancel',
      name: 'ProductCheckoutCancelPage',
      component: ProductCheckoutCancelPage
    },

    {
      path: '/orders/:order_id',
      name: 'Order',
      component: Order,
      meta: {
        auth: true
      }
    },

    // {
    //   path: '/p/:publisherSlug/:productSlug/:courseSlug',
    //   name: 'CourseSalePage',
    //   component: CourseSalePage
    // },

    {
      path: '/page',
      name: 'Page',
      component: Page,
      meta: {
        auth: true
      }
    },

    {
      path: '/lead-report',
      name: 'LeadReport',
      component: LeadReport,
      meta: {
        auth: 'view-campaign-lead-total-histories'
      }
    },

    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      components: {
        herobody: ForgotPassword
      }
    },

    {
      path: '/reset-password/:token/:email',
      name: 'ResetPassword',
      component: ResetPassword
    },

    {
      path: '/first-login/:email/:token',
      name: 'FirstLogin',
      component: FirstLogin
    },

    {
      path: '/cookies',
      name: 'Cookies',
      component: Cookies
    },

    {
      path: '/chain-of-knowledge',
      name: 'ChainOfKnowledge',
      component: ChainOfKnowledge
    },

    {
      path: '/invites',
      name: 'Invites',
      component: Invites,
      meta: {auth: {roles: true, redirect: '/login?url=/invites'}}
    },

    {
      path: '/rewards/:slug',
      name: 'Reward',
      component: Reward,
      meta: {}
    },

    {
      path: '/pages/:slug',
      name: 'Page',
      component: Page,
      meta: {}
    },

    {
      path: '/403',
      name: 'Error403',
      component: ErrorGuide,
      meta: {error_code: 403}
    },

    {
      path: '/terms',
      name: 'Terms',
      component: Terms,
      meta: {}
    },

    {
      path: '/courses-per-points',
      name: 'CoursesPerPoints',
      component: CoursesPerPoints,
      meta: {}
    },

    {
      path: '*',
      name: 'Error404',
      component: ErrorGuide,
      meta: {error_code: 404}
    }

  ]
})

// router.beforeResolve((to, from, next) => {
//   if (to.name) {
//     NProgress.start()
//   }
//   next()
// })

// router.afterEach((to, from) => {
//   NProgress.done()
// })

export default router
