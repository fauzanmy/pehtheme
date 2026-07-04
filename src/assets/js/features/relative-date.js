// Dapatkan semua elemen <time> dengan atribut datetime
const timeElements = document.querySelectorAll('time[datetime]');

// Dapatkan tanggal hari ini
const today = new Date();

// Fungsi untuk mendapatkan waktu dalam Bahasa Indonesia
function getTimeInIndonesian(timeDifference, unit) {
	switch (unit) {
		case 'minutes':
			return timeDifference + ' menit';
		case 'hours':
			return timeDifference + ' jam';
		case 'days':
			return timeDifference + ' hari';
		case 'months':
			return timeDifference + ' bulan';
		case 'years':
			return timeDifference + ' tahun';
		default:
			return 'detik';
	}
}

// Iterasi melalui setiap elemen dan perbarui teksnya
timeElements.forEach(function (timeElement) {
	// Dapatkan tanggal dari atribut datetime
	const dateAttribute = timeElement.getAttribute('datetime');
	const date = new Date(dateAttribute);

	// Hitung perbedaan waktu dalam milidetik
	const timeDifference = today - date;

	// Perbarui teks elemen berdasarkan perbedaan waktu
	if (timeDifference < 3600000) {
		// Kurang dari 1 jam (1 jam = 3600000 milidetik)
		const minutesAgo = Math.floor(timeDifference / 60000);
		timeElement.textContent = getTimeInIndonesian(minutesAgo, 'minutes');
	} else if (timeDifference < 86400000) {
		// Kurang dari 1 hari (1 hari = 86400000 milidetik)
		const hoursAgo = Math.floor(timeDifference / 3600000);
		timeElement.textContent = getTimeInIndonesian(hoursAgo, 'hours');
	} else if (timeDifference < 2592000000) {
		// Kurang dari 30 hari (30 hari = 2592000000 milidetik)
		const daysAgo = Math.floor(timeDifference / 86400000);
		timeElement.textContent = getTimeInIndonesian(daysAgo, 'days');
	} else if (timeDifference < 31536000000) {
		// Kurang dari 1 tahun (1 tahun = 31536000000 milidetik)
		const monthsAgo = Math.floor(timeDifference / 2592000000);
		timeElement.textContent = getTimeInIndonesian(monthsAgo, 'months');
	} else {
		const yearsAgo = Math.floor(timeDifference / 31536000000);
		timeElement.textContent = getTimeInIndonesian(yearsAgo, 'years');
	}
});
