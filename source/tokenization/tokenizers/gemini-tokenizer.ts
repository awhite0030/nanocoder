import type {Message} from '@/types/core.js';
import type {Tokenizer} from '../../types/tokenization.js';

/**
 * Tokenizer for Gemini models
 * Gemini's exact tokenizer is not publicly available on npm.
 * A token is equivalent to about 4 characters.
 */
export class GeminiTokenizer implements Tokenizer {
	private readonly CHARS_PER_TOKEN = 4;

	encode(text: string): number {
		return Math.ceil(text.length / this.CHARS_PER_TOKEN);
	}

	countTokens(message: Message): number {
		const content = message.content || '';
		const role = message.role || '';

		return this.encode(content) + Math.ceil(role.length / this.CHARS_PER_TOKEN);
	}

	getName(): string {
		return 'gemini';
	}
}
