import{r as R}from"./index.ZbXXA13o.js";import{s as S,y as L,z as E,b as C,d as I,B as P,A as N,C as D}from"./ops.9lbF4TEl.js";import{j as _,l as M}from"./_virtual_atoll-config.CmD5OU7A.js";function j(e,n){if(typeof e=="function")return e(n);e!=null&&(e.current=n)}function U(...e){return n=>{let t=!1;const o=e.map(r=>{const s=j(r,n);return!t&&typeof s=="function"&&(t=!0),s});if(t)return()=>{for(let r=0;r<o.length;r++){const s=o[r];typeof s=="function"?s():j(e[r],null)}}}}function te(...e){return R.useCallback(U(...e),e)}function ne(e,n){if(n.type==="thinking")return[...e.filter(t=>t.type!=="thinking"),n];if(n.type==="text"){const t=e.filter(r=>r.type!=="thinking"),o=t[t.length-1];return o?.type==="text"?[...t.slice(0,-1),{type:"text",content:o.content+n.content}]:[...t,n]}return[...e.filter(t=>t.type!=="thinking"),n]}function re(e){const n=e.split("/").pop()?.replace(/\.mdx$/,"");return n?n==="index"?"home":n:e}function se(){let e=localStorage.getItem(S.apiKey);if(!e){if(e=window.prompt("Enter your Claude API key for translation:"),!e)return null;localStorage.setItem(S.apiKey,e)}return e}const q={name:"edit_file",description:"Replace exact text in the target language file. The old_string must match exactly (including whitespace and indentation). If the text is not found, you'll get an error — try with different surrounding context.",input_schema:{type:"object",properties:{old_string:{type:"string",description:"Exact text to find in the target file"},new_string:{type:"string",description:"Replacement text"}},required:["old_string","new_string"]}};function B(e){const{targetLang:n,langDiffs:t,fullSyncContents:o}=e;if(!t.length&&o?.length){const a=o.map(l=>l.lang).join(", ");return`You are syncing the ${n} version of a page to match the other language versions (${a}).

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
- If no changes are needed, say so.`}const r=t.map(a=>a.lang);r.filter(a=>a!==n);const s=r.includes(n);return`You are updating the ${n} version of a page. Since the last sync, changes were made in: ${r.join(", ")}.

All languages are equal peers — there is no "primary" language. For each language that changed, you have the content from when ${n} was last synced and a diff showing what changed since then.${s?`

Note: ${n} itself also changed (e.g., a local fix). Preserve those changes while incorporating updates from other languages.`:""}

Use the edit_file tool to apply equivalent changes to the ${n} file. Each edit must use exact string matching — the old_string must appear exactly in the file.

IMPORTANT: Make ALL your edit_file calls in a SINGLE response. Do not make one edit per turn — batch all edits together.

Guidelines:
- Translate human-readable text. Do NOT change URLs, file paths, IDs, or technical attributes.
- Preserve component IDs exactly as they are in the target file.
- The frontmatter's \`layout\` and the \`import\` statements below it are code, not content: never translate them. If you add a component the target file did not use before, add its import too, copied exactly from whichever language already has it — the page will not build without it.
- If a change is purely structural/formatting (not content), apply the same structural change.
- If another language added or removed components, make equivalent additions/removals.
${s?`- Changes already made to ${n} should be kept — do not revert them.
`:""}- Briefly explain what you changed and any decisions, but keep explanations concise.
- If no changes are needed, say so.`}function $(e){return L(e.split(`
`)).join(`
`)}function K(e){const{targetLang:n,targetContent:t,langDiffs:o,fullSyncContents:r}=e;return!o.length&&r?.length?`${r.map(l=>`## Current ${l.lang} content:
${$(l.content)}`).join(`

`)}

## Current ${n} content (this is what you'll edit):
${$(t)}

Update the ${n} version to be consistent with the other language versions above.`:`${o.map(a=>a.lang===n?`## Changes made to ${a.lang} (the file you're editing) since last sync:
${a.diff}`:`## ${a.lang} content at time of last sync:
${$(a.base)}

## Changes made to ${a.lang} since then:
${a.diff}`).join(`

`)}

## Current ${n} content (this is what you'll edit):
${$(t)}

Apply the equivalent changes to the ${n} file.`}function G(e,n,t){const o=e.includes(`\r
`),r=o?n.replace(/(?<!\r)\n/g,`\r
`):n,s=o?t.replace(/(?<!\r)\n/g,`\r
`):t,a=e.indexOf(r);if(a===-1){const p=n.length>100?n.slice(0,100)+"...":n;return{success:!1,content:e,error:`Text not found: "${p}"`}}return e.indexOf(r,a+1)!==-1?{success:!1,content:e,error:"Text appears multiple times. Include more context to make it unique."}:{success:!0,content:e.slice(0,a)+s+e.slice(a+r.length)}}async function*J(e){const n=new TextDecoder;let t="";for(;;){const{done:o,value:r}=await e.read();if(o)break;t+=n.decode(r,{stream:!0});const s=t.split(`
`);t=s.pop()||"";for(const a of s)if(a.startsWith("data: ")){const l=a.slice(6).trim();if(l==="[DONE]")return;try{yield JSON.parse(l)}catch{}}}}const O=25;async function*z(e){const n=B(e),t=K(e);let o=e.targetContent;const r=[{role:"user",content:t}];for(let s=0;s<O;s++){let a;try{a=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":e.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:16e3,thinking:{type:"enabled",budget_tokens:5e3},cache_control:{type:"ephemeral"},system:n,tools:[q],messages:r,stream:!0})})}catch(i){yield{type:"error",error:i instanceof Error?i.message:String(i)};return}if(!a.ok){const i=await a.text();yield{type:"error",error:`Claude API error: ${a.status} - ${i}`};return}const l=a.body?.getReader();if(!l){yield{type:"error",error:"No response body"};return}const p=[],h=[];let m=null,u=null,x=null;for await(const i of J(l)){const d=i.type;if(d==="content_block_start"){const c=i.content_block,f=i.index;c.type==="thinking"?yield{type:"thinking"}:c.type==="text"?m={index:f,text:""}:c.type==="tool_use"&&(u={index:f,id:c.id,name:c.name,inputJson:""})}if(d==="content_block_delta"){const c=i.delta;if(c.type==="text_delta"&&m){const f=c.text;m.text+=f,yield{type:"reasoning",text:f}}else c.type==="input_json_delta"&&u&&(u.inputJson+=c.partial_json)}if(d==="content_block_stop"&&(m&&(p.push({type:"text",text:m.text}),m=null),u)){let c={};try{c=JSON.parse(u.inputJson)}catch{}const f={type:"tool_use",id:u.id,name:u.name,input:c};if(p.push(f),u.name==="edit_file"){const b=c.old_string,y=c.new_string,w=G(o,b,y);w.success?(o=w.content,yield{type:"edit",edit:{old_string:b,new_string:y}},h.push({type:"tool_result",tool_use_id:u.id,content:"Edit applied successfully."})):(yield{type:"error",error:`Edit failed: ${w.error}`},h.push({type:"tool_result",tool_use_id:u.id,content:w.error,is_error:!0}))}else h.push({type:"tool_result",tool_use_id:u.id,content:`Unknown tool: ${u.name}`,is_error:!0});u=null}d==="message_delta"&&(x=i.delta.stop_reason||null)}if(x==="end_turn"){yield{type:"done",finalContent:o};return}if(x==="max_tokens"){yield{type:"error",error:"Translation incomplete: response exceeded max tokens."},yield{type:"done",finalContent:o};return}if(x==="tool_use"&&h.length>0){r.push({role:"assistant",content:p}),r.push({role:"user",content:h});continue}yield{type:"error",error:`Unexpected stop reason: ${x}`},yield{type:"done",finalContent:o};return}yield{type:"error",error:`Translation loop exceeded ${O} turns.`},yield{type:"done",finalContent:o}}async function F(e,n,t){if(t<=0)return null;let o=await e.getHeadHash();for(;o!==null;){let r;try{r=await e.readBlobAtCommit(n,o)}catch{return null}const{rev:s}=E(r);if(s===t)return r;if(s<t)return null;o=await e.getParentCommit(o)}return null}function Y(e,n){for(let t=Math.min(n,e.length-1);t>=0;t--)if(/\bid=["']/.test(e[t]))return{line:e[t],index:t};return null}function H(e,n){const t=e.length,o=n.length,r=Array.from({length:t+1},()=>new Array(o+1).fill(0));for(let s=1;s<=t;s++)for(let a=1;a<=o;a++)e[s-1]===n[a-1]?r[s][a]=r[s-1][a-1]+1:r[s][a]=Math.max(r[s-1][a],r[s][a-1]);return r}function W(e,n,t){const o=[];let r=e.length,s=n.length;const a=[];for(;r>0||s>0;)r>0&&s>0&&e[r-1]===n[s-1]?(a.push({type:"equal",aIdx:r-1,bIdx:s-1,line:e[r-1]}),r--,s--):s>0&&(r===0||t[r][s-1]>=t[r-1][s])?(a.push({type:"insert",aIdx:r,bIdx:s-1,line:n[s-1]}),s--):(a.push({type:"delete",aIdx:r-1,bIdx:s,line:e[r-1]}),r--);a.reverse();for(const l of a){const p=o[o.length-1];p&&p.type===l.type?p.lines.push(l.line):o.push({type:l.type,lines:[l.line],oldStart:l.aIdx,newStart:l.bIdx})}return o}const A=2;function X(e,n){const t=e.replace(/\r\n/g,`
`),o=n.replace(/\r\n/g,`
`);if(t===o)return"";const r=L(t.split(`
`)),s=L(o.split(`
`)),a=H(r,s),l=W(r,s,a),p=[];let h=null,m=0;for(const i of l)i.type!=="equal"?(h||(h=[],m=i.oldStart),h.push(i)):h&&(p.push({ops:h,firstOldLine:m}),h=null);h&&p.push({ops:h,firstOldLine:m});const u=[];for(const i of p){const d=i.firstOldLine,c=Math.max(0,d-A),f=Y(r,d),b=f?f.line:r[c]??"",y=[];for(let g=c;g<d;g++)y.push(` ${r[g]}`);for(const g of i.ops)for(const v of g.lines)g.type==="delete"?y.push(`-${v}`):g.type==="insert"&&y.push(`+${v}`);let w=d;for(const g of i.ops)g.type==="delete"&&(w=g.oldStart+g.lines.length);const k=Math.min(r.length,w+A);for(let g=w;g<k;g++)y.push(` ${r[g]}`);u.push({anchorLine:b,body:y})}const x=[];for(const i of u)x.push(`@@${i.anchorLine}@@`),x.push(...i.body),x.push("@@");return x.join(`
`)}async function oe(e,n){const{contentPath:t,targetLang:o,apiKey:r}=e,{onLogItem:s,onStatusChange:a,isCancelled:l}=n;try{const p=C(t,o);let h="";try{h=await I(p)}catch{}if(l())return"cancelled";a("translating");const{synced:m}=E(h);let u;if(Object.keys(m).length>0){const d=await P(),c=N,b=(await Promise.all(c.map(async y=>{const w=m[y]??0,k=C(t,y);try{const g=await I(k);let v="";w>0&&(v=await F(d,k,w)??"");const T=X(v,g);return T||!v?{lang:y,base:v,diff:T,current:g}:null}catch{return null}}))).filter(y=>y!==null);b.length>0&&(u={targetLang:o,targetContent:h,langDiffs:b,apiKey:r})}if(!u){const d=N.filter(f=>f!==o),c=await Promise.all(d.map(async f=>{try{return{lang:f,content:await I(C(t,f))}}catch{return null}}));u={targetLang:o,targetContent:h,langDiffs:[],fullSyncContents:c.filter(f=>f!==null),apiKey:r}}const x=z(u);let i="";for await(const d of x){if(l())return"cancelled";switch(d.type){case"thinking":s({type:"thinking"});break;case"reasoning":s({type:"text",content:d.text});break;case"edit":s({type:"edit",old_string:d.edit.old_string,new_string:d.edit.new_string});break;case"error":s({type:"error",content:d.error});break;case"done":i=d.finalContent;break}}return i?l()?"cancelled":(a("saving"),await D(t,o,i),a("done"),"done"):(s({type:"error",content:"Translation returned no content"}),"error")}catch(p){return s({type:"error",content:p instanceof Error?p.message:String(p)}),"error"}}function ae({log:e,isActive:n}){return _.jsxs("div",{className:"space-y-2",children:[e.map((t,o)=>t.type==="thinking"?_.jsx("div",{className:"text-sm text-gray-400 italic animate-pulse",children:"Thinking..."},o):t.type==="text"?_.jsx("div",{className:"text-sm text-gray-700 prose prose-sm max-w-none",children:_.jsx(M,{children:t.content})},o):t.type==="edit"?_.jsxs("div",{className:"border rounded text-xs font-mono overflow-hidden",children:[_.jsxs("div",{className:"bg-red-50 text-red-700 p-2 border-b whitespace-pre-wrap",children:[_.jsx("span",{className:"text-red-400 mr-1",children:"-"}),t.old_string.length>300?t.old_string.slice(0,300)+"...":t.old_string]}),_.jsxs("div",{className:"bg-green-50 text-green-700 p-2 whitespace-pre-wrap",children:[_.jsx("span",{className:"text-green-400 mr-1",children:"+"}),t.new_string.length>300?t.new_string.slice(0,300)+"...":t.new_string]})]},o):t.type==="error"?_.jsx("div",{className:"p-2 bg-red-50 text-red-600 rounded text-xs",children:t.content},o):null),n&&e.length===0&&_.jsx("div",{className:"text-sm text-gray-400 animate-pulse",children:"Starting translation..."})]})}export{ae as T,re as a,U as c,se as g,ne as m,oe as r,te as u};
