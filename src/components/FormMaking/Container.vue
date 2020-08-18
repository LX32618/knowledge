<template>
  <el-container class="fm2-container" v-loading="tempLoading">
    <el-main class="fm2-main">
      <el-container>
        <el-aside width="250px">
          <div class="components-list">
            <template>
              <div class="widget-cate">基础字段</div>
              <draggable tag="ul" :list="basicComponents"
                         v-bind="{group:{ name:'grid', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                         @end="handleMoveEnd"
                         @start="handleMoveStart"
                         :move="handleMove"
              >
                <li class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}" v-for="(item, index) in basicComponents" :key="index">
                  <a>
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>

            <div class="components-list">
              <template>
                <div class="widget-cate">布局字段</div>
                <draggable tag="ul" :list="layoutComponents"
                           v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                           @end="handleMoveEnd"
                           @start="handleMoveStart"
                           :move="handleMove"
                >
                  <li class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}" v-for="(item, index) in layoutComponents" :key="index">
                    <a>
                      <i :class="item.icon"></i>
                      <span>{{item.name}}</span>
                    </a>
                  </li>
                </draggable>
              </template>

              <template v-if="JSON.stringify(mainForm) != '{}'">
                <div class="widget-cate">主表{{mainForm.formName}}</div>
                  <draggable tag="ul" v-model="mainForm.data"
                             v-bind="{group:{ name:'grid', pull:true,put:false},sort:false, ghostClass: 'ghost'}"
                             @end="handleMoveEnd"
                             @start="handleMoveStart"
                             :move="handleMove">
                    <li class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}" v-for="(item, index) in mainForm.data" :key="index">
                      <a>
                        <i :class="item.icon"></i>
                        <span>{{item.name}}</span>
                      </a>
                    </li>
                  </draggable>
                  <div v-if="!mainForm.data.length">
                    <span style="font-size:12px;padding: 8px 20px;color:#F56C6C">暂无字段</span>
                  </div>
              </template>

              <template v-if="subForm.length">
                <div v-for="sub in subForm" :key="sub.formId">
                  <div class="widget-cate">子表{{sub.formName}}</div>
                  <draggable tag="ul" :list="sub.data"
                             v-bind="{group:{ name: sub.formId, pull:true,put:false},sort:false, ghostClass: 'ghost'}"
                             @end="handleMoveEnd"
                             @start="handleMoveStart"
                             :move="handleMove">
                    <li class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}" v-for="(item, index) in sub.data" :key="index">
                      <a>
                        <i :class="item.icon"></i>
                        <span>{{item.name}}</span>
                      </a>
                    </li>
                  </draggable>
                  <div v-if="!sub.data.length">
                    <span style="font-size:12px;padding: 8px 20px;color:#F56C6C">暂无字段</span>
                  </div>
                </div>
              </template>
            </div>

          </div>

        </el-aside>
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action">
            </slot>
            <el-button :disabled="stateIndex < 0" type="text" size="medium" icon="el-icon-arrow-left" @click="handleUndo">撤销</el-button>
            <el-button :disabled="stateIndex >= historyStates.length - 1" type="text" size="medium" icon="el-icon-arrow-right" @click="handleRedo">重做</el-button>
            <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">导入JSON</el-button>
            <el-button v-if="initial" type="text" size="medium" icon="element-icons el-custom-initialize" @click="handleInitial">&nbsp;&nbsp;初始化</el-button>
            <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空</el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
            <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
            <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button>
            <el-button v-if="save" type="text" size="medium" icon="element-icons el-custom-save" @click="handleSave">&nbsp;&nbsp;保存</el-button>
            <el-button v-if="close" type="text" size="medium" icon="el-icon-circle-close" @click="handleClose">关闭</el-button>
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
            <widget-form v-if="!resetJson"  ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect" @removeGrid="removeGrid" @removeWidget="removeWidget"></widget-form>
          </el-main>
        </el-container>

        <el-aside class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
              <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
            </el-header>
            <el-main class="config-content">
              <widget-config v-show="configTab=='widget'" :data="widgetFormSelect" :allSubForms="allSubForms" :usedSubForms="usedSubForms" @removeCol="removeCol"></widget-config>
              <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
            </el-main>
          </el-container>

        </el-aside>

        <cus-dialog
          :visible="previewVisible"
          @on-close="handlePreviewClose"
          ref="widgetPreview"
          width="1000px"
          form
        >
          <generate-form insite="true" @on-change="handleDataChange" v-if="previewVisible" :edit="true" :preview="true" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs" ref="generateForm">

            <template v-slot:blank="scope">
              Width <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              Height <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
          </generate-form>

          <template slot="action">
            <el-button type="primary" @click="handleTest">获取数据</el-button>
            <el-button @click="handleReset">重置</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="uploadVisible"
          @on-close="uploadVisible = false"
          @on-submit="handleUploadJson"
          ref="uploadJson"
          width="800px"
          form
        >
          <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
          <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div>
        </cus-dialog>

        <cus-dialog
          :visible="jsonVisible"
          @on-close="jsonVisible = false"
          ref="jsonPreview"
          width="800px"
          form
        >

          <div id="jsoneditor" style="height: 400px;width: 100%;">
            <json-editor v-model="jsonTemplate"></json-editor>
          </div>

          <template slot="action">
            <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">复制数据</el-button>
          </template>
        </cus-dialog>

        <cus-dialog
          :visible="codeVisible"
          @on-close="codeVisible = false"
          ref="codePreview"
          width="800px"
          form
          :action="false"
        >
          <!-- <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div> -->
          <el-tabs type="border-card" style="box-shadow: none;" v-model="codeActiveName">
            <el-tab-pane label="Vue Component" name="vue">
              <div id="vuecodeeditor" style="height: 500px; width: 100%;">{{vueTemplate}}</div>
            </el-tab-pane>
            <el-tab-pane label="HTML" name="html">
              <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
            </el-tab-pane>
          </el-tabs>
        </cus-dialog>
      </el-container>
    </el-main>
<!--    <el-footer height="30px" style="font-weight: 600;">Powered by <a target="_blank" href="https://github.com/GavinZhuLei/vue-form-making">vue-form-making</a></el-footer>-->
  </el-container>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import Clipboard from 'clipboard'
import {basicComponents, layoutComponents} from './componentsConfig.js'
import {loadJs, loadCss} from '@/utils/index.js'
import request from '@/utils/request.js'
import generateCode from './generateCode.js'
import { mapGetters } from 'vuex'
import _ from "lodash"
import {fetchTemplate,saveTemplate} from "@/api/formMaking.js"

export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  props: {
    categoryId:{
      type:String,
      default:""
    },
    modelData:{
      type:Object,
      default:()=>{}
    },
    preview: {
      type: Boolean,
      default: false
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    save: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: false
    },
    initial: {
      type: Boolean,
      default: false
    },
    basicFields: {
      type: Array,
      default: () => ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider', 'text','upload','viewBtn','link']
    },
    advanceFields: {
      type: Array,
      default: () => ['blank', 'imgupload', 'editor', 'cascader', 'table']
    },
    layoutFields: {
      type: Array,
      default: () => ['grid']
    }
  },
  data () {
    return {
      tempLoading:false,
      basicComponents,
      layoutComponents,
      advanceComponents,
      mainForm:{},
      subForm:[],
      savedModel:{},
      dataBak:{},
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        },
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      remoteFuncs: {
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              {id: '1', name: '1111'},
              {id: '2', name: '2222'},
              {id: '3', name: '3333'}
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken (resolve) {
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback (response, file, fileList) {
          // console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      vueTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`,
      codeActiveName: 'vue',
    }
  },
  computed: {
    ...mapGetters([
      'historyStates',
      'stateIndex'
    ]),
    allSubForms () {
      return this.subForm.map(item => {
        return {
          id: item.formId,
          name: item.formName
        }
      })
    },
    usedSubForms () {
      return this.widgetForm.list.filter(item => item.type === 'table').map(item => {
        return {
          id: item.key,
          name: item.name
        }
      })
    }
  },
  methods: {
    handleInitial(){
      let {view} = this.transModelData();
      this.mainForm.data = [];
      this.subForm.forEach(sub=>{
        sub.data = [];
      });
      this.setJSON(view);
      this.updateState();
    },
    initialModelData(){
      this.tempLoading = true;
      let {model,view} = this.transModelData();
      this.dataBak = _.cloneDeep(model);//将数据复制储存起来
      let savedModel = {};
      let option = {
        categoryId:this.categoryId,
        formId:this.modelData.id
      };
      fetchTemplate(option).then(resp=>{
        if(resp.status == "success")
        {
          if(resp.content.length){
            savedModel = resp.content.filter(c=>{
              return c.type == -1
            })[0];
            let loadedModel = JSON.parse(savedModel.content);//界面上已经加载过的数据了
            loadedModel.list.forEach(lm=>{
              if(lm.type == 'grid') {
                lm.columns.forEach(c => {
                  c.list.forEach(m => {
                    if(m.type != "text")
                    {
                      let key = m.options.key;
                      let index = model.main.data.findIndex(d => {
                        return d.options.key == key;
                      })
                      model.main.data.splice(index,1);
                    }
                  })
                })
              }
              else{
                let tableId = lm.key;
                model.sub.forEach(s=>{
                  if(s.formId == tableId){//找到对应的子表
                    lm.tableColumns.forEach(c=>{
                      let key = lm.key;
                      let index = s.data.findIndex(d=>{
                        return d.options.key == key;
                      })
                      s.data.splice(index,1);
                    })
                  }
                })

              }
            });//剔除已经加载过的数据
            this.setJSON(loadedModel);//界面显示初始化的模板
          }
          this.savedModel = savedModel;
          this.mainForm = model.main;
          this.subForm = model.sub;
        }
        else{
          this.$error(resp.msg);
        }
        this.tempLoading = false;
      });
    },
    transModelData(){
      let model = {
        main:{},
        sub:[]
      };
      model.main = {
        formId:this.modelData.id,
        formName:this.modelData.formName,
        data:this.initialTransform(this.modelData.id,this.modelData.datas)
      };
      let textKey = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
      let gridKey = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
      let view = {
        list:[
          {
            type: "grid",
            icon: "icon iconfont icon-grid-",
            name: "栅格",
            columns:[
              {
                span:12,
                scale:1,
                list:[{
                  type: 'text',
                  icon: 'icon iconfont icon-wenzishezhi-',
                  name:this.modelData.formName,
                  options: {
                    defaultValue: '',
                    customClass: ''
                  },
                  key:textKey,
                  model:"text_"+textKey,
                  rules:[]
                }]
              },
            ],
            options:{
              gutter:0,
              justify:"start",
              align:"top",
              rowConfig:"scale",
              blank:0
            },
            rules:[],
            key:gridKey,
            model:"grid_"+gridKey,
          }
        ],
        config:{
          labelWidth:100,
          labelPosition:"right",
          size:"mini"
        }
      };
      let modelTemp = _.cloneDeep(model);
      let loop = Math.ceil(modelTemp.main.data.length/2);
      for(let i = 0;i<loop;i++) {
        let gridKey = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);

        let grid = {
          type: "grid",
          icon: "icon iconfont icon-grid-",
          columns: [],
          options: {
            gutter: 0,
            justify: "start",
            align: "top",
            rowConfig: "span",
            blank: 0
          },
          key:gridKey,
          model:"grid_"+gridKey,
          rules: []
        }
        let col = {
          span:12,
          scale:1,
          list:[]
        };
        modelTemp.main.data[i*2].key = modelTemp.main.data[i*2].options.key;
        modelTemp.main.data[i*2].model = modelTemp.main.data[i*2].options.model;
        col.list.push(modelTemp.main.data[i*2])
        let col1={
          span:12,
          scale:1,
          list:[]
        }
        if(i== loop -1 && modelTemp.main.data.length%2 == 1){//最后一次循环且数量为奇数
        }
        else
        {
          modelTemp.main.data[i*2+1].key = modelTemp.main.data[i*2+1].options.key;
          modelTemp.main.data[i*2+1].model = modelTemp.main.data[i*2+1].options.model;
          col1.list.push(modelTemp.main.data[i*2+1]);
        }

        grid.columns.push(col);
        grid.columns.push(col1);
        view.list.push(grid);
      }
      this.modelData.subForm.forEach(s=>{
        let subFormData = this.initialTransform(s.id,s.datas);
        let subModel = {
          formId:s.id,
          formName:s.formName,
          data:subFormData
        }
        model.sub.push(subModel);
        let table = {
          type:"table",
          name:s.formName,
          icon:"icon iconfont icon-table",
          tableColumns:[],
          options:{
            defaultValue:[]
          },
          key:s.id,
          model:"table_"+s.id,
          rules:[]
        };
        let tempSubFormData = _.cloneDeep(subFormData);
        tempSubFormData.forEach(s=>{
          s.options.width = "200px";
          s.key = s.options.key;
          s.model = s.options.model;
          table.tableColumns.push(s);
        })
        view.list.push(table);
      })
      return {model,view};
    },
    initialTransform(formId,data){
      data = data.filter(d=>d.htmlType != -1);
      let tranferData = [];
      data.forEach(d=>{
        let tran = {};
        tran.name = d.displayName;
        tran.formId = formId;
        tran.disabled = false;
        tran.rules = [];
        tran.options = {};
        tran.options.key = d.id;
        tran.options.model = d.fieldName;
        if(d.htmlType == 0)
        {
          tran.type = "input";
          tran.icon = "icon iconfont icon-input";
          tran.options.width = "100%";
          tran.options.defaultValue = "";
          tran.options.dataType = "";
          tran.options.required = false;
          tran.options.placeholder = "";
        }
        else if(d.htmlType == 1){
          tran.type = "radio";
          tran.icon = "icon iconfont icon-radio-active";
          tran.options.width = "";
          tran.options.defaultValue = "";
          tran.options.dictId = d.fieldType;
          tran.options.required = false;
          tran.options.placeholder = "";
        }
        else if(d.htmlType == 2)
        {
          tran.type = "switch";
          tran.icon = "icon iconfont icon-switch";
          tran.options.defaultValue = false;
          tran.options.required = false;
        }
        else if(d.htmlType == 3)
        {
          tran.type = "select";
          tran.icon = "icon iconfont icon-select";
          tran.options.defaultValue = '';
          tran.options.width = "";
          tran.options.dictId = d.fieldType;
          tran.options.required = false;
          tran.options.disabled = false;
          tran.options.clearable = false;
          tran.options.filterable = false;
          tran.options.placeholder = "";
        }
        else if(d.htmlType == 4)
        {
          tran.type = "upload";
          tran.icon = "icon el-icon-upload";
          tran.options.limit = 1;
          tran.options.accept = [];
          tran.options.defaultAccept = ["txt","jpg","xls","xlsx","rar","zip"];
          tran.options.uploadUrl = "/api5/upload";
          tran.options.disabled = false;
          tran.options.multiple = true;
          tran.options.btnTitle = "点击上传";
        }
        else if(d.htmlType == 5)
        {
          tran.type = "imgupload";
          tran.icon = "icon iconfont icon-tupian";
          tran.options.defaultValue = [];
          tran.options.size = {};
          tran.options.size.width = 100;
          tran.options.size.height = 100;
          tran.options.length = 3;
          tran.options.multiple = true;
          tran.options.isDelete = false;
          tran.options.isEdit = false;
          tran.options.action = 'https://jsonplaceholder.typicode.com/photos/';

        }
        else if(d.htmlType == 6 || d.htmlType == 7){
          tran.type = "viewBtn";
          tran.icon = "icon el-icon-collection-tag";
          tran.options.disabled = false;
        }
        else if(d.htmlType == 8){
          tran.type = "checkbox";
          tran.icon = "icon iconfont icon-check-box";
          tran.options.width = "";
          tran.options.disabled = false;
          tran.options.required = false;
          tran.options.dictId = d.fieldType;
          tran.options.defaultValue = '';
        }
        else if(d.htmlType == 9){
          tran.type = "textarea";
          tran.icon = "icon iconfont icon-diy-com-textarea";
          tran.options.defaultValue = "";
          tran.options.width = "100%";
          tran.options.required = false;
          tran.options.disabled = false;
          tran.options.pattern = "";
          tran.options.placeholder = "";
        }
        else if(d.htmlType == 11){
          tran.type = "date";
          tran.icon = "icon iconfont icon-date";
          tran.width = "";
          tran.options.readonly = false;
          tran.options.disabled = false;
          tran.options.editable = false;
          tran.options.clearable = false;
          tran.options.required = false;
          tran.options.placeholder = "";
          tran.options.startPlaceholder = "";
          tran.options.endPlaceholder = "";
          tran.options.type = "date";
          tran.options.format = "yyyy-MM-dd";
        }
        else if(d.htmlType == 13){
          tran.type = "link";
          tran.icon = "icon el-icon-link";
          tran.options.type = "primary";
          tran.options.disabled = false;
          tran.options.underline = true;
          tran.options.blank = true;
        }
        tranferData.push(tran);
      })
      return tranferData;
    },
    removeGrid({index,removeData}){
      let type = removeData.type;
      //let key = removeData.key;
      if("grid" == type)//删除的是主表中的grid
      {
        removeData.columns.forEach(col=>{
          if(col.list.length>0)//栅格中有界面元素
          {
            col.list.forEach(m=>{
              if(m.type != "text")//界面元素不是text
              {
                let key = m.key;
                let removeModelData = this.dataBak.main.data.filter(d=>{
                  return d.options.key == key;
                });
                this.mainForm.data.push(removeModelData[0]);
              }
            })
          }
        })
      }
      else if("table" ==  type)//删除的是子表
      {
        let formId = removeData.key;
        let removeModelData = this.dataBak.sub.filter(s=>{
          return s.formId == formId;
        })
        let index = this.subForm.findIndex(s=>{
          return s.formId == formId;
        })
        this.subForm.splice(index,1,removeModelData[0]);
      }
      this.updateState();
    },
    removeCol({index,removeData}){
        removeData.list.forEach(m=>{
          if("text"!= m.type){//不是文本
            let removeModelData = this.dataBak.main.data.filter(d=>{
              return d.options.key == m.key;
            });
            this.mainForm.data.push(removeModelData[0]);
          }
        })
        this.updateState();
    },
    removeWidget({index,removeData}){
        let formId = removeData.formId;
        let type = removeData.type;
        let key = removeData.key;
        if("text" != type)//不是文本
        {
          if(formId == this.mainForm.formId)//是主表单的
          {
            let removeModelData = this.dataBak.main.data.filter(d=>{
              return d.options.key == key;
            });
            this.mainForm.data.push(removeModelData[0]);
          }
          else//是子表单的
          {
            let removeSubForm = this.dataBak.sub.filter(s=>{
              return s.formId == formId;
            });
            let removeModelData = removeSubForm[0].data.filter(d=>{
              return d.options.key == key;
            })
            this.subForm.forEach(s=>{
              if(s.formId == formId)
              {
                s.data.push(removeModelData[0]);
              }
            })
          }
        }
        this.updateState();
    },
    handleGoGithub () {
      //window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
    },
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
    },
    handleMoveStart ({oldIndex}) {
    },
    handleMove () {
      return true
    },
    handlePreview () {
      // console.log(this.widgetForm)
      this.previewVisible = true
    },
    handlePreviewClose () {
      this.previewVisible = false
      this.handleReset()
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e=>{})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleReset () {
      this.$refs.generateForm.reset()
    },
    handleGenerateJson () {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm

      this.$nextTick(() => {
        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success('复制成功')
          })
        }
        this.jsonCopyValue = JSON.stringify(this.widgetForm)
      })
    },
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm), 'html')
      this.vueTemplate = generateCode(JSON.stringify(this.widgetForm), 'vue')
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode("ace/mode/html")

        const vueeditor = ace.edit('vuecodeeditor')
        vueeditor.session.setMode("ace/mode/html")
      })
    },
    handleUpload () {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.uploadEditor = ace.edit('uploadeditor')
        this.uploadEditor.session.setMode("ace/mode/json")
      })
    },
    handleUploadJson () {
      try {
        this.setJSON(JSON.parse(this.uploadEditor.getValue()))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    handleClear () {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          customClass: ''
        },
      }

      this.updateState()

      this.widgetFormSelect = {}
    },
    handleSave(){
      this.tempLoading = true;
      let option = {
        id:JSON.stringify(this.savedModel) == "{}"?"":this.savedModel.id,
        templateName:"template",
        categoryId:this.categoryId,
        formId:this.modelData.id,
        type:"-1",
        content:JSON.stringify(this.widgetForm)
      };
      saveTemplate(option).then(resp=>{
        if(resp.status == "success")
        {
          //this.tempFormData = resp.content.knowledgeModel.formModel;
          this.$success("保存成功");
        }
        else{
          this.$error(resp.msg);
        }
        this.tempLoading = false;
      });


    },
    handleClose(){
      this.$emit("closeFormMaking");
    },
    getJSON () {
      return this.widgetForm
    },
    getHtml () {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON (json) {
      this.widgetForm = json

      if (json.list.length> 0) {
        this.widgetFormSelect = json.list[0]
      }
    },
    handleInput (val) {
      // console.log(val)
      this.blank = val
    },
    handleDataChange (field, value, data) {
      // console.log(field, value, data)
    },
    handleUndo () {
      this.$store.commit('formMaking/UNDO')
      if (this.stateIndex >= 0) {
        this.widgetForm = this.historyStates[this.stateIndex]
      } else {
        this.handleClear()
      }
    },
    handleRedo () {
      this.$store.commit('formMaking/REDO')
      this.widgetForm = this.historyStates[this.stateIndex]
    },
    updateState () {
      this.$store.commit('formMaking/APPEND_STATE', this.widgetForm)
    },
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
      }
    }
/*    'widgetForm.list':{
      //deep:true,
      handler:function (val) {
     /!*   console.log("list change");
        console.log(val);*!/
      }
    }*/
  },
  mounted () {
    this.$store.commit('formMaking/RESET_STATES');
  },
  created(){
    let self = this;
    let ctrlKey = false;
    let zKey = false;
    let yKey = false;
    document.onkeydown = function(e) {
      if("Control"== e.key)
      {
        e.preventDefault() //禁止默认事件
        ctrlKey = true;
      }
      if("z"== e.key)
      {
        e.preventDefault() //禁止默认事件
        zKey = true;
      }
      if("y" == e.key)
      {
        e.preventDefault() //禁止默认事件
        yKey = true;
      }
      if(ctrlKey && zKey)
      {
        self.handleUndo();
      }
      if(ctrlKey && yKey)
      {
        self.handleRedo();
      }
    };
    document.onkeyup = function(e) {
      if("Control"== e.key)
      {
        ctrlKey = false;
      }
      if("z"== e.key)
      {
        zKey = false;
      }
      if("y" == e.key)
      {
        yKey = false;
      }
    };
  },
}
</script>

<style lang="scss">
  .widget-empty{
    background-position: 50%;
  }
  #jsoneditor {
    .cm-s-rubyblue {
      height: 400px;
    }
  }
</style>
