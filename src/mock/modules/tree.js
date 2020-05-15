const rootPath = '/api/tree/'
//目录类型 (0.知识库，1.分类，2.目录)
let nodes = [
    {
        pid:"",
        id: "1",
        name: '知识目录',
        type:"",
        isLeaf:false
    },
    {
        pid: "1",
        id: "2",
        name: "机械产品知识库",
        type: "0",
        isLeaf:false
    },
    {
        pid: "2",
        id: "3",
        type:"2",
        name: "设计知识",
        isLeaf:true
    },
    {
        pid:"2",
        id: "4",
        name: "产品分类",
        type: "1",
        isLeaf:false
    },
    {
        pid:"4",
        id: "5",
        type:"2",
        name: "目录一",
        isLeaf:true
    },
    {
        pid:'4',
        id: "6",
        type:"2",
        name: "目录二",
        isLeaf:true
    }
]

export default [
    {
        url: `${rootPath}getnodes`,
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
            newNode.type = node.rype
            newNode.isLeaf = true;
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
                    n.name = node.categoryName;
                    return n;
                }
            })

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
            nodes = nodes.filter(node => node.id != id);
            return {
                status: "success",
                message: 'success'
            }

        }
    }
]
