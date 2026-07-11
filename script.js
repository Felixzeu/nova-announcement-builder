document.addEventListener('DOMContentLoaded', function() {
    const serverNameInput = document.getElementById('serverName');
    const sessionTypeInput = document.getElementById('sessionType');
    const requiredReactsInput = document.getElementById('requiredReacts');
    
    // Champion fields
    const championFields = document.getElementById('championFields');
    const registrationTime = document.getElementById('registrationTime');
    const gameDuration = document.getElementById('gameDuration');
    const staffId = document.getElementById('staffId');
    const gameCountInput = document.getElementById('gameCount');
    const roleId = document.getElementById('roleId');
    const lateNightToggle = document.getElementById('lateNightToggle');
    const lateNightInput = document.getElementById('lateNight');
    
    // NZR fields
    const nzrFields = document.getElementById('nzrFields');
    const nzrStartTime = document.getElementById('nzrStartTime');
    const nzrSessionCount = document.getElementById('nzrSessionCount');
    const nzrGap = document.getElementById('nzrGap');
    const nzrGameDuration = document.getElementById('nzrGameDuration');
    const lateNightToggleNZR = document.getElementById('lateNightToggleNZR');
    const lateNightNZR = document.getElementById('lateNightNZR');
    
    const announcementPreview = document.getElementById('announcementPreview');
    const copyAnnouncementBtn = document.getElementById('copyAnnouncementBtn');
    const copyRegTimestampBtn = document.getElementById('copyRegTimestampBtn');
    const copyGameTimestampBtn = document.getElementById('copyGameTimestampBtn');

    const dateTimePicker = document.getElementById('dateTimePicker');
    const formatPreviews = document.querySelectorAll('.format-preview');
    const formatCodes = document.querySelectorAll('.format-code');
    const copyTimestampBtns = document.querySelectorAll('.copy-timestamp-btn');

    let selectedServer = 'Nova No Zone Rules';
    let selectedType = 'Duo';
    let selectedReacts = 55;
    let isLateNight = false;
    let isLateNightNZR = false;
    let currentLang = 'it';
    let selectedDelay = 15;
    let currentUnixTimestamp = null;
    let isInitialized = false;

    // --- TRADUZIONI ---
    const translations = {
        en: {
            langLabel: '🌐 PAGE LANGUAGE',
            subtitle: 'Select a server, lobby and time — the announcement generates automatically. Then just copy it.',
            servers: '📡 SERVERS',
            setup: '⚙️ SETUP',
            registration: '📅 REGISTRATION OPENS',
            now: 'Use Current Time',
            duration: '⏱️ FIRST GAME DURATION (minutes)',
            staff: '👤 STAFF IN CHARGE (Discord ID)',
            games: '🎮 NUMBER OF GAMES',
            role: '🏅 ROLE ID (optional)',
            sessionType: '🏷️ SESSION TYPE',
            lateNight: '🌙 LATE NIGHT',
            firstSession: '📅 FIRST SESSION DATE',
            totalSessions: '📊 TOTAL SESSIONS',
            gap: '⏱️ GAP BETWEEN SESSIONS (minutes)',
            nzrGameDuration: '⏱️ GAME DURATION (minutes)',
            generated: '📋 GENERATED MESSAGE',
            copyAnnouncement: '📋 Copy Announcement',
            copyReg: '⏰ Copy Reg Timestamp',
            copyGame: '⏰ Copy Game Timestamp',
            timestampHelper: '⏰ Discord Timestamp Helper',
            datePicker: '📅 Select Date/Time',
            shortDate: 'Short Date',
            longDate: 'Long Date',
            shortTime: 'Short Time',
            longTime: 'Long Time',
            shortDateTime: 'Short Date/Time',
            longDateTime: 'Long Date/Time',
            relativeTime: 'Relative Time'
        },
        it: {
            langLabel: '🌐 PAGE LANGUAGE',
            subtitle: 'Seleziona un server, lobby e orario — l\'annuncio viene generato automaticamente. Poi copialo.',
            servers: '📡 SERVERS',
            setup: '⚙️ SETUP',
            registration: '📅 REGISTRATION OPENS',
            now: 'Use Current Time',
            duration: '⏱️ DURATA PRIMA PARTITA (minuti)',
            staff: '👤 STAFF IN CHARGE (Discord ID)',
            games: '🎮 NUMERO DI PARTITE',
            role: '🏅 ROLE ID (opzionale)',
            sessionType: '🏷️ TIPO SESSIONE',
            lateNight: '🌙 LATE NIGHT',
            firstSession: '📅 DATA PRIMA SESSIONE',
            totalSessions: '📊 NUMERO TOTALE SESSIONI',
            gap: '⏱️ GAP TRA SESSIONI (minuti)',
            nzrGameDuration: '⏱️ DURATA PARTITA (minuti)',
            generated: '📋 GENERATED MESSAGE',
            copyAnnouncement: '📋 Copy Announcement',
            copyReg: '⏰ Copy Reg Timestamp',
            copyGame: '⏰ Copy Game Timestamp',
            timestampHelper: '⏰ Discord Timestamp Helper',
            datePicker: '📅 Selezione Data/ora',
            shortDate: 'Data Corta',
            longDate: 'Data Lunga',
            shortTime: 'Ora Corta',
            longTime: 'Ora Lunga',
            shortDateTime: 'Data/Ora Corta',
            longDateTime: 'Data/Ora Lunga',
            relativeTime: 'Tempo Relativo'
        },
        es: {
            langLabel: '🌐 IDIOMA DE LA PÁGINA',
            subtitle: 'Selecciona un servidor, sala y hora — el anuncio se genera automáticamente. Luego cópialo.',
            servers: '📡 SERVIDORES',
            setup: '⚙️ CONFIGURACIÓN',
            registration: '📅 APERTURA DE REGISTRO',
            now: 'Usar hora actual',
            duration: '⏱️ DURACIÓN DEL PRIMER JUEGO (minutos)',
            staff: '👤 PERSONAL A CARGO (ID Discord)',
            games: '🎮 NÚMERO DE JUEGOS',
            role: '🏅 ROLE ID (opcional)',
            sessionType: '🏷️ TIPO DE SESIÓN',
            lateNight: '🌙 NOCHE',
            firstSession: '📅 FECHA DE LA PRIMERA SESIÓN',
            totalSessions: '📊 TOTAL DE SESIONES',
            gap: '⏱️ ESPACIO ENTRE SESIONES (minutos)',
            nzrGameDuration: '⏱️ DURACIÓN DEL JUEGO (minutos)',
            generated: '📋 MENSAJE GENERADO',
            copyAnnouncement: '📋 Copiar Anuncio',
            copyReg: '⏰ Copiar Reg Timestamp',
            copyGame: '⏰ Copiar Game Timestamp',
            timestampHelper: '⏰ Ayudante de Timestamp Discord',
            datePicker: '📅 Seleccionar Fecha/Hora',
            shortDate: 'Fecha Corta',
            longDate: 'Fecha Larga',
            shortTime: 'Hora Corta',
            longTime: 'Hora Larga',
            shortDateTime: 'Fecha/Hora Corta',
            longDateTime: 'Fecha/Hora Larga',
            relativeTime: 'Tiempo Relativo'
        },
        fr: {
            langLabel: '🌐 LANGUE DE LA PAGE',
            subtitle: 'Sélectionnez un serveur, un lobby et une heure — l\'annonce est générée automatiquement. Copiez-la ensuite.',
            servers: '📡 SERVEURS',
            setup: '⚙️ CONFIGURATION',
            registration: '📅 OUVERTURE DES INSCRIPTIONS',
            now: 'Utiliser l\'heure actuelle',
            duration: '⏱️ DURÉE DU PREMIER JEU (minutes)',
            staff: '👤 PERSONNEL RESPONSABLE (ID Discord)',
            games: '🎮 NOMBRE DE JEUX',
            role: '🏅 ROLE ID (optionnel)',
            sessionType: '🏷️ TYPE DE SESSION',
            lateNight: '🌙 NUIT',
            firstSession: '📅 DATE DE LA PREMIÈRE SESSION',
            totalSessions: '📊 TOTAL DES SESSIONS',
            gap: '⏱️ ÉCART ENTRE LES SESSIONS (minutes)',
            nzrGameDuration: '⏱️ DURÉE DU JEU (minutes)',
            generated: '📋 MESSAGE GÉNÉRÉ',
            copyAnnouncement: '📋 Copier Annonce',
            copyReg: '⏰ Copier Reg Timestamp',
            copyGame: '⏰ Copier Game Timestamp',
            timestampHelper: '⏰ Aide Timestamp Discord',
            datePicker: '📅 Sélectionner Date/Heure',
            shortDate: 'Date Courte',
            longDate: 'Date Longue',
            shortTime: 'Heure Courte',
            longTime: 'Heure Longue',
            shortDateTime: 'Date/Heure Courte',
            longDateTime: 'Date/Heure Longue',
            relativeTime: 'Temps Relatif'
        },
        de: {
            langLabel: '🌐 SEITENSPRACHE',
            subtitle: 'Wählen Sie einen Server, eine Lobby und eine Uhrzeit — die Ankündigung wird automatisch generiert. Dann kopieren Sie sie einfach.',
            servers: '📡 SERVER',
            setup: '⚙️ EINRICHTUNG',
            registration: '📅 REGISTRIERUNG ÖFFNET',
            now: 'Aktuelle Uhrzeit verwenden',
            duration: '⏱️ DAUER DES ERSTEN SPIELS (Minuten)',
            staff: '👤 VERANTWORTLICHER MITARBEITER (Discord ID)',
            games: '🎮 ANZAHL DER SPIELE',
            role: '🏅 ROLE ID (optional)',
            sessionType: '🏷️ SITZUNGSTYP',
            lateNight: '🌙 SPÄTE NACHT',
            firstSession: '📅 DATUM DER ERSTEN SITZUNG',
            totalSessions: '📊 GESAMTZAHL DER SITZUNGEN',
            gap: '⏱️ ABSTAND ZWISCHEN SITZUNGEN (Minuten)',
            nzrGameDuration: '⏱️ SPIELDAUER (Minuten)',
            generated: '📋 GENERIERTE NACHRICHT',
            copyAnnouncement: '📋 Ankündigung kopieren',
            copyReg: '⏰ Reg Timestamp kopieren',
            copyGame: '⏰ Game Timestamp kopieren',
            timestampHelper: '⏰ Discord Timestamp Helfer',
            datePicker: '📅 Datum/Uhrzeit auswählen',
            shortDate: 'Kurzes Datum',
            longDate: 'Langes Datum',
            shortTime: 'Kurze Zeit',
            longTime: 'Lange Zeit',
            shortDateTime: 'Kurzes Datum/Uhrzeit',
            longDateTime: 'Langes Datum/Uhrzeit',
            relativeTime: 'Relative Zeit'
        }
    };

    // --- FUNZIONE CAMBIO LINGUA ---
    window.changeLanguage = function(lang) {
        const t = translations[lang] || translations.it;
        currentLang = lang;
        
        document.getElementById('langLabel').textContent = t.langLabel;
        document.getElementById('subtitleText').textContent = t.subtitle;
        document.getElementById('serversTitle').textContent = t.servers;
        document.getElementById('setupTitle').textContent = t.setup;
        document.getElementById('registrationLabel').textContent = t.registration;
        document.getElementById('nowBtn').textContent = t.now;
        document.getElementById('durationLabel').textContent = t.duration;
        document.getElementById('staffLabel').textContent = t.staff;
        document.getElementById('gamesLabel').textContent = t.games;
        document.getElementById('roleLabel').textContent = t.role;
        document.getElementById('sessionTypeLabel').textContent = t.sessionType;
        document.getElementById('lateNightLabel').textContent = t.lateNight;
        document.getElementById('firstSessionLabel').textContent = t.firstSession;
        document.getElementById('nzrNowBtn').textContent = t.now;
        document.getElementById('totalSessionsLabel').textContent = t.totalSessions;
        document.getElementById('gapLabel').textContent = t.gap;
        document.getElementById('nzrGameDurationLabel').textContent = t.nzrGameDuration;
        document.getElementById('sessionTypeLabelNZR').textContent = t.sessionType;
        document.getElementById('lateNightLabelNZR').textContent = t.lateNight;
        document.getElementById('generatedTitle').textContent = t.generated;
        document.getElementById('copyAnnouncementBtn').textContent = t.copyAnnouncement;
        document.getElementById('copyRegTimestampBtn').textContent = t.copyReg;
        document.getElementById('copyGameTimestampBtn').textContent = t.copyGame;
        document.getElementById('timestampTitle').textContent = t.timestampHelper;
        document.getElementById('datePickerLabel').textContent = t.datePicker;
        document.getElementById('shortDateLabel').textContent = t.shortDate;
        document.getElementById('longDateLabel').textContent = t.longDate;
        document.getElementById('shortTimeLabel').textContent = t.shortTime;
        document.getElementById('longTimeLabel').textContent = t.longTime;
        document.getElementById('shortDateTimeLabel').textContent = t.shortDateTime;
        document.getElementById('longDateTimeLabel').textContent = t.longDateTime;
        document.getElementById('relativeTimeLabel').textContent = t.relativeTime;
        
        generateAnnouncement();
        updateTimestampPreviews(currentUnixTimestamp);
    };

    // --- ALL'AVVIO: MOSTRA I CAMPI NZR, NASCONDI CHAMPION ---
    championFields.style.display = 'none';
    nzrFields.style.display = 'block';

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

    // LATE NIGHT TOGGLE (Champion)
    lateNightToggle.addEventListener('click', function() {
        isLateNight = !isLateNight;
        this.textContent = isLateNight ? 'ON' : 'OFF';
        this.classList.toggle('active');
        lateNightInput.value = isLateNight ? 'true' : 'false';
        generateAnnouncement();
    });

    // LATE NIGHT TOGGLE (NZR)
    lateNightToggleNZR.addEventListener('click', function() {
        isLateNightNZR = !isLateNightNZR;
        this.textContent = isLateNightNZR ? 'ON' : 'OFF';
        this.classList.toggle('active');
        lateNightNZR.value = isLateNightNZR ? 'true' : 'false';
        generateAnnouncement();
    });

    // SERVER SELECTION
    document.querySelectorAll('.server-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.server-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedServer = this.dataset.server;
            selectedDelay = parseInt(this.dataset.delay) || 15;
            serverNameInput.value = selectedServer;
            
            if (selectedServer === 'Nova No Zone Rules') {
                championFields.style.display = 'none';
                nzrFields.style.display = 'block';
                if (isLateNightNZR) {
                    lateNightToggleNZR.textContent = 'ON';
                    lateNightToggleNZR.classList.add('active');
                } else {
                    lateNightToggleNZR.textContent = 'OFF';
                    lateNightToggleNZR.classList.remove('active');
                }
            } else {
                championFields.style.display = 'block';
                nzrFields.style.display = 'none';
                if (isLateNight) {
                    lateNightToggle.textContent = 'ON';
                    lateNightToggle.classList.add('active');
                } else {
                    lateNightToggle.textContent = 'OFF';
                    lateNightToggle.classList.remove('active');
                }
            }
            generateAnnouncement();
        });
    });

    // SESSION TYPE
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

    // GAME COUNT
    document.querySelectorAll('.game-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.game-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            gameCountInput.value = this.dataset.games;
            generateAnnouncement();
        });
    });

    // GENERATE ANNOUNCEMENT
    function generateAnnouncement() {
        let announcement = [];

        let lateNightText = '';
        if (selectedServer === 'Nova No Zone Rules') {
            lateNightText = isLateNightNZR ? 'Late Night ' : '';
        } else {
            lateNightText = isLateNight ? 'Late Night ' : '';
        }

        if (selectedServer === 'Nova No Zone Rules') {
            // ===== NO ZONE RULES =====
            const startDate = new Date(nzrStartTime.value);
            if (isNaN(startDate.getTime()) || !nzrStartTime.value) {
                announcementPreview.textContent = currentLang === 'it' ? '⚠️ Inserisci una data e ora valida.' : '⚠️ Please enter a valid date and time.';
                return;
            }

            const sessions = parseInt(nzrSessionCount.value) || 7;
            const gap = parseInt(nzrGap.value) || 90;
            const gameDur = parseInt(nzrGameDuration.value) || 10;
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
                const gameTime = sessionTime + (gameDur * 60);
                announcement.push(`- **Session** <:${emojis[i]}>`);
                announcement.push(`  - **Registration:** ${formatDiscordTime(sessionTime, 't')}`);
                announcement.push(`  - **First Game:** ${formatDiscordTime(gameTime, 't')}`);
                announcement.push('');
            }

            announcement.push(`* **Information <:Info:1342824791039541328>**`);
            announcement.push(`  * Session lasts **__2 Games__**`);
            announcement.push(`  * Top 1 = <@&1443285911839178844>`);
            announcement.push(`  * Top 5 = [**Champion Division Access**](<https://discord.com/channels/1267285458962878464/1471321891850424361>) <:champion:1472618819502608404>`);
            announcement.push(`  * https://discord.com/channels/1267285458962878464/1492700150831911122 & https://discord.com/channels/1267285458962878464/1492703045879070871`);
            announcement.push(`_ _`);
            announcement.push('`React if playing!`');
            announcement.push('-# @everyone');

        } else {
            // ===== CHAMPION DIVISION =====
            const regDate = new Date(registrationTime.value);
            if (isNaN(regDate.getTime()) || !registrationTime.value) {
                announcementPreview.textContent = currentLang === 'it' ? '⚠️ Inserisci una data e ora valida.' : '⚠️ Please enter a valid date and time.';
                return;
            }

            const staff = staffId.value.trim() || 'ID_STAFF';
            const games = parseInt(gameCountInput.value) || 2;
            const dur = parseInt(gameDuration.value) || 15;
            const reacts = selectedReacts;
            const role = roleId.value.trim();
            const regUnix = toUnixTimestamp(regDate);
            const gameUnix = regUnix + (dur * 60);

            announcement.push(`### ${lateNightText}${selectedType} Practice Session <:champion:1472618819502608404>`);
            announcement.push('');
            announcement.push(`> * **Registration Opens:** ${formatDiscordTime(regUnix, 't')} `);
            announcement.push(`> * **Game 1/${games}:** ${formatDiscordTime(gameUnix, 't')} `);
            announcement.push('');
            announcement.push(`Staff in charge: <@${staff}> `);
            announcement.push('');
            announcement.push(`**-** Session lasts **${games} games**, **Miss a single game and you will be banned.**`);
            announcement.push(`**-** Make sure to read https://discord.com/channels/1471487091551633410/1471490037945204918 & https://discord.com/channels/1471487091551633410/1471489805979484333 **before** playing.`);
            if (role) {
                announcement.push(`**-** Playing this session will grant you the <@&${role}> role. https://discord.com/channels/1471487091551633410/1521106660368842772`);
            }
            announcement.push(`**-** Bottom 3 will lose access.`);
            announcement.push('');
            announcement.push(`**Need at least ${reacts}+ reacts to host ** (1 per duo)`);
            announcement.push('');
            announcement.push('@everyone');
        }

        announcementPreview.textContent = announcement.join('\n');
    }

    // QUICK BUTTONS (Champion)
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

    // QUICK BUTTONS (NZR)
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

    // QUICK HOURS
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

    // COPY FUNCTIONS
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
        copyToClipboard(`<t:${unix}:t>`, this);
    });

    copyGameTimestampBtn.addEventListener('click', function() {
        const regDate = new Date(registrationTime.value);
        if (isNaN(regDate.getTime())) {
            alert(currentLang === 'it' ? 'Inserisci una data valida!' : 'Please enter a valid date!');
            return;
        }
        const dur = parseInt(gameDuration.value) || 15;
        const gameDate = new Date(regDate.getTime() + (dur * 60000));
        const unix = toUnixTimestamp(gameDate);
        copyToClipboard(`<t:${unix}:t>`, this);
    });

    // --- TIMESTAMP HELPER ---
    function updateTimestampPreviews(unixTimestamp) {
        currentUnixTimestamp = unixTimestamp;
        
        if (!unixTimestamp || isNaN(unixTimestamp) || unixTimestamp <= 0) {
            formatPreviews.forEach(el => el.textContent = '-');
            formatCodes.forEach(el => {
                const format = el.dataset.format;
                el.textContent = `<t:TIMESTAMP:${format}>`;
            });
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
                case 'd': previewText = date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }); break;
                case 'D': previewText = date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); break;
                case 't': previewText = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }); break;
                case 'T': previewText = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }); break;
                case 'f': previewText = date.toLocaleString(locale, { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }); break;
                case 'F': previewText = date.toLocaleString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }); break;
                case 'R':
                    const now = Math.floor(Date.now() / 1000);
                    const diff = unixTimestamp - now;
                    const mins = Math.floor(Math.abs(diff) / 60);
                    if (currentLang === 'it') {
                        if (Math.abs(diff) < 60) previewText = 'ora';
                        else if (mins < 60) previewText = (diff > 0 ? 'tra ' : '') + mins + ' min' + (diff < 0 ? ' fa' : '');
                        else if (mins < 1440) previewText = (diff > 0 ? 'tra ' : '') + Math.floor(mins/60) + ' h' + (diff < 0 ? ' fa' : '');
                        else previewText = (diff > 0 ? 'tra ' : '') + Math.floor(mins/1440) + ' gg' + (diff < 0 ? ' fa' : '');
                    } else {
                        if (Math.abs(diff) < 60) previewText = 'now';
                        else if (mins < 60) previewText = (diff > 0 ? 'in ' : '') + mins + ' min' + (diff < 0 ? ' ago' : '');
                        else if (mins < 1440) previewText = (diff > 0 ? 'in ' : '') + Math.floor(mins/60) + ' h' + (diff < 0 ? ' ago' : '');
                        else previewText = (diff > 0 ? 'in ' : '') + Math.floor(mins/1440) + ' d' + (diff < 0 ? ' ago' : '');
                    }
                    break;
                default: previewText = date.toString();
            }
            previewEl.textContent = previewText;
        });
    }

    // --- COPY TIMESTAMP BUTTONS ---
    copyTimestampBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.dataset.format;
            if (!currentUnixTimestamp) {
                alert(currentLang === 'it' ? 'Seleziona una data/ora prima!' : 'Please select a date/time first!');
                return;
            }
            const text = `<t:${currentUnixTimestamp}:${format}>`;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                this.textContent = '✅';
                this.classList.add('copied');
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 1500);
            }).catch(err => {
                alert(currentLang === 'it' ? 'Errore nella copia: ' + err : 'Error copying: ' + err);
            });
        });
    });

    // --- TIMESTAMP INPUT ---
    function handleDateTimePicker() {
        const dateStr = dateTimePicker.value;
        if (!dateStr) {
            updateTimestampPreviews(null);
            return;
        }
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
            const unix = toUnixTimestamp(date);
            updateTimestampPreviews(unix);
        }
    }

    dateTimePicker.addEventListener('input', handleDateTimePicker);

    [registrationTime, gameDuration, staffId, roleId, nzrStartTime, nzrSessionCount, nzrGap, nzrGameDuration].forEach(el => {
        if (el) {
            el.addEventListener('change', generateAnnouncement);
            el.addEventListener('input', generateAnnouncement);
        }
    });

    // INIT - Imposta le date di default PRIMA di generateAnnouncement
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    now.setSeconds(0, 0);
    const dateStr = formatDateForInput(now);
    
    // Imposta entrambi i campi data
    registrationTime.value = dateStr;
    nzrStartTime.value = dateStr;

    const nowHelper = new Date();
    dateTimePicker.value = formatDateForInput(nowHelper);
    handleDateTimePicker();
    
    // ALL'AVVIO: NASCONDI CHAMPION, MOSTRA NZR
    championFields.style.display = 'none';
    nzrFields.style.display = 'block';
    
    // Applica lingua iniziale (Italiano)
    changeLanguage('it');
});
