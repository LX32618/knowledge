import _ from 'lodash';
const rootPath = '/api/formMaking/'

let vieBtns=[
    {
        id:"1",
        name:"浏览按钮1",
        url:"http://www.baidu.com"
    },
    {
        id:"2",
        name:"浏览按钮2",
        url:"http://www.baidu.com"
    },
    {
        id:"3",
        name:"浏览按钮3",
        url:"http://www.baidu.com"
    },
    {
        id:"4",
        name:"浏览按钮4",
        url:"http://www.baidu.com"
    },
    {
        id:"5",
        name:"浏览按钮5",
        url:"http://www.baidu.com"
    },
    {
        id:"6",
        name:"浏览按钮6",
        url:"http://www.baidu.com"
    },
    {
        id:"7",
        name:"浏览按钮7",
        url:"http://www.baidu.com"
    },
    {
        id:"8",
        name:"浏览按钮8",
        url:"http://www.baidu.com"
    },
    {
        id:"9",
        name:"浏览按钮9",
        url:"http://www.baidu.com"
    },
    {
        id:"10",
        name:"浏览按钮10",
        url:"http://www.baidu.com"
    },
    {
        id:"11",
        name:"浏览按钮11",
        url:"http://www.baidu.com"
    },
    {
        id:"12",
        name:"浏览按钮12",
        url:"http://www.baidu.com"
    }
]

let formJson = {
    "content": {
        "knowledgeModel": {
            "formModel": [
                {
                    "knowledgeDir": "226FE543418445B2B175F7045D316AF6",
                    "formType": 0,
                    "sortTable": 0,
                    "datas": [
                        {
                            "htmlType": 6,
                            "fieldName": "jiaoxun",
                            "displayName": "教训2",
                            "fieldFixed": 0,
                            "htmlTypeName": "浏览按钮单选",
                            "isMulti": 0,
                            "fieldTypeName": "雷达浏览",
                            "width": 200,
                            "fieldTypeData": [],
                            "id": "977E6450795140FEABBB810BD9CE2D80",
                            "fieldType": "AB184DF4C32D4452AF8F63157ABDA884",
                            "fieldLength": 128,
                            "height": 30
                        },
                        {
                            "htmlType": 2,
                            "fieldName": "jingyan",
                            "displayName": "经验",
                            "fieldFixed": 0,
                            "htmlTypeName": "复选框",
                            "isMulti": 0,
                            "fieldTypeName": "是、否",
                            "width": 200,
                            "fieldTypeData": [],
                            "id": "5AD3FD224F5D4A58B6C3471B40AA689F",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 30
                        },
                        {
                            "htmlType": 1,
                            "fieldName": "pingduan",
                            "displayName": "频段",
                            "fieldFixed": 0,
                            "htmlTypeName": "单选框",
                            "isMulti": 0,
                            "fieldTypeName": "频段",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "A7742EB5FD4247C7BDE282DE1F8F0C05",
                            "fieldType": "D274D220251549A396A163BBF1F5416B",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 0,
                            "fieldName": "wenben",
                            "displayName": "文本",
                            "fieldFixed": 0,
                            "htmlTypeName": "文本框",
                            "isMulti": 0,
                            "fieldTypeName": "文本",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "9B7FB6DCDEBF46B1BC0E73CFE2ABC728",
                            "fieldType": "0",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 8,
                            "fieldName": "jingyan1",
                            "displayName": "经验1",
                            "fieldFixed": 0,
                            "htmlTypeName": "复选框组",
                            "isMulti": 0,
                            "fieldTypeName": "嵌入式",
                            "width": 200,
                            "fieldTypeData": [],
                            "id": "725E52716B574A4B85F9E417BF993C4C",
                            "fieldType": "ACEFD2F8457B43F9B3987F33366E49F7",
                            "fieldLength": 128,
                            "height": 30
                        },
                        {
                            "htmlType": 0,
                            "fieldName": "jy_zf",
                            "displayName": "经验(作废)",
                            "fieldFixed": 0,
                            "htmlTypeName": "文本框",
                            "isMulti": 0,
                            "fieldTypeName": "文本",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "150822C7CB8B4A4BBAB16F68052C8D18",
                            "fieldType": "0",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 5,
                            "fieldName": "picture",
                            "displayName": "图片",
                            "fieldFixed": 0,
                            "htmlTypeName": "图片",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "55BAD3F196894A0BA7D543DC88180D82",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 0,
                            "fieldName": "LATITUDE",
                            "displayName": "sas",
                            "fieldFixed": 0,
                            "htmlTypeName": "文本框",
                            "isMulti": 0,
                            "fieldTypeName": "文本",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "F006F6277DA2403D9BE3BE8F15758A23",
                            "fieldType": "0",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 3,
                            "fieldName": "cvcdvds",
                            "displayName": "tess",
                            "fieldFixed": 0,
                            "htmlTypeName": "下拉列表",
                            "isMulti": 0,
                            "fieldTypeName": "工艺工具",
                            "width": 200,
                            "fieldTypeData": [],
                            "id": "3E64B168719B4BBCA71223DE0713AA6C",
                            "fieldType": "0845A7044AE64A798C9EBE1763F9B8AD",
                            "fieldLength": 128,
                            "height": 30
                        },
                        {
                            "htmlType": 6,
                            "fieldName": "jiaoxun5",
                            "displayName": "教训5",
                            "fieldFixed": 0,
                            "htmlTypeName": "浏览按钮单选",
                            "isMulti": 0,
                            "fieldTypeName": "测试",
                            "width": 200,
                            "fieldTypeData": [],
                            "id": "604A236952034B108C8631132F73ED39",
                            "fieldType": "D9B51BBDC0CA48829A997B4DDF832337",
                            "fieldLength": 128,
                            "height": 30
                        },
                        {
                            "htmlType": 11,
                            "fieldName": "xxx",
                            "displayName": "xxx",
                            "fieldFixed": 0,
                            "htmlTypeName": "日期",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "585AE130B6DD47C0808CAE57F30C1EC6",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 11,
                            "fieldName": "aaaa",
                            "displayName": "aaa",
                            "fieldFixed": 0,
                            "htmlTypeName": "日期",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "48E9B4F1E01D49D5B6194FB0115AC213",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 0,
                            "fieldName": "ceshhi1",
                            "displayName": "测试1",
                            "fieldFixed": 2,
                            "htmlTypeName": "文本框",
                            "isMulti": 0,
                            "fieldTypeName": "整数",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "63CD19E59EAA4C879EBBD1F97B77EF23",
                            "fieldType": "1",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 0,
                            "fieldName": "ceshi2",
                            "displayName": "测试2",
                            "fieldFixed": 2,
                            "htmlTypeName": "文本框",
                            "isMulti": 0,
                            "fieldTypeName": "小数",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "6F9C2202031C47B89591820CA74F3688",
                            "fieldType": "2",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 1,
                            "fieldName": "test05202",
                            "displayName": "test0520",
                            "fieldFixed": 0,
                            "htmlTypeName": "单选框",
                            "isMulti": 0,
                            "fieldTypeName": "标签评价",
                            "width": 200,
                            "fieldTypeData": [],
                            "id": "E63A5F3C8AA04DE687976702A3C1F06A",
                            "fieldType": "217F1767343E44CA9E874D48BE0955EA",
                            "fieldLength": 128,
                            "height": 30
                        },
                        {
                            "htmlType": 4,
                            "fieldName": "fujianTest",
                            "displayName": "fujian",
                            "fieldFixed": 0,
                            "htmlTypeName": "附件",
                            "isMulti": 1,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "DB9DD040371D451ABBF49D3D79156911",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 6,
                            "fieldName": "jiaoxun",
                            "displayName": "教训2",
                            "fieldFixed": 0,
                            "htmlTypeName": "浏览按钮单选",
                            "isMulti": 0,
                            "fieldTypeName": "雷达浏览",
                            "width": 200,
                            "fieldTypeData": [],
                            "id": "8137D9DD6E1F4CE2B54FC4C89E41873C",
                            "fieldType": "AB184DF4C32D4452AF8F63157ABDA884",
                            "fieldLength": 128,
                            "height": 30
                        },
                        {
                            "htmlType": 6,
                            "fieldName": "jiaoxun",
                            "displayName": "教训2",
                            "fieldFixed": 0,
                            "htmlTypeName": "浏览按钮单选",
                            "isMulti": 0,
                            "fieldTypeName": "雷达浏览",
                            "width": 200,
                            "fieldTypeData": [],
                            "id": "BC8B7CC52269451F96B1C5D031D6F684",
                            "fieldType": "AB184DF4C32D4452AF8F63157ABDA884",
                            "fieldLength": 128,
                            "height": 30
                        },
                        {
                            "htmlType": 6,
                            "fieldName": "jiaoxun",
                            "displayName": "教训232323",
                            "fieldFixed": 0,
                            "htmlTypeName": "浏览按钮单选",
                            "isMulti": 0,
                            "fieldTypeName": "雷达浏览",
                            "width": 200,
                            "fieldTypeData": [],
                            "id": "B47224720D4043AB98792FA1F08FF090",
                            "fieldType": "AB184DF4C32D4452AF8F63157ABDA884",
                            "fieldLength": 128,
                            "height": 30
                        },
                        {
                            "htmlType": -1,
                            "fieldName": "aaa11",
                            "displayName": "aaa",
                            "fieldFixed": 2,
                            "htmlTypeName": "",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "579BD1DBE79F417480264FDFFC26310A",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 0,
                            "fieldName": "bbbbb",
                            "displayName": "bbbb",
                            "fieldFixed": 2,
                            "htmlTypeName": "文本框",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "3A8B79E5FBA0470F90903DE1D517068C",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": -1,
                            "fieldName": "test0615",
                            "displayName": "test0615",
                            "fieldFixed": 0,
                            "htmlTypeName": "",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "13A0DAA5229A45EB860BD359CAA7494B",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 6,
                            "fieldName": "test20200622",
                            "displayName": "test20200622",
                            "fieldFixed": 0,
                            "htmlTypeName": "浏览按钮单选",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "65D447E0D8ED402A9F2D1280F91300F5",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": -1,
                            "fieldName": "aaa",
                            "displayName": "aaa",
                            "fieldFixed": 0,
                            "htmlTypeName": "",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "47E50E5BCFAD49A195FEA5D95A7DD727",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 9,
                            "fieldName": "ssss",
                            "displayName": "xxx",
                            "fieldFixed": 0,
                            "htmlTypeName": "多行文本",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "BAA87775D1E54AF5A46667B42AC0BEDA",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 4,
                            "fieldName": "fujian",
                            "displayName": "fujian",
                            "fieldFixed": 0,
                            "htmlTypeName": "附件",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "6EAE5091EEEB4BB7A8AFBC6AC6240292",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        }
                    ],
                    "formName": "经验教训",
                    "id": "10952BF8036A4CE78B0F5C5C33555B22",
                    "subForm": [
                        {
                            "knowledgeDir": "D4BFB5003C6F428EB0D01B45EF269435",
                            "formType": 0,
                            "sortTable": -200,
                            "datas": [
                                {
                                    "htmlType": 7,
                                    "fieldName": "llan",
                                    "displayName": "浏览按钮",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "浏览按钮多选",
                                    "isMulti": 0,
                                    "fieldTypeName": "工艺规范",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "B0F40159085147F6B89A910D94448D5E",
                                    "fieldType": "44785D66F82944CEBB12E5F765D88CB6",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 8,
                                    "fieldName": "fxk",
                                    "displayName": "复选框",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "复选框组",
                                    "isMulti": 0,
                                    "fieldTypeName": "年代",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "A7175D96F890486F9D8C8E5E0BDB801F",
                                    "fieldType": "11F16028BFA2473CAE21BF0BA96F2A90",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 1,
                                    "fieldName": "dxzdsj",
                                    "displayName": "单选字典数据",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "单选框",
                                    "isMulti": 0,
                                    "fieldTypeName": "雷达基础知识分类",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "965C1B524A184858B2141B7638A6F875",
                                    "fieldType": "5CC5A83CDF5A4C009CD14B6960B66C10",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 0,
                                    "fieldName": "xwb",
                                    "displayName": "小文本",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "文本框",
                                    "isMulti": 0,
                                    "fieldTypeName": "文本",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "F21AAF3470DA4EDD9A6351941876542B",
                                    "fieldType": "0",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 2,
                                    "fieldName": "LATITUDE",
                                    "displayName": "sagsa",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "复选框",
                                    "isMulti": 0,
                                    "fieldTypeName": "是、否",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "4CE2676045524932A931A44FA902C688",
                                    "fieldType": "",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": -1,
                                    "fieldName": "LATITUDE2",
                                    "displayName": "1sad",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "",
                                    "isMulti": 0,
                                    "fieldTypeName": "",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "EBB708E4CE8146F1B4C19CC153280024",
                                    "fieldType": "",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 1,
                                    "fieldName": "LATITUDE3",
                                    "displayName": "sfsadsfdsag",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "单选框",
                                    "isMulti": 0,
                                    "fieldTypeName": "",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "D813EEEFCEF848DEA40B23807169912F",
                                    "fieldType": "",
                                    "fieldLength": 128,
                                    "height": 95
                                }
                            ],
                            "formName": "经验教训_子表二",
                            "id": "309B62EC98FF47ABBC026BC58189D111"
                        },
                        {
                            "knowledgeDir": "--请选择--",
                            "formType": 0,
                            "sortTable": -100,
                            "datas": [
                                {
                                    "htmlType": 0,
                                    "fieldName": "jhgfds",
                                    "displayName": "fff",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "文本框",
                                    "isMulti": 0,
                                    "fieldTypeName": "文本",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "BDEDD70D04894B92B7014AB584E97058",
                                    "fieldType": "0",
                                    "fieldLength": 128,
                                    "height": 95
                                }
                            ],
                            "formName": "gsagsdadgas",
                            "id": "421D24378C024B16A13765320F31E6D0"
                        },
                        {
                            "knowledgeDir": "8874D41FBF44437E8DBC900DAE3A5F24",
                            "formType": 0,
                            "sortTable": 0,
                            "datas": [
                                {
                                    "htmlType": 0,
                                    "fieldName": "wenBen0520",
                                    "displayName": "文本框",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "文本框",
                                    "isMulti": 0,
                                    "fieldTypeName": "文本",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "B11E85CAC5004617A7DD15D7A13856E7",
                                    "fieldType": "0",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 1,
                                    "fieldName": "dxk0520",
                                    "displayName": "单选框",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "单选框",
                                    "isMulti": 0,
                                    "fieldTypeName": "标签评价",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "EA8F798D1DB04FBC998299B5941C279B",
                                    "fieldType": "217F1767343E44CA9E874D48BE0955EA",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 2,
                                    "fieldName": "fxk0520",
                                    "displayName": "复选框",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "复选框",
                                    "isMulti": 0,
                                    "fieldTypeName": "是、否",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "7D704B580664491E9F687F720697D40A",
                                    "fieldType": "",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 3,
                                    "fieldName": "xllb0520",
                                    "displayName": "下拉列表",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "下拉列表",
                                    "isMulti": 0,
                                    "fieldTypeName": "标签评价",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "FAE2006294784CFAB5F27AB5765672C8",
                                    "fieldType": "217F1767343E44CA9E874D48BE0955EA",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 4,
                                    "fieldName": "fj0520",
                                    "displayName": "附件",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "附件",
                                    "isMulti": 1,
                                    "fieldTypeName": "",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "24452922D1524F5F8A6569EEA5EE994B",
                                    "fieldType": "",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 5,
                                    "fieldName": "tp0520",
                                    "displayName": "图片",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "图片",
                                    "isMulti": 1,
                                    "fieldTypeName": "",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "A1585F43F7E1435CA9E8032B28B40409",
                                    "fieldType": "",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 6,
                                    "fieldName": "llandx0520",
                                    "displayName": "浏览按钮单选",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "浏览按钮单选",
                                    "isMulti": 0,
                                    "fieldTypeName": "测试",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "DD4A5777433C4627805302254852D170",
                                    "fieldType": "45448088C4344E189692019413D5A2FA",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 7,
                                    "fieldName": "llandx05201",
                                    "displayName": "浏览按钮多选",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "浏览按钮多选",
                                    "isMulti": 0,
                                    "fieldTypeName": "标准规范知识条目",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "9981D76E29D8450C86F266D0CC7ED860",
                                    "fieldType": "298F6A30DEA245F68209F329A2533EC7",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 8,
                                    "fieldName": "fxkz0520",
                                    "displayName": "复选框组",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "复选框组",
                                    "isMulti": 0,
                                    "fieldTypeName": "标签评价",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "99DB0E866E194511A7D89AEF25F199A2",
                                    "fieldType": "217F1767343E44CA9E874D48BE0955EA",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 9,
                                    "fieldName": "dhwb0520",
                                    "displayName": "多行文本",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "多行文本",
                                    "isMulti": 0,
                                    "fieldTypeName": "",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "FEF298AD413B4E88BC03624D9FA21824",
                                    "fieldType": "",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 11,
                                    "fieldName": "rq0520",
                                    "displayName": "日期",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "日期",
                                    "isMulti": 0,
                                    "fieldTypeName": "",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "03B8099A725D45E9ADB8FE0DE3234E1D",
                                    "fieldType": "",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 13,
                                    "fieldName": "clj0520",
                                    "displayName": "超链接",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "超链接",
                                    "isMulti": 0,
                                    "fieldTypeName": "",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "052DD65024394993A199A2FBCD755569",
                                    "fieldType": "",
                                    "fieldLength": 128,
                                    "height": 95
                                }
                            ],
                            "formName": "test20200520",
                            "id": "134F51C0AB8B46ECBB98E6446B2E25E1"
                        },
                        {
                            "knowledgeDir": "8874D41FBF44437E8DBC900DAE3A5F24",
                            "formType": 0,
                            "sortTable": 0,
                            "datas": [
                                {
                                    "htmlType": 0,
                                    "fieldName": "test4321",
                                    "displayName": "testtt",
                                    "fieldFixed": 2,
                                    "htmlTypeName": "文本框",
                                    "isMulti": 0,
                                    "fieldTypeName": "整数",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "199427EF01E849E081384CD06CB9B98B",
                                    "fieldType": "1",
                                    "fieldLength": 128,
                                    "height": 95
                                }
                            ],
                            "formName": "test9876",
                            "id": "18467D7C9E0E40EA89365063AFE655F7"
                        },
                        {
                            "knowledgeDir": "--请选择--",
                            "formType": 0,
                            "sortTable": 0,
                            "datas": [
                                {
                                    "htmlType": 0,
                                    "fieldName": "uytr",
                                    "displayName": "ytrr",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "文本框",
                                    "isMulti": 0,
                                    "fieldTypeName": "文本",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "AE60A3E274B24CA7A39F6B1E15E981BB",
                                    "fieldType": "0",
                                    "fieldLength": 128,
                                    "height": 95
                                }
                            ],
                            "formName": "aaa",
                            "id": "A08A7F49446546AB99A56D36CEC28973"
                        },
                        {
                            "knowledgeDir": "D4BFB5003C6F428EB0D01B45EF269435",
                            "formType": 0,
                            "sortTable": 0,
                            "datas": [
                                {
                                    "htmlType": 7,
                                    "fieldName": "jingy_s",
                                    "displayName": "经验",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "浏览按钮多选",
                                    "isMulti": 0,
                                    "fieldTypeName": "工艺规范",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "DCA512A5B5B44B3D87526D5B06CC3881",
                                    "fieldType": "44785D66F82944CEBB12E5F765D88CB6",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 2,
                                    "fieldName": "jingyan_s",
                                    "displayName": "经验",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "复选框",
                                    "isMulti": 0,
                                    "fieldTypeName": "是、否",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "3791930ACBB540E3A9F95B5F0AF70A40",
                                    "fieldType": "",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 1,
                                    "fieldName": "pingduan_s",
                                    "displayName": "频段",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "单选框",
                                    "isMulti": 0,
                                    "fieldTypeName": "频段",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "A9C58341599A49A7AD60469EBE6BC96F",
                                    "fieldType": "D274D220251549A396A163BBF1F5416B",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 0,
                                    "fieldName": "wenben_s",
                                    "displayName": "文本",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "文本框",
                                    "isMulti": 0,
                                    "fieldTypeName": "文本",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "43F6E170072E4A6BAFC2FEE7C58ADECF",
                                    "fieldType": "0",
                                    "fieldLength": 128,
                                    "height": 95
                                },
                                {
                                    "htmlType": 8,
                                    "fieldName": "jingyan1",
                                    "displayName": "经验1",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "复选框组",
                                    "isMulti": 0,
                                    "fieldTypeName": "文件有效性",
                                    "width": 200,
                                    "fieldTypeData": [],
                                    "id": "291777BC87774F15A81A31AE2F0FA20B",
                                    "fieldType": "51E284E35F1048F395977BCEAC1877A6",
                                    "fieldLength": 128,
                                    "height": 30
                                }
                            ],
                            "formName": "经验教训_子表3",
                            "id": "AB413A9FBD3148A18081DEB071E85C3F"
                        },
                        {
                            "knowledgeDir": "8874D41FBF44437E8DBC900DAE3A5F24",
                            "formType": 0,
                            "sortTable": 1,
                            "datas": [
                                {
                                    "htmlType": 0,
                                    "fieldName": "uyt",
                                    "displayName": "uyt",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "文本框",
                                    "isMulti": 0,
                                    "fieldTypeName": "文本",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "F3F63B7D728847EC8CE97A41E309257A",
                                    "fieldType": "0",
                                    "fieldLength": 128,
                                    "height": 95
                                }
                            ],
                            "formName": "20200509sub1",
                            "id": "98CE15C1B2444049B778E7C9F3F046E7"
                        }
                    ]
                },
                {
                    "knowledgeDir": "",
                    "formType": 0,
                    "sortTable": 0,
                    "datas": [
                        {
                            "htmlType": 0,
                            "fieldName": "wwescgr",
                            "displayName": "tsd",
                            "fieldFixed": 0,
                            "htmlTypeName": "文本框",
                            "isMulti": 0,
                            "fieldTypeName": "文本",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "94AEA7EE4355427FA73AD2E65789EA6D",
                            "fieldType": "0",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 0,
                            "fieldName": "bbaaa",
                            "displayName": "bb",
                            "fieldFixed": 0,
                            "htmlTypeName": "文本框",
                            "isMulti": 0,
                            "fieldTypeName": "文本",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "515B4A94CB054E61B463BAC7786B3991",
                            "fieldType": "0",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 3,
                            "fieldName": "cc",
                            "displayName": "cc",
                            "fieldFixed": 0,
                            "htmlTypeName": "下拉列表",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "C5A5DB5895B54347A48552BE6B87F2B4",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 9,
                            "fieldName": "dd",
                            "displayName": "dd",
                            "fieldFixed": 0,
                            "htmlTypeName": "多行文本",
                            "isMulti": 0,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "D7802A87EE6A4C3EA1CFEFD9EF09BA60",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 8,
                            "fieldName": "ee",
                            "displayName": "ee",
                            "fieldFixed": 0,
                            "htmlTypeName": "复选框组",
                            "isMulti": 0,
                            "fieldTypeName": "标签评价",
                            "width": 200,
                            "fieldTypeData": [],
                            "id": "7553F6C283CD46848D1FB4E04F5CE866",
                            "fieldType": "217F1767343E44CA9E874D48BE0955EA",
                            "fieldLength": 128,
                            "height": 30
                        },
                        {
                            "htmlType": 0,
                            "fieldName": "ff",
                            "displayName": "ff",
                            "fieldFixed": 0,
                            "htmlTypeName": "文本框",
                            "isMulti": 0,
                            "fieldTypeName": "文本",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "AE723943FDC3404994F4B8F6F89F7FA6",
                            "fieldType": "0",
                            "fieldLength": 128,
                            "height": 95
                        },
                        {
                            "htmlType": 4,
                            "fieldName": "gg",
                            "displayName": "gg",
                            "fieldFixed": 0,
                            "htmlTypeName": "附件",
                            "isMulti": 1,
                            "fieldTypeName": "",
                            "width": 95,
                            "fieldTypeData": [],
                            "id": "6366DE371B8D4CAA86C036FFE4110BCB",
                            "fieldType": "",
                            "fieldLength": 128,
                            "height": 95
                        }
                    ],
                    "formName": "bbbb",
                    "id": "1EF7E8A6438F40B5A9A30D00DA1F79FC",
                    "subForm": [
                        {
                            "knowledgeDir": "--请选择--",
                            "formType": 0,
                            "sortTable": 0,
                            "datas": [
                                {
                                    "htmlType": 0,
                                    "fieldName": "test",
                                    "displayName": "test",
                                    "fieldFixed": 0,
                                    "htmlTypeName": "文本框",
                                    "isMulti": 0,
                                    "fieldTypeName": "文本",
                                    "width": 95,
                                    "fieldTypeData": [],
                                    "id": "54CB5BE11E5240418631E8C4D45059BB",
                                    "fieldType": "0",
                                    "fieldLength": 128,
                                    "height": 95
                                }
                            ],
                            "formName": "eee",
                            "id": "78B9FF6B1443458E8311F55F913EFB51"
                        },
                        {
                            "knowledgeDir": "--请选择--",
                            "formType": 0,
                            "sortTable": 0,
                            "datas": [],
                            "formName": "fff",
                            "id": "B75BEEF228774BF3AFF05EC392A350C4"
                        },
                        {
                            "knowledgeDir": "",
                            "formType": 0,
                            "sortTable": 0,
                            "datas": [],
                            "formName": "ggg",
                            "id": "D6B5E429E010409A88BBACF2639A4C1E"
                        }
                    ]
                }
            ]
        }
    },
    "message": "",
    "status": "success"
}

export default [
    {
        url: `${rootPath}getviewBtn`,
        type: 'post',
        response: config => {
            const {page,rows,condition} = config.body;
            let start = rows*(page-1);
            let temp = _.cloneDeep(vieBtns);
            let result = {};
            let refName = condition.refName;
            if(refName != "")
            {
                const filterDatas = temp.filter(t=>t.name.includes(refName));
                result = {total:filterDatas.length,datas:filterDatas};
            }
            else
            {
                const filterDatas = temp.splice(start,rows);
                result = {total:vieBtns.length,datas:filterDatas};
            }
            return {
                status: "success",
                content:result,
                message: 'success'
            }

        }
    },
    {
        url: `${rootPath}getModel`,
        type: 'post',
        response: config => {
            return {
                status: "success",
                content:formJson,
                message: 'success'
            }

        }
    }
]
