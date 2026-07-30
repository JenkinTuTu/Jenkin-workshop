// qa.js
import fg from 'fast-glob';
import fs from 'fs';
import { JSDOM } from 'jsdom';

const PAGES = await fg(['index.html','ads.html','doc*.html','ad*.html','**/contact.html'], { dot:false });

const issues = [];
const okCats = new Set(['beauty','auto','fashion','brand','doc','ai','short','trailer','sport','instagram']);

for (const file of PAGES) {
  const html = fs.readFileSync(file, 'utf8');
  const dom = new JSDOM(html);
  const d = dom.window.document;

  // 1) 分类规范
  d.querySelectorAll('.grid-item').forEach((el,i)=>{
    const raw = (el.getAttribute('data-category')||'').trim();
    const low = raw.toLowerCase();
    if (!okCats.has(low)) {
      issues.push({file, type:'category', at:i, raw});
    }
    if (raw !== low) {
      issues.push({file, type:'category-case', at:i, raw});
    }
  });

  // 2) Dailymotion id 尾巴
  d.querySelectorAll('.grid-item[data-type="dailymotion"]').forEach((el,i)=>{
    const id = el.getAttribute('data-id') || el.getAttribute('data-url') || '';
    if (/[?#&_]/.test(id)) {
      issues.push({file, type:'dm-id-noise', at:i, id});
    }
  });

  // 3) 懒加载属性
  d.querySelectorAll('img.thumb').forEach((img)=>{
    if (!img.hasAttribute('loading') || !img.hasAttribute('decoding')) {
      issues.push({file, type:'thumb-lazy', src: img.getAttribute('src')});
    }
  });

  // 4) 详情页 og:image
  if (/^ad\d+\.html$|^doc\d+\.html$/i.test(file)) {
    const hasOG = /<meta[^>]+property=["']og:image["'][^>]*>/i.test(html);
    if (!hasOG) issues.push({file, type:'og-image-missing'});
  }
}

if (!issues.length) {
  console.log('✅ All good.');
} else {
  console.log('❗ Issues found:');
  issues.forEach(x=>console.log(x));
  process.exitCode = 1;
}
