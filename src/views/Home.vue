<template>
  <div class="home">
    <div class="header">
      <div class="logo">TASK MANAGER</div>
      <Filters />
    </div>
    <div class="content">
      <div class="row">
        <div class="container">
          <TaskHeader
            title="Группы"
            :group="true" />
          <div class="group-list">
            <TaskGroup
              v-for="(group, i) in groupCollection"
              :key="i"
              :group="group" />
            <div class="notFound" v-if="groupCollection.length === 0">Нет групп</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="container">
          <TaskHeader
            title="Задания"
            :group="false" />
          <div class="task-list" v-bar>
            <div>
              <Task
                v-for="(task, i) in getTasks"
                :key="i"
                :task="task"
                :groupId="null" />
              <div class="notFound" v-if="getTasks.length === 0">
                Нет заданий
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <EditPopup v-if="editItem !== null" />
      <RemovePopup v-if="removeItem !== null" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';

import Filters from '../components/Filters.vue';
import TaskHeader from '../components/TaskHeader.vue';
import TaskGroup from '../components/TaskGroup.vue';
import Task from '../components/Task.vue';
import EditPopup from '../components/EditPopup.vue';
import RemovePopup from '../components/RemovePopup.vue';

export default {
  name: 'Home',
  components: {
    Filters,
    TaskHeader,
    TaskGroup,
    Task,
    EditPopup,
    RemovePopup,
  },
  computed: {
    ...mapGetters([
      'getTasks',
    ]),
    ...mapState([
      'groupCollection',
      'editItem',
      'removeItem'
    ])
  },
  data() {
    return {
      inMove: null,
      gostMove: null,
      coord: null,
    }
  },
  methods: {
    ...mapMutations([
      'moveTask'
    ]),
    elementFromPoint(e) {
      return document.elementFromPoint(e.clientX, e.clientY);
    }
  },
  created() {
    // MOVE CURSOR MOUSE
    document.addEventListener('mousemove', (e) => {
      if (this.gostMove !== null) {
        this.gostMove.style.left = `${e.clientX - this.coord.x}px`;
        this.gostMove.style.top = `${e.clientY - this.coord.y}px`;
      }
    });
    // DOWN LEFT BUTTON MOUSE
    document.addEventListener('mousedown', (e) => {
      const elem = this.elementFromPoint(e);
      if (elem.className !== 'open' && elem.className !== 'button') {
        if (elem.closest('.task')) {
          // SET IN
          this.inMove = elem.closest('.task');
          this.inMove.style.opacity = .3;
          // SET COORDINATE
          this.coord = this.inMove.getBoundingClientRect();
          this.coord.x = e.clientX - this.coord.x;
          this.coord.y = e.clientY - this.coord.y;
          // CREATE CLONE
          this.gostMove = document.createElement('div');
          this.gostMove.innerHTML = elem.closest('.task').innerHTML;
          this.gostMove.classList.add('task-gost');
          this.gostMove.style.position = 'fixed';
          this.gostMove.style.width = `${this.inMove.offsetWidth}px`;
          this.gostMove.style.left = `${e.clientX - this.coord.x}px`;
          this.gostMove.style.top = `${e.clientY - this.coord.y}px`;
          document.body.appendChild(this.gostMove);
        }
      }
    });
    // UP LEFT BUTTON MOUSE
    document.addEventListener('mouseup', (e) => {
      if (this.inMove !== null) {
        this.gostMove.remove();
        this.gostMove = null;
        const elem = this.elementFromPoint(e);
        const taskId = this.inMove.getAttribute('data');
        if (elem.closest('.group')) {
          this.moveTask({groupId: Number(elem.closest('.group').getAttribute('data')), taskId: taskId});
        } else {
          this.moveTask({groupId: null, taskId: taskId});
        }
        this.inMove.removeAttribute('style');
        this.inMove = null;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.home {
  @include full (1, 1, fixed);
  @include flex (left, top, column);
  .header {
    width: 100%;
    height: $size * 30vw;
    font-size: $size * 10vw;
    @include flex (left, center, row);
    color: $gray-300;
    background-color: $gray-800;
    flex-shrink: 0;
    padding: 0 $size * 20vw;
    .logo{
      flex-shrink: 0;
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 3vw);
    @include flex (left, top, row);
    font-size: $size * 8vw;
    flex: auto;
    .row {
      height: 100%;
      &:nth-child(1) {
        width: 78%;
        background: white;
        padding: $size * 20vw;
        padding-right: 0;
      }
      &:nth-child(2) {
        width: 22%;
        background: white;
        padding: $size * 20vw;
      }
      .container{
        width: 100%;
        height: 100%;
        background-color: $gray-200;
        border-radius: $size * 4vw;
        padding: $size * 10vw;
        overflow: hidden;
        @include flex (left, top, column);
        .group-list{
          width: 100%;
          height: 100%;
          @include flex (left, top, row);
          overflow-x: scroll;
          padding-bottom: $size * 10vw;
        }
        .task-list{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
