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
    }
]
