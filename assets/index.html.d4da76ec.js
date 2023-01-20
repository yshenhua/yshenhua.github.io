import{_ as t,o as e,c as a,e as i}from"./app.8b62e66d.js";const r={},h=i('<h1 id="git-\u5E38\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#git-\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a> Git \u5E38\u7528\u547D\u4EE4</h1><h2 id="git-clone" tabindex="-1"><a class="header-anchor" href="#git-clone" aria-hidden="true">#</a> git-clone</h2><h4 id="git-clone-o-name-b-name-repository-directory" tabindex="-1"><a class="header-anchor" href="#git-clone-o-name-b-name-repository-directory" aria-hidden="true">#</a> git clone [-o &lt;name&gt;] [-b &lt;name&gt;] &lt;repository&gt; [&lt;directory&gt;]</h4><p>\u514B\u9686\u73B0\u6709\u7684\u4ED3\u5E93\u3002</p><ul><li><p>-o &lt;name&gt; | --origin &lt;name&gt;<br> \u4E3A\u6765\u6E90\u4ED3\u5E93\u547D\u540D\uFF0C\u9ED8\u8BA4\u4E3A origin\u3002\u540E\u7EED\u4E5F\u53EF\u4EE5\u901A\u8FC7 <code>git remote rename &lt;old&gt; &lt;new&gt;</code> \u547D\u4EE4\u4FEE\u6539\u3002</p></li><li><p>-b &lt;name&gt; | --branch &lt;name&gt;<br> \u6307\u5B9A\u5206\u652F\u6216\u8005\u6807\u7B7E\uFF0C\u4E0D\u6307\u5B9A\u65F6\u9ED8\u8BA4\u4E3A\u4E3B\u5206\u652F\u3002</p></li><li><p>&lt;directory&gt;<br> \u628A\u4ED3\u5E93\u514B\u9686\u5230\u6307\u5B9A\u7684\u76EE\u5F55\u4E0B\uFF0C\u4E0D\u6307\u5B9A\u76EE\u5F55\u65F6\u9ED8\u8BA4\u5728\u5F53\u524D\u4F4D\u7F6E\u521B\u5EFA\u4E00\u4E2A\u548C\u4ED3\u5E93\u540D\u4E00\u6837\u7684\u76EE\u5F55\u3002</p></li></ul><h2 id="git-add" tabindex="-1"><a class="header-anchor" href="#git-add" aria-hidden="true">#</a> git-add</h2><h4 id="git-add-pathspec-\u200B-u-a" tabindex="-1"><a class="header-anchor" href="#git-add-pathspec-\u200B-u-a" aria-hidden="true">#</a> git add ([&lt;pathspec&gt;\u2026\u200B] | [-u] | [-A])</h4><p>\u5C06\u6587\u4EF6\u6DFB\u52A0\u5230\u6682\u5B58\u533A\u3002</p><ul><li>&lt;pathspec&gt;\u2026\u200B</li></ul><p>\u5C06\u4E00\u4E2A\u6216\u591A\u4E2A\u6587\u4EF6\u6DFB\u52A0\u5230\u6682\u5B58\u533A\uFF0C\u652F\u6301\u6587\u4EF6\u901A\u914D\u7B26\u3002</p><ul><li>-u | --update</li></ul><p>\u5FFD\u7565\u65B0\u589E\u6587\u4EF6\uFF0C\u5C06\u4FEE\u6539\u548C\u5220\u9664\u6587\u4EF6\u66F4\u65B0\u5230\u6682\u5B58\u533A\u3002</p><ul><li>-A | --all | --no-ignore-removal</li></ul><p>\u5C06\u6240\u6709\u6587\u4EF6\u6DFB\u52A0\u5230\u6682\u5B58\u533A\uFF0C\u7B49\u540C\u4E8E <code>git add .</code>\u3002</p><h2 id="git-commit" tabindex="-1"><a class="header-anchor" href="#git-commit" aria-hidden="true">#</a> git-commit</h2><h4 id="git-commit-m-msg-amend" tabindex="-1"><a class="header-anchor" href="#git-commit-m-msg-amend" aria-hidden="true">#</a> git commit [-m &lt;msg&gt;] [--amend]</h4><p>\u5C06\u6682\u5B58\u533A\u5185\u5BB9\u6DFB\u52A0\u5230\u672C\u5730\u4ED3\u5E93\u4E2D\u3002\u4E0D\u4F7F\u7528\u5176\u4ED6\u53C2\u6570\u65F6\u4F1A\u6253\u5F00\u9ED8\u8BA4\u7684\u6587\u672C\u7F16\u8F91\u5668\u8BA9\u4F60\u8F93\u5165\u63D0\u4EA4\u4FE1\u606F\u3002</p><ul><li>-m &lt;msg&gt; | --message=&lt;msg&gt;</li></ul><p>\u4F7F\u7528\u7ED9\u5B9A\u7684 &lt;msg&gt; \u4F5C\u4E3A\u63D0\u4EA4\u6D88\u606F\u3002\u5982\u679C\u4F7F\u7528\u591A\u4E2A -m \u9009\u9879\uFF0C\u5B83\u4EEC\u7684\u503C\u5C06\u4F5C\u4E3A\u4E00\u4E2A\u4E2A\u6BB5\u843D\u8FDE\u63A5\u8D77\u6765\u3002</p><ul><li>--amend</li></ul><p>\u901A\u8FC7\u8BE5\u63D0\u4EA4\u66FF\u6362\u6389\u65E7\u7684\u63D0\u4EA4\uFF0C\u5373\u4FEE\u6539\u63D0\u4EA4\u3002</p><h2 id="git-branch" tabindex="-1"><a class="header-anchor" href="#git-branch" aria-hidden="true">#</a> git-branch</h2><h4 id="git-branch-r-a-v" tabindex="-1"><a class="header-anchor" href="#git-branch-r-a-v" aria-hidden="true">#</a> git branch [-r | -a] [-v]</h4><p>\u5217\u51FA\u5206\u652F\uFF0C\u6CA1\u6709\u53C2\u6570\u65F6\uFF0C\u9ED8\u8BA4\u5217\u51FA\u672C\u5730\u5206\u652F\u3002</p><ul><li>-r | --remotes</li></ul><p>\u5217\u51FA\u8FDC\u7A0B\u8DDF\u8E2A\u5206\u652F\u3002</p><ul><li>-a | --all</li></ul><p>\u5217\u51FA\u8FDC\u7A0B\u8DDF\u8E2A\u5206\u652F\u548C\u672C\u5730\u5206\u652F\u3002</p><ul><li>-v | -vv | --verbose</li></ul><p>\u663E\u793A\u6BCF\u4E2A\u5206\u652F\u5F53\u524D\u6307\u5411\u7684\u63D0\u4EA4\u8BB0\u5F55\u3002</p><h4 id="git-branch-branchname-start-point" tabindex="-1"><a class="header-anchor" href="#git-branch-branchname-start-point" aria-hidden="true">#</a> git branch &lt;branchname&gt; [&lt;start-point&gt;]</h4><p>\u521B\u5EFA\u5206\u652F\u3002</p><ul><li>&lt;start-point&gt;</li></ul><p>\u65B0\u5206\u652F\u5F53\u524D\u6307\u5411\uFF0C\u53EF\u4EE5\u662F\u5206\u652F\u540D\uFF0Ccommit-id \u6216\u8005\u6807\u7B7E\u3002\u4E0D\u6307\u5B9A\u8BE5\u53C2\u6570\u65F6\u9ED8\u8BA4\u4E3A\u5F53\u524D\u5206\u652F\u540D\u3002</p><h4 id="git-branch-d-d-r-branchname-\u200B" tabindex="-1"><a class="header-anchor" href="#git-branch-d-d-r-branchname-\u200B" aria-hidden="true">#</a> git branch (-d | -D) [-r] &lt;branchname&gt;\u2026\u200B</h4><p>\u5220\u9664\u4E00\u4E2A\u6216\u591A\u4E2A\u5206\u652F\u3002</p><ul><li>-d | --delete</li></ul><p>\u8981\u5220\u9664\u7684\u5206\u652F\u5FC5\u987B\u5B8C\u5168\u5408\u5E76\u5230\u5176\u4E0A\u6E38\u5206\u652F\u4E2D\u3002</p><ul><li>-D</li></ul><p>\u76F8\u5F53\u4E8E <code>--delete --force</code>\uFF0C\u5373\u6CA1\u6709\u5B8C\u5168\u5408\u5E76\u5230\u5176\u4E0A\u6E38\u5206\u652F\u4E5F\u80FD\u5220\u9664\u3002</p><ul><li>-r | --remotes</li></ul><p>\u5220\u9664\u8FDC\u7A0B\u8DDF\u8E2A\u5206\u652F\u3002</p><h2 id="git-checkout" tabindex="-1"><a class="header-anchor" href="#git-checkout" aria-hidden="true">#</a> git-checkout</h2><h4 id="git-checkout-f-m-branch" tabindex="-1"><a class="header-anchor" href="#git-checkout-f-m-branch" aria-hidden="true">#</a> git checkout [-f] [-m] [&lt;branch&gt;]</h4><p>\u5207\u6362\u5206\u652F\u3002</p><ul><li>-f | --force</li></ul><p>\u4E22\u5F03\u672C\u5730\u66F4\u6539\uFF0C\u5F3A\u5236\u5207\u6362\u5206\u652F\u3002\u53EF\u4EE5\u4F7F\u7528 <code>git checkout -f</code> \u653E\u5F03\u5F53\u524D\u5206\u652F\u7684\u672C\u5730\u66F4\u6539\u3002</p><ul><li>-m | --merge</li></ul><p>\u5207\u6362\u5206\u652F\u540C\u65F6\u5C06\u672C\u5730\u66F4\u6539\u5408\u5E76\u8FC7\u53BB\u3002</p><h4 id="git-checkout-b-b-orphan-new-branch-start-point" tabindex="-1"><a class="header-anchor" href="#git-checkout-b-b-orphan-new-branch-start-point" aria-hidden="true">#</a> git checkout [[-b | -B | --orphan] &lt;new_branch&gt;] [&lt;start-point&gt;]</h4><p>\u5207\u6362\u5230\u65B0\u5EFA\u7684\u5206\u652F\u3002</p><ul><li>-b &lt;new_branch&gt;</li></ul><p>\u521B\u5EFA\u65B0\u5206\u652F\u5E76\u5207\u6362\u5230\u8BE5\u5206\u652F\u3002</p><ul><li>-B &lt;new_branch&gt;</li></ul><p>\u5F3A\u5236\u521B\u5EFA\u65B0\u5206\u652F\u5E76\u5207\u6362\u5230\u8BE5\u5206\u652F\uFF08\u9047\u5230\u540C\u540D\u5206\u652F\u4F1A\u5C06\u5176\u8986\u76D6\uFF09\u3002</p><ul><li>--orphan &lt;new_branch&gt;</li></ul><p>\u521B\u5EFA\u4E00\u4E2A\u6CA1\u6709\u4EFB\u4F55\u63D0\u4EA4\u5386\u53F2\u7684\u65B0\u5206\u652F\u5E76\u5207\u6362\u5230\u8BE5\u5206\u652F\u3002</p><ul><li>&lt;start-point&gt;</li></ul><p>\u540C <a href="#git-branch-branchname-start-point"><code>git branch &lt;branchname&gt; [&lt;start-point&gt;]</code></a> \u4E2D\u7684 &lt;start-point&gt; \u4E00\u6837\u3002</p><h2 id="git-fetch" tabindex="-1"><a class="header-anchor" href="#git-fetch" aria-hidden="true">#</a> git-fetch</h2><h4 id="git-fetch-repository-refspec-\u200B" tabindex="-1"><a class="header-anchor" href="#git-fetch-repository-refspec-\u200B" aria-hidden="true">#</a> git fetch [&lt;repository&gt; [&lt;refspec&gt;\u2026\u200B]]</h4><ul><li>&lt;repository&gt;</li></ul><p>\u6765\u6E90\u4ED3\u5E93\uFF0C\u53EF\u4EE5\u662F URL \u6216\u8005\u540D\u79F0\u3002</p><h2 id="git-pull" tabindex="-1"><a class="header-anchor" href="#git-pull" aria-hidden="true">#</a> git-pull</h2><h4 id="git-pull-f-repository-refspec-\u200B" tabindex="-1"><a class="header-anchor" href="#git-pull-f-repository-refspec-\u200B" aria-hidden="true">#</a> git pull [-f] [&lt;repository&gt; [&lt;refspec&gt;\u2026\u200B]]</h4><ul><li><p>-f | --force</p></li><li><p>&lt;repository&gt;</p></li></ul><p>\u6765\u6E90\u4ED3\u5E93\uFF0C\u53EF\u4EE5\u662F URL \u6216\u8005\u540D\u79F0\u3002</p><ul><li>&lt;refspec&gt;\u2026</li></ul><p>\u6307\u5B9A\u8981\u62C9\u53D6\u7684\u5206\u652F\u5DF2\u7ECF\u8981\u66F4\u65B0\u7684\u672C\u5730\u5206\u652F</p><h2 id="git-stash" tabindex="-1"><a class="header-anchor" href="#git-stash" aria-hidden="true">#</a> git-stash</h2><h2 id="git-cherry-pick" tabindex="-1"><a class="header-anchor" href="#git-cherry-pick" aria-hidden="true">#</a> git-cherry-pick</h2><h2 id="git-remote" tabindex="-1"><a class="header-anchor" href="#git-remote" aria-hidden="true">#</a> git-remote</h2><h2 id="git-push" tabindex="-1"><a class="header-anchor" href="#git-push" aria-hidden="true">#</a> git-push</h2>',73),l=[h];function n(c,d){return e(),a("div",null,l)}var p=t(r,[["render",n],["__file","index.html.vue"]]);export{p as default};
