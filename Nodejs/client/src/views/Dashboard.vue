<template>
  <div class="Dashboard" fill-height>
    <Navbar/>
    <p class="my-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti molestiae, unde illo qui recusandae fuga corrupti repellat animi exercitationem corporis, non neque velit consequatur voluptatem deserunt aliquid nemo modi molestias.</p>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue';

export default {
  components: { Navbar },
  data() {
    return {
      Email: "",
      Wachtwoord: "",
    };
  },
};
</script>