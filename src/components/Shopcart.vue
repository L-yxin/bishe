<template>
    <el-container class="side">
        <el-card class="shop" v-for="shop, index in model" :key="index"> 
            <el-image :src="shop.path" class="image" alt="Shop Image" />
            <div>
                <p>商品名称: {{ shop.name }}</p>
                <p>价格: ¥{{ shop.price }}</p>
                <p>已选数量：{{ shop.quantity }}</p>
                <p>总价：¥{{ (shop.price * shop.quantity).toFixed(2) }}</p>
            </div>
            <el-icon class="icon" @click="removeFromCart(shop,index)">
                <RemoveFilled />
            </el-icon>
        </el-card>
        <div v-if="model.length === 0" class="empty-cart">
            购物车为空~
        </div>
    </el-container>
</template>

<script setup>
import { RemoveFilled } from '@element-plus/icons-vue'
import { useShopListStore } from '../stores/shoplist.js';
const shoplist = useShopListStore()
const model = defineModel({
    type: Array,
    required: true
})

const removeFromCart = (shop, index) => {
    // 在购物车中查找该商品
    const cartIndex = model.value.findIndex(item => item.id === shop.id);
    if (cartIndex !== -1) {
        // 减少数量
        model.value[cartIndex].quantity -= 1;
        // 如果数量小于等于0，则移除
        if (model.value[cartIndex].quantity <= 0) {
            model.value.splice(cartIndex, 1);
        }
    }

    // 在商品列表中增加库存
    const shopIndex = shoplist.shops.findIndex(item => item.id === shop.id);
    if (shopIndex !== -1) {
        shoplist.shops[shopIndex].total += 1;
    }
}
</script>
<style scoped>
.icon {
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-size: 28px;
    color: #409EFF;
    cursor: pointer;
}
.empty-cart {
    text-align: center;
    margin-top: 20px;
    font-size: 24px;
}
.side {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 5px;
    justify-content: space-around;
    align-content: flex-start;
    user-select: none;
}

.shop {
    width: 100%;
    height: 150px;
    position: relative;
     min-width: 230px;
    min-height: 150px;

}

.image {
    width: 100px;
    height: 120px;
    margin-bottom: 10px;
}

.card {
    width: 100%;
    height: 150px;
   
    position: relative;

}

:deep(.el-card__body) {
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

p {
    margin: 2px;
}
</style>