// Mutaxasis ishchilar — Joylashuv (viloyat, tuman)

import { regions, regionToId, viloyatTumanlari } from './config.js';
import { updateCartPochtaSelect } from './cart.js';

export let selectedRegion = localStorage.getItem('uzum_region') || 'Toshkent';
export let selectedTuman = localStorage.getItem('uzum_tuman') || '';

export function setSelectedRegion(value) { selectedRegion = value; }
export function setSelectedTuman(value) { selectedTuman = value; }

export function openLocationModal() {
    const locationModal = document.getElementById('locationModal');
    const locationList = document.getElementById('locationList');
    const locationText = document.getElementById('locationText');
    const tumanList = document.getElementById('locationTumanList');
    const tumanWrap = document.getElementById('tumanStepWrap');

    locationModal?.classList.add('active');

    if (locationList) {
        locationList.innerHTML = regions.map(r => `
            <button class="location-item ${r === selectedRegion ? 'selected' : ''}" data-region="${r}">${r}</button>
        `).join('');
        locationList.querySelectorAll('.location-item').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedRegion = btn.dataset.region;
                setSelectedRegion(selectedRegion);
                localStorage.setItem('uzum_region', selectedRegion);
                document.querySelectorAll('.location-item').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                const rid = regionToId[selectedRegion] || 'toshkent';
                const tumans = viloyatTumanlari[rid] || [];
                if (tumanList) {
                    tumanList.innerHTML = tumans.map(t => `
                        <button class="location-item ${t === selectedTuman ? 'selected' : ''}" data-tuman="${t}">${t}</button>
                    `).join('');
                    tumanList.querySelectorAll('.location-item').forEach(tBtn => {
                        tBtn.addEventListener('click', () => {
                            selectedTuman = tBtn.dataset.tuman;
                            setSelectedTuman(selectedTuman);
                            localStorage.setItem('uzum_tuman', selectedTuman);
                            if (locationText) locationText.textContent = selectedRegion + ', ' + selectedTuman;
                            locationModal?.classList.remove('active');
                            updateCartPochtaSelect();
                        });
                    });
                }
                if (tumanWrap) tumanWrap.style.display = 'block';
            });
        });
    }

    if (tumanWrap && selectedRegion) {
        const rid = regionToId[selectedRegion] || 'toshkent';
        const tumans = viloyatTumanlari[rid] || [];
        if (tumanList) {
            tumanList.innerHTML = tumans.map(t => `
                <button class="location-item ${t === selectedTuman ? 'selected' : ''}" data-tuman="${t}">${t}</button>
            `).join('');
            tumanList.querySelectorAll('.location-item').forEach(tBtn => {
                tBtn.addEventListener('click', () => {
                    selectedTuman = tBtn.dataset.tuman;
                    setSelectedTuman(selectedTuman);
                    localStorage.setItem('uzum_tuman', selectedTuman);
                    if (locationText) locationText.textContent = selectedRegion + ', ' + selectedTuman;
                    locationModal?.classList.remove('active');
                    updateCartPochtaSelect();
                });
            });
        }
        tumanWrap.style.display = tumans.length ? 'block' : 'none';
    } else if (tumanWrap) tumanWrap.style.display = 'none';
}

export function initLocationText() {
    const locationText = document.getElementById('locationText');
    if (locationText) locationText.textContent = selectedTuman ? selectedRegion + ', ' + selectedTuman : selectedRegion;
}
