import { getStorage, addToLastSeen, resetLastSeen, KEYS } from './storage';

export const getRandomItem = (data, lastSeenLimit = 5) => {
  if (!data || data.length === 0) return null;

  const seenIds = getStorage(KEYS.LAST_SEEN) || [];
  
  // Filter out recently seen items
  let availableItems = data.filter(item => !seenIds.includes(item.id));

  // If all items have been seen, reset the seen list
  if (availableItems.length === 0) {
    resetLastSeen();
    availableItems = data;
  }

  const randomIndex = Math.floor(Math.random() * availableItems.length);
  const selectedItem = availableItems[randomIndex];

  addToLastSeen(selectedItem.id);
  
  // Keep only the last N items in seen list to ensure variety but allow repetition eventually
  const currentSeen = getStorage(KEYS.LAST_SEEN) || [];
  if (currentSeen.length > Math.min(data.length - 1, 10)) {
     // If we've seen too many, we might want to shift the first one out
     // but the requirement says "Reset exclusion list when all items are used"
     // So I'll stick to that logic in the "availableItems.length === 0" block.
  }

  return selectedItem;
};
