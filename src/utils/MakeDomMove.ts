import { throttle } from 'utils/common';

type InType = HTMLElement | Element | string | null
interface Options {
    isLazy?: Boolean,//是否节流
    waitTime?: number//间隔时间
}

class MakeDomMove {
    public father: HTMLElement;//父元素dom
    public child: HTMLElement;//子元素dom
    private options: Options;//其他参数，如防抖节流
    private isMousedown: Boolean;//是否按下鼠标
    private orignX: number;//起始x位置
    private orignY: number;//起始y位置
    private minLeft: number;//最小left
    private maxLeft: number;//最大left
    private minTop: number;//最小top
    private maxTop: number;//最大top
    constructor(father: InType, child: InType, options?: Options) {//父元素、子元素、其他参数
        this.father = father ? this.getParam(father) : document.body;
        this.child = this.getParam(child);
        this.options = options;
        this.checkStyle();
        let fbcr = this.father.getBoundingClientRect();
        let cbcr = this.child.getBoundingClientRect();
        this.minLeft = this.child.offsetLeft - (cbcr.left - fbcr.left);
        this.maxLeft = (fbcr.left + fbcr.width) - (cbcr.left - this.child.offsetWidth) - cbcr.width;
        this.minTop = this.child.offsetTop - (cbcr.top - fbcr.top);
        this.maxTop = (fbcr.top + fbcr.height) - (cbcr.top - this.child.offsetHeight) - cbcr.height;
    }
    private getParam(dom: InType): HTMLElement {//获取dom
        if(typeof dom === 'string') {
            let domResult = document.querySelector(dom);
            if(domResult !== null) {
                return domResult as HTMLElement;
            } else {
                throw new Error(`找不到对应DOM：${dom}`);
            }
        } else if(isObject(dom)) {
            return dom as HTMLElement;
        } else {
            throw new Error(`找不到对应DOM：${dom}`);
        }
    }
    private checkStyle() {//检查样式是否符合
        let cPosition = getComputedStyle(this.child)?.position;
        if(cPosition !== 'absolute') this.child.style.position = 'absolute';
    }
    private mousedownEvent(e: MouseEvent) {
        this.isMousedown = true;
        this.orignX = e.clientX - this.child.offsetLeft;
        this.orignY = e.clientY - this.child.offsetTop;
    }
    private mousemoveEvent(e: MouseEvent) {
        if(this.isMousedown) {
            let left = e.clientX - this.orignX;
            let top = e.clientY - this.orignY;
            if(left < this.minLeft) {
                left = this.minLeft;
                this.isMousedown = false;
            } else if(left > this.maxLeft) {
                left = this.maxLeft;
                this.isMousedown = false;
            }
            if(top < this.minTop) {
                top = this.minTop;
                this.isMousedown = false;
            } else if(top > this.maxTop) {
                top = this.maxTop;
                this.isMousedown = false;
            }
            this.child.style.left = left + 'px';
            this.child.style.top = top + 'px';
        }
    }
    private mouseupEvent(e: MouseEvent) {
        this.isMousedown = false;
        this.orignX = e.offsetX;
        this.orignY = e.offsetY;
    }
    public makeMove() {//移动
        let { isLazy, waitTime } = this.options || {}
        this.child.addEventListener('mousedown', this.mousedownEvent.bind(this));
        document.addEventListener('mousemove', isLazy ? throttle(this.mousemoveEvent.bind(this), waitTime || 100 ): this.mousemoveEvent.bind(this));
        document.addEventListener('mouseup', this.mouseupEvent.bind(this));
    }
    public clear() {//清除移动
        this.child.removeEventListener('mousedown', this.mousedownEvent);
        document.removeEventListener('mousemove', this.mousemoveEvent);
        document.removeEventListener('mouseup', this.mouseupEvent);
    }
}

function isObject(data: object | null) {
    return typeof data === 'object' && data !== null;
}

export default MakeDomMove;