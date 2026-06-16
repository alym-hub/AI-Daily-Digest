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
const languageSelect = document.querySelector("#language-select");

let activeCategory = "All";
let currentLanguage = "en";
const translationCache = new Map();

// UI text translations for different languages
const uiTranslations = {
  "en": {
    search: "搜索",
    searchPlaceholder: "输入 AI、Python、GitHub...",
    language: "语言",
    highImpact: "高影响",
    categories: "分类数",
    learningTip: "学习建议",
    topSignal: "Top Signal",
    todayDirection: "今天最值得看的方向",
    readMore: "Read more",
    openSource: "打开来源",
    learningPrompt: "Learning Prompt",
    todayExercise: "今天的小练习",
    exerciseDesc: "挑一条新闻，用自己的话写 3 句话：它讲了什么、为什么重要、你能用它做什么。",
    noMatch: "没有匹配的内容。换个关键词试试，比如 Python、AI、GitHub。"
  },
  "zh-CN": {
    search: "搜索",
    searchPlaceholder: "输入 AI、Python、GitHub...",
    language: "语言",
    highImpact: "高影响",
    categories: "分类数",
    learningTip: "学习建议",
    topSignal: "焦点新闻",
    todayDirection: "今天最值得看的方向",
    readMore: "阅读更多",
    openSource: "打开来源",
    learningPrompt: "学习提示",
    todayExercise: "今天的小练习",
    exerciseDesc: "挑一条新闻，用自己的话写 3 句话：它讲了什么、为什么重要、你能用它做什么。",
    noMatch: "没有匹配的内容。换个关键词试试，比如 Python、AI、GitHub。"
  },
  "ja": {
    search: "検索",
    searchPlaceholder: "AI、Python、GitHub を入力...",
    language: "言語",
    highImpact: "高影響",
    categories: "カテゴリー数",
    learningTip: "学習アドバイス",
    topSignal: "トップニュース",
    todayDirection: "今日最も見るべき方向",
    readMore: "もっと読む",
    openSource: "ソースを開く",
    learningPrompt: "学習プロンプト",
    todayExercise: "今日の練習",
    exerciseDesc: "ニュースを1つ選び、自分の言葉で3つの文を書いてください：それは何を伝えているか、なぜ重要なのか、それを使って何ができるか。",
    noMatch: "一致するものが見つかりません。Python、AI、GitHub などのキーワードを試してください。"
  },
  "ko": {
    search: "검색",
    searchPlaceholder: "AI, Python, GitHub 입력...",
    language: "언어",
    highImpact: "높은 영향",
    categories: "카테고리 수",
    learningTip: "학습 조언",
    topSignal: "주요 뉴스",
    todayDirection: "오늘 가장 주목할 방향",
    readMore: "더 읽기",
    openSource: "출처 열기",
    learningPrompt: "학습 프롬프트",
    todayExercise: "오늘의 연습",
    exerciseDesc: "뉴스 하나를 골라서 자신의 말로 3문장을 작성하세요: 그것이 무엇을 말하고 있는지, 왜 중요한지, 그것으로 무엇을 할 수 있는지.",
    noMatch: "일치하는 결과가 없습니다. Python, AI, GitHub 등의 키워드를 시도해 보세요."
  },
  "es": {
    search: "Buscar",
    searchPlaceholder: "Escribe AI, Python, GitHub...",
    language: "Idioma",
    highImpact: "Alto impacto",
    categories: "Categorías",
    learningTip: "Consejo de aprendizaje",
    topSignal: "Noticia principal",
    todayDirection: "La dirección más importante de hoy",
    readMore: "Leer más",
    openSource: "Abrir fuente",
    learningPrompt: "Indicación de aprendizaje",
    todayExercise: "Ejercicio de hoy",
    exerciseDesc: "Elige una noticia y escribe 3 oraciones con tus propias palabras: de qué trata, por qué es importante, y qué puedes hacer con ella.",
    noMatch: "No se encontraron coincidencias. Prueba con palabras clave como Python, AI, GitHub."
  },
  "fr": {
    search: "Rechercher",
    searchPlaceholder: "Entrez AI, Python, GitHub...",
    language: "Langue",
    highImpact: "Impact élevé",
    categories: "Catégories",
    learningTip: "Conseil d'apprentissage",
    topSignal: "Nouvelle principale",
    todayDirection: "La direction la plus importante aujourd'hui",
    readMore: "Lire la suite",
    openSource: "Ouvrir la source",
    learningPrompt: "Invitation d'apprentissage",
    todayExercise: "Exercice du jour",
    exerciseDesc: "Choisissez une nouvelle et écrivez 3 phrases avec vos propres mots: de quoi elle parle, pourquoi c'est important, et ce que vous pouvez en faire.",
    noMatch: "Aucun résultat trouvé. Essayez des mots-clés comme Python, AI, GitHub."
  }
};

async function translateText(text, targetLang) {
  if (targetLang === "en") return text;

  const cacheKey = `${targetLang}:${text}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    );
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      translationCache.set(cacheKey, translated);
      return translated;
    }
  } catch (error) {
    console.warn("Translation failed:", error);
  }

  return text;
}

async function translateNewsItem(item, targetLang) {
  const [title, summary, category, source] = await Promise.all([
    translateText(item.title, targetLang),
    translateText(item.summary, targetLang),
    translateText(item.category, targetLang),
    translateText(item.source, targetLang)
  ]);

  return { ...item, title, summary, category, source };
}

async function translateAllItems(targetLang) {
  return Promise.all(newsItems.map(item => translateNewsItem(item, targetLang)));
}

function getCategories() {
  return ["All", ...new Set(newsItems.map((item) => item.category))];
}

function matchesSearch(item, query) {
  const text = `${item.title} ${item.source} ${item.category} ${item.summary}`.toLowerCase();
  return text.includes(query.trim().toLowerCase());
}

function getFilteredItems(translatedItems = newsItems) {
  const query = searchInput.value;
  return translatedItems.filter((item) => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    return categoryMatch && matchesSearch(item, query);
  });
}

function renderFilters() {
  const uiText = uiTranslations[currentLanguage] || uiTranslations["en"];
  filters.innerHTML = getCategories()
    .map((category) => {
      const activeClass = category === activeCategory ? " is-active" : "";
      const label = category === "All" ? uiText.all || "All" : category;
      return `<button class="chip${activeClass}" type="button" data-category="${category}">${label}</button>`;
    })
    .join("");
}

function renderStats() {
  const highImpact = newsItems.filter((item) => item.impact === "High").length;
  todayCount.textContent = newsItems.length;
  highImpactCount.textContent = highImpact;
  categoryCount.textContent = getCategories().length - 1;
}

function renderSpotlight(translatedItems = newsItems) {
  const uiText = uiTranslations[currentLanguage] || uiTranslations["en"];
  const topItem = translatedItems.find((item) => item.impact === "High") ?? translatedItems[0];
  spotlightCard.innerHTML = `
    <h3>${topItem.title}</h3>
    <p>${topItem.summary}</p>
    <div class="meta-row">
      <span>${topItem.category}</span>
      <a class="card-link" href="${topItem.url}" target="_blank" rel="noreferrer">${uiText.readMore}</a>
    </div>
  `;
}

function renderCards(translatedItems = newsItems) {
  const uiText = uiTranslations[currentLanguage] || uiTranslations["en"];
  const items = getFilteredItems(translatedItems);

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty-state">${uiText.noMatch}</div>`;
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
          <a class="card-link" href="${item.url}" target="_blank" rel="noreferrer">${uiText.openSource}</a>
        </article>
      `
    )
    .join("");
}

function updateUIText() {
  const uiText = uiTranslations[currentLanguage] || uiTranslations["en"];

  document.querySelector(".search span").textContent = uiText.search;
  document.querySelector(".language-selector span").textContent = uiText.language;
  searchInput.placeholder = uiText.searchPlaceholder;

  document.querySelectorAll(".stat-card")[0].querySelector("span").textContent = uiText.highImpact;
  document.querySelectorAll(".stat-card")[1].querySelector("span").textContent = uiText.categories;
  document.querySelectorAll(".stat-card")[2].querySelector("span").textContent = uiText.learningTip;

  document.querySelector("#spotlight-title").textContent = uiText.todayDirection;
  document.querySelector(".spotlight .eyebrow").textContent = uiText.topSignal;

  document.querySelector("#learning-title").textContent = uiText.todayExercise;
  document.querySelector(".learning-card .eyebrow").textContent = uiText.learningPrompt;
  document.querySelector(".learning-card p:last-child").textContent = uiText.exerciseDesc;
}

async function render(translatedItems = newsItems) {
  renderFilters();
  renderStats();
  renderSpotlight(translatedItems);
  renderCards(translatedItems);
  updateUIText();
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderCards();
});

searchInput.addEventListener("input", renderCards);

languageSelect.addEventListener("change", async (event) => {
  currentLanguage = event.target.value;
  languageSelect.disabled = true;

  const translatedItems = await translateAllItems(currentLanguage);

  languageSelect.disabled = false;
  render(translatedItems);
});

render();
