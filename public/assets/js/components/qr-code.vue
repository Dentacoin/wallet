<template>
    <div>
        <p class="one-line">Last result: <b>{{ result }}</b></p>
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
                console.log(result, 'onDecode123');
            }
        }
    }
</script>