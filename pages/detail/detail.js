// pages/detail/detail.js
let datas = require("../../datas/list-data.js");
let appDatas = getApp();
console.log(appDatas,typeof appDatas);

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollected:false,
    isMusicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      let index = options.index;
      this.setData({
        detailObj:datas.list_data[index],
        index
      });
    // 获取本地存储数据
    let storageObj = wx.getStorageSync('isCollected');
    console.log(storageObj);
    
    if(!storageObj){
      //在缓存中初始化空对象
      wx.setStorageSync('isCollected', {});
    }

    //判断用户是否收藏
    if (storageObj[index]){
      this.setData({
        isCollected:true
      })
    }

    wx.onBackgroundAudioPlay(() => {
      console.log('音乐播放');
      //修改isMusicPlay状态值
      this.setData({
        isMusicPlay: true
      });

      //修改appDatas中的数据
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = this.index;
    });
    console.log("appdatas:" + appDatas.data.isPlay);
    if (appDatas.data.isPlay && appDatas.data.pageIndex == this.index) {
      this.setData({
        isMusicPlay: true,
      });
    }
    //
    wx.onBackgroundAudioPause(() => {
      //修改isMusicPlay状态值
      this.setData({
        isMusicPlay: false,
      });

      //修改appDatas中的数据
      appDatas.data.isPlay = false;
    });
  },

  handleMusicPlay(){
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    })
    if (isMusicPlay){
      //播放音乐
      let { dataUrl, title } = this.data.detailObj.music;
      console.log(dataUrl,title);
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      wx.pauseBackgroundAudio()
    }
  },

  


  handleCollection(){
    let isCollected = !this.data.isCollected;
    //更新状态
    this.setData({
      isCollected
    });
    let obj = wx.getStorageSync('isCollected');
    obj[this.data.index] = isCollected;
    //提示用户
    let title = isCollected?'收藏成功':'取消收藏';
    wx.showToast({
      title,
      icon:'success'
    });
    wx.setStorage({
      key: 'isCollected',
      data: obj
    });
    this.setData({ isCollected });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈',
        '分享到qq空间',
        '分享到微博'
      ],
    })
  }

})