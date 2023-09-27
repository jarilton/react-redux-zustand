import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "../..";
import { api } from "../../../services/api";

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
}

const initialState: playerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
};

export const loadCourse = createAsyncThunk("player/load", async () => {
  const response = await api.get("/courses/1");

  return response.data;
});

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0];
      state.currentLessonIndex = action.payload[1];
    },

    next: (state) => {
      if (
        state.currentLessonIndex + 1 <
        // @ts-ignore
        state.course.modules[state.currentModuleIndex].lessons.length
      ) {
        state.currentLessonIndex++;
      } else {
        state.currentLessonIndex = 0;
        state.currentModuleIndex++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player;

    const currentModule = state.player.course?.modules[currentModuleIndex];
    const currentLesson =
      state.player.course?.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ];

    return { currentModule, currentLesson };
  });
};
