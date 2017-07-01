<template>
    <div class="block">
        <template v-if="duration !== null">
            <span>
                {{ duration.hours }} :
                {{ duration.minutes }} :
                {{ duration.seconds }}
                <br>
                {{ hash }}
            </span>
        </template>

        <template v-if="error">
            <span style="color: red;">
                {{error}}
            </span>
        </template>
    </div>
</template>

<script>
    import moment from 'moment'

    const defaultDuration = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    export default {
        props: ['date'],
        mounted(){
            this.timeNotification = moment(date);
            setInterval(() => {
                this.updateDuration()
            }, 500)
        },
        data() {
            return {
                timeNotification: moment().add(3, 'days'),
                duration: defaultDuration,
                error: null,
                hash: 'empty-',
            }
        },
        methods: {
            updateDuration() {
                const diff = moment(this.timeNotification).diff(moment(), 'seconds');
                const duration = moment.duration(diff, 'seconds');

                this.duration = {
                    hours: this.formatNumber((duration.days() * 24) + duration.hours()),
                    minutes: this.formatNumber(duration.minutes()),
                    seconds: this.formatNumber(duration.seconds()),
                };
                this.hash = 'random-' + diff
            },
            formatNumber(number) {
                if (number > 9)
                    return number;
                return '0' + number;
            },
        }
    }
</script>