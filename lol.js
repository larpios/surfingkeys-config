// Description: My Surfingkeys config file.

// unmaps
const unmaps = {
  mappings: ["<ctrl-j>"],
  searchEngines: [
    {
      leader: "s",
      aliases: ["w", "b"],
    },
  ],
};

unmaps.mappings.forEach((mapping) => {
  api.unmap(mapping);
});

unmaps.searchEngines.forEach((engine) => {
  engine.aliases.forEach((alias) => {
    api.removeSearchAlias(alias, engine.leader);
  });
});

const maps = {
  searchEngines: [
    {
      leader: "s",
      alias: "d",
      name: "duckduckgo",
      search: "https://duckduckgo.com/?q=",
      compl: "https://duckduckgo.com/ac/?q=",
      callback: (response) => JSON.parse(response.text).map((r) => r.phrase),
    },
    {
      leader: "s",
      alias: "br",
      name: "Brave",
      search: "https://search.brave.com/search?q=",
      compl: "https://search.brave.com/api/suggest?q=",
      callback: (response) => JSON.parse(response.text)[1],
    },
    {
      alias: "wi",
      name: "Wikipedia",
      search: "https://en.wikipedia.org/wiki/",
      compl:
        "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&gpssearch=",
      callback: (response) =>
        Object.values(JSON.parse(response.text).query.pages).map(
          (p) => p.title
        ),
    },
    {
      alias: "wt",
      name: "wiktionary",
      search: "https://en.wiktionary.org/w/index.php?search=",
      compl:
        "https://en.wiktionary.org/w/api.php?action=query&format=json&generator=prefixsearch&gpssearch=",
      callback: (response) =>
        Object.values(JSON.parse(response.text).query.pages).map(
          (p) => p.title
        ),
    },
    {
      alias: "ne",
      name: "NaverEnglish",
      search: "https://en.dict.naver.com/#/search?query=",
      compl: "https://ac-dict.naver.com/enko/ac?st=11&r_lt=11&q=",
      callback: (response) => {
        var res = JSON.parse(response.text);
        return res.items[0].concat(res.items[1]).map((r) => r[0][0]);
      },
    },
    {
      alias: "nh",
      name: "NaverHanja",
      search: "https://hanja.dict.naver.com/#/search?query=",
      compl: "https://ac-dict.naver.com/ccko/ac?st=11&r_lt=11&q=",
      callback: (response) => {
        var res = JSON.parse(response.text);
        return res.items[0].concat(res.items[1]).map((r) => r[0][0]);
      },
    },
    {
      alias: "nz",
      name: "NaverChinese",
      search: "https://zh.dict.naver.com/#/search?query=",
      compl: "https://ac-dict.naver.com/zhko/ac?st=11&r_lt=11&q=",
      callback: (response) => {
        var res = JSON.parse(response.text);
        return res.items[0].concat(res.items[1]).map((r) => r[0][0]);
      },
    },
    {
      alias: "nj",
      name: "NaverJapanese",
      search: "https://ja.dict.naver.com/#/search?query=",
      compl: "https://ac-dict.naver.com/jako/ac?st=11&r_lt=11&q=",
      callback: (response) => {
        var res = JSON.parse(response.text);
        return res.items[0].concat(res.items[1]).map((r) => r[0][0]);
      },
    },
    {
      alias: "nk",
      name: "NaverKorean",
      search: "https://ko.dict.naver.com/#/search?query=",
      compl: "https://ac-dict.naver.com/koko/ac?st=11&r_lt=11&q=",
      callback: (response) => {
        var res = JSON.parse(response.text);
        return res.items[0].concat(res.items[1]).map((r) => r[0][0]);
      },
    },
    {
      alias: "cs",
      name: "chromestore",
      search: "https://chrome.google.com/webstore/search/",
    },
    {
      alias: "re",
      name: "reddit",
      search: "https://www.reddit.com/search?sort=relevance&t=all&q=",
    },
    {
      alias: "cam",
      name: "CambridgeDictionary",
      search: "https://dictionary.cambridge.org/dictionary/english/",
      compl: "https://dictionary.cambridge.org/english/?q=",
      callback: (response) =>
        JSON.parse(response.text).results.map((r) => r.searchtext),
    },
    {
      alias: "ox",
      name: "OxfordDictionary",
      search: "https://www.oxfordlearnersdictionaries.com/definition/english/",
      compl:
        "https://www.oxfordlearnersdictionaries.com/autocomplete/english/?q=",
      callback: (response) =>
        JSON.parse(response.text).results.map((r) => r.searchtext),
    },
    {
      alias: "ji",
      name: "Jisho.org",
      search: "https://jisho.org/search/",
    },
    {
      alias: "na",
      name: "Naver",
      search:
        "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=",
      compl:
        "https://ac.search.naver.com/nx/ac?r_format=json&r_enc=UTF-8&r_unicode=0&con=0&frm=nv&ans=2&t_koreng=1&run=2&rev=4&q_enc=UTF-8&st=100&q=",
      callback: (response) =>
        JSON.parse(response.text).items[0].map((r) => r[0]),
    },
    {
      alias: "gt",
      name: "GoogleTranslate",
      search: "https://translate.google.com/?sl=auto&tl=ko&text=",
    },
  ],
};

maps.searchEngines.forEach((engine) => {
  api.addSearchAlias(
    engine.alias,
    engine.name,
    engine.search,
    engine.leader || "s",
    engine.compl || null,
    engine.callback || null
  );
});

const copyImage = async (image) => {
  const img = await fetch(image.src)
    .then((response) => response.blob())
    .then((blob) => createImageBitmap(blob));
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const pngBlob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );
  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": pngBlob }),
  ]);
  api.Front.showBanner(`Copied: ${image.src}`);
};

api.mapkey(";ys", "Copy Image Source", function () {
  api.Hints.create("img[src]", (element) => {
    api.Clipboard.write(element.src);
  });
});

api.mapkey(";gs", "Open Image Source", function () {
  api.Hints.create("img[src]", (element) => {
    api.tabOpenLink(element.src);
  });
});

api.mapkey("ye", "Copy Image to Clipboard", function () {
  api.Hints.create("img[src]", copyImage);
});

api.mapkey("yme", "Copy Multiple Images to Clipboard", function () {
  var linksToYank = [];
  api.Hints.create("img[src]", copyImage, { multipleHits: true });
});

api.cmap("<Ctrl-j>", "<Tab>");
api.cmap("<Ctrl-k>", "<Shift-Tab>");

// an example to remove mapkey `Ctrl-i`
// api.unmap("<ctrl-i>");

// unmap all the mappings in the `unmaps` object

api.map("F", "gf");

api.Front.registerInlineQuery({
  url: function (q) {
    return `https://jisho.org/search/${q}`;
  },
  parseResult: function (res) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(res.text, "text/html");
    var result = doc.querySelector("#primary>div.exact_block");
    if (result) {
      result.querySelectorAll("div>span.furigana").forEach(function (e) {
        br = document.createElement("br");
        e.appendChild(br);
      });
      result.querySelectorAll("h4").forEach(function (e) {
        e.remove();
      });
      result
        .querySelectorAll("div>div.concept_light-status")
        .forEach(function (e) {
          e.remove();
        });
      result.querySelectorAll("div>a.light-details_link").forEach(function (e) {
        e.remove();
      });
      result
        .querySelectorAll("div>span.meaning-abstract")
        .forEach(function (e) {
          e.remove();
        });
      result
        .querySelectorAll("div>span.supplemental_info")
        .forEach(function (e) {
          e.outerHTML = "&nbsp;" + e.outerHTML;
        });
      var exp = result.innerHTML;
      return exp;
    }
  },
});

// settings
settings.scrollStepSize = 140;
settings.defaultSearchEngine = "d";
settings.omnibarSuggestion = true;

themes = {
  def: `
.sk_theme {
    font-family: Input Sans Condensed, Charcoal, sans-serif;
    font-size: 14pt;
    background: #24272e;
    color: #abb2bf;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d0d0d0;
}
.sk_theme .url {
    color: #61afef;
}
.sk_theme .annotation {
    color: #56b6c2;
}
.sk_theme .omnibar_highlight {
    color: #528bff;
}
.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
    color: #98c379;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #303030;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #3e4452;
}
#sk_status, #sk_find {
    font-size: 20pt;
}`,
  b0o: `
  body {
    font-family: "Input Mono", "DejaVu Sans Mono", DejaVu, Arial, sans-serif;
    font-size: 12pt;
  }

  #sk_keystroke kbd {
    font-family: "Sudo Nerd Font Mono", "Sudo Mono", "Sudo",
      "Input Mono Nerd Font", "Input Mono", "DejaVu Sans Mono", "DejaVu", "Arial",
      sans-serif;
    font-size: 10pt;
  }

  #sk_omnibarSearchArea {
    margin: 0 !important;
    padding: 0.5rem 1rem !important;
    border-bottom: none !important;
  }

  #sk_omnibarSearchResult {
    margin: 0 !important;
  }

  #sk_omnibar li {
    background: none !important;
    padding: 0.35rem 0.5rem !important;
  }

  #sk_omnibarSearchResult > ul:nth-child(1) {
    margin-bottom: 0px !important;
    padding: 0 !important;
    padding-bottom: 10px !important;
  }

  #sk_omnibar .separator {
    padding-left: 8px !important;
  }

  @media (prefers-color-scheme: light) {
    body {
      color: #483270;
    }

    #sk_omnibar {
      background-color: #f5f3fd !important;
      color: #59446f !important;
      box-shadow: 0px 3px 15px -6px rgba(53, 13, 81, 0.7) !important;
    }

    #sk_omnibar .prompt {
      color: #c2b2d7 !important;
    }

    #sk_omnibar .separator {
      color: #d4b1ff !important;
    }

    #sk_omnibar input {
      color: #351d53 !important;
    }

    #sk_omnibarSearchResult {
      border-top: 1px solid #e1cff5 !important;
    }

    #sk_omnibar li.focused {
      background-color: #e1ddff !important;
      color: #351d53 !important;
    }

    #sk_banner,
    #sk_keystroke {
      border: 1px solid #d7b0ff;
      background: #e9d9ee;
    }

    #sk_keystroke .annotation {
      color: #483270;
    }

    #sk_keystroke kbd {
      color: black;
      background: white;
    }

    #sk_keystroke kbd .candidates {
      color: #ff7a75;
    }
  }

  @media (prefers-color-scheme: dark) {
    body {
      color: #d7b0ff;
    }

    #sk_omnibar {
      background-color: #2a323e;
      color: #cad1d7;
    }

    #sk_omnibar .prompt {
      color: #eef5fb !important;
    }

    #sk_omnibar .separator {
      color: #8af4ff !important;
      padding-left: 8px !important;
    }

    #sk_omnibar input {
      color: white !important;
    }

    #sk_omnibarSearchResult {
      border-top: 1px solid #545f6f !important;
    }

    #sk_omnibar li.focused {
      background: #181d24 !important;
      color: #eef5fb !important;
    }

    #sk_banner,
    #sk_keystroke {
      border: 1px solid #d7b0ff;
      background: #483270;
    }

    #sk_keystroke .annotation {
      color: #d7b0ff;
    }

    #sk_keystroke kbd {
      color: #fff;
      background: #7a57a4;
      border: 1px solid #2d0080;
      box-shadow: none;
    }

    #sk_keystroke kbd .candidates {
      color: #ff8cf8;
    }
  }

  /* Disable RichHints CSS animation */
  .expandRichHints {
    animation: none;
  }
  .collapseRichHints {
    animation: none;
  }
`,
  b0o_new: `
@media (prefers-color-scheme: light) {
  :root {
    --color-shadow: rgba(53, 13, 81, 0.7);

    --color-bg-0: #f5f3fd;
    --color-bg-1: #e9d9ee;
    --color-bg-2: #e1ddff;
    --color-bg-3: #ffffff;

    --color-fg-0: #000000;
    --color-fg-1: #351d53;
    --color-fg-2: #483270;
    --color-fg-3: #59446f;

    --color-accent-0: #c2b2d7;
    --color-accent-1: #d4b1ff;
    --color-accent-2: #e1cff5;
    --color-accent-3: #d7b0ff;
    --color-accent-4: #ff7a75;
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-shadow: ;

    --color-bg-0: #2a323e;
    --color-bg-1: ;
    --color-bg-2: ;
    --color-bg-3: ;

    --color-fg-0: ;
    --color-fg-1: ;
    --color-fg-2: #d7b0ff;
    --color-fg-3: ;

    --color-accent-0: ;
    --color-accent-1: ;
    --color-accent-2: ;
    --color-accent-3: ;
    --color-accent-4: ;
  }
}

@media (prefers-color-scheme: light) {
  body {
    color: var(--color-fg-2);
  }

  #sk_omnibar {
    background-color: var(--color-bg-0) !important;
    color: var(--color-fg-3) !important;
    box-shadow: 0px 3px 15px -6px var(--color-shadow) !important;
  }

  #sk_omnibar .prompt {
    color: var(--color-accent-0) !important;
  }

  #sk_omnibar .separator {
    color: var(--color-accent-1) !important;
  }

  #sk_omnibar input {
    color: var(--color-fg-1) !important;
  }

  #sk_omnibarSearchResult {
    border-top: 1px solid #e1cff5 !important;
  }

  #sk_omnibar li.focused {
    background-color: #e1ddff !important;
    color: var(--color-fg-1) !important;
  }

  #sk_banner,
  #sk_keystroke {
    border: 1px solid var(--color-accent-3);
    background: var(--color-bg-1);
  }

  #sk_keystroke .annotation {
    color: var(--color-fg-2);
  }

  #sk_keystroke kbd {
    color: var(--color-fg-0);
    background: var(--color-bg-3);
  }

  #sk_keystroke kbd .candidates {
    color: var(--color-accent-4);
  }
}

@media (prefers-color-scheme: dark) {
  body {
    color: #d7b0ff;
  }

  #sk_omnibar {
    background-color: #2a323e;
    color: #cad1d7;
  }

  #sk_omnibar .prompt {
    color: #eef5fb !important;
  }

  #sk_omnibar .separator {
    color: #8af4ff !important;
    padding-left: 8px !important;
  }

  #sk_omnibar input {
    color: white !important;
  }

  #sk_omnibarSearchResult {
    border-top: 1px solid #545f6f !important;
  }

  #sk_omnibar li.focused {
    background: #181d24 !important;
    color: #eef5fb !important;
  }

  #sk_banner,
  #sk_keystroke {
    border: 1px solid #d7b0ff;
    background: #483270;
  }

  #sk_keystroke .annotation {
    color: #d7b0ff;
  }

  #sk_keystroke kbd {
    color: #fff;
    background: #7a57a4;
    border: 1px solid #2d0080;
    box-shadow: none;
  }

  #sk_keystroke kbd .candidates {
    color: #ff8cf8;
  }
}

* {
  font-family: "Sudo Nerd Font Mono", "Sudo Mono", "Sudo",
    "Input Mono Nerd Font", "Input Mono", "DejaVu Sans Mono", "DejaVu", "Arial",
    sans-serif;
}

body {
  font-size: 12pt;
}

#sk_keystroke kbd {
  font-size: 10pt;
}

#sk_omnibarSearchArea {
  margin: 0 !important;
  padding: 0.5rem 1rem !important;
  border-bottom: none !important;
}

#sk_omnibarSearchResult {
  margin: 0 !important;
  max-height: unset;
}

#sk_omnibar li {
  background: none !important;
  padding: 0.35rem 0.5rem !important;
}

#sk_omnibarSearchResult > ul:nth-child(1) {
  margin-bottom: 0px !important;
  padding: 0 !important;
  padding-bottom: 10px !important;
}

#sk_omnibar .separator {
  padding-left: 8px !important;
}

@media (prefers-color-scheme: light) {
  body {
    color: #483270;
  }

  #sk_omnibar {
    background-color: #f5f3fd !important;
    color: #59446f !important;
    box-shadow: 0px 3px 15px -6px rgba(53, 13, 81, 0.7) !important;
  }

  #sk_omnibar .prompt {
    color: #c2b2d7 !important;
  }

  #sk_omnibar .separator {
    color: #d4b1ff !important;
  }

  #sk_omnibar input {
    color: #351d53 !important;
  }

  #sk_omnibarSearchResult {
    border-top: 1px solid #e1cff5 !important;
  }

  #sk_omnibar li.focused {
    background-color: #e1ddff !important;
    color: #351d53 !important;
  }

  #sk_banner,
  #sk_keystroke {
    border: 1px solid #d7b0ff;
    background: #e9d9ee;
  }

  #sk_keystroke .annotation {
    color: #483270;
  }

  #sk_keystroke kbd {
    color: black;
    background: white;
  }

  #sk_keystroke kbd .candidates {
    color: #ff7a75;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    color: #d7b0ff;
  }

  #sk_omnibar {
    background-color: #2a323e;
    color: #cad1d7;
  }

  #sk_omnibar .prompt {
    color: #eef5fb !important;
  }

  #sk_omnibar .separator {
    color: #8af4ff !important;
    padding-left: 8px !important;
  }

  #sk_omnibar input {
    color: white !important;
  }

  #sk_omnibarSearchResult {
    border-top: 1px solid #545f6f !important;
  }

  #sk_omnibar li.focused {
    background: #181d24 !important;
    color: #eef5fb !important;
  }

  #sk_banner,
  #sk_keystroke {
    border: 1px solid #d7b0ff;
    background: #483270;
  }

  #sk_keystroke .annotation {
    color: #d7b0ff;
  }

  #sk_keystroke kbd {
    color: #fff;
    background: #7a57a4;
    border: 1px solid #2d0080;
    box-shadow: none;
  }

  #sk_keystroke kbd .candidates {
    color: #ff8cf8;
  }
}

/* Disable RichHints CSS animation */
.expandRichHints {
  animation: none;
}
.collapseRichHints {
  animation: none;
}

/* Custom OmniBar styles */

.pill {
  background-color: #ff8989;
  color: white;
  border-radius: 10px;
  padding: 2px 8px;
}
`,
  rose_pine: `
  .sk_theme {
    background: #191724d6;
    color: #e0def4;
  }
  .sk_theme input {
    color: #e0def4;
  }
  .sk_theme .url {
    color: #c4a7e7;
  }
  .sk_theme .annotation {
    color: #ebbcba;
  }
  .sk_theme kbd {
    background: #26233a;
    color: #e0def4;
  }
  .sk_theme .frame {
    background: #1f1d2e;
  }
  .sk_theme .omnibar_highlight {
    color: #8b83c5;
  }
  .sk_theme .omnibar_folder {
    color: #e0def4;
  }
  .sk_theme .omnibar_timestamp {
    color: #9ccfd8;
  }
  .sk_theme .omnibar_visitcount {
    color: #9ccfd8;
  }
  .sk_theme .prompt, .sk_theme .resultPage {
    color: #e0def4;
  }
  .sk_theme .feature_name {
    color: #e0def4;
  }
  .sk_theme .separator {
    color: #524f67;
  }
  body {
    margin: 0;

    font-family: "JetBrains Mono NL", "Cascadia Code", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 16px;
  }
  #sk_omnibar {
    overflow: hidden;
    position: fixed;
    width: 80%;
    max-height: 80%;
    left: 10%;
    text-align: left;
    box-shadow: 0px 2px 10px #21202e;
    z-index: 2147483000;
  }
  .sk_omnibar_middle {
    top: 10%;
    border-radius: 4px;
  }
  .sk_omnibar_bottom {
    bottom: 0;
    border-radius: 4px 4px 0px 0px;
  }
  #sk_omnibar span.omnibar_highlight {
    text-shadow: 0 0 0.01em;
  }
  #sk_omnibarSearchArea .prompt, #sk_omnibarSearchArea .resultPage {
    display: inline-block;
    font-size: 20px;
    width: auto;
  }
  #sk_omnibarSearchArea>input {
    display: inline-block;
    width: 100%;
    flex: 1;
    font-size: 20px;
    margin-bottom: 0;
    padding: 0px 0px 0px 0.5rem;
    background: transparent;
    border-style: none;
    outline: none;
  }
  #sk_omnibarSearchArea {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #524f67;
  }
  .sk_omnibar_middle #sk_omnibarSearchArea {
    margin: 0.5rem 1rem;
  }
  .sk_omnibar_bottom #sk_omnibarSearchArea {
    margin: 0.2rem 1rem;
  }
  .sk_omnibar_middle #sk_omnibarSearchResult>ul {
    margin-top: 0;
  }
  .sk_omnibar_bottom #sk_omnibarSearchResult>ul {
    margin-bottom: 0;
  }
  #sk_omnibarSearchResult {
    max-height: 60vh;
    overflow: hidden;
    margin: 0rem 0.6rem;
  }
  #sk_omnibarSearchResult:empty {
    display: none;
  }
  #sk_omnibarSearchResult>ul {
    padding: 0;
  }
  #sk_omnibarSearchResult>ul>li {
    padding: 0.2rem 0rem;
    display: block;
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .sk_theme #sk_omnibarSearchResult>ul>li:nth-child(odd) {
    background: #1716252e;
  }
  .sk_theme #sk_omnibarSearchResult>ul>li.focused {
    background: #26233a;
  }
  .sk_theme #sk_omnibarSearchResult>ul>li.window {
    border: 2px solid #524f67;
    border-radius: 8px;
    margin: 4px 0px;
  }
  .sk_theme #sk_omnibarSearchResult>ul>li.window.focused {
    border: 2px solid #c4a7e7;
  }
  .sk_theme div.table {
    display: table;
  }
  .sk_theme div.table>* {
    vertical-align: middle;
    display: table-cell;
  }
  #sk_omnibarSearchResult li div.title {
    text-align: left;
  }
  #sk_omnibarSearchResult li div.url {
    font-weight: bold;
    white-space: nowrap;
  }
  #sk_omnibarSearchResult li.focused div.url {
    white-space: normal;
  }
  #sk_omnibarSearchResult li span.annotation {
    float: right;
  }
  #sk_omnibarSearchResult .tab_in_window {
    display: inline-block;
    padding: 5px;
    margin: 5px;
    box-shadow: 0px 2px 10px #21202e;
  }
  #sk_status {
    position: fixed;
    bottom: 0;
    right: 20%;
    z-index: 2147483000;
    padding: 4px 8px 0 8px;
    border-radius: 4px 4px 0px 0px;
    border: 1px solid #524f67;
    font-size: 12px;
  }
  #sk_status>span {
    line-height: 16px;
  }
  .expandRichHints span.annotation {
    padding-left: 4px;
    color: #ebbcba;
  }
  .expandRichHints .kbd-span {
    min-width: 30px;
    text-align: right;
    display: inline-block;
  }
  .expandRichHints kbd>.candidates {
    color: #e0def4;
    font-weight: bold;
  }
  .expandRichHints kbd {
    padding: 1px 2px;
  }
  #sk_find {
    border-style: none;
    outline: none;
  }
  #sk_keystroke {
    padding: 6px;
    position: fixed;
    float: right;
    bottom: 0px;
    z-index: 2147483000;
    right: 0px;
    background: #191724;
    color: #e0def4;
  }
  #sk_usage, #sk_popup, #sk_editor {
    overflow: auto;
    position: fixed;
    width: 80%;
    max-height: 80%;
    top: 10%;
    left: 10%;
    text-align: left;
    box-shadow: #21202e;
    z-index: 2147483298;
    padding: 1rem;
  }
  #sk_nvim {
    position: fixed;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 30%;
  }
  #sk_popup img {
    width: 100%;
  }
  #sk_usage>div {
    display: inline-block;
    vertical-align: top;
  }
  #sk_usage .kbd-span {
    width: 80px;
    text-align: right;
    display: inline-block;
  }
  #sk_usage .feature_name {
    text-align: center;
    padding-bottom: 4px;
  }
  #sk_usage .feature_name>span {
    border-bottom: 2px solid #524f67;
  }
  #sk_usage span.annotation {
    padding-left: 32px;
    line-height: 22px;
  }
  #sk_usage * {
    font-size: 10pt;
  }
  kbd {
    white-space: nowrap;
    display: inline-block;
    padding: 3px 5px;
    font: 11px "JetBrains Mono NL", "Cascadia Code", "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 10px;
    vertical-align: middle;
    border: solid 1px #524f67;
    border-bottom-lolor: #524f67;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #21202e;
  }
  #sk_banner {
    padding: 0.5rem;
    position: fixed;
    left: 10%;
    top: -3rem;
    z-index: 2147483000;
    width: 80%;
    border-radius: 0px 0px 4px 4px;
    border: 1px solid #524f67;
    border-top-style: none;
    text-align: center;
    color: #fff;
    background: #191724;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  #sk_tabs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    overflow: auto;
    z-index: 2147483000;
  }
  div.sk_tab {
    display: inline-block;
    border-radius: 3px;
    padding: 10px 20px;
    margin: 5px;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#191724), color-stop(100%,#191724));
    box-shadow: 0px 3px 7px 0px #21202e;
  }
  div.sk_tab_wrap {
    display: inline-block;
  }
  div.sk_tab_icon {
    display: inline-block;
    vertical-align: middle;
  }
  div.sk_tab_icon>img {
    width: 18px;
  }
  div.sk_tab_title {
    width: 150px;
    display: inline-block;
    vertical-align: middle;
    font-size: 10pt;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left: 5px;
    color: #e0def4;
  }
  div.sk_tab_url {
    font-size: 10pt;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #c4a7e7;
  }
  div.sk_tab_hint {
    display: inline-block;
    float:right;
    font-size: 10pt;
    font-weight: bold;
    padding: 0px 2px 0px 2px;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#191724), color-stop(100%,#191724));
    color: #e0def4;
    border: solid 1px #524f67;
    border-radius: 3px;
    box-shadow: #21202e;
  }
  #sk_bubble {
    position: absolute;
    padding: 9px;
    border: 1px solid #524f67;
    border-radius: 4px;
    box-shadow: 0 0 20px #21202e;
    color: #e0def4;
    background-color: #191724;
    z-index: 2147483000;
    font-size: 14px;
  }
  #sk_bubble .sk_bubble_content {
    overflow-y: scroll;
    background-size: 3px 100%;
    background-position: 100%;
    background-repeat: no-repeat;
  }
  .sk_scroller_indicator_top {
    background-image: linear-gradient(#191724, transparent);
  }
  .sk_scroller_indicator_middle {
    background-image: linear-gradient(transparent, #191724, transparent);
  }
  .sk_scroller_indicator_bottom {
    background-image: linear-gradient(transparent, #191724);
  }
  #sk_bubble * {
    color: #e0def4 !important;
  }
  div.sk_arrow>div:nth-of-type(1) {
    left: 0;
    position: absolute;
    width: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    background: transparent;
  }
  div.sk_arrow[dir=down]>div:nth-of-type(1) {
    border-top: 12px solid #524f67;
  }
  div.sk_arrow[dir=up]>div:nth-of-type(1) {
    border-bottom: 12px solid #524f67;
  }
  div.sk_arrow>div:nth-of-type(2) {
    left: 2px;
    position: absolute;
    width: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    background: transparent;
  }
  div.sk_arrow[dir=down]>div:nth-of-type(2) {
    border-top: 10px solid #e0def4;
  }
  div.sk_arrow[dir=up]>div:nth-of-type(2) {
    top: 2px;
    border-bottom: 10px solid #e0def4;
  }
  .ace_editor.ace_autocomplete {
    z-index: 2147483300 !important;
    width: 80% !important;
  }
  @media only screen and (max-width: 767px) {
    #sk_omnibar {
      width: 100%;
      left: 0;
    }
    #sk_omnibarSearchResult {
      max-height: 50vh;
      overflow: scroll;
    }
    .sk_omnibar_bottom #sk_omnibarSearchArea {
      margin: 0;
      padding: 0.2rem;
    }
  }
`,
};

const hintsCss =
  "font-size: 10pt; font-family: 'JetBrains Mono NL', 'Cascadia Code', 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 0px; color: #b7a1f9 !important; background: #191724; background-color: #2925418f";

api.Hints.style(hintsCss);
api.Hints.style(hintsCss, "text");

// set theme
settings.theme = themes.rose_pine;
