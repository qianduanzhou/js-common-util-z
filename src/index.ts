type InType = HTMLElement | Element | string | null
type DOM = HTMLElement | Element
class MakeDomMove {
    public father: DOM;
    public child: DOM;
    private isMousedown: Boolean;
    private orignX: string | number;
    private orignY: string | number;
    constructor(father: InType, child: InType) {
        this.father = this.getParam(father);
        this.child = this.getParam(child);
    }
    private getParam(dom: InType): DOM {
        if(typeof dom === 'string') {
            let domResult =  document.querySelector(dom);
            if(domResult !== null) {
                return domResult
            } else {
                throw new Error(`找不到对应DOM：${dom}`);
            }
        } else if(isObject(dom)) {
            return dom;
        } else {
            throw new Error(`找不到对应DOM：${dom}`);
        }
    }
    private mousedownEvent(e: Event) {
        console.log('mousedown', e);
        this.isMousedown = true;
    }
    private mousemoveEvent(e: Event) {
        // console.log('mousemove', e);
    }
    private mouseupEvent(e: Event) {
        console.log('mouseup', e);
        this.isMousedown = false;
    }
    public makeMove() {
        this.child.addEventListener('mousedown', this.mousedownEvent);
        this.child.addEventListener('mousemove', this.mousemoveEvent);
        this.child.addEventListener('mouseup', this.mouseupEvent);
    }
}

function isObject(data: object | null) {
    return typeof data === 'object' && data !== null;
}


let m = new MakeDomMove(document.querySelector('.father'), document.querySelector('.child'));
m.makeMove();
console.log('father,child', m.father, m.child);