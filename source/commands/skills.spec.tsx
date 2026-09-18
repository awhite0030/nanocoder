import test from 'ava';

test('Skills relies on getProjectRoot to locate skill checks', async t => {
	const fs = await import('node:fs/promises');
	const content = await fs.readFile('source/commands/skills.tsx', 'utf-8');
	t.regex(content, /import.*getProjectRoot.*from.*@\/services\/session-cwd/);
	t.regex(content, /getProjectRoot\(\)/);
});
