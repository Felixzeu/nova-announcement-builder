document.addEventListener('DOMContentLoaded', function() {
    // --- ELEMENTI DOM ---
    const serverNameInput = document.getElementById('serverName');
    const sessionTypeInput = document.getElementById('sessionType');
    const requiredReactsInput = document.getElementById('requiredReacts');
    const lateNightInput = document.getElementById('lateNight');
    const lateNightToggle = document.getElementById('lateNightToggle');
    const languageSelect = document.getElementById('languageSelect');
    const gameDelay = document.getElementById('gameDelay');
    const gameDelayDisplay = document.getElementById('gameDelayDisplay');
    
    // Champion fields
    const registrationTime = document.getElementById('registrationTime');
    const gameDuration = document.getElementById('gameDuration');
    const staffId = document.getElementById('staffId');
    const gameCountInput = document.getElementById('gameCount');
    
    const announcementPreview = document.getElementById('announcementPreview');
    const copyAnnouncementBtn = document.getElementById('copyAnnouncementBtn');
    const copyRegTimestampBtn = document.getElementById('copyRegTimestampBtn');
    const copyGameTimestampBtn = document.getElementById('copyGameTimestampBtn');

    const timestampInput = document.getElementById('timestampInput');
    const dateTimePicker = document.getElementById('dateTimePicker');
    const formatPreviews = document.querySelectorAll('.format-preview');
    const formatCodes = document.querySelectorAll('.format-code');

    let selectedServer = 'Nova Division 0';
    let selectedType = 'Duo';
    let selectedReacts = 55;
    let isLateNight = false;
    let currentLang = 'it';
    let selectedDelay = 15;

    // --- FUNZIONI UTILITY ---
    function toUnixTimestamp(date) {
        return Math.floor(date.getTime() / 1000);
    }

    function formatDiscordTime(unix, format) {
        return `<t:${unix}:${format}>`;
    }

    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    // --- GESTIONE LATE NIGHT TOGGLE ---
    lateNightToggle.addEventListener('click', function() {
        isLateNight = !isLateNight;
        this.textContent = isLateNight ? 'ON' : 'OFF';
        this.classList.toggle('active');
        lateNightInput.value = isLateNight ? 'true' : 'false';
        generateAnnouncement();
    });

    // --- GESTIONE SERVER ---
    document.querySelectorAll('.server-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.server-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedServer = this.dataset.server;
            selectedDelay = parseInt(this.dataset.delay) || 15;
            serverNameInput.value = selectedServer;
            
            gameDelay.value = selectedDelay;
            gameDelayDisplay.textContent = `+${selectedDelay} min`;
            
            generateAnnouncement();
        });
    });

    // --- GESTIONE TIPO SESSIONE ---
    document.querySelectorAll('.session-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.session-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedType = this.dataset.type;
            selectedReacts = parseInt(this.dataset.reacts) || 55;
            sessionTypeInput.value = selectedType;
            requiredReactsInput.value = selectedReacts;
            generateAnnouncement();
        });
    });

    // --- GESTIONE GAME COUNT ---
    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            gameCountInput.value = this.dataset.games;
            generateAnnouncement();
        });
    });

    // --- GESTIONE GAME DELAY ---
    gameDelay.addEventListener('input', function() {
        gameDelayDisplay.textContent = `+${this.value} min`;
        generateAnnouncement();
    });

    // --- GESTIONE LOBBY BUTTONS ---
    document.getElementById('firstLobbyBtn').addEventListener('click', function() {
        document.querySelector('.preview-box').textContent += '\nFirst Lobby selected';
    });
    document.getElementById('secondLobbyBtn').addEventListener('click', function() {
        document.querySelector('.preview-box').textContent += '\nSecond Lobby selected';
    });
    document.getElementById('thirdLobbyBtn').addEventListener('click', function() {
        document.querySelector('.preview-box').textContent += '\nThird Lobby selected';
    });
    document.getElementById('reloadBtn').addEventListener('click', function() {
        document.querySelector('.preview-box').textContent += '\nReload selected';
    });
    document.getElementById('reload2ndBtn').addEventListener('click', function() {
        document.querySelector('.preview-box').textContent += '\nReload 2nd Lobby selected';
    });
    document.getElementById('reload3rdBtn').addEventListener('click', function() {
        document.querySelector('.preview-box').textContent += '\nReload 3rd Lobby selected';
    });
    document.getElementById('lateNight1stBtn').addEventListener('click', function() {
        document.querySelector('.preview-box').textContent += '\nLate Night 1st Lobby selected';
    });
    document.getElementById('lateNight2ndBtn').addEventListener('click', function() {
        document.querySelector('.preview-box').textContent += '\nLate Night 2nd Lobby selected';
    });

    // --- GENERA ANNUNCIO ---
    function generateAnnouncement() {
        let announcement = [];
        const lateNightText = isLateNight ? 'Late Night ' : '';

        const regDate = new Date(registrationTime.value);
        if (isNaN(regDate.getTime())) {
            announcementPreview.textContent = currentLang === 'it' ? '⚠️ Inserisci una data e ora valida.' : '⚠️ Please enter a valid date and time.';
            return;
        }

        const staff = staffId.value.trim() || 'ID_STAFF';
        const games = parseInt(gameCountInput.value) || 2;
        const reacts = selectedReacts;
        const delay = parseInt(gameDelay.value) || 15;

        const regUnix = toUnixTimestamp(regDate);
        const gameUnix = regUnix + (delay * 60);

        // Header
        announcement.push(`### ${lateNightText}${selectedType} Practice Session <:champion:1472618819502608404>`);
        announcement.push('');
        
        // Orari
        announcement.push(`> * **Registration Opens:** ${formatDiscordTime(regUnix, 't')} `);
        announcement.push(`> * **Game 1/${games}:** ${formatDiscordTime(gameUnix, 't')} `);
        announcement.push('');
        
        // Staff
        announcement.push(`Staff in charge: <@${staff}> `);
        announcement.push('');
        
        // Regole
        announcement.push(`**-** Session lasts **${games} games**, **Miss a single game and you will be banned.**`);
        announcement.push(`**-** Make sure to read https://discord.com/channels/1471487091551633410/1471490037945204918 & https://discord.com/channels/1471487091551633410/1471489805979484333 **before** playing.`);
        announcement.push(`**-** Bottom 3 will lose access.`);
        announcement.push('');
        
        // Reazioni
        announcement.push(`**Need at least ${reacts}+ reacts to host ** (1 per duo)`);
        announcement.push('');
        announcement.push('@everyone');

        announcementPreview.textContent = announcement.join('\n');
    }

    // --- GESTIONE PULSANTI RAPIDI MINUTI ---
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const minutes = parseInt(this.dataset.minutes);
            const now = new Date();
            now.setMinutes(now.getMinutes() + minutes);
            now.setSeconds(0, 0);
            registrationTime.value = formatDateForInput(now);
            
            document.querySelectorAll('.quick-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            generateAnnouncement();
        });
    });

    // --- GESTIONE QUICK HOURS ---
    document.querySelectorAll('.hour-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const hour = parseInt(this.dataset.hour);
            const now = new Date();
            now.setHours(hour, 0, 0, 0);
            
            if (now < new Date()) {
                now.setDate(now.getDate() + 1);
            }
            
            const dateStr = formatDateForInput(now);
            registrationTime.value = dateStr;
            
            document.querySelectorAll('.hour-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            generateAnnouncement();
        });
    });

    // --- FUNZIONI COPIA ---
    function copyToClipboard(text, button) {
        const msg = currentLang === 'it' ? 'Genera prima un annuncio!' : 'Please generate an announcement first!';
        if (!text || text.startsWith('⚠️')) {
            alert(msg);
            return;
        }
        
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '✅ Copiato!';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            alert(currentLang === 'it' ? 'Errore nella copia: ' + err : 'Error copying: ' + err);
        });
    }

    copyAnnouncementBtn.addEventListener('click', function() {
        copyToClipboard(announcementPreview.textContent, this);
    });

    copyRegTimestampBtn.addEventListener('click', function() {
        const regDate = new Date(registrationTime.value);
        if (isNaN(regDate.getTime())) {
            alert(currentLang === 'it' ? 'Inserisci una data valida!' : 'Please enter a valid date!');
            return;
        }
        const unix = toUnixTimestamp(regDate);
        const timestamp = `<t:${unix}:t>`;
        copyToClipboard(timestamp, this);
    });

    copyGameTimestampBtn.addEventListener('click', function() {
        const regDate = new Date(registrationTime.value);
        if (isNaN(regDate.getTime())) {
            alert(currentLang === 'it' ? 'Inserisci una data valida!' : 'Please enter a valid date!');
            return;
        }
        const delay = parseInt(gameDelay.value) || 15;
        const gameDate = new Date(regDate.getTime() + (delay * 60000));
        const unix = toUnixTimestamp(gameDate);
        const timestamp = `<t:${unix}:t>`;
        copyToClipboard(timestamp, this);
    });

    // --- TIMESTAMP HELPER ---
    function updateTimestampPreviews(unixTimestamp) {
        if (!unixTimestamp || isNaN(unixTimestamp) || unixTimestamp <= 0) {
            formatPreviews.forEach(el => el.textContent = '-');
            return;
        }
        
        formatCodes.forEach((codeEl, index) => {
            const format = codeEl.dataset.format;
            const fullCode = `<t:${unixTimestamp}:${format}>`;
            codeEl.textContent = fullCode;

            const previewEl = formatPreviews[index];
            const date = new Date(unixTimestamp * 1000);
            
            if (isNaN(date.getTime())) {
                previewEl.textContent = currentLang === 'it' ? 'Data non valida' : 'Invalid date';
                return;
            }

            let previewText = '';
            const locale = currentLang === 'it' ? 'it-IT' : 'en-US';
            switch(format) {
                case 'd': 
                    previewText = date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }); 
                    break;
                case 'D': 
                    previewText = date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); 
                    break;
                case 't': 
                    previewText = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }); 
                    break;
                case 'T': 
                    previewText = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }); 
                    break;
                case 'f': 
                    previewText = date.toLocaleString(locale, { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }); 
                    break;
                case 'F': 
                    previewText = date.toLocaleString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }); 
                    break;
                case 'R': 
                    const now = Math.floor(Date.now() / 1000);
                    const diffSeconds = unixTimestamp - now;
                    const diffMinutes = Math.floor(diffSeconds / 60);
                    const diffHours = Math.floor(diffMinutes / 60);
                    const diffDays = Math.floor(diffHours / 24);
                    
                    if (currentLang === 'it') {
                        if (Math.abs(diffSeconds) < 60) previewText = 'ora';
                        else if (Math.abs(diffMinutes) < 60) previewText = (diffMinutes > 0 ? 'tra ' : '') + Math.abs(diffMinutes) + ' min' + (diffMinutes < 0 ? ' fa' : '');
                        else if (Math.abs(diffHours) < 24) previewText = (diffHours > 0 ? 'tra ' : '') + Math.abs(diffHours) + ' h' + (diffHours < 0 ? ' fa' : '');
                        else previewText = (diffDays > 0 ? 'tra ' : '') + Math.abs(diffDays) + ' gg' + (diffDays < 0 ? ' fa' : '');
                    } else {
                        if (Math.abs(diffSeconds) < 60) previewText = 'now';
                        else if (Math.abs(diffMinutes) < 60) previewText = (diffMinutes > 0 ? 'in ' : '') + Math.abs(diffMinutes) + ' min' + (diffMinutes < 0 ? ' ago' : '');
                        else if (Math.abs(diffHours) < 24) previewText = (diffHours > 0 ? 'in ' : '') + Math.abs(diffHours) + ' h' + (diffHours < 0 ? ' ago' : '');
                        else previewText = (diffDays > 0 ? 'in ' : '') + Math.abs(diffDays) + ' d' + (diffDays < 0 ? ' ago' : '');
                    }
                    break;
                default: 
                    previewText = date.toString();
            }
            previewEl.textContent = previewText;
        });
    }

    function handleTimestampInput() {
        let unix = parseInt(timestampInput.value);
        if (!isNaN(unix) && unix > 0) {
            const date = new Date(unix * 1000);
            if (!isNaN(date.getTime())) {
                dateTimePicker.value = formatDateForInput(date);
                updateTimestampPreviews(unix);
                return;
            }
        }
        handleDateTimePicker();
    }

    function handleDateTimePicker() {
        const dateStr = dateTimePicker.value;
        if (!dateStr) {
            updateTimestampPreviews(null);
            return;
        }
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
            const unix = toUnixTimestamp(date);
            timestampInput.value = unix;
            updateTimestampPreviews(unix);
        }
    }

    timestampInput.addEventListener('input', handleTimestampInput);
    dateTimePicker.addEventListener('input', handleDateTimePicker);

    // --- EVENTI GENERATORE ---
    [registrationTime, staffId].forEach(el => {
        if (el) {
            el.addEventListener('change', generateAnnouncement);
            el.addEventListener('input', generateAnnouncement);
        }
    });

    // --- LANGUAGE SELECTOR ---
    languageSelect.addEventListener('change', function() {
        const lang = this.value;
        // Per ora solo cambio lingua visuale
        currentLang = lang;
        generateAnnouncement();
    });

    // --- INIZIALIZZAZIONE ---
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    now.setSeconds(0, 0);
    const dateStr = formatDateForInput(now);
    registrationTime.value = dateStr;

    const nowHelper = new Date();
    dateTimePicker.value = formatDateForInput(nowHelper);
    handleDateTimePicker();
    
    generateAnnouncement();
});
