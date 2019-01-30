export async function time(title, fn) {
  const before = new Date();
  console.log('---');
  console.log(`${title}`);
  await fn();
  const after = new Date();
  console.log(`Duration: ${after.valueOf() - before.valueOf()} ms`);
}
