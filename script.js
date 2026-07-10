document.addEventListener('DOMContentLoaded', function() {
    // --- ELEMENTI DOM ---
    const serverNameInput = document.getElementById('serverName');
    const sessionTypeInput = document.getElementById('sessionType');
    const requiredReactsInput = document.getElementById('requiredReacts');
    const lateNightInput = document.getElementById('lateNight');
    const lateNightToggle = document.getElementById('lateNightToggle');
    const languageSelect = document.getElementById('languageSelect');
    
    // Champion fields
    const championFields = document.getElementById('championFields');
    const registrationTime = document.getElementById('registrationTime');
    const gameDuration = document.getElementById('gameDuration');
    const staffId = document.getElementById('staffId');
    const gameCountInput = document.getElementById('gameCount');
    
    // NZR fields
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

    // Cards
    const setupCard = document.getElementById('setupCard');
    const timestampCard = document.getElementById('timestampCard');
    const generatedCard = document.getElementById('generatedCard');

    let selectedServer = 'Nova No Zone Rules';
    let selectedType = 'Duo';
    let selectedReacts = 55;
    let isLateNight = false;
    let currentLang = 'it';

    // --- FUNZIONE PER CAMBIARE COLORE DELLE CARD ---
    function updateCardColors(server) {
        // Rimuovi tutte le classi
        setupCard.classList.remove('nzr-mode', 'champ-mode');
        timestampCard.classList.remove('nzr-mode', 'champ-mode');
        generatedCard.classList.remove('nzr-mode', 'champ-mode');
        
        if (server === 'Nova No Zone Rules') {
            setupCard.classList.add('nzr-mode');
            timestampCard.classList.add('nzr-mode');
            generatedCard.classList.add('nzr-mode');
        } else if (server === 'Nova Champion Division') {
            setupCard.classList.add('champ-mode');
            timestampCard.classList.add('champ-mode');
            generatedCard.classList.add('champ-mode');
        }
    }

    // --- TRADUZIONI ---
    const translations = {
        en: {
            pageLanguage: '🌐 PAGE LANGUAGE',
            subtitle: 'Select a server, lobby and time — the announcement generates automatically. Then just copy it.',
            setup: '📋 SETUP',
            server: '🌐 SERVER',
            sessionType: '🏷️ SESSION TYPE',
            lateNight: '🌙 LATE NIGHT',
            registration: '📅 REGISTRATION OPENS',
            now: 'Now',
            duration: '⏱️ FIRST GAME DURATION (minutes)',
            staff: '👤 STAFF IN CHARGE (Discord ID)',
            games: '🎮 NUMBER OF GAMES',
            firstSession: '📅 FIRST SESSION DATE',
            totalSessions: '📊 TOTAL SESSIONS',
            gap: '⏱️ GAP BETWEEN SESSIONS (minutes)',
            quickHours: '⏰ QUICK HOURS',
            timestampHelper: '⏰ Discord Timestamp Helper',
            unix: 'Unix Timestamp',
            datePicker: '📅 Select Date/Time',
            shortDate: 'Short Date',
            longDate: 'Long Date',
            shortTime: 'Short Time',
            longTime: 'Long Time',
            shortDateTime: 'Short Date/Time',
            longDateTime: 'Long Date/Time',
            relativeTime: 'Relative Time',
            generated: '📋 GENERATED MESSAGE',
            copyAnnouncement: '📋 Copy Announcement',
            copyReg: '⏰ Copy Reg Timestamp',
            copyGame: '⏰ Copy Game Timestamp'
        },
        it: {
            pageLanguage: '🌐 PAGE LANGUAGE',
            subtitle: 'Seleziona un server, lobby e orario — l\'annuncio viene generato automaticamente. Poi copialo.',
            setup: '📋 SETUP',
            server: '🌐 SERVER',
            sessionType: '🏷️ TIPO SESSIONE',
            lateNight: '🌙 LATE NIGHT',
            registration: '📅 REGISTRATION OPENS',
            now: 'Ora',
            duration: '⏱️ DURATA PRIMA PARTITA (minuti)',
            staff: '👤 STAFF IN CHARGE (Discord ID)',
            games: '🎮 NUMERO DI PARTITE',
            firstSession: '📅 DATA PRIMA SESSIONE',
            totalSessions: '📊 NUMERO TOTALE SESSIONI',
            gap: '⏱️ GAP TRA SESSIONI (minuti)',
            quickHours: '⏰ QUICK HOURS',
            timestampHelper: '⏰ Discord Timestamp Helper',
            unix: 'Unix Timestamp',
            datePicker: '📅 Selezione Data/ora',
            shortDate: 'Data Corta',
            longDate: 'Data Lunga',
            shortTime: 'Ora Corta',
            longTime: 'Ora Lunga',
            shortDateTime: 'Data/Ora Corta',
            longDateTime: 'Data/Ora Lunga',
            relativeTime: 'Tempo Relativo',
            generated: '📋 GENERATED MESSAGE',
            copyAnnouncement: '📋 Copy Announcement',
            copyReg: '⏰ Copy Reg Timestamp',
            copyGame: '⏰ Copy Game Timestamp'
        },
        es: {
            pageLanguage: '🌐 IDIOMA DE LA PÁGINA',
            subtitle: 'Selecciona un servidor, sala y hora — el anuncio se genera automáticamente. Luego cópialo.',
            setup: '📋 CONFIGURACIÓN',
            server: '🌐 SERVIDOR',
            sessionType: '🏷️ TIPO DE SESIÓN',
            lateNight: '🌙 NOCHE',
            registration: '📅 APERTURA DE REGISTRO',
            now: 'Ahora',
            duration: '⏱️ DURACIÓN DEL PRIMER JUEGO (minutos)',
            staff: '👤 PERSONAL A CARGO (ID Discord)',
            games: '🎮 NÚMERO DE JUEGOS',
            firstSession: '📅 FECHA DE LA PRIMERA SESIÓN',
            totalSessions: '📊 TOTAL DE SESIONES',
            gap: '⏱️ ESPACIO ENTRE SESIONES (minutos)',
            quickHours: '⏰ HORAS RÁPIDAS',
            timestampHelper: '⏰ Ayudante de Timestamp Discord',
            unix: 'Timestamp Unix',
            datePicker: '📅 Seleccionar Fecha/Hora',
            shortDate: 'Fecha Corta',
            longDate: 'Fecha Larga',
            shortTime: 'Hora Corta',
            longTime: 'Hora Larga',
            shortDateTime: 'Fecha/Hora Corta',
            longDateTime: 'Fecha/Hora Larga',
            relativeTime: 'Tiempo Relativo',
            generated: '📋 MENSAJE GENERADO',
            copyAnnouncement: '📋 Copiar Anuncio',
            copyReg: '⏰ Copiar Reg Timestamp',
            copyGame: '⏰ Copiar Game Timestamp'
        },
        fr: {
            pageLanguage: '🌐 LANGUE DE LA PAGE',
            subtitle: 'Sélectionnez un serveur, un lobby et une heure — l\'annonce est générée automatiquement. Copiez-la ensuite.',
            setup: '📋 CONFIGURATION',
            server: '🌐 SERVEUR',
            sessionType: '🏷️ TYPE DE SESSION',
            lateNight: '🌙 NUIT',
            registration: '📅 OUVERTURE DES INSCRIPTIONS',
            now: 'Maintenant',
            duration: '⏱️ DURÉE DU PREMIER JEU (minutes)',
            staff: '👤 PERSONNEL RESPONSABLE (ID Discord)',
            games: '🎮 NOMBRE DE JEUX',
            firstSession: '📅 DATE DE LA PREMIÈRE SESSION',
            totalSessions: '📊 TOTAL DES SESSIONS',
            gap: '⏱️ ÉCART ENTRE LES SESSIONS (minutes)',
            quickHours: '⏰ HEURES RAPIDES',
            timestampHelper: '⏰ Aide Timestamp Discord',
            unix: 'Timestamp Unix',
            datePicker: '📅 Sélectionner Date/Heure',
            shortDate: 'Date Courte',
            longDate: 'Date Longue',
            shortTime: 'Heure Courte',
            longTime: 'Heure Longue',
            shortDateTime: 'Date/Heure Courte',
            longDateTime: 'Date/Heure Longue',
            relativeTime: 'Temps Relatif',
            generated: '📋 MESSAGE GÉNÉRÉ',
            copyAnnouncement: '📋 Copier Annonce',
            copyReg: '⏰ Copier Reg Timestamp',
            copyGame: '⏰ Copier Game Timestamp'
        },
        de: {
            pageLanguage: '🌐 SEITENSPRACHE',
            subtitle: 'Wählen Sie einen Server, eine Lobby und eine Uhrzeit — die Ankündigung wird automatisch generiert. Dann kopieren Sie sie einfach.',
            setup: '📋 EINRICHTUNG',
            server: '🌐 SERVER',
            sessionType: '🏷️ SITZUNGSTYP',
            lateNight: '🌙 SPÄTE NACHT',
            registration: '📅 REGISTRIERUNG ÖFFNET',
            now: 'Jetzt',
            duration: '⏱️ DAUER DES ERSTEN SPIELS (Minuten)',
            staff: '👤 VERANTWORTLICHER MITARBEITER (Discord ID)',
            games: '🎮 ANZAHL DER SPIELE',
            firstSession: '📅 DATUM DER ERSTEN SITZUNG',
            totalSessions: '📊 GESAMTZAHL DER SITZUNGEN',
            gap: '⏱️ ABSTAND ZWISCHEN SITZUNGEN (Minuten)',
            quickHours: '⏰ SCHNELLE STUNDEN',
            timestampHelper: '⏰ Discord Timestamp Helfer',
            unix: 'Unix Timestamp',
            datePicker: '📅 Datum/Uhrzeit auswählen',
            shortDate: 'Kurzes Datum',
            longDate: 'Langes Datum',
            shortTime: 'Kurze Zeit',
            longTime: 'Lange Zeit',
            shortDateTime: 'Kurzes Datum/Uhrzeit',
            longDateTime: 'Langes Datum/Uhrzeit',
            relativeTime: 'Relative Zeit',
            generated: '📋 GENERIERTE NACHRICHT',
            copyAnnouncement: '📋 Ankündigung kopieren',
            copyReg: '⏰ Reg Timestamp kopieren',
            copyGame: '⏰ Game Timestamp kopieren'
        }
    };

    // --- FUNZIONE PER APPLICARE TRADUZIONI ---
    function applyLanguage(lang) {
        const t = translations[lang] || translations.it;
        currentLang = lang;
        
        document.getElementById('langLabel').textContent = t.pageLanguage;
        document.getElementById('subtitleText').textContent = t.subtitle;
        document.getElementById('setupTitle').textContent = t.setup;
        document.getElementById('serverLabel').textContent = t.server;
        document.getElementById('sessionTypeLabel').textContent = t.sessionType;
        document.getElementById('lateNightLabel').textContent = t.lateNight;
        document.getElementById('registrationLabel').textContent = t.registration;
        document.getElementById('nowBtn').textContent = t.now;
        document.getElementById('durationLabel').textContent = t.duration;
        document.getElementById('staffLabel').textContent = t.staff;
        document.getElementById('gamesLabel').textContent = t.games;
        document.getElementById('firstSessionLabel').textContent = t.firstSession;
        document.getElementById('nzrNowBtn').textContent = t.now;
        document.getElementById('totalSessionsLabel').textContent = t.totalSessions;
        document.getElementById('gapLabel').textContent = t.gap;
        document.getElementById('quickHoursTitle').textContent = t.quickHours;
        document.getElementById('timestampTitle').textContent = t.timestampHelper;
        document.getElementById('unixLabel').textContent = t.unix;
        document.getElementById('datePickerLabel').textContent = t.datePicker;
        document.getElementById('shortDateLabel').textContent = t.shortDate;
        document.getElementById('longDateLabel').textContent = t.longDate;
        document.getElementById('shortTimeLabel').textContent = t.shortTime;
        document.getElementById('longTimeLabel').textContent = t.longTime;
        document.getElementById('shortDateTimeLabel').textContent = t.shortDateTime;
        document.getElementById('longDateTimeLabel').textContent = t.longDateTime;
        document.getElementById('relativeTimeLabel').textContent = t.relativeTime;
        document.getElementById('generatedTitle').textContent = t.generated;
        document.getElementById('copyAnnouncementBtn').textContent = t.copyAnnouncement;
        document.getElementById('copyRegTimestampBtn').textContent = t.copyReg;
        document.getElementById('copyGameTimestampBtn').textContent = t.copyGame;
    }

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
            serverNameInput.value = selectedServer;
            
            // Aggiorna i colori delle card
            updateCardColors(selectedServer);
            
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

    // --- GENERA ANNUNCIO ---
    function generateAnnouncement() {
        let announcement = [];
        const lateNightText = isLateNight ? 'Late Night ' : '';

        if (selectedServer === 'Nova No Zone Rules') {
            // ===== NO ZONE RULES =====
            const startDate = new Date(nzrStartTime.value);
            if (isNaN(startDate.getTime())) {
                announcementPreview.textContent = currentLang === 'it' ? '⚠️ Inserisci una data e ora valida.' : '⚠️ Please enter a valid date and time.';
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
                const emoji = emojis[i];
                
                announcement.push(`- **Session** <:${emoji}>`);
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
            // ===== CHAMPION DIVISION =====
            const regDate = new Date(registrationTime.value);
            if (isNaN(regDate.getTime())) {
                announcementPreview.textContent = currentLang === 'it' ? '⚠️ Inserisci una data e ora valida.' : '⚠️ Please enter a valid date and time.';
                return;
            }

            const staff = staffId.value.trim() || 'ID_STAFF';
            const games = parseInt(gameCountInput.value) || 2;
            const dur = parseInt(gameDuration.value) || 15;
            const reacts = selectedReacts;

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
            announcement.push(`**-** Bottom 3 will lose access.`);
            announcement.push('');
            
            announcement.push(`**Need at least ${reacts}+ reacts to host ** (1 per duo)`);
            announcement.push('');
            announcement.push('@everyone');
        }

        announcementPreview.textContent = announcement.join('\n');
    }

    // --- GESTIONE PULSANTI RAPIDI MINUTI (Champion) ---
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

    // --- GESTIONE PULSANTI RAPIDI MINUTI (NZR) ---
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
            nzrStartTime.value = dateStr;
            
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
        const dur = parseInt(gameDuration.value) || 15;
        const gameDate = new Date(regDate.getTime() + (dur * 60000));
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
    [registrationTime, gameDuration, staffId,
     nzrStartTime, nzrSessionCount, nzrGap].forEach(el => {
        if (el) {
            el.addEventListener('change', generateAnnouncement);
            el.addEventListener('input', generateAnnouncement);
        }
    });

    // --- LANGUAGE SELECTOR ---
    languageSelect.addEventListener('change', function() {
        applyLanguage(this.value);
        generateAnnouncement();
        updateTimestampPreviews(parseInt(timestampInput.value) || null);
    });

    // --- INIZIALIZZAZIONE ---
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    now.setSeconds(0, 0);
    const dateStr = formatDateForInput(now);
    registrationTime.value = dateStr;
    nzrStartTime.value = dateStr;

    const nowHelper = new Date();
    dateTimePicker.value = formatDateForInput(nowHelper);
    handleDateTimePicker();
    
    // Nasconde NZR fields all'avvio
    nzrFields.style.display = 'none';
    
    // Applica lingua iniziale
    applyLanguage('it');
    
    // Imposta colore iniziale (No Zone Rules = #00C5FF)
    updateCardColors('Nova No Zone Rules');
    
    generateAnnouncement();
});
