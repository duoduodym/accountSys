<template>
	<div class="container" ref="container">
		<div class="header" ref="header">
			<h2 class="fl">辅管家平台管理系统</h2>
			<div class="fr btn-wrap">
				<span>欢迎您，系统管理员</span>
				<em class="setting cur-p" @click.stop="openModif"></em>
				<div class="modify-wrap bg-f" ref="modifyWrap" v-if="showModify">
					<div class="m-item cur-p" @click="openModifyPsd">
						<em class="icon m-psd"></em>
						<span>修改密码</span>
					</div>
					<div class="m-item cur-p nb">
						<em class="icon m-quit"></em>
						<span>退出登录</span>
					</div>
				</div>
			</div>
		</div>
		<div class="main-wrap">
			<div class="aside" :style="style">
				<el-menu
					class="el-menu-vertical-demo"
					:router="true"
					background-color="#1d2023"
					active-text-color="#fff"
				>
					<menuTree :data="menu_data"></menuTree>
				</el-menu>
			</div>
			<div class="main" :style="style">
				<positionBar />
				<div class="bg-f inner-wrap" >
					<router-view />
				</div>
			</div>
		</div>
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px" @open="openMDIalog">
			<modifyPsd ref="modifyPsd" />
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onConfirm">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import menuTree from '@/components/menuTree/menuTree'
import modifyPsd from '@/components/modifyPsd/modifyPsd'
import positionBar from '@/components/positionBar/positionBar'
export default {
	components: {
		menuTree,
		modifyPsd,
		positionBar
	},
	data() {
		return {
			showModify: false,
			dialogFormVisible: false,
			style: {
				height: ''
			},
			menu_data: [
				{
					index: '/home',
					name: 'home',
					label: '首页',
					icon: 'icon-ziyuan'
				},
				{
					index: '/cmpMng',
					name: 'company',
					label: '企业管理',
					icon: 'icon-qiye'
				},
				{
					index: '/setting',
					name: 'setting',
					label: '设置',
					icon: 'icon-shezhi'
				}
			]
		}
	},
	methods: {
		openMDIalog() {
			this.$nextTick(()=>{
				this.$refs.modifyPsd.onClear()
			})
			
		},
		//确认修改
		onConfirm() {
			this.$refs.modifyPsd.onConfirm()
		},
		//打开修改密码弹窗
		openModifyPsd() {
			this.dialogFormVisible = true
		},
		//打开修改密码弹窗
		openModif() {
			this.showModify = true
		},
		getHight() {
			const H = this.$refs.container.offsetHeight
			const H1 = this.$refs.header.offsetHeight
			this.style.height = H - H1 + 'px'
		}
	},
	mounted() {
		this.getHight()
		window.addEventListener('resize', this.getHight)
		document.addEventListener('click', e => {
			if (this.$refs.modifyWrap) {
				if (!this.$refs.modifyWrap.contains(e.target)) {
					this.showModify = false
				}
			}
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.getHight)
	}
}
</script>

<style scoped lang="less">
@import url('layout.less');
</style>
