<script setup lang="ts">
import { ref, computed } from 'vue';

// Interface for the user data
interface User {
  name: string;
  email: string;
  country: string;
  jobTitle: string;
  createdAt: string;
  avatar: string;
}

const users: User[] = [
  { name: 'Hart Hagerty', email: 'hart@example.com', country: 'United States', jobTitle: 'Desktop Support Technician', createdAt: '2023-01-01', avatar: 'https://img.daisyui.com/images/profile/demo/2@94.webp' },
  { name: 'Brice Swyre', email: 'brice@example.com', country: 'China', jobTitle: 'Tax Accountant', createdAt: '2023-02-15', avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp' },
  { name: 'Marjy Ferencz', email: 'marjy@example.com', country: 'Russia', jobTitle: 'Office Assistant I', createdAt: '2023-03-20', avatar: 'https://img.daisyui.com/images/profile/demo/4@94.webp' },
  { name: 'Yancy Tear', email: 'yancy@example.com', country: 'Brazil', jobTitle: 'Community Outreach Specialist', createdAt: '2023-04-10', avatar: 'https://img.daisyui.com/images/profile/demo/5@94.webp' },
  // Add more users here as needed
];

// State variables
const currentPage = ref(1);
const perPage = ref(2);
const perPageOptions = ref([2, 5, 10, 20]); // Options for records per page

// Computed properties
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return users.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(users.length / perPage.value);
});

// Calculate visible pages based on current page
const visiblePages = computed(() => {
  const pages: number[] = [];
  const range = 2; // Number of pages to show before and after the current page

  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i <= range || // Show first few pages
      i > totalPages.value - range || // Show last few pages
      (i >= currentPage.value - range && i <= currentPage.value + range) // Show pages near the current page
    ) {
      pages.push(i);
    }
  }
  return pages;
});

// Methods
const changePerPage = () => {
  currentPage.value = 1; // Reset to the first page when records per page changes
};

</script>

<template>
  <div class="lg:px-10 pb-10 pt-10 min-h-[calc(100vh-5rem)]">
    <div class="p-4 bg-base-200 shadow">
      <div class="overflow-x-auto">
        <table class="table table-auto">
          <!-- head -->
          <thead>
            <tr>
              <th>
              </th>
              <th>Tên</th>
              <th>Email</th>
              <th>Ngày tạo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- render rows dynamically -->
            <tr v-for="(user, index) in paginatedUsers" :key="index">
              <td>{{ (currentPage - 1) * perPage + index + 1 }}</td> <!-- Display serial number -->
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img :src="user.avatar" alt="Avatar" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ user.name }}</div>
                    <div class="text-sm opacity-50">{{ user.country }}</div>
                  </div>
                </div>
              </td>
              <td>
                {{ user.email }}
                <br />
                <span class="badge badge-ghost badge-sm">{{ user.jobTitle }}</span>
              </td>
              <td>{{ user.createdAt }}</td>
              <th>
                <button class="btn btn-ghost btn-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 512 512"><path fill="currentColor" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1L377.9 88L407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9l46.1 46.1l-134.3 134.2c-2.9 2.9-6.5 5-10.4 6.1L186.9 325l16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25c-28.1-28.1-73.7-28.1-101.8 0M88 64c-48.6 0-88 39.4-88 88v272c0 48.6 39.4 88 88 88h272c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24v112c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40h112c13.3 0 24-10.7 24-24s-10.7-24-24-24z"/></svg>
                </button>
              </th>
            </tr>
          </tbody>
          <!-- foot -->
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <!-- Pagination controls -->
      <div class="flex justify-between item-center">
        <div class="join">
          <button class="join-item btn" :disabled="currentPage === 1" @click="currentPage--">Prev</button>

          <!-- Display first 2 pages -->
          <button v-if="currentPage > 3" class="join-item btn" @click="currentPage = 1">1</button>
          <span v-if="currentPage > 3" class="join-item btn">...</span>

          <!-- Display pages near current page -->
          <button v-for="page in visiblePages" :key="page" class="join-item btn"
            :class="{ 'btn-active': page === currentPage }" @click="currentPage = page">{{ page }}</button>

          <!-- Display last 2 pages -->
          <span v-if="currentPage < totalPages - 2" class="join-item btn">...</span>
          <button v-if="currentPage < totalPages - 2" class="join-item btn" @click="currentPage = totalPages">{{
            totalPages }}</button>

          <button class="join-item btn" :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
        </div>
        <!-- Select number of records per page -->
        <select id="perPage" v-model="perPage" @change="changePerPage" class="select select-bordered">
          <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

    </div>
  </div>
</template>

<style>
thead,
tfoot {
  color: black;
}

.join button {
  background-color: #f4f4f4;
  color: black;
}
.btn-ghost:hover {
  background-color: unset;
}
.select  {
  width: 60px;
  background-color: white;
  border: 1px black solid;
}
</style>