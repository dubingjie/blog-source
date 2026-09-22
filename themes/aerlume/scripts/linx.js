'use strict';
const topics = [
  {id: 'python', name: 'Python', description: '从开发环境到语言基础，一点点搭起知识框架。'},
  {id: 'tools', name: '开发工具', description: 'Git、GitHub 与包管理，让日常开发更顺手。'},
  {id: 'network', name: 'Linux 与网络', description: '命令行、网络排查和服务管理的实践记录。'},
  {id: 'web', name: 'Web 与接口', description: '理解请求、身份认证，以及接口如何协作。'},
  {id: 'database', name: '数据库与容器', description: '从连接数据库到 Redis、Docker 的实际使用。'}
];
hexo.extend.helper.register('linx_topics', () => topics);
hexo.extend.helper.register('linx_topic_id', name => topics.find(t => t.name === name)?.id || '');
const icons = {
  home: '<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
  book: '<path d="M12 5v16M3 3l9 2 9-2v16l-9 2-9-2z"/>',
  tag: '<path d="m3 3 9 0 9 9-9 9-9-9z"/><circle cx="8" cy="8" r="1"/>',
  archive: '<path d="M4 8h16v13H4zM3 3h18v5H3zM9 12h6"/>',
  user: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  back: '<path d="m10 5-7 7 7 7M3 12h18"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'
};
hexo.extend.helper.register('linx_icon', name => `<svg class="linx-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`);
hexo.extend.generator.register('linx-category-index', () => ({path: 'categories/index.html', layout: 'topics', data: {title: '学习专题'}}));

hexo.extend.generator.register('linx-search', function(locals) {
  const posts = locals.posts.sort('date', -1).map(post => ({
    title: post.title, path: post.path, tags: post.tags.map(tag => tag.name).join(' '),
    content: String(post.content).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()
  }));
  return {path:'search.json', data:JSON.stringify(posts)};
});
