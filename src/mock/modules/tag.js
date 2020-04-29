import _ from 'lodash';
const rootPath = '/api/tag/'

let nodes = [
    {
        pid:"",
        id: "1",
        name: '标签库',
        type:"",
        isLeaf:false,
        data: {
            describe: "a1",
            sort: "0",
            field_900: "a2",
            field_901: "a3",
            field_902: "a4"
        }
    },
    {
        pid: "1",
        id: "2",
        name: "性质",
        type: "",
        isLeaf:false,
        data: {
            describe: "b1",
            sort: "0",
            field_900: "b2",
            field_901: "b3",
            field_902: "b4"
        }
    },
    {
        pid: "1",
        id: "3",
        type:"",
        name: "雷达功能",
        isLeaf:false,
        data: {
            describe: "c1",
            sort: "0",
            field_900: "c2",
            field_901: "c3",
            field_902: "c4"
        }
    },
    {
        pid:"2",
        id: "4",
        name: "质量",
        type: "",
        isLeaf:false,
        data: {
            describe: "d1",
            sort: "0",
            field_900: "d2",
            field_901: "d3",
            field_902: "d4"
        }
    },
    {
        pid:"2",
        id: "5",
        name: "实验",
        type: "",
        isLeaf:false,
        data: {
            describe: "e1",
            sort: "0",
            field_900: "e2",
            field_901: "e3",
            field_902: "e4"
        }
    },
    {
        pid:"2",
        id: "6",
        name: "优化",
        type: "",
        isLeaf:true,
        data: {
            describe: "f1",
            sort: "0",
            field_900: "f2",
            field_901: "f3",
            field_902: "f4"
        }
    },{
        pid:"2",
        id: "7",
        name: "设计",
        type: "",
        isLeaf:true,
        data: {
            describe: "g1",
            sort: "0",
            field_900: "g2",
            field_901: "g3",
            field_902: "g4"
        }
    },
    {
        pid:"3",
        id: "8",
        name: "跟踪",
        type: "",
        isLeaf:true,
        data: {
            describe: "h1",
            sort: "0",
            field_900: "h2",
            field_901: "h3",
            field_902: "h4"
        }
    },   {
        pid:"3",
        id: "9",
        name: "搜索",
        type: "",
        isLeaf:true,
        data: {
            describe: "i1",
            sort: "0",
            field_900: "i2",
            field_901: "i3",
            field_902: "i4"
        }
    }
]


export default [
    {
        url: `${rootPath}get`,
        type: 'post',
        response: config => {
            const { pid } = config.body;
            const filterNodes = nodes.filter(node => node.pid === pid);
            return {
                status: "success",
                content:filterNodes,
                message: 'success'
            }

        }
    },
    {
        url: `${rootPath}append`,
        type: 'post',
        response: config => {
            let node = config.body;
            let id = Math.floor(Math.random()*100).toString();
            let newNode = {};
            newNode.id = id;
            newNode.pid = node.pid;
            newNode.name = node.name;
            newNode.isLeaf = true;
            let data = {};
            data.describe = node.describe;
            data.sort = node.sort;
            data.field_900 = node.field_900;
            data.field_901 = node.field_901;
            data.field_902 = node.field_902;
            newNode.data = data;
            nodes.push(newNode);
            return {
                status: "success",
                message: 'success'
            }

        }
    },    {
        url: `${rootPath}edit`,
        type: 'post',
        response: config => {
            let node = config.body;
            nodes.map(n=>{
                if(n.id == node.id)
                {
                    n.name = node.name;
                    n.data.describe = node.describe;
                    n.data.sort = node.sort;
                    n.data.field_900 = node.field_900;
                    n.data.field_901 = node.field_901;
                    n.data.field_902 = node.field_902;
                    return n;
                }
            })

            return {
                status: 0,
                message: 'success'
            }

        }
    },
    {
        url: `${rootPath}remove`,
        type: 'post',
        response: config => {
            const {id} = config.body;
            nodes = nodes.filter(node => node.id != id);
            return {
                status: "success",
                message: 'success'
            }

        }
    }
]
