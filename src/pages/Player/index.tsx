import { MessageCircle } from "lucide-react";

import { Header } from "../../components/Header";
import { Video } from "../../components/Video";
import { Module } from "../../components/Module";
import { useAppSelector } from "../../store";
import { start, useCurrentLesson } from "../../store/slices/player";
import { useEffect } from "react";
import { api } from "../../services/api";
import { useDispatch } from "react-redux";

export const Player = () => {
  const dispatch = useDispatch();

  const modules = useAppSelector((state) => state.player.course?.modules);

  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    api.get("/courses/1").then((response) => {
      dispatch(start(response.data));
    });
  }, [currentLesson]);

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`;
    }
  }, [currentLesson]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="bg-violet-500 text-white px-4 py-2 rounded-md flex gap-2 hover:bg-violet-400">
            <MessageCircle size={24} />
            <span className="material-icons">Deixar FeedBack</span>
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l border-zinc-800 divide-y-2 divide-zinc-900 bg-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules &&
              modules.map((module, index) => (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              ))}
          </aside>
        </main>
      </div>
    </div>
  );
};
