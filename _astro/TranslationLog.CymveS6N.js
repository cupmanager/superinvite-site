import{r as D}from"./index.ZbXXA13o.js";import{s as N,y as S,z as R,B as L,d as C,C as P,A as j,D as M}from"./ops.vli0wIp8.js";import{j as b,l as U}from"./_virtual_atoll-config.DucYtFlH.js";function O(e,n){if(typeof e=="function")return e(n);e!=null&&(e.current=n)}function q(...e){return n=>{let t=!1;const o=e.map(r=>{const s=O(r,n);return!t&&typeof s=="function"&&(t=!0),s});if(t)return()=>{for(let r=0;r<o.length;r++){const s=o[r];typeof s=="function"?s():O(e[r],null)}}}}function se(...e){return D.useCallback(q(...e),e)}function oe(e,n){if(n.type==="thinking")return[...e.filter(t=>t.type!=="thinking"),n];if(n.type==="text"){const t=e.filter(r=>r.type!=="thinking"),o=t[t.length-1];return o?.type==="text"?[...t.slice(0,-1),{type:"text",content:o.content+n.content}]:[...t,n]}return[...e.filter(t=>t.type!=="thinking"),n]}function ae(e){const n=e.split("/").pop()?.replace(/\.mdx$/,"");return n?n==="index"?"home":n:e}function ie(){let e=localStorage.getItem(N.apiKey);if(!e){if(e=window.prompt("Enter your Claude API key for translation:"),!e)return null;localStorage.setItem(N.apiKey,e)}return e}const B={name:"edit_file",description:"Replace exact text in the target language file. The old_string must match exactly (including whitespace and indentation). If the text is not found, you'll get an error — try with different surrounding context.",input_schema:{type:"object",properties:{old_string:{type:"string",description:"Exact text to find in the target file"},new_string:{type:"string",description:"Replacement text"}},required:["old_string","new_string"]}};function G(e){const{targetLang:n,langDiffs:t,fullSyncContents:o,glossary:r}=e,s=r?`

The site has a translation glossary. Its term choices and rules are binding — follow them even where another translation would read naturally:

${r}`:"";if(!t.length&&o?.length){const c=o.map(d=>d.lang).join(", ");return`You are syncing the ${n} version of a page to match the other language versions (${c}).

All languages are equal peers — there is no "primary" language. You have the current content of each language version. Update the ${n} version so it is consistent with the others.

Use the edit_file tool to update the ${n} file. Each edit must use exact string matching — the old_string must appear exactly in the ${n} file.

IMPORTANT: Make ALL your edit_file calls in a SINGLE response. Do not make one edit per turn — batch all edits together.

Guidelines:
- Translate human-readable text. Do NOT change URLs, file paths, IDs, or technical attributes.
- Preserve component IDs exactly as they are in the target file.
- The frontmatter's \`layout\` and the \`import\` statements below it are code, not content: never translate them. If you add a component the target file did not use before, add its import too, copied exactly from whichever language already has it — the page will not build without it.
- If other versions have components/sections that ${n} is missing, add them (translated).
- If ${n} has components/sections that no other version has, remove them.
- If text already matches the meaning, leave it as is.
- Briefly explain what you changed and any decisions, but keep explanations concise.
- If no changes are needed, say so.${s}`}const a=t.map(c=>c.lang);a.filter(c=>c!==n);const l=a.includes(n);return`You are updating the ${n} version of a page. Since the last sync, changes were made in: ${a.join(", ")}.

All languages are equal peers — there is no "primary" language. For each language that changed, you have the content from when ${n} was last synced and a diff showing what changed since then.${l?`

Note: ${n} itself also changed (e.g., a local fix). Preserve those changes while incorporating updates from other languages.`:""}

Use the edit_file tool to apply equivalent changes to the ${n} file. Each edit must use exact string matching — the old_string must appear exactly in the file.

IMPORTANT: Make ALL your edit_file calls in a SINGLE response. Do not make one edit per turn — batch all edits together.

Guidelines:
- Translate human-readable text. Do NOT change URLs, file paths, IDs, or technical attributes.
- Preserve component IDs exactly as they are in the target file.
- The frontmatter's \`layout\` and the \`import\` statements below it are code, not content: never translate them. If you add a component the target file did not use before, add its import too, copied exactly from whichever language already has it — the page will not build without it.
- If a change is purely structural/formatting (not content), apply the same structural change.
- If another language added or removed components, make equivalent additions/removals.
${l?`- Changes already made to ${n} should be kept — do not revert them.
`:""}- Briefly explain what you changed and any decisions, but keep explanations concise.
- If no changes are needed, say so.${s}`}function I(e){return S(e.split(`
`)).join(`
`)}function K(e){const{targetLang:n,targetContent:t,langDiffs:o,fullSyncContents:r}=e;return!o.length&&r?.length?`${r.map(l=>`## Current ${l.lang} content:
${I(l.content)}`).join(`

`)}

## Current ${n} content (this is what you'll edit):
${I(t)}

Update the ${n} version to be consistent with the other language versions above.`:`${o.map(a=>a.lang===n?`## Changes made to ${a.lang} (the file you're editing) since last sync:
${a.diff}`:`## ${a.lang} content at time of last sync:
${I(a.base)}

## Changes made to ${a.lang} since then:
${a.diff}`).join(`

`)}

## Current ${n} content (this is what you'll edit):
${I(t)}

Apply the equivalent changes to the ${n} file.`}function F(e,n,t){const o=e.includes(`\r
`),r=o?n.replace(/(?<!\r)\n/g,`\r
`):n,s=o?t.replace(/(?<!\r)\n/g,`\r
`):t,a=e.indexOf(r);if(a===-1){const c=n.length>100?n.slice(0,100)+"...":n;return{success:!1,content:e,error:`Text not found: "${c}"`}}return e.indexOf(r,a+1)!==-1?{success:!1,content:e,error:"Text appears multiple times. Include more context to make it unique."}:{success:!0,content:e.slice(0,a)+s+e.slice(a+r.length)}}async function*J(e){const n=new TextDecoder;let t="";for(;;){const{done:o,value:r}=await e.read();if(o)break;t+=n.decode(r,{stream:!0});const s=t.split(`
`);t=s.pop()||"";for(const a of s)if(a.startsWith("data: ")){const l=a.slice(6).trim();if(l==="[DONE]")return;try{yield JSON.parse(l)}catch{}}}}const A=25;async function*z(e){const n=G(e),t=K(e);let o=e.targetContent;const r=[{role:"user",content:t}];for(let s=0;s<A;s++){let a;try{a=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":e.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:16e3,thinking:{type:"enabled",budget_tokens:5e3},cache_control:{type:"ephemeral"},system:n,tools:[B],messages:r,stream:!0})})}catch(u){yield{type:"error",error:u instanceof Error?u.message:String(u)};return}if(!a.ok){const u=await a.text();yield{type:"error",error:`Claude API error: ${a.status} - ${u}`};return}const l=a.body?.getReader();if(!l){yield{type:"error",error:"No response body"};return}const c=[],d=[];let y=null,p=null,x=null;for await(const u of J(l)){const m=u.type;if(m==="content_block_start"){const i=u.content_block,f=u.index;i.type==="thinking"?yield{type:"thinking"}:i.type==="text"?y={index:f,text:""}:i.type==="tool_use"&&(p={index:f,id:i.id,name:i.name,inputJson:""})}if(m==="content_block_delta"){const i=u.delta;if(i.type==="text_delta"&&y){const f=i.text;y.text+=f,yield{type:"reasoning",text:f}}else i.type==="input_json_delta"&&p&&(p.inputJson+=i.partial_json)}if(m==="content_block_stop"&&(y&&(c.push({type:"text",text:y.text}),y=null),p)){let i={};try{i=JSON.parse(p.inputJson)}catch{}const f={type:"tool_use",id:p.id,name:p.name,input:i};if(c.push(f),p.name==="edit_file"){const w=i.old_string,_=i.new_string,g=F(o,w,_);g.success?(o=g.content,yield{type:"edit",edit:{old_string:w,new_string:_}},d.push({type:"tool_result",tool_use_id:p.id,content:"Edit applied successfully."})):(yield{type:"error",error:`Edit failed: ${g.error}`},d.push({type:"tool_result",tool_use_id:p.id,content:g.error,is_error:!0}))}else d.push({type:"tool_result",tool_use_id:p.id,content:`Unknown tool: ${p.name}`,is_error:!0});p=null}m==="message_delta"&&(x=u.delta.stop_reason||null)}if(x==="end_turn"){yield{type:"done",finalContent:o};return}if(x==="max_tokens"){yield{type:"error",error:"Translation incomplete: response exceeded max tokens."},yield{type:"done",finalContent:o};return}if(x==="tool_use"&&d.length>0){r.push({role:"assistant",content:c}),r.push({role:"user",content:d});continue}yield{type:"error",error:`Unexpected stop reason: ${x}`},yield{type:"done",finalContent:o};return}yield{type:"error",error:`Translation loop exceeded ${A} turns.`},yield{type:"done",finalContent:o}}async function Y(e,n,t){if(t<=0)return null;let o=await e.getHeadHash();for(;o!==null;){let r;try{r=await e.readBlobAtCommit(n,o)}catch{return null}const{rev:s}=R(r);if(s===t)return r;if(s<t)return null;o=await e.getParentCommit(o)}return null}function H(e,n){for(let t=Math.min(n,e.length-1);t>=0;t--)if(/\bid=["']/.test(e[t]))return{line:e[t],index:t};return null}function W(e,n){const t=e.length,o=n.length,r=Array.from({length:t+1},()=>new Array(o+1).fill(0));for(let s=1;s<=t;s++)for(let a=1;a<=o;a++)e[s-1]===n[a-1]?r[s][a]=r[s-1][a-1]+1:r[s][a]=Math.max(r[s-1][a],r[s][a-1]);return r}function X(e,n,t){const o=[];let r=e.length,s=n.length;const a=[];for(;r>0||s>0;)r>0&&s>0&&e[r-1]===n[s-1]?(a.push({type:"equal",aIdx:r-1,bIdx:s-1,line:e[r-1]}),r--,s--):s>0&&(r===0||t[r][s-1]>=t[r-1][s])?(a.push({type:"insert",aIdx:r,bIdx:s-1,line:n[s-1]}),s--):(a.push({type:"delete",aIdx:r-1,bIdx:s,line:e[r-1]}),r--);a.reverse();for(const l of a){const c=o[o.length-1];c&&c.type===l.type?c.lines.push(l.line):o.push({type:l.type,lines:[l.line],oldStart:l.aIdx,newStart:l.bIdx})}return o}const E=2;function Q(e,n){const t=e.replace(/\r\n/g,`
`),o=n.replace(/\r\n/g,`
`);if(t===o)return"";const r=S(t.split(`
`)),s=S(o.split(`
`)),a=W(r,s),l=X(r,s,a),c=[];let d=null,y=0;for(const u of l)u.type!=="equal"?(d||(d=[],y=u.oldStart),d.push(u)):d&&(c.push({ops:d,firstOldLine:y}),d=null);d&&c.push({ops:d,firstOldLine:y});const p=[];for(const u of c){const m=u.firstOldLine,i=Math.max(0,m-E),f=H(r,m),w=f?f.line:r[i]??"",_=[];for(let h=i;h<m;h++)_.push(` ${r[h]}`);for(const h of u.ops)for(const v of h.lines)h.type==="delete"?_.push(`-${v}`):h.type==="insert"&&_.push(`+${v}`);let g=m;for(const h of u.ops)h.type==="delete"&&(g=h.oldStart+h.lines.length);const k=Math.min(r.length,g+E);for(let h=g;h<k;h++)_.push(` ${r[h]}`);p.push({anchorLine:w,body:_})}const x=[];for(const u of p)x.push(`@@${u.anchorLine}@@`),x.push(...u.body),x.push("@@");return x.join(`
`)}const V="src/translation-glossary.md";async function Z(){try{return await C(V)}catch{return}}async function le(e,n){const{contentPath:t,targetLang:o,apiKey:r}=e,{onLogItem:s,onStatusChange:a,isCancelled:l}=n;try{const c=await L(t,o);let d="";try{d=await C(c)}catch{}if(l())return"cancelled";a("translating");const{synced:y}=R(d);let p;if(Object.keys(y).length>0){const i=await P(),f=j,_=(await Promise.all(f.map(async g=>{const k=y[g]??0,h=await L(t,g);try{const v=await C(h);let $="";k>0&&($=await Y(i,h,k)??"");const T=Q($,v);return T||!$?{lang:g,base:$,diff:T,current:v}:null}catch{return null}}))).filter(g=>g!==null);_.length>0&&(p={targetLang:o,targetContent:d,langDiffs:_,apiKey:r})}if(!p){const i=j.filter(w=>w!==o),f=await Promise.all(i.map(async w=>{try{return{lang:w,content:await C(await L(t,w))}}catch{return null}}));p={targetLang:o,targetContent:d,langDiffs:[],fullSyncContents:f.filter(w=>w!==null),apiKey:r}}const x=await Z(),u=z({...p,glossary:x});let m="";for await(const i of u){if(l())return"cancelled";switch(i.type){case"thinking":s({type:"thinking"});break;case"reasoning":s({type:"text",content:i.text});break;case"edit":s({type:"edit",old_string:i.edit.old_string,new_string:i.edit.new_string});break;case"error":s({type:"error",content:i.error});break;case"done":m=i.finalContent;break}}return m?l()?"cancelled":(a("saving"),await M(t,o,m),a("done"),"done"):(s({type:"error",content:"Translation returned no content"}),"error")}catch(c){return s({type:"error",content:c instanceof Error?c.message:String(c)}),"error"}}function ce({log:e,isActive:n}){return b.jsxs("div",{className:"space-y-2",children:[e.map((t,o)=>t.type==="thinking"?b.jsx("div",{className:"text-sm text-gray-400 italic animate-pulse",children:"Thinking..."},o):t.type==="text"?b.jsx("div",{className:"text-sm text-gray-700 prose prose-sm max-w-none",children:b.jsx(U,{children:t.content})},o):t.type==="edit"?b.jsxs("div",{className:"border rounded text-xs font-mono overflow-hidden",children:[b.jsxs("div",{className:"bg-red-50 text-red-700 p-2 border-b whitespace-pre-wrap",children:[b.jsx("span",{className:"text-red-400 mr-1",children:"-"}),t.old_string.length>300?t.old_string.slice(0,300)+"...":t.old_string]}),b.jsxs("div",{className:"bg-green-50 text-green-700 p-2 whitespace-pre-wrap",children:[b.jsx("span",{className:"text-green-400 mr-1",children:"+"}),t.new_string.length>300?t.new_string.slice(0,300)+"...":t.new_string]})]},o):t.type==="error"?b.jsx("div",{className:"p-2 bg-red-50 text-red-600 rounded text-xs",children:t.content},o):null),n&&e.length===0&&b.jsx("div",{className:"text-sm text-gray-400 animate-pulse",children:"Starting translation..."})]})}export{ce as T,ae as a,q as c,ie as g,oe as m,le as r,se as u};
