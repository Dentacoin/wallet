<template>
    <div>
        <qrcode-stream @decode="onDecode" :paused="paused" :camera="camera" @init="$emit('init', $event)"/>
    </div>
</template>
<script>

    import { QrcodeStream } from 'vue-qrcode-reader'

    export default {
        components: { QrcodeStream },
        data () {
            var this_template = this;
            $('.scan-qr-code-popup .custom-close-button').click(function()  {
                this_template.paused = true;
                this_template.camera = false;
                $('.scan-qr-code-popup').removeClass('visible-popup');
                $('#app').html('<qr-code></qr-code>');
            });
            return {
                paused: false,
                camera: {
                    audio: false,
                    video: {
                        facingMode: 'user'
                    }
                }
            }
        },
        methods: {
            onDecode (result) {
                this.paused = true;
                this.camera = false;
                $('.send-container .combobox-input').val(result);
                $('.scan-qr-code-popup').removeClass('visible-popup');
                $('#app').html('<qr-code></qr-code>');
                //closeScaningPopup(this);
            }
        }
    }
</script>