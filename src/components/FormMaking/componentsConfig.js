/*export const basicComponents = [
  {
    type: 'input',
    icon: 'icon iconfont icon-input',
    name: '输入框',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: '',
/!*      pattern: '',*!/
      placeholder: '',
      disabled: false,
    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 'icon iconfont icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: ''
    }
  },
  {
    type: 'number',
    icon: 'icon iconfont icon-number',
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: ''
    }
  },
  {
    type: 'radio',
    icon: 'icon iconfont icon-radio-active',
    name:"单选框",
    options: {
      defaultValue:"",
      dictId:'76ACF600189647489831436CA030D2F4',
      required: false,
      width: '',
      disabled: false,
    }
  },
  {
    type: 'checkbox',
    icon: 'icon iconfont icon-check-box',
    name:"多选框",
    options: {
      defaultValue: "",
      dictId:'76ACF600189647489831436CA030D2F4',
      required: false,
      width: '',
      disabled: false,
    },
  },
  {
    type: 'select',
    icon: 'icon iconfont icon-select',
    name:"下拉框",
    options: {
      defaultValue: '',
      dictId:'76ACF600189647489831436CA030D2F4',
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      width: '',
      filterable: false
    }
  },
  {
    type: 'time',
    icon: 'icon iconfont icon-time',
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '',
    }
  },
  {
    type: 'date',
    icon: 'icon iconfont icon-date',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
/!*      timestamp: false,*!/
      required: false,
      width: '',
    }
  },
  {
    type: 'rate',
    icon: 'icon iconfont icon-pingfen1',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    }
  },
  {
    type: 'color',
    icon: 'icon iconfont icon-color',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false
    }
  },
  {
    type: 'switch',
    icon: 'icon iconfont icon-switch',
    name:"开关",
    options: {
      defaultValue: false,
      required: false,
      disabled: false,
    }
  },
  {
    type: 'slider',
    icon: 'icon iconfont icon-slider',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ''
    }
  },
  {
    type: 'text',
    icon: 'icon iconfont icon-wenzishezhi-',
    name:"文字",
    options: {
      defaultValue: '',
      customClass: '',
    }
  },
  {
    type:"upload",
    name: '附件',
    icon:"el-icon-upload",
    options:{
      limit:1,
      accept:[],
      defaultAccept:["txt","jpg","xls","xlsx","rar","zip"],
      tips:"",
      uploadUrl:"/api5/upload",
      disabled:false,
      multiple:true,
      btnTitle:"点击上传"
    }
  },
  {
    type:"viewBtn",
    name:'浏览按钮',
    icon:"el-icon-collection-tag",
    options:{
       multiple:false,
       disabled:false
    }
  },
  {
    type:"link",
    name:'超链接',
    icon:"el-icon-link",
    options:{
      type:"primary",
      underline:true,
      blank:true,
      disabled:false
    }
  },
]

export const advanceComponents = [
  {
    type: 'blank',
    icon: 'icon iconfont icon-zidingyishuju',
    options: {
      defaultType: 'String'
    }
  },
  {
    type: 'imgupload',
    name:"图片",
    icon: 'icon iconfont icon-tupian',
    options: {
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      /!*      tokenFunc: 'icon iconfont funcGetToken',
            token: '',
            domain: 'http://pfp81ptt6.bkt.clouddn.com/',*!/
      disabled: false,
      length: 3,
      multiple: false,
      isDelete: false,
      //min: 0,
      isEdit: false,
      action: 'https://jsonplaceholder.typicode.com/photos/'
    }
  },
  {
    type: 'editor',
    icon: 'icon iconfont icon-fuwenbenkuang',
    options: {
      defaultValue: '',
      width: ''
    }
  },
  {
    type: 'cascader',
    icon: 'icon iconfont icon-jilianxuanze',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'table',
    name: '子表单',
    icon: 'icon iconfont icon-table',
    tableColumns: [],
    options: {
      defaultValue: []
      /!*      required: false,
            disabled: false*!/
    }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    icon: 'icon iconfont icon-grid-',
    columns: [
      {
        span: 12,
        scale:1,
        list: []
      },
      {
        span: 12,
        scale:1,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
      rowConfig:"span",
      blank: 0
    }
  }
]*/

export const basicComponents=[
  {
    type: 'text',
    icon: 'icon iconfont icon-wenzishezhi-',
    name:"文字",
    options: {
      defaultValue: '',
      customClass: '',
    }
  }
]

export const layoutComponents =[
  {
    type: 'grid',
    icon: 'icon iconfont icon-grid-',
    name: "栅格",
    columns: [
      {
        span: 12,
        scale: 1,
        list: []
      },
      {
        span: 12,
        scale: 1,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
      rowConfig: "span",
      blank: 0
    }
  },
  {
    type: 'table',
    name: '子表单',
    icon: 'icon iconfont icon-table',
    tableColumns: [],
    options: {
      defaultValue: []
    }
  }]
