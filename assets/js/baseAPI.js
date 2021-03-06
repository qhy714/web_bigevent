// 每次调用$.get()或$.post()或$.ajax()的时候，会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// 请求拦截器
$.ajaxPrefilter((options) => {
  options.url = `http://www.liulongbin.top:3007` + options.url;
  // 在请求之前给有权限的接口注入token
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token'),
    };
  }
  options.complete = (res) => {
    console.log(res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      // console.log(1);
      // 清空 token
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  };
});
