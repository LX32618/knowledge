import _ from 'lodash';
const rootPath = '/api/model/'

//region 数据
let forms = [ {
    "formType": "0",/*0是实体表单，1是虚拟表单*/
    "formName": "组织资产",
    "id": "6776CA76C6C24519ACE0785B39184593",
    "sortTable": "0",
    "tableName": "aa",
    "knowledgeDir": "",
    "associatedForm": [

    ]
}, {
    "formType": "1",
    "formName": "规范",
    "id": "709BDC9CF1DF47939C679907958CBD51",
    "sortTable": "0",
    "tableName": "COM_NORMAL",
    "knowledgeDir": "test",
    "associatedForm": [
        {"id": "F61441A3D8E942BEA61B71CBA0142D2E", "formName": "ddd"},
        {"id": "7169A992CA9243A6A8981699652E2966", "formName": "故障案例"}
    ]
}, {
    "formType": "0",
    "formName": "工艺案例",
    "id": "712FB279F265438F9A131540BE250B06",
    "sortTable": "0",
    "tableName": "PROCESS_CASES",
    "knowledgeDir": "",
    "associatedForm": [
    ]
}, {
    "formType": "0",
    "formName": "故障案例",
    "id": "7169A992CA9243A6A8981699652E2966",
    "sortTable": "0",
    "tableName": "table_5",
    "knowledgeDir": "产品六性知识模型库",
    "associatedForm": [
    ]
}, {
    "formType": "0",
    "formName": "产品六性设计模型",
    "id": "7E3DC391748B4708A13D5652CAABAAB4",
    "sortTable": "0",
    "tableName": "table_8",
    "knowledgeDir": "产品六性知识模型库",
    "associatedForm": [
    ]
}, {
    "formType": "0",
    "formName": "频段",
    "id": "7EAAD47ECA3B46A896C13EB52DB4D2A5",
    "sortTable": "0",
    "tableName": "BAND",
    "knowledgeDir": "",
    "associatedForm": [
    ]
},{
    "formType": "1",
    "formName": "雷达知识",
    "id": "4C3A780ADC2043BD8347B591D038C8A5",
    "sortTable": "0",
    "tableName": "",
    "knowledgeDir": "",
    "associatedForm": [
    ]
}, {
    "formType": "0",
    "formName": "组织资产",
    "id": "5271E8688D89412B9F843FA57CD3C12D",
    "sortTable": "0",
    "tableName": "table_14",
    "knowledgeDir": "软件工程化组织资产库",
    "associatedForm": [
    ]
},
    {
        "formType": "0",
        "formName": "ddd",
        "id": "F61441A3D8E942BEA61B71CBA0142D2E",
        "sortTable": "0",
        "tableName": "ddd",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "集成测试",
        "id": "F79319FDA52548FEB42974C9FC99FAA2",
        "sortTable": "0",
        "tableName": "integration",
        "knowledgeDir": "机载产品知识库",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "工艺成果",
        "id": "FE1FE21105C04686B797EBD5515561A7",
        "sortTable": "0",
        "tableName": "PROCESS_RESULT",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "雷达的基本介绍",
        "id": "B8C9479F29594698BA18F39592489E8A",
        "sortTable": "10",
        "tableName": "RADAR_BASICS",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "test-0",
        "id": "5B41735D76C14FB09CC7278608FB1411",
        "sortTable": "11",
        "tableName": "test000",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "雷达的系统参数",
        "id": "7B8AAD03A6054FB8AB0667D467D79FE8",
        "sortTable": "20",
        "tableName": "SYS_PARAMETER",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "雷达的天线方向",
        "id": "8E9AAD44F3A24D2F94ED2520586F03FA",
        "sortTable": "30",
        "tableName": "RADARANTENNA",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "雷达信号处理/控制方式",
        "id": "BBDAB7EC49AC463E940718EB5D0DC15A",
        "sortTable": "40",
        "tableName": "RADARSIGNAL",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "雷达作用距离估算",
        "id": "1E41FA4EE60747E5A03B5773BCE1269D",
        "sortTable": "50",
        "tableName": "RADAR_COVERAGE",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "雷达部署信息",
        "id": "5D9DEECDE6454CBDA0738E5DB892A714",
        "sortTable": "60",
        "tableName": "RADAR_DEPLOY",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "雷达的block",
        "id": "AB61F6A610FA4CB79F028EBCCE881A5B",
        "sortTable": "70",
        "tableName": "RADARBLOCK",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    },{
        "formType": "0",
        "formName": "添加",
        "id": "54AF3EABF2CF4059BF1300BBA06C85F1",
        "sortTable": "0",
        "tableName": "tttt",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "发放",
        "id": "5A0918BC268049FFA19DFC005571195C",
        "sortTable": "0",
        "tableName": "test_",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "test-1",
        "id": "6343F4DFE2FE4E059C3D592510C2A804",
        "sortTable": "0",
        "tableName": "test1",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "组织资产",
        "id": "6776CA76C6C24519ACE0785B39184593",
        "sortTable": "0",
        "tableName": "aa",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "规范",
        "id": "709BDC9CF1DF47939C679907958CBD51",
        "sortTable": "0",
        "tableName": "COM_NORMAL",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "故障案例",
        "id": "7169A992CA9243A6A8981699652E2966",
        "sortTable": "0",
        "tableName": "table_5",
        "knowledgeDir": "产品六性知识模型库",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "vision_2",
        "id": "78AC471C84C34A48A871046166464AA0",
        "sortTable": "0",
        "tableName": "visio_test2",
        "knowledgeDir": "软件工程化组织资产库",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "关闭",
        "id": "7A04210DD6904ECEA1C9BFC79CC7C646",
        "sortTable": "0",
        "tableName": "guanbi",
        "knowledgeDir": "" ,
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "产品六性设计模型",
        "id": "7E3DC391748B4708A13D5652CAABAAB4",
        "sortTable": "0",
        "tableName": "table_8",
        "knowledgeDir": "产品六性知识模型库",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "频段",
        "id": "7EAAD47ECA3B46A896C13EB52DB4D2A5",
        "sortTable": "0",
        "tableName": "BAND",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "测试用",
        "id": "86D8DE7B22B64958971CA9E15347C178",
        "sortTable": "0",
        "tableName": "test_file",
        "knowledgeDir": "技术体质库",
        "associatedForm": [
        ]
    }, {
        "formType": "1",
        "formName": "visio_other",
        "id": "8A571A63113344908F508E8C0BC60D28",
        "sortTable": "0",
        "tableName": "",
        "knowledgeDir": "软件工程化组织资产库",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "test表单-001a",
        "id": "9CA2109473E54D2CA7E35B46BBCF0EBB",
        "sortTable": "0",
        "tableName": "ziji_knowledge",
        "knowledgeDir": "机载产品知识库",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "测试表单（密级）",
        "id": "A3B303DB2597401BA3CE86C7E4C3449E",
        "sortTable": "0",
        "tableName": "a_table",
        "knowledgeDir": "机载产品知识库",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "ccc",
        "id": "AEE5D1F111D64E319576BB641A2AAE05",
        "sortTable": "0",
        "tableName": "ccc",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "故障准则知识表单",
        "id": "C2E07CE60D1E4C2AB7FB13193E4DB9C8",
        "sortTable": "0",
        "tableName": "table_7",
        "knowledgeDir": "产品六性知识模型库",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "雷达基础知识条目",
        "id": "D20104B903C74FCF9561655B0B918C28",
        "sortTable": "0",
        "tableName": "RADARBASICE",
        "knowledgeDir": "",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "visio测试用",
        "id": "E93FDBEF8D6F418CB3582D75A327A37F",
        "sortTable": "0",
        "tableName": "vison_test",
        "knowledgeDir": "软件工程化组织资产库",
        "associatedForm": [
        ]
    }, {
        "formType": "0",
        "formName": "uytrhgfhgf",
        "id": "ECAC71B88CCD4B9E969912A219D98EA6",
        "sortTable": "0",
        "tableName": "gghjhgjgj",
        "knowledgeDir": "dsa",
        "associatedForm": [
        ]
    }
]
//endregion

export default [
    {
        url: `${rootPath}get`,
        type: 'post',
        response: config => {
            const {page,rows,condition} = config.body;
            let start = rows*(page-1);
            let temp = _.cloneDeep(forms);
            let result = {};
            let formName = condition.formName;
            if(formName != "")
            {
                const filterForms = temp.filter(t=>t.formName.includes(formName));
                result = {total:filterForms.length,datas:filterForms};
            }
            else
            {
                const filterForms = temp.splice(start,rows);
                result = {total:forms.length,datas:filterForms};
            }
            return {
                status: "success",
                content:result,
                message: 'success'
            }

        }
    },
    {
        url: `${rootPath}save`,
        type: 'post',
        response: config => {
            let data = config.body;
            let id = data.id;
            if(data.id == "")//新增
            {
                id = Math.floor(Math.random()*100+100).toString();
                data.id = id;
                forms.push(data);
            }
            else{//编辑
                let index = forms.findIndex(d=>d.id==data.id);
                forms.splice(index,1,data);
            }
            return {
                status: "success",
                content:data,
                message: 'success'
            }

        }
    }
]
