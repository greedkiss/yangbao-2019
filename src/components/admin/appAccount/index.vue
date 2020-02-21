<template>
    <div>
        <el-table
            v-loading="load"
            ref="table"
            tooltip-effect="light"
            class="admin-table"
            :data="tableData">
            <el-table-column
                show-overflow-tooltip
                v-for="(th, i) in headers"
                :key="i"
                align='center'
                :prop="th.prop"
                :label="th.label"
                :width="th.width || 200">
            </el-table-column>
            <el-table-column
                class="action"
                fixed="right"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <span @click="editUser(scope.row)">编辑</span>
                        <span @click="agreeUser(scope.row)">同意</span>
                        <span @click="disAgreeUser(scope.$index)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>    
</template>
<script>
export default {
    data() {
        return{
            headers: [
                {label:'单位(个人)名称',prop:'unitName'},
                {label:'单位地址',prop:'unitAddress'},
                {label:'详细地址',prop:'detailAddress'},
                {label:'法人姓名',prop:'responsibleName'},
                {label:'电话',prop:'telephone'}
            ]
        }
    }
}
</script>
<style lang="stylus">

</style>