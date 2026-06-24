export default function LivePage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">

      <h1 className="text-4xl font-bold mb-6">
        📺 AGS NEWS LIVE
      </h1>

      <div className="aspect-video rounded-2xl overflow-hidden bg-black">

        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
          title="AGS News Live"
          allowFullScreen
        />

      </div>

    </div>
  );
}