<template>
    <div class="qr-code-upload">
        <div class="qr-code-options-separator">OR</div>
        <qrcode-capture @decode="onDecode" />
    </div>
</template>
<script>
    import { QrcodeCapture } from 'vue-qrcode-reader'
    export default {
        components: { QrcodeCapture },
        data () {
            return {
                result: ''
            }
        },
        methods: {
            onDecode (result) {
                $('.send-container .combobox-input').val(result).attr('data-inserted-from-upload', true);
                //$('#app').html('<qr-code></qr-code><qr-code-upload></qr-code-upload>');
            }
        }
    }
</script>
