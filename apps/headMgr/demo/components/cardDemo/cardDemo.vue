<!-- 
不要动这个文件
不要动这个文件
不要动这个文件
不要动这个文件
不要动这个文件
不要动这个文件
不要动这个文件
不要动这个文件
不要动这个文件
不要动这个文件
不要动这个文件
不要动这个文件
不要动这个文件
 -->
<template>
    <div class="card-demo">
        <!-- <el-transfer></el-transfer> -->
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    查询所有数据源
                </template>
                <el-row>
                    <el-button @click="querySource">查询所有数据源</el-button>
                </el-row>
                <el-row>
                    <list-table :border="true" highlight-current-row stripe
                                :columns="columns"
                                :dataSource="tableList"></list-table>
                </el-row>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    查询所有模板
                </template>
                <el-row>
                    <el-col :span="24">
                        <el-upload
                          class="upload-demo"
                          action="http://127.0.0.1:9001/shop-cloud-print/importPrintTemplate"
                          >
                          <el-button size="small" type="primary">导入</el-button>
                        </el-upload>
                        <a style="color:red">注意：导入之前，需要先切换一下后端访问iuap的地址才行</a>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button @click="queryTemplate">查询所有模板</el-button>
                    <el-button @click="exportTemplate">导出</el-button>
                </el-row>
                <el-row>
                    <list-table :border="true" highlight-current-row stripe
                                        :mulSelect='true'
                                        v-on:selectionChange="selectionChange"
                                :columns="templateColumns"
                                :dataSource="templateTableList"></list-table>
                </el-row>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    新增数据源
                </template>
                <el-row>
                    <el-col :span="8">
                        数据源编码：<el-input v-model="form.dataSourceCode"></el-input>
                    </el-col>
                    <el-col :span="8">
                        数据源名字：<el-input v-model="form.dataSourceName"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        字段1编码：<el-input v-model="form.fieldCode1"></el-input>
                    </el-col>
                    <el-col :span="8">
                        字段1名字：<el-input v-model="form.fieldName1"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        字段2编码：<el-input v-model="form.fieldCode2"></el-input>
                    </el-col>
                    <el-col :span="8">
                        字段2名字：<el-input v-model="form.fieldName2"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button @click="addSource">新增数据源</el-button>
                </el-row>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    设计模板
                </template>
                <el-row>
                    <el-col :span="5">
                        <el-card>
                            <el-row>
                                <el-col :span="24">
                                    数据源编码<el-input v-model="template.sourceCode"></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    模板编码<el-input v-model="template.templateCode"></el-input>
                                </el-col>
                            </el-row>
                            <el-row style="padding-top:2em;padding-bottom:2em">
                                <el-col :span="24" style="text-align:center;font-size: 15px;">
                                    template1模板(单表)
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10" style="text-align: right;">
                                    <el-button @click="designClick" type="text">新增</el-button>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-button @click="viewClick" type="text">预览</el-button>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    复制模板
                </template>
                <el-row>
                    <el-col :span="7">
                        <el-button @click="copyClick">复制</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7" :offset="1">
                        模板id<el-input v-model="copy.id"></el-input>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    导出
                </template>
                <el-row>
                    <el-col :span="7">
                        <el-button @click="exportClick">导出</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7" :offset="1">
                        模板id<el-input v-model="exportData.id"></el-input>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>


        <el-row v-show="designUrl!=''">
            <el-card>
                <el-row slot="header">
                    <span style="line-height: 36px;">打印模板设计</span>
                    <el-button @click="addClick">新建模板</el-button>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <iframe :src="designUrl" style="width:100%;height:1000px;border:none"></iframe>
                    </el-col>
                </el-row>
            </el-card>
        </el-row>

        <el-row v-show="viewUrl!=''">
            <el-card>
                <div slot="header" class="clearfix">
                    <span style="line-height: 36px;">打印模板预览</span>
                    <el-row>
                        <el-col :span="24">
                            <iframe id="viewTemplateFrame" :src="viewUrl" style="width:100%;height:1000px;border:none"></iframe>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-row>
    </div>
</template>
<script>
    import ajax from '../../../../pub/utils/ajaxUtil'
    import {saveBo,design,view} from './data';
    import ListTable from '../../../pub/components/ListTable.vue'
    import {BASEHOST_PRINT} from "../../../../pub/constants/baseHost"
    import {showConfirm,showMessage} from '../../../../pub/utils/promptUtil'

    export default {
        components:{
            ListTable
        },
        data() {
            return {
                tableSelected:[],
                exportData:{
                    id:'',
                },
                copy:{
                    id:"",
                },
                form:{
                    dataSourceCode:'',
                    dataSourceName:'菜品数据源',
                    fieldCode1:'',
                    fieldName1:'',
                    fieldCode2:'',
                    fieldName2:'',
                },
                template:{
                    sourceCode:'',
                    templateCode:'',
                },
                tableList:[],
                baseHost:BASEHOST_PRINT+"/shop-cloud-print",
                designUrl:'',
                viewUrl:'',
                columns:[
                    {code:'bo_code', label:'数据源编码'},
                    {code:'bo_name', label:'数据源名字'},
                    {code:'pk_bo', label:'数据源主键'},
                    {code:'tenant_id', label:'租户id'},
                    {code:'opts', label:'操作', type:'button', width:150,
                        opts:[
                            {type:'text', size:'small', name:'编辑', clickEvent:this.editClick},
                            {type:'text', size:'small', name:'删除', clickEvent:this.deleteClick}
                        ]
                    }
                ],
                templateTableList:[],
                templateColumns:[
                    {code:'templatecode', label:'模板编码'},
                    {code:'templatename', label:'模板名字'},
                    {code:'pk_print_template', label:'模板主键'},
                    {code:'tenant_id    ', label:'租户id'},
                    {code:'opts', label:'操作', type:'button', width:150,
                        opts:[
                            {type:'text', size:'small', name:'编辑', clickEvent:this.editClick},
                            {type:'text', size:'small', name:'删除', clickEvent:this.deleteTemplateClick}
                        ]
                    }
                ],
            };
        },
        methods: {
            exportTemplate(){
                if(this.tableSelected.length == 0){
                    return;
                }
                var that = this;
                var params={
                    tenantId:'j0h7ehoz',
                    template_pks:''
                }
                this.tableSelected.forEach((val,index)=>{
                    if(index == that.tableSelected.length-1){
                        params.template_pks = params.template_pks + val.pk_print_template;
                    }else{
                        params.template_pks = params.template_pks + val.pk_print_template+',';
                    }
                })
                window.open(this.baseHost+'/exportPrintTemplate?tenantId='+params.tenantId+'&template_pks='+params.template_pks);
                // ajax.getJson(this.baseHost+'/exportPrintTemplate',params,function(res){
                //     console.log(res);
                // })
            },
            exportClick(){
                if(this.exportData.id==''){
                    console.log(112323)
                    return;
                }
                var params={
                    tenantId:'j0h7ehoz',
                    template_pks:this.exportData.id
                }
                ajax.getJson(this.baseHost+'/exportPrintTemplate',params,function(res){
                    console.log(res);
                })
            },
            copyClick(){
                if(this.copy.id==''){
                    return;
                }
                var params={
                    tenantId:'j0h7ehoz',
                    pk_template:this.copy.id,
                    copytemplatecode:'copyNewCode',
                    copytemplatename:'copyNewName'
                }
                ajax.getJson(this.baseHost+'/copy',params,function(res){
                    console.log(res);
                })
            },
            deleteTemplateClick(row){
                console.log(row)
                var params = {
                    pk:row.pk_print_template,
                    tenantId:row.tanant_id,
                    userId:'zhangsan',
                }
                ajax.postJson(this.baseHost+'/deleteTemplate',params,function(res){
                    showMessage('提示',res,'info');
                })
            },
            deleteClick(row){
                var params = {
                    pk:row.pk_bo,
                    tenantId:row.tenant_id,
                    userId:'zhangsan',
                }
                ajax.postJson(this.baseHost+'/deleteBuzVO',params,function(res){
                    showMessage('提示',res,'info');
                })
            },
            querySource(){
                var that = this;
                ajax.getJson(this.baseHost+'/listBuzVO',{tenantId:'j0h7ehoz'},function(res){
                    that.tableList = res.obj;
                })
            },
            queryTemplate(){
                var that = this;
                ajax.getJson(this.baseHost+'/listTemplate',{tenantId:'j0h7ehoz'},function(res){
                    that.templateTableList = res.obj;
                })
            },
            addSource(){
                var form = this.form;
                var params={
                    tenantId:'j0h7ehoz',
                    userId:'zhangsan',
                    bo:{
                        "bo":{
                            "bo_code":form.dataSourceCode,
                            "bo_name":form.dataSourceName,
                            "tenant_id":"j0h7ehoz",
                            "app_id":"1",
                            "bo_attrs":[{
                                    "name":form.fieldName1,
                                    "code":form.fieldCode1,
                                    "typename":form.fieldCode1,
                                    "fieldtype":"VARCHAR",
                                    "fieldname":form.fieldCode1,
                                    "isPrimary":"0"
                                },
                                {
                                    "name":form.fieldName2,
                                    "code":form.fieldCode2,
                                    "typename":form.fieldCode2,
                                    "fieldtype":"VARCHAR",
                                    "fieldname":form.fieldCode2,
                                    "isPrimary":"0"
                                }]
                            }}
                }
                ajax.postJson(this.baseHost+'/saveBuzVO',params,function(res){
                    showMessage('提示',res,'info');
                })
            },
            addClick(){

//                var params = {
//
//                }
//                this.printData = <div style={{color:'red'}}>aaaaaaa</div>
//                ajax.postJson(this.baseHost+"/",params,function(res){
//
//                })

            },
            designClick(){
                if(this.template.sourceCode == ''||this.template.templateCode == ''){
                    showMessage('提示',"数据源编码和模板编码不能为空",'info');

                    return;
                }
//                this.designUrl = this.baseHost+"/add?tenantId=j0h7ehoz&bocode="+this.template.sourceCode+"&reportName="+this.template.templateCode+"&type=48a8206f-6759-431e-bf84-e973935e2fcc";
                var designUrl = this.baseHost+"/add?tenantId=j0h7ehoz&bocode="+this.template.sourceCode+"&reportName="+this.template.templateCode+"&type=48a8206f-6759-431e-bf84-e973935e2fcc";
                window.open(designUrl);
            },
            viewClick(){

                if(this.template.templateCode == ''){
                    showMessage('提示',"模板编码不能为空",'info');

                    return;
                }
                var params={
                    tenantId:'j0h7ehoz',
                    printcode:this.template.templateCode,
                    serverUrl:this.baseHost+'/getdata',
//                    params:JSON.stringify({
//                        id:123,
//                        template:this.template.templateCode,
//                        tenantId:'j0h7ehoz'
//                    }),
                    sendType:2,

                }
//                this.viewUrl=this.baseHost+"/previewTemplate?tenantId="+params.tenantId+"&printcode="+params.printcode+"&serverUrl="+params.serverUrl+"&params="+params.params+"&sendType="+params.sendType;
                var viewUrl=this.baseHost+"/previewTemplate?tenantId="+params.tenantId+"&printcode="+params.printcode+"&serverUrl="+params.serverUrl+"&params="+params.params+"&sendType="+params.sendType;
                window.open(viewUrl);
            },

            selectionChange:function(selectedRow){
                //表格选中事件
                this.tableSelected = selectedRow;
            },
        }
    }
</script>
<style lang="sass">
    .card-demo{
        .el-row{
            margin-bottom:0.5em;
        }
    }
</style>