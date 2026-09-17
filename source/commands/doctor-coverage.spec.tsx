import test from 'ava';
import {doctorCommand} from './doctor.js';

test('doctorCommand runs', async t => {
  // We can just verify it doesn't throw.
  const result = await doctorCommand.handler([], [], {cwd: '/'});
  t.truthy(result);
});
