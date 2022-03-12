type InType = HTMLElement | Element | string | null
class MakeDomMove {
    public father: HTMLElement;//父元素dom
    public child: HTMLElement;//子元素dom
    private isMousedown: Boolean;//是否按下鼠标
    private orignX: number;//起始x位置
    private orignY: number;//起始y位置
    private minLeft: number;//最小left
    private maxLeft: number;//最大left
    private minTop: number;//最小top
    private maxTop: number;//最大top
    constructor(father: InType, child: InType) {//父元素及子元素
        this.father = this.getParam(father);
        this.child = this.getParam(child);
        let fbcr = this.father.getBoundingClientRect();
        let cbcr = this.child.getBoundingClientRect();
        this.minLeft = this.child.offsetLeft - (cbcr.left - fbcr.left);
        this.maxLeft = (fbcr.left + fbcr.width) - (cbcr.left - this.child.offsetWidth) - cbcr.width;
        this.minTop = this.child.offsetTop - (cbcr.top - fbcr.top);
        this.maxTop = (fbcr.top + fbcr.height) - (cbcr.top - this.child.offsetHeight) - cbcr.height;
        this.checkStyle();
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
        let position = getComputedStyle(this.child)?.position;
        if(position !== 'absolute') this.child.style.position = 'absolute';
    }
    private mousedownEvent(e: MouseEvent) {
        this.isMousedown = true;
        this.orignX = e.offsetX;
        this.orignY = e.offsetY;
        console.log(getComputedStyle(this.child, null).top)
    }
    private mousemoveEvent(e: MouseEvent) {
        if(this.isMousedown) {
            let diffX = e.offsetX - this.orignX;
            let diffY = e.offsetY - this.orignY;
            let left = this.child.offsetLeft + diffX;
            let top = this.child.offsetTop + diffY;
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
    public makeMove() {
        this.child.addEventListener('mousedown', this.mousedownEvent.bind(this));
        this.child.addEventListener('mousemove', this.mousemoveEvent.bind(this));
        this.child.addEventListener('mouseup', this.mouseupEvent.bind(this));
    }
}

function isObject(data: object | null) {
    return typeof data === 'object' && data !== null;
}

export default MakeDomMove;