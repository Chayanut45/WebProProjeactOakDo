
<template>
  <div class="">
    <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>
      <form class="">
        <div class="relative mt-5">
          <div class="absolute inset-y-0 left-0 flex items-center ml-16  mb-13.5 pointer-events-none ">
            <svg v-if="!look" aria-hidden="true" class="w-100 h-5 pr-2 text-white" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input v-model="look" type="search" id="default-search"
            class="block w-100 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search " required />
          <!-- <button type="submit" class="text-white absolute w-5  right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
        </div>
      </form>

      <div class="d">
          <div class="card my-5">
            <div class="card-content px-2 py-2 grid grid-cols-5">
              <div class="" v-for="item in genre" :key="item.id">
                <div class="Novel">
                  <input type="radio" id="one" name="type" :value="item.value" v-model="picked" />
                  <label>{{ item.name }}</label>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="container">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <div
          class="transition ease-in-out hover:-translate-y-1 hover:scale-105 margin-right 4s book-card bg-neutral-900 shadow-md rounded-md overflow-hidden flex flex-col justify-between "
          v-for="product in NewS" :key="product.isbn">
          <router-link :to="{ name: 'Products', params: { id: product.isbn } }" class="underline">
            <img class="w-full" :src="`http://localhost:3000/${product.book_img}`" :alt="book.title">
          </router-link>
          <div class="p-4 flex-1">
            <h3 class="text-white text-lg font-semibold mb-2">{{ product.book_name }}</h3>
            <p class="text-white">{{ book.author }}</p>
            <p class="text-white">ประเภท: {{ product.book_type }}</p>
          </div>
          <div class="mt-4 flex justify-end">
            <button v-if="product.book_stock != 0" @click="add(product)"
              class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded w-full">
              ADD TO CART
            </button>
            <button v-else 
              class="bg-black text-white font-semibold py-2 px-4 rounded w-full">
              Not Available
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const genre = [
  { name: "ALL", href: "#", current: true, value: "" },
  { name: "Children", href: "#", current: false, value: "Children" },
  { name: "Non-Fiction", href: "#", current: false, value: "Non-Fiction" },
  { name: "Fiction", href: "#", current: false, value: "Fiction" },
  { name: "Art", href: "#", current: false, value: "Art" },
  { name: "Biography", href: "#", current: false, value: "Biography" },
  { name: "Business", href: "#", current: false, value: "Business" },
  { name: "History", href: "#", current: false, value: "History" },
  { name: "Medicine", href: "#", current: false, value: "Medicine" },
  { name: "Science", href: "#", current: false, value: "Science" },
  { name: "Sports", href: "#", current: false, value: "Sports" },
  { name: "Travel", href: "#", current: false, value: "Travel" },
];
</script>
<script>
import axios from '@/plugins/axios'


export default {
  name: "ProductList",
  components: {},

  props: {
    add: { type: Function },
  },
  data() {
    return {
      book: null,
      look: "",
      active: false,
      picked: "",
      cart: [],

    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
    unCheck() {
      this.picked = "";
    },
    
  }, created() {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        this.book = response.data.book;
        console.log(this.book);
      })
      .catch((err) => {
        console.log(err);
      });
  }, computed: {
    NewS() {
      let booklits = this.book

      if (this.look != "") {
        return booklits.filter((x) => (x.book_name.toLowerCase().replace(/\s/g, '')).includes((this.look).toLowerCase().replace(/\s/g, '')));
      }
      if (this.picked == "ALL") {
        // console.log(type.filter(x=>x.genre.includes(this.picked)  ))
        return this.book;
      } 
      else if (this.picked != "") {
        // console.log(type.filter(x=>x.genre.includes(this.picked)  ))
        return booklits.filter((x) => x.book_type.includes(this.picked));
      } else {

        return booklits;
      }
    },
  },
};
</script>
