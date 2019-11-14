<template>
    <div >
     <!--已暂存，未提交，点击后进入报销单页面-->
     </el-dialog>
    <el-dialog title="报销信息" :visible.sync="addVisible2">
     <el-form :model="form" :rules="rules">
    <el-form-item label="已暂存，未提交" :label-width="formLabelWidth">
    </el-form-item>
    </el-form>
     <el-link  label = ss  href="https://element.eleme.io" target="_blank">点击这里</el-link>
    <span>进行继续编辑</span>
    </el-dialog>
    <!--等待审核-->
     </el-dialog>
    <el-dialog title="报销信息" :visible.sync="addVisible2">
     <el-form :model="form" :rules="rules">
    <el-form-item label="等待审核" :label-width="formLabelWidth">
    </el-form-item>
    </el-form>
     <el-link  label = ss  href="https://element.eleme.io" target="_blank">点击这里</el-link>
    <span>查看信息</span>
    </el-dialog>
    <!--正在审核-->
    <el-dialog title="报销信息" :visible.sync="taa">
     <el-form :model="form" :rules="rules">
    <el-form-item label="正在审核" :label-width="formLabelWidth">
    </el-form-item>
    </el-form>
    <span>请等待几分钟后刷新页面</span>
    </el-dialog>
    <!--审核通过-->
    <el-dialog title="报销信息" :visible.sync="addVisible1">
     <el-form :model="form" :rules="rules">
    <el-form-item label="审核通过" :label-width="formLabelWidth">
    </el-form-item>
    </el-form>
     <el-link  label = ss  href="https://element.eleme.io" target="_blank">点击这里</el-link>
    <span>查看审核结果</span>
    </el-dialog>
    <!--审核未通过-->
    <el-dialog title="报销信息" :visible.sync="addVisible2">
     <el-form :model="form" :rules="rules">
    <el-form-item label="审核未通过" :label-width="formLabelWidth">
    </el-form-item>
    </el-form>
     <el-link  label = ss  href="https://element.eleme.io" target="_blank">点击这里</el-link>
    <span>查看审核结果</span>
    </el-dialog>
    <!---->
    <el-dialog title="报销信息" :visible.sync="addVisible1">
     <el-form :model="form" :rules="rules">
    <el-form-item label="报销单未报销" :label-width="formLabelWidth">
    </el-form-item>
    </el-form>
     <el-link  label = ss  href="https://element.eleme.io" target="_blank">点击这里</el-link>
    <span>下载报销单</span>
    </el-dialog>
        <!--没有未报销单，点击进行报销申请-->
     <el-dialog title="报销信息" :visible.sync="addVisible1">
     <el-form :model="form" :rules="rules">
    <el-form-item label="报销单未报销" :label-width="formLabelWidth">
    </el-form-item>
    </el-form>
     <el-link  label = ss  href="https://element.eleme.io" target="_blank">点击这里</el-link>
    <span>下载报销单</span>
    </el-dialog>

    </div>
</template> 



<script>
    export default {
        name: 'homePage',
        data() {
              return {
                    addVisible1: true,
                    addVisible2:false,
                    taa:true,
                    }
                 
              },
        }

</script>