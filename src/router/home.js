import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

// Views
const Dashboard = () => import('../views/home/Dashboard');

const Colors = () => import('../views/home/theme/Colors');
const Typography = () => import('../views/home/theme/Typography');

const Charts = () => import('../views/home/Charts');
const Widgets = () => import('../views/home/Widgets');

// Views - Components
const Cards = () => import('../views/home/base/Cards');
const Forms = () => import('../views/home/base/Forms');
const Switches = () => import('../views/home/base/Switches');
const Tables = () => import('../views/home/base/Tables');
const Tabs = () => import('../views/home/base/Tabs');
const Breadcrumbs = () => import('../views/home/base/Breadcrumbs');
const Carousels = () => import('../views/home/base/Carousels');
const Collapses = () => import('../views/home/base/Collapses');
const Jumbotrons = () => import('../views/home/base/Jumbotrons');
const ListGroups = () => import('../views/home/base/ListGroups');
const Navs = () => import('../views/home/base/Navs');
const Navbars = () => import('../views/home/base/Navbars');
const Paginations = () => import('../views/home/base/Paginations');
const Popovers = () => import('../views/home/base/Popovers');
const ProgressBars = () => import('../views/home/base/ProgressBars');
const Tooltips = () => import('../views/home/base/Tooltips');

// Views - Buttons
const StandardButtons = () => import('../views/home/buttons/StandardButtons');
const ButtonGroups = () => import('../views/home/buttons/ButtonGroups');
const Dropdowns = () => import('../views/home/buttons/Dropdowns');
const BrandButtons = () => import('../views/home/buttons/BrandButtons');

// Views - Icons
const Flags = () => import('../views/home/icons/Flags');
const FontAwesome = () => import('../views/home/icons/FontAwesome');
const SimpleLineIcons = () => import('../views/home/icons/SimpleLineIcons');
const CoreUIIcons = () => import('../views/home/icons/CoreUIIcons');

// Views - Notifications
const Alerts = () => import('../views/home/notifications/Alerts');
const Badges = () => import('../views/home/notifications/Badges');
const Modals = () => import('../views/home/notifications/Modals');

// Users
const Users = () => import('../views/home/users/Users');
const User = () => import('../views/home/users/User');

//Doctors
Vue.use(Router);

export default {
  path: '/home',
  redirect: '/home/dashboard',
  name: 'Home',
  component: DefaultContainer,
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: 'theme',
      redirect: '/home/theme/colors',
      name: 'Theme',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'colors',
          name: 'Colors',
          component: Colors
        },
        {
          path: 'typography',
          name: 'Typography',
          component: Typography
        }
      ]
    },
    {
      path: 'charts',
      name: 'Charts',
      component: Charts
    },
    {
      path: 'widgets',
      name: 'Widgets',
      component: Widgets
    },
    {
      path: 'users',
      meta: {label: 'Users'},
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          component: Users,
        },
        {
          path: ':id',
          meta: {label: 'User Details'},
          name: 'User',
          component: User,
        },
      ]
    },
    {
      path: 'base',
      redirect: '/home/base/cards',
      name: 'Base',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'cards',
          name: 'Cards',
          component: Cards
        },
        {
          path: 'forms',
          name: 'Forms',
          component: Forms
        },
        {
          path: 'switches',
          name: 'Switches',
          component: Switches
        },
        {
          path: 'tables',
          name: 'Tables',
          component: Tables
        },
        {
          path: 'tabs',
          name: 'Tabs',
          component: Tabs
        },
        {
          path: 'breadcrumbs',
          name: 'Breadcrumbs',
          component: Breadcrumbs
        },
        {
          path: 'carousels',
          name: 'Carousels',
          component: Carousels
        },
        {
          path: 'collapses',
          name: 'Collapses',
          component: Collapses
        },
        {
          path: 'jumbotrons',
          name: 'Jumbotrons',
          component: Jumbotrons
        },
        {
          path: 'list-groups',
          name: 'List Groups',
          component: ListGroups
        },
        {
          path: 'navs',
          name: 'Navs',
          component: Navs
        },
        {
          path: 'navbars',
          name: 'Navbars',
          component: Navbars
        },
        {
          path: 'paginations',
          name: 'Paginations',
          component: Paginations
        },
        {
          path: 'popovers',
          name: 'Popovers',
          component: Popovers
        },
        {
          path: 'progress-bars',
          name: 'Progress Bars',
          component: ProgressBars
        },
        {
          path: 'tooltips',
          name: 'Tooltips',
          component: Tooltips
        }
      ]
    },
    {
      path: 'buttons',
      redirect: '/home/buttons/standard-buttons',
      name: 'Buttons',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'standard-buttons',
          name: 'Standard Buttons',
          component: StandardButtons
        },
        {
          path: 'button-groups',
          name: 'Button Groups',
          component: ButtonGroups
        },
        {
          path: 'dropdowns',
          name: 'Dropdowns',
          component: Dropdowns
        },
        {
          path: 'brand-buttons',
          name: 'Brand Buttons',
          component: BrandButtons
        }
      ]
    },
    {
      path: 'icons',
      redirect: '/home/icons/font-awesome',
      name: 'Icons',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'coreui-icons',
          name: 'CoreUI Icons',
          component: CoreUIIcons
        },
        {
          path: 'flags',
          name: 'Flags',
          component: Flags
        },
        {
          path: 'font-awesome',
          name: 'Font Awesome',
          component: FontAwesome
        },
        {
          path: 'simple-line-icons',
          name: 'Simple Line Icons',
          component: SimpleLineIcons
        }
      ]
    },
    {
      path: 'notifications',
      redirect: '/home/notifications/alerts',
      name: 'Notifications',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'alerts',
          name: 'Alerts',
          component: Alerts
        },
        {
          path: 'badges',
          name: 'Badges',
          component: Badges
        },
        {
          path: 'modals',
          name: 'Modals',
          component: Modals
        }
      ]
    }
  ]
}
