<template>
    <span>
        <template v-if="duration !== null">
            <span>
                {{ duration.hours }} :
                {{ duration.minutes }} :
                {{ duration.seconds }}
            </span>
        </template>
    </span>
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
        props: ['finished'],
        mounted(){
            this.timeNotification = moment(this.finished);
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
            },
            formatNumber(number) {
                if (number > 9)
                    return number;
                return '0' + number;
            },
        }
    }
</script>