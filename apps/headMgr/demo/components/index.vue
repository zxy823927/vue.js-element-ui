<template>
    <div>
        <h3>我是主页模1块</h3>
        <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal"   @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">订单管理</el-menu-item>
        </el-menu>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180">
            <template scope="scope">
              <el-input v-model="scope.row.date"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            >
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>

              <el-input v-model="bill.code"></el-input>
              <el-input v-model="bill.name"></el-input>
              <el-input v-model="bill.addr"></el-input>
    </div>

</template>

<script>
    import demoConfig from "../config/demoConfig.js";
    export default {
        data() {
            return {
              bill:{},
              tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄22'
              }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
              }]
            }
          },
        methods:{
            handleSelect:function(key,keyPath){
                console.log(key,keyPath);
                    this.tableData.push({
                    date: '2016-11-04',
                    name: '王小虎2',
                    address: '上海市2普陀区金沙江路 1517 弄'
                  });
                if(key=="3"){
                  console.log(this.bill);
                }
            }
        }
    }
</script>