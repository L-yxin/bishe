<template>
  <el-container class="side">
    <el-aside class="aside">
      <Shopcart class="shopcart" v-model="shoppingCart" />
    </el-aside>
    <el-main class="main">
      <el-radio-group v-model="model" type="button">
        <el-radio-button value="wxQC">微信</el-radio-button>
        <el-radio-button value="alipayQC">支付宝</el-radio-button>
        <el-radio-button value="cash">现金</el-radio-button>
      </el-radio-group>
      <el-container class="qrcode" v-if="model !== 'cash' && totalPrice !== 0">
        <el-card>
          <div ref="qrcode" style="width: 200px; height: 200px;"></div>
        </el-card>
      </el-container>
      <el-container  v-else-if="model === 'cash' && totalPrice !== 0">
        <el-container class="cashier">
          <el-form class="cashier_form" label-width="50px">
            <div class="cashier_title">
              <h1>请输入货币数量</h1>
              <h4>总金额：{{ totalPrice.toFixed(2) }}元，还差{{ priceDifference }}</h4>
            </div>
            <el-form-item label="1分">
              <el-input class="cash" type="number" v-model.number="cash['0.01']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="2分">
              <el-input class="cash" type="number" v-model.number="cash['0.02']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="5分">
              <el-input class="cash" type="number" v-model.number="cash['0.05']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="1角">
              <el-input class="cash" type="number" v-model.number="cash['0.1']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="2角">
              <el-input class="cash" type="number" v-model.number="cash['0.2']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="5角">
              <el-input class="cash" type="number" v-model.number="cash['0.5']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="1元">
              <el-input class="cash" type="number" v-model.number="cash['1']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="2元">
              <el-input class="cash" type="number" v-model.number="cash['2']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="5元">
              <el-input class="cash" type="number" v-model.number="cash['5']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="10元">
              <el-input class="cash" type="number" v-model.number="cash['10']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="20元">
              <el-input class="cash" type="number" v-model.number="cash['20']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="50元">
              <el-input class="cash" type="number" v-model.number="cash['50']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="100元">
              <el-input class="cash" type="number" v-model.number="cash['100']" :min="0" :step="1" placeholder="请输入张数"
                :disabled="priceDifference <= 0"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button class="cash" @click="resetCash">重置输入金额</el-button>
            </el-form-item>
            <el-form-item label=""> 
              <el-button  type="primary" class="cash" @click="settlement">结算</el-button>
            </el-form-item>
          </el-form>
        </el-container>
      </el-container>
      <el-container class="QC" v-if="model!=='cash'"> 
        <el-button type="primary" class="QC" @click="settlement">扫码支付完毕，查看账单</el-button>
      </el-container>
    </el-main>
  </el-container>
</template>
<script setup>


const shoppingCart = useShoppingCartStore().cart
const qrcode = ref(null)
let qrcodeInstance = null
const model = ref('wxQC')
const totalPrice = computed(() => {
  return shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
});
const baseUrl = computed(() => {
  return `https://l-yxin.github.io?pay=${model.value}&cash=${totalPrice.value}&priceDifference=0`
})

const cash = ref({
  "0.01": 0,
  "0.02": 0,
  "0.05": 0,
  "0.1": 0,
  "0.2": 0,
  "0.5": 0,
  "1": 0,
  "2": 0,
  "5": 0,
  "10": 0,
  "20": 0,
  "50": 0,
  "100": 0,
})

const resetCash = () => {
  for (const key in cash.value) {
    cash.value[key] = 0
  }
}
const priceDifference = computed(() => {
  let totalCash = 0;
  for (const [denomination, count] of Object.entries(cash.value)) {
    totalCash += parseFloat(denomination) * count;
  }
  return (totalPrice.value - totalCash).toFixed(2);
});
const settlement = () => { 
  if (priceDifference.value >0 && model.value === 'cash') {
    ElMessage({
      message: '金额不足',
      type: 'warning',
    });
  }else{
    ElMessage.closeAll()
    router.push({
    path: '/donePay',
    query: {
      pay: model.value,
      cash: totalPrice.value,
      priceDifference: Math.abs(priceDifference.value)
    }
  })
  }
   
}
const generateQrcode = (content) => {
  setTimeout(() => {
    if (totalPrice.value <= 0) {
      // 先跳转，后显示消息
      router.push({
        name: "app"
      }).then(() => {
        ElMessage({
          message: '购物车为空，请添加商品后再结算',
          type: 'warning',
        })
      })
    }
    if (qrcodeInstance) {
      qrcodeInstance.clear()
      qrcodeInstance = null
      if (model.value === 'cash') return
    }
    if (qrcode.value) {
      qrcode.value.innerHTML = ''
      qrcodeInstance = new QRCode(qrcode.value, {
        text: content.value,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  }, 0)
}
watch(baseUrl, () => {
  generateQrcode(baseUrl)
})
onMounted(() => {
  generateQrcode(baseUrl)
})

onUnmounted(() => {
  if (qrcodeInstance) {
    qrcodeInstance.clear()
  }
})
</script>
<style scoped>
.side {
  height: 100vh;
}

.aside {
  width: 30%;
  min-width: 240px;
  background-color: #d3dce6;
  position: relative;
}

.main {
  width: 70%;
  height: 100%;

}
.qrcode{
  height: 250px;
  width: 250px;
  margin: 20px 0;
}
.QC{
  margin:20px 10px;
}
.cash {
  width: 100px;
}
.cashier_form{
  width: 700px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-rows: repeat(1,1fr); */
}
.cashier_title{
  text-align: center;
  grid-column: 1/4;
}
</style>