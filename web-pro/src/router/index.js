import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/view/Home.vue';
import ProductsPage from '@/view/ProductsPage.vue';
import SignInPage from '@/view/SignInPage.vue';
import SignUpPage from '@/view/SignUpPage.vue';
import UserProfile from '@/view/UserProfile.vue';
import AddMin from '@/view/AddMin.vue';
import ResetPassword from '@/view/ResetPassword.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component:  Home
        
    },
    {
        path: '/Products/:id',
        name: 'Products',
        component: ProductsPage,
        
    },
    {
        
        path: '/Addmin',
        name: 'Addmin',
        component:  AddMin,
        
        
    },
    {
        path: '/Product',
        name: 'Product',
        component: ProductsPage,
        
    },
    {
        path: '/SignIn',
        name: 'SignIn',
        component: SignInPage,
        
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: SignUpPage,
        
    },
    
    {
        path: '/UserProfile',
        name: 'UserProfile',
        component: UserProfile,
        
    },
    {
        path: '/resetPass/:token',
        name: 'resetPass',
        component: ResetPassword,
        
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('token')
  
  
    if (to.name == "SignIn" && isLoggedIn) {
      alert("You've already logged in")
      next({ path: '/' })
    }
    if ((to.name == "Addmin" || to.name == "UserProfile") && !isLoggedIn) {
      alert("You are not logged in")
      next({ path: '/' })
    }
    next()
  })
export default router;
