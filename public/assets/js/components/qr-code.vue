<template>
    <div>
        <qrcode-stream @decode="onDecode" @init="onInit" :paused="paused" :camera="camera"/>
    </div>
</template>
<script>
    function closePopupLogic()  {
        $('.scan-qr-code-popup').removeClass('visible-popup');
        $('body').removeClass('overflow-hidden');
        $('#app').html('<qr-code class="qr-code-container"></qr-code><qr-code-upload class="qr-code-upload-container"></qr-code-upload>');
    }

    import { QrcodeStream } from 'vue-qrcode-reader'
    export default {
        components: { QrcodeStream },
        data () {

            var this_template = this;
            setInterval(function()  {
                if($('.send-container .combobox-input').attr('data-inserted-from-upload') == 'true')    {
                    this_template.paused = true;
                    this_template.camera = false;
                    closePopupLogic();
                    $('.send-container .combobox-input').attr('data-inserted-from-upload', false);
                    $('.send-container .next a').addClass('active');
                }
            }, 100);

            $('.scan-qr-code-popup .custom-close-button').click(function()  {
                this_template.paused = true;
                this_template.camera = false;
                closePopupLogic();
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
                $('.send-container .next a').addClass('active');
                closePopupLogic();
            },
            async onInit (promise) {
                try {
                    await promise
                } catch (error) {
                    this.openError(error)
                }
            },

            openError (error) {
                //HIDE CAMERA CONTAINER
                $('.qr-code-upload-container').addClass('lonely');
                $('#app .qr-code-container').remove();
                /*if (error.name === 'NotAllowedError') {
                    console.log('To detect and decode QR codes this page needs access to your camera')
                } else if (error.name === 'NotFoundError') {
                    console.log('Seems like you have no suitable camera on your device.')
                } else if (error.name === 'NotSupportedError') {
                    console.log('Seems like this page is served in non-secure context. Your browser doesn\'t support that')
                } else if (error.name === 'NotReadableError') {
                    console.log('Couldn\'t access your camera. Is it already in use?')
                } else if (error.name === 'OverconstrainedError') {
                    console.log('Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?')
                } else {
                    console.log('UNKNOWN ERROR: ' + error.message)
                    console.error(error)
                }*/
            }
        }
    }
</script>