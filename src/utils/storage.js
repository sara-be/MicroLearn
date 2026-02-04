const KEYS = {
  LAST_SEEN: 'microlearn_last_seen',
  FAVORITES: 'microlearn_favorites',
  HISTORY: 'microlearn_history',
  STREAK: 'microlearn_streak',
  LAST_LEARNED_DATE: 'microlearn_last_learned_date'
};

export const getStorage = (key) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const addToLastSeen = (id) => {
  const seen = getStorage(KEYS.LAST_SEEN) || [];
  if (!seen.includes(id)) {
    const newSeen = [...seen, id];
    setStorage(KEYS.LAST_SEEN, newSeen);
    return newSeen;
  }
  return seen;
};

export const resetLastSeen = () => {
  setStorage(KEYS.LAST_SEEN, []);
};

export const toggleFavorite = (item) => {
  const favorites = getStorage(KEYS.FAVORITES) || [];
  const exists = favorites.find(f => f.id === item.id);
  let newFavorites;
  if (exists) {
    newFavorites = favorites.filter(f => f.id !== item.id);
  } else {
    newFavorites = [...favorites, item];
  }
  setStorage(KEYS.FAVORITES, newFavorites);
  return newFavorites;
};

export const getFavorites = () => getStorage(KEYS.FAVORITES) || [];

export const markAsCompleted = (id) => {
  const history = getStorage(KEYS.HISTORY) || [];
  if (!history.includes(id)) {
    const newHistory = [...history, id];
    setStorage(KEYS.HISTORY, newHistory);
    updateStreak();
    return newHistory;
  }
  return history;
};

const updateStreak = () => {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem(KEYS.LAST_LEARNED_DATE);
  
  if (lastDate === today) return;

  let streak = parseInt(localStorage.getItem(KEYS.STREAK) || '0');
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastDate === yesterday.toDateString()) {
    streak += 1;
  } else {
    streak = 1;
  }
  
  localStorage.setItem(KEYS.STREAK, streak.toString());
  localStorage.setItem(KEYS.LAST_LEARNED_DATE, today);
};

export const getStreak = () => parseInt(localStorage.getItem(KEYS.STREAK) || '0');

export { KEYS };
