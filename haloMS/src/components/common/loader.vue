<template>
    <div class="loadFile">
        <el-upload
                class="upload-button"
                action=""
                :on-change="fileUpload"
                :accept="fileExpect"
                :show-file-list="false"
                :auto-upload="false"
                v-if="loadName">
            <el-button type="primary" :loading="isUploadingClassExcel">
                <slot name="upload">导入</slot>
            </el-button>
        </el-upload>
        <a id="downlink"></a>
        <el-button
                class="fp-btn-default"
                @click="downloadFile(arrData,'sample')"
                :loading="isDownloadingClassExcel"
                v-if="sampleName">
            下载模版
        </el-button>
        <el-button @click="downloadFile(exportData,'export')" v-if="exportName">
            <slot name="export">导出</slot>
        </el-button>
    </div>
</template>
<script>
    import _ from 'lodash';
    import {headerMapping, analyzeData, dealFile} from 'util';
    import XLSX from 'xlsx';


    export default{
        name:"loadFile",
        props: {
            loadName: {//上传名称
                type: String
            },
            fileSize: {//文件最大容量(M)
                type: [Number, String],
                default: 20
            },
            fileType: {//文件支持格式
                type: Array,
                default: () => ['.xls', '.xlsx']
            },
            sampleName: {//模板名称
                type: String
            },
            exportName: {//导出名称
                type: String
            },
            dealName: {//处理模板名称
                type: String,
                default: "exceptNull"
            },
            analyzeName: {//解析模板名称
                type: String,
                default: "mapHeader"
            },
            exportData:{//导出数据
                type:Array,
                default:() => []
            },
            headMapping:{//表头映射表
                type:Array
            }
        },
        data(){
            return {
                outFile: '',
                fileExpect: '',
                arrData: [],
                downloadType: ''
            }
        },
        methods: {
            fileUpload(file) { //上传文件
                const target = file;
                let fileSize = 0;
                let filepath = target.name
                let filemaxsize = 1024 * this.fileSize;
                if (filepath) {//判断文件类型
                    let isnext = false;
                    let fileend = filepath.substring(filepath.indexOf("."));
                    if (this.fileType && this.fileType.length > 0) {
                        for (let i = 0, j = this.fileType.length; i < j; i++) {
                            if (this.fileType[i] == fileend) {
                                isnext = true;
                                break;
                            }
                        }
                    }
                    if (!isnext) {
                        this.$message({
                            showClose: false,
                            message: '文件类型错误',
                            type: 'error'
                        });
                        target.value = "";
                        return false;
                    }
                } else {
                    return false;
                }

                fileSize = target.size;
                let size = fileSize / 1024;
                if (size > filemaxsize) {//判断文件大小
                    this.$message({
                        showClose: false,
                        message: "附件大小不能大于" + this.fileSize + "M ！",
                        type: 'error'
                    });
                    target.value = "";
                    return false;
                }
                if (size <= 0) {//判空
                    this.$message({
                        showClose: false,
                        message: "文件不能为空",
                        type: 'error'
                    });
                    target.value = "";
                    return false;
                }

                let reader = new FileReader();
                reader.onload = (e) => {
                    let data = e.target.result;
                    let wb = XLSX.read(data, {type: 'binary'});
                    let json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    let result = dealFile(this.dealName, analyzeData(this.analyzeName, json, this.headMapping)); //导入处理后返回的结果【analyzeData：解析内容；dealFile：处理内容】
                    if (result.error) {
                        this.$message({
                            showClose: false,
                            message: result.msg,
                            type: 'error'
                        });
                    } else {
                        this.$emit('uploadResult', result);
                    }
                }
                reader.readAsBinaryString(file.raw);
            },
            downloadFile(rs, downloadType) { // 点击导出按钮
                let data = [{}];
                for (let k in rs[0]) {
                    data[0][k] = k;
                }
                data = data.concat(rs);

                let downName = this.exportName;
                this.downloadType = this.exportName;
                if (downloadType === 'sample') {
                    this.downloadType = this.sampleName;
                    downName = this.sampleName + 'Sample';
                }
                this.downloadExl(data, downName);
            },
            downloadExl(json, downName, type) {  // 导出到excel
                const headMapping = this.headerMapping;
                let keyMap = [] // 获取键
                for (let k in json[0]) {
                    keyMap.push(k);
                }
                let tmpdata = []; // 用来保存转换好的json
                json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                    v: v[k],
                    position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
                }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
                    tmpdata[v.position] = {
                        v: v.v
                    }
                })
                _.each(this.headMapping, (item, index) => {//表头mapping
                    let i = this.getCharCol(index) + '1';
                    tmpdata[i] = {v: item.header};
                });

                let outputPos = Object.keys(tmpdata);  // 设置区域,比如表格从A1到D10
                let tmpWB = {
                    SheetNames: ['Sheet1'], // 保存的表标题
                    Sheets: {
                        'Sheet1': Object.assign({},
                                tmpdata, // 内容
                                {
                                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
                                })
                    }
                };
                let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
                        {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
                ))], {
                    type: ''
                });  // 创建二进制对象写入转换好的字节流

                let href = URL.createObjectURL(tmpDown);  // 创建对象超链接
                this.outFile.download = downName + '.xlsx'; // 下载名称
                this.outFile.href = href;  // 绑定a标签
                this.outFile.click();  // 模拟点击实现下载
                setTimeout(function () {  // 延时释放
                    URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
                }, 100)
            },
            s2ab (s) { // 字符串转字符流
                let buf = new ArrayBuffer(s.length);
                let view = new Uint8Array(buf);
                for (let i = 0; i !== s.length; ++i) {
                    view[i] = s.charCodeAt(i) & 0xFF;
                }
                return buf;
            },
            getCharCol(n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
                let s = '';
                let m = 0;
                while (n >= 0) {
                    m = n % 26 + 1;
                    s = String.fromCharCode(m + 64) + s;
                    n = (n - m) / 26;
                }
                return s;
            },
        },
        mounted(){
            this.fileExpect = this.fileType.join(',');//用于el-upload限制上传文件类型
            this.outFile = document.getElementById('downlink');
        }
    }
</script>
<style lang="less">
    .loadFile {

    .upload-button {
        display: inline-block;
        margin-right: 12px;
    }

    }
</style>
