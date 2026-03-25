document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('triangulation-diagram');
  if (!container) return;

  container.innerHTML = `
    <div class="triangle-wrap">
      <div class="node parent left">Jeremiah</div>
      <div class="node parent right">Deanna</div>
      <div class="node third top">Third Party<br><span class="sub">(Sharon / Stephanie)</span></div>

      <div class="line base"></div>
      <div class="line left"></div>
      <div class="line right"></div>
    </div>
  `;
});