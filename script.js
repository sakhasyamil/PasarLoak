const CATALOG = [
    { 
        n: "Vintage Rolex Submariner", 
        p: "145.000.000", 
        c: "Elektronik", 
        img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
        d: "Jam tangan legendaris tahun 1970. Kondisi sangat terawat, mesin orisinal, dan memiliki nilai sejarah tinggi bagi kolektor."
    },
    { 
        n: "MacBook Air M1 Perak", 
        p: "10.200.000", 
        c: "Elektronik", 
        img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        d: "Performa kencang dengan chip Apple M1. Kondisi mulus 98%, baterai awet, sangat cocok untuk profesional kreatif."
    },
    { 
        n: "Vespa Sprint S Kuning", 
        p: "46.000.000", 
        c: "Otomotif", 
        img: "https://images.unsplash.com/photo-1511210405232-a50674258888?w=500",
        d: "Gaya retro modern yang ikonik. Warna kuning cerah, mesin halus, surat-surat lengkap dan siap menemani petualangan kota."
    },
    { 
        n: "Sofa L Chesterfield", 
        p: "4.500.000", 
        c: "Furnitur", 
        img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
        d: "Kenyamanan mewah untuk ruang tamu Anda. Bahan kulit premium dengan aksen kancing klasik khas Inggris."
    },
    { 
        n: "Apartemen Studio Modern", 
        p: "320.000.000", 
        c: "Properti", 
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
        d: "Hunian minimalis di pusat kota. Sudah termasuk perabotan (full furnished), siap huni, dan dekat akses transportasi umum."
    },
    { 
        n: "iPhone 13 Pro Biru", 
        p: "11.800.000", 
        c: "Elektronik", 
        img: "https://images.unsplash.com/photo-1510557883981-0d9526786968?w=500",
        d: "Kamera profesional dalam genggaman. Warna Sierra Blue eksklusif, kapasitas 256GB, layar ProMotion 120Hz."
    }
];

function navigasi(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('active');
        if(l.textContent.toLowerCase().includes(pageId) || 
           (pageId === 'market' && l.textContent.toLowerCase().includes('katalog')) ||
           (pageId === 'profil' && l.textContent.toLowerCase().includes('tentang'))) {
            l.classList.add('active');
        }
    });
}

function renderMarket() {
    const grid = document.getElementById('market-container');
    if(!grid) return;
    grid.innerHTML = "";
    CATALOG.forEach(item => {
        grid.innerHTML += `
            <div class="luxury-card">
                <div class="card-img-box">
                    <img src="${item.img}" class="prod-img" alt="${item.n}">
                </div>
                <div class="card-body">
                    <span class="item-cat-tag">${item.c}</span>
                    <h3 style="margin: 5px 0;">${item.n}</h3>
                    <p class="item-desc">${item.d}</p>
                    <p style="font-weight: 700; color: var(--gold); font-size: 1.1rem;">Rp ${item.p}</p>
                    <button class="btn-hero btn-gold-gradient" style="width: 100%; margin-top: 15px; padding: 10px;">
                        Lihat Detail
                    </button>
                </div>
            </div>
        `;
    });
}

let db = JSON.parse(localStorage.getItem('PASARLOAK_FINAL')) || [];

const formTransaksi = document.getElementById('formTransaksi');
if(formTransaksi) {
    formTransaksi.addEventListener('submit', function(e) {
        e.preventDefault();
        const n = document.getElementById('namaT').value;
        const j = document.getElementById('jumlahT').value;
        const k = document.getElementById('kategoriT').value;

        if(!n || !j || !k) {
            alert("Perhatian: Mohon lengkapi semua data sebelum mendaftarkan barang.");
            return;
        }

        db.push({ id: Date.now(), n, j, k });
        localStorage.setItem('PASARLOAK_FINAL', JSON.stringify(db));
        renderTable();
        this.reset();
        alert("Sukses: Data transaksi berhasil disimpan.");
    });
}

function renderTable() {
    const tb = document.getElementById('tabelData')?.querySelector('tbody');
    if(!tb) return;
    tb.innerHTML = "";
    db.forEach(i => {
        const row = tb.insertRow();
        row.innerHTML = `
            <td>${i.n}</td>
            <td>Rp ${parseInt(i.j).toLocaleString('id-ID')}</td>
            <td><span class="hero-tag" style="border: 1px solid var(--gold); font-size: 0.7rem; padding: 2px 8px;">${i.k}</span></td>
            <td><button onclick="hapus(${i.id})" style="color:red; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i> Hapus</button></td>
        `;
    });
}

function hapus(id) {
    if(confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
        db = db.filter(i => i.id !== id);
        localStorage.setItem('PASARLOAK_FINAL', JSON.stringify(db));
        renderTable();
    }
}

function filterBarang() {
    const key = document.getElementById('inputCari').value.toLowerCase();
    const cards = document.querySelectorAll('.luxury-card');
    cards.forEach(c => {
        const title = c.querySelector('h3').innerText.toLowerCase();
        c.style.display = title.includes(key) ? "block" : "none";
    });
}

window.onload = () => { 
    renderMarket(); 
    renderTable(); 
};