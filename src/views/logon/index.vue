<template>
  <div>
    <!-- 步骤条开始 -->
    <div class='steps-container'>
        <el-steps
        class="steps-wrap"
        :active="active"
        align-center
        finish-status="success"
        >
          <el-step @click.native="active=0" title="企业认证"></el-step>
          <el-step @click.native="active > 1 ? active=1 : ''" title="工商信息确认"></el-step>
          <el-step @click.native="active > 2 ? active=2 : ''" title="填写基本信息"></el-step>
          <el-step @click.native="active > 3 ? active=3 : ''" title="选择企业类型、经济类型"></el-step>
          <el-step @click.native="active > 4 ? active=4 : ''" title="上传企业附件"></el-step>
        </el-steps>
    </div>
    <!-- 步骤条结束 -->

    <!-- 步骤开始 -->
    <div class="step-content">
        <!-- 第一步骤 -->
        <el-form
            v-show="active === 0"
            class="step1-form"
            ref="step1-form"
            :rules="rules1"
            :model="step1"
            label-width="180px">
                <el-form-item label="请填写企业名称" prop="corpName">
                    <el-input
                      v-model="step1.corpName"
                      placeholder="请填写企业名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="请填写企业统一信用代码"  prop="corpCode">
                    <el-input
                      v-model="step1.corpCode"
                      placeholder="请填写企业统一信用代码"
                    ></el-input>
                </el-form-item>
                <el-form-item class="bt0">
                    <el-button type="primary" @click="onNest1">下一步</el-button>
                </el-form-item>
        </el-form>
        <el-dialog
          class="dialog-1"
          top="247px"
          :modal-append-to-body='false'
          :visible.sync="dialogVisible"
          width="410px">
          <p>该公司在系统中已存在</p>
          <p>审核状态：<span>{{message}}</span></p>
        </el-dialog>
        <!-- 第二步骤 -->
        <div class="step2-form" v-show="active === 1">
            <div class="title">工商信息列表</div>
            <el-table
                size="mini"
                :span-method="arraySpanMethod"
                :cell-style="columnStyle"
                border
                :show-header="false"
                :data="tableData">
                    <el-table-column
                        prop="one"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="two"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="three">
                    </el-table-column>
                    <el-table-column
                        prop="four"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="five"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="six">
                    </el-table-column>
            </el-table>
            <el-row class="btn">
                <el-button class="btn1">替代信息</el-button>
                <el-button class="btn2" @click="onConfirm">确定</el-button>
            </el-row>
        </div>
        <!-- 第三步骤 -->
        <el-form
            v-show="active === 2"
            class="step3-form"
            :rules="rules3"
            ref="step3-form"
            :model="step3"
            label-width="170px">
            <el-form-item label="企业办公地址" prop="address">
                <el-input placeholder="请填写企业办公地址" v-model="step3.address"></el-input>
            </el-form-item>
            <el-form-item label="法人联系电话" prop="leaderPhone">
                <el-input placeholder="请填写法人联系电话" v-model="step3.leaderPhone"></el-input>
            </el-form-item>
            <el-form-item label="企业联系人姓名" prop="name">
                <el-input placeholder="请填写企业联系人姓名" v-model="step3.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
                <el-input placeholder="请填写邮箱" v-model="step3.mail"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input placeholder="请填写登录密码" show-password v-model="step3.password"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机号" prop="phone">
                <el-input placeholder="请填写联系人手机号" v-model="step3.phone"></el-input>
            </el-form-item>
            <el-form-item label="手机验证码" prop="code">
                <el-input placeholder="请输入手机验证码" class="getCode" v-model="step3.code"></el-input>
                <el-button
                v-if="isCountDownShow"
                class="getCodeBt"
                round
                @click="onSendSms"
                >点击获取</el-button>
                <el-button
                v-else
                class="waitCodeBt"
                round
                >{{verifyCode}}</el-button>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" @click="onNest3">下一步</el-button>
            </el-form-item>
        </el-form>
        <!-- 第四步骤 -->
        <div class='step4-form' v-show="active === 3">
            <div class="title">选择企业类型</div>
            <el-card class="box-card">
                <el-form :show-message="false" ref="step4-1-form" :rules="rules41" :model="company" label-width="35px">
                    <el-form-item prop="type">
                        <el-checkbox-group v-model="company.type">
                            <el-checkbox label="建设单位" name="type"></el-checkbox>
                            <el-checkbox label="监理单位" name="type"></el-checkbox>
                            <el-checkbox label="设计单位" name="type"></el-checkbox>
                            <el-checkbox label="勘查单位" name="type"></el-checkbox>
                            <el-checkbox label="施工单位（总包/分包/安装）" name="type"></el-checkbox>
                            <el-checkbox label="租赁单位" name="type"></el-checkbox>
                            <el-checkbox label="安拆单位" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </el-card>

            <div class="title">选择经济类型</div>
            <el-card  class="box-card2">
                <el-form :show-message="false" ref="step4-2-form" :rules="rules42" :model="economy" label-width="35px">
                    <el-form-item prop="type">
                        <el-radio-group v-model="economy.type">
                            <el-radio label="有限责任"></el-radio>
                            <el-radio label="有限公司（自然人控股）"></el-radio>
                            <el-radio label="股份制经济"></el-radio>
                            <el-radio label="股份有限公司（上市、自然人投资或控股）"></el-radio>
                            <el-radio label="其他股份有限公司（上市）"></el-radio>
                            <el-radio label="合伙"></el-radio>
                            <el-radio label="集体所有制（股份合作）"></el-radio>
                            <el-radio label="联营经济"></el-radio>
                            <el-radio label="港澳台投资经济"></el-radio>
                            <el-radio label="国有经济"></el-radio>
                            <el-radio label="无"></el-radio>
                            <el-radio label="有限公司（法人独资）私营"></el-radio>
                            <el-radio label="股份有限公司（非上市、自然人投资或控股）"></el-radio>
                            <el-radio label="股份有限公司（港澳台与境内合资、上市）"></el-radio>
                            <el-radio label="其他股份有限公司"></el-radio>
                            <el-radio label="普通合伙"></el-radio>
                            <el-radio label="集体经济"></el-radio>
                            <el-radio label="外商投资经济"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-card>

            <el-row class="bot-btn">
                <el-button class="btn" @click="onNest4">下一步</el-button>
            </el-row>
        </div>
        <!-- 第五步骤 -->
        <table class='step5-form' v-show="active === 4 || active === 5">
          <tr>
              <td class="title pad-right">上传资质</td>
              <td>
                  <!-- 上传资质 -->
                  <el-form ref="form" label-width="68px">
                    <el-button
                      class="add-item"
                      icon="el-icon-plus"
                      type="primary"
                      @click="addTab"
                    ></el-button>
                    <el-form-item
                      v-for="item in editableTabs"
                      :key="item.sign"
                      class="add"
                      label="资质名称">
                        <el-input
                          class="title-input"
                          v-model="item.name"></el-input>
                        <el-button
                          type="primary"
                          icon="el-icon-plus"
                          class="up-input"
                        >上传附件</el-button>
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          @click="removeTab(item.sign)"
                        ></el-button>
                    </el-form-item>
                  </el-form>
              </td>
          </tr>
          <tr>
              <td class="pad-right">上传营业执照</td>
              <td></td>
          </tr>
          <tr>
              <td></td>
              <td>
                  <el-button
                      class="up-file"
                      icon="el-icon-plus"
                  >上传营业执照</el-button>
              </td>
          </tr>
          <tr>
              <td></td>
              <td>
                  <el-button
                    @click="onSubmit"
                    class="submit">提交注册</el-button>
              </td>
          </tr>
        </table>
    </div>
    <!-- 步骤结束 -->
  </div>
</template>

<script>
// import { register } from '@/api/register'
export default {
  name: 'Logon',
  components: {},
  props: [],
  data () {
    return {
      active: 0, // 步骤条完成步骤
      step1: { // 第一页表单的数据
        corpName: '烟台清大数字计算技术研究院有限公司', // 企业名称
        corpCode: '91370600MA946R5M5D' // 企业统一信用代码
      },
      rules1: { // 第一步表单的验证规则
        corpName: [ // 企业名称验证规则
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        corpCode: [ // 企业统一信用代码验证规则
          { required: true, message: '请输入企业统一信用代码', trigger: 'blur' },
          { pattern: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/, message: '请输入格式正确的企业统一信用代码', trigger: 'blur' }
        ]
      },
      dialogVisible: false, // 第一页的弹框显示状态
      message: '', // 第一页审核结果
      tableData: [{ // 第二页表格信息
        one: '统一社会信用代码',
        two: '替代信息替代信息替代',
        three: '企业名称',
        four: '替代信息替代信息替代信息',
        five: '',
        six: ''
      }, {
        one: '法定代表人',
        two: '替代信息替代信息',
        three: '登记状态',
        four: '在营（开业）企业',
        five: '成立日期',
        six: '替代信息'
      }, {
        one: '注册资本',
        two: '2000万元人民币',
        three: '实缴资本',
        four: '-',
        five: '核准日期',
        six: '替代信息'
      }, {
        one: '组织机构代码',
        two: '替代信息',
        three: '工商注册号',
        four: '-',
        five: '纳税人识别号',
        six: '替代信息'
      }, {
        one: '企业类型',
        two: '有限责任公司（自然人独资）',
        three: '营业期限',
        four: '2021-05-16至 无固定期限',
        five: '纳税人资质',
        six: '-'
      }, {
        one: '所属行业',
        two: '软件和信息技术服务业',
        three: '所属地区',
        four: '山东省',
        five: '登记机关',
        six: '烟台高新技术产业开发区市场监督管理局'
      }, {
        one: '人员规模',
        two: '-',
        three: '参保人数',
        four: '-',
        five: '曾用名',
        six: '-'
      }, {
        one: '英文名',
        two: '替代信息替代信息替代信息替代信息替代信息替代信息',
        three: '',
        four: '',
        five: '进出口企业代码',
        six: '-'
      }, {
        one: '注册地址',
        two: '替代信息替代信息替代信息替代信息替代信息替代信息替代信息',
        three: '',
        four: '',
        five: '',
        six: ''
      }, {
        one: '经营范围',
        two: '一般项目：人工智能应用软件开发；软件开发；网络与信息安全软件开发；区块链技术相关软件和服务；5G通信技术服务；工业互联网数据服务；智能机器人的研发卫星技术综合应用系统集成；地理遥感信息服务；人工智能基础资源与技术平台；人工智能通用应用系统；人工智能理论与算法软件开发；人工智能公共服务平台技术咨询服务；人工智能硬件销售；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；信息技术咨询服务；安全咨询服务；会议及展览服务业务培训不含教育培训、职业技能培训等需取得许可的培训）。（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）许可项目：互联网信息服务建筑智能化系统设计；第一类增值电信业务。（依法须经批准的项目，经相关部门批准后方可开展经营活动，具体经营项目以相关部门批准文件或许可证件为准',
        three: '',
        four: '',
        five: '',
        six: ''
      }],
      step3: { // 第三页表单的数据
        address: '山东省烟台市高新区马山街道蓝色智谷10号楼', // 企业办公地址
        leaderPhone: '0530-6813568', // 法人联系电话
        name: '王小二', // 企业联系人姓名
        mail: '888888888@qq.com', // 邮箱
        password: '123456', // 密码
        phone: '13987654321', // 联系电话
        code: '123456' // 验证码
      },
      rules3: { // 第三页表单的验证规则
        address: [ // 企业办公地址
          { required: true, message: '请输入企业办公地址', trigger: 'blur' }
        ],
        leaderPhone: [ // 法人联系电话
          { required: true, message: '请输入企业法人联系电话', trigger: 'blur' },
          { pattern: /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/, message: '请输入正确的联系号码', trigger: 'blur' }
        ],
        name: [ // 联系人姓名
          { required: true, message: '请输入企业联系人姓名', trigger: 'blur' }
        ],
        mail: [ // 邮箱
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确格式的邮箱', trigger: 'blur' }
        ],
        password: [ // 密码
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        phone: [ // 联系人手机号
          { required: true, message: '请输入联系人手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的联系号码', trigger: 'blur' }
        ],
        code: [ // 验证码
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      isCountDownShow: true, // 控制倒计时和发送按钮的显示状态
      verifyCode: '', // 倒计时按钮的文本
      totalTime: 60, // 倒计时的时间
      company: { // 公司类型
        type: []
      },
      economy: { // 经济类型
        type: ''
      },
      rules41: { // 第四页第一个表单的验证规则
        type: [
          { type: 'array', required: true, message: '请至少选择一个企业类型', trigger: 'change' }
        ]
      },
      rules42: { // 第四页第二个表单的验证规则
        type: [
          { required: true, message: '请选择企业经济类型', trigger: 'change' }
        ]
      },
      editableTabs: [{ // 第五页的资质列表
        name: '',
        sign: '0'
      }],
      tabIndex: 0 // 第五页的资质列表序号
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onNest1 () { // 第一页表单的验证
      this.$refs['step1-form'].validate(valid => {
        // 验证失败
        if (!valid) {
          return
        }
        // 验证通过
        // this.toNest2()
        this.active = 1
      })
    },
    // async toNest2 () { // 第一页表单的数据请求及进入下一步
    //   const { data } = await register(this.step1)
    //   this.message = data.message
    //   console.log(data)
    //   if (data.code === 300) {
    //     this.dialogVisible = true // 显示弹框
    //   } else {
    //     this.active = 1 // 步骤条状态变为1
    //   }
    // },
    arraySpanMethod ({ rowIndex, columnIndex }) { // 第二页合并单元格
      if (rowIndex === 0) {
        if (columnIndex === 3) {
          return [1, 3]
        } else if (columnIndex === 4 || columnIndex === 5) {
          return [1, 0]
        }
      }
      if (rowIndex === 7) {
        if (columnIndex === 1) {
          return [1, 3]
        } else if (columnIndex === 2 || columnIndex === 3) {
          return [1, 0]
        }
      }
      if (rowIndex === 8) {
        if (columnIndex === 1) {
          return [1, 5]
        } else if (columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5) {
          return [1, 0]
        }
      }
      if (rowIndex === 9) {
        if (columnIndex === 1) {
          return [1, 5]
        } else if (columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5) {
          return [1, 0]
        }
      }
    },
    columnStyle ({ columnIndex }) { // 第二页表格列样式
      if (columnIndex % 2 === 0) {
        return 'background-color: #F2F9FC'
      }
    },
    onConfirm () { // 第二页的“确定”按钮
      this.active = 2
    },
    onSendSms () { // 第三页的发送验证码函数
      // 短信发出后，隐藏发送按钮，显示倒计时
      this.isCountDownShow = false
      this.verifyCode = this.totalTime + 's后获取'
      const clock = window.setInterval(() => {
        this.totalTime--
        this.verifyCode = this.totalTime + 's后获取'
        if (this.totalTime === 0) {
          window.clearInterval(clock)
          this.totalTime = 60
          this.isCountDownShow = true
        }
      }, 1000)
    },
    onNest3 () { // 第三页表单的验证
      this.$refs['step3-form'].validate(valid => {
        // 验证失败
        if (!valid) {
          return
        }
        // 验证通过
        this.toNest4()
      })
    },
    toNest4 () { // 第三页的进入下一步
      this.active = 3 // 步骤条状态变为1
    },
    onNest4 () { // 第四页表单的验证
      this.$refs['step4-1-form'].validate(valid => {
        if (!valid) { // 若验证失败
          this.$message({
            message: '请选择企业类型',
            type: 'error',
            offset: 50
          })
          return
        }
        // 验证通过
        this.$refs['step4-2-form'].validate(valid => {
          if (!valid) { // 验证失败
            this.$message({
              message: '请选择企业经济类型',
              type: 'error',
              offset: 50
            })
            return
          }
          // 验证通过
          this.toNest5()
        })
      })
    },
    toNest5 () { // 第四页的进入下一步
      this.active = 4 // 步骤条状态变为4
    },
    addTab () { // 第五页的添加资质列表
      const newTabSign = ++this.tabIndex + ''
      this.editableTabs.push({
        name: '',
        sign: newTabSign
      })
    },
    removeTab (targetSign) { // 第五页的删除资质列表
      this.editableTabs.forEach((editableTab, index) => {
        if (index === 0) return
        if (editableTab.sign === targetSign) {
          this.editableTabs.splice(index, 1)
        }
      })
    },
    onSubmit () { // 最终提交数据
      this.active = 5 // 步骤条状态变为4
    }
  }
}
</script>

<style scoped lang='less'>
// 步骤条样式
.steps-container{
    width: 100%;
    height: 134px;
    background-color: #424955;
    display: flex;
    justify-content: center;
    align-items: center;
    /deep/ .steps-wrap{
        width: 1200px;
        .el-step__title{
            font-size: 14px;
            color: #fff;
            font-weight:normal;
        }
        .el-step__icon{
            font-size: 16px;
            font-weight: 800;
            border: none;
            color: #fff;
            z-index: 0;
            background-color: #4C7AD2;
        }
        .el-step__line{
            height: 8px;
            top: 12px;
            .el-step__line-inner{
                border-width: 4px !important;
                border-color: #4C7AD2;
            }
        }
        .el-step__icon{
            width: 33px;
            height: 33px;
        }
        .is-success .el-step__line{
            background-color: #4C7AD2;
        }
        .is-success .is-text{
            color: #fff;
        }
        .is-process{
            .el-step__line-inner{
                width: 70% !important;
            }
        }
        .is-wait .is-text{
            background-color: #B2B2B2;
        }
    }
}
// 步骤内容样式
.step-content{
    position: fixed;
    top: 134px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}
// 第一步页面样式
/deep/ .step1-form{
    .el-input__inner{
        width: 400px;
    }
    .el-form-item__label{
        color: #555;
        font-size: 14px;
    }
    .bt0{
        .el-button--primary{
            background-color: #4C7AD2;
            width: 120px;
        }
        margin: 40px 0 0;
    }
}
/deep/ .dialog-1{ // 弹框样式
  text-align: center;
  border-radius: 10px;
  .el-dialog__header{
    height: 45px;
    padding: 0;
    background-color: #4C7AD2;
    .el-dialog__headerbtn{
      right: 16px;
      top: 16px;
      .el-dialog__close{
        color: #fff;
      }
    }
  }
  span{
    color: #FF0000;
  }
}
// 第二步页面样式
.step2-form{
    width: 1200px;
    .title{
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 25px;
    }
    .el-table--mini, .el-table--small, .el-table__expand-icon{
        font-size: 14px;
    }
    .btn{
        margin-top: 52px;
        display: flex;
        justify-content: space-between;
        .el-button{
            width: 120px;
            height: 46px;
            font-size: 14px;
        }
        .btn1{
            border: 1px solid #4C7AD2;
            color: #4C7AD2;
        }
        .btn2{
            background-color: #4C7AD2;
            color: #fff;
        }
    }
}
// 第三步页面样式
.step3-form{
    width: 570px;
    .getCode{
        width: 223px;
    }
    .getCodeBt{
        width: 144px;
        height: 40px;
        background: #4C7AD2;
        font-size: 14px;
        color: #fff;
        margin-left: 33px;
        border: none;
    }
    .waitCodeBt{
        width: 144px;
        height: 40px;
        background: #B2B2B2;
        font-size: 14px;
        color: #fff;
        margin-left: 33px;
        border: none;
    }
    .btn{
        width: 120px;
        height: 46px;
        font-size: 14px;
        background-color: #4C7AD2;
        color: #fff;
        margin-top: 58px;
    }
}
// 第四步页面样式
.step4-form{
    width: 1200px;
    .title{
        font-size: 16px;
        font-weight: bold;
        color: #555;
        margin-bottom: 25px;
    }
    .box-card{
        border: 1px solid #E5E5E5;
        box-shadow: 0px 2px 6px 1px rgba(165, 165, 165, 0.19);
        border-radius: 10px;
        margin-bottom: 50px;
        .el-form-item{
            margin-bottom: 0;
            .el-checkbox-group{
                width: 100%;
                .el-checkbox{
                    width: 25%;
                    line-height: 1;
                    margin: 17px 0 25px 0;
                    /deep/ .el-checkbox__label{
                        padding-left: 18px;
                    }
                }
                .el-checkbox:nth-child(5),
                .el-checkbox:nth-child(6),
                .el-checkbox:nth-child(7){
                    margin: 0 0 17px !important;
                }
            }
        }
    }
    .box-card2{
        border: 1px solid #E5E5E5;
        box-shadow: 0px 2px 6px 1px rgba(165, 165, 165, 0.19);
        border-radius: 10px;
        margin-bottom: 50px;
        .el-form-item{
            margin-bottom: 0;
            .el-radio-group{
                width: 100%;
                .el-radio{
                    width: 33.33%;
                    margin: 17px 0 25px 0;
                    /deep/ .el-radio__label{
                        padding-left: 18px;
                    }
                }
                .el-radio:nth-child(16),
                .el-radio:nth-child(17),
                .el-radio:nth-child(18){
                    margin: 17px 0 !important;
                }
            }
        }
    }
    .bot-btn{
        display: flex;
        justify-content: center;
        .btn{
            width: 120px;
            height: 46px;
            font-size: 14px;
            background-color: #4C7AD2;
            color: #fff;
        }
    }
}
// 第五步页面样式
.step5-form{
    border-collapse: collapse;
    .add-item{
        width: 22px;
        height: 22px;
        padding: 0;
        font-size: 12px;
    }
    .add{
        margin-top: 20px;
    }
    .up-input{
        margin-left: 10px;
        background: #4C7AD2;
        color: #fff;
    }
    .up-file{
        background: #4C7AD2;
        color: #fff;
    }
    .submit{
        width: 120px;
        height: 46px;
        background: #4C7AD2;
        color: #fff;
        margin-top: 50px;
    }
    .title{
        vertical-align: top;
    }
    .title-input{
        width: 400px;
    }
    .pad-right{
        padding-right: 20px;
    }
}
</style>
