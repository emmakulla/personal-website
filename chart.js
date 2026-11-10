// A real, interactive D3.js chart. Counts indicate tools mentioned, not proficiency.
const skillsData = [
  { category: 'Data analysis', tools: ['Python', 'SQL', 'Excel'], color: '#285a46' },
  { category: 'Data visualization', tools: ['Altair', 'Plotly', 'Matplotlib', 'Power BI'], color: '#dc8d76' },
  { category: 'Business & workflow', tools: ['SAP ERP', 'Git', 'PowerPoint'], color: '#82a994' }
];

function drawSkillsChart() {
  const chart = d3.select('#skills-chart');
  chart.selectAll('*').remove();
  const width = 880;
  const height = 330;
  const margin = { top: 32, right: 48, bottom: 60, left: 190 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const svg = chart.append('svg').attr('viewBox', `0 0 ${width} ${height}`)
    .attr('aria-hidden', 'true');
  const plot = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const x = d3.scaleLinear().domain([0, 5]).range([0, plotWidth]);
  const y = d3.scaleBand().domain(skillsData.map(d => d.category)).range([0, plotHeight]).padding(0.32);
  plot.append('g').attr('class', 'grid').call(d3.axisBottom(x).ticks(5).tickSize(plotHeight).tickFormat(''))
    .selectAll('line').attr('stroke', '#e7ece7');
  plot.select('.grid .domain').remove();
  plot.append('g').call(d3.axisLeft(y).tickSize(0)).call(g => g.select('.domain').remove())
    .selectAll('text').attr('fill', '#344a3d').attr('font-size', 16).attr('font-family', 'DM Sans, sans-serif').attr('dx', -12);
  plot.append('g').attr('transform', `translate(0,${plotHeight})`).call(d3.axisBottom(x).ticks(5).tickSize(0))
    .call(g => g.select('.domain').attr('stroke', '#b8c6ba'))
    .selectAll('text').attr('fill', '#6b7b71').attr('font-size', 13).attr('dy', 15);
  svg.append('text').attr('x', margin.left + plotWidth / 2).attr('y', height - 6).attr('text-anchor', 'middle')
    .attr('font-family', 'DM Sans, sans-serif').attr('font-size', 13).attr('fill', '#64786b').text('Number of tools listed');
  const bars = plot.selectAll('.skill-bar').data(skillsData).enter().append('rect')
    .attr('class', 'skill-bar').attr('x', 0).attr('y', d => y(d.category)).attr('height', y.bandwidth())
    .attr('rx', 7).attr('width', d => x(d.tools.length)).attr('fill', d => d.color)
    .attr('tabindex', 0).attr('role', 'button')
    .attr('aria-label', d => `${d.category}: ${d.tools.length} tools. ${d.tools.join(', ')}.`)
    .style('cursor', 'pointer');
  plot.selectAll('.count-label').data(skillsData).enter().append('text')
    .attr('x', d => x(d.tools.length) + 12).attr('y', d => y(d.category) + y.bandwidth() / 2 + 5)
    .attr('font-family', 'DM Sans, sans-serif').attr('font-weight', 700)
    .attr('font-size', 16).attr('fill', '#344a3d').text(d => d.tools.length);
  const detail = d3.select('#chart-detail');
  function show(d) { detail.text(`${d.category} (${d.tools.length}): ${d.tools.join(' · ')}`); }
  bars.on('mouseenter', (event, d) => show(d))
    .on('focus', (event, d) => show(d))
    .on('click', (event, d) => show(d))
    .on('keydown', (event, d) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); show(d); } });
}

if (typeof d3 === 'undefined') {
  document.querySelector('#skills-chart').textContent = 'The chart needs an internet connection to load the D3.js library.';
} else {
  drawSkillsChart();
}
