import { normalizeNoteDate } from './lib/note-date.mjs';
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
// 统一校验笔记元数据，写错字段时在构建阶段提示。
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(), description: z.string(), // 同时接受 Obsidian 的无引号日期和原有字符串日期，页面始终读取字符串。
    date: z.preprocess(normalizeNoteDate, z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日期请填写 YYYY-MM-DD')),

    category: z.string(), tags: z.array(z.string()),
    // 目录独立于标签；未指定目录的旧笔记回退到原分类。
    folder: z.array(z.string().min(1)).optional(),
    unity: z.string().optional(), sample: z.boolean().default(false),
    // 导入来源使用库内相对路径，日期注明原始或导入含义。
    sourceNote: z.string().optional(), dateKind: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});
export const collections = { notes };
