<template>
    <div>
        <el-row :gutter="30" class="split" v-loading="loading1">
            <el-col :span="8">
                <el-card class="m-card-add">
                    <div @click="initTemplate">
                        <i class="el-icon-plus"></i>新建模版
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" v-for="item,index in templateData" :key="item.modelId">
                <el-card :class="['m-card', index === 0 ? 'is-target': '']">
                    <router-link :to="{ path: '/alarm/rules', query: { modelId: item.modelId }}">
                        <el-row>
                            <img class="t-cover" src=""/>
                            <div class="t-cnt">
                                <p class="t-tt">{{item.name}}</p>
                                <p class="t-info">
                                    <i class="el-icon-tickets"></i>{{item.info}}
                                </p>
                                <p>{{item.time | format}}</p>
                            </div>
                        </el-row>
                    </router-link>
                    <div class="t-ft">
                        <el-button type="primary" size="small" icon="el-icon-edit" @click="editTemplate(item)">编辑</el-button>
                        <el-button type="danger" size="small" icon="el-icon-close" @click="deleteTemplate(item.modelId)">删除</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog
                v-loading="loading2"
                :title="form.modelId === -1 ? '新建模版' : '编辑模版'"
                :visible.sync="visible"
                width="30%">
            <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="80px">
                <el-form-item label="模版名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="info">
                    <el-input v-model="form.info" type="textarea" :autosize="{ minRows: 3, maxRows: 6}"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submitTemplate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: 'tpl',
        data() {
            const validateName = (rule, value, callback) => {
                if (new RegExp('^\\d').test(value)) {
                    callback(new Error('模版名称不能以数字开头'));
                } else {
                    callback();
                }
            };
            return {
                loading1: false,
                loading2: false,
                visible: false,
                form: {},
                rules: {
                    name: [
                        { required: true, message: '请输入模版名称', trigger: 'blur' },
                        { validator: validateName, trigger: 'change' },
                    ]
                },
                templateData: []
            }
        },
        methods: {
            getTemplate() {
                this.loading1 = true;
                this.$ajax.get('./alarm/getTemplate').then(res => {
                    this.loading1 = false;
                    if (res.data.code === 200) {
                        const templateData = [], result = res.data.result;
                        for(const name in result) {
                            templateData.push({
                                name,
                                ...result[name]
                            })
                        }
                        this.templateData = templateData;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            },
            initTemplate() {
                this.form = {
                    modelId: -1,
                    name: '',
                    info: ''
                };
                this.visible = true;
            },
            editTemplate(item) {
                this.form = {
                    modelId: item.modelId,
                    name: item.name,
                    info: item.info
                };
                this.visible = true;
            },
            submitTemplate() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading2 = true;
                        this.$ajax.post('./alarm/editTemplate', this.form).then(res => {
                            this.loading2 = false;
                            if (res.data.code === 200) {
                                this.visible = false;
                                this.$notify.success({
                                    title: res.data.msg
                                });
                                this.getTemplate();
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
                })
            },
            deleteTemplate(modelId) {
                this.loading1 = true;
                this.$ajax.get(`./alarm/deleteTemplate?modelId=${modelId}`).then(res => {
                    this.loading1 = false;
                    if (res.data.code === 200) {
                        this.$notify.success({
                            title: res.data.msg
                        });
                        this.getTemplate();
                    } else {
                        this.$notify.error({
                            title: res.data.msg
                        });
                    }
                }).catch(res => {
                    this.$message.error('请刷新重试');
                })
            }
        },
        created() {
            this.getTemplate();
        }
    }
</script>

<style>
    .split {
        margin-top: 30px;
    }
    .m-card-add {
        height: 188px;
        line-height: 162px;
        color: #aaa;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        border: 1px dashed #d9d9d9;
        transition: all .2s ease;
        margin-bottom: 30px;
        &:hover {
            border-color: #409EFF;
        }
        i.el-icon-plus {
            margin-right: 8px;
        }
    }
    .m-card {
        transition: all .2s ease;
        margin-bottom: 30px;
        &:hover {
            box-shadow: 0 4px 12px rgba(40, 120, 255, 0.11), 0 3px 14px rgba(0, 0, 0, 0.11);
            transform: translateY(-8px);
        }
        &.is-target {
            border: 1px solid #FF3232;
            overflow: unset;
            position: relative;
            &:after {
                content: '';
                width: 30px;
                height: 51px;
                background-size: 100%;
                position: absolute;
                top: -2px;
                right: -16px;
            }
        }
        .t-cover {
            width: 48px;
            height: 48px;
            background: #fff;
            float: left;
        }
        .t-cnt {
            color: #aaa;
            font-size: 12px;
            margin: 0 0 15px 65px;
            .t-tt {
                color: #000;
                font-size: 18px;
                font-weight: 700;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-bottom: 7px;
            }
            .t-info {
                height: 40px;
                line-height: 20px;
                font-size: 14px;
                overflow: hidden;
                margin-bottom: 7px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                i {
                    margin-right: 5px;
                }
            }
        }
        .t-ft {
            height: 32px;
            line-height: 32px;
            margin-left: 65px;
        }
    }
</style>
