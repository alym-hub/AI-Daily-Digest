const newsItems = [
  {
    title: "AI coding assistants become the new developer dashboard",
    source: "AI Engineering Weekly",
    date: "2026-06-16",
    category: "AI Tools",
    impact: "High",
    url: "https://github.com/features/copilot",
    summary:
      "Major coding tools are moving from autocomplete toward planning, testing, review, and multi-file task execution. For beginners, the best use is still asking the assistant to explain code and generate small practice projects."
  },
  {
    title: "Local LLM projects keep making small models more useful",
    source: "Open Source Radar",
    date: "2026-06-15",
    category: "Open Source",
    impact: "High",
    url: "https://github.com/ggerganov/llama.cpp",
    summary:
      "Local model runtimes make it easier to run AI on personal computers without sending everything to cloud APIs. The trend is useful for privacy, offline learning, and experimenting with AI systems at low cost."
  },
  {
    title: "Python remains the easiest first language for AI learners",
    source: "Learning Track",
    date: "2026-06-14",
    category: "Learning",
    impact: "Medium",
    url: "https://docs.python.org/3/tutorial/",
    summary:
      "Python continues to be the default language for data analysis, scripting, automation, and AI experiments. A good beginner path is variables, lists, dictionaries, files, APIs, then small automation projects."
  },
  {
    title: "Agent apps shift from chat boxes to task workflows",
    source: "Product Notes",
    date: "2026-06-13",
    category: "AI Agents",
    impact: "High",
    url: "https://github.com/langchain-ai/langchain",
    summary:
      "AI agent products are increasingly designed around tasks such as research, report generation, repository review, and browser automation. The key challenge is not just intelligence, but reliable execution and clear user control."
  },
  {
    title: "Web UI polish matters for small personal projects",
    source: "Design Desk",
    date: "2026-06-12",
    category: "Frontend",
    impact: "Medium",
    url: "https://developer.mozilla.org/en-US/docs/Learn/CSS",
    summary:
      "A clean interface with readable spacing, soft contrast, hover states, and helpful empty states makes even simple projects feel serious. Personal GitHub projects benefit from screenshots and a polished demo page."
  },
  {
    title: "GitHub profiles become learning portfolios",
    source: "Developer Growth",
    date: "2026-06-11",
    category: "Career",
    impact: "Medium",
    url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/about-your-profile",
    summary:
      "Students and new developers are using GitHub profiles to show learning progress, notes, small tools, and weekly build logs. A small complete project is often more impressive than many unfinished folders."
  },
  {
    title: "Markdown remains the simplest format for daily notes",
    source: "Workflow Lab",
    date: "2026-06-10",
    category: "Productivity",
    impact: "Low",
    url: "https://www.markdownguide.org/basic-syntax/",
    summary:
      "Markdown is still the easiest way to write portable notes, summaries, README files, and study logs. It works well with GitHub, Obsidian, VS Code, and static websites."
  },
  {
    title: "Computer science fundamentals still compound over time",
    source: "CS Notes",
    date: "2026-06-09",
    category: "Learning",
    impact: "High",
    url: "https://cs50.harvard.edu/x/",
    summary:
      "AI tools help you move faster, but fundamentals like variables, functions, files, data structures, networks, and databases make the tools much more useful. The strongest learning strategy is to build small projects and explain them back."
  }
];

const grid = document.querySelector("#digest-grid");
const filters = document.querySelector("#category-filters");
const searchInput = document.querySelector("#search-input");
const todayCount = document.querySelector("#today-count");
const highImpactCount = document.querySelector("#high-impact-count");
const categoryCount = document.querySelector("#category-count");
const spotlightCard = document.querySelector("#spotlight-card");

let activeCategory = "All";

function getCategories() {
  return ["All", ...new Set(newsItems.map((item) => item.category))];
}

function matchesSearch(item, query) {
  const text = `${item.title} ${item.source} ${item.category} ${item.summary}`.toLowerCase();
  return text.includes(query.trim().toLowerCase());
}

function getFilteredItems() {
  const query = searchInput.value;
  return newsItems.filter((item) => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    return categoryMatch && matchesSearch(item, query);
  });
}

function renderFilters() {
  filters.innerHTML = getCategories()
    .map((category) => {
      const activeClass = category === activeCategory ? " is-active" : "";
      return `<button class="chip${activeClass}" type="button" data-category="${category}">${category}</button>`;
    })
    .join("");
}

function renderStats() {
  const highImpact = newsItems.filter((item) => item.impact === "High").length;
  todayCount.textContent = newsItems.length;
  highImpactCount.textContent = highImpact;
  categoryCount.textContent = getCategories().length - 1;
}

function renderSpotlight() {
  const topItem = newsItems.find((item) => item.impact === "High") ?? newsItems[0];
  spotlightCard.innerHTML = `
    <h3>${topItem.title}</h3>
    <p>${topItem.summary}</p>
    <div class="meta-row">
      <span>${topItem.category}</span>
      <a class="card-link" href="${topItem.url}" target="_blank" rel="noreferrer">Read more</a>
    </div>
  `;
}

function renderCards() {
  const items = getFilteredItems();

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty-state">没有匹配的内容。换个关键词试试，比如 Python、AI、GitHub。</div>`;
    return;
  }

  grid.innerHTML = items
    .map(
      (item, index) => `
        <article class="news-card" style="animation-delay: ${index * 45}ms">
          <div class="card-top">
            <span class="category-pill">${item.category}</span>
            <span class="badge badge--${item.impact}">${item.impact}</span>
          </div>
          <div>
            <h3>${item.title}</h3>
            <p class="meta">${item.source} · ${item.date}</p>
          </div>
          <p>${item.summary}</p>
          <a class="card-link" href="${item.url}" target="_blank" rel="noreferrer">打开来源</a>
        </article>
      `
    )
    .join("");
}

function render() {
  renderFilters();
  renderStats();
  renderSpotlight();
  renderCards();
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderCards();
});

searchInput.addEventListener("input", renderCards);

render();
