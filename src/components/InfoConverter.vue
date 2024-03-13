<template>
    <main id="holder">
        <InputForm />
        <ConvertedOutput />
    </main>
</template>

<script>
    import InputForm from './InputForm';
    import ConvertedOutput from './ConvertedOutput';

    export default {
        name: 'info-converter',
        components: {
            InputForm,
            ConvertedOutput
        }
    }
</script>

<style lang="scss" scoped>

</style>