<template>
  <div class="wrapper">
    <div class="popup">
      <div class="title">
        Внимание
      </div>
      <div class="body">
        {{removeItem.group ? 'Вы уверены что хотите удалить группу с заданиями в ней?' : 'Вы уверены что хотите удалить задание?'}}
        <div class="buttons">
          <div class="button" @click="setRemove()">
            Да
          </div>
          <div class="button" @click="setRemoveItem(null)">
            Нет
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'RemovePopup',
  computed: {
    ...mapState([
      'removeItem'
    ])
  },
  methods: {
    ...mapMutations([
      'setRemoveItem',
      'setRemove'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.popup {
  width: 40%;
  background-color: white;
  border-radius: $size * 2vw;
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
    .buttons{
      width: 100%;
      @include flex (right, top, row);
      user-select: none;
      margin-top: $size * 20vw;
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
