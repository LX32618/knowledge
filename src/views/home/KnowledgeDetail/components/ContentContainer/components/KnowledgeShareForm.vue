<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="共享对象">
        <el-select v-model="shareType">
          <el-option
            v-for="(type, index) of shareTypes"
            :key="index"
            :label="type"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="shareType === 0" label="选择人员">
        <el-dialog
          title="选择人员"
          :visible.sync="peopleTransferVisible"
          append-to-body
        >
          <PeopleTransfer
            :iniList="peopleValue"
            @cancel="peopleTransferVisible = false"
            @certain="handlePeopleSelect"
          />
        </el-dialog>
        <el-button
          type="primary"
          icon="el-icon-search"
          circle
          @click="peopleTransferVisible = true"
        ></el-button>
        <el-tag
          v-for="(people, index) of peopleValue"
          :key="people.id"
          type="danger"
          closable
          @close="handlePeopleRemove(index)"
          >{{ people.realName }}</el-tag
        >
      </el-form-item>
      <el-form-item v-show="shareType === 1" label="选择组织单元">
        <el-dialog
          title="选择组织单元"
          :visible.sync="departmentTransferVisible"
          append-to-body
        >
          <DeptTransfer
            :iniList="departmentValue"
            @cancel="departmentTransferVisible = false"
            @certain="handleDepartmentSelect"
          />
        </el-dialog>
        <el-button
          type="primary"
          icon="el-icon-search"
          circle
          @click="departmentTransferVisible = true"
        ></el-button>
        <el-tag
          v-for="(department, index) of departmentValue"
          :key="department.id"
          type="danger"
          closable
          @close="handleDepartmentRemove(index)"
          >{{ department.departName }}</el-tag
        >
      </el-form-item>
      <el-form-item
        v-show="shareType === 2"
        v-loading="groupLoading"
        label="选择专业组"
      >
        <el-select v-model="groupValue">
          <el-option
            v-for="group of groups"
            :key="group.id"
            :value="group.id"
            :label="group.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="fa fa-save"
          @click="shareKnowledge"
          :loading="shareLoading"
        >
          保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchGroupList } from '@/api/group'
import PeopleTransfer from '@/components/Transfer/PeopleTransfer'
import DeptTransfer from '@/components/Transfer/DeptTransfer'
import { saveShare } from '@/api/sysRole'

export default {
  name: 'KnowledgeShareForm',
  components: {
    PeopleTransfer,
    DeptTransfer
  },
  inject: ['contentContainer'],
  data() {
    return {
      shareTypes: ['指定人员', '指定部门', '指定专业组', '全部人员'],
      shareType: 0,
      peopleTransferVisible: false,
      peopleValue: [],
      departmentTransferVisible: false,
      departmentValue: [],
      groupLoading: false,
      groups: [],
      groupValue: '',
      shareLoading: false
    }
  },
  watch: {
    shareType(val) {
      this.peopleValue = []
      this.departmentValue = []
      this.groupValue = ''
      if (val === 2) {
        this.getGroups()
      }
    }
  },
  methods: {
    handlePeopleSelect(val) {
      this.peopleValue = val
      this.peopleTransferVisible = false
    },
    handlePeopleRemove(index) {
      this.peopleValue.splice(index, 1)
    },
    handleDepartmentSelect(val) {
      this.departmentValue = val
      this.departmentTransferVisible = false
    },
    handleDepartmentRemove(index) {
      this.departmentValue.splice(index, 1)
    },
    async getGroups() {
      this.groupLoading = true
      const {
        content: { datas }
      } = await fetchGroupList({
        page: 1,
        rows: 9999,
        condition: { name: '' }
      })
      this.groups = datas
      this.groupLoading = false
    },
    async shareKnowledge() {
      const { id, baseId } = this.contentContainer._props.baseData
      const tmp = [
        this.peopleValue.map(item => item.id).join(','),
        this.departmentValue.map(item => item.id).join(','),
        this.groupValue
      ]
      this.shareLoading = true
      try {
        await saveShare({
          docId: id,
          knowbaseId: baseId,
          docIds: '',
          knowBaseIds: '',
          objId: tmp[this.shareType],
          objType: this.shareType + 1,
          hrmId: tmp[0],
          orgId: tmp[1],
          groupId: tmp[2],
          days: 1,
          desc: '分享',
          status: '99'
        })
        this.$success('分享成功')
      } catch {
      } finally {
        this.shareLoading = false
      }
    }
  }
}
</script>

<style scoped></style>
