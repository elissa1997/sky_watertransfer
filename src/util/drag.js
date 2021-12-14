import Vue from 'vue'

Vue.directive('drag-modal', (el, bindings, vnode) => {
  Vue.nextTick(() => {
    let { visible, destroyOnClose } = vnode.componentInstance
    // 防止未定义 destroyOnClose 关闭弹窗时dom未被销毁，指令被重复调用
    if (!visible) return
    let modal = el.getElementsByClassName('ant-modal')[0]

    let header = el.getElementsByClassName('ant-modal-header')[0]
    let left = 0
    let top = 0
    // 未定义 destroyOnClose 时，dom未被销毁，关闭弹窗再次打开，弹窗会停留在上一次拖动的位置
    if (!destroyOnClose) {
      left = modal.left || 0
      top = modal.top || 0
    }
    header.onmousedown = e => {
      let startX = e.clientX;
      let startY = e.clientY;
      header.left = header.offsetLeft;
      header.top = header.offsetTop;
      header.style.cursor = 'all-scroll'
      el.onmousemove = event => {
        let endX = event.clientX;
        let endY = event.clientY;
        // 左右拖拽的距离
        modal.left = header.left + (endX - startX) + left;
        //上下拖拽的距离
        modal.top = header.top + (endY - startY) + top;
        //屏幕边界X
        const screenX = (document.body.offsetWidth - modal.offsetWidth) / 2
        //屏幕边界Y
        const screenY = (document.body.offsetHeight - modal.offsetHeight) / 2

        //判断拖拽是否超出屏幕  X
        if (Math.abs(modal.left) > screenX) {
          if (modal.left < 0) {
            modal.style.left = -screenX + 'px'
          }
          if (modal.left > 0) {
            modal.style.left = screenX + 'px'
          }

        } else {
          modal.style.left = modal.left + 'px'
        }
        //判断拖拽是否超出屏幕  Y
        if (Math.abs(modal.top) > screenY) {
          if (modal.top < 0) {
            modal.style.top = -screenY + 'px'
          }
          if (modal.top > 0) {
            modal.style.top = screenY + 'px'
          }

        } else {
          modal.style.top = modal.top + 'px'
        }

      }
      el.onmouseup = event => {
        left = modal.left
        top = modal.top
        el.onmousemove = null;
        el.onmouseup = null;
        header.releaseCapture && header.releaseCapture();
      }
      header.setCapture && header.setCapture();
      return false
    }
  })
})
