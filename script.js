// Populate Date Selectors
const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

for (let i = 1; i <= 31; i++) {
    daySelect.innerHTML += `<option value="${i}">${i < 10 ? '0' + i : i}</option>`;
}

months.forEach((m, i) => {
    monthSelect.innerHTML += `<option value="${i + 1}">${m}</option>`;
});

function calculateAge() {
    const d = document.getElementById('day').value;
    const m = document.getElementById('month').value;
    const y = document.getElementById('year').value;

    if (!d || !m || !y) {
        alert("Please complete all date fields.");
        return;
    }

    const currentYear = new Date().getFullYear();
    if (y < 1900 || y > currentYear) {
        alert("Please enter a valid year.");
        return;
    }

    // UI Updates
    const loader = document.getElementById('loader');
    const resultBox = document.getElementById('resultBox');
    
    loader.classList.remove('hidden');
    resultBox.classList.add('hidden');

    setTimeout(() => {
        loader.classList.add('hidden');
        
        const birthDate = new Date(y, m - 1, d);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let monthsDiff = today.getMonth() - birthDate.getMonth();
        let daysDiff = today.getDate() - birthDate.getDate();

        // Adjust for negative days or months
        if (daysDiff < 0) {
            monthsDiff--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            daysDiff += lastMonth.getDate();
        }
        if (monthsDiff < 0) {
            years--;
            monthsDiff += 12;
        }

        // Display results
        document.getElementById('resYears').innerText = years;
        document.getElementById('resMonths').innerText = monthsDiff;
        document.getElementById('resDays').innerText = daysDiff;

        resultBox.classList.remove('hidden');
    }, 800);
}