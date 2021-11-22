<template>
  <div class="TodoList">
    <div class="content">
      <div class="left">
        <div class="type-list">
          <li :class="selectedAll? 'selected': ''" @click="handleClickAll">全部</li>
          <template v-for="(item,index) in listSort">
            <li :key="item.type_id" @click="handleClick(index)" :class="curIndex == index? 'selected':''">
              <div class="status-point" :style="{backgroundColor:item.color}"></div>
              <span>{{item.type_name}}</span>
              <el-popover class="edit" placement="top-start" trigger="click">
                <ul>
                  <li class="edit-li">编辑</li>
                  <li class="edit-li">删除</li>
                </ul>
                <i v-show="curIndex == index" class="el-icon-more more" slot="reference"></i>
              </el-popover>
            </li>
          </template>
        </div>
      </div>
      <div class="right">
        <div class="add">
          <el-input placeholder="请输入添加的待办事项内容" v-model="addContent" class="input-with-select">
            <el-select v-model="typeSelect" slot="prepend" placeholder="请选择类型">
              <el-option v-for="item in listSort" :key="item.type_id" :label="item.type_name" :value="item.type_id"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-plus" @click="addTodo"></el-button>
          </el-input>
        </div>
        <div class="todo-list">
          <span>待完成</span>
          <el-checkbox @change="handleCheck(index)" v-for="(item,index) in todoList" :key="item.todo_id" :checked="item.todo_status == 1">{{item.des}}</el-checkbox>
        </div>
        <el-divider class="line"></el-divider>
        <div class="done-list">
          <span>已完成</span>
          <el-checkbox v-for="item in doneList" :key="item.todo_id" checked disabled>{{item.des}}</el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getTodoListByStatus,
    updateTodoStatus,
    getTodoBySort,
    getAllTypes
  } from "../network/home";
  export default {
    name: 'TodoList',
    components: {

    },
    data() {
      return {
        selectedAll: true, //选择全部
        curIndex: null, //当前类型选择
        listSort: [], //按类型分类事项
        initListSort: [], //原始数据
        todoList: [], //展示未完成事项
        doneList: [], //展示已完成事项
        addContent: "", //新增待办事项内容
        typeSelect: ""
      }
    },
    methods: {
      //选择展示全部
      handleClickAll() {
        this.selectedAll = true;
        this.curIndex = null;
        this.initTodoList();
        this.initDoneList();
      },
      //选择某一类型事项
      handleClick(index) {
        this.selectedAll = false;
        this.curIndex = index;
        let temp = this.listSort[index].todoList;
        //过滤数组，按状态分类展示
        this.todoList = temp.length !== undefined ? temp.filter(item => item.status == 0) : [];
        this.doneList = temp.length !== undefined ? temp.filter(item => item.status == 1) : [];
      },
      addTodo() {
        let id
        console.log(this.addContent, this.listSort[this.curIndex].type_id);
      },
      //待办事项打勾
      handleCheck(index) {
        console.log(index);
        let item = this.todoList[index];
        let that = this;
        console.log(item);
        updateTodoStatus(item.todo_id, 1).then(res => {
          if (res.status == 200) {
            setTimeout(function() {
              that.todoList.splice(index, 1);
              that.doneList.push(item);
            }, 1000)
          }
        })
      },
      //初始化待办事项列表
      initTodoList() {
        getTodoListByStatus(0).then(res => {
          this.todoList = res.data;
          // console.log(this.todoList);
        })
      },
      initDoneList() {
        getTodoListByStatus(1).then(res => {
          this.doneList = res.data;
        })
      },
      initTodoSort() {
        getTodoBySort().then(res => {
          this.initListSort = res.data;
          this.initType();
        })
      },
      initType() {

        getAllTypes().then(res => {

          this.listSort = res.data.map(item => {
            item.isMore = false;
            item.todoList = [];
            // item.doneList = [];
            return item
          });
          let that = this;
          // console.log(this.listSort);
          this.listSort.forEach(function(item) {
            item.todoList = [];
            // console.log(that.inittodoListSort);
            let temp = that.initListSort.filter(val => val.type_id == item.type_id);
            console.log(temp);
            if (temp.length > 0) {
              item.todoList = temp[0].todoList;
            }
          })
          console.log(this.listSort);
        })
      }
    },
    mounted() {
      this.initTodoList();
      this.initDoneList();
      this.initTodoSort();

    }
  }
</script>

<style lang="less" scoped>
  @color : #4352d7;
  @font-color: #4a4f58;
  @font-color-t: #93969c;
  @font-color-un: #b6c1d4;
  @back-color-dark: #fbfbfb;

  .TodoList {
    background-color: #f5f7fb;
    width: calc(100vw);
    height: calc(100vh - 80px);
    overflow: hidden;

    .content {
      margin: 20px;
      height: 100%;
    }
  }

  .left {
    width: 20%;
    float: left;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 5px 11px #f1f1f1;
    background-color: #fff;
    margin-right: 20px;
  }

  .right {
    width: 70%;
    background-color: #fff;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 5px 11px #f1f1f1;

    .add {
      width: 95%;
      margin: 0 auto;
      margin-top: 20px;
    }

    .line {
      width: 95%;
      margin: 0 auto;
    }

    .todo-list,
    .done-list {
      margin: 20px;
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    .el-checkbox {
      margin-top: 10px;
    }
  }

  .type-list {
    padding: 15px 10px 15px 10px;
    text-align: left;
    background-color: #fff;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 5px 11px #f1f1f1;

    .status-point {
      display: inline-block;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      margin-right: 20px;
    }

    li {
      list-style: none;
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      padding: 0 10px 0 10px;
      border-radius: 5px;
    }

    .more {
      float: right;
      line-height: 30px;
      font-size: 15px;
    }

    .selected {
      background-color: #f7f7f7;
    }
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .edit-li {
    list-style: none;
    font-size: 14px;
    line-height: 1;
    height: 25px;
    line-height: 25px;
  }
</style>
<style lang="less">
  @color : #4352d7;

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: @color;
    border-color: @color;
  }

  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: @color;
  }

  .el-checkbox.is-bordered.is-checked {
    border-color: @color;
  }

  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: @color;
  }
</style>