
export default function LoadingOverlay() {
  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 top-[160px] backdrop-blur-[10px] w-full h-full z-11 bg-black/20"></div>
      <div className="fixed top-[50%] w-[7vw] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center z-20 bg-white rounded-[8px] p-[20px]">
        <svg fill="#000000FF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4" cy="12" r="3">
            <animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" />
          </circle>
          <circle cx="12" cy="12" r="3">
            <animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" />
          </circle>
          <circle cx="20" cy="12" r="3">
            <animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" />
          </circle>
        </svg>
        <div className="text-[25px] font-semibold"></div>
      </div>
    </>
  );
}
