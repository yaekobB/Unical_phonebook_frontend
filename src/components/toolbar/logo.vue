<template>
  <v-container class="d-flex justify-left mt-10" style="padding: 10px; ">
    <svg width="300" height="90" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
      <!-- First column with 5 horizontal bars -->
      <g fill="white">
        <!-- Five bars in the first column -->
        <rect x="0" y="20" width="30" height="5"></rect>
        <rect x="0" y="27" width="30" height="5"></rect>
        <rect x="0" y="34" width="30" height="5"></rect>
        <rect x="0" y="41" width="30" height="5"></rect>
        <rect x="0" y="48" width="30" height="5"></rect>

        <!-- Second column with 3 bars -->
        <!-- <rect x="35" y="10" width="30" height="6"></rect> -->
        <rect x="32" y="27" width="20" height="5"></rect>
        <rect x="32" y="34" width="20" height="5"></rect>

        <!-- Triangle in second column -->
        <path d="M 32 41 L 46 41 L 32 55 Z" />
      </g>

      <!-- Text section for "UNIVERSITÀ DELLA CALABRIA" -->
      <text x="55" y="34" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        UNIVERSITÀ
      </text>
      <text x="55" y="54" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        DELLA CALABRIA
      </text>
    </svg>
  </v-container>
</template>

<script>
export default {
  name: "UnicalLogo",
};
</script>

<style scoped>
v-container {
  height: 150px;
  background-color: #b30000; /* Matches university branding */
}
</style>
