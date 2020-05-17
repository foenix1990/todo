<template>
  <div class="filter">
    <div class="input-block">
      <span>Поиск задания</span>
      <input type="text" placeholder="Введите текст" v-model="search" />
    </div>
    <div class="input-block">
      <span>Статус</span>
      <select v-model="status">
        <option :value="null">Все статусы</option>
        <option :value="true">Сделано</option>
        <option :value="false">Не сделано</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Filters',
  data() {
    return {
      search: '',
      status: null,
    }
  },
  watch: {
    search() {
      this.setFilter();
    },
    status() {
      this.setFilter();
    }
  },
  computed: {
    ...mapGetters([
      'getFilterTask'
    ]),
  },
  methods: {
    ...mapMutations([
      'setFilterTask'
    ]),
    setFilter() {
      this.setFilterTask(this.getFilterTask({search: this.search, status: this.status}));
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  width: 100%;
  @include flex (right, center, row);
  .input-block {
    width: 50%;
    margin-left: $size * 20vw;
    background-color: white;
    border-radius: $size * 2vw;
    font-size: $size * 8vw;
    @include flex (right, center, row);
    span {
      flex-shrink: 0;
      @include flex (left, center, row);
      padding: 0 $size * 10vw;
      z-index: 2;
      color: $gray-700;
    }
    input, select {
      width: 100%;
      height: $size * 20vw;
      background-color: transparent;
      outline: none;
      border: 0;
      font-size: $size * 8vw;
    }
    &:nth-child(2) {
      width: 20.5%;
      select {
        cursor: pointer;
      }
    }
  }
}
</style>
