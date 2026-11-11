/* V7.2 — illustrative visual case-study context; no confidential business data. */
(() => {
  'use strict';
  const diagrams = {
    'ai-response': {
      title: 'AI-supported response journey',
      steps: [['Customer email', 'Incoming context'], ['AI recommendation', 'Suggested response'], ['Agent review', 'Accuracy and tone'], ['Customer reply', 'Approved message']]
    },
    'chatbot-knowledge': {
      title: 'Scaling access to SME guidance',
      steps: [['SME knowledge', 'Process guidance'], ['Chatbot V1', 'Repeat questions'], ['Engineering partnership', 'Context and tasks'], ['Chatbot V2', 'Broader automation']]
    },
    'cps-contact': {
      title: 'Contact reduction improvement loop',
      steps: [['Contact drivers', 'CPS and case trends'], ['Root-cause review', 'Process / digital / platform'], ['Targeted action', 'CX and product ownership'], ['Governance', 'Monitor and follow up']]
    }
  };
  const caption = 'Illustrative model based on the project description. This is not a production screenshot, actual dashboard data or a claimed quantified result.';
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  function flowMarkup(project) {
    const data = diagrams[project];
    return '<section class="case-evidence" aria-label="Illustrative project workflow"><div class="case-evidence-head"><div>' +
      '<span class="case-evidence-kicker">Visual project walkthrough</span><h3>' + escapeHTML(data.title) + '</h3></div>' +
      '</div><div class="case-flow">' +
      data.steps.map((step, index) => '<div class="case-flow-step"><span class="case-flow-num">0' + (index + 1) +
        '</span><strong>' + escapeHTML(step[0]) + '</strong><small>' + escapeHTML(step[1]) + '</small></div>').join('') +
      '</div><p class="case-evidence-caption">' + caption + '</p></section>';
  }
  function dashboardMarkup() {
    return '<section class="case-evidence" aria-label="Illustrative dashboard wireframe">' +
      '<div class="case-evidence-head"><div><span class="case-evidence-kicker">Visual project walkthrough</span><h3>Productivity platform · dashboard concept</h3></div></div>' +
      '<div class="case-dashboard"><div class="case-dashboard-pane"><span class="case-dashboard-title">Activity capture · Power Apps</span>' +
      '<div class="case-dashboard-fields"><div class="case-dashboard-field"><strong>Activity type</strong><span>Input field</span></div>' +
      '<div class="case-dashboard-field"><strong>Time spent</strong><span>Input field</span></div>' +
      '<div class="case-dashboard-field"><strong>Team / workload</strong><span>Input field</span></div></div></div>' +
      '<div class="case-dashboard-pane"><span class="case-dashboard-title">Operational overview · Power BI</span>' +
      '<div class="case-bars" aria-label="Illustrative bar lengths, not measured values">' +
      '<span class="case-bar" style="height:58%"></span><span class="case-bar" style="height:81%"></span>' +
      '<span class="case-bar" style="height:43%"></span><span class="case-bar" style="height:67%"></span></div>' +
      '<div class="case-dashboard-axis"><span>Volume</span><span>Time</span><span>Workload</span><span>Trends</span></div>' +
      '</div></div><p class="case-evidence-caption">' + caption + '</p></section>';
  }

  const body = document.getElementById('project-dialog-content');
  if (!body) return;
  document.querySelectorAll('.featured-open[data-project]').forEach(button => {
    button.addEventListener('click', () => {
      const project = button.dataset.project;
      const layout = body.querySelector('.modal-layout');
      if (!layout) return;
      if (project === 'productivity-platform') layout.insertAdjacentHTML('beforebegin', dashboardMarkup());
      else if (diagrams[project]) layout.insertAdjacentHTML('beforebegin', flowMarkup(project));
    });
  });
})();

