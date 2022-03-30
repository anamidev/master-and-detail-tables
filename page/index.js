Vue.component('data-table', {
    props: {
        table: {
            type: Object,
            required: true,
        }
    },
    template: `
        <div :style="tableStyle"
             class="wrapped-table">
            <el-table :data="table.data"
                      v-loading="table.loading">
                <el-table-column v-for="header of tableHeaderFormatted"
                                 :prop="header.prop"
                                 :label="header.label"
                                 :min-width="header['min-width']"
                                 :key="header.prop">
                    <template slot-scope="scope">
                        <div :style="cellStyle">
                            <el-button v-if="table.type === 'master' && header.prop === 'id'"
                                       size="mini"
                                       @click="$emit('load-detail-table', scope.row.id)">
                                {{scope.row[header.prop]}}
                            </el-button>
                            <span v-else>
                                {{scope.row[header.prop]}}
                            </span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    `,
    computed: {
        tableStyle() {
            return {
                width: 'fit-content',
            }
        },
        cellStyle() {
            return {
                'word-break': 'break-word',
            }
        },
        tableHeaderFormatted() {
            return this.table.header.reduce((acc, curr) => {
                let object = {};
                object.label = curr.label;
                object.prop = curr.value || curr.prop;
                object['min-width'] = '120';
                acc.push(object)
                return acc;
            }, [])
        }
    },
});

Vue.component('master-and-detail', {
    template: `
        <div id="master-and-detail-wrapper"
                :style="wrapperStyle">
            <div id="master-and-detail-top-table"
                 :style="topTableStyle">
                 <div :style="innerWrapperStyle">
                    <el-button @click="loadMasterTable">
                        <i class="el-icon-refresh"></i>
                        <span>Update data</span>
                    </el-button>
                    <data-table :table="masterTable"
                                @load-detail-table="loadDetailTable">
                    </data-table>
                 </div>
                 <div :style="gripStyle">
                    <div>
                        <i class="el-icon-arrow-up"></i>
                    </div>
                    <div>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                 </div>
            </div>
            <div id="master-and-detail-bottom-table" 
                 :style="innerWrapperStyle">
                <el-button v-if="detailTable.requestParam"
                            @click="loadDetailTable()">
                    <i class="el-icon-refresh"></i>
                    <span>Update data</span>
                </el-button>
                <data-table :table="detailTable">
                </data-table>
            </div>
        </div>
    `,
    data() {
        return {
            masterTable: {
                loading: false,
                type: 'master',
                header: [],
                data: [],
            },

            detailTable: {
                loading: false,
                type: 'detail',
                header: [],
                data: [],
                requestParam: '',
            },
        }
    },
    computed: {
        wrapperStyle() {
            return {
                display: 'flex',
                'flex-direction': 'column',
                height: '100%',
                width: '100%',
            }
        },
        innerWrapperStyle() {
            return {
                border: 'solid black 1px',
                overflow: 'auto',
                height: 'inherit',
            }
        },
        gripStyle() {
            return {
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
            }
        },
        topTableStyle() {
            return {
                'padding-bottom': '32px'
            }
        },
    },
    methods: {
        loadMasterTable() {
            console.log('Request for master is sent...')
            this.masterTable.loading = true;
            setTimeout(() => {
                this.masterTable.header = [
                    {
                        prop: 'id',
                        label: 'ID',
                    },
                    {
                        prop: 'name',
                        label: 'Name',
                    },
                    {
                        prop: 'billing',
                        label: 'Billing',
                    },
                    {
                        prop: 'type',
                        label: 'Type',
                    },
                    {
                        prop: 'status',
                        label: 'Status',
                    },
                    {
                        prop: 'rowAll',
                        label: 'All',
                    },
                    {
                        prop: 'rowOk',
                        label: 'Success',
                    },
                    {
                        prop: 'rowError',
                        label: 'Error',
                    },
                    {
                        prop: 'dateStart',
                        label: 'Start',
                    },
                    {
                        prop: 'dateStop',
                        label: 'Stop',
                    },
                    {
                        prop: 'notes',
                        label: 'Notes',
                    },
                ];
                this.masterTable.data = [
                    {
                        billing: "CELL",
                        dateStart: "06.03.2022 22:18:00",
                        dateStop: "06.03.2022 22:20:02",
                        id: "CELL_7403",
                        name: "Daily email by 05.03.2022",
                        notes: "Sending completed",
                        rowAll: 22,
                        rowError: 0,
                        rowOk: 22,
                        status: "OK",
                        type: "EMAIL_DAILY",
                    },
                    {
                        billing: "CELL",
                        dateStart: "06.03.2022 22:18:00",
                        dateStop: "06.03.2022 22:20:02",
                        id: "CELL_7745",
                        name: "Daily email by 05.03.2022",
                        notes: "Sending completed",
                        rowAll: 22,
                        rowError: 0,
                        rowOk: 22,
                        status: "OK",
                        type: "EMAIL_DAILY",
                    },
                    {
                        billing: "ATOM",
                        dateStart: "11.03.2022 05:00:05",
                        dateStop: "11.03.2022 05:00:40",
                        id: "ATOM_6934",
                        name: "Sending receiving form (date: 21.03.2022)",
                        notes: "Sending completed",
                        rowAll: 1,
                        rowError: 0,
                        rowOk: 1,
                        status: "OK",
                        type: "EMAIL_INFORMATOR",
                    },
                    {
                        billing: "CELL",
                        dateStart: "06.03.2022 22:18:00",
                        dateStop: "06.03.2022 22:20:02",
                        id: "CELL_5924",
                        name: "Daily email by 05.03.2022",
                        notes: "Sending completed",
                        rowAll: 22,
                        rowError: 0,
                        rowOk: 22,
                        status: "OK",
                        type: "EMAIL_DAILY",
                    },
                    {
                        billing: "CELL",
                        dateStart: "06.03.2022 22:18:00",
                        dateStop: "06.03.2022 22:20:02",
                        id: "CELL_9275",
                        name: "Daily email by 05.03.2022",
                        notes: "Sending completed",
                        rowAll: 22,
                        rowError: 0,
                        rowOk: 22,
                        status: "OK",
                        type: "EMAIL_DAILY",
                    },
                    {
                        billing: "ATOM",
                        dateStart: "11.03.2022 05:00:05",
                        dateStop: "11.03.2022 05:00:40",
                        id: "ATOM_1154",
                        name: "Sending receiving form (date: 21.03.2022)",
                        notes: "Sending completed",
                        rowAll: 1,
                        rowError: 0,
                        rowOk: 1,
                        status: "OK",
                        type: "EMAIL_INFORMATOR",
                    },
                    {
                        billing: "CELL",
                        dateStart: "06.03.2022 22:18:00",
                        dateStop: "06.03.2022 22:20:02",
                        id: "CELL_3786",
                        name: "Daily email by 05.03.2022",
                        notes: "Sending completed",
                        rowAll: 22,
                        rowError: 0,
                        rowOk: 22,
                        status: "OK",
                        type: "EMAIL_DAILY",
                    },
                    {
                        billing: "ATOM",
                        dateStart: "11.03.2022 05:00:05",
                        dateStop: "11.03.2022 05:00:40",
                        id: "ATOM_8876",
                        name: "Sending receiving form (date: 21.03.2022)",
                        notes: "Sending completed",
                        rowAll: 1,
                        rowError: 0,
                        rowOk: 1,
                        status: "OK",
                        type: "EMAIL_INFORMATOR",
                    }
                ];
                this.masterTable.loading = false;
                console.log('Response received! Master table data')
            }, 1000);
        },
        loadDetailTable(requestParam) {
            if (requestParam) {
                this.detailTable.requestParam = requestParam;
            }
            console.log(`Request for detail is sent... with ${requestParam} param`);
            this.detailTable.loading = true;
            setTimeout(() => {
                let testDataCollection = {
                    'CELL_7403' : {
                        header: [
                            {label: "Account No", value: "accountNo"},
                            {label: "Company Name", value: "companyName"},
                            {label: "INN", value: "inn"},
                            {label: "Print Date", value: "printDate"},
                            {label: "Print Status", value: "printStatus"},
                            {label: "Email", value: "email"},
                            {label: "Error", value: "error"},
                        ],
                        data: [{
                            accountId: "1111",
                            accountNo: "UI1234",
                            companyName: "Triple AAA company",
                            email: "3pleaaa@mail.com",
                            error: "",
                            inn: "11-456-789",
                            printDate: "17.03.2022 05:00:44",
                            printStatus: "OK",
                        }],
                    },
                    'CELL_7745': {
                        header: [
                            {label: "Account No", value: "accountNo"},
                            {label: "Company Name", value: "companyName"},
                            {label: "INN", value: "inn"},
                            {label: "Print Date", value: "printDate"},
                            {label: "Print Status", value: "printStatus"},
                            {label: "Email", value: "email"},
                            {label: "Error", value: "error"},
                        ],
                        data: [
                            {
                                accountId: "1111345",
                                accountNo: "UI1234555",
                                companyName: "Squarix",
                                email: "squarix@mail.com",
                                error: "",
                                inn: "12-789-765",
                                printDate: "23.08.2019 05:00:00",
                                printStatus: "OK",
                            },
                            {
                                accountId: "1111345",
                                accountNo: "UI1234555",
                                companyName: "Quils",
                                email: "quils@mail.com",
                                error: "",
                                inn: "12-789-222",
                                printDate: "16.04.2021 14:24:44",
                                printStatus: "OK",
                            }
                        ],
                    },
                    'ATOM_6934': {
                        header: [
                            {label: "Account No", value: "accountNo"},
                            {label: "Company Name", value: "companyName"},
                            {label: "INN", value: "inn"},
                            {label: "Print Date", value: "printDate"},
                            {label: "Print Status", value: "printStatus"},
                            {label: "Email", value: "email"},
                            {label: "Error", value: "error"},
                        ],
                        data: [],
                    },
                    'CELL_5924':{
                        header: [
                            {label: "Account No", value: "accountNo"},
                            {label: "Company Name", value: "companyName"},
                            {label: "INN", value: "inn"},
                            {label: "Print Date", value: "printDate"},
                            {label: "Print Status", value: "printStatus"},
                            {label: "Email", value: "email"},
                            {label: "Error", value: "error"},
                        ],
                        data: [],
                    },
                    'CELL_9275':{
                        header: [
                            {label: "Account No", value: "accountNo"},
                            {label: "Bill No", value: "billNo"},
                            {label: "Bill Date", value: "billDate"},
                            {label: "Period", value: "repPeriodId"},
                            {label: "Company name", value: "companyName"},
                            {label: "INN", value: "inn"},
                            {label: "Print date", value: "printDate"},
                            {label: "Print status", value: "printStatus"},
                            {label: "Files", value: "files"},
                            {label: "Email", value: "email"},
                            {label: "Error", value: "error"},
                        ],
                        data: [
                            {
                                accountId: "224455",
                                accountNo: "112233",
                                billDate: "28.02.2022",
                                billNo: "11-44556677",
                                companyName: "Toolbox Inc",
                                error: "",
                                inn: "14-141454",
                                printDate: "02.03.2022 13:24:59",
                                printStatus: "OK",
                                repPeriodId: "202202",
                            },
                            {
                                accountId: "22445566",
                                accountNo: "11223366",
                                billDate: "23.01.2022",
                                billNo: "11-4455667788",
                                companyName: "Melody Atomic",
                                error: "",
                                inn: "14-141434",
                                printDate: "02.03.2022 13:24:59",
                                printStatus: "OK",
                                repPeriodId: "202101",
                            }
                        ],
                    },
                    'ATOM_1154':{
                        header: [
                            {label: "Account No", value: "accountNo"},
                            {label: "Bill No", value: "billNo"},
                            {label: "Bill Date", value: "billDate"},
                            {label: "Period", value: "repPeriodId"},
                            {label: "Company name", value: "companyName"},
                            {label: "INN", value: "inn"},
                            {label: "Print date", value: "printDate"},
                            {label: "Print status", value: "printStatus"},
                            {label: "Files", value: "files"},
                            {label: "Email", value: "email"},
                            {label: "Error", value: "error"},
                        ],
                        data: [{
                            accountId: "22445566",
                            accountNo: "11223366",
                            billDate: "26.04.2021",
                            billNo: "11-4455667788",
                            companyName: "Melody Atomic",
                            error: "",
                            inn: "14-141434",
                            printDate: "26.04.2021 13:24:59",
                            printStatus: "OK",
                            repPeriodId: "202101",
                        }],
                    },
                    'CELL_3786':{
                        header: [
                            {label: "Account No", value: "accountNo"},
                            {label: "Bill No", value: "billNo"},
                            {label: "Bill Date", value: "billDate"},
                            {label: "Period", value: "repPeriodId"},
                            {label: "Company name", value: "companyName"},
                            {label: "INN", value: "inn"},
                            {label: "Print date", value: "printDate"},
                            {label: "Print status", value: "printStatus"},
                            {label: "Files", value: "files"},
                            {label: "Email", value: "email"},
                            {label: "Error", value: "error"},
                        ],
                        data: [
                            {
                                accountId: "8765432",
                                accountNo: "6543",
                                billDate: "28.02.2020",
                                billNo: "11998877",
                                companyName: "Triplex",
                                error: "",
                                inn: "33533633",
                                printDate: "02.03.2020 13:23:01",
                                printStatus: "OK",
                                repPeriodId: "201901",
                            },
                            {
                                accountId: "8765432",
                                accountNo: "6543",
                                billDate: "27.01.2019",
                                billNo: "11998877",
                                companyName: "Triplex",
                                error: "",
                                inn: "33533633",
                                printDate: "28.01.2019 16:23:19",
                                printStatus: "OK",
                                repPeriodId: "201901",
                            }
                        ],
                    },
                    'ATOM_8876': {
                        header: [
                            {label: "Account No", value: "accountNo"},
                            {label: "Bill No", value: "billNo"},
                            {label: "Bill Date", value: "billDate"},
                            {label: "Period", value: "repPeriodId"},
                            {label: "Company name", value: "companyName"},
                            {label: "INN", value: "inn"},
                            {label: "Print date", value: "printDate"},
                            {label: "Print status", value: "printStatus"},
                            {label: "Files", value: "files"},
                            {label: "Email", value: "email"},
                            {label: "Error", value: "error"},
                        ],
                        data: [],
                    },
                };

                this.detailTable.header = testDataCollection[this.detailTable.requestParam].header;
                this.detailTable.data = testDataCollection[this.detailTable.requestParam].data;
                this.detailTable.loading = false;
                console.log('Response received! Detail table data')
            }, 1000);
        },
    },
    mounted() {
        this.loadMasterTable();
        $( "#master-and-detail-top-table" ).resizable({
            handles: 's',
            containment: $('#master-and-detail-wrapper').parent(),
            resize: function() {
                $("#master-and-detail-bottom-table").outerHeight($("#master-and-detail-wrapper").innerHeight() - $("#master-and-detail-top-table").outerHeight());
            },
            minHeight: 0,
        });
        const grip = $('#master-and-detail-wrapper .ui-resizable-s');
        grip.css({
            bottom: '-1px',
            height: '32px',
        });
        const topTableHeight = ($("#master-and-detail-wrapper").height() - grip.height()) / 2;
        $('#master-and-detail-top-table').height(topTableHeight);
        $('.wrapped-table .el-table__empty-text').css({
            'word-break': 'normal',
        });
    },
});

const app = new Vue({
    el: '#app',
    data: {
        dialogVisible: false,
    }
});
