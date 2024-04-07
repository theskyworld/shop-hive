// rem布局
// 在指定的元素上设置大小时使用rem单位
export default function remLayout() {
  const remFn = () => {
    // 以375像素的屏幕宽度为基准，确保在不同宽度的屏幕上，字体大小依旧能够自适应
    document.documentElement.style.fontSize =
      (document.documentElement.clientWidth / 375) * 100 + "px";
  };
  window.addEventListener("DOMContentLoaded", remFn);
  window.addEventListener("resize", remFn);
}
