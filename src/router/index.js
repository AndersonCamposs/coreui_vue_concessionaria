import { h, render, resolveComponent } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import DefaultLayout from '@/layouts/DefaultLayout';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Login'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      // MY ROUTES
      {
        // CUSTOMERS
        path: '/customer',
        name: 'Customer',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/customer/addEdit',
        children: [
          {
            path: '/customer/addEdit/:id?',
            name: 'CustomerAddEdit',
            component: () => import('@/views/customers/AddEditCustomer.vue'),
          },
          {
            path: '/customer/list',
            name: 'CustomerList',
            component: () => import('@/views/customers/ListCustomers.vue'),
          },
        ],
      },
      {
        // BRANDS
        path: '/brand',
        name: 'Brand',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/brand/addEdit',
        children: [
          {
            path: '/brand/addEdit/:id?',
            name: 'BrandAddEdit',
            component: () => import('@/views/brands/AddEditBrand.vue'),
          },
          {
            path: '/brand/list',
            name: 'BrandList',
            component: () => import('@/views/brands/ListBrands.vue'),
          },
        ],
      },
      {
        // CATEGORIES
        path: '/category',
        name: 'Category',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/category/addEdit',
        children: [
          {
            path: '/category/addEdit/:id?',
            name: 'CategoryAddEdit',
            component: () => import('@/views/categories/AddEditCategory.vue'),
          },
          {
            path: '/category/list',
            name: 'CategoryList',
            component: () => import('@/views/categories/ListCategories.vue'),
          },
        ],
      },
      {
        // VEHICLES
        path: '/vehicle',
        name: 'Vehicle',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/vehicle/addEdit',
        children: [
          {
            path: '/vehicle/addEdit/:id?',
            name: 'VehicleAddEdit',
            component: () => import('@/views/vehicles/AddEditVehicle.vue'),
          },
          {
            path: '/vehicle/list',
            name: 'VehicleList',
            component: () => import('@/views/vehicles/ListVehicles.vue'),
          },
          {
            path: '/vehicle/details/:id',
            name: 'VehicleDetails',
            component: () => import('@/views/vehicles/VehicleDetails.vue'),
          },
          {
            path: '/vehicle/editStatus',
            name: 'VehicleEditStatus',
            component: () => import('@/views/vehicles/VehicleStatusEdit.vue'),
          },
        ],
      },
      {
        path: '/sale',
        name: 'Sale',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/sale/add',
        children: [
          {
            path: '/sale/add',
            name: 'SaleAdd',
            component: () => import('@/views/sales/AddSale.vue'),
          },
          {
            path: '/sale/list',
            name: 'SaleList',
            component: () => import('@/views/sales/ListSales.vue'),
          },
        ],
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'),
      },
      {
        path: '/theme',
        name: 'Theme',
        redirect: '/theme/typography',
      },
      {
        path: '/theme/colors',
        name: 'Colors',
        component: () => import('@/views/theme/Colors.vue'),
      },
      {
        path: '/theme/typography',
        name: 'Typography',
        component: () => import('@/views/theme/Typography.vue'),
      },
      {
        path: '/base',
        name: 'Base',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/accordion',
            name: 'Accordion',
            component: () => import('@/views/base/Accordion.vue'),
          },
          {
            path: '/base/breadcrumbs',
            name: 'Breadcrumbs',
            component: () => import('@/views/base/Breadcrumbs.vue'),
          },
          {
            path: '/base/cards',
            name: 'Cards',
            component: () => import('@/views/base/Cards.vue'),
          },
          {
            path: '/base/carousels',
            name: 'Carousels',
            component: () => import('@/views/base/Carousels.vue'),
          },
          {
            path: '/base/collapses',
            name: 'Collapses',
            component: () => import('@/views/base/Collapses.vue'),
          },
          {
            path: '/base/list-groups',
            name: 'List Groups',
            component: () => import('@/views/base/ListGroups.vue'),
          },
          {
            path: '/base/navs',
            name: 'Navs',
            component: () => import('@/views/base/Navs.vue'),
          },
          {
            path: '/base/paginations',
            name: 'Paginations',
            component: () => import('@/views/base/Paginations.vue'),
          },
          {
            path: '/base/placeholders',
            name: 'Placeholders',
            component: () => import('@/views/base/Placeholders.vue'),
          },
          {
            path: '/base/popovers',
            name: 'Popovers',
            component: () => import('@/views/base/Popovers.vue'),
          },
          {
            path: '/base/progress',
            name: 'Progress',
            component: () => import('@/views/base/Progress.vue'),
          },
          {
            path: '/base/spinners',
            name: 'Spinners',
            component: () => import('@/views/base/Spinners.vue'),
          },
          {
            path: '/base/tables',
            name: 'Tables',
            component: () => import('@/views/base/Tables.vue'),
          },
          {
            path: '/base/tabs',
            name: 'Tabs',
            component: () => import('@/views/base/Tabs.vue'),
          },
          {
            path: '/base/tooltips',
            name: 'Tooltips',
            component: () => import('@/views/base/Tooltips.vue'),
          },
        ],
      },
      {
        path: '/buttons',
        name: '_Buttons',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/buttons/standard-buttons',
        children: [
          {
            path: '/buttons/standard-buttons',
            name: 'Buttons',
            component: () => import('@/views/buttons/Buttons.vue'),
          },
          {
            path: '/buttons/dropdowns',
            name: 'Dropdowns',
            component: () => import('@/views/buttons/Dropdowns.vue'),
          },
          {
            path: '/buttons/button-groups',
            name: 'Button Groups',
            component: () => import('@/views/buttons/ButtonGroups.vue'),
          },
        ],
      },
      {
        path: '/forms',
        name: 'Forms',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/forms/form-control',
        children: [
          {
            path: '/forms/form-control',
            name: 'Form Control',
            component: () => import('@/views/forms/FormControl.vue'),
          },
          {
            path: '/forms/select',
            name: 'Select',
            component: () => import('@/views/forms/Select.vue'),
          },
          {
            path: '/forms/checks-radios',
            name: 'Checks & Radios',
            component: () => import('@/views/forms/ChecksRadios.vue'),
          },
          {
            path: '/forms/range',
            name: 'Range',
            component: () => import('@/views/forms/Range.vue'),
          },
          {
            path: '/forms/input-group',
            name: 'Input Group',
            component: () => import('@/views/forms/InputGroup.vue'),
          },
          {
            path: '/forms/floating-labels',
            name: 'Floating Labels',
            component: () => import('@/views/forms/FloatingLabels.vue'),
          },
          {
            path: '/forms/layout',
            name: 'Layout',
            component: () => import('@/views/forms/Layout.vue'),
          },
          {
            path: '/forms/validation',
            name: 'Validation',
            component: () => import('@/views/forms/Validation.vue'),
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
      },
      {
        path: '/icons',
        name: 'Icons',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/icons/coreui-icons',
        children: [
          {
            path: '/icons/coreui-icons',
            name: 'CoreUI Icons',
            component: () => import('@/views/icons/CoreUIIcons.vue'),
          },
          {
            path: '/icons/brands',
            name: 'Brands',
            component: () => import('@/views/icons/Brands.vue'),
          },
          {
            path: '/icons/flags',
            name: 'Flags',
            component: () => import('@/views/icons/Flags.vue'),
          },
        ],
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/notifications/alerts',
        children: [
          {
            path: '/notifications/alerts',
            name: 'Alerts',
            component: () => import('@/views/notifications/Alerts.vue'),
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
          },
          {
            path: '/notifications/toasts',
            name: 'Toasts',
            component: () => import('@/views/notifications/Toasts.vue'),
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'));
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

// middleware de autenticação
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.user && to.meta.requiresAuth) {
    await authStore.fetchUser();
  }

  const isAuthenticated = authStore.isAuthenticated;

  if (isAuthenticated && to.name === 'Login') {
    next('/');
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
