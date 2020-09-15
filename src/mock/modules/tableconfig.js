import _ from 'lodash';
const rootPath = '/api/tableConfig/'

let configData={
    repId:"",
	formId:"formId",
	base:[{
            id:"1",
            fieldId:"1",
            showName:"showName1",
            isShow:false,
            isSearch:false,
            isOrder:false,
            colWidth:undefined,
            pOrder:0
        },  {
            id:"2",
            fieldId:"2",
            showName:"showName2",
            isShow:false,
            isSearch:false,
            isOrder:false,
            colWidth:undefined,
            pOrder:1
        },  {
            id:"3",
            fieldId:"3",
            showName:"showName3",
            isShow:false,
            isSearch:false,
            isOrder:false,
            colWidth:undefined,
            pOrder:3
        },  {
            id:"4",
            fieldId:"4",
            showName:"showName4",
            isShow:false,
            isSearch:false,
            isOrder:false,
            colWidth:undefined,
            pOrder:4
        }
    ],
	formData:[{
        formId:"1",
        formName:"经验教训",
        formData:[{
            id:"1",
            fieldId:"1",
            showName:"showName1",
            isShow:false,
            isSearch:false,
            isOrder:false,
            colWidth:undefined,
            pOrder:0
        },  {
            id:"2",
            fieldId:"2",
            showName:"showName2",
            isShow:false,
            isSearch:false,
            isOrder:false,
            colWidth:undefined,
            pOrder:1
        },  {
            id:"3",
            fieldId:"3",
            showName:"showName3",
            isShow:false,
            isSearch:false,
            isOrder:false,
            colWidth:undefined,
            pOrder:3
        },  {
            id:"4",
            fieldId:"4",
            showName:"showName4",
            isShow:false,
            isSearch:false,
            isOrder:false,
            colWidth:undefined,
            pOrder:4
        }]
    },
        {
            formId:"2",
            formName:"bbbbb",
            formData:[{
                id:"1",
                fieldId:"1",
                showName:"showName1",
                isShow:false,
                isSearch:false,
                isOrder:false,
                colWidth:undefined,
                pOrder:0
            },  {
                id:"2",
                fieldId:"2",
                showName:"showName2",
                isShow:false,
                isSearch:false,
                isOrder:false,
                colWidth:undefined,
                pOrder:1
            }]
        }]
}

export default [
    {
        url: `${rootPath}getConfig`,
        type: 'post',
        response: config => {
            return {
                status: "success",
                content:configData,
                message: 'success'
            }

        }
    }
]
