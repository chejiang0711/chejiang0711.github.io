// YAML 的无引号日期可能是 Date；使用 UTC 避免本地时区把日期移到前一天。
export function normalizeNoteDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return value;
}
