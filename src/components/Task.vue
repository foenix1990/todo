<template>
  <div class="task" :data="task.id">
    <div class="title">
      <div class="name-task">
        {{task.name}}
      </div>
      <div class="buttons">
        <div class="button" title="Изменить" @click="setEditItem({ id: task.id, group: false, groupId: groupId })">
          &#9998;
        </div>
        <div class="button" title="Удалить" @click="setRemoveItem({ id: task.id, group: false })">
          &#10006;
        </div>
      </div>
    </div>
    <div class="text">
      {{task.text.slice(0, symbols)}}{{task.text.length > symbols ? '...' : ''}}
      <span class="open" @click="openText" v-if="task.text.length > symbols || (task.text.length > 0 && open)">
        {{open ? 'Скрыть' : 'Открыть'}}
      </span>
    </div>
    <div class="status" :class="[task.status ? 'on' : 'off']">
      {{task.status ? 'Сделано' : 'Не сделано'}}
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Task',
  props: {
    task: Object,
    groupId: Number,
  },
  data() {
    return {
      open: false,
      symbols: 70,
    }
  },
  methods: {
    ...mapMutations([
      'setEditItem',
      'setRemoveItem'
    ]),
    openText() {
      if (this.open) {
        this.symbols = 70;
        this.open = false;
      } else {
        this.symbols = this.task.length;
        this.open = true;
      }
    },
  },
}
</script>

<style lang="scss">
.task, .task-gost{
  width: 100%;
  margin-bottom: $size * 10vw;
  border: $minsize * 4vw solid $gray-300;
  border-radius: $size * 3vw;
  font-size: $size * 8vw;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 0 $size * 6vw $gray-300;
  user-select: none;
  &:last-child {
    margin-bottom: 0;
  }
  .title{
    @include flex (left, center, row);
    height: $size * 25vw;
    .name-task{
      width: 100%;
      padding-left: $size * 10vw;
    }
    .buttons{
      flex-shrink: 0;
      padding-right: $size * 10vw;
      @include flex (left, center, row);
      .button{
        margin-left: $size * 15vw;
        @include flex (center, center, row);
        cursor: pointer;
        &:hover{
          opacity: 0.5;
        }
      }
    }
  }
  .text{
    padding: $size * 10vw;
    padding-top: 0;
    color: $gray-700;
    background-color: white;
    font-size: $size * 7vw;
    span{
      color: $orange-600;
      cursor: pointer;
      &:hover{
        opacity: .5;
      }
    }
  }
  .status{
    @include flex (center, center, row);
    padding: $size * 5vw;
    &.on{
      color: $green-800;
      background-color: $green-300;
    }
    &.off{
      color: $red-800;
      background-color: $red-300;
    }
  }
}
</style>
