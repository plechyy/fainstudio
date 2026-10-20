'use client';

import { createContext, useContext } from 'react';

/** zavření okna zevnitř studie (třeba tlačítko na konci) */
export const StoryClose = createContext<() => void>(() => {});
export const useStoryClose = () => useContext(StoryClose);
