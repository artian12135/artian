Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: '开启小程序',
        isShow:false,
        userInfo: {},
    },
    

    onLoad: function(options){
      //做一些初始化工作，发送请求，开启定时器
      console.log('onload 页面加载');
      console.log(this);
      this.getUserInfo();
    },

    handleclick(){
      wx.switchTab({
        url: '/pages/list/list',
      })
    },

    getUserInfo(){
      //判断用户是否授权了
      wx.getSetting({
        success : (data)=>{
          console.log(data);
          if(data.authSetting['scope.userInfo']){
            //用户已经授权了
            this.setData({
              isShow:false,
            });
          }else{
            //没有授权
            this.setData({
              isShow:true,
            });
          }
        }
      })
      wx.getUserInfo({
        success: (data) =>{
          console.log(data);
          this.setData({
            userInfo:data.userInfo
          });
        },
        fail:()=>{
          console.log('获取用户数据失败');
        }
      })
    },

    handleGetUserInfo(data){
      console.log('用户点击了',data);
      if(data.detail.rawData){
        this.getUserInfo();
      }
    },
})