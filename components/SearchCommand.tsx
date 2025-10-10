'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { CommandDialog, CommandInput } from './ui/command';
import { Loader2, TrendingUp } from 'lucide-react';
import { CommandEmpty, CommandList } from 'cmdk';
import Link from 'next/link';
import { searchStocks } from '@/lib/actions/finnhub.actions';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchCommand({
	renderAs = 'button',
	label = 'Add Stock',
	initialStocks,
}: SearchCommandProps) {
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(false);
	const [stocks, setStocks] =
		useState<StockWithWatchlistStatus[]>(initialStocks);

	const isSearchMode = !!searchTerm.trim();
	const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				setOpen((v) => !v);
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, []);

	const handleSearch = async () => {
		if (!isSearchMode) return setStocks(initialStocks);

		setLoading(true);

		try {
			const results = await searchStocks(searchTerm.trim());
			setStocks(results);
		} catch {
			setStocks([]);
		} finally {
			setLoading(false);
		}
	};

	const debouncedSearch = useDebounce(handleSearch, 3000);

	useEffect(() => {
		debouncedSearch();
	}, [searchTerm]);

	const openSearch = () => {
		setOpen(true);
	};

	const handleSelectStock = () => {
		setOpen(false);
		setSearchTerm('');
		setStocks(initialStocks);
	};

	return (
		<>
			{renderAs === 'text' ? (
				<span onClick={openSearch} className='search-text'>
					{label}
				</span>
			) : (
				<Button onClick={openSearch} className='search-btn'></Button>
			)}

			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				className='search-dialog'>
				<div className='search-field'>
					<CommandInput
						value={searchTerm}
						onValueChange={setSearchTerm}
						placeholder='Search stocks...'
						className='search-input'
					/>
					{loading && <Loader2 className='search-loader' />}
				</div>
				<CommandList className='search-list'>
					{loading ? (
						<CommandEmpty className='search-list-empty'>
							Loading stocks...
						</CommandEmpty>
					) : displayStocks?.length === 0 ? (
						<div className='search-list-indicator'>
							{isSearchMode ? 'No results found' : 'No stocks available'}
						</div>
					) : (
						<ul>
							<div className='search-count'>
								{isSearchMode ? 'Search results' : 'Popular stocks'} (
								{displayStocks?.length || 0})
							</div>
							{displayStocks?.map((stock, i) => (
								<li key={i} className='search-items'>
									<Link
										href={`/stocks/${stock.symbol}`}
										onClick={handleSelectStock}>
										<TrendingUp className='h-4 w-4 text-gray-500' />
										<div className='flex-1'>
											<div className='search-item-name'>{stock.name}</div>
											<div className='text-sm text-gray-500'>
												{stock.symbol} | {stock.exchange} | {stock.type}
											</div>
										</div>
									</Link>
									{/* <Star /> */}
								</li>
							))}
						</ul>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
}
