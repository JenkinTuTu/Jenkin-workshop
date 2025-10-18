(function(){
  // 格式器：24h、带星期；根据时区渲染
  function fmtDate(d, tz){
    return new Intl.DateTimeFormat('zh-CN', {
      timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
      weekday: 'short'
    }).format(d);
  }
  function fmtTime(d, tz){
    return new Intl.DateTimeFormat('zh-CN', {
      timeZone: tz, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(d);
  }

  function render(){
    const now = new Date();
    document.querySelectorAll('#tz-widget .tz-item').forEach(el=>{
      const tz = el.dataset.zone;
      const label = el.dataset.label || tz;
      // 首次注入结构
      if(!el._inited){
        el.innerHTML = `
          <span class="tz-label">${label}</span>
          <span class="tz-time">--:--:--</span>
          <span class="tz-date"></span>
        `;
        el.setAttribute('role','group');
        el.setAttribute('aria-label', `${label} time`);
        el._inited = true;
      }
      el.querySelector('.tz-time').textContent = fmtTime(now, tz);
      el.querySelector('.tz-date').textContent = '· ' + fmtDate(now, tz);
    });
  }

  // 首次渲染 + 每秒刷新
  render();
  setInterval(render, 1000);
})();