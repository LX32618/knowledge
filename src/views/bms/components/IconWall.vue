<template>
  <div>
    <el-row
      type="flex"
      v-for="(i, index) in Math.ceil(icons.length / 6)"
      :key="index"
    >
      <el-col
        :span="4"
        v-for="(item, index) in spliceItems(i)"
        @click.native="selectIcon(item)"
        :key="index"
      >
        <i :class="selectItems(item)"></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "IconWall",
  data () {
    return {
      iconSelected: ""
    }
  },
  computed: {
    ...mapGetters([
      'icons'
    ]),
    spliceItems () {
      return function (n) {
        return this.icons.slice((n - 1) * 6, n * 6);
      }
    },
    selectItems () {
      return function (clz) {
        if (clz == this.iconSelected) {
          return clz + " selected";
        }
        else {
          return clz;
        }
      }
    }
  },
  methods: {
    selectIcon (val) {
      this.iconSelected = val;
      this.$emit("selectIconChange", val);
    }
  }
}
</script>

<style scoped>
.el-col {
  margin: 5px 0px 5px 0px;
}
.selected {
  box-shadow: 0px 0px 2px 2px rgba(64, 158, 255, 0.5);
}
i {
  font-size: 30px;
  margin-left: 8px;
  cursor: pointer;
}
</style>