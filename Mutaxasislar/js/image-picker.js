// Mutaxasis ishchilar — Galeriyadan rasm tanlash (telefon uchun)

const MAX_IMAGES = 3;

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function initProductImagePicker() {
    const pickerBtn = document.getElementById('productImagePickerBtn');
    const fileInput = document.getElementById('productImageFile');
    const previewsEl = document.getElementById('productImagePreviews');
    const img1 = document.getElementById('productImage');
    const img2 = document.getElementById('productImage2');
    const img3 = document.getElementById('productImage3');

    if (!pickerBtn || !fileInput || !previewsEl) return;

    function clearPicks() {
        if (previewsEl) previewsEl.innerHTML = '';
        if (img1) img1.value = '';
        if (img2) img2.value = '';
        if (img3) img3.value = '';
        if (fileInput) fileInput.value = '';
    }

    function setImageInputs(urls) {
        if (img1) img1.value = urls[0] || '';
        if (img2) img2.value = urls[1] || '';
        if (img3) img3.value = urls[2] || '';
    }

    pickerBtn?.addEventListener('click', () => fileInput?.click());

    previewsEl.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.product-image-preview-remove');
        if (!removeBtn) return;
        e.preventDefault();
        const idx = parseInt(removeBtn.dataset.index);
        const currentUrls = [img1?.value || '', img2?.value || '', img3?.value || ''].filter(Boolean);
        currentUrls.splice(idx, 1);
        const newUrls = [...currentUrls, '', '', ''].slice(0, 3);
        setImageInputs(newUrls);
        if (newUrls.filter(Boolean).length === 0) {
            previewsEl.innerHTML = '';
            fileInput.value = '';
        } else {
            previewsEl.innerHTML = newUrls.filter(Boolean).map((url, i) => `
                <div class="product-image-preview" data-index="${i}">
                    <img src="${url}" alt="Rasm ${i + 1}">
                    <button type="button" class="product-image-preview-remove" data-index="${i}" title="O'chirish">&times;</button>
                </div>
            `).join('');
        }
    });

    fileInput?.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files || []).slice(0, MAX_IMAGES);
        if (files.length === 0) return;

        try {
            const urls = await Promise.all(files.map(f => fileToDataUrl(f)));
            setImageInputs(urls);

            previewsEl.innerHTML = urls.map((url, i) => `
                <div class="product-image-preview" data-index="${i}">
                    <img src="${url}" alt="Rasm ${i + 1}">
                    <button type="button" class="product-image-preview-remove" data-index="${i}" title="O'chirish">&times;</button>
                </div>
            `).join('');
        } catch (err) {
            alert('Rasmlarni yuklashda xatolik: ' + (err.message || ''));
        }
    });

    return { clearPicks };
}
