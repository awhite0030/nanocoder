export function isWindowsCmd(shell: string): boolean {
	const name = shell.replaceAll('\\', '/').split('/').pop() ?? '';
	return /^cmd(\.exe)?$/i.test(name);
}
