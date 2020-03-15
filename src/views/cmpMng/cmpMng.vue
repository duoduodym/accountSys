<template>
	<div class="container">
        <pagePanel :searchForm="searchForm">
            <template slot="search-item">
				<el-row>
					<el-col :span="8">
						<el-form-item label="活动区域">
							<el-select v-model="searchForm.qygm" placeholder="请选择活动区域">
								<el-option label="请选择" value></el-option>
								<el-option label="100人以下" value="1"></el-option>
								<el-option label="100人至300人" value="2"></el-option>
								<el-option label="300人至500人" value="3"></el-option>
								<el-option label="500人以上" value="4"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="关键字搜索">
							<el-input v-model="searchForm.newPsd" placeholder="企业名称/联系人/手机号"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</template>
            <template slot="operation-bar">
                 <el-button  type="primary" size="small">删除</el-button>
            </template>
            <template slot="column">
					<el-table-column prop="name" label="企业名称"></el-table-column>
					<el-table-column prop="size" label="企业规模"></el-table-column>
					<el-table-column prop="contact" label="联系人"></el-table-column>
					<el-table-column prop="phone" label="联系人电话"></el-table-column>
					<el-table-column prop="createTime" label="创建时间"></el-table-column>
					<el-table-column fixed="left" label="操作" >
						<template slot-scope="scope">
							<el-button  type="text" size="small">编辑</el-button>
							<el-button  type="text" size="small">停用</el-button>
                            <el-button  type="text" size="small">删除</el-button>
						</template>
					</el-table-column>
				</template>
        </pagePanel>
        <el-dialog title="企业详情" :visible.sync="dialogFormVisible" width="900px" top='2vh'>
			<detail ref="detail" />
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="onConfirm">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import pagePanel from '@/components/pagePanel/pagePanel'
import detail from './detail'
export default {
	components: {
        pagePanel,
        detail
	},
	data() {
		return {
            dialogFormVisible:true,
			tableData: [
				{
					name: '买买买科技有限公司',
					size: '100人至300人',
					contact: '方全勇',
					phone: '13666030313',
					createTime: '2020-03-03'
				},
				{
					name: '素天下',
					size: '100人至300人',
					contact: '林中',
					phone: '13666030313',
					createTime: '2020-4-03'
				}
			],
			searchForm: {}
		}
    },
    methods:{
        onConfirm(){}
    }
}
</script>

<style scoped lang="scss">
</style>
