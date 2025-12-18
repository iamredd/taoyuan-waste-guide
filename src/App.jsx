import React, { useState, useEffect } from 'react';
import { Search, Truck, Recycle, Trash2, Info, Menu, X, ExternalLink, AlertTriangle, Leaf, Coffee, Box, Smartphone, Droplets, Monitor, Umbrella, Shirt, Ghost } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  // 擴充後的台灣標準資料庫
  const wasteDatabase = [
    // --- 廢紙與紙容器 ---
    { id: 1, name: '舊報紙/書籍/影印紙', category: 'paper', label: '廢紙類', instruction: '狀態：乾燥且乾淨。處理：整理平整並用繩索束好。注意：沾有油漬、水漬後即轉為「一般垃圾」。', icon: <Box className="w-6 h-6" /> },
    { id: 2, name: '紙箱/瓦楞紙', category: 'paper', label: '廢紙類', instruction: '狀態：無膠帶、無蠟。處理：必須拆開壓扁。若含有塑膠塗膜(如冷凍箱)請視為紙容器。', icon: <Box className="w-6 h-6" /> },
    { id: 3, name: '便當盒 (紙製)', category: 'paper-container', label: '紙容器類', instruction: '定義：內有淋膜。處理：需去除殘渣並用水略沖洗，壓扁後回收。不可混合一般廢紙！', icon: <Box className="w-6 h-6" /> },
    { id: 4, name: '鋁箔包 (牛奶/果汁/利樂包)', category: 'paper-container', label: '紙容器類', instruction: '處理：喝乾淨後壓扁。若內部有明顯發霉則轉為「一般垃圾」。', icon: <Box className="w-6 h-6" /> },

    // --- 塑膠類 ---
    { id: 5, name: '養樂多瓶/優酪乳瓶', category: 'plastic', label: '塑膠容器', instruction: '定義：標誌 6 號(PS)或 2 號(HDPE)。處理：吸管丟一般垃圾，鋁膜封口撕掉，瓶身沖洗後回收。', icon: <Droplets className="w-6 h-6" /> },
    { id: 6, name: '手搖飲塑膠杯 (PP)', category: 'plastic', label: '塑膠容器', instruction: '處理：封膜若撕不掉可一起回收，但殘餘飲料必須倒乾洗淨，否則轉為一般垃圾。', icon: <Coffee className="w-6 h-6" /> },
    { id: 7, name: '寶特瓶 (PET)', category: 'plastic', label: '塑膠容器', instruction: '標誌：1 號。處理：倒空並壓縮，瓶蓋與瓶身可一起回收。', icon: <Droplets className="w-6 h-6" /> },
    { id: 8, name: '塑膠袋 (乾淨/可透光)', category: 'plastic', label: '塑膠袋回收', instruction: '判斷：必須是乾淨、無油垢。處理：打結整理。注意：有鋁箔塗層(如零食袋)一律是「一般垃圾」。', icon: <Recycle className="w-6 h-6" /> },
    { id: 9, name: '雞蛋盒 (透明塑膠)', category: 'plastic', label: '塑膠容器', instruction: '定義：PET 材質。處理：洗淨後回收。注意：紙漿類雞蛋盒請丟廢紙類。', icon: <Box className="w-6 h-6" /> },

    // --- 金屬與瓶罐 ---
    { id: 10, name: '鐵罐/鋁罐', category: 'metal', label: '鐵鋁罐', instruction: '狀態：無殘留內容物。處理：稍作沖洗後回收。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 11, name: '瓦斯罐/殺蟲劑/噴漆罐', category: 'hazardous', label: '易燃容器', instruction: '危險：絕對不可直接丟垃圾車！處理：在通風處排空，交由回收人員並口頭提醒，避免壓縮起火。', icon: <AlertTriangle className="w-6 h-6" /> },

    // --- 廚餘類 ---
    { id: 12, name: '生廚餘 (果皮/菜葉)', category: 'food-waste', label: '生廚餘', instruction: '用途：堆肥。重點：「瀝乾水分」。注意：堅硬果核(芒果/荔枝核)丟一般垃圾。', icon: <Leaf className="w-6 h-6" /> },
    { id: 13, name: '熟廚餘 (剩菜/肉類)', category: 'food-waste', label: '熟廚餘', instruction: '用途：養豬。重點：不可混入堅硬物(蛤蜊殼、粗大骨頭、玉米心)，這些會損壞磨碎機，需丟一般垃圾。', icon: <Leaf className="w-6 h-6" /> },

    // --- 一般垃圾 (常見誤區) ---
    { id: 14, name: '口罩 (醫療/防護)', category: 'general', label: '一般垃圾', instruction: '狀態：不論新舊。定義：屬複合材質且有防疫風險，不可回收，請對折裝袋丟棄。', icon: <Ghost className="w-6 h-6" /> },
    { id: 15, name: '暖暖包 (使用後)', category: 'general', label: '一般垃圾', instruction: '定義：內含鐵粉、活性碳。不可回收，用完直接丟一般垃圾。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 16, name: '吸管 (塑膠/拋棄式)', category: 'general', label: '一般垃圾', instruction: '定義：體積過小且多沾有唾液或油漬，回收效益低，一律丟一般垃圾。', icon: <Coffee className="w-6 h-6" /> },
    { id: 17, name: '橡皮筋/膠帶', category: 'general', label: '一般垃圾', instruction: '定義：橡膠與黏膠，屬於不可回收物質。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 18, name: '衛生紙/紙尿褲', category: 'general', label: '一般垃圾', instruction: '定義：含有纖維與個人廢棄物，即使是乾淨衛生紙也要丟一般垃圾。', icon: <Trash2 className="w-6 h-6" /> },

    // --- 玻璃與陶瓷 ---
    { id: 19, name: '玻璃瓶', category: 'glass', label: '玻璃類', instruction: '處理：完整交給回收車。注意：請依顏色(透明、綠、褐)分類。', icon: <Droplets className="w-6 h-6" /> },
    { id: 20, name: '破碎玻璃/鏡子', category: 'glass', label: '資收(需包妥)', instruction: '狀態：已碎裂。處理：需用厚紙包妥並標註「內有破碎玻璃」，再交給回收人員。', icon: <AlertTriangle className="w-6 h-6" /> },
    { id: 21, name: '陶瓷碗盤/花瓶', category: 'general', label: '一般垃圾', instruction: '注意：陶瓷不屬於玻璃，目前多數地區列為「不燃性一般垃圾/廢陶磁磚」。', icon: <Trash2 className="w-6 h-6" /> },

    // --- 各類家電與 3C ---
    { id: 22, name: '行動電源/鋰電池', category: 'hazardous', label: '有害資收', instruction: '危險：嚴禁丟入垃圾車壓縮！處理：交給通訊行、超商回收箱或資收人員單獨處理。', icon: <Smartphone className="w-6 h-6" /> },
    { id: 23, name: '光碟片 (CD/DVD)', category: 'plastic', label: '資源回收', instruction: '處理：外殼(塑膠)與片體(PC)皆可回收，請移除封面紙張。', icon: <Monitor className="w-6 h-6" /> },

    // --- 舊衣與個人物品 ---
    { id: 24, name: '舊衣 (乾淨/完整)', category: 'textile', label: '舊衣回收', instruction: '判定：可穿用的外衣、外褲。處理：投入舊衣回收箱。注意：髒污、破損、內衣褲、襪子則為「一般垃圾」。', icon: <Shirt className="w-6 h-6" /> },
    { id: 25, name: '雨傘', category: 'metal', label: '資源回收', instruction: '處理：傘骨屬金屬，傘布屬一般垃圾。建議拆解，或整支交給回收車。', icon: <Umbrella className="w-6 h-6" /> },
  ];

  useEffect(() => {
    const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const d = new Date();
    setCurrentDay(days[d.getDay()]);
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setSubmittedQuery('');
    }
  }, [searchTerm]);

  const getDynamicSuggestions = () => {
    if (!searchTerm) {
      return ['養樂多', '口罩', '吸管', '廚餘', '電池'];
    }
    const matches = wasteDatabase
      .filter(item => item.name.includes(searchTerm) || item.label.includes(searchTerm))
      .map(item => item.name.split('/')[0].split('(')[0].trim())
      .filter((value, index, self) => self.indexOf(value) === index)
      .slice(0, 4);

    return matches.length > 0 ? matches : ['一般垃圾', '資源回收'];
  };

  const handleSearch = (query) => {
    const finalQuery = query || searchTerm;
    if (!finalQuery) return;
    setSubmittedQuery(finalQuery);
    setSearchTerm(finalQuery);
  };

  const filteredItems = wasteDatabase.filter(item =>
    item.name.toLowerCase().includes(submittedQuery.toLowerCase()) ||
    item.label.toLowerCase().includes(submittedQuery.toLowerCase())
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case 'general': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'paper': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'paper-container': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'plastic': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'food-waste': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'hazardous': return 'bg-amber-50 text-amber-700 border-amber-400';
      case 'metal': return 'bg-stone-50 text-stone-700 border-stone-200';
      case 'glass': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'textile': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      <header className="sticky top-0 z-50 bg-emerald-600 text-white shadow-md">
        <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Recycle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">桃園幸福社區</h1>
              <p className="text-[10px] text-emerald-100 uppercase tracking-widest font-medium">垃圾分類小幫手</p>
            </div>
          </div>
          <div className="bg-emerald-700 px-3 py-1.5 rounded-full border border-emerald-400/30">
            <span className="text-xs font-semibold whitespace-nowrap">今日: {currentDay}</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-8 space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 animate-slide-up">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">今天想丟什麼？</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="relative flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="輸入名稱 (例：養樂多、口罩...)"
                className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white focus:outline-none transition-all text-lg shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-600/20"
            >
              搜尋
            </button>
          </form>

          <div className="mt-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase text-center mb-3 tracking-widest">
              {searchTerm ? '您是不是要找...' : '常用推薦'}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {getDynamicSuggestions().map(tag => (
                <button
                  key={tag}
                  onClick={() => handleSearch(tag)}
                  className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {submittedQuery ? (
          <div className="space-y-4 animate-slide-up">
            <div className="px-2">
              <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest">
                以下是「{submittedQuery}」的處置建議：
              </h3>
            </div>

            <div className="grid gap-4">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-5 items-start transition-all hover:shadow-md">
                    <div className={`p-4 rounded-xl ${getCategoryColor(item.category)} bg-opacity-30`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg text-slate-800">{item.name}</h4>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${getCategoryColor(item.category)}`}>
                          {item.label}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{item.instruction}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                  <Info className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium italic">找不到明確紀錄，建議依照「一般垃圾」處理<br />或查詢下方官方連結。</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-slide-up">
            {/* Info Tip */}
            <div className="bg-sky-50 p-6 rounded-3xl border border-sky-100 shadow-sm flex items-start gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <Info className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <h3 className="font-bold text-sky-800 text-sm mb-1">小撇步：什麼時候變垃圾？</h3>
                <p className="text-xs text-sky-700 leading-relaxed">
                  大多數資源回收物(如紙、塑膠)只要沾染了**過多油脂、食物殘渣**或**垃圾液體**，無法清洗時，就會從資源變成「一般垃圾」。正確的做法是：倒掉內容物、簡易沖洗。
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-emerald-600" /> 快速連結
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <a href="https://route.tyoem.gov.tw/" target="_blank" rel="noreferrer" className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-emerald-50 transition-colors group">
                  <Truck className="w-8 h-8 text-blue-500 mb-2 mx-auto group-hover:rotate-12 transition-transform" />
                  <p className="text-sm font-black text-slate-700">垃圾車即時動態</p>
                </a>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mb-2 mx-auto" />
                  <p className="text-sm font-black text-slate-700">桃園區資收預約</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">03-332-8419</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-10 py-4 flex justify-between items-center z-50">
        <button onClick={() => setSearchTerm('')} className={`flex flex-col items-center gap-1 ${!submittedQuery ? 'text-emerald-600' : 'text-slate-400'}`}>
          <Menu className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase">選單</span>
        </button>
        <button className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl -mt-10 border-4 border-white active:scale-95 transition-transform">
          <Search className="w-6 h-6" />
        </button>
        <button onClick={() => { }} className="flex flex-col items-center gap-1 text-slate-400">
          <Info className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase">關於</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
