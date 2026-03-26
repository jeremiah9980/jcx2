document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('triangulation-diagram');
  if (!container) return;

  const sharonHref = container.dataset.sharonHref || 'sharon-profile.html';
  const stephanieHref = container.dataset.stephanieHref || 'third-party-influence-analysis.html#stephanie';
  const jeremiahHref = container.dataset.jeremiahHref || 'advanced-analysis.html#conflict-map';
  const deannaHref = container.dataset.deannaHref || 'advanced-analysis.html#conflict-map';
  const baseHref = container.dataset.baseHref || 'advanced-analysis.html#conflict-map';
  const leftHref = container.dataset.leftHref || 'sharon-profile.html#conflict-windows';
  const rightHref = container.dataset.rightHref || 'third-party-influence-analysis.html#stephanie';

  container.innerHTML = `
    <div class="triangle-wrap linked-triangle">
      <a class="node parent left clickable" href="${jeremiahHref}" title="Open Jeremiah conflict context">Jeremiah</a>
      <a class="node parent right clickable" href="${deannaHref}" title="Open Deanna conflict context">Deanna</a>
      <a class="node third top clickable" href="${sharonHref}" title="Open Sharon incidents">Sharon<br><span class="sub">profile / incidents</span></a>
      <a class="node third mid clickable stephanie-node" href="${stephanieHref}" title="Open Stephanie message evidence">Stephanie<br><span class="sub">message evidence</span></a>

      <a class="line base clickable-line" href="${baseHref}" title="Open primary incident map"></a>
      <a class="line left clickable-line" href="${leftHref}" title="Open Sharon-specific incident windows"></a>
      <a class="line right clickable-line" href="${rightHref}" title="Open Stephanie-specific evidence"></a>
    </div>
  `;
});