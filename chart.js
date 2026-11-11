// Interactive D3.js timeline of Emma's academic, work, and leadership journey.
// The final 2027 milestone is upcoming, not a completed experience.
const milestones = [
  {year:'2025', date:'August 2025', title:'Resident Assistant', category:'Leadership', color:'#dc8d76', detail:'Started supporting residential communities and organizing student events at Northeastern.'},
  {year:'2026', date:'January 2026', title:'Fiduciary Trust', category:'Finance', color:'#285a46', detail:'Cash Management Co-op: worked with daily payments, reconciliations, and reporting.'},
  {year:'2026', date:'Summer 2026', title:'ASML', category:'Data & operations', color:'#779a8c', detail:'Product Lifecycle Management internship: analyzed inventory planning and presented recommendations.'},
  {year:'2027', date:'January 2027 · Upcoming', title:'Arrowstreet Capital', category:'Next chapter', color:'#bc9b67', detail:'Upcoming Investment Services Co-op, combining an interest in markets with analytical and operational work.'}
];

function drawJourneyTimeline() {
  const mount = d3.select('#skills-chart');
  mount.selectAll('*').remove();
  const w=900, h=320, pad=76, lineY=145;
  const svg=mount.append('svg').attr('viewBox',`0 0 ${w} ${h}`)
    .attr('role','group').attr('aria-label','Interactive timeline of four career and leadership milestones from 2025 to 2027');
  const x=d3.scalePoint().domain(d3.range(milestones.length)).range([pad,w-pad]).padding(0.08);
  svg.append('line').attr('x1',x(0)).attr('x2',x(3)).attr('y1',lineY).attr('y2',lineY)
    .attr('stroke','#d9e7d7').attr('stroke-width',8).attr('stroke-linecap','round');
  const points=svg.selectAll('.milestone').data(milestones).enter().append('g')
    .attr('class','milestone').attr('transform',(d,i)=>`translate(${x(i)},${lineY})`)
    .attr('tabindex',0).attr('role','button').style('cursor','pointer')
    .attr('aria-label',d=>`${d.date}, ${d.title}, ${d.category}. ${d.detail}`);
  points.append('circle').attr('r',33).attr('fill',d=>d.color).attr('opacity',0.12);
  points.append('circle').attr('class','timeline-dot').attr('r',17).attr('fill',d=>d.color)
    .attr('stroke','#fff').attr('stroke-width',5);
  points.append('text').attr('text-anchor','middle').attr('y',-62).attr('font-size',15)
    .attr('font-weight',700).attr('font-family','DM Sans, sans-serif').attr('fill','#285a46').text(d=>d.year);
  points.append('text').attr('text-anchor','middle').attr('y',70).attr('font-size',14)
    .attr('font-weight',700).attr('font-family','DM Sans, sans-serif').attr('fill','#22342e').text(d=>d.title);
  points.append('text').attr('text-anchor','middle').attr('y',94).attr('font-size',12)
    .attr('font-family','DM Sans, sans-serif').attr('fill','#66756e').text(d=>d.category);
  const detail=d3.select('#chart-detail');
  function selectMilestone(event,d) {
    points.select('.timeline-dot').transition().duration(180).attr('r',17);
    d3.select(event.currentTarget).select('.timeline-dot').transition().duration(180).attr('r',24);
    detail.text(`${d.date} · ${d.title} — ${d.detail}`);
  }
  points.on('mouseenter',selectMilestone).on('focus',selectMilestone).on('click',selectMilestone)
    .on('keydown',(event,d)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectMilestone(event,d);}});
  detail.text('Hover over, click, or tab to a milestone to explore my journey.');
}
if(typeof d3==='undefined') {
  document.querySelector('#skills-chart').textContent='The timeline needs an internet connection to load D3.js.';
} else { drawJourneyTimeline(); }
