<script setup>
import { generateOrderAPI, submitOrderAPI } from '@/apis/checkout'
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router'
import {useCartStore} from '@/stores/cartStore'
import {addAddressAPI , deleteAddressAPI} from '@/apis/cart'

const cartStore = useCartStore()
const router = useRouter()
const checkInfo = ref({})  // 订单对象
const curAddress = ref({})  // 地址对象
const activeAddress = ref({})
// 获取订单信息
const getOrderInfo = async () => {
  const res = await generateOrderAPI()
  // checkInfo = res.data
  console.log(res)
  checkInfo.value = res.result
  curAddress.value = checkInfo.value.userAddresses.find(item => item.isDefault === 0) || {}
}
onMounted(() => {
  getOrderInfo()
})

// 控制切换地址弹窗显示
const dialogVisible = ref(false)

// 切换地址
const handleChangeAddress = (item) => {
  activeAddress.value = item
}

// 确认切换地址
const confirmAddress = () => {
  // 新增地址 || 切换地址
  if (addFlag.value) {
    // 新增地址
    // 校验新增地址表单
    addAddressFormRef.value.validate().then(async () => {
      // 校验通过，新增地址
      // 调用新增地址接口
      const res = await addAddressAPI({
        ...addAddressForm.value,
        isDefault: 1,
        provinceCode: '110000',
        cityCode: '110100',
        countyCode: '110101',
        address: addAddressForm.value.fullLocation,
        postalCode: '100000',
        addressTags: '家庭地址'
      })
      // 新增地址成功，更新订单信息
        getOrderInfo()
        // curAddress.value = activeAddress.value
        // 切换到新增地址
        handleChangeAddress(res.result)
      })
      ElMessage.success('新增地址成功')
      addFlag.value = false
      // 清空表单
      addAddressForm.value = {
      receiver: '',
      contact: '',
      fullLocation: ''
    }
    }
   else {
    // 切换地址
    curAddress.value = activeAddress.value
    dialogVisible.value = false
     ElMessage.success('切换地址成功')
  } 
}

// 取消切换地址
const cancelAddress = () => {
  // 判断是新增地址还是切换地址
  if (addFlag.value) {
    addFlag.value = false
    // 重置新增地址表单数据
    addAddressForm.value = {
      receiver: '',
      contact: '',
      fullLocation: ''
    }
  } else {
    dialogVisible.value = false
    activeAddress.value = {}
  }
}

// 提交订单
const submitOrder = async () => {
  const res = await submitOrderAPI({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: "",
    goods: checkInfo.value.goods.map(item => ({
      skuId: item.skuId,
      count: item.count
    })),
    addressId: curAddress.value.id
  })
  const id = res.result.id
  ElMessage.success('订单提交成功')
  // 跳转支付页
  router.push({
    path: '/pay',
    query: {
      id
    }
  })
  cartStore.refreshCartList()
}

// 地址切换或新增
const handleGetAddress = (e) => {
  // console.log(e.target.innerText)
  if (e.target.innerText === '切换地址') {
    dialogVisible.value = true
  } else if (e.target.innerText === '添加地址') {
    addFlag.value = true
  }
}


// 表单实例
const addAddressFormRef = ref(null)
// 控制新增地址弹窗显示
const addFlag = ref(false)
// 新增地址表单数据
const addAddressForm = ref({
  receiver: '',
  contact: '',
  fullLocation: ''
})
// 新增地址表单校验规则
const addAddressRules = ref({
  receiver: [{ required: true, message: '请输入收货人', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
  fullLocation: [{ required: true, message: '请输入收货地址', trigger: 'blur' }]
})

// 删除收货地址
const deleteAddress = async (id) => {
  ElMessageBox.confirm('确认删除该地址吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteAddressAPI(id)
    getOrderInfo()
    ElMessage.success('删除成功')
  })
}
</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action" @click="handleGetAddress">
              <el-button size="large">切换地址</el-button>
              <el-button size="large">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <el-table :data="checkInfo.goods" class="goods" border> 
            <!-- 商品信息 -->
            <el-table-column label="商品信息" width="520">
    <template #default="{ row }">
      <a href="javascript:;" class="info">
        <img :src="row.picture" alt="">
        <div class="right">
          <p>{{ row.name }}</p>
          <p>{{ row.attrsText }}</p>
        </div>
      </a>
    </template>
            </el-table-column>

            <!-- 单价 -->
            <el-table-column label="单价" width="170">
    <template #default="{ row }">
      ¥{{ row.price }}
    </template>
            </el-table-column>

            <!-- 数量 -->
            <el-table-column label="数量" width="170" prop="count" />

            <!-- 小计 -->
            <el-table-column label="小计" width="170">
              <template #default="{ row }">
                ¥{{ row.totalPrice }}
              </template>
            </el-table-column>

            <!-- 实付 -->
            <el-table-column label="实付" width="170">
              <template #default="{ row }">
                ¥{{ row.totalPayPrice }}
              </template> 
            </el-table-column>
          </el-table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="submitOrder">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
<el-dialog title="切换收货地址" width="30%" center v-model="dialogVisible">
    <div class="addressWrapper">
      <div 
        class="text item" 
        v-for="item in checkInfo.userAddresses"  
        :key="item.id" 
        :class="{'active': activeAddress.id === item.id}" 
        @click="handleChangeAddress(item)">
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.address}}</li>
        </ul>
        <div class="action">
        <el-button text type="danger" @click="deleteAddress(item.id)">
          <el-icon><Delete /></el-icon>
        </el-button>
         
        </div>
      </div>
    </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancelAddress">取消</el-button>
      <el-button type="primary" @click="confirmAddress">确定</el-button>
    </span>
  </template>
</el-dialog>

  <!-- 添加地址 -->
   <el-dialog title="新增收货地址" width="30%" center v-model="addFlag">
  <div class="addressWrapper">
    <el-form
     :model="addAddressForm"
     :rules="addAddressRules"
     ref="addAddressFormRef"
     >
    <el-form-item label="收货人" prop="receiver">
      <el-input v-model="addAddressForm.receiver" placeholder="请输入收货人" />
    </el-form-item>
    <el-form-item label="联系方式" prop="contact">
      <el-input v-model="addAddressForm.contact" placeholder="请输入联系方式" />
    </el-form-item>
    <el-form-item label="收货地址" prop="fullLocation">
      <el-input v-model="addAddressForm.fullLocation" placeholder="请输入收货地址" />
    </el-form-item>
    </el-form>
  </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancelAddress">取消</el-button>
      <el-button type="primary" @click="confirmAddress">确定</el-button>
    </span>
  </template>
</el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>