import { readFileSync, writeFileSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
// 仅构建时读取首次加入仓库的提交；跟随重命名，后续修改不改变首次上传顺序。
export function firstUpload(file: string): string | null {
  try {
    const history = execFileSync('git', ['log', '--follow', '--diff-filter=A', '--format=%aI', '--', file], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
    return history.at(-1) || null;
  } catch { return null; }
}
export function uploadDay(timestamp: string): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(timestamp));
}

// 首次记录的新笔记使用博客副本的创建时间；写入可提交的清单，避免 CI 检出时间重置排序。
export function archiveAddedAt(file: string): string {
  const manifest = resolve('src/data/note-added-times.json');
  const key = relative(resolve('src/content/notes'), resolve(file)).replaceAll('\\', '/');
  const dates: Record<string, string> = existsSync(manifest) ? JSON.parse(readFileSync(manifest, 'utf8')) : {};
  if (dates[key] && !Number.isNaN(Date.parse(dates[key]))) return dates[key];
  const committed = firstUpload(file);
  if (process.env.CI && !committed) throw new Error('缺少笔记添加时间：' + key);
  const stats = committed ? null : statSync(file);
  const timestamp = committed || (stats!.birthtimeMs > 0 ? stats!.birthtime : stats!.mtime).toISOString();
  if (!process.env.CI) {
    mkdirSync(resolve('src/data'), { recursive: true });
    dates[key] = timestamp;
    writeFileSync(manifest, JSON.stringify(dates, null, 2) + '\n');
  }
  return timestamp;
}
