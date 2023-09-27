import { create } from "zustand";
import { api } from "../services/api";

interface Course {
  id: number;
  modules: {
    id: number;
    title: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
    }[];
  }[];
}
export interface playerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;
  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
  load: () => Promise<void>;
}

export const useStore = create<playerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true });

      const response = await api.get("/courses/1");

      set({
        course: response.data,
        isLoading: false,
      });
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex;

      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      });
    },

    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get();

      if (
        currentLessonIndex + 1 <
        // @ts-ignore
        course.modules[currentModuleIndex].lessons.length
      ) {
        set({ currentLessonIndex: currentLessonIndex + 1 });
      } else {
        set({
          currentLessonIndex: 0,
          currentModuleIndex: currentModuleIndex + 1,
        });
      }
    },
  };
});

export const useCurrentLesson = () => {
  return useStore((state) => {
    const { currentModuleIndex, currentLessonIndex } = state;

    const currentModule = state.course?.modules[currentModuleIndex];
    const currentLesson =
      state.course?.modules[currentModuleIndex].lessons[currentLessonIndex];

    return { currentModule, currentLesson };
  });
};
