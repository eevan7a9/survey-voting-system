<template>
  <div class="wrapper pady-1 padx-1 borad-1" :class="{focuse: focuse}">
    <div class="search-wrapper">
      <input
        type="text"
        class="mgr-1 fs-18 ls-1 dark borad-1 padx-1"
        @keypress.enter="search"
        @focus="focuse = 1"
        @blur="focuse = 0"
        placeholder="Search..."
        v-model="find_question"
      />
      <svg
        id="img"
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-search blue mgl-1 pointer"
        @click="search"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <div class="icon-divider bg-bluedient"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x red pointer clear"
        @click="clear"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Searchbar",
  data() {
    return {
      focuse: 0,
      find_question: ""
    };
  },
  computed: mapGetters(["onFilter"]),
  methods: {
    ...mapActions([
      "searchQuestions",
      "searchErase",
      "getQuestions",
      "onLoader",
      "offLoader"
    ]),
    search() {
      this.onLoader();
      this.searchQuestions({
        find: this.find_question,
        sorter: this.onFilter.sorter
      }).then(() => this.offLoader());
    },
    clear() {
      this.onLoader();
      this.searchErase();
      this.find_question = "";
      this.getQuestions().then(() => this.offLoader());
    }
  }
};
</script>

<style scoped>
.wrapper {
  border: 3px solid #1583c7;
  width: 100%;
  margin-left: 30px;
  transition: 1s;
}
.focuse {
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.search-wrapper {
  display: grid;
  grid-template-columns: 1fr auto 23px auto;
}
.search-wrapper input {
  width: 100%;
  border: 2px solid rgb(153, 159, 163);
}
.search-wrapper input:focus {
  border: 3px solid #1583c7;
}
.icon-divider {
  margin-left: 10px;
  margin-right: 10px;
  background: grey;
}
.clear {
  margin: auto;
}
@media (max-width: 700px) {
  .wrapper {
    flex-grow: 1;
    width: 100%;
    margin: auto 5px;
  }
}
</style>