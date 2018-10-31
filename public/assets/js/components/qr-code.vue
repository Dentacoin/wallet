<template>
    <div>
        <p class="one-line">Last result: <b>{{ result }}</b></p>

        <qrcode-stream @decode="onDecode" :paused="paused" @init="$emit('init', $event)" />
    </div>
</template>
<script>
    import { QrcodeStream } from 'vue-qrcode-reader'

    export default {
        components: { QrcodeStream },

        data () {
            return {
                result: ''
            }
        },

        methods: {
            onDecode (result) {
                this.result = result;
                this.paused = true;
                this.camera  = false;
                console.log('DECODED');
            }
        }
    }
</script>