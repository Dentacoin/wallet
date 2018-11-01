<template>
    <div class="qr-code-upload">
        <div class="qr-code-options-separator">OR</div>
        <div class="qr-code-options-title">Upload QR code:</div>
        <label class="white-blue-btn" for="hide-vue-btn">Upload QR Code</label>
        <div class="hide-vue-btn">
            <qrcode-capture @decode="onDecode" @init="onInit"/>
        </div>
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
            },
            async onInit (promise) {
                console.log('haha');
                setTimeout(function()   {
                    $('.hide-vue-btn input[type="file"]').attr('id', 'hide-vue-btn');
                }, 300);
            },
        }
    }
</script>
