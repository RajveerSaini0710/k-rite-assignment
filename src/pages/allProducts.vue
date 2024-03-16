<template>
    <section class="w-full h-full md:flex  ">
        <leftPanel />
        <rightPanel />
    </section>
</template>
<script>
import leftPanel from '../components/leftPanel.vue'
import rightPanel from '../components/rightPanel.vue'

export default {
    components: {
        leftPanel,
        rightPanel
    }
}
</script>