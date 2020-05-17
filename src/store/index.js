import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskCollection: [],
    groupCollection: [],
    tasks: [],
    editItem: null,
    removeItem: null,
  },
  getters: {
    // GET FILTER ITEMS
    getFilterTask: state => data => {
      let newArray = state.taskCollection;
      if (data.status !== null)  newArray = newArray.filter(item => item.status === data.status);
      if (data.search.length > 0) newArray = newArray.filter(item => item.name.match(data.search) || item.text.match(data.search));
      return newArray;
    },
    // GET GROUP ITEMS
    getGroupTasks: state => id => {
      return state.tasks.filter(item => item.group === id);
    },
    // GET ITEMS
    getTasks: state => {
      return state.tasks.filter(item => item.group === null);
    },
    // GET ITEM EDIT
    getItem: state => data => {
      let result = {};
      let items = [];
      if (data.group) { // GET GROUP ITEM
        items = state.groupCollection;
      } else { // GET TASK ITEM
        items = state.taskCollection;
      }
      items.forEach((item) => {
        if (item.id === data.id) {
          result = item;
        }
      });
      return result;
    },
  },
  mutations: {
    // GET START APP LOCAL STORAGE
    setLocalData(state) {
      //localStorage.setItem('groups', JSON.stringify([]));
      //localStorage.setItem('tasks', JSON.stringify([]));
      if (localStorage.getItem('groups')) {
        state.groupCollection = JSON.parse(localStorage.getItem('groups'));
      }
      if (localStorage.getItem('tasks')) {
        state.taskCollection = JSON.parse(localStorage.getItem('tasks'));
        state.tasks = state.taskCollection;
      }
    },
    // SET FILTER
    setFilterTask(state, val) {
      state.tasks = val;
    },
    // SET SAVE ID
    setEditItem(state, val) {
      state.editItem = val;
    },
    // SAVE GROUP OR TASK
    setSaveItem(state, val) {
      const rand = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
      if (state.editItem.group) { // IF GROUP SAVE
        const group = {
          id: val.id,
          name: val.name
        };
        if (state.editItem.id === null) { // IF NEW SAVE
          group.id = rand;
          state.groupCollection.push(group);
        } else { // IF RESAVE
          state.groupCollection = state.groupCollection.map((item) => {
            if (state.editItem.id === item.id) {
              item = group;
            }
            return item;
          });
        }
        localStorage.setItem('groups', JSON.stringify(state.groupCollection)); // SAVE LOCAL STORAGE
      } else { // IF TASK SAVE
        if (state.editItem.id === null) { // IF NEW SAVE
          val.id = rand;
          state.taskCollection.push(val);
        } else { // IF RESAVE
          state.taskCollection = state.taskCollection.map((item) => {
            if (state.editItem.id === item.id) {
              item = val;
            }
            return item;
          });
        }
        state.tasks = state.taskCollection;
        localStorage.setItem('tasks', JSON.stringify(state.taskCollection)); // SAVE LOCAL STORAGE
      }
      state.editItem = null; // RESET EDIT
    },
    // SET REMOVE ID
    setRemoveItem(state, val) {
      state.removeItem = val;
    },
    // REMOVE GROUP OR TASK
    setRemove(state) {
      if (state.removeItem.group) {
        state.groupCollection = state.groupCollection.filter(item => state.removeItem.id !== item.id);
        state.taskCollection = state.taskCollection.filter(item => state.removeItem.id !== item.group);
      } else {
        state.taskCollection = state.taskCollection.filter(item => state.removeItem.id !== item.id);
      }
      state.tasks = state.taskCollection;
      state.removeItem = null; // RESET REMOVE
      localStorage.setItem('groups', JSON.stringify(state.groupCollection)); // SAVE LOCAL STORAGE
      localStorage.setItem('tasks', JSON.stringify(state.taskCollection)); // SAVE LOCAL STORAGE
    },
    // MOVE TASK
    moveTask(state, val) {
      if (val.groupId !== false && val.taskId !== false) {
        state.taskCollection = state.taskCollection.map((item) => {
          if (Number(val.taskId) === item.id) {
            item.group = val.groupId;
          }
          console.log(val.taskId);
          return item;
        });
        state.tasks = state.taskCollection;
        localStorage.setItem('tasks', JSON.stringify(state.taskCollection)); // SAVE LOCAL STORAGE
      }
    }
  },
})
