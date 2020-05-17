<template>
  <div class="task-header">
    <div class="title">
      {{title}}
    </div>
    <div class="button" @click="setEditItem({ id: null, group: group, groupId: null })">
      &#10010;
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'TaskHeader',
  props: {
    title: String,
    group: Boolean,
  },
  methods: {
    ...mapMutations([
      'setEditItem'
    ]),
  },
}
</script>

<style lang="scss" scoped>
.task-header{
  width: 100%;
  margin-bottom: $size * 10vw;
  @include flex (left, center, row);
  .title{
    width: 100%;
    color: $gray-700;
    font-size: $size * 9vw;
  }
  .button{
    flex-shrink: 0;
    color: $gray-800;
    cursor: pointer;
    &:hover{
      opacity: .5;
    }
  }
}
</style>
