import type { IMenuItem } from "~/types/sidebar.types";

export const MENU_DATA: IMenuItem[] = [
  {
    name: 'Home',
    url: '/',
    icon: 'radix-icons:dashboard'
  },
  {
    name: 'Products',
    url: '/products',
    icon: 'ep:goods',
    disable: true
  },
  {
    name: 'Payments',
    url: '/payments',
    icon: 'ph:contactless-payment',
    disable: true
  },
  {
    name: 'Orders',
    url: '/orders',
    icon: 'fluent:receipt-28-regular',
    disable: true
  },
  {
    name: 'Customers',
    url: '/customers',
    icon: 'mingcute:group-line'
  },
  {
    name: 'Feedback',
    url: '/feedback',
    icon: 'fluent:person-feedback-48-regular',
    disable: true
  },
  {
    name: 'Settings',
    url: '/settings',
    icon: 'radix-icons:gear',
    disable: true
  },
  {
    name: 'Help center',
    url: '/help',
    icon: 'radix-icons:question-mark',
    disable: true
  },
]