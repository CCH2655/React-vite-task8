function Footer() {
  const brandName = "紙葉之境";

  return (
    <footer className="bg-gray-950 text-gray-400 py-2">
      <div className="container mx-auto px-4 lg:px-20">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-800 pb-2">
          {/* 左側：品牌 Logo */}
          <div className="text-center md:text-left">
            <div className="text-white text-xl font-serif italic tracking-widest leading-none mb-1">
              {brandName}
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] font-light opacity-60">
              Fine Books & Curated Reading
            </div>
          </div>

          {/* 中間：導覽按鈕 (改為 button) */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold tracking-[0.1em] uppercase">
            <button className="hover:text-white transition-colors cursor-pointer">關於我們</button>
            <button className="hover:text-white transition-colors cursor-pointer">探索書籍</button>
            <button className="hover:text-white transition-colors cursor-pointer">閱讀指南</button>
            <button className="hover:text-white transition-colors cursor-pointer">聯絡資訊</button>
          </div>

        </div>

        {/* 底部：版權宣告 */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2 text-xs tracking-[0.2em] uppercase font-light">
          <p>© 2026 {brandName}. All Rights Reserved.</p>
          <div className="flex gap-4 md:mt-0 opacity-40">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;