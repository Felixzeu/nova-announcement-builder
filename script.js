document.addEventListener('DOMContentLoaded', function() {
    const serverNameInput = document.getElementById('serverName');
    const sessionTypeInput = document.getElementById('sessionType');
    const requiredReactsInput = document.getElementById('requiredReacts');
    const lateNightInput = document.getElementById('lateNight');
    const lateNightToggle = document.getElementById('lateNightToggle');
    const languageSelect = document.getElementById('languageSelect');
    const gameDelay = document.getElementById('gameDelay');
    const gameDelayDisplay = document.getElementById('gameDelayDisplay');
    
    const championFields = document.getElementById('championFields');
    const registrationTime = document.getElementById('registrationTime');
    const gameDuration = document.getElementById('gameDuration');
    const staffId = document.getElementById('staffId');
    const gameCountInput = document.getElementById('gameCount');
    
    const nzrFields = document.getElementById('nzrFields');
    const nzrStartTime = document.getElementById('nzrStartTime');
    const nzrSessionCount = document.getElementById('nzrSessionCount');
    const nzrGap = document.getElementById('nzrGap');
    
    const announcementPreview = document.getElementById('announcementPreview');
    const copyAnnouncementBtn = document.getElementById('copyAnnouncementBtn');
    const copyRegTimestampBtn = document.getElementById('copyRegTimestampBtn');
    const copyGameTimestampBtn = document.getElementById('copyGameTimestampBtn');

    const timestampInput = document.getElementById('timestampInput');
    const dateTimePicker = document.getElementById('dateTimePicker');
    const formatPreviews = document.querySelectorAll('.format-preview');
    const formatCodes = document.querySelectorAll('.format-code');

    let selectedServer = 'Nova No Zone Rules';
    let selectedType = 'Duo';
    let selectedReacts = 55;
    let isLateNight = false;
    let currentLang = 'it';
    let selectedDelay = 15;

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

    lateNightToggle.addEventListener('click', function() {
        isLateNight = !isLateNight;
        this.textContent = isLateNight ? 'ON' : 'OFF';
        this.classList.toggle('active');
        lateNightInput.value = isLateNight ? 'true' : 'false';
        generateAnnouncement();
    });

    document.querySelectorAll('.server-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.server-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedServer = this.dataset.server;
            selectedDelay = parseInt(this.dataset.delay) || 15;
            serverNameInput.value = selectedServer;
            gameDelay.value = selectedDelay;
            gameDelayDisplay.textContent = `+${selectedDelay} min`;
            
            if (selectedServer === 'Nova No Zone Rules') {
                championFields.style.display = 'none';
                nzrFields.style.display = 'block';
            } else {
                championFields.style.display = 'block';
                nzrFields.style.display = 'none';
            }
            generateAnnouncement();
        });
    });

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

    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            gameCountInput.value = this.dataset.games;
            generateAnnouncement();
        });
    });

    gameDelay.addEventListener('input', function() {
        gameDelayDisplay.textContent = `+${this.value} min`;
        generateAnnouncement();
    });

    document.querySelectorAll('.lobby-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            announcementPreview.textContent += `\n${this.textContent} selected`;
        });
    });

    function generateAnnouncement() {
        let announcement = [];
        const lateNightText = isLateNight ? 'Late Night ' : '';

        if (selectedServer === 'Nova No Zone Rules') {
            const startDate = new Date(nzrStartTime.value);
            if (isNaN(startDate.getTime())) {
                announcementPreview.textContent = '⚠️ Inserisci una data e ora valida.';
                return;
            }

            const sessions = parseInt(nzrSessionCount.value) || 8;
            const gap = parseInt(nzrGap.value) || 80;
            const startUnix = toUnixTimestamp(startDate);
            const emojis = [
                '1_:1362589687339810906',
                '2_:1362589778922573894',
                '3_:1362589811269173258',
                '4_:1362589694583635999',
                '5_:1362589682424086538',
                '6_:1362589690343198800',
                '7_:1362589688745168907',
                '8_:1362589685595242628'
            ];

            announcement.push(`## **${lateNightText}${selectedType} Practice Sessions <:nzr:1433978431804280852>**`);
            announcement.push('');
            for (let i = 0; i < Math.min(sessions, emojis.length); i++) {
                const sessionTime = startUnix + (i * gap * 60);
                announcement.push(`- **Session** <:${emojis[i]}>`);
                announcement.push(`  - **Registration:** ${formatDiscordTime(sessionTime, 't')}`);
                announcement.push(`  - **First Game:** ${formatDiscordTime(sessionTime + 600, 't')}`);
                announcement.push('');
            }
            announcement.push(`* **Information <:Info:1342824791039541328>**`);
            announcement.push(`  * Session lasts **__2 Games__**`);
            announcement.push(`  * Top 1 = <@&1443285911839178844>`);
            announcement.push(`  * Top 5 = [**Champion Division Access**](<https://discord.com/channels/1267285458962878464/1471321891850424361>) <:newdiv:1472341015968088126>`);
            announcement.push(`  * https://discord.com/channels/1267285458962878464/1492700150831911122 & https://discord.com/channels/1267285458962878464/1492703045879070871`);
            announcement.push(`_ _`);
            announcement.push('`React if playing!`');
            announcement.push('-# @everyone');

        } else {
            const regDate = new Date(registrationTime.value);
            if (isNaN(regDate.getTime())) {
                announcementPreview.textContent = '⚠️ Inserisci una data e ora valida.';
                return;
            }

            const staff = staffId.value.trim() || 'ID_STAFF';
            const games = parseInt(gameCountInput.value) || 2;
            const dur = parseInt(gameDuration.value) || 15;
            const reacts = selectedReacts;
            const regUnix = toUnixTimestamp(regDate);
            const gameUnix = regUnix + (dur * 60);

            announcement.push(`@everyone`);
            announcement.push('');
            announcement.push(`**${selectedServer} Practice Session**`);
            announcement.push('');
            announcement.push(`:ArrowRight: Registration opens @`);
            announcement.push(`${formatDiscordTime(regUnix, 't')}`);
            announcement.push('');
            announcement.push(`:ArrowRight: First Game Commences @`);
            announcement.push(`${formatDiscordTime(gameUnix, 't')}`);
            announcement.push('');
            announcement.push(`The host for this session is:`);
            announcement.push(`<@${staff}>, Direct Message them for help.`);
            announcement.push('');
            announcement.push(`- Session lasts ${games} Games. **Miss a single game and you will be banned.**`);
            announcement.push(`- Make sure to read <#1282840995846950962>, <#1282841044521717761> & <#1282841572336996372> before the games.`);
            announcement.push('');
            announcement.push(`Required at least **${reacts}+ Reacts** for 1 lobby and **${reacts * 2}+ Reacts** for a 2nd lobby (1 per duo).`);
        }

        announcementPreview.textContent = announcement.join('\n');
    }

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

    document.querySelectorAll('.quick-nzr-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const minutes = parseInt(this.dataset.minutes);
            const now = new Date();
            now.setMinutes(now.getMinutes() + minutes);
            now.setSeconds(0, 0);
            nzrStartTime.value = formatDateForInput(now);
            document.querySelectorAll('.quick-nzr-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            generateAnnouncement();
        });
    });

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
            nzrStartTime.value = dateStr;
            document.querySelectorAll('.hour-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            generateAnnouncement();
        });
    });

    function copyToClipboard(text, button) {
        if (!text || text.startsWith('⚠️')) {
            alert('Genera prima un annuncio!');
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '✅ Copiato!';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            alert('Errore nella copia: ' + err);
        });
    }

    copyAnnouncementBtn.addEventListener('click', function() {
        copyToClipboard(announcementPreview.textContent, this);
    });

    copyRegTimestampBtn.addEventListener('click', function() {
        const regDate = new Date(registrationTime.value);
        if (isNaN(regDate.getTime())) {
            alert('Inserisci una data valida!');
            return;
        }
        const unix = toUnixTimestamp(regDate);
        copyToClipboard(`<t:${unix}:t>`, this);
    });

    copyGameTimestampBtn.addEventListener('click', function() {
        const regDate = new Date(registrationTime.value);
        if (isNaN(regDate.getTime())) {
            alert('Inserisci una data valida!');
            return;
        }
        const delay = parseInt(gameDelay.value) || 15;
        const gameDate = new Date(regDate.getTime() + (delay * 60000));
        const unix = toUnixTimestamp(gameDate);
        copyToClipboard(`<t:${unix}:t>`, this);
    });

    function updateTimestampPreviews(unixTimestamp) {
        if (!unixTimestamp || isNaN(unixTimestamp) || unixTimestamp <= 0) {
            formatPreviews.forEach(el => el.textContent = '-');
            return;
        }
        formatCodes.forEach((codeEl, index) => {
            const format = codeEl.dataset.format;
            codeEl.textContent = `<t:${unixTimestamp}:${format}>`;
            const previewEl = formatPreviews[index];
            const date = new Date(unixTimestamp * 1000);
            if (isNaN(date.getTime())) {
                previewEl.textContent = 'Data non valida';
                return;
            }
            let previewText = '';
            switch(format) {
                case 'd': previewText = date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' }); break;
                case 'D': previewText = date.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); break;
                case 't': previewText = date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }); break;
                case 'T': previewText = date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); break;
                case 'f': previewText = date.toLocaleString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }); break;
                case 'F': previewText = date.toLocaleString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }); break;
                case 'R':
                    const now = Math.floor(Date.now() / 1000);
                    const diff = unixTimestamp - now;
                    const mins = Math.floor(Math.abs(diff) / 60);
                    if (Math.abs(diff) < 60) previewText = 'ora';
                    else if (mins < 60) previewText = (diff > 0 ? 'tra ' : '') + mins + ' min' + (diff < 0 ? ' fa' : '');
                    else if (mins < 1440) previewText = (diff > 0 ? 'tra ' : '') + Math.floor(mins/60) + ' h' + (diff < 0 ? ' fa' : '');
                    else previewText = (diff > 0 ? 'tra ' : '') + Math.floor(mins/1440) + ' gg' + (diff < 0 ? ' fa' : '');
                    break;
                default: previewText = date.toString();
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

    [registrationTime, gameDuration, staffId, nzrStartTime, nzrSessionCount, nzrGap].forEach(el => {
        if (el) {
            el.addEventListener('change', generateAnnouncement);
            el.addEventListener('input', generateAnnouncement);
        }
    });

    languageSelect.addEventListener('change', function() {
        currentLang = this.value;
        generateAnnouncement();
    });

    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    now.setSeconds(0, 0);
    const dateStr = formatDateForInput(now);
    registrationTime.value = dateStr;
    nzrStartTime.value = dateStr;

    const nowHelper = new Date();
    dateTimePicker.value = formatDateForInput(nowHelper);
    handleDateTimePicker();
    
    nzrFields.style.display = 'none';
    generateAnnouncement();
});
