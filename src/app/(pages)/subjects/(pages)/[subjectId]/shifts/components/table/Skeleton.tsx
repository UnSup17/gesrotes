import { Fragment } from "react";

export default function TableSkeleton() {
  return (
    <div className="border rounded-lg bg-white overflow-hidden animate-pulse">
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-[250px,repeat(7,1fr)] min-w-[1200px]">
          {/* Header */}
          <div className="sticky top-0 left-0 z-20 bg-gray-200 p-4 border-b h-16"></div>
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="sticky top-0 z-10 p-4 text-center border-b bg-gray-200 h-16"
            ></div>
          ))}

          {/* Students and attendance cells */}
          {[...Array(5)].map((_, studentIndex) => (
            <Fragment key={studentIndex}>
              <div className="sticky left-0 z-10 bg-white p-4 border-b flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <div className="w-32 h-4 bg-gray-300 rounded"></div>
                  <div className="w-24 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
              {[...Array(7)].map((_, dayIndex) => (
                <div
                  key={`${studentIndex}-${dayIndex}`}
                  className="p-2 border-b flex items-center justify-center"
                >
                  <div className="w-full h-[100px] bg-gray-100 rounded border border-dashed border-gray-300"></div>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
