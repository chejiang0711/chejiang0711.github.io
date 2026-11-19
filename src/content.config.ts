import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
// 统一校验笔记元数据，写错字段时在构建阶段提示。
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(), description: z.string(), date: z.string(),
    category: z.string(), tags: z.array(z.string()),
    // 目录独立于标签；未指定目录的旧笔记回退到原分类。
    folder: z.array(z.string().min(1)).optional(),
    unity: z.string().optional(), sample: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});
export const collections = { notes };
