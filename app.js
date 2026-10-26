/* ==================== STATE MANAGEMENT ==================== */
let state = {
    hasCompletedOnboarding: false,
    userProfile: {
        gender: 'male',
        age: 25,
        weight: 70,
        height: 175,
        activity: 1.55,
        goal: 'maintain',
        planDays: 4
    },
    userMacros: { calories: 2200, protein: 165, carbs: 247, fats: 61, tdee: 2200 },
    waterInLiters: 1.5,
    weightLogs: [
        { date: '2026-10-12', weight: 72.0 },
        { date: '2026-10-19', weight: 71.2 },
        { date: '2026-10-26', weight: 70.5 }
    ],
    meals: {
        desayuno: [{ name: 'Huevos revueltos (2) con tostada', cal: 320, prot: 18 }],
        almuerzo: [{ name: 'Pechuga de pollo a la plancha con arroz', cal: 550, prot: 45 }],
        merienda: [{ name: 'Yogur griego con almendras', cal: 200, prot: 15 }],
        cena: [{ name: 'Ensalada de atún con palta/aguacate', cal: 380, prot: 30 }]
    }
};

function loadState() {
    const saved = localStorage.getItem('fithome_state_v3');
    if (saved) {
        try {
            state = { ...state, ...JSON.parse(saved) };
        } catch(e) { console.error("Error loading local state", e); }
    }
}

function saveState() {
    localStorage.setItem('fithome_state_v3', JSON.stringify(state));
}

/* ==================== WORKOUTS DATA ==================== */
const workoutsData = [
    {
        id: 1,
        title: "Flexiones de Pecho (Push-Ups)",
        level: "Principiante",
        zone: "upper",
        type: "reps",
        targetReps: 12,
        totalSets: 3,
        restSeconds: 45,
        desc: "Excelente para trabajar pecho, tríceps y hombros sin equipo.",
        badge: "Tren Superior",
        primaryMuscles: ["Pectoral Mayor", "Tríceps"],
        secondaryMuscles: ["Deltoides Anterior", "Core"],
        imagePlaceholder: "https://placehold.co/400x220/1e293b/34d399?text=Dibujo+Flexiones+Pecho"
    },
    {
        id: 2,
        title: "Sentadillas Profundas (Squats)",
        level: "Principiante",
        zone: "lower",
        type: "reps",
        targetReps: 15,
        totalSets: 4,
        restSeconds: 45,
        desc: "Fortalece cuádriceps, glúteos y estabilidad de rodillas.",
        badge: "Tren Inferior",
        primaryMuscles: ["Cuádriceps", "Glúteo Mayor"],
        secondaryMuscles: ["Isquiotibiales", "Pantorrillas"],
        imagePlaceholder: "https://placehold.co/400x220/1e293b/34d399?text=Dibujo+Sentadilla"
    },
    {
        id: 3,
        title: "Jumping Jacks (Salto de Tijera)",
        level: "Principiante",
        zone: "hiit",
        type: "time",
        workSeconds: 40,
        totalSets: 3,
        restSeconds: 30,
        desc: "Ejercicio cardiovascular de alta intensidad para quemar grasa.",
        badge: "Cardio",
        primaryMuscles: ["Gemelos", "Aductores"],
        secondaryMuscles: ["Hombros", "Core"],
        imagePlaceholder: "https://placehold.co/400x220/1e293b/34d399?text=Dibujo+Jumping+Jacks"
    },
    {
        id: 4,
        title: "Zancadas / Lunges Alternadas",
        level: "Intermedio",
        zone: "lower",
        type: "reps",
        targetReps: 12,
        totalSets: 3,
        restSeconds: 45,
        desc: "Desarrolla fuerza unilateral y estabilidad en piernas.",
        badge: "Tren Inferior",
        primaryMuscles: ["Cuádriceps", "Glúteos"],
        secondaryMuscles: ["Isquiotibiales", "Core"],
        imagePlaceholder: "https://placehold.co/400x220/1e293b/34d399?text=Dibujo+Zancadas"
    },
    {
        id: 5,
        title: "Fondos en Silla (Triceps Dips)",
        level: "Intermedio",
        zone: "upper",
        type: "reps",
        targetReps: 12,
        totalSets: 3,
        restSeconds: 45,
        desc: "Utiliza una silla firme de casa para aislar los tríceps.",
        badge: "Tren Superior",
        primaryMuscles: ["Tríceps Braquial"],
        secondaryMuscles: ["Pectoral Menor", "Hombro Anterior"],
        imagePlaceholder: "https://placehold.co/400x220/1e293b/34d399?text=Dibujo+Fondos+Tricep"
    },
    {
        id: 6,
        title: "Mountain Climbers (Escaladores)",
        level: "Avanzado",
        zone: "hiit",
        type: "time",
        workSeconds: 35,
        totalSets: 4,
        restSeconds: 30,
        desc: "Combina trabajo de core intenso con resistencia aeróbica.",
        badge: "HIIT / Core",
        primaryMuscles: ["Abdomen (Recto)", "Flexores de Cadera"],
        secondaryMuscles: ["Hombros", "Cuádriceps"],
        imagePlaceholder: "https://placehold.co/400x220/1e293b/34d399?text=Dibujo+Escaladores"
    },
    {
        id: 7,
        title: "Plancha Abdominal Estática",
        level: "Principiante",
        zone: "fullbody",
        type: "time",
        workSeconds: 45,
        totalSets: 3,
        restSeconds: 45,
        desc: "Fortalecimiento de toda la zona media (Core) y estabilidad postural.",
        badge: "Full Body",
        primaryMuscles: ["Transverso Abdominal", "Recto Abdominal"],
        secondaryMuscles: ["Hombros", "Lumbares"],
        imagePlaceholder: "https://placehold.co/400x220/1e293b/34d399?text=Dibujo+Plancha"
    },
    {
        id: 8,
        title: "Burpees Completos",
        level: "Avanzado",
        zone: "hiit",
        type: "reps",
        targetReps: 10,
        totalSets: 3,
        restSeconds: 60,
        desc: "El ejercicio definitivo de cuerpo completo para resistencia máxima.",
        badge: "Full Body / HIIT",
        primaryMuscles: ["Pecho", "Cuádriceps", "Core"],
        secondaryMuscles: ["Hombros", "Tríceps", "Gemelos"],
        imagePlaceholder: "https://placehold.co/400x220/1e293b/34d399?text=Dibujo+Burpees"
    }
];

/* ==================== RECIPES DATA ==================== */
const recipesData = [
    {
        name: "Avena Nocturna con Proteína & Frutos Rojos",
        cal: 380,
        prot: "25g",
        desc: "Mezcla avena, leche o bebida vegetal, yogur y déjalo reposar toda la noche.",
        tag: "Desayuno Rápido"
    },
    {
        name: "Bowl de Pollo, Palta y Quinoa",
        cal: 520,
        prot: "42g",
        desc: "Pechuga a la plancha sobre base de quinoa cocida, verduras frescas y vinagreta.",
        tag: "Almuerzo Proteico"
    },
    {
        name: "Tortilla de Claras y Espinacas",
        cal: 290,
        prot: "28g",
        desc: "Cena ligera rica en proteínas y baja en carbohidratos, lista en 5 minutos.",
        tag: "Cena Fit"
    }
];

/* ==================== INITIALIZATION & VARIABLES ==================== */
let chartInstance = null;
let timerInterval = null;
let timerSecondsLeft = 45;
let timerTotalSeconds = 45;
let isRestPhase = false;

let activeRoutineQueue = [];
let activeQueueIndex = 0;
let currentSetIndex = 1;

window.onload = function() {
    loadState();

    // Populate profile form inputs
    if (state.userProfile) {
        document.getElementById('gender').value = state.userProfile.gender;
        document.getElementById('age').value = state.userProfile.age;
        document.getElementById('weight').value = state.userProfile.weight;
        document.getElementById('height').value = state.userProfile.height;
        document.getElementById('activity').value = state.userProfile.activity;
        document.getElementById('goal').value = state.userProfile.goal;
        if (state.userProfile.planDays) {
            document.getElementById('user-plan-days').value = state.userProfile.planDays;
        }
    }

    renderWorkouts(workoutsData);
    renderRecipes();
    renderDietPlan();
    updateWaterUI();
    initChart();
    renderWeightHistory();
    generateWeeklyPlanDefault();

    // ONBOARDING FIRST TIME CHECK
    if (!state.hasCompletedOnboarding) {
        document.getElementById('onboarding-banner').classList.remove('hidden');
        switchTab('calculator');
    } else {
        switchTab('workouts');
    }
};

/* ==================== THEME TOGGLE ==================== */
function toggleDarkMode() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        icon.className = 'fa-solid fa-sun';
    } else {
        html.classList.add('dark');
        icon.className = 'fa-solid fa-moon';
    }
}

/* ==================== NAVIGATION ==================== */
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');

    const tabs = ['calculator', 'workouts', 'diet', 'progress'];
    tabs.forEach(t => {
        const btnDesk = document.getElementById('nav-btn-' + t);
        const btnMob = document.getElementById('mobile-nav-' + t);

        if (t === tabId) {
            if (btnDesk) btnDesk.className = 'nav-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 bg-brand-500 text-white shadow-md shadow-brand-500/20';
            if (btnMob) btnMob.className = 'mobile-nav-btn text-brand-500 flex flex-col items-center gap-1 text-[10px] font-bold';
        } else {
            if (btnDesk) btnDesk.className = 'nav-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800';
            if (btnMob) btnMob.className = 'mobile-nav-btn text-slate-400 flex flex-col items-center gap-1 text-[10px] font-medium';
        }
    });
}

function switchWorkoutSubtab(sub) {
    const btnGen = document.getElementById('subtab-btn-generator');
    const btnBank = document.getElementById('subtab-btn-bank');
    const viewGen = document.getElementById('subtab-generator');
    const viewBank = document.getElementById('subtab-bank');

    if (sub === 'generator') {
        viewGen.classList.remove('hidden');
        viewBank.classList.add('hidden');
        btnGen.className = "pb-3 border-b-2 border-brand-500 text-brand-500 flex items-center gap-2 font-bold";
        btnBank.className = "pb-3 border-b-2 border-transparent text-slate-400 hover:text-slate-200 flex items-center gap-2 font-bold";
    } else {
        viewGen.classList.add('hidden');
        viewBank.classList.remove('hidden');
        btnBank.className = "pb-3 border-b-2 border-brand-500 text-brand-500 flex items-center gap-2 font-bold";
        btnGen.className = "pb-3 border-b-2 border-transparent text-slate-400 hover:text-slate-200 flex items-center gap-2 font-bold";
    }
}

/* ==================== PLAN GENERATOR LOGIC ==================== */
function generateWeeklyPlan(daysCount) {
    daysCount = parseInt(daysCount || state.userProfile.planDays || 4);

    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const container = document.getElementById('weekly-plan-container');
    if (!container) return;
    container.innerHTML = '';

    let activeDaysIndices = [];
    if (daysCount === 3) activeDaysIndices = [0, 2, 4];
    else if (daysCount === 4) activeDaysIndices = [0, 1, 3, 4];
    else activeDaysIndices = [0, 1, 2, 4, 5];

    daysOfWeek.forEach((dayName, idx) => {
        const isTrainingDay = activeDaysIndices.includes(idx);
        const card = document.createElement('div');
        
        if (isTrainingDay) {
            let title = "Full Body Intensivo";
            let items = [workoutsData[0], workoutsData[1], workoutsData[6]]; 
            
            if (idx === 0) {
                title = "Tren Superior & Pecho/Brazos";
                items = [workoutsData[0], workoutsData[4], workoutsData[6]];
            } else if (idx === 1) {
                title = "Tren Inferior & Glúteos";
                items = [workoutsData[1], workoutsData[3], workoutsData[2]];
            } else if (idx === 2 || idx === 3) {
                title = "Cardio HIIT & Abdomen";
                items = [workoutsData[2], workoutsData[5], workoutsData[7]];
            } else {
                title = "Full Body & Fuerza";
                items = [workoutsData[0], workoutsData[1], workoutsData[7]];
            }

            const exerciseIds = items.map(ex => ex.id).join(',');

            card.className = "bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-brand-500/30 shadow-md space-y-4 flex flex-col justify-between";
            card.innerHTML = `
                <div>
                    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                        <span class="font-extrabold text-brand-500 text-sm uppercase tracking-wider">${dayName}</span>
                        <span class="text-[10px] bg-brand-500/10 text-brand-500 font-bold px-2 py-0.5 rounded-md">Entrenamiento</span>
                    </div>
                    <h4 class="font-bold text-slate-900 dark:text-white text-base mb-3">${title}</h4>
                    <div class="space-y-2">
                        ${items.map(ex => `
                            <div class="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl flex items-center justify-between text-xs">
                                <div>
                                    <span class="font-bold block text-slate-800 dark:text-slate-200">${ex.title}</span>
                                    <span class="text-[10px] text-slate-400 font-medium">
                                        ${ex.type === 'reps' ? ex.totalSets + ' series x ' + ex.targetReps + ' reps' : ex.totalSets + ' series x ' + ex.workSeconds + ' seg'}
                                    </span>
                                </div>
                                <button onclick="playSingleExerciseFromPlan(${ex.id})" class="p-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-brand-500 hover:text-white rounded-lg text-xs transition" title="Probar solo este ejercicio">
                                    <i class="fa-solid fa-play"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <button onclick="startDailyRoutineSession('${dayName} - ${title}', [${exerciseIds}])" class="w-full py-2.5 bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 text-white font-bold rounded-xl text-xs transition shadow-md shadow-brand-500/20 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-play-circle text-base"></i> Iniciar Rutina del ${dayName}
                    </button>
                    <div class="text-[11px] text-slate-400 flex items-center justify-between">
                        <span><i class="fa-regular fa-clock mr-1"></i> ~25 min</span>
                        <span>${items.length} Ejercicios guiados</span>
                    </div>
                </div>
            `;
        } else {
            card.className = "bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl p-5 border border-dashed border-slate-300 dark:border-slate-800 space-y-2 flex flex-col justify-center items-center text-center";
            card.innerHTML = `
                <span class="font-bold text-slate-400 text-sm uppercase">${dayName}</span>
                <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 my-1">
                    <i class="fa-solid fa-bed"></i>
                </div>
                <h4 class="font-semibold text-slate-600 dark:text-slate-400 text-xs">Descanso Activo</h4>
                <p class="text-[10px] text-slate-400 max-w-[180px]">Caminata ligera, estiramientos y regeneración muscular.</p>
            `;
        }
        container.appendChild(card);
    });
}

function generateWeeklyPlanDefault() {
    generateWeeklyPlan(state.userProfile.planDays);
}

/* ==================== INTERACTIVE WORKOUT PLAYER LOGIC ==================== */
function startDailyRoutineSession(sessionTitle, exerciseIdsArray) {
    activeRoutineQueue = workoutsData.filter(ex => exerciseIdsArray.includes(ex.id));
    activeQueueIndex = 0;
    currentSetIndex = 1;

    if (activeRoutineQueue.length === 0) return;

    switchWorkoutSubtab('bank');
    document.getElementById('player-session-title').innerText = sessionTitle;
    document.getElementById('routine-queue-container').classList.remove('hidden');

    renderQueueItems();
    loadCurrentQueueExercise();
}

function playSingleExerciseFromPlan(exerciseId) {
    const exercise = workoutsData.find(e => e.id === exerciseId);
    if (!exercise) return;

    activeRoutineQueue = [exercise];
    activeQueueIndex = 0;
    currentSetIndex = 1;

    switchWorkoutSubtab('bank');
    document.getElementById('player-session-title').innerText = "Ejercicio Individual";
    document.getElementById('routine-queue-container').classList.add('hidden');

    loadCurrentQueueExercise();
}

function loadCurrentQueueExercise() {
    if (activeRoutineQueue.length === 0) return;
    const ex = activeRoutineQueue[activeQueueIndex];

    // Reset timers
    clearInterval(timerInterval);
    isRestPhase = false;

    // UI Info Updates
    document.getElementById('player-exercise-title').innerText = ex.title;
    document.getElementById('player-info-level').innerText = ex.level;
    document.getElementById('player-info-img').src = ex.imagePlaceholder;

    // Render muscle badges
    const musclesBox = document.getElementById('player-info-muscles');
    musclesBox.innerHTML = `
        ${ex.primaryMuscles.map(m => `<span class="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 font-bold">${m}</span>`).join('')}
        ${ex.secondaryMuscles.map(m => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-medium">${m}</span>`).join('')}
    `;

    // Display Mode Switch
    if (ex.type === 'reps') {
        document.getElementById('display-mode-reps').classList.remove('hidden');
        document.getElementById('display-mode-time').classList.add('hidden');

        document.getElementById('rep-set-indicator').innerText = `Serie ${currentSetIndex} de ${ex.totalSets}`;
        document.getElementById('rep-count-target').innerText = `${ex.targetReps} REPETICIONES`;
        document.getElementById('player-info-reps').innerText = `${ex.totalSets} series x ${ex.targetReps} reps (${ex.restSeconds}s descanso)`;

        document.getElementById('player-status-badge').innerText = "En Serie";
        document.getElementById('player-status-badge').className = "text-xs px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 font-bold";
    } else {
        document.getElementById('player-info-reps').innerText = `${ex.totalSets} series x ${ex.workSeconds} seg`;
        startRestOrWorkTimer(ex.workSeconds, "TIEMPO DE TRABAJO - " + ex.title, false);
    }
}

function completeCurrentSet() {
    if (activeRoutineQueue.length === 0) return;
    const ex = activeRoutineQueue[activeQueueIndex];

    // Iniciar descanso automático
    startRestOrWorkTimer(ex.restSeconds, "DESCANSO ENTRE SERIES", true);
}

function startRestOrWorkTimer(seconds, phaseTitle, isRest) {
    clearInterval(timerInterval);
    isRestPhase = isRest;
    timerTotalSeconds = seconds;
    timerSecondsLeft = seconds;

    document.getElementById('display-mode-reps').classList.add('hidden');
    document.getElementById('display-mode-time').classList.remove('hidden');

    document.getElementById('timer-phase-title').innerText = phaseTitle;
    document.getElementById('player-status-badge').innerText = isRest ? "Descansando" : "En Marcha";
    document.getElementById('player-status-badge').className = isRest 
        ? "text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold"
        : "text-xs px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 font-bold";

    updateTimerDisplayDigits();

    timerInterval = setInterval(() => {
        if (timerSecondsLeft > 0) {
            timerSecondsLeft--;
            updateTimerDisplayDigits();
        } else {
            clearInterval(timerInterval);
            finishTimerPhase();
        }
    }, 1000);
}

function updateTimerDisplayDigits() {
    const mins = Math.floor(timerSecondsLeft / 60);
    const secs = timerSecondsLeft % 60;
    document.getElementById('timer-display-digits').innerText = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const percent = (timerSecondsLeft / timerTotalSeconds) * 100;
    document.getElementById('timer-progress-bar').style.width = percent + '%';
}

function pauseTimer() {
    clearInterval(timerInterval);
    document.getElementById('player-status-badge').innerText = "Pausado";
}

function skipRestOrTime() {
    clearInterval(timerInterval);
    finishTimerPhase();
}

function finishTimerPhase() {
    const ex = activeRoutineQueue[activeQueueIndex];

    if (isRestPhase) {
        if (currentSetIndex < ex.totalSets) {
            currentSetIndex++;
            loadCurrentQueueExercise();
        } else {
            currentSetIndex = 1;
            if (activeQueueIndex < activeRoutineQueue.length - 1) {
                activeQueueIndex++;
                renderQueueItems();
                loadCurrentQueueExercise();
            } else {
                // ¡RUTINA DÍA COMPLETADA! -> Desplegar Modal de Felicitaciones
                triggerCongratsModal();
            }
        }
    } else {
        startRestOrWorkTimer(ex.restSeconds, "DESCANSO ENTRE SERIES", true);
    }
}

function triggerCongratsModal() {
    document.getElementById('player-status-badge').innerText = "¡Completado!";
    document.getElementById('summary-ex-count').innerText = activeRoutineQueue.length;

    // Disparar animación de confeti si la librería está cargada
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    document.getElementById('congrats-modal').classList.remove('hidden');
}

function logWaterFromCongrats(amount) {
    changeWater(amount);
    alert(`¡Genial! Se han añadido +${amount * 1000} ml a tu contador de agua.`);
}

function saveWeightFromCongrats() {
    const input = document.getElementById('congrats-weight-input');
    const val = parseFloat(input.value);
    if (!val) {
        alert("Por favor ingresa un número válido de peso.");
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    state.weightLogs.push({ date: today, weight: val });
    saveState();

    chartInstance.data.labels.push(today);
    chartInstance.data.datasets[0].data.push(val);
    chartInstance.update();

    renderWeightHistory();
    alert("¡Peso guardado correctamente en tu historial!");
    input.value = '';
}

function finishCongratsAndGoToProgress() {
    document.getElementById('congrats-modal').classList.add('hidden');
    switchTab('progress');
}

function renderQueueItems() {
    const listContainer = document.getElementById('queue-items-list');
    listContainer.innerHTML = '';
    document.getElementById('queue-count').innerText = `${activeQueueIndex + 1}/${activeRoutineQueue.length}`;

    activeRoutineQueue.forEach((ex, idx) => {
        const isCurrent = idx === activeQueueIndex;
        const item = document.createElement('div');
        item.className = `p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition ${
            isCurrent 
                ? 'bg-brand-500/20 text-brand-400 font-bold border border-brand-500/30' 
                : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
        }`;
        item.onclick = () => {
            activeQueueIndex = idx;
            currentSetIndex = 1;
            renderQueueItems();
            loadCurrentQueueExercise();
        };
        item.innerHTML = `
            <span class="flex items-center gap-2">
                <span class="w-4 h-4 rounded-full ${isCurrent ? 'bg-brand-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'} flex items-center justify-center text-[9px] font-mono">${idx + 1}</span>
                ${ex.title}
            </span>
            <span class="text-[10px] opacity-75">${ex.type === 'reps' ? ex.targetReps + ' reps' : ex.workSeconds + 's'}</span>
        `;
        listContainer.appendChild(item);
    });
}

function nextQueueExercise() {
    if (activeRoutineQueue.length === 0) return;
    if (activeQueueIndex < activeRoutineQueue.length - 1) {
        activeQueueIndex++;
        currentSetIndex = 1;
        renderQueueItems();
        loadCurrentQueueExercise();
    }
}

function prevQueueExercise() {
    if (activeRoutineQueue.length === 0) return;
    if (activeQueueIndex > 0) {
        activeQueueIndex--;
        currentSetIndex = 1;
        renderQueueItems();
        loadCurrentQueueExercise();
    }
}

/* ==================== WORKOUTS BANCO RENDERER ==================== */
function renderWorkouts(list) {
    const container = document.getElementById('workout-list');
    container.innerHTML = '';

    list.forEach(w => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4";
        
        card.innerHTML = `
            <div class="flex items-start justify-between gap-2">
                <div>
                    <span class="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md bg-brand-500/10 text-brand-500 mb-1 inline-block">${w.badge}</span>
                    <h4 class="font-bold text-slate-900 dark:text-white text-base">${w.title}</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${w.desc}</p>
                </div>
                <span class="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg shrink-0">
                    ${w.type === 'reps' ? w.targetReps + ' reps' : w.workSeconds + 's'}
                </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 h-32 flex items-center justify-center">
                    <img src="${w.imagePlaceholder}" alt="Guía postura" class="w-full h-full object-cover">
                </div>

                <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex flex-col justify-between text-xs">
                    <div>
                        <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Músculos Objetivos</span>
                        <div class="flex flex-wrap gap-1 mt-1">
                            ${w.primaryMuscles.map(m => `<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-400">${m}</span>`).join('')}
                        </div>
                    </div>
                    <span class="text-[10px] text-slate-400 block mt-2">Nivel: ${w.level}</span>
                </div>
            </div>

            <div class="flex items-center justify-end border-t border-slate-100 dark:border-slate-800 pt-3">
                <button onclick="playSingleExerciseFromPlan(${w.id})" class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5">
                    <i class="fa-solid fa-play"></i> Probar en Modo Interactivo
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterWorkouts() {
    const zone = document.getElementById('workout-zone').value;
    const filtered = workoutsData.filter(w => zone === 'all' || w.zone === zone);
    renderWorkouts(filtered);
}

/* ==================== CALCULATOR & ONBOARDING LOGIC ==================== */
function calculateMacros(e) {
    e.preventDefault();
    const gender = document.getElementById('gender').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;
    const planDays = parseInt(document.getElementById('user-plan-days').value) || 4;

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    let tdee = bmr * activity;
    let targetCalories = tdee;

    let desc = "Calorías para mantener tu peso corporal.";
    if (goal === 'lose') {
        targetCalories = tdee * 0.8;
        desc = "Déficit calórico para perder grasa paulatinamente.";
    } else if (goal === 'gain') {
        targetCalories = tdee * 1.15;
        desc = "Superávit calórico para desarrollo de masa muscular.";
    }

    let proteinGrams = Math.round(weight * 2.0);
    let proteinCal = proteinGrams * 4;

    let fatCal = targetCalories * 0.25;
    let fatGrams = Math.round(fatCal / 9);

    let carbCal = targetCalories - proteinCal - fatCal;
    let carbGrams = Math.round(carbCal / 4);

    targetCalories = Math.round(targetCalories);
    tdee = Math.round(tdee);

    // Update State
    state.hasCompletedOnboarding = true;
    state.userProfile = { gender, age, weight, height, activity, goal, planDays };
    state.userMacros = { calories: targetCalories, protein: proteinGrams, carbs: carbGrams, fats: fatGrams, tdee };
    saveState();

    // Update UI
    document.getElementById('res-calories').innerText = targetCalories.toLocaleString();
    document.getElementById('res-tdee').innerText = tdee.toLocaleString() + ' kcal';
    document.getElementById('res-desc').innerText = desc;

    document.getElementById('res-protein').innerText = proteinGrams + 'g';
    document.getElementById('res-protein-cal').innerText = proteinCal + ' kcal';

    document.getElementById('res-carbs').innerText = carbGrams + 'g';
    document.getElementById('res-carbs-cal').innerText = carbCal + ' kcal';

    document.getElementById('res-fats').innerText = fatGrams + 'g';
    document.getElementById('res-fats-cal').innerText = fatCal + ' kcal';

    generateWeeklyPlan(planDays);
    document.getElementById('onboarding-banner').classList.add('hidden');
}

function applyCalculatedGoalsAndGoToWorkouts() {
    renderDietPlan();
    switchTab('workouts');
}

/* ==================== DIET LOGIC ==================== */
function renderRecipes() {
    const grid = document.getElementById('recipes-grid');
    grid.innerHTML = '';

    recipesData.forEach(r => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between";
        card.innerHTML = `
            <div class="space-y-2">
                <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-accent-500/10 text-accent-500">${r.tag}</span>
                <h4 class="font-bold text-slate-900 dark:text-white text-sm">${r.name}</h4>
                <p class="text-xs text-slate-500 leading-relaxed">${r.desc}</p>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span class="font-bold text-slate-700 dark:text-slate-300">${r.cal} kcal</span>
                <span class="text-brand-500 font-semibold">${r.prot} Proteína</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderDietPlan() {
    let totalCal = 0;
    const categories = ['desayuno', 'almuerzo', 'merienda', 'cena'];

    categories.forEach(cat => {
        const listEl = document.getElementById('list-' + cat);
        listEl.innerHTML = '';
        let catCal = 0;

        state.meals[cat].forEach((item, idx) => {
            catCal += item.cal;
            const li = document.createElement('li');
            li.className = "flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800";
            li.innerHTML = `
                <div>
                    <span class="font-medium block">${item.name}</span>
                    <span class="text-[10px] text-slate-400">${item.cal} kcal ${item.prot ? '| ' + item.prot + 'g prot' : ''}</span>
                </div>
                <button onclick="removeMealItem('${cat}', ${idx})" class="text-slate-400 hover:text-red-500 text-xs px-1"><i class="fa-solid fa-trash"></i></button>
            `;
            listEl.appendChild(li);
        });

        document.getElementById('cal-' + cat).innerText = catCal + ' kcal';
        totalCal += catCal;
    });

    document.getElementById('diet-logged-cal').innerText = `${totalCal} / ${state.userMacros.calories} kcal`;
}

function openAddMealModal(type) {
    document.getElementById('modal-meal-type').value = type;
    document.getElementById('modal-meal-name').value = '';
    document.getElementById('modal-meal-cal').value = '';
    document.getElementById('modal-meal-prot').value = '';
    document.getElementById('meal-modal').classList.remove('hidden');
}

function closeMealModal() {
    document.getElementById('meal-modal').classList.add('hidden');
}

function saveCustomMeal(e) {
    e.preventDefault();
    const type = document.getElementById('modal-meal-type').value;
    const name = document.getElementById('modal-meal-name').value;
    const cal = parseInt(document.getElementById('modal-meal-cal').value) || 0;
    const prot = parseInt(document.getElementById('modal-meal-prot').value) || 0;

    state.meals[type].push({ name, cal, prot });
    saveState();
    renderDietPlan();
    closeMealModal();
}

function removeMealItem(type, index) {
    state.meals[type].splice(index, 1);
    saveState();
    renderDietPlan();
}

/* ==================== PROGRESS LOGIC ==================== */
function changeWater(delta) {
    state.waterInLiters = Math.max(0, parseFloat((state.waterInLiters + delta).toFixed(2)));
    saveState();
    updateWaterUI();
}

function updateWaterUI() {
    document.getElementById('water-count').innerText = state.waterInLiters;
}

function initChart() {
    const ctx = document.getElementById('weightChart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: state.weightLogs.map(l => l.date),
            datasets: [{
                label: 'Peso (kg)',
                data: state.weightLogs.map(l => l.weight),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#6366f1',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(156, 163, 175, 0.1)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function addWeightRecord(e) {
    e.preventDefault();
    const val = parseFloat(document.getElementById('new-weight-val').value);
    if (!val) return;

    const today = new Date().toISOString().split('T')[0];
    state.weightLogs.push({ date: today, weight: val });
    saveState();

    chartInstance.data.labels.push(today);
    chartInstance.data.datasets[0].data.push(val);
    chartInstance.update();

    renderWeightHistory();
    document.getElementById('new-weight-val').value = '';
}

function renderWeightHistory() {
    const tbody = document.getElementById('weight-history-tbody');
    tbody.innerHTML = '';

    [...state.weightLogs].reverse().forEach((log, index) => {
        const tr = document.createElement('tr');
        tr.className = "border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300";
        tr.innerHTML = `
            <td class="py-2">${log.date}</td>
            <td class="py-2 font-bold">${log.weight} kg</td>
            <td class="py-2 text-right">
                <button onclick="deleteWeightLog(${state.weightLogs.length - 1 - index})" class="text-slate-400 hover:text-red-500"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteWeightLog(index) {
    state.weightLogs.splice(index, 1);
    saveState();

    chartInstance.data.labels = state.weightLogs.map(l => l.date);
    chartInstance.data.datasets[0].data = state.weightLogs.map(l => l.weight);
    chartInstance.update();

    renderWeightHistory();
}