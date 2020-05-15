import _ from 'lodash';
const rootPath = '/api/knowlist/'
/*private String id;
private String pid; //父节点ID
private String categoryName; //目录名称（唯一）
private String categoryCode; //目录编号
private String remark; //目录说明
private String createDate; //创建时间 yyyy-mm-dd hh24:mi:ss
private String createUser; //创建人
private String pids; 	// 父ID集合
private Integer type; //目录类型 (0.知识库，1.分类，2.目录)
private int sort; //显示顺序
private String formId = ""; //关联表单id
formName
labelId
labelName
private String picture; //知识库图片
private Integer isDelete; //是否删除（0.未删除、1.已删除）
private int secretLevel;//密级（10、非密，20、内部，30、秘密，40、机密）
isSentMail//是否开启邮件（0否1是）
enable//是否启用（0否1是）*/


let datas = [
    {
        pid:"",
        id: "1",
        name: '知识目录',
        isLeaf:false,
        categoryName: '知识目录',
        categoryCode:"1",
        createDate:"2020-5-6",
        createUser:"lisy1",
        type:"",//目录类型 (0.知识库，1.分类，2.目录)
        sort:"",
        formId:"",
        formName:"",
        labelId:"",
        labelName:"",
        picture:"",
        secretLevel:"",
        isSentMail:"",//是否开启邮件（0否1是）
        enable:"",//是否开启邮件（0否1是）
        remark:""
    },
    {
        pid: "1",
        id: "2",
        name: "机械产品知识库",
        isLeaf:false,
        categoryName: "机械产品知识库",
        categoryCode:"2",
        createDate:"2020-5-6",
        createUser:"lisy1",
        type:"0",//目录类型 (0.知识库，1.分类，2.目录)
        sort:"0",
        formId:"6776CA76C6C24519ACE0785B39184593",
        formName:"组织资产",
        labelId:"2",
        labelName:"性质",
        picture:"fa fa-microchip",
        secretLevel:"20",
        isSentMail:"0",//是否开启邮件（0否1是）
        enable:"1",//是否开启邮件（0否1是）
        remark:""
    },
    {
        pid: "2",
        id: "3",
        isLeaf:true,
        name: "设计知识",
        categoryName: "设计知识",
        type:"2",//目录类型 (0.知识库，1.分类，2.目录)
        categoryCode:"3",
        createDate:"2020-5-6",
        createUser:"lisy1",
        sort:"0",
        formId:"",
        formName:"",
        labelId:"3",
        labelName:"雷达功能",
        picture:"",
        secretLevel:"20",
        isSentMail:"0",//是否开启邮件（0否1是）
        enable:"1",//是否开启邮件（0否1是）
        remark:""
    },
    {
        pid:"2",
        id: "4",
        type: "1",//目录类型 (0.知识库，1.分类，2.目录)
        isLeaf:false,
        name: "产品分类",
        categoryName: "产品分类",
        categoryCode:"4",
        createDate:"2020-5-6",
        createUser:"lisy1",
        sort:"0",
        formId:"",
        formName:"",
        labelId:"",
        labelName:"",
        picture:"",
        secretLevel:"30",
        isSentMail:"0",//是否开启邮件（0否1是）
        enable:"1",//是否开启邮件（0否1是）
        remark:""
    },
    {
        pid:"4",
        id: "5",
        type:"2",//目录类型 (0.知识库，1.分类，2.目录)
        name: "目录一",
        isLeaf:true,
        categoryName: "目录一",
        categoryCode:"5",
        createDate:"2020-5-6",
        createUser:"lisy1",
        sort:"0",
        formId:"709BDC9CF1DF47939C679907958CBD51",
        formName:"规范",
        labelId:"4",
        labelName:"质量",
        picture:"fa fa-bar-chart-o",
        secretLevel:"10",
        isSentMail:"1",//是否开启邮件（0否1是）
        enable:"1",//是否开启邮件（0否1是）
        remark:"zzzzzzzzzzz"
    },
    {
        pid:'4',
        id: "6",
        type:"2",//目录类型 (0.知识库，1.分类，2.目录)
        name: "目录二",
        isLeaf:true,
        categoryName: "目录二",
        categoryCode:"6",
        createDate:"2020-5-6",
        createUser:"lisy1",
        sort:"0",
        formId:"7169A992CA9243A6A8981699652E2966",
        formName:"故障案例",
        labelId:"7",
        labelName:"设计",
        picture:"",
        secretLevel:"10",
        isSentMail:"1",//是否开启邮件（0否1是）
        enable:"1",//是否开启邮件（0否1是）
        remark:"ccccccccc"
    }
]

export default [
    {
        url: `${rootPath}getnodes`,
        type: 'post',
        response: config => {
            const { pid } = config.body;
            const filterDatas = datas.filter(node => node.pid === pid);
            return {
                status: "success",
                content:filterDatas,
                message: 'success'
            }

        }
    },
    {
        url: `${rootPath}get`,
        type: 'post',
        response: config => {
            const { id } = config.body;
            const filterDatas = datas.filter(d => d.id === id);
            return {
                status: "success",
                content:filterDatas[0],
                message: 'success'
            }

        }
    },
    {
        url: `${rootPath}save`,
        type: 'post',
        response:  config => {
            let data = config.body;
            data.name = data.categoryName;
            if(data.id == "")//新增
            {
                let id = Math.floor(Math.random()*100+100).toString();
                data.id = id;
                data.isLeaf = true;
                datas.push(data);
            }
            else{//编辑
                let index = datas.findIndex(d=>d.id==data.id);
                datas.splice(index,1,data);
            }
            return {
                status: "success",
                message: 'success'
            }
        }

    },
    {
        url: `${rootPath}remove`,
        type: 'post',
        response: config => {
            const {id} = config.body;
            datas = datas.filter(d => d.id != id);
            return {
                status: "success",
                message: 'success'
            }

        }
    }
]
