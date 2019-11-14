<template>
    <div>
        <el-card v-loading="loading1">
            <h2 class="m-tt">报警规则</h2>
            <el-button type="primary" icon="el-icon-plus" @click="initRules">新建规则</el-button>
            <el-table
                    :data="tableData"
                    class="t-table"
                    v-show="!loading1">
                <el-table-column
                        prop="nbr"
                        label="监控项序号"
                        align="center"
                        sortable
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="监控项名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="监控项状态"
                        align="center"
                        sortable
                        width="170">
                    <template slot-scope="scope">
                        <el-switch :value="scope.row.state" @change="changeState($event, scope.row.nbr)"></el-switch>
                        <span class="t-inactive" v-if="scope.row.state">禁用</span>
                        <span class="t-active" v-else>启用</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="正常"
                        align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.normal[0] == 1">瞬时值</span>
                        <span v-else>5分钟平均值</span>
                        <el-tag class="t-tag-cell">{{scope.row.normal[1]}} ~ {{scope.row.normal[2]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="警告"
                        align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.warning[0] == 1">瞬时值</span>
                        <span v-else>5分钟平均值</span>
                        <el-tag type="warning" class="t-tag-cell">{{scope.row.warning[1]}} ~ {{scope.row.warning[2]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="严重"
                        align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.critical[0] == 1">瞬时值</span>
                        <span v-else>5分钟平均值</span>
                        <el-tag type="danger" class="t-tag-cell">{{scope.row.critical[1]}} ~ {{scope.row.critical[2]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="120">
                    <template slot-scope="scope">
                        <span class="t-active t-pt" @click="editRules(scope.row)">编辑</span>
                        <span class="t-active t-pt" @click="deteleRules(scope.row.nbr)">删除</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background  layout="prev, pager, next, jumper"
                           :current-page="page.currentPage" :page-size="page.pageSize" :page-count="page.pageCount"
                           @current-change="getRules" class="m-page">
            </el-pagination>
        </el-card>
        <el-dialog
                v-loading="loading2"
                :title="isNew ? '新建规则' : '编辑规则'"
                :visible.sync="visible"
                width="700px">
            <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="80px">
                <el-form-item label="监控项名称" :prop="isNew ? 'nbr' : 'name'">
                    <el-select v-model="form.nbr" @change="handleChange" filterable placeholder="可输入搜索" v-if="isNew" style="width: 200px">
                        <el-option v-for="item in rulesName" :key="item.nbr" :label="item.name" :value="item.nbr"></el-option>
                    </el-select>
                    <el-input v-model="form.name" disabled v-else></el-input>
                </el-form-item>
                <el-form-item label="监控项状态" prop="state" v-if="form.nbr && isNew">
                    <el-switch v-model="form.state"></el-switch>
                </el-form-item>
                <el-form-item label="正常  (输入-1代表无穷大)" prop="normal" v-if="form.nbr">
                    <el-row :gutter="20" v-if="form.normal">
                        <el-col :span="8">
                            <el-radio-group v-model="form.normal[0]">
                                <el-radio :label="1">瞬时值</el-radio>
                                <el-radio :label="2">5分钟平均值</el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="8">
                            最小值<el-input-number v-model="form.normal[1]" :min="-1" size="mini" class="t-tag-cell"></el-input-number>
                        </el-col>
                        <el-col :span="8">
                            最大值<el-input-number v-model="form.normal[2]" :min="-1" size="mini" class="t-tag-cell"></el-input-number>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="警告  (输入-1代表无穷大)" prop="warning" v-if="form.nbr">
                    <el-row :gutter="20" v-if="form.warning">
                        <el-col :span="8">
                            <el-radio-group v-model="form.warning[0]">
                                <el-radio :label="1">瞬时值</el-radio>
                                <el-radio :label="2">5分钟平均值</el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="8">
                            最小值<el-input-number v-model="form.warning[1]" :min="-1" size="mini" class="t-tag-cell"></el-input-number>
                        </el-col>
                        <el-col :span="8">
                            最大值<el-input-number v-model="form.warning[2]" :min="-1" size="mini" class="t-tag-cell"></el-input-number>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="严重  (输入-1代表无穷大)" prop="critical" v-if="form.nbr">
                    <el-row :gutter="20" v-if="form.critical">
                        <el-col :span="8">
                            <el-radio-group v-model="form.critical[0]">
                                <el-radio :label="1">瞬时值</el-radio>
                                <el-radio :label="2">5分钟平均值</el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="8">
                            最小值<el-input-number v-model="form.critical[1]" :min="-1" size="mini" class="t-tag-cell"></el-input-number>
                        </el-col>
                        <el-col :span="8">
                            最大值<el-input-number v-model="form.critical[2]" :min="-1" size="mini" class="t-tag-cell"></el-input-number>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submitRules">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { deepCopy } from "../../../../utils/utils";

    export default {
        name: 'rules',
        data() {
            return {
                loading1: false,
                loading2: false,
                modelId: -1,
                tableData: [],
                page: {
                    currentPage: 1,
                    pageSize: 15,
                    pageCount: 1
                },
                rulesName: [],
                visible: false,
                isNew: false,
                form: {}
            }
        },
        computed: {
            rules() {
                return {
                    nbr: [
                        { required: true, message: '请选择监控项名称', trigger: 'change' }
                    ]
                }
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.modelId = to.query.modelId || -1;
                vm.getRules.call(vm);
                vm.getAllRules.call(vm);
            })
        },
        methods: {
            getRules(page) {
                if(page) {
                    this.page.currentPage = page;
                }
                this.loading1 = true;
                this.$ajax.post('./alarm/getRules', {
                    modelId: this.modelId,
                    currentPage: this.page.currentPage,
                    pageSize: this.page.pageSize
                }).then(res => {
                    this.loading1 = false;
                    if (res.data.code === 200) {
                        const tableData = [], result = res.data.result;
                        for(const name in result) {
                            tableData.push({
                                name,
                                ...result[name]
                            });
                        }
                        this.tableData = tableData;
                        this.page.pageCount = res.data.pageCount;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },
            getAllRules() {
                this.$ajax.get('./alarm/getAllRules').then(res => {
                    if (res.data.code === 200) {
                        const rulesName = [], result = res.data.result;
                        for(const name in result) {
                            rulesName.push({
                                name,
                                ...result[name]
                            })
                        }
                        this.rulesName = rulesName;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },
            changeState(state, nbr) {
                this.loading1 = true;
                this.$ajax.get('./alarm/switchActive', {
                    params: {
                        state,
                        nbr
                    }
                }).then(res => {
                    this.loading1 = false;
                    if (res.data.code === 200) {
                        this.getRules();
                    } else {
                        this.$notify.error({
                            title: res.data.msg
                        });
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },
            initRules() {
                this.isNew = true;
                this.form = {
                    name: '',
                    nbr: ''
                };
                this.visible = true;
            },
            handleChange(nbr) {
                const [form] = this.rulesName.filter((item) => {
                    return item.nbr === nbr;
                });
                this.form = form;
            },
            editRules(form) {
                this.isNew = false;
                this.form = deepCopy(form);
                this.visible = true;
            },
            deteleRules(nbr) {
                this.loading1 = true;
                this.$ajax.get(`./alarm/deleteRules?nbr=${nbr}`).then(res => {
                    this.loading1 = false;
                    if (res.data.code === 200) {
                        this.getRules();
                    } else {
                        this.$notify.error({
                            title: res.data.msg
                        });
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },
            submitRules() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading2 = true;
                        const { name, ...form } = this.form;
                        this.$ajax.post('./alarm/modifyRules', form, {
                            headers: {'Content-Type': 'application/json;charset=utf-8'},
                            transformRequest: [function transformRequest(data) {
                                return JSON.stringify(data);
                            }]
                        }).then(res => {
                            this.loading2 = false;
                            if (res.data.code === 200) {
                                this.visible = false;
                                this.getRules();
                            } else {
                                this.$notify.error({
                                    title: res.data.msg
                                });
                            }
                        }).catch(res => {
                            this.$message.error('请刷新重试');
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .m-tt {
        font-size: 22px;
        text-align: center;
        margin-bottom: 20px;
    }
    .t-table {
        width: 100%;
        margin-top: 20px;
    }
    .m-page {
        text-align: center;
        margin-top: 30px;
    }
    .t-active, .t-inactive, .t-tag-cell {
        margin-left: 10px;
    }
    .t-active {
        color: #409eff;
    }
    .t-inactive {
        color: #dcdfe6;
    }
    .t-pt {
        cursor: pointer;
    }
</style>