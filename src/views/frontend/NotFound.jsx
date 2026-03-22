import React from 'react';

const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* 狀態碼 */}
        <p className="text-base font-semibold text-indigo-600">404</p>
        
        {/* 主要標題 */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          找不到內容
        </h1>
        
        {/* 輔助說明 */}
        <p className="mt-6 text-base leading-7 text-gray-600">
          抱歉，我們找不到您要尋找的頁面。它可能已經被移動或刪除了。
        </p>

        {/* 按鈕區域 */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            回首頁
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;