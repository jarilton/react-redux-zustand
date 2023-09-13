import { MessageCircle } from "lucide-react";

import { Header } from "../../components/Header";
import { Video } from "../../components/Video";
import { Module } from "../../components/Module";

export const Player = () => {
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
            <Module
              moduleIndex={0}
              title="Desvendando o Redux"
              amountOfLessons={3}
            />
            <Module
              moduleIndex={1}
              title="Desvendando o Redux"
              amountOfLessons={3}
            />
            <Module
              moduleIndex={2}
              title="Desvendando o Redux"
              amountOfLessons={3}
            />
          </aside>
        </main>
      </div>
    </div>
  );
};
