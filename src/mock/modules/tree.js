const rootPath = '/api/tree/'

const nodes = [
    {
        pid:"",
        id: "1",
        name: '知识目录',
        type:"root",
        isLeaf:false
    },
    {
        pid: "1",
        id: "2",
        name: "机械产品知识库",
        type: "repository",
        isLeaf:false
    },
    {
        pid: "2",
        id: "3",
        type:"catalog",
        name: "设计知识",
        isLeaf:true
    },
    {
        pid:"2",
        id: "4",
        name: "产品分类",
        type: "sort",
        isLeaf:false
    },
    {
        pid:"4",
        id: "5",
        type:"catalog",
        name: "目录一",
        isLeaf:true
    },
    {
        pid:'4',
        id: "6",
        type:"catalog",
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
    }
]
