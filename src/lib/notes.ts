import { getCollection } from 'astro:content';
// 草稿不进入列表与静态路由；ISO 日期字符串保持排序稳定。
export const getNotes = async () => (await getCollection('notes', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.localeCompare(a.data.date) || Number(a.data.sample) - Number(b.data.sample) || a.id.localeCompare(b.id));
export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;
