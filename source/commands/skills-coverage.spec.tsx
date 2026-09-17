import test from 'ava';
import {skillsCommand} from '@/commands/skills';
import {getProjectRoot} from '@/services/session-cwd';

test('skillsCommand handles check', async t => {
	// The function checks if it handles commands, even if checkSkillBundle returns something weird.
	const result = await skillsCommand.handler(['check', 'non-existent'], [], {cwd: getProjectRoot()});
	t.truthy(result);
});

test('skillsCommand handles check empty', async t => {
	// The function checks if it handles commands, even if checkSkillBundle returns something weird.
	const result = await skillsCommand.handler(['check'], [], {cwd: getProjectRoot()});
	t.truthy(result);
});

test('skillsCommand handles create', async t => {
	const result = await skillsCommand.handler(['create'], [], {cwd: getProjectRoot()});
	t.truthy(result);
});

test('skillsCommand handles show empty', async t => {
	const result = await skillsCommand.handler(['show'], [], {cwd: getProjectRoot()});
	t.truthy(result);
});

test('skillsCommand handles show', async t => {
	const result = await skillsCommand.handler(['show', 'non-existent'], [], {cwd: getProjectRoot()});
	t.truthy(result);
});

test('skillsCommand handles empty', async t => {
	const result = await skillsCommand.handler([], [], {cwd: getProjectRoot()});
	t.truthy(result);
});

test('skillsCommand handles promote empty', async t => {
	const result = await skillsCommand.handler(['promote'], [], {cwd: getProjectRoot()});
	t.truthy(result);
});

test('skillsCommand handles promote', async t => {
	const result = await skillsCommand.handler(['promote', 'non-existent'], [], {cwd: getProjectRoot()});
	t.truthy(result);
});
