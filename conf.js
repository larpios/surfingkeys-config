// Description: My Surfingkeys config file.

// unmaps
const unmaps = {
    imaps: ["<Ctrl-a>", "<Ctrl-e>"],
    nmaps: ["<Ctrl-j>", "on"],
    searchEngines: [
        {
            leader: "s",
            aliases: ["w", "b", "s"],
        },
    ],
};


with (unmaps) {
    imaps.forEach((mapping) => {
        api.iunmap(mapping);
    });
    nmaps.forEach((mapping) => {
        api.unmap(mapping);
    });

    searchEngines.forEach((engine) => {
        engine.aliases.forEach((alias) => {
            api.removeSearchAlias(alias, engine.leader);
        });
    });
}

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
            alias: "b",
            name: "Brave",
            search: "https://search.brave.com/search?q=",
            compl: "https://search.brave.com/api/suggest?q=",
            callback: (response) => JSON.parse(response.text)[1],
        },
        {
            leader: "s",
            alias: "wi",
            name: "Wikipedia",
            search: "https://en.wikipedia.org/wiki/",
            compl:
                "https://en.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&gpssearch=",
            callback: (response) =>
                Object.values(JSON.parse(response.text).query.pages).map(
                    (p) => p.title,
                ),
        },
        {
            leader: "s",
            alias: "wt",
            name: "wiktionary",
            search: "https://en.wiktionary.org/w/index.php?search=",
            compl:
                "https://en.wiktionary.org/w/api.php?action=query&format=json&generator=prefixsearch&gpssearch=",
            callback: (response) =>
                Object.values(JSON.parse(response.text).query.pages).map(
                    (p) => p.title,
                ),
        },
        {
            leader: "s",
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
            leader: "s",
            alias: "nk",
            name: "NaverKorean",
            search: "https://kr.dict.naver.com/#/search?query=",
            compl: "https://ac-dict.naver.com/koko/ac?st=11&r_lt=11&q=",
            callback: (response) => {
                var res = JSON.parse(response.text);
                return res.items[0].concat(res.items[1]).map((r) => r[0][0]);
            },
        },
        {
            leader: "s",
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
            leader: "s",
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
            leader: "s",
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
            leader: "s",
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
            leader: "s",
            alias: "cam",
            name: "CambridgeDictionary",
            search: "https://dictionary.cambridge.org/dictionary/english/",
            compl: "https://dictionary.cambridge.org/english/?q=",
            callback: (response) =>
                JSON.parse(response.text).results.map((r) => r.searchtext),
        },
        {
            leader: "s",
            alias: "ox",
            name: "OxfordDictionary",
            search: "https://www.oxfordlearnersdictionaries.com/definition/english/",
            compl:
                "https://www.oxfordlearnersdictionaries.com/autocomplete/english/?q=",
            callback: (response) =>
                JSON.parse(response.text).results.map((r) => r.searchtext),
        },
        {
            leader: "s",
            alias: "lm",
            name: "LongmanDictinary",
            search: "https://www.ldoceonline.com/dictionary/",
            compl:
                "https://www.ldoceonline.com/autocomplete/english/?q=",
            callback: (response) =>
                JSON.parse(response.text).results.map((r) => r.searchtext),
        },
        {
            leader: "s",
            alias: "ji",
            name: "Jisho.org",
            search: "https://jisho.org/search/",
        },
        {
            leader: "s",
            alias: "cs",
            name: "chromestore",
            search: "https://chrome.google.com/webstore/search/",
        },
        {
            leader: "s",
            alias: "re",
            name: "reddit",
            search: "https://www.reddit.com/search?sort=relevance&t=all&q=",
        },
        {
            leader: "s",
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
            leader: "s",
            alias: "gt",
            name: "GoogleTranslate",
            search: "https://translate.google.com/?sl=auto&tl=ko&text=",
        },
        {
            alias: "pp",
            name: "Phind",
            search: "https://www.phind.com/agent?q=",
        },
        {
            leader: "s",
            alias: "ps",
            name: "Phind",
            search: "https://www.phind.com/search?q=",
        },
        {
            leader: "s",
            alias: "sp",
            name: "Startpage",
            compl: "https://www.startpage.com/suggestions?sc=dnfgMyLbnsDw20&t=light&q=",
            callback: (response) => JSON.parse(response.text).suggestions.map((r) => r.text),
            search: "https://www.startpage.com/sp/search?q=",
        },
        {
            leader: "s",
            alias: "an",
            name: "Anna's Archive",
            search: "https://annas-archive.org/search?q="
        }
    ],
};

maps.searchEngines.forEach((engine) => {
    api.addSearchAlias(
        engine.alias,
        engine.name,
        engine.search,
        engine.leader || "s",
        engine.compl || null,
        engine.callback || null,
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
        canvas.toBlob(resolve, "image/png"),
    );
    await navigator.clipboard.write([
        new ClipboardItem({ "image/png": pngBlob }),
    ]);
    api.Front.showBanner(`Copied: ${image.src}`);
};

api.mapkey(";ys", "Copy Image Source", function() {
    api.Hints.create("img[src]", (element) => {
        api.Clipboard.write(element.src);
    });
});

api.mapkey(";gs", "Open Image Source", function() {
    api.Hints.create("img[src]", (element) => {
        api.tabOpenLink(element.src);
    });
});

api.mapkey(";yi", "Copy Image to Clipboard", function() {
    api.Hints.create("img[src]", copyImage);
});

api.mapkey(";yI", "Copy Multiple Images to Clipboard", function() {
    api.Hints.create("img[src]", copyImage, { multipleHits: true });
});

api.cmap("<Ctrl-j>", "<Tab>");
api.cmap("<Ctrl-k>", "<Shift-Tab>");
api.cmap('<Ctrl-n>', '<Tab>');
api.cmap('<Ctrl-p>', '<Shift-Tab>');
// an example to remove mapkey `Ctrl-i`
// api.unmap("<ctrl-i>");

// unmap all the mappings in the `unmaps` object

api.map("F", "gf");

api.Front.registerInlineQuery({
    url: function(q) {
        return `https://jisho.org/search/${q}`;
    },
    parseResult: function(res) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(res.text, "text/html");
        var result = doc.querySelector("#primary>div.exact_block");
        if (result) {
            result.querySelectorAll("div>span.furigana").forEach(function(e) {
                br = document.createElement("br");
                e.appendChild(br);
            });
            result.querySelectorAll("h4").forEach(function(e) {
                e.remove();
            });
            result
                .querySelectorAll("div>div.concept_light-status")
                .forEach(function(e) {
                    e.remove();
                });
            result.querySelectorAll("div>a.light-details_link").forEach(function(e) {
                e.remove();
            });
            result
                .querySelectorAll("div>span.meaning-abstract")
                .forEach(function(e) {
                    e.remove();
                });
            result
                .querySelectorAll("div>span.supplemental_info")
                .forEach(function(e) {
                    e.outerHTML = "&nbsp;" + e.outerHTML;
                });
            var exp = result.innerHTML;
            return exp;
        }
    },
});

// settings
with (settings) {
    scrollStepSize = 140;
    defaultSearchEngine = "g";
    omnibarSuggestion = true;
    hintExplicit = true;
}

themes = {
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
    "font-size: 10pt; font-family: 'JetBrains Mono NL', 'Cascadia Code', 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 0px; color: #b7a1f9 !important; background: #191724; background-color: #292541";

api.Hints.style(hintsCss);
api.Hints.style(hintsCss, "text");

// set theme
settings.theme = themes.rose_pine;
