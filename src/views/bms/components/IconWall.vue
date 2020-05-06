<template>
    <div>
        <el-row type="flex" v-for="i in Math.ceil(items.length/6)">
            <el-col :span="4"  v-for="item in spliceItems(i)" @click.native="selectIcon(item)">
                <i :class="selectItems(item)"></i>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "IconWall",
        data(){
            return{
                iconSelected:"",
                items:[
                    "fa fa-microchip",
                    "fa fa-tv",
                    "fa fa-anchor",
                    "fa fa-bar-chart-o",
                    "fa fa-fighter-jet",
                    "fa fa-feed",
                    "fa fa-plane",
                    "fa fa-rocket",
                    "fa fa-random",
                    "fa fa-gears",
                    "fa fa-wifi",
                    "fa fa-magnet"
                ]
            }
        },
        computed:{
            spliceItems(){
                return function(n) {
                    return this.items.slice((n-1)*6,n*6);
                }
            },
            selectItems(){
                return function(clz) {
                   if(clz==this.iconSelected)
                   {
                       return clz + " selected";
                   }
                   else
                   {
                       return clz;
                   }
                }
            }
        },
        methods:{
            selectIcon(val){
                this.iconSelected = val;
                this.$emit("selectIconChange",val);
            }
        }
    }
</script>

<style scoped>
    .el-col{
        margin: 5px 0px 5px 0px
    }
    .selected{
        box-shadow:0px 0px 2px 2px rgba(64,158,255,.5)
    }
    i{
        font-size:30px;
        margin-left: 8px;
        cursor: pointer;
    }
</style>