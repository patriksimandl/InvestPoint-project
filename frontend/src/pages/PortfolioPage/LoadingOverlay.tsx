
export default function LoadingOverlay() {
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-[12px] bg-gradient-to-b from-slate-900/20 via-slate-900/35 to-slate-900/25 z-11"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col items-center gap-4 bg-white/90 border border-white/60 shadow-2xl rounded-[18px] px-6 py-5">
          <div className="h-12 w-12 rounded-full border-[3px] border-slate-200 border-t-blue-600 animate-spin"></div>
          <div className="text-[14px] font-semibold text-slate-700 tracking-[0.08em] uppercase">Loading</div>
        </div>
      </div>
    </>
  );
}
