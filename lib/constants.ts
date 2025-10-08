export type NavItem = { href: string; label: string };

export const navItems = [
	{ href: '/', label: 'Dashboard' },
	{ href: '/search', label: 'Search' },
	{ href: '/watchlist', label: 'Watchlist' },
] as const satisfies readonly NavItem[];
