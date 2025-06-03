<script setup>
import sku from './SKU/sku.vue';
const handleSkuInfo = (skuInfo) => {
  console.log(skuInfo)
}
</script>

<template>
<sku :skuData="skuData" @sendSkuInfo = 'handleSkuInfo'/>
</template>

<style>

</style>
