import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styles from '../styles/Sidebar.module.css';
import { FaDice, FaHeart, FaUser } from 'react-icons/fa';

import { IoHomeOutline, IoSearch } from 'react-icons/io5';

const playlists = [
	{
		owner: 'Madeon',
		name: 'Good Faith',
		imgURl: '/images/madeon-good-faith.jpg',
	},
];
function SideBar({ code }) {
	const notify = () => {
		toast('🦄 Wow so easy!', {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
	};

	const playlistDisplay = playlists.map((playlist, i) => {
		return (
			<div className={styles.playlistDisplay} key={i}>
				<Image src="/images/madeon-good-faith.jpg" width={50} height={50} />
				<div className={styles.playlistDetails}>
					<p className={styles.playlistName}>{playlist.name}</p>
					<p className={styles.playlistOwner}>{playlist.owner}</p>
				</div>
			</div>
		);
	});

	return (
		<div className={styles.sidebarContainer}>
			<div className={styles.placeholder}></div>
			<div className={styles.sidebarContainerTop}>
				<Link
					href={{ pathname: `/`, query: { code: `${code}` } }}
					className={styles.navLink}
				>
					<div>
						<IoHomeOutline size={25} className={styles.navLinkIcon} />
					</div>
					<h3>Home</h3>
				</Link>
				<Link
					href={{ pathname: `/search`, query: { code: `${code}` } }}
					className={styles.navLink}
				>
					<div>
						<IoSearch size={25} className={styles.navLinkIcon} />
					</div>
					<h3>Search</h3>
				</Link>
				<Link
					href={{ pathname: '/recommendations', query: { code: `${code}` } }}
					className={styles.navLink}
				>
					<div>
						<FaDice size={25} className={styles.navLinkIcon} />
					</div>
					<h3>Recommendations</h3>
				</Link>
				{/* <Link
					href={{ pathname: '/following', query: { code: `${code}` } }}
					className={styles.navLink}
				>
					<div>
						<IoPeopleSharp size={25} className={styles.navLinkIcon} />
					</div>
					<h3>Friends</h3>
				</Link> */}
				{/* <Link
					href={{ pathname: '/following', query: { code: `${code}` } }}
					className={styles.navLink}
				>
					<div>
						<FaUser size={25} className={styles.navLinkIcon} />
					</div>
					<h3>Go to Profile</h3>
				</Link> */}
			</div>
			<div className={styles.sidebarContainerBottom}>
				<h3>User History</h3>
				<div className={styles.sidebarContainerBottomHeader}>
					{/* <div className={styles.navLink}>
						<h3>User History</h3>
					</div> */}

					{/* <div className={styles.addButtonContainer}>
						<FaPlus size={25} className={styles.addButton} />
						<p className={styles.addButtonText}>Add to Playlist</p>
					</div> */}
				</div>
				<div className={styles.favoritesContainer}>
					<div className={styles.favIconContainer}>
						<FaHeart size={25} className={styles.favIcon} color="white" />
					</div>

					<Link
						href={{ pathname: '/favorites', query: { code: `${code}` } }}
						className={styles.playlistDetails}
					>
						<h3 className={styles.playlistName}>Favorites</h3>
					</Link>
				</div>
				{playlistDisplay}
			</div>
		</div>
	);
}

export default SideBar;
