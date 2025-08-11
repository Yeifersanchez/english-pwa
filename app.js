/*
 * Aprende Inglés PWA
 *
 * This script powers the interactive behaviour of the Progressive Web App.
 * It manages application state, navigation, spaced‑repetition scheduling
 * and basic gamification elements like points, streaks and badges. All
 * user data is stored locally using localStorage so the app can work
 * entirely offline once loaded.
 */

(function () {
  // ---------------------------------------------------------------------------
  // Data definitions
  //
  // Each unit contains a set of lessons. A lesson has an id, the English
  // phrase, its Spanish translation and a type (word or phrase). You can
  // extend these arrays to include more vocabulary. These lists currently
  // cover basic introductions, essential vocabulary and simple grammar. If
  // you wish to meet the 300–400 word target you should add additional
  // entries here or load them from an external JSON file.
  // ---------------------------------------------------------------------------
  const units = [
    {
      id: 1,
      name: 'Introducción al inglés',
      lessons: [
        { id: 'u1-1', eng: 'Hello', es: 'Hola' },
        { id: 'u1-2', eng: 'Goodbye', es: 'Adiós' },
        { id: 'u1-3', eng: 'Please', es: 'Por favor' },
        { id: 'u1-4', eng: 'Thank you', es: 'Gracias' },
        { id: 'u1-5', eng: 'Yes', es: 'Sí' },
        { id: 'u1-6', eng: 'No', es: 'No' },
        { id: 'u1-7', eng: "I'm sorry", es: 'Lo siento' },
        { id: 'u1-8', eng: 'Good morning', es: 'Buenos días' },
        { id: 'u1-9', eng: 'Good night', es: 'Buenas noches' },
        { id: 'u1-10', eng: 'My name is...', es: 'Mi nombre es...' },
        { id: 'u1-11', eng: 'How are you?', es: '¿Cómo estás?' },
        { id: 'u1-12', eng: "I'm fine", es: 'Estoy bien' },
        { id: 'u1-13', eng: 'Nice to meet you', es: 'Mucho gusto' },
        { id: 'u1-14', eng: 'Where is the bathroom?', es: '¿Dónde está el baño?' },
        { id: 'u1-15', eng: "I don't understand", es: 'No entiendo' },
        { id: 'u1-16', eng: 'Speak slowly please', es: 'Habla despacio, por favor' },
      ],
    },
    {
      id: 2,
      name: 'Vocabulario esencial',
      lessons: [
        { id: 'u2-1', eng: 'Mother', es: 'Madre' },
        { id: 'u2-2', eng: 'Father', es: 'Padre' },
        { id: 'u2-3', eng: 'Brother', es: 'Hermano' },
        { id: 'u2-4', eng: 'Sister', es: 'Hermana' },
        { id: 'u2-5', eng: 'Son', es: 'Hijo' },
        { id: 'u2-6', eng: 'Daughter', es: 'Hija' },
        { id: 'u2-7', eng: 'Husband', es: 'Esposo' },
        { id: 'u2-8', eng: 'Wife', es: 'Esposa' },
        { id: 'u2-9', eng: 'Friend', es: 'Amigo/Amiga' },
        { id: 'u2-10', eng: 'House', es: 'Casa' },
        { id: 'u2-11', eng: 'Food', es: 'Comida' },
        { id: 'u2-12', eng: 'Water', es: 'Agua' },
        { id: 'u2-13', eng: 'Bread', es: 'Pan' },
        { id: 'u2-14', eng: 'Coffee', es: 'Café' },
        { id: 'u2-15', eng: 'Milk', es: 'Leche' },
        { id: 'u2-16', eng: 'Restaurant', es: 'Restaurante' },
        { id: 'u2-17', eng: 'Supermarket', es: 'Supermercado' },
        { id: 'u2-18', eng: 'Bus', es: 'Autobús' },
        { id: 'u2-19', eng: 'Taxi', es: 'Taxi' },
        { id: 'u2-20', eng: 'Airport', es: 'Aeropuerto' },
      ],
    },
    {
      id: 3,
      name: 'Gramática básica y estructura',
      lessons: [
        { id: 'u3-1', eng: 'I am', es: 'Yo soy / Yo estoy' },
        { id: 'u3-2', eng: 'You are', es: 'Tú eres / Tú estás' },
        { id: 'u3-3', eng: 'He is', es: 'Él es / Él está' },
        { id: 'u3-4', eng: 'She is', es: 'Ella es / Ella está' },
        { id: 'u3-5', eng: 'We are', es: 'Nosotros somos / Nosotros estamos' },
        { id: 'u3-6', eng: 'They are', es: 'Ellos son / Ellos están' },
        { id: 'u3-7', eng: 'I have', es: 'Yo tengo' },
        { id: 'u3-8', eng: 'You have', es: 'Tú tienes' },
        { id: 'u3-9', eng: 'He has', es: 'Él tiene' },
        { id: 'u3-10', eng: 'She has', es: 'Ella tiene' },
        { id: 'u3-11', eng: 'We have', es: 'Nosotros tenemos' },
        { id: 'u3-12', eng: 'They have', es: 'Ellos tienen' },
        { id: 'u3-13', eng: 'Do you want to ...?', es: '¿Quieres ...?' },
        { id: 'u3-14', eng: 'I like', es: 'Me gusta' },
        { id: 'u3-15', eng: 'I need', es: 'Necesito' },
        { id: 'u3-16', eng: 'I want', es: 'Quiero' },
        { id: 'u3-17', eng: "I don't like", es: 'No me gusta' },
        { id: 'u3-18', eng: 'Where do you live?', es: '¿Dónde vives?' },
        { id: 'u3-19', eng: 'What is your name?', es: '¿Cómo te llamas?' },
        { id: 'u3-20', eng: 'How old are you?', es: '¿Cuántos años tienes?' },
      ],
    },
    {
      id: 4,
      name: 'Escucha y habla',
      lessons: [
        { id: 'u4-1', eng: 'Where is the ...?', es: '¿Dónde está el/la ...?' },
        { id: 'u4-2', eng: 'How much is it?', es: '¿Cuánto cuesta?' },
        { id: 'u4-3', eng: 'Can you help me?', es: '¿Puedes ayudarme?' },
        { id: 'u4-4', eng: 'Could you repeat that?', es: '¿Podrías repetir eso?' },
        { id: 'u4-5', eng: 'Good afternoon', es: 'Buenas tardes' },
        { id: 'u4-6', eng: 'See you later', es: 'Hasta luego' },
        { id: 'u4-7', eng: 'Good evening', es: 'Buenas noches' },
        { id: 'u4-8', eng: 'Good luck', es: 'Buena suerte' },
        { id: 'u4-9', eng: 'Congratulations', es: 'Felicidades' },
        { id: 'u4-10', eng: 'Have a nice day', es: 'Que tengas un buen día' },
        { id: 'u4-11', eng: 'Welcome', es: 'Bienvenido/Bienvenida' },
        { id: 'u4-12', eng: 'What happened?', es: '¿Qué pasó?' },
        { id: 'u4-13', eng: 'I love it', es: 'Me encanta' },
        { id: 'u4-14', eng: "It's okay", es: 'Está bien' },
        { id: 'u4-15', eng: "It doesn’t matter", es: 'No importa' },
        { id: 'u4-16', eng: 'I agree', es: 'Estoy de acuerdo' },
        { id: 'u4-17', eng: "I don't know", es: 'No sé' },
        { id: 'u4-18', eng: 'Excuse me', es: 'Perdón / Disculpa' },
        { id: 'u4-19', eng: 'Bless you', es: 'Salud' },
        { id: 'u4-20', eng: 'Cheers', es: 'Salud (brindis)' },
      ],
    },
    {
      id: 5,
      name: 'Conversación cotidiana',
      lessons: [
        { id: 'u5-1', eng: 'Where is the bank?', es: '¿Dónde está el banco?' },
        { id: 'u5-2', eng: 'I would like to order', es: 'Me gustaría pedir' },
        { id: 'u5-3', eng: "I'm looking for ...", es: 'Estoy buscando ...' },
        { id: 'u5-4', eng: 'How do I get to ...?', es: '¿Cómo llego a ...?' },
        { id: 'u5-5', eng: 'Do you speak Spanish?', es: '¿Hablas español?' },
        { id: 'u5-6', eng: 'I want to buy ...', es: 'Quiero comprar ...' },
        { id: 'u5-7', eng: 'What time is it?', es: '¿Qué hora es?' },
        { id: 'u5-8', eng: "It's very expensive", es: 'Es muy caro' },
        { id: 'u5-9', eng: "I'm lost", es: 'Estoy perdido/perdida' },
        { id: 'u5-10', eng: "It's delicious", es: 'Está delicioso' },
        { id: 'u5-11', eng: 'The check, please', es: 'La cuenta, por favor' },
        { id: 'u5-12', eng: 'Can I help you?', es: '¿Puedo ayudarte?' },
        { id: 'u5-13', eng: 'Just a moment', es: 'Un momento' },
        { id: 'u5-14', eng: "I'm sorry to bother you", es: 'Perdón por molestarte' },
        { id: 'u5-15', eng: "I don’t have any cash", es: 'No tengo efectivo' },
        { id: 'u5-16', eng: 'Do you accept credit cards?', es: '¿Aceptan tarjetas de crédito?' },
        { id: 'u5-17', eng: 'Can I try it on?', es: '¿Puedo probármelo?' },
        { id: 'u5-18', eng: 'Where can I find ...?', es: '¿Dónde puedo encontrar ...?' },
        { id: 'u5-19', eng: 'I have a reservation', es: 'Tengo una reserva' },
        { id: 'u5-20', eng: 'How long does it take?', es: '¿Cuánto tiempo tarda?' },
      ],
    },
  ];

  // ---------------------------------------------------------------------------
  // State persistence helpers
  //
  // The configuration (daily goal) and learner progress (points, streak,
  // flashcards) are stored in localStorage. This ensures the app remains
  // responsive and functional without requiring a network connection or
  // external services. JSON parse and stringify are wrapped in try/catch
  // blocks to avoid corrupting the state on malformed input.
  // ---------------------------------------------------------------------------
  const STORAGE_KEYS = {
    config: 'englishConfig',
    progress: 'englishProgress',
  };

  function loadFromStorage(key, fallback = null) {
    try {
      const json = localStorage.getItem(key);
      return json ? JSON.parse(json) : fallback;
    } catch (err) {
      console.error('Error reading from localStorage', err);
      return fallback;
    }
  }

  function saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Error writing to localStorage', err);
    }
  }

  // Default progress structure. Points and streak counters start at zero. The
  // flashcards object is empty until the learner studies a phrase. Each key
  // within flashcards will store an object with scheduling data.
  const defaultProgress = {
    points: 0,
    streak: 0,
    lastSessionDate: null,
    flashcards: {},
    badges: [],
  };

  // In-memory state object. Configuration and progress are loaded from
  // localStorage on startup and mutated throughout the session. Changes are
  // persisted back to localStorage when necessary.
  const state = {
    config: null,
    progress: null,
    currentUnit: null,
    currentLessonIndex: 0,
    currentFlashcard: null,
    quiz: null,
  };

  // ---------------------------------------------------------------------------
  // DOM helpers
  //
  // Simple query helper to reduce verbosity. $ returns the first element
  // matching the selector. $all returns all matching elements.
  // ---------------------------------------------------------------------------
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  function showScreen(id) {
    $$('.screen').forEach((el) => el.classList.remove('active'));
    const screen = document.getElementById(id);
    if (screen) screen.classList.add('active');
  }

  // Helper to speak a phrase using the browser's built-in SpeechSynthesis API.
  function speakPhrase(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }

  // Get today's date string in YYYY-MM-DD format. Used for streak tracking.
  function getToday() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  // Update the streak counter based on the last session date. If the learner
  // studied yesterday, increment the streak. If the gap is more than one day,
  // reset the streak. Called when the app loads and when a session finishes.
  function updateStreak() {
    const today = getToday();
    const last = state.progress.lastSessionDate;
    if (!last) {
      // first session
      state.progress.streak = 1;
    } else {
      const lastDate = new Date(last);
      const todayDate = new Date(today);
      const diff = (todayDate - lastDate) / (1000 * 60 * 60 * 24);
      if (diff === 0) {
        // already counted today
        return;
      }
      if (diff === 1) {
        state.progress.streak += 1;
      } else if (diff > 1) {
        state.progress.streak = 1;
      }
    }
    state.progress.lastSessionDate = today;
    saveToStorage(STORAGE_KEYS.progress, state.progress);
  }

  // Award badges based on milestones. Badges are identified by a string and
  // stored in the progress.badges array. When a badge is awarded we push it
  // into the array and persist to storage. This function is called each time
  // the user finishes a flashcard session or completes a streak. You can
  // expand this list with additional achievements.
  function awardBadges() {
    const p = state.progress;
    // First lesson badge
    if (p.points >= 10 && !p.badges.includes('first-steps')) {
      p.badges.push('first-steps');
      alert('¡Felicidades! Has obtenido la insignia: Primeros pasos');
    }
    // 7-day streak badge
    if (p.streak >= 7 && !p.badges.includes('week-streak')) {
      p.badges.push('week-streak');
      alert('¡Genial! Has completado una racha de 7 días');
    }
    // 100 words mastered badge
    const masteredCount = Object.values(p.flashcards).filter(
      (card) => card.interval >= 7
    ).length;
    if (masteredCount >= 100 && !p.badges.includes('hundred-words')) {
      p.badges.push('hundred-words');
      alert('¡Increíble! Has dominado 100 palabras/expresiones');
    }
    saveToStorage(STORAGE_KEYS.progress, p);
  }

  // Create and display the daily plan cards on the home screen. Each plan
  // corresponds to one of the core activities: listening practice, flashcards
  // and a short quiz. Clicking a card triggers the associated view.
  function buildDailyPlan() {
    const container = $('#daily-plan');
    container.innerHTML = '';

    const plans = [
      {
        id: 'listen',
        title: 'Escuchar y repetir',
        description: 'Practica frases clave con audio y repite',
        duration: 4,
      },
      {
        id: 'flashcards',
        title: 'Tarjetas',
        description: 'Repasa vocabulario con repetición espaciada',
        duration: 4,
      },
      {
        id: 'quiz',
        title: 'Quiz rápido',
        description: 'Responde un breve cuestionario',
        duration: 2,
      },
    ];

    plans.forEach((plan) => {
      const card = document.createElement('div');
      card.className = 'unit-card';
      card.innerHTML = `<h3>${plan.title}</h3><p>${plan.description}</p><p><strong>${plan.duration} min</strong></p>`;
      card.addEventListener('click', () => {
        if (plan.id === 'listen') {
          startListeningPractice();
        } else if (plan.id === 'flashcards') {
          startFlashcards();
        } else if (plan.id === 'quiz') {
          startQuiz();
        }
      });
      container.appendChild(card);
    });
  }

  // Render the list of units with progress bars. Clicking a unit card opens
  // listening practice for that unit starting from the first unfinished lesson.
  function buildUnitsList() {
    const container = $('#units-list');
    container.innerHTML = '';
    units.forEach((unit) => {
      const card = document.createElement('div');
      card.className = 'unit-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.innerHTML = `<h3>${unit.name}</h3><div class="progress-bar"><div class="fill"></div></div>`;
      // Compute progress per unit: percentage of lessons that have been
      // scheduled at least once in flashcards
      const total = unit.lessons.length;
      let completed = 0;
      unit.lessons.forEach((lesson) => {
        const fc = state.progress.flashcards[lesson.id];
        if (fc && fc.interval >= 1) completed++;
      });
      const percent = Math.round((completed / total) * 100);
      card.querySelector('.fill').style.width = percent + '%';
      card.addEventListener('click', () => {
        state.currentUnit = unit.id;
        state.currentLessonIndex = 0;
        startListeningPractice(unit.id);
      });
      container.appendChild(card);
    });
  }

  // Show greeting and streak info on home screen
  function updateHomeHeader() {
    const greet = $('#home-greeting');
    const streakEl = $('#streak-container');
    greet.textContent = `¡Hola, Adriana!`;
    const streak = state.progress.streak;
    if (streak > 1) {
      streakEl.textContent = `Racha de ${streak} días`;
    } else {
      streakEl.textContent = '';
    }
  }

  // ---------------------------------------------------------------------------
  // Listening Practice
  //
  // The listening practice shows a phrase from the selected unit. It speaks
  // the English text aloud and encourages the learner to repeat. The user
  // can navigate through phrases using Next and Prev buttons. Completing
  // listening practice gives a small points boost. If called without a unit
  // id, the first unit is selected by default.
  // ---------------------------------------------------------------------------
  function startListeningPractice(unitId = null) {
    // Default to the next unit not yet completed
    let unit;
    if (unitId) {
      unit = units.find((u) => u.id === unitId);
    } else {
      unit = units[0];
    }
    state.currentUnit = unit.id;
    showScreen('lesson-screen');
    renderLesson();
  }

  // Render the current phrase within the selected unit. Provides Play audio
  // capability and navigation controls. When reaching the end of the unit
  // the function loops back to the beginning.
  function renderLesson() {
    const unit = units.find((u) => u.id === state.currentUnit);
    const lesson = unit.lessons[state.currentLessonIndex];
    $('#lesson-title').textContent = unit.name;
    $('#lesson-subtitle').textContent = `${state.currentLessonIndex + 1} / ${unit.lessons.length}`;
    const content = $('#lesson-content');
    content.innerHTML = '';
    const phraseEl = document.createElement('div');
    phraseEl.className = 'phrase';
    phraseEl.textContent = lesson.eng;
    const translationEl = document.createElement('div');
    translationEl.className = 'translation';
    translationEl.textContent = lesson.es;
    content.appendChild(phraseEl);
    content.appendChild(translationEl);
    // Controls
    const controls = $('#lesson-controls');
    controls.innerHTML = '';
    const playBtn = document.createElement('button');
    playBtn.className = 'primary';
    playBtn.textContent = 'Escuchar';
    playBtn.addEventListener('click', () => {
      speakPhrase(lesson.eng);
    });
    const prevBtn = document.createElement('button');
    prevBtn.className = 'secondary';
    prevBtn.textContent = 'Anterior';
    prevBtn.disabled = state.currentLessonIndex === 0;
    prevBtn.addEventListener('click', () => {
      if (state.currentLessonIndex > 0) {
        state.currentLessonIndex--;
        renderLesson();
      }
    });
    const nextBtn = document.createElement('button');
    nextBtn.className = 'secondary';
    nextBtn.textContent = 'Siguiente';
    nextBtn.addEventListener('click', () => {
      if (state.currentLessonIndex < unit.lessons.length - 1) {
        state.currentLessonIndex++;
      } else {
        state.currentLessonIndex = 0;
      }
      renderLesson();
    });
    controls.appendChild(playBtn);
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    // Award points when the user listens to the phrase for the first time
    if (!state.progress.flashcards[lesson.id]) {
      state.progress.points += 1;
      saveToStorage(STORAGE_KEYS.progress, state.progress);
    }
  }

  // ---------------------------------------------------------------------------
  // Flashcards (Spaced repetition)
  //
  // Uses a simple scheduling algorithm. Each card has an interval and due
  // date. New cards start with interval = 1 day. On rating, the interval
  // increases (easy -> +4 days, medio -> +2 days, de nuevo -> reset to 1 day).
  // The next due date is calculated from the current date. Cards are stored
  // in the progress.flashcards map.
  // ---------------------------------------------------------------------------
  function startFlashcards() {
    // Build a queue of due flashcards. If none are due, introduce new cards
    const due = [];
    const today = new Date().getTime();
    // Add existing due cards
    Object.keys(state.progress.flashcards).forEach((id) => {
      const card = state.progress.flashcards[id];
      if (card.dueDate <= today) {
        due.push({ id, ...card });
      }
    });
    // If there are no due cards, pick a few new lessons to introduce
    if (due.length === 0) {
      // gather all lesson ids already in flashcards
      const learntIds = new Set(Object.keys(state.progress.flashcards));
      const newCards = [];
      units.forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          if (!learntIds.has(lesson.id)) {
            newCards.push(lesson);
          }
        });
      });
      // Limit to 5 new cards at a time
      due.push(
        ...newCards.slice(0, 5).map((lesson) => ({
          id: lesson.id,
          eng: lesson.eng,
          es: lesson.es,
          interval: 0,
          dueDate: today,
        }))
      );
    }
    if (due.length === 0) {
      alert('¡No hay tarjetas pendientes por ahora!');
      return;
    }
    // Save due queue in state
    state.currentFlashcard = {
      queue: due,
      index: 0,
    };
    showScreen('flashcards-screen');
    renderFlashcard();
  }

  function renderFlashcard() {
    const fc = state.currentFlashcard;
    const cardData = fc.queue[fc.index];
    const lesson = findLessonById(cardData.id);
    const container = $('#flashcard-content');
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'flashcard';
    // front/back toggling
    let showingFront = true;
    const front = document.createElement('div');
    front.className = 'front';
    front.textContent = lesson.eng;
    const back = document.createElement('div');
    back.className = 'back hidden';
    back.textContent = lesson.es;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', () => {
      showingFront = !showingFront;
      if (showingFront) {
        front.classList.remove('hidden');
        back.classList.add('hidden');
      } else {
        front.classList.add('hidden');
        back.classList.remove('hidden');
      }
    });
    container.appendChild(card);
    // Rating buttons
    const buttonsContainer = $('#flashcard-buttons');
    buttonsContainer.innerHTML = '';
    const againBtn = document.createElement('button');
    againBtn.className = 'primary';
    againBtn.textContent = 'De nuevo';
    const medioBtn = document.createElement('button');
    medioBtn.className = 'primary';
    medioBtn.textContent = 'Medio';
    const easyBtn = document.createElement('button');
    easyBtn.className = 'primary';
    easyBtn.textContent = 'Fácil';
    buttonsContainer.appendChild(againBtn);
    buttonsContainer.appendChild(medioBtn);
    buttonsContainer.appendChild(easyBtn);
    // Handler for rating
    function rateCard(multiplier) {
      // multiplier: 1 for again, 2 for medio, 4 for easy
      const todayDate = new Date();
      const progressCard = state.progress.flashcards[cardData.id] || {
        interval: 0,
        dueDate: todayDate.getTime(),
      };
      // Increase interval accordingly
      const newInterval = Math.max(1, progressCard.interval * multiplier);
      progressCard.interval = newInterval;
      // Due date after interval days
      const dueDate = new Date(todayDate.getTime());
      dueDate.setDate(todayDate.getDate() + newInterval);
      progressCard.dueDate = dueDate.getTime();
      state.progress.flashcards[cardData.id] = progressCard;
      state.progress.points += multiplier; // award more points for harder ratings
      saveToStorage(STORAGE_KEYS.progress, state.progress);
      // Move to next card
      if (fc.index < fc.queue.length - 1) {
        fc.index += 1;
        renderFlashcard();
      } else {
        alert('¡Sesión de tarjetas completada!');
        awardBadges();
        showHome();
      }
    }
    againBtn.addEventListener('click', () => rateCard(1));
    medioBtn.addEventListener('click', () => rateCard(2));
    easyBtn.addEventListener('click', () => rateCard(4));
  }

  // Helper to find a lesson across all units by id
  function findLessonById(id) {
    for (const unit of units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === id) return lesson;
      }
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // Quiz
  //
  // Builds a quiz of 5 multiple‑choice questions from across all units. Each
  // question shows an English phrase and offers four Spanish translations
  // (one correct and three incorrect). Points are awarded for correct
  // answers. The quiz ends after five questions and returns to the home
  // screen.
  // ---------------------------------------------------------------------------
  function startQuiz() {
    // Prepare question pool
    const allLessons = [];
    units.forEach((unit) => {
      unit.lessons.forEach((lesson) => {
        allLessons.push(lesson);
      });
    });
    const questions = [];
    // Randomly choose 5 distinct lessons
    const pool = [...allLessons];
    for (let i = 0; i < 5 && pool.length > 0; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      const lesson = pool.splice(idx, 1)[0];
      // Build options: one correct and three incorrect translations
      const options = [lesson.es];
      while (options.length < 4) {
        const rand = allLessons[Math.floor(Math.random() * allLessons.length)].es;
        if (!options.includes(rand)) options.push(rand);
      }
      shuffleArray(options);
      questions.push({
        eng: lesson.eng,
        correct: lesson.es,
        options,
      });
    }
    state.quiz = { questions, index: 0, score: 0 };
    showScreen('quiz-screen');
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const q = state.quiz.questions[state.quiz.index];
    const container = $('#quiz-content');
    container.innerHTML = '';
    const questionEl = document.createElement('div');
    questionEl.className = 'quiz-question';
    questionEl.textContent = q.eng;
    container.appendChild(questionEl);
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'quiz-options';
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'primary';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (opt === q.correct) {
          state.quiz.score += 1;
          state.progress.points += 2;
        }
        if (state.quiz.index < state.quiz.questions.length - 1) {
          state.quiz.index++;
          renderQuizQuestion();
        } else {
          finishQuiz();
        }
      });
      optionsDiv.appendChild(btn);
    });
    container.appendChild(optionsDiv);
    // Progress indicator
    const progressEl = document.createElement('div');
    progressEl.className = 'quiz-result';
    progressEl.textContent = `Pregunta ${state.quiz.index + 1} de ${state.quiz.questions.length}`;
    container.appendChild(progressEl);
  }

  function finishQuiz() {
    const container = $('#quiz-content');
    container.innerHTML = '';
    const result = document.createElement('div');
    result.className = 'quiz-result';
    result.innerHTML = `¡Quiz completado!<br>Obtuviste ${state.quiz.score} de ${state.quiz.questions.length} respuestas correctas.`;
    container.appendChild(result);
    // Award points for completing the quiz
    state.progress.points += state.quiz.score;
    saveToStorage(STORAGE_KEYS.progress, state.progress);
    awardBadges();
    // After short delay, return to home
    setTimeout(() => {
      showHome();
    }, 3000);
  }

  // Fisher-Yates shuffle to randomise options
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // ---------------------------------------------------------------------------
  // Progress view
  //
  // Displays total points, streak, number of mastered words and badges earned.
  // ---------------------------------------------------------------------------
  function showProgress() {
    showScreen('progress-screen');
    const summary = $('#progress-summary');
    summary.innerHTML = '';
    const pointsEl = document.createElement('p');
    pointsEl.textContent = `Puntos: ${state.progress.points}`;
    const streakEl = document.createElement('p');
    streakEl.textContent = `Racha actual: ${state.progress.streak} días`;
    // Mastered words count: interval >= 7 days
    const masteredCount = Object.values(state.progress.flashcards).filter(
      (card) => card.interval >= 7
    ).length;
    const masteredEl = document.createElement('p');
    masteredEl.textContent = `Palabras dominadas: ${masteredCount}`;
    summary.appendChild(pointsEl);
    summary.appendChild(streakEl);
    summary.appendChild(masteredEl);
    // Badges
    if (state.progress.badges.length > 0) {
      const badgesHeading = document.createElement('p');
      badgesHeading.textContent = 'Insignias:';
      summary.appendChild(badgesHeading);
      state.progress.badges.forEach((badge) => {
        const badgeEl = document.createElement('span');
        badgeEl.className = 'badge';
        if (badge === 'first-steps') badgeEl.textContent = 'Primeros pasos';
        else if (badge === 'week-streak') badgeEl.textContent = 'Racha de 7 días';
        else if (badge === 'hundred-words') badgeEl.textContent = '100 palabras';
        summary.appendChild(badgeEl);
      });
    }
  }

  // Return to home screen and refresh plan and header
  function showHome() {
    updateHomeHeader();
    buildDailyPlan();
    showScreen('home-screen');
  }

  // ---------------------------------------------------------------------------
  // Setup and configuration
  //
  // Handles initial setup when no configuration exists. The learner selects
  // a daily goal. Spanish hints are enabled by default. Once saved, the
  // configuration is persisted and the home screen is displayed.
  // ---------------------------------------------------------------------------
  function setup() {
    showScreen('setup-screen');
    // Handle goal selection highlighting
    $('#goal-options').addEventListener('click', (e) => {
      if (e.target.matches('button[data-goal]')) {
        $$('#goal-options button').forEach((btn) => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        state.config = {
          dailyGoal: parseInt(e.target.getAttribute('data-goal'), 10),
          spanishHints: true,
        };
      }
    });
    $('#setup-continue').addEventListener('click', () => {
      if (!state.config) {
        alert('Por favor selecciona una meta diaria.');
        return;
      }
      saveToStorage(STORAGE_KEYS.config, state.config);
      showHome();
    });
  }

  // Register service worker for offline support
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .catch((err) => console.error('SW registration failed', err));
    }
  }

  // Attach global event listeners for navigation buttons
  function attachGlobalListeners() {
    // Back buttons
    $('#lesson-back').addEventListener('click', () => showHome());
    $('#flashcards-back').addEventListener('click', () => showHome());
    $('#quiz-back').addEventListener('click', () => showHome());
    $('#progress-back').addEventListener('click', () => showHome());
    $('#units-back').addEventListener('click', () => showHome());
    // Home actions
    $('#home-units').addEventListener('click', () => {
      showScreen('units-screen');
      buildUnitsList();
    });
    $('#home-progress').addEventListener('click', () => {
      showProgress();
    });
  }

  // Initialise the application. Load configuration and progress from
  // localStorage, attach listeners and decide which screen to show.
  function init() {
    state.config = loadFromStorage(STORAGE_KEYS.config, null);
    state.progress = loadFromStorage(STORAGE_KEYS.progress, null) || { ...defaultProgress };
    attachGlobalListeners();
    registerServiceWorker();
    if (!state.config) {
      setup();
    } else {
      updateStreak();
      showHome();
    }
  }

  // Kick things off when DOM is ready
  document.addEventListener('DOMContentLoaded', init);
})();