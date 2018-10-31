<template>
    <div>
        <p class="one-line">Last result: <b>{{ result }}</b></p>
        <qrcode-stream @decode="onDecode" :camera="{ facingMode: 'user' }" @init="$emit('init', $event)"/>
    </div>
</template>
<script>
    import { QrcodeStream } from 'vue-qrcode-reader'

    export default {
        components: { QrcodeStream },

        data () {
            console.log('init');
            return {
                paused: false,
                camera: {
                    audio: false
                },
                result: ''
            }
        },

        methods: {
            onDecode (result) {
                this.camera = false;
                $('#app').remove();
                console.log(result);
            }
        }
    }
</script>