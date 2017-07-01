<template>
    <div>
        <ul class="list-group">
            <template v-for="task in tasks">
                <li class="list-group-item">{{ task.shortDescription }}
                    <span class="label label-default">
                        <countdown :finished="getMomentCurrentTask(task)"></countdown>
                    </span>
                    <span @click="deleteItem(task)" class="pull-right text-muted" style="cursor:pointer">delete</span>
                </li>
            </template>
        </ul>

        <template v-if="btnAdd !== true">
            <button @click="btnAdd = true" class="btn btn-primary">Add</button>
        </template>

        <template v-if="btnAdd">
            <div class="panel panel-time">
                <h3>New Task</h3>
                <label>Short Description</label>
                <input v-model="newTask.shortDescription" type="text" class="form-control">
                <label>Time</label>
                <vue-timepicker v-model="newTask.dateTime" hide-clear-button></vue-timepicker>
                <button @click="createTask" class="btn btn-sm btn-success">Create</button>
            </div>
        </template>

        <simplert isUseRadius="true"
                  isUseIcon="true"
                  ref="simplert">
        </simplert>
    </div>
</template>

<script>

    import Countdown from './countdown.vue';
    import VueTimepicker from 'vue2-timepicker';
    import moment from 'moment';
    import Simplert from './SimplertFixed.vue'

    const defaultAlert = {
        title: '',
        message: '',
        type: 'info',
    }
    const defaultSchemaTask = {
        shortDescription: '',
        dateTime: {
            HH: "10",
            mm: "05",
            ss: "00",
        }
    };

    export default {
        mounted(){
            this.getTasks();
        },
        data(){
            return {
                alert: defaultAlert,
                startDatetime: moment(),
                btnAdd: false,
                tasks: [],
                newTask: {...defaultSchemaTask}
            }
        },
        components: {
            Countdown,
            VueTimepicker,
            Simplert
        },
        methods: {
            notification() {
                chrome.notifications.create('reminder', {
                    type: 'basic',
                    iconUrl: 'http://downloadicons.net/sites/default/files/png-icon-23704.png',
                    title: 'Don\'t forget!',
                    message: 'You have  things to do. Wake up, dude!'
                }, function (notificationId) {
                });
            },
            createTask(){
                if(!this.validateTask(this.newTask))
                    return false;
                this.tasks.push({...this.newTask});
                this.btnAdd = false;
                this.updateStorage();
                this.$refs.simplert.openSimplert({...this.alert, title: this.newTask.shortDescription + ' created'})
                this.newTask = {...defaultSchemaTask};
                console.log(this.newTask);
            },
            validateTask(task){
                if (task.shortDescription == '') {
                    this.$refs.simplert.openSimplert({
                        ...this.alert,
                        title: "warning",
                        message: 'description require',
                        type: "warning"
                    });
                    return false;
                }
                return true;
            },
            updateStorage() {
                let tasks = JSON.stringify(this.tasks);
                localStorage.setItem('tasks', tasks);
            },
            deleteItem(task){
                this.tasks = this.tasks.filter((item) => {
                    return item != task;
                });
                this.updateStorage();
                this.$refs.simplert.openSimplert({...this.alert, title: task.shortDescription + ' deleted'})

            },
            getTasks() {
                let payload = JSON.parse(localStorage.getItem('tasks'));

                if(payload)
                    this.tasks = JSON.parse(localStorage.getItem('tasks'));
            },
            getMomentCurrentTask(task)
            {
                return moment().hour(task.dateTime.HH).minutes(task.dateTime.mm).seconds(task.dateTime.ss);
            }
        }
    }
</script>