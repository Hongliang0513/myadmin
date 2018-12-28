let listBox = document.getElementById('list');
~function () {
    //获取数据
    let productData = null,
        xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/product.json', false);
    xhr.onreadystatechange = () => {
        xhr.readyState === 4 && xhr.status === 200 ? productData = xhr.responseText : null;
        //解析数据
        productData ? productData = JSON.parse(productData) : null;
    };
    xhr.send(null);
    //动态绑定数据
    let str = ``;
    for (let i = 0; i < productData.length; i++) {
        let {
            title,
            img,
            price
        } = productData[i];
        str += `<li><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>￥${price}</span>
        </a></li>`;
    }
    listBox.innerHTML = str;
}();