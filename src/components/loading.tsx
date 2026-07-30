export default function Loading() {
  return (
    <div id="loading-component">
      <div className="content-container  flex flex-col justify-center items-center gap-10">
        <span className="loading loading-spinner loading-xl"></span>
        <p className="text-white">Loading...</p>
      </div>
    </div>
  )
}
