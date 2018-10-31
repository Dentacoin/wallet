<template>
    <div>
        <p>You can also allow users to choose the front or rear camera on their
            device.</p>

        <qrcode-stream :camera="camera" @init="$emit('init', $event)">
            <button class="btn btn-secondary btn-lg switch-button" @click="switchCamera">
                <i class="fa fa-camera"></i> Switch
            </button>
        </qrcode-stream>
    </div>
</template>

<script>
    import { QrcodeStream } from 'vue-qrcode-reader'
    export default {
        components: { QrcodeStream },
        data () {
            return {
                useRearCamera: true
            }
        },
        computed: {
            camera () {
                if (this.useRearCamera) {
                    return {
                        facingMode: { ideal: 'environment' }
                    }
                } else {
                    return {
                        facingMode: { exact: 'user' }
                    }
                }
            }
        },
        methods: {
            switchCamera () {
                this.useRearCamera = !this.useRearCamera
            }
        }
    }
</script>

<style scoped>
    .switch-button {
        position: absolute;
        left: 10px;
        top: 10px;
    }
</style>