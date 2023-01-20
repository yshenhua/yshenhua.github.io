import{_ as p,o as m,c as u,d as s,w as a,a as n,b as t,e as l,r as e}from"./app.8b62e66d.js";const r={},d=n("h1",{id:"\u4F7F\u7528-commitlint-\u89C4\u8303-commit-\u4FE1\u606F",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u4F7F\u7528-commitlint-\u89C4\u8303-commit-\u4FE1\u606F","aria-hidden":"true"},"#"),t(" \u4F7F\u7528 commitlint \u89C4\u8303 commit \u4FE1\u606F")],-1),h=n("h2",{id:"\u5B89\u88C5-commitlint",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5B89\u88C5-commitlint","aria-hidden":"true"},"#"),t(" \u5B89\u88C5 commitlint")],-1),k=n("p",null,"\u5B89\u88C5 commitlint \u548C commitlint config-conventional\uFF0C\u7136\u540E package.json \u4E2D\u914D\u7F6E commitlint \u4EE5\u4F7F\u7528\u5B83\u3002",-1),_=n("div",{class:"language-bash ext-sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"npm"),t(),n("span",{class:"token function"},"install"),t(" @commitlint/"),n("span",{class:"token punctuation"},"{"),t("cli,config-conventional"),n("span",{class:"token punctuation"},"}"),t(` --save-dev
`)])])],-1),g=n("div",{class:"language-bash ext-sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"yarn"),t(),n("span",{class:"token function"},"add"),t(" @commitlint/"),n("span",{class:"token punctuation"},"{"),t("cli,config-conventional"),n("span",{class:"token punctuation"},"}"),t(` --dev
`)])])],-1),f=l(`<div class="language-json ext-json"><pre class="language-json"><code><span class="token property">&quot;commitlint&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;extends&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;@commitlint/config-conventional&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div>`,1),v=t("commitlint \u4F7F\u7528 "),y={href:"https://github.com/davidtheclark/cosmiconfig",target:"_blank",rel:"noopener noreferrer"},b=t("cosmiconfig"),x=t(" \u6765\u652F\u6301\u914D\u7F6E\u6587\u4EF6\uFF0C\u8FD9\u610F\u5473\u7740\u60A8\u8FD8\u53EF\u4EE5\u901A\u8FC7 .commitlintrc\u3001commitlint.config.js \u7B49\u6587\u4EF6\u914D\u7F6E commitlint\u3002"),j=n("h2",{id:"\u5B89\u88C5-husky",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5B89\u88C5-husky","aria-hidden":"true"},"#"),t(" \u5B89\u88C5 husky")],-1),q=n("div",{class:"language-bash ext-sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token comment"},"# Install Husky v6"),t(`
`),n("span",{class:"token function"},"npm"),t(),n("span",{class:"token function"},"install"),t(` husky --save-dev
`),n("span",{class:"token comment"},"# Active hooks"),t(`
npx husky `),n("span",{class:"token function"},"install"),t(`
`),n("span",{class:"token comment"},"# Add hook"),t(`
npx husky `),n("span",{class:"token function"},"add"),t(" .husky/commit-msg "),n("span",{class:"token string"},"'npx --no -- commitlint --edit $1'"),t(`
`)])])],-1),C=n("div",{class:"language-bash ext-sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token comment"},"# Install Husky v6"),t(`
`),n("span",{class:"token function"},"yarn"),t(),n("span",{class:"token function"},"add"),t(` husky --dev
`),n("span",{class:"token comment"},"# Active hooks"),t(`
`),n("span",{class:"token function"},"yarn"),t(" husky "),n("span",{class:"token function"},"install"),t(`
`),n("span",{class:"token comment"},"# Add hook"),t(`
`),n("span",{class:"token function"},"yarn"),t(" husky "),n("span",{class:"token function"},"add"),t(" .husky/commit-msg "),n("span",{class:"token string"},"'yarn commitlint --edit $1'"),t(`
`)])])],-1),I=t("\u73B0\u5728\u4E0D\u6309\u7167 "),w={href:"https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional",target:"_blank",rel:"noopener noreferrer"},G=t("@commitlint/config-conventional"),A=t(" \u89C4\u8303\u63D0\u4EA4\u7684 commit \u4F1A\u88AB\u963B\u6B62\u5E76\u7ED9\u51FA\u9519\u8BEF\u63D0\u793A\uFF1A"),N=l(`<div class="language-bash ext-sh"><pre class="language-bash"><code>$ <span class="token function">git</span> commit -m <span class="token string">&#39;project init&#39;</span>
\u29D7   input: project init
\u2716   subject may not be empty <span class="token punctuation">[</span>subject-empty<span class="token punctuation">]</span>
\u2716   <span class="token builtin class-name">type</span> may not be empty <span class="token punctuation">[</span>type-empty<span class="token punctuation">]</span>

\u2716   found <span class="token number">2</span> problems, <span class="token number">0</span> warnings
\u24D8   Get help: https://github.com/conventional-changelog/commitlint/<span class="token comment">#what-is-commitlint</span>

husky - commit-msg hook exited with code <span class="token number">1</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span>
</code></pre></div>`,1);function V(B,E){const o=e("CodeGroupItem"),c=e("CodeGroup"),i=e("ExternalLinkIcon");return m(),u("div",null,[d,h,k,s(c,null,{default:a(()=>[s(o,{title:"npm"},{default:a(()=>[_]),_:1}),s(o,{title:"yarn"},{default:a(()=>[g]),_:1})]),_:1}),f,n("p",null,[v,n("a",y,[b,s(i)]),x]),j,s(c,null,{default:a(()=>[s(o,{title:"npm"},{default:a(()=>[q]),_:1}),s(o,{title:"yarn"},{default:a(()=>[C]),_:1})]),_:1}),n("p",null,[I,n("a",w,[G,s(i)]),A]),N])}var H=p(r,[["render",V],["__file","use_commitlint.html.vue"]]);export{H as default};
