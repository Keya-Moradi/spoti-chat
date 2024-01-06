import React from 'react';
import { useRecoilState } from 'recoil';

import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import cookie from 'js-cookie';
import { playlistIdState, playingState } from '../atoms/playlistAtom';

import styles from '../styles/ShareCard.module.css';
import { BiAlbum } from 'react-icons/bi';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

function FavoritesViewCard(props) {
	const [currentTrack, setCurrentTrack] = useRecoilState(playlistIdState);
	const [isplaying, setIsPlaying] = useRecoilState(playingState);
	// retrieve access code from cookies
	const accessToken = cookie.get('accessToken');

	// store values in an object
	const album = {
		spotifyId: props.albumId,
		type: 'album',
		userId: '6587395da725779148bf22e0',
		name: props.albumName,
		imgUrl: props.albumArt,
		artistName: props.artistName,
	};

	// dynamically set notification based on button clicked
	const notify = (message) => {
		toast(message, {
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

	// get tracks for album from Spotify API
	const playAlbum = (e) => {
		axios
			.get(`https://api.spotify.com/v1/albums/${album.spotifyId}/tracks`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				const tracks = response.data.items.map((track) => {
					return track.uri;
				});
				setCurrentTrack(...tracks);
				setIsPlaying(true);
			})
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Retrieving album information!', err);
			});
	};

	// save album to database
	const handleSave = (e) => {
		axios
			.post(`http://localhost:8000/users/${album.userId}/save`, album)
			.then((response) => {
				notify(`${album.name} saved to Favorites`);
			})
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Post!', err);
			});
	};

	const handleShare = (e) => {
		// save to favorites
		// albumId = props.id
		// type = 'album'
		axios
			.post('http://localhost:8000/posts/new', album)
			.then((response) => {
				notify(`${response.data.name} shared to feed`);
			})
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Sharing Album!', err);
			});
	};
	return (
		<div className={styles.shareCardContainer}>
			{/* <h4>Tiffany shared an album</h4> */}
			<ToastContainer />
			<div className={styles.shareAlbumCard}>
				<Image
					src={props.albumArt}
					width={300}
					height={300}
					className={styles.shareAlbumImage}
					alt="album image"
				/>

				<div className={styles.shareAlbumDetails}>
					<h2>{album.name}</h2>
					<p>{album.artistName}</p>
				</div>
			</div>
			<div className={styles.shareCardBottom}>
				<div className={styles.shareCardActions} onClick={playAlbum}>
					{/* <BiAlbum size={16} /> */}
					<FaPlay size={16} />
					<p>Play Album</p>
				</div>
				{/* <div className={styles.shareCardActions}>
					<FaThumbsUp size={16} />
					<p>Like</p>
				</div> */}
				{/* <div className={styles.shareCardActions}>
					<IoChatbubbleOutline size={16} />
					<p>Comment</p>
				</div> */}
				<div className={styles.shareCardActions} onClick={handleSave}>
					<FaBookmark size={16} />
					<p>Save</p>
				</div>

				<div className={styles.shareCardActions} onClick={handleShare}>
					<PiShareFatLight size={16} />
					<p>Share</p>
				</div>
			</div>
		</div>
	);
}

export default FavoritesViewCard;
