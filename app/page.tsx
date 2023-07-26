export default function Home() {
  return (
    <main className="bg-[linear-gradient(180deg,_#7F6AFF_0%,_#5C4BC5_100%)] h-screen">
      <div className="block mx-[70px] pt-[40px] max-sm:mx-[20px]">
        <div className="flex justify-between">
          <a
            className="font-normal text-grayc uppercase opacity-[0.5] text-[25px] max-sm:text-[18px]"
            href="/newspaper"
          >
            join the newsletter
          </a>
          <a
            className="font-normal text-grayc text-[25px] uppercase max-sm:text-[18px]"
            href="/changelog"
          >
            changelog
          </a>
        </div>
      </div>
    </main>
  );
}
