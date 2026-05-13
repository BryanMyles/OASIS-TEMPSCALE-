document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('temp-input');
    const btnC2F = document.getElementById('btn-c2f');
    const btnF2C = document.getElementById('btn-f2c');
    const btnConvert = document.getElementById('btn-convert');
    const resultSection = document.getElementById('result-section');
    const resultTemp = document.getElementById('result-temp');
    const resultContext = document.getElementById('result-context');
    const recentActivity = document.getElementById('recent-activity');

    let isCelsiusToFahrenheit = true;

    function updateToggleStyles() {
        if (isCelsiusToFahrenheit) {
            btnC2F.classList.add('active');
            btnF2C.classList.remove('active');
        } else {
            btnC2F.classList.remove('active');
            btnF2C.classList.add('active');
        }
    }

    btnC2F.addEventListener('click', () => {
        isCelsiusToFahrenheit = true;
        updateToggleStyles();
    });

    btnF2C.addEventListener('click', () => {
        isCelsiusToFahrenheit = false;
        updateToggleStyles();
    });

    btnConvert.addEventListener('click', () => {
        const val = parseFloat(inputField.value);
        if (isNaN(val)) return;

        let result;
        let activityText;

        if (isCelsiusToFahrenheit) {
            result = (val * 9 / 5) + 32;
            activityText = `${val}°C → ${result.toFixed(1)}°F`;
        } else {
            result = (val - 32) * 5 / 9;
            activityText = `${val}°F → ${result.toFixed(1)}°C`;
        }

        const formattedResult = parseFloat(result.toFixed(1));
        const unitLabel = isCelsiusToFahrenheit ? '°F' : '°C';

        resultTemp.textContent = `${formattedResult}${unitLabel}`;
        recentActivity.textContent = activityText;

        // Context text logic
        let contextText = '';
        if (isCelsiusToFahrenheit) {
            if (formattedResult <= 32) contextText = 'Freezing point of water or lower';
            else if (formattedResult >= 212) contextText = 'Boiling point of water or higher';
            else if (formattedResult >= 68 && formattedResult <= 72) contextText = 'Standard room temperature';
        } else {
            if (formattedResult <= 0) contextText = 'Freezing point of water or lower';
            else if (formattedResult >= 100) contextText = 'Boiling point of water or higher';
            else if (formattedResult >= 20 && formattedResult <= 22) contextText = 'Standard room temperature';
        }
        
        resultContext.textContent = contextText;

        resultSection.classList.remove('opacity-50');
        resultSection.classList.add('opacity-100');
    });
});
