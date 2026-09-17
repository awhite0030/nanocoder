import test from 'ava';
import {skillsCommand} from './skills.js';

test('skillsCommand has expected shape', t => {
	t.is(skillsCommand.name, 'skills');
	t.is(
		skillsCommand.description,
		'List loaded skills. Subcommands: show <name>, create <name>, check <name>, promote <name>, demote <name>.',
	);
});
