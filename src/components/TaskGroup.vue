<template>
  <div class="group" :data="group.id">
    <div class="title">
      <div class="name">
        {{group.name}}
      </div>
      <div class="buttons">
        <div class="button" title="Добавить" @click="setEditItem({ id: null, group: false, groupId: group.id })">
          &#10010;
        </div>
        <div class="button" title="Изменить" @click="setEditItem({ id: group.id, group: true, groupId: null })">
          &#9998;
        </div>
        <div class="button" title="Удалить" @click="setRemoveItem({ id: group.id, group: true })">
          &#10006;
        </div>
      </div>
    </div>
    <div class="task-list" v-bar>
      <div>
        <Task
          v-for="(task, i) in getGroupTasks(group.id)"
          :key="i"
          :task="task"
          :groupId="group.id" />
        <div class="notFound" v-if="getGroupTasks(group.id).length === 0">
          Нет заданий
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import Task from '../components/Task.vue';

export default {
  name: 'TaskGroup',
  components: {
    Task,
  },
  props: {
    group: Object,
  },
  computed: {
    ...mapGetters([
      'getGroupTasks',
    ]),
  },
  methods: {
    ...mapMutations([
      'setEditItem',
      'setRemoveItem'
    ]),
  },
}
</script>

<style lang="scss" scoped>
.group{
  width: 23%;
  height: 100%;
  display: flex;
  flex-shrink: 0;
  margin-right: $size * 19vw;
  font-size: $size * 8vw;
  overflow: hidden;
  background-color: $gray-300;
  border-radius: $size * 4vw;
  @include flex (left, top, column);
  padding: $size * 10vw;
  padding-top: $size * 5vw;
  .title{
    width: 100%;
    @include flex (left, center, row);
    height: $size * 25vw;
    user-select: none;
    border-radius: $size * 3vw;
    margin-bottom: $size * 5vw;
    .name{
      width: 100%;
      font-weight: 600;
    }
    .buttons{
      flex-shrink: 0;
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
  .task-list{
    width: 100%;
    height: 100%;
  }
}
</style>
