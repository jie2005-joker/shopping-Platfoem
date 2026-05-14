<script setup>
import {useCartStore} from '@/stores/cartStore'
const cartStore = useCartStore()
import { ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router'
const router = useRouter()

const delGood = (skuId) => {
  ElMessageBox.confirm('确认删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    cartStore.delGoods(skuId)
  })
}
// 单选商品
const singleChange = (i,selected) => {
  // console.log(selected)
  cartStore.singleSelect(i)
}
// 全选/取消全选商品
const completeSelect = () => {
  cartStore.selectAllGoods()
}

</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <el-table :data="cartStore.cartList" empty-text=" ">
  <!-- 全选复选框 -->
  <el-table-column width="120">
    <template #header>
      <el-checkbox :model-value="cartStore.selectAll" @change="completeSelect" />
    </template>
    <template #default="{ row }">
      <el-checkbox :model-value="row.selected" @change="(selected) => singleChange(row, selected)" />
    </template>
  </el-table-column>

  <!-- 商品信息 -->
  <el-table-column label="商品信息" width="400" align="center">
    <template #default="{ row }">
      <div class="goods">
        <RouterLink to="/"><img :src="row.picture" alt="" /></RouterLink>
        <div>
          <p class="name ellipsis">{{ row.name }}</p>
        </div>
      </div>
    </template>
  </el-table-column>

  <!-- 单价 -->
  <el-table-column label="单价" width="150">
    <template #default="{ row }">
      <p>¥{{ row.price }}</p>
    </template>
  </el-table-column>

  <!-- 数量 -->
  <el-table-column label="数量" width="200" align="center">
    <template #default="{ row }">
      <el-input-number :min="1" v-model="row.count" />
    </template>
  </el-table-column>

  <!-- 小计 -->
  <el-table-column label="小计" width="180" align="center">
    <template #default="{ row }">
      <p class="f16 red">¥{{ (row.price * row.count).toFixed(2) }}</p>
    </template>
  </el-table-column>

  <!-- 操作 -->
  <el-table-column label="操作" width="140">
    <template #default="{ row }">
      <!-- <a href="javascript:;" @click="delGood(row.skuId)">删除</a> -->
      <el-button type="danger" text @click="delGood(row.skuId)">删除</el-button>
    </template>
  </el-table-column>

  <!-- 空状态 -->
  <template #empty>
    <div class="cart-none">
      <el-empty description="购物车列表为空">
        <el-button type="primary">随便逛逛</el-button>
      </el-empty>
    </div>
  </template>
</el-table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{cartStore.totalCount}} 件商品，已选择 {{ cartStore.selectedCount }} 件，商品合计：
          <span class="red">¥ {{cartStore.selectedPrice.toFixed(2) }} </span>
        </div>
        <div class="total">
          <!--  -->
          <router-link to="/checkout">
            <el-button size="large" type="primary">下单结算</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    a {
      color: $xtxColor;
    }

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: $priceColor;
  }

  .green {
    color: $xtxColor;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    >div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }

}
</style>