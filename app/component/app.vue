<template>
    <div style="width: 300px; height: 500px;" class="main-window">
        <div class="col-md-12 header" style="background-color: #00c4a7; padding: 5px;">
            <h2>{{name}}</h2>
        </div>
        <events></events>
    </div>
</template>

<script>
    import Timer from './countdown.vue';
    import Events from './Events.vue';
    export default {
        data() {
            return {
                name: 'Notificator'
            }
        },
        components: {
            Timer,
            Events
        }
    }
</script>


<stlye>
    .time-picker input.display-time{
        color: black;
    }
</stlye>