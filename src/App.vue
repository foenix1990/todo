<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: $size * 10vw;
  letter-spacing: 0.04vw;
  background-color: $gray-100;
  * {
    position: relative;
    box-sizing: border-box;
  }
  .wrapper{
    @include full (1, 1, fixed);
    background-color: rgba(0, 0, 0, 0.5);
    @include flex (center, center, column);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
  }
  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
      background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out;
    transition:
      background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }
  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
  }
  .vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
  }
  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
  }
  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
  }
  .task-gost{
    position: fixed;
    cursor: move;
    .open{
      display: none;
    }
    .buttons{
      opacity: 0;
    }
  }
}
</style>
