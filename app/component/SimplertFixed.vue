<template>
    <div class="simplert" role="modal" :class="classSimplert" @click="closeOverlay">
        <div class="simplert__content" :class="classContent">
            <div class="simplert__header">
                <div v-if="useIcon">
                    <div class="simplert__icon simplert__icon--info" v-if="type === 'info'">
                        <div class="simplert__line simplert__line--info">
                        </div>
                        <div class="simplert__line simplert__line--info-2">
                        </div>
                    </div>
                    <div class="simplert__icon simplert__icon--success" v-if="type === 'success'">
                        <div class="simplert__line simplert__line--success">
                        </div>
                        <div class="simplert__line simplert__line--success-2">
                        </div>
                    </div>
                    <div class="simplert__icon simplert__icon--warning" v-if="type === 'warning'">
                        <div class="simplert__line simplert__line--warning">
                        </div>
                        <div class="simplert__line simplert__line--warning-2">
                        </div>
                    </div>
                    <div class="simplert__icon simplert__icon--error" v-if="type === 'error'">
                        <div class="simplert__line simplert__line--error">
                        </div>
                        <div class="simplert__line simplert__line--error-2">
                        </div>
                    </div>
                    <div class="simplert__icon" v-if="customIconUrl !== ''">
                        <img :src="customIconUrl" />
                    </div>
                </div>
                <b class="simplert__title">{{ title }}</b>
            </div>
            <div class="simplert__body">
                <div v-html="message"></div>
            </div>
            <div class="simplert__footer">
                <button class="simplert__confirm" v-if="useConfirmBtn && !hideAllButton" :class="classBtnConfirm" @click="whenConfirm">
                    {{ customConfirmBtnText }}
                </button>
                <button class="simplert__close" :class="classBtnClose" v-if="!hideAllButton" @click="closeSimplert">
                    {{ customCloseBtnText }}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import simplert from 'vue2-simplert/src/components/simplert/simplert.js';
    export default simplert;
</script>
