<template>
  <div class="wrapper">
    <div class="edit">
      <div class="title">
        Новая группа
      </div>
      <div class="body">
        <div class="row" v-if="editItem.group === false">
          <div class="row-title">
            Статус
          </div>
          <select v-model="temp.status">
            <option :value="true">Сделано</option>
            <option :value="false">Не сделано</option>
          </select>
        </div>
        <div class="row">
          <div class="row-title">
            Заголовок
            <span>{{temp.name.length}} / {{editItem.group ? 15 : 20}}</span>
          </div>
          <input type="text" v-model="temp.name" :maxlength="editItem.group ? 15 : 20" />
        </div>
        <div class="row" v-if="editItem.group === false">
          <div class="row-title">
            Описание
            <span>{{temp.text.length}} / 500</span>
          </div>
          <textarea v-model="temp.text" maxlength="500"></textarea>
        </div>
        <div class="buttons">
          <div class="button" @click="setSaveItem(temp)" :class="[temp.name.length === 0 ? 'block' : '']">
            Сохранить
          </div>
          <div class="button" @click="setEditItem(null)">
            Отменить
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'EditPopup',
  props: {
    index: Object,
    item: Object,
  },
  computed: {
    ...mapGetters([
      'getItem',
    ]),
    ...mapState([
      'editItem'
    ])
  },
  data() {
    return {
      temp: {
        id: null,
        name: '',
        text: '',
        status: false,
        group: null,
      },
    }
  },
  methods: {
    ...mapMutations([
      'setEditItem',
      'setSaveItem'
    ]),
  },
  mounted() {
    if (this.editItem.id !== null) {
      const temp = this.getItem({id: this.editItem.id, group: this.editItem.group});
      Object.keys(temp).forEach((key) => {
        this.temp[key] = temp[key];
      });
    }
    this.temp.id = this.editItem.id;
    this.temp.group = this.editItem.groupId;
  },
}
</script>

<style lang="scss" scoped>
.edit {
  width: 40%;
  background-color: white;
  border-radius: $size * 3vw;
  @include flex (left, top, column);
  overflow: hidden;
  .title {
    padding: $size * 10vw;
    width: 100%;
    color: $gray-700;
    background-color: $gray-200;
  }
  .body {
    width: 100%;
    padding: $size * 20vw;
    .row {
      width: 100%;
      margin-bottom: $size * 10vw;
      @include flex (left, top, column);
      .row-title {
        width: 100%;
        padding-bottom: $size * 10vw;
        font-size: $size * 9vw;
        color: $gray-500;
        span{
          position: absolute;
          right: 0;
        }
      }
      input[type=text], textarea, select {
        width: 100%;
        height: $size * 25vw;
        border: $minsize * 4vw solid $gray-400;
        outline: none;
        border-radius: $size * 3vw;
        font-size: $size * 9vw;
        padding: 0 $size * 10vw;
        color: $gray-700;
      }
      textarea{
        padding: $size * 10vw;
        resize: none;
        height: $size * 100vw;
      }
    }
    .buttons{
      width: 100%;
      @include flex (right, top, row);
      user-select: none;
      .button{
        @include flex (center, center, row);
        margin-left: $size * 10vw;
        @include button (orange);
        padding: $size * 7vw $size * 15vw;
        border-radius: $size * 2vw;
      }
    }
  }
}
</style>
