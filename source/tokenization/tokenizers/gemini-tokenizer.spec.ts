import type {Message} from '@/types/core.js';
import test from 'ava';
import {GeminiTokenizer} from './gemini-tokenizer.js';

test('GeminiTokenizer uses 4 chars per token for encode', t => {
	const tokenizer = new GeminiTokenizer();

	// 4 chars = 1 token
	t.is(tokenizer.encode('1234'), 1);

	// 5 chars = 2 tokens (ceil)
	t.is(tokenizer.encode('12345'), 2);

	// 8 chars = 2 tokens
	t.is(tokenizer.encode('12345678'), 2);
});

test('GeminiTokenizer counts tokens in messages correctly', t => {
	const tokenizer = new GeminiTokenizer();
	const message: Message = {
		role: 'user', // 4 chars -> 1 token
		content: 'hello' // 5 chars -> 2 tokens
	};

	// Total = 1 + 2 = 3
	t.is(tokenizer.countTokens(message), 3);
});

test('GeminiTokenizer returns correct name', t => {
	const tokenizer = new GeminiTokenizer();
	t.is(tokenizer.getName(), 'gemini');
});
