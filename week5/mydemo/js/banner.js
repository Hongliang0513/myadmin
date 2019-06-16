let bannerRender = (function () {
    //获取后续需要操作的元素对象或元素集合
    let container = document.querySelector('#container'),
        wrapper = container.querySelector('.wrapper'),
        focus = container.querySelector('.focus'),
        arrowLeft = container.querySelector('.arrowLeft'),
        arrowRight = container.querySelector('.arrowRight'),
        slideList = null,
        focusList = null;

    //轮播图运动的基础参数
    let stepIndex = 0,//记录当前展示块的索引（步长）
        autoTimer = null,//自动轮播的定时器
        interval = 1000;//间隔多长时间自动切换一次

    //控制轮播图的运动和切换
    let autoMove = function(){
        stepIndex++;
        if (stepIndex >= slideList.length){
            //=>说明再往后切换没有了（现在展示的是克隆的第一张），此时我们让WRAPPER立即回到真实第一张的位置(LEFT=0)，然后STEP-INDEX=1（这样可以切换到第二张）
            utils.css(wrapper, 'left', 0);
            stepIndex = 1;
        }
        animate(wrapper,{
            left:-stepIndex * 1000
        },200);

        //->每一次运动完成需要让焦点跟着切换
        changeFocus();
    };

    //=>CHANGE-FOCUS：让焦点跟着轮播图的切换而切换
    //（运动到克隆这一张的时候，也需要让第一个LI有选中的样式）
    let changeFocus = function changeFocus(){
        let tempIndex = stepIndex;
        tempIndex === slideList.length - 1 ? tempIndex = 0 : null;
        [].forEach.call(focusList,(item,index)=>{
            item.className = index === tempIndex ? 'active' : '';
        });
    };

    //获取数据
    let queryData = function queryData() {
      return new Promise((resolve,reject)=>{
          let xhr = new XMLHttpRequest;
          xhr.open('GET','json/banner.json',true);
          xhr.onreadystatechange = ()=>{
              if (xhr.readyState === 4 && xhr.status === 200){
                  let data = JSON.parse(xhr.responseText);
                  console.log(data);
                  resolve(data);
              }
          };
          xhr.send(null);
      });
    };

    //数据绑定
    let bindHTML = function bindHTML(data) {
        let strSlide = ``,
            strFocus = ``;
        data.forEach((item,index)=>{
            //解构的时候img如果没有返回数据，可以设置默认值
            let {img='img/banner1.jpg',desc='自学成才'} = item;
            strSlide += `<div class="slide">
                <img src="${img}" alt="${desc}">
            </div>`;

            strFocus += `<li class="${index===0?'active':''}">               
            </li>>`;
        });
        wrapper.innerHTML = strSlide;
        focus.innerHTML = strFocus;

        //获取所有的slide和li
        slideList = wrapper.querySelectorAll('.slide');
        focusList = focus.querySelectorAll('li');

        //->把现有的第一张克隆一份放到容器的末尾（由于querySelectorAll不存在DOM映射，新增加一个原有集合中还是之前的SLIDE，所以我们需要重新获取一遍）
        wrapper.appendChild(slideList[0].cloneNode(true));
        slideList = wrapper.querySelectorAll('.slide');

        //根据slide的个数动态计算wrapper的宽度
        utils.css(wrapper,'width',slideList.length*1000);
    };

    //鼠标进入和离开控制自动轮播的停止和开启
    let handleContainer = function handleContainer() {
      container.onmouseenter = ()=>{
          clearInterval(autoTimer);
          arrowLeft.style.display = arrowRight.style.display = 'block';
      };
      container.onmouseleave = ()=>{
          autoTimer = setInterval(autoMove,interval);
          arrowLeft.style.display = arrowRight.style.display = 'none';
      };
    };

    //点击焦点实现切换
    let handleFocus = function handleFocus() {
        [].forEach.call(focusList,(item,index) => {
           item.onclick = () => {
            stepIndex = index;
            animate(wrapper,{
                left: -stepIndex * 1000
            },200);
            changeFocus();
           };
        });
    };

    //给两个按钮绑定点击事件
    let handleArrow = function handleArrow() {
        arrowRight.onclick = autoMove;

        arrowLeft.onclick = () => {
            stepIndex--;
            if (stepIndex<0){
                utils.css(wrapper,'left',-(slideList.length - 1) * 1000);
                stepIndex = slideList.length - 2;
            }
            animate(wrapper,{
                left: -stepIndex * 1000
            },200);
            changeFocus();
        };
    };

    return {
        init: function () {
            let promise = queryData();
            promise.then(bindHTML).then(()=>{
                //开启定时器驱动的自动轮播
                autoTimer = setInterval(autoMove,interval);
            }).then(()=>{
                //左右按钮或者焦点切换
                handleContainer();
                handleFocus();
                handleArrow();
            });
        }
    }
})();
bannerRender.init();