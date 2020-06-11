import _ from 'lodash';
const rootPath = '/api/viewbtn/'

//region 数据
let datas =
     [{
    "refTable": "",
    "keyField": "id",
    "createDate": "2017-10-20 14:33:04",
    "isMulti": 1,
    "refName": "雷达技术体质基础知识条目",
    "viewField": "name",
    "filter": "",
    "importField": "code",
    "viewUrl": "",
    "id": "11C84EAAEDEA43358F1C618D27F938B1",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select *  from knowledge_base where classification = '3C3EE505FA8E472DBA7FD44DE21DF6FB'   and isdel = 0",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "id",
    "createDate": "2019-03-25 16:02:30",
    "isMulti": 1,
    "refName": "SYS_CONFIG",
    "viewField": "display",
    "filter": "",
    "importField": "",
    "viewUrl": "",
    "id": "2630F3E384CD489DAFE56F632AAD22D6",
    "refUrl": "",
    "createrId": "3E7E1B6A6FEA419FBB952531866F8FE4",
    "refSql": "select * from SYS_CONFIG",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "code",
    "createDate": "2018-07-22 11:23:55",
    "isMulti": 1,
    "refName": "标准规范知识条目",
    "viewField": "cn",
    "filter": "",
    "importField": "code",
    "viewUrl": "system/knowledgeDataController/dataView?baseid=${id}&edittype=2",
    "id": "298F6A30DEA245F68209F329A2533EC7",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select id,name,code, code ||  ' ' || name cn from knowledge_base where isdel=0 and audit_status=1 and baseid='02CADD1E4DF34FB58D72B364733D827B'",
    "isSys": 1,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "id",
    "createDate": "2017-10-10 11:39:07",
    "isMulti": 1,
    "refName": "工艺规范",
    "viewField": "name",
    "filter": "",
    "importField": "code",
    "viewUrl": "system/knowledgeDataController/dataView?baseid=${id}&edittype=2",
    "id": "44785D66F82944CEBB12E5F765D88CB6",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select * from(select b.id,b.name,b.code, b.code || ' ' || b.name as cn from knowledge_base b,com_normal p where b.id = p.baseid and b.isdel = 0 and audit_status = 1)",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "ID",
    "createDate": "2017-10-20 14:44:17",
    "isMulti": 1,
    "refName": "雷达频段基础知识条目",
    "viewField": "NAME",
    "filter": "",
    "importField": "code",
    "viewUrl": "",
    "id": "729F2128B01041299A5F09A7EE794CD3",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select * from(select k.*  from knowledge_base k, band b where k.id = b.baseid   and k.classification = '8372697251014BFD9DD603ADD3D96485'   and k.isdel = 0   and b.type = '915D7BDDA4B541F696623596F1BCA09A')",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
},{
    "refTable": "",
    "keyField": "id",
    "createDate": "2017-10-20 14:33:04",
    "isMulti": 1,
    "refName": "雷达技术体质基础知识条目",
    "viewField": "name",
    "filter": "",
    "importField": "code",
    "viewUrl": "",
    "id": "11C84EAAEDEA43358F1C618D27F938B1",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select *  from knowledge_base where classification = '3C3EE505FA8E472DBA7FD44DE21DF6FB'   and isdel = 0",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "id",
    "createDate": "2019-03-25 16:02:30",
    "isMulti": 1,
    "refName": "SYS_CONFIG",
    "viewField": "display",
    "filter": "",
    "importField": "",
    "viewUrl": "",
    "id": "2630F3E384CD489DAFE56F632AAD22D6",
    "refUrl": "",
    "createrId": "3E7E1B6A6FEA419FBB952531866F8FE4",
    "refSql": "select * from SYS_CONFIG",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "code",
    "createDate": "2018-07-22 11:23:55",
    "isMulti": 1,
    "refName": "标准规范知识条目",
    "viewField": "cn",
    "filter": "",
    "importField": "code",
    "viewUrl": "system/knowledgeDataController/dataView?baseid=${id}&edittype=2",
    "id": "298F6A30DEA245F68209F329A2533EC7",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select id,name,code, code ||  ' ' || name cn from knowledge_base where isdel=0 and audit_status=1 and baseid='02CADD1E4DF34FB58D72B364733D827B'",
    "isSys": 1,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "id",
    "createDate": "2017-10-10 11:39:07",
    "isMulti": 1,
    "refName": "工艺规范",
    "viewField": "name",
    "filter": "",
    "importField": "code",
    "viewUrl": "system/knowledgeDataController/dataView?baseid=${id}&edittype=2",
    "id": "44785D66F82944CEBB12E5F765D88CB6",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select * from(select b.id,b.name,b.code, b.code || ' ' || b.name as cn from knowledge_base b,com_normal p where b.id = p.baseid and b.isdel = 0 and audit_status = 1)",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "ID",
    "createDate": "2017-10-20 14:44:17",
    "isMulti": 1,
    "refName": "雷达频段基础知识条目",
    "viewField": "NAME",
    "filter": "",
    "importField": "code",
    "viewUrl": "",
    "id": "729F2128B01041299A5F09A7EE794CD3",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select * from(select k.*  from knowledge_base k, band b where k.id = b.baseid   and k.classification = '8372697251014BFD9DD603ADD3D96485'   and k.isdel = 0   and b.type = '915D7BDDA4B541F696623596F1BCA09A')",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
},{
    "refTable": "",
    "keyField": "id",
    "createDate": "2017-10-20 14:33:04",
    "isMulti": 1,
    "refName": "雷达技术体质基础知识条目",
    "viewField": "name",
    "filter": "",
    "importField": "code",
    "viewUrl": "",
    "id": "11C84EAAEDEA43358F1C618D27F938B1",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select *  from knowledge_base where classification = '3C3EE505FA8E472DBA7FD44DE21DF6FB'   and isdel = 0",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "id",
    "createDate": "2019-03-25 16:02:30",
    "isMulti": 1,
    "refName": "SYS_CONFIG",
    "viewField": "display",
    "filter": "",
    "importField": "",
    "viewUrl": "",
    "id": "2630F3E384CD489DAFE56F632AAD22D6",
    "refUrl": "",
    "createrId": "3E7E1B6A6FEA419FBB952531866F8FE4",
    "refSql": "select * from SYS_CONFIG",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "code",
    "createDate": "2018-07-22 11:23:55",
    "isMulti": 1,
    "refName": "标准规范知识条目",
    "viewField": "cn",
    "filter": "",
    "importField": "code",
    "viewUrl": "system/knowledgeDataController/dataView?baseid=${id}&edittype=2",
    "id": "298F6A30DEA245F68209F329A2533EC7",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select id,name,code, code ||  ' ' || name cn from knowledge_base where isdel=0 and audit_status=1 and baseid='02CADD1E4DF34FB58D72B364733D827B'",
    "isSys": 1,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "id",
    "createDate": "2017-10-10 11:39:07",
    "isMulti": 1,
    "refName": "工艺规范",
    "viewField": "name",
    "filter": "",
    "importField": "code",
    "viewUrl": "system/knowledgeDataController/dataView?baseid=${id}&edittype=2",
    "id": "44785D66F82944CEBB12E5F765D88CB6",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select * from(select b.id,b.name,b.code, b.code || ' ' || b.name as cn from knowledge_base b,com_normal p where b.id = p.baseid and b.isdel = 0 and audit_status = 1)",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
}, {
    "refTable": "",
    "keyField": "ID",
    "createDate": "2017-10-20 14:44:17",
    "isMulti": 1,
    "refName": "雷达频段基础知识条目",
    "viewField": "NAME",
    "filter": "",
    "importField": "code",
    "viewUrl": "",
    "id": "729F2128B01041299A5F09A7EE794CD3",
    "refUrl": "",
    "createrId": "EFB3BCDFBC0B4B5B91991B49B96D26CF",
    "refSql": "select * from(select k.*  from knowledge_base k, band b where k.id = b.baseid   and k.classification = '8372697251014BFD9DD603ADD3D96485'   and k.isdel = 0   and b.type = '915D7BDDA4B541F696623596F1BCA09A')",
    "isSys": 0,
    "categoryId": "",
    "refType": 1
}]
//endregion

export default [
    {
        url: `${rootPath}get`,
        type: 'post',
        response: config => {
            const {page,rows,condition} = config.body;
            let start = rows*(page-1);
            let temp = _.cloneDeep(datas);
            let result = {};
            let formName = condition.formName;
            if(formName != "")
            {
                const filterDatas = temp.filter(t=>t.refName.includes(formName));
                result = {total:filterDatas.length,datas:filterDatas};
            }
            else
            {
                const filterDatas = temp.splice(start,rows);
                result = {total:datas.length,datas:filterDatas};
            }
            return {
                status: "success",
                content:result,
                message: 'success'
            }

        }
    }
]


