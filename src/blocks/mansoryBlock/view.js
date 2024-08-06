/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

const reBuildGrid = function () {
	var grid = document.querySelector('.grid');
	imagesLoaded(grid, function () {
		new Masonry(grid, {
			itemSelector: '.grid-item',
			percentPosition: true,
			columnWidth: '.grid-sizer',
			gutter: 10,

		});
	});
}

document.addEventListener('DOMContentLoaded', function () {
	var grid = document.querySelector('.grid');
	imagesLoaded(grid, function () {
		new Masonry(grid, {
			itemSelector: '.grid-item',
			percentPosition: true,
			columnWidth: '.grid-sizer',
			gutter: 10,

		});
	});

	let filterContainer = document.querySelector(".staff__container");

	if (document.querySelector('.department')) {
		document.querySelector('.department').addEventListener('change', function () {
			let value = this.value;

			document.querySelector('.loader__container').innerHTML = '<span class="loader"></span>';
			document.querySelector('.loader__container').classList.add('loader__activo');

			filterContainer.style = 'opacity: 0.1';

			fetch(admin_url.ajax_url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: 'action=filter_staff&valueSelected=' + value,
			})
				.then(response => response.text())
				.then(result => {
					// Cuando la petición sea exitosa, puedes ocultar el loader.
					document.querySelector('.loader__container').innerHTML = '';
					filterContainer.style = 'opacity: 1';
					filterContainer.innerHTML = result;
					reBuildGrid();

				})
				.catch(error => {
					// En caso de error, también es conveniente ocultar el loader.
					document.querySelector('.loader__container').innerHTML = '';
					console.error('Error:', error);
				});

		});
	}
});
