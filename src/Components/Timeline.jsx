import TimelineItem from "./HomePage/TimelineItem";
import { competitions } from "../data/competitions";

export default function Timeline() {
  return (
    <div className="mx-auto w-full max-w-5xl px-1 sm:px-4">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-200 sm:text-4xl">
        競賽榮譽
      </h2>
      <div className="relative overflow-hidden py-4">
        <div className="absolute left-5 top-0 h-full border border-gray-200/20 md:left-1/2"></div>
        {competitions.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
