<template>
    <div class="qr-code-upload">
        <div class="qr-code-options-separator">OR</div>
        <div class="qr-code-options-title">Upload QR code:</div>
        <label class="white-blue-btn" for="hide-vue-btn">Upload QR Code</label>
        <div class="hide-vue-btn">
            <qrcode-capture @decode="onDecode"/>
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
            }
        }
    }

    var adding_id_interval = setInterval(function() {
        if($('.hide-vue-btn input[type="file"]').length > 0 && $('.hide-vue-btn input[type="file"]').attr('id') != 'hide-vue-btn')  {
            $('.hide-vue-btn input[type="file"]').attr('id', 'hide-vue-btn');
            clearImmediate(adding_id_interval);
        }
    }, 300);
</script>
