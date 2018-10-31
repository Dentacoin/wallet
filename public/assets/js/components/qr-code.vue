<template>
    <div>
        <input type="hidden" id="qr-scan-result" :value="result"/>
        <qrcode-stream @decode="onDecode" :paused="paused" :camera="camera" @init="$emit('init', $event)"/>
    </div>
</template>
<script>
    import { QrcodeStream } from 'vue-qrcode-reader'

    export default {
        components: { QrcodeStream },

        data () {
            return {
                paused: false,
                camera: {
                    audio: false,
                    video: {
                        facingMode: 'user'
                    }
                },
                result: ''
            }
        },

        methods: {
            onDecode (result) {
                this.paused = true;
                this.camera = false;
                this.result = result;
            }
        }
    }
</script>