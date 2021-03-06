/**
 * 生成多条线的折线图
 * @param {*} arr 传入的是多组数据组成的数据组
 * @param {*} boxWidth 盒子的宽度
 * @param {*} boxHeight 盒子的高度
 * @param {*} shaftWidth 坐标轴的宽度
 * @param {*} shaftHight 坐标轴的高度
 * @param {*} lineColor 折线颜色的数组
 */
function setPolyline (arr, boxWidth = 500, boxHeight = 500, shaftWidth, shaftHight, lineColor) {

  var shaftWidth = shaftWidth || (boxWidth - 20);
  var shaftHight = shaftHight || (boxHeight - 20);
  console.log('这儿是shaftWidth');
  console.log(shaftWidth);

  var valuePointR = 2.5;
  // 单条数据的长度
  var length = arr[0].length;

  // 设置两个点的水平间隔
  var interval = Math.floor(shaftWidth / length);

  // 总共有多少条数据
  var valueArrLength = arr.length;

  var colorArr = [];
  // 生成随机颜色
  for (var i = 0; i < valueArrLength; i++) {
    var colorString = ''
    for (var j = 0; j < 3; j++) {
      var colorNum = (Math.floor(Math.random() * 256)).toString(16);
      colorString += colorNum;         
    }
    colorArr.push('#' + colorString);
  }

  // 设置折线的颜色
  var lineColor = lineColor || colorArr;

  // 处理输入的颜色数组长度与实际的数量长度不一样的情况
  var lengthSize = Math.abs(lineColor.length - arr.length);
  if (lengthSize > 0) {
    lineColor = lineColor.concat(colorArr).slice(0, valueArrLength);
  }

  // 设置轴的颜色
  var shaftColor = '#000';

  // 获取数组的最大值
  var maxArr = [];
  arr.forEach(ele => {
    ele.forEach(item => {
      maxArr.push(item);
    })
  })
  var max = Math.max.apply(null, maxArr);

  // 获取比例放大值
  var scale = (shaftHight / max).toFixed(2);

  // 设置点折线点的颜色
  var pointColor = '#0033ff';

  // 设置y轴上面的终点坐标
  var beginPointX = Math.floor((boxWidth - shaftWidth) / 2);
  var beginPointY = Math.floor((boxHeight - shaftHight) / 2);

  // 设置坐标的原点
  var originX = beginPointX;
  var originY = beginPointY + shaftHight;

  // 设置x轴上面的终点坐标
  var endPointX = beginPointX + shaftWidth;
  var endPointY = originY;

  for (var j = 0; j < valueArrLength; j++) {
    // 存放点坐标的数组
    var pointArr = [];
    ctx.beginPath();
    // 遍历连接折线
    for (i = 0; i < length; i++) { 
      var pointX = i * interval + originX;
      var pointY = -arr[j][i] * scale + originY;
      var arrTemp = [];
      arrTemp.push(pointX);
      arrTemp.push(pointY);
      pointArr.push(arrTemp);
      if (i === 0) {
        // 设置点
        ctx.moveTo(pointX, pointY);
      } else {
        // 连线
        ctx.strokeStyle = lineColor[j];
        ctx.lineTo(pointX, pointY);
        ctx.stroke();
      }
    }
    // 遍历绘制折线点的原点，这样才能将折线压住
    for (i = 0; i < pointArr.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = lineColor[j];
      ctx.arc(pointArr[i][0], pointArr[i][1], valuePointR, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  // 绘制坐标系
  ctx.beginPath();
  ctx.strokeStyle = shaftColor;
  ctx.moveTo(beginPointX, beginPointY);
  ctx.lineTo(originX, originY);
  ctx.lineTo(endPointX, endPointY);
  ctx.stroke();
}