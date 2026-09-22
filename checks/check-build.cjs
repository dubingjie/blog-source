const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public');
const read = name => fs.readFileSync(path.join(output, name), 'utf8');
const expected = require('./original-post-paths.json');
for (const file of expected) {
  assert.ok(fs.existsSync(path.join(output,file)), 'Original article URL missing: '+file);
  const html = read(file);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Expected one article title: '+file);
  assert.ok(html.includes('class="reading-page"'), 'Missing reading layout: '+file);
  assert.ok(!html.includes('class="linx-nav"'), 'Site sidebar leaked into article: '+file);
  assert.ok(html.includes('data-reading-back'), 'Missing return link: '+file);
  assert.ok(!html.includes('/css/custom.css'), 'Stellar CSS leaked into article: '+file);
}
const search = JSON.parse(read('search.json'));
assert.ok(search.length >= expected.length, 'Search must retain all existing articles');
for(const post of search) assert.ok(fs.existsSync(path.join(output,decodeURIComponent(post.path))), 'Broken search result: '+post.path);
const topics = read('topics/index.html');
assert.equal((topics.match(/class="topic-section"/g)||[]).length, 5);
assert.equal((topics.match(/data-post-link/g)||[]).length, search.length, 'Every post should appear in a study topic');
const files = fs.readdirSync(output,{recursive:true}).filter(p => p.endsWith('.html'));
const decode = value => value.replace(/&amp;/g,'&').replace(/&quot;/g,'"');
let links = 0;
for (const file of files) {
  const html = read(file);
  for(const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const raw = decode(match[1]);
    if(!raw.startsWith('/') && !raw.startsWith('#')) continue;
    const url = new URL(raw,'https://dubingjie.github.io/'+file.replaceAll('\\','/'));
    let target = decodeURIComponent(url.pathname.slice(1));
    if(!target || target.endsWith('/')) target += 'index.html';
    assert.ok(fs.existsSync(path.join(output,target)), `Broken local link in ${file}: ${raw}`);
    if(url.hash && target.endsWith('.html')) {
      const id=decodeURIComponent(url.hash.slice(1));
      assert.ok(read(target).includes('id="'+id+'"'), `Broken anchor in ${file}: ${raw}`);
    }
    links++;
  }
}
console.log(`Build checks passed: ${expected.length} preserved article URLs, ${files.length} HTML pages, ${links} local links/assets/anchors, 5 topics and a complete search index.`);

// Compare the entire emitted tag/category result set (including pagination)
// against each article's metadata, rather than merely checking link existence.
const normalized = value => {
  let p=decodeURIComponent(value).replace(/^\//,'').replaceAll('\\','/');
  return p.endsWith('/') ? p+'index.html' : p;
};
const emittedPosts=search.map(post=>({path:normalized(post.path),html:read(normalized(post.path))}));
let taxonomyCount=0;
for (const file of files.map(f=>f.replaceAll('\\','/'))) {
  const match=file.match(/^(tags|categories)\/([^/]+)\/index\.html$/);
  if(!match) continue;
  const folder=match[1]+'/'+match[2]+'/';
  const heading=read(file).match(/<h1>(.*?)<\/h1>/)?.[1];
  assert.ok(heading && heading !== '归档','Taxonomy fell back to archive: '+file);
  const tag=match[1]==='tags';
  const expectedSet=emittedPosts.filter(post=>{
    if(!tag) return post.html.match(/class="article-category"[^>]*>(.*?)<\/a>/)?.[1]===heading;
    const meta=post.html.match(/class="post-meta">([\s\S]*?)<\/div>/)?.[1]||'';
    return [...meta.matchAll(/href="([^"]+)"/g)].some(m=>normalized(m[1])===file);
  }).map(p=>p.path).sort();
  const actualSet=[];
  for(const candidate of files.map(f=>f.replaceAll('\\','/')).filter(f=>f.startsWith(folder))) {
    const html=read(candidate);
    assert.ok(html.includes('<h1>'+heading+'</h1>'),'Wrong taxonomy heading: '+candidate);
    const active=html.match(/class="menu-link active" href="([^"]+)"/)?.[1];
    assert.equal(active,tag?'/tags/':'/topics/','Wrong navigation state: '+candidate);
    for(const link of html.matchAll(/data-post-link href="([^"]+)"/g)) actualSet.push(normalized(link[1]));
  }
  assert.deepEqual(actualSet.sort(),expectedSet,'Incorrect filtered articles: '+file);
  taxonomyCount++;
}
assert.ok(taxonomyCount>0,'No taxonomy pages tested');
assert.equal((read('archives/index.html').match(/data-post-link/g)||[]).length,search.length,'Full archive must include every article');
console.log(`Taxonomy checks passed: ${taxonomyCount} tag/category filters match article metadata; full archive remains complete.`);
