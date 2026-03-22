import { Link, useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F7F2] text-gray-900">
      {" "}
      {/* 使用米色調背景模仿紙張感 */}
      {/* 1. Hero Section: 全版顯示風格 */}
      <div className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66')",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-6 tracking-tighter drop-shadow-lg">
            在紙葉之間，
            <br className="md:hidden" />
            遇見另一個自己
          </h2>
          <h5 className="text-lg md:text-xl font-light text-gray-200 mb-10 max-w-2xl leading-relaxed tracking-wide">
            精選獨立出版與經典文學，為渴望深度閱讀的靈魂，
            <br className="hidden md:block" />
            提供一處安靜的棲息地。
          </h5>

          <div
            onClick={() => navigate("/product")}
            className="cursor-pointer rounded-sm bg-white/70 text-black px-12 py-3 font-bold tracking-[0.3em] text-base hover:bg-gray-200 transition-all shadow-2xl uppercase"
          >
            探索書籍
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-12 bg-white/30 mx-auto"></div>
        </div>
      </div>
      {/* 2. 精選主題區塊 */}
      <div className="container mx-auto px-4 lg:px-20 py-24">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase mb-4">
            Curated Collections
          </span>
          <h3 className="text-3xl font-black tracking-tighter">本月主題選書</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* 項目 1 */}
          <div
            className="group cursor-pointer"
            onClick={() => navigate("/product")}
          >
            <div className="overflow-hidden bg-gray-100 mb-6 aspect-[16/10] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                alt="Literature"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2 font-serif italic">
                  年度選書：寂靜的迴聲
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  探索本季最受矚目的文學新作，從細膩的文字中聽見內心的共鳴與時代的縮影。
                </p>
              </div>
              <button className="border-b border-black pb-1 text-[10px] font-black tracking-widest hover:text-gray-400 transition-all whitespace-nowrap">
                VIEW MORE
              </button>
            </div>
          </div>

          {/* 項目 2 */}
          <div
            className="group cursor-pointer"
            onClick={() => navigate("/product")}
          >
            <div className="overflow-hidden bg-gray-100 mb-6 aspect-[16/10] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                alt="Design"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2 font-serif italic">
                  職人書齋：空間美學指南
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  不只是裝飾，更是生活的態度。精選當代建築與室內設計專書，重構你的日常空間。
                </p>
              </div>
              <button className="border-b border-black pb-1 text-[10px] font-black tracking-widest hover:text-gray-400 transition-all whitespace-nowrap">
                VIEW MORE
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 3. 使用者見證 */}
      <div className="bg-white py-24 border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* 評論 1 */}
            <div className="flex flex-col space-y-4">
              <div className="text-yellow-500 text-xs">★★★★★</div>
              <p className="text-lg font-serif italic text-gray-700 leading-relaxed">
                「在這個快節奏的時代，能有一個地方讓人慢下來挑選實體書，真的是一種奢侈的享受。包裝非常精美，拆開時有股淡淡的紙香。」
              </p>
              <div className="flex items-center gap-3 pt-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                  A.
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                  一位愛書的台北讀者
                </p>
              </div>
            </div>

            {/* 評論 2 */}
            <div className="flex flex-col space-y-4 md:border-x md:px-12 border-gray-100">
              <div className="text-yellow-500 text-xs">★★★★★</div>
              <p className="text-lg font-serif italic text-gray-700 leading-relaxed">
                「選書的眼光很獨特，很多在一般連鎖書店找不到的獨立刊物都能在這裡遇見。每次收到新書都像是在拆一份未知的禮物。」
              </p>
              <div className="flex items-center gap-3 pt-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                  M.
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                  深夜的文字漫遊者
                </p>
              </div>
            </div>

            {/* 評論 3 */}
            <div className="flex flex-col space-y-4">
              <div className="text-yellow-500 text-xs">★★★★☆</div>
              <p className="text-lg font-serif italic text-gray-700 leading-relaxed">
                「網站的操作非常流暢，雖然是匿名評論，但我真心推薦給所有對紙本閱讀還有熱情的人。這裡不只是買賣，更是一種品味。」
              </p>
              <div className="flex items-center gap-3 pt-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                  S.
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                  空間攝影愛好者
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 4. 服務優勢 */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="flex flex-col items-center text-center">
            <div className="h-px w-12 bg-black mb-8"></div>
            <h4 className="text-sm font-black mb-4 uppercase tracking-[0.2em]">
              選書指南
            </h4>
            <p className="text-gray-500 text-xs leading-loose px-4">
              每本書籍皆經過團隊親自翻閱，確保內容的深度與裝幀的品質，只為交到你手中的那份純粹。
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-px w-12 bg-black mb-8"></div>
            <h4 className="text-sm font-black mb-4 uppercase tracking-[0.2em]">
              全球配送
            </h4>
            <p className="text-gray-500 text-xs leading-loose px-4">
              無論身在何處，我們都將跨越國界，將這份紙本的情感安全遞送到你的書桌前。
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-px w-12 bg-black mb-8"></div>
            <h4 className="text-sm font-black mb-4 uppercase tracking-[0.2em]">
              專屬包裝
            </h4>
            <p className="text-gray-500 text-xs leading-loose px-4">
              使用環保纖維紙與手工封蠟，保護每一角書緣，讓拆封的過程成為一場神聖的儀式。
            </p>
          </div>
        </div>
      </div>
      {/* 5. 底部導購區 */}
      <div className="bg-gray-950 py-14 text-center text-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-base md:text-base font-serif italic mb-2 tracking-tight text-white/90">
            加入我們的讀書會，獲取深夜選書名單
          </div>
          <p className="text-gray-400 mb-12 text-sm leading-relaxed tracking-widest font-light">
            立即訂閱電子報，每月領取獨家折扣碼與新書試讀節錄。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border border-gray-800 px-6 py-2 text-xs tracking-widest focus:outline-none focus:border-white transition-colors min-w-[280px]"
            />
            <button className="bg-white text-black rounded-lg px-10 py-2 font-black tracking-[0.2em] text-[10px] hover:bg-gray-200 transition-all uppercase">
              現在加入
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
