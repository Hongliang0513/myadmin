/*
 * getCss：获取当前元素某一个样式属性值
 *
 * @param
 *    curEle[object]：当前要操作的元素
 *    attr[string]：当前要获取的样式属性名
 *
 * @return
 *    获取的样式属性值
 */
let getCss = function (curEle, attr) {
    if (typeof window.getComputedStyle === 'undefined') {
        return;
    }
    let val = window.getComputedStyle(curEle, null)[attr];
    //=>把获取的结果去除单位（不是所有的值都能去单位的，例如：display\一些复合值都去不掉单位）
    reg = /^-?\d+(\.\d+)?(px|em|pt|rem)?$/i;
    reg.test(val) ? parseFloat(val) : null;
    return val;
};

//=>设置当前元素的某一个具体样式的属性值
//JS中给元素设置样式只有两种
//1.设置元素的样式类名（前提：样式类及对应的样式已经处理完成）
//2.通过行内样式设置 xxx.style.xxx=xxx
let setCss = function (curEle, attr, value) {
    /*
     * 细节处理
     *   1.如果需要考虑IE6~8兼容，透明度这个样式在低版本浏览器中不是使用opacity，而是filter（我们两套都要设置）
     *   2.如果传递进来的VALUE值没有带单位,我们根据情况设置PX单位
     *     ->某些样式属性才会加单位：WIDTH/HEIGHT/PADDING(LEFT...)/MARGIN(LEFT...)/FONT-SIZE/TOP/LEFT/BOTTOM/RIGHT...
     *     ->用户自己传递的VALUE值中是没有单位的
     */
    if (attr === 'opacity') {
        curEle.style.opacity = value;
        curEle.style.filter = `alpha(opacity=${value * 100})`;
        return;
    }
    if (!isNaN(value)) {
        //=>IS-NaN检测的结果是FALSE：说明VALUE是纯数字没单位
        let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
        reg.test(attr) ? value += 'px' : null;
    }
    curEle['style'][attr] = value;
};
//=>给元素批量设置样式
let setGroupCss = function (curEle, options = {}) {
    //=>遍历传递的OPTIONS,有多少键值对,就循环多少次,每一次都调取SET-CSS方法逐一设置即可
    for (let attr in options) {
        if (!options.hasOwnProperty(attr)) break;
        //=>options:传递进来的需要修改的样式对象(集合)
        //=>attr:每一次遍历到的集合中的某一项(要操作的样式属性名)
        //=>options[attr]:传递的要操作的样式属性值
        setCss(curEle, attr, options[attr]);
    }
};

let css = function (...arg) {
    let len = arg.length,
        fn = getCss;
    len>=3? fn = setCss:null;
    len === 2 && (arg[1] instanceof Object) ? fn=setGroupCss:null;
    return fn(...arg);
};