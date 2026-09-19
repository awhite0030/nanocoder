import {Text} from 'ink';
import React from 'react';
import {loadProviderConfigs} from '@/client-factory';
import {TitledBoxWithPreferences} from '@/components/ui/titled-box';
import {loadCodexCredential} from '@/config/codex-credentials';
import {loadCopilotCredential} from '@/config/copilot-credentials';
import {getClosestConfigFile} from '@/config/index';
import {useTerminalWidth} from '@/hooks/useTerminalWidth';
import {useTheme} from '@/hooks/useTheme';
import {generateKey} from '@/session/key-generator';
import type {AIProviderConfig, Command} from '@/types/index';
import {isLocalURL} from '@/utils/url-utils';

export function maskApiKey(key?: string, isLocal?: boolean): string {
	if (isLocal && (!key || key === 'dummy-key')) return 'Not required (local)';
	if (!key || key === 'dummy-key') return 'Not set';
	if (key.length <= 12) return '********';
	const start = key.substring(0, 4);
	const end = key.substring(key.length - 4);
	return `${start}***${end}`;
}

interface WhoamiProps {
	provider: AIProviderConfig | null;
	metadata: {
		provider: string;
		model: string;
	};
	apiKey?: string;
	isLocal: boolean;
	configPath: string;
}

export function Whoami({
	provider,
	metadata,
	apiKey,
	isLocal,
	configPath,
}: WhoamiProps) {
	const boxWidth = useTerminalWidth();
	const {colors} = useTheme();

	if (!provider) {
		return (
			<TitledBoxWithPreferences
				title="/whoami"
				width={boxWidth}
				borderColor={colors.primary}
				paddingX={2}
				paddingY={1}
				flexDirection="column"
				marginBottom={1}
			>
				<Text color={colors.error}>Unknown provider: {metadata.provider}</Text>
			</TitledBoxWithPreferences>
		);
	}

	return (
		<TitledBoxWithPreferences
			title="/whoami"
			width={boxWidth}
			borderColor={colors.primary}
			paddingX={2}
			paddingY={1}
			flexDirection="column"
			marginBottom={1}
		>
			<Text color={colors.primary} bold>
				Active Configuration
			</Text>
			<Text color={colors.text}>Provider: {metadata.provider}</Text>
			<Text color={colors.text}>Model: {metadata.model}</Text>
			<Text color={colors.text}>Config: {configPath}</Text>
			{provider.config.baseURL && (
				<Text color={colors.text}>Base URL: {provider.config.baseURL}</Text>
			)}
			<Text color={colors.text}>API Key: {maskApiKey(apiKey, isLocal)}</Text>
		</TitledBoxWithPreferences>
	);
}

export const whoamiCommand: Command = {
	name: 'whoami',
	description: 'Show active provider configuration, API keys, and base URLs',
	handler: (_args, _messages, metadata) => {
		const providers = loadProviderConfigs();
		const currentProvider = providers.find(
			p => p.name.toLowerCase() === metadata.provider?.toLowerCase(),
		);

		let apiKey = currentProvider?.config?.apiKey;
		let isLocal = false;
		if (currentProvider?.config?.baseURL) {
			isLocal = isLocalURL(currentProvider.config.baseURL);
		}

		if (currentProvider?.sdkProvider === 'github-copilot') {
			const cred = loadCopilotCredential(currentProvider.name);
			apiKey = cred?.oauthToken;
		} else if (currentProvider?.sdkProvider === 'chatgpt-codex') {
			const cred = loadCodexCredential(currentProvider.name);
			apiKey = cred?.accessToken;
		}

		const configPath = getClosestConfigFile('agents.config.json');

		return Promise.resolve(
			React.createElement(Whoami, {
				key: generateKey('whoami'),
				provider: currentProvider || null,
				metadata: {
					provider: metadata.provider,
					model: metadata.model,
				},
				apiKey,
				isLocal,
				configPath,
			}),
		);
	},
};

export const authCommand: Command = {
	...whoamiCommand,
	name: 'auth',
	description: 'Alias for /whoami',
};
