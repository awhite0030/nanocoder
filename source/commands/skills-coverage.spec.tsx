import test from 'ava';
import {skillsCommand} from '@/commands/skills';

test('skillsCommand handles check', async t => {
	// The function checks if it handles commands, even if checkSkillBundle returns something weird.
	const result = await skillsCommand.handler(['check', 'non-existent'], [], {cwd: '/'});
	t.truthy(result);
});

test('skillsCommand handles promote', async t => {
	const result = await skillsCommand.handler(['promote', 'non-existent'], [], {cwd: '/'});
	t.truthy(result);
});
