import test from 'ava';
import {isWindowsCmd} from './shell';

test('isWindowsCmd detects cmd.exe', t => {
	t.true(isWindowsCmd('cmd.exe'));
	t.true(isWindowsCmd('CMD.EXE'));
	t.true(isWindowsCmd('cmd'));
	t.true(isWindowsCmd('C:\\Windows\\System32\\cmd.exe'));
	t.false(isWindowsCmd('bash'));
	t.false(isWindowsCmd('sh'));
	t.false(isWindowsCmd('powershell.exe'));
});
