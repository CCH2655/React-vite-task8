function Pagination({ pagination, changePage }) {
  const handleClick = (event, page) => {
    event.preventDefault();
    if (page < 1 || page > pagination.total_pages) return;
    changePage(page);
  };

  if (!pagination.total_pages) return null;

  return (
    <nav aria-label="Page navigation" className="my-8">
      <ul className="flex items-center gap-1">
        {/* 上一頁 */}
        <li>
          <a
            href="/"
            aria-label="Previous"
            /* 1. 在父層加上 group */
            className={`group flex items-center justify-center w-8 h-8 text-xs rounded border transition-all ${
              pagination.has_pre
                ? "border-gray-200 text-gray-600 hover:bg-black cursor-pointer"
                : "border-gray-100 text-gray-300 cursor-not-allowed"
            }`}
            onClick={(event) => handleClick(event, pagination.current_page - 1)}
          >
            {/* 2. 在 i 標籤加入 group-hover:text-white */}
            <i
              className={`fas fa-chevron-left transition-colors ${
                pagination.has_pre ? "group-hover:text-white" : ""
              }`}
            ></i>
          </a>
        </li>

        {/* 頁碼 */}
        {Array.from({ length: pagination.total_pages }, (_, i) => (
          <li key={`${i}_page`}>
            <a
              className={`flex items-center justify-center w-8 h-8 text-xs font-bold rounded border transition-all ${
                i + 1 === pagination.current_page
                  ? "bg-black text-white border-black shadow-sm"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-black cursor-pointer"
              }`}
              href="/"
              onClick={(event) => handleClick(event, i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}

        {/* 下一頁 */}
        <li>
          <a
            href="/"
            aria-label="Next"
            className={`group no-underline flex items-center justify-center w-8 h-8 text-xs rounded border transition-all ${
              pagination.has_next
                ? "border-gray-200 text-gray-600 hover:bg-black cursor-pointer"
                : "border-gray-100 text-gray-300 cursor-not-allowed"
            }`}
            onClick={(event) => handleClick(event, pagination.current_page + 1)}
          >
            <i
              className={`fas fa-chevron-right no-underline transition-colors ${
                pagination.has_next ? "group-hover:text-white" : "!text-black"
              }`}
            ></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;

// function Pagination({ pagination, changePage }) {

//    const handleClick = (event, page) => {
//     event.preventDefault();
//     changePage(page);
//   };

//   return (
//     <nav aria-label="Page navigation example">
//       <ul className="pagination">
//         <li className="page-item">
//           <a
//             herf="/"
//             aria-label="Previous"
//             className={`page-link ${pagination.has_pre ? 'cursor-pointer' : 'disabled'}`}
//             onClick={(event) => handleClick(event, pagination.current_page - 1)}
//           >
//             <span aria-hidden="true">«</span>
//           </a>
//         </li>

//         {
//           Array.from({ length: pagination.total_pages }, (_, i) => (
//             <li className="page-item" key={`${i}_page`}>
//               <a
//                 className={`page-link ${
//                   i + 1 === pagination.current_page && 'active'
//                 }`}
//                 href="/"
//                 onClick={(event) => handleClick(event, i + 1)}
//               >
//                 {i + 1}
//               </a>
//             </li>
//           ))
//         }

//         <li className="page-item">
//           <a
//             herf="/"
//             aria-label="Next"
//             className={`page-link ${pagination.has_next ? 'cursor-pointer' : 'disabled'}`}
//             onClick={(event) => handleClick(event, pagination.current_page + 1)}
//           >
//             <span aria-hidden="true">»</span>
//           </a>
//         </li>
//       </ul>
//     </nav>
// 	);
// }

// export default Pagination
