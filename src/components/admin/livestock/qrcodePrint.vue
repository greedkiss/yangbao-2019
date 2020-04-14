<template>
    <div  class="admin-form">
        <p class="card-title">二维码打印</p>
        <div class="card" >
            <p class="card-title" >单个二维码打印</p>

            <div class="border-main">
                <div class="time">
                    <span class="time-span ellipse">单个{{label}}</span>
                    <el-input  size="small" v-model="earTag"></el-input>
                </div>
                <el-button type="primary" size="small" @click.prevent="printCode(earTag)">打印</el-button>
            </div>
        </div>
        <div class="card" >
            <p class="card-title" >连续二维码打印</p>

            <div class="border-main">
                <div class="time">
                    <span class="time-span ellipse">起始{{label}}</span>
                    <el-input  size="small" v-model="earTagStart"></el-input>
                </div>
                <div class="time" style="margin-left:-40px">
                    <span class="time-span ellipse">终止{{label}}</span>
                    <el-input  size="small" v-model="earTagEnd"></el-input>
                </div>
                <el-button 
                type="primary" 
                size="small" 
                @click.prevent="printCode(earTagStart,earTagEnd)">打印</el-button>
            </div>
        </div>
        <div v-show="false"  id="qrcode1" class="qrcode" ref="qrcode"></div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { isReqSuccessful } from '@/util/jskit'
import { getUserById} from '@/util/getdata'
export default {
    data () {
        return {
            earTag:null,
            earTagStart:null,
            earTagEnd:null,
            codeNumber:null,
            qrcodeimgs:[],
            fullscreenLoading: false,
            label: ''
        }
    },
    mounted() {
        let path = this.$route.path;
        if(path.indexOf('/livestock')!==-1) {
            this.label = '耳牌号';
        } else if(path.indexOf('/shop')!==-1) {
            this.label = '出品码';
        } else {
            this.label = '产品码';
        }
    },
    methods: {
        async printCode(start,end){
            if(arguments.length===1){
                this.qrcodeimgs=[];
                this.codeNumber=start;
                let urlCode=`http://yunyangbao.cn/#/mS?eT=${this.codeNumber}`
                document.getElementById("qrcode1").innerHTML = "";
                //异步，等待结果
                await this.waitqr(urlCode);
                let src=document.getElementById("qrcode1").children[1].getAttribute("src");
                let docStr=
                `<div style="page-break-after:always; width:100px"><canvas height="300" style="display: none;"></canvas><div style="margin-top:-5px; text-align:center"><img alt="Scan me!" src="${src}"style="display: block;" width="95"><p style="font-size:10px; transform:scale(0.6,0.6);margin-top:-5px">${this.codeNumber}</p></div>`;
                var newWindow=window.open("打印窗口","_blank");			
                newWindow.document.write(docStr);
                var styles=document.createElement("style");
                styles.setAttribute('type','text/css');//media="print";
                styles.innerHTML="" ;
                newWindow.document.getElementsByTagName('head')[0].appendChild(styles);
                newWindow.print();
                newWindow.close();
            }
            else if(arguments.length===2){
                if(start===null&&end===null){
                    return
                }
                if(start!==null&&end===null){
                    this.$message.warning('请完善表格！')
                    return //输入不能为空
                }
                if(start===null&&end!==null){
                    this.$message.warning('请完善表格！')
                    return
                }
                if(start==''||end==''){
                    this.$message.warning('请完善表格！')
                    return
                }
                let startNum = parseInt(start.replace(/[^0-9]/ig, ""))||null;
                let endNum = parseInt(end.replace(/[^0-9]/ig, ""))||null;
                let letter = start.replace(/[^a-z]/ig,"")||null;
                if(startNum!==null&&endNum!==null&&letter!==null){
                    //输入的必须是字母与数字的组合
                    if(startNum>=endNum){
                        this.$message.warning('起始耳牌必须小于终止耳牌！')
                        return
                    }
                    const loading = this.$loading({
                        lock: true,
                        text: '正在加载二维码，请稍后！',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.qrcodeimgs=[];//重置二维码地址数组
                    for(let i=startNum;i<=endNum;i++){
                        this.codeNumber= letter+i
                        let urlCode=`http://yunyangbao.cn/#/mS?eT=${this.codeNumber}`
                        document.getElementById("qrcode1").innerHTML = "";
                        //异步，等待结果
                        await this.waitqr(urlCode);
                        let o={
                            src:document.getElementById("qrcode1").children[1].getAttribute("src"),
                            codeNumber:this.codeNumber
                        }
                        this.qrcodeimgs.push(o);//将每一个二维码地址以及编号推入数组中
                    }
                    loading.close();
                    let newWindow=window.open("打印窗口","_blank");		
                    //并发执行所有的waitDocument函数，提高效率
                    const promises = this.qrcodeimgs.map((qrcodeimg) => this.waitDocument(newWindow , qrcodeimg.src , qrcodeimg.codeNumber))
                    Promise.all(promises).then(res => {
                        var styles=document.createElement("style");
                        styles.setAttribute('type','text/css');//media="print";
                        styles.innerHTML="" ;
                        newWindow.document.getElementsByTagName('head')[0].appendChild(styles);
                        newWindow.print();
                        newWindow.close();
                    })
                    //下面这种是继发调用，速度很慢
                    // for(let j=0;j<this.qrcodeimgs.length;j++){
                    //     await this.waitDocument(newWindow,this.qrcodeimgs[j].src,this.qrcodeimgs[j].codeNumber);
                    // }
                    // var styles=document.createElement("style");
                    // styles.setAttribute('type','text/css');//media="print";
                    // styles.innerHTML="" ;
                    // newWindow.document.getElementsByTagName('head')[0].appendChild(styles);
                    // newWindow.print();
                    // newWindow.close();
                }
                else{
                    this.$message.warning('请输入正确的耳牌号，字母与数字的组合！')
                    return
                }
            }

		},

		//获取二维码
		waitqr(codeNumber){
                //先调用qrcode,生成二维码，然后0.01秒之后返回成功
				this.qrcode(codeNumber)
				return new Promise((resolve)=>{
					setTimeout(resolve,10)
				});
            },
        waitDocument(thisWindow,src,number){
            let docStr=`<div style="page-break-after:always; width:100px"><canvas height="300" style="display: none;"></canvas><div style="margin-top:-5px; text-align:center"><img alt="Scan me!" src="${src}"style="display: block;" width="95"><p style="font-size:10px; transform:scale(0.6,0.6);margin-top:-5px"">${number}</p></div></div>`
            thisWindow.document.write(docStr);
            return new Promise((resolve)=>{
					setTimeout(resolve,10)
				});
        },
		qrcode (codeNumber) {
			let qrcode = new QRCode(this.$refs.qrcode, {
			width: 300,
			height:300,
			text: codeNumber
			})
      },

    },
}
</script>
<style  scoped lang="stylus">
    .el-icon-right
        font-size 20px
</style>