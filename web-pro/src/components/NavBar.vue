<template>
  <div class="w-full">

    <Disclosure as="nav" class="bg-neutral-900" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-neutral-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>

            <TransitionRoot as="template" :show="Open">
              <Dialog as="div" class="relative z-10" @close="Open = false">
                <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0"
                  enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-hidden">
                  <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                      <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enter-from="-translate-y-full" enter-to="translate-y-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-y-0"
                        leave-to="translate-y-full">
                        <DialogPanel class="pointer-events-auto h-75 relative w-screen max-w-md">
                          <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0"
                            enter-to="opacity-full" leave="ease-in-out duration-500" leave-from="opacity-full"
                            leave-to="opacity-0">
                            <div class="bg-white rounded-lg h-100 shadow overflow-scroll">
                              <table class="w-full">
                                <thead class="border-b">
                                  <tr>
                                    <th>
                                      <span class="icon mx-10 my-1 btn btn-dark" key="false" @click="clearCart(),this.newcart = '' ">
                                        Clear
                                      </span>
                                    </th>
                                    <th class="px-4 py-2 text-left">Title</th>


                                  </tr>
                                </thead>

                                <tbody>
                                  <tr v-for="item in cart" :key="item.isbn">
                                    <td class="px-4 py-2">
                                      <img class="object-contain h-20 w-30"
                                        :src="`http://localhost:3000/${item.book_img}`" alt="Placeholder image" />
                                    </td>
                                    <td class="px-4 py-2">{{ item.book_name }}</td>

                                  </tr>
                                </tbody>
                              </table>

                              <div
                                class="bottom-0 inset-x-0 absolute m-1 bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded-full text-center"
                                @click="goCheckout()">
                                CheckOut
                              </div>
                            </div>
                          </TransitionChild>
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </div>
              </Dialog>
            </TransitionRoot>
          </div>
          <div class="flex flex-1  sm:items-stretch sm:justify-start">

            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[
                  item.current
                    ? 'bg-gray-900 text-white '
                    : 'bg-orange-500 drop-shadow-md hover:bg-orange-600 text-white',
                  ' px-3 py-4 text-sm font-medium ease-in-out duration-200 ',
                ]" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                <div v-if="role == 'admin'" class="flex space-x-4">
                  <a  v-for="item in navigation2" :key="item.name" :href="item.href" :class="[
                  item.current
                    ? 'bg-gray-900 text-white '
                    : 'bg-orange-500 drop-shadow-md hover:bg-orange-600 text-white',
                  ' px-3 py-4 text-sm font-medium ease-in-out duration-200 ',
                ]" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                </div>
                
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Button @click="Open = true"
              class="flex h-7 w-7 rounded-full  hover:ring-2 hover:ring-orange-300 ease-in-out duration-200 text-white">
              <ShoppingBagIcon class="rounded-full text-white" src="" alt="" />
            </Button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton v-if="$store.state.token"
                  class="flex rounded-full hover:border-orange-500  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-5">
                  <img class="h-9 w-9 rounded-full  hover:ring-4 hover:ring-orange-300 ease-in-out duration-200"
                    :src="pro ? `http://localhost:3000/${pro}` : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'"
                    alt="Profile Image" />
                </MenuButton>
                <RouterLink v-else class="text-white" to="/SignIn">login</RouterLink>
              </div>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                  <a v-show="!$store.state.token" href="/SignIn" :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]">Sign In</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <a v-show="!$store.state.token" href="/SignUp" :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]">Sign Up</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <a v-show="$store.state.token" href="/UserProfile" :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]">Profile</a>

                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <a v-show="$store.state.token" @click="logout(),clearrole()" :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]">Sign Out</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'bg-orange-500 drop-shadow-md hover:bg-orange-700 text-white',
            'block rounded-md px-3 py-4 font-medium text-center',
          ]" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>

  </div>
</template>

<script setup>
import swal from 'sweetalert2';
import { ref } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/vue/24/outline";
const navigation = [{ name: "Home", href: "/", current: false }];
const navigation2 = [{ name: "Admin", href: "/Addmin", current: false }];
const Open = ref(false);
</script>
<script>
/* eslint-disable */ import axios from '@/plugins/axios'
export default {
  props: {
    cart: Array,
    clearCart: Function,
    logout:Function
  },
  name: "ProductList",
  components: {},
  data() {
    return {
      active: false,
      typelog: "",
      pro: null,
      newcart: this.cart,
      role:null,
      token:this.$store.state.token
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },clearrole() {
     this.role = null
    },
    goCheckout() {
      axios
      .get("http://localhost:3000/checkout", { params: { book: this.newcart, user: this.$store.state.id } })
      .then((response) => {    
        swal.fire({
             title: 'You have borrow these book.',
              text:'',
              icon:'success'
          }).then((next)=>{
            if(next){
              
              localStorage.removeItem("cart")
        this.$router.push("/userprofile")
             
            }
          })
        
      })
      .catch((error) => {
        alert(error.response.data)
      });
    },
    
  },
  computed: {
    userType() {
      return this.$store.getters.userType
    },
    cartValue() {
      let newcart = this.cart
    }
  }, created() {
    
    axios
            .get("http://localhost:3000/User", { params: { token: this.token } })
            .then((response) => {
              this.role = response.data.role
                if (this.role == 'customer') {
                    this.pro = response.data.customer_info.customer_img
                }
                else if (this.role == 'admin') {
                    this.pro = response.data.admin_info.admin_img
                }
                

            })
            .catch((err) => {
                console.log(err);
                console.log(this.customer_info);
            });
            console.log(this.customer_info);
          
  }

};

</script>

<style></style>