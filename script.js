new WOW().init();
        
const button = document.getElementById('buttonsubmit');
const responseContainer = document.getElementById('responseContainer');
const loading = document.getElementById('loading');
const supportButton = document.getElementById('supportButton');
const supportHistory = document.getElementById('supportHistory');

button.addEventListener('click', async function(event) {
    event.preventDefault();
    responseContainer.style.display = 'none';
    loading.classList.add('show');

    const query = document.getElementById('query').value;

    try {
        const response = await fetch('https://khodam-checker-two.vercel.app/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        const result = await response.json();

        loading.classList.remove('show');

        if (result.success) {
            responseContainer.style.display = 'block';
            responseContainer.innerHTML = `Jeng Jeng Isi Khodam Adalah : ${result.response}`;
        } else {
            responseContainer.style.display = 'block';
            responseContainer.innerHTML = `Gagal mengecek khodam. Coba Lagi Dong.`;
        }
    } catch (error) {
        loading.classList.remove('show');
        responseContainer.style.display = 'block';
        responseContainer.innerHTML = `Gagal mengecek khodam. Coba Lagi Dong.`;
    }
});
supportButton.addEventListener('click', async function() {
    supportHistory.style.display = 'none';
    loading.classList.add('show');

    try {
        const response = await fetch('https://khodam-checker-two.vercel.app/api/support-history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        loading.classList.remove('show');

        if (result.success) {
            supportHistory.style.display = 'block';
            const supporters = result.data.result.data;
            if (supporters.length > 0) {
                supportHistory.innerHTML = '<h3>Orang yang Sudah Mentaktir:</h3>';
                supporters.forEach(supporter => {
                    supportHistory.innerHTML += `<p>${supporter.is_guest ? 'Guest' : supporter.reply_message}: ${supporter.net_amount} (${supporter.payment_method})</p>`;
                });
            } else {
                supportHistory.innerHTML = '<p>Belum ada yang mentraktir. Jadilah yang pertama!</p>';
            }
        } else {
            supportHistory.style.display = 'block';
            supportHistory.innerHTML = `<p>Gagal mengambil data. Coba Lagi Dong.</p>`;
        }
    } catch (error) {
        loading.classList.remove('show');
        supportHistory.style.display = 'block';
        supportHistory.innerHTML = `<p>Gagal mengambil data. Coba Lagi Dong.</p>`;
    }
});