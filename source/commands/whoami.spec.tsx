import test from 'ava';
import React from 'react';
import {renderWithTheme} from '../test-utils/render-with-theme.js';
import {maskApiKey, Whoami} from './whoami';

test('maskApiKey hides middle characters for keys > 12 length', t => {
	t.is(maskApiKey('sk-1234567890abcdef'), 'sk-1***cdef');
	t.is(maskApiKey('sk-verysecretvalue1234'), 'sk-v***1234');
});

test('maskApiKey strictly hides middle characters and uses fixed-width mask for shorter keys', t => {
	t.is(maskApiKey('sk-123456789'), '********');
	t.is(maskApiKey('short'), '********');
	t.is(maskApiKey('123456789012'), '********'); // exactly 12
});

test('maskApiKey handles empty and dummy keys', t => {
	t.is(maskApiKey(), 'Not set');
	t.is(maskApiKey('dummy-key'), 'Not set');
});

test('maskApiKey returns "Not required (local)" for local providers without a key', t => {
	t.is(maskApiKey('', true), 'Not required (local)');
	t.is(maskApiKey('dummy-key', true), 'Not required (local)');
});

test('Whoami renders without leaking the api key', t => {
	const providerConfig = {
		name: 'OpenAI',
		type: 'openai',
		models: ['gpt-4'],
		config: {
			baseURL: 'https://api.openai.com/v1',
			apiKey: 'sk-verysecretvalue1234',
		},
	};

	const {lastFrame} = renderWithTheme(
		<Whoami
			provider={providerConfig as any}
			metadata={{provider: 'OpenAI', model: 'gpt-4'}}
			apiKey="sk-verysecretvalue1234"
			isLocal={false}
			configPath="/path/to/agents.config.json"
		/>,
	);

	const output = lastFrame();
	t.truthy(output);
	t.regex(output!, /Active Configuration/);
	t.regex(output!, /Provider: OpenAI/);
	t.regex(output!, /Model: gpt-4/);
	t.regex(output!, /\/path\/to\/agents.config.json/);
	t.regex(output!, /https:\/\/api.openai.com\/v1/);
	t.regex(output!, /API Key: sk-v\*\*\*1234/);

	// Security assertion
	t.notRegex(output!, /verysecretvalue/);
});

test('Whoami handles unknown provider gracefully', t => {
	const {lastFrame} = renderWithTheme(
		<Whoami
			provider={null}
			metadata={{provider: 'UnknownProvider', model: 'unknown'}}
			apiKey={undefined}
			isLocal={false}
			configPath="/path/to/agents.config.json"
		/>,
	);

	const output = lastFrame();
	t.truthy(output);
	t.regex(output!, /Unknown provider: UnknownProvider/);
});

test('Whoami formats output correctly for local provider', t => {
	const providerConfig = {
		name: 'Ollama',
		type: 'openai',
		models: ['llama3'],
		config: {
			baseURL: 'http://localhost:11434/v1',
			apiKey: 'dummy-key',
		},
	};

	const {lastFrame} = renderWithTheme(
		<Whoami
			provider={providerConfig as any}
			metadata={{provider: 'Ollama', model: 'llama3'}}
			apiKey="dummy-key"
			isLocal={true}
			configPath="/path/to/agents.config.json"
		/>,
	);

	const output = lastFrame();
	t.truthy(output);
	t.regex(output!, /API Key: Not required \(local\)/);
});
