interface ParamsObj {
    [propName: string]: any
}
interface ThrottleOption {
    trailing ?: boolean,
    leading ?: boolean
}

/**
 * 防抖
 * @param {*} func 执行的函数
 * @param {*} wait 等待的时间
 * @param {*} immediate 是否立即执行（马上执行一次，等待的时间重新执行后的下一次执行的时间）
 * @returns 
 */
 function debounce(func: Function, wait: number, immediate: boolean) {
    let timeout: any, result: any;
    
    let debounced = function (this: any) {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };
    
    debounced.prototype.cancel = function() {//取消功能，相当于取消这一次的防抖功能
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

/**
 * 节流
 * @param {*} func 执行的函数
 * @param {*} wait 等待的时间
 * @param {*} options 有两个参数 trailing结束后是否执行一次 leading是否立即执行
 * @returns 
 */
function throttle(func: Function, wait: number, options?: ThrottleOption) {
    let timeout: any, context: any, args: any, result;
    let previous = 0;
    if (!options) options = {};

    let later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    let throttled = function(this: any) {
        let now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    
    throttled.prototype.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
    return throttled;
}

export { debounce, throttle };
