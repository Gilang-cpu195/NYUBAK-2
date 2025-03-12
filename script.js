// Fungsi untuk menangani preview foto
document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('studentPhotoPreview');

    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            // Validasi ukuran file (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Ukuran file terlalu besar! Maksimal 2MB');
                photoInput.value = '';
                return;
            }

            // Validasi tipe file
            if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
                alert('Format file tidak didukung! Gunakan PNG atau JPG');
                photoInput.value = '';
                return;
            }

            // Tampilkan preview
            const reader = new FileReader();
            reader.onload = function(e) {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        });
    }
});

// Fungsi untuk menangani logo di navbar
document.addEventListener('DOMContentLoaded', function() {
    const navLogoInput = document.getElementById('navLogoInput');
    const navLogoPreview = document.getElementById('navLogoPreview');
    
    // Set default logo jika ada
    if (localStorage.getItem('schoolLogo')) {
        navLogoPreview.src = localStorage.getItem('schoolLogo');
    } else {
        navLogoPreview.src = 'images/default-logo.png'; // Ganti dengan path logo default
    }

    if (navLogoInput) {
        navLogoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            // Validasi ukuran file (max 1MB untuk logo)
            if (file.size > 1 * 1024 * 1024) {
                alert('Ukuran logo terlalu besar! Maksimal 1MB');
                navLogoInput.value = '';
                return;
            }

            // Validasi tipe file
            if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
                alert('Format file tidak didukung! Gunakan PNG atau JPG');
                navLogoInput.value = '';
                return;
            }

            // Tampilkan preview
            const reader = new FileReader();
            reader.onload = function(e) {
                navLogoPreview.src = e.target.result;
                // Simpan logo di localStorage untuk digunakan di halaman lain
                localStorage.setItem('schoolLogo', e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }
});

// Fungsi untuk validasi form
function validateForm() {
    // Validasi foto
    const photoInput = document.getElementById('photoInput');
    if (photoInput && !photoInput.files[0]) {
        alert('Silakan unggah foto siswa!');
        return false;
    }

    // Ambil semua elemen form yang diperlukan
    const nama = document.getElementById('nama').value.trim();
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const jenisKelamin = document.getElementById('jenisKelamin').value;
    const alamat = document.getElementById('alamat').value.trim();
    const namaOrtu = document.getElementById('namaOrtu').value.trim();
    const telepon = document.getElementById('telepon').value.trim();
    const email = document.getElementById('email').value.trim();
    const asalSekolah = document.getElementById('asalSekolah').value.trim();
    const nilaiRapor = document.getElementById('nilaiRapor')?.value;

    // Validasi nama (minimal 3 karakter)
    if (nama.length < 3) {
        alert('Nama harus minimal 3 karakter!');
        return false;
    }

    // Validasi tanggal lahir
    const today = new Date();
    const birthDate = new Date(tanggalLahir);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 5 || age > 20) {
        alert('Umur harus antara 5 sampai 20 tahun!');
        return false;
    }

    // Validasi jenis kelamin
    if (!jenisKelamin) {
        alert('Silakan pilih jenis kelamin!');
        return false;
    }

    // Validasi alamat (minimal 10 karakter)
    if (alamat.length < 10) {
        alert('Alamat terlalu pendek! Minimal 10 karakter.');
        return false;
    }

    // Validasi nama orang tua (minimal 3 karakter)
    if (namaOrtu.length < 3) {
        alert('Nama orang tua/wali harus minimal 3 karakter!');
        return false;
    }

    // Validasi format nomor telepon (minimal 10 digit, hanya angka)
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(telepon)) {
        alert('Nomor telepon tidak valid! Harus 10-13 digit angka.');
        return false;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return false;
    }

    // Validasi asal sekolah (minimal 5 karakter)
    if (asalSekolah.length < 5) {
        alert('Nama asal sekolah terlalu pendek! Minimal 5 karakter.');
        return false;
    }

    // Validasi nilai rapor
    if (nilaiRapor !== undefined) {
        const nilai = parseFloat(nilaiRapor);
        if (isNaN(nilai) || nilai < 0 || nilai > 100) {
            alert('Nilai rapor harus antara 0 dan 100!');
            return false;
        }
    }

    // Jika semua validasi berhasil
    alert('Pendaftaran berhasil! Data Anda akan segera diproses.');
    return true;
}

// Fungsi untuk mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    
    if (window.innerWidth <= 768) {
        document.querySelector('.nav-container').prepend(hamburger);
        navLinks.style.display = 'none';
        
        hamburger.addEventListener('click', function() {
            if (navLinks.style.display === 'none') {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }
});

// Konfigurasi Google Sheets
const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL'; // Akan diisi nanti dengan URL dari Google Apps Script

// Function untuk mengirim data ke Google Sheets
async function sendToGoogleSheets(formData) {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        alert('Data berhasil disimpan!');
        return true;
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menyimpan data.');
        return false;
    }
}

// Event listener untuk form pendaftaran
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pendaftaranForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                nama: form.querySelector('[name="nama"]').value,
                tanggalLahir: form.querySelector('[name="tanggalLahir"]').value,
                alamat: form.querySelector('[name="alamat"]').value,
                // Tambahkan field lainnya sesuai dengan form Anda
                waktuDaftar: new Date().toISOString()
            };

            await sendToGoogleSheets(formData);
        });
    }
}); 