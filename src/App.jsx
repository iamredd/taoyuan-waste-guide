import React, { useState, useEffect } from 'react';
import { Search, Truck, Recycle, Trash2, Info, Menu, X, ExternalLink, AlertTriangle, Leaf, Coffee, Box, Smartphone, Droplets, Monitor, Umbrella, Shirt, Ghost, Zap, Wind } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  // 根據環境部「分三類好ok」標準建立的資料庫
  const wasteDatabase = [
    // --- 資源垃圾 (物品類) ---
    { id: 1, name: '廢乾電池/水銀電池', category: 'resource', label: '資源垃圾', instruction: '處理：應與一般垃圾分開，交付資源回收車、便利商店或量販店回收箱。避免重金屬污染。', icon: <Zap className="w-6 h-6" /> },
    { id: 2, name: '廢資訊物品 (筆電/電腦主機/螢幕)', category: 'resource', label: '資源垃圾', instruction: '處理：包含主機、顯示器、印表機、鍵盤。交付資源回收車或回收商。', icon: <Monitor className="w-6 h-6" /> },
    { id: 3, name: '廢電子電器 (電視/冰箱/洗衣機/冷氣)', category: 'resource', label: '資源垃圾', instruction: '定義：公告回收之大型家電。處理：可連絡清潔隊約定時間回收，或交由逆向回收通路。', icon: <Monitor className="w-6 h-6" /> },
    { id: 4, name: '廢照明光源 (日光燈管/省電燈泡)', category: 'resource', label: '資源垃圾', instruction: '處理：放置於專用回收箱，需完整不可打破。若打破需用厚紙包妥避免割傷回收人員。', icon: <Zap className="w-6 h-6" /> },
    { id: 22, name: '廢輪胎', category: 'resource', label: '資源垃圾', instruction: '處理：應交付資源回收車、輪胎行或維修廠。避免積水孳生蚊蟲。', icon: <Wind className="w-6 h-6" /> },
    { id: 23, name: '廢鉛蓄電池/潤滑油', category: 'resource', label: '資源垃圾', instruction: '定義：機車、汽車更換之廢液與電池。處理：建議交由汽機車維修行逆向回收。', icon: <Droplets className="w-6 h-6" /> },

    // --- 資源垃圾 (容器類) ---
    { id: 5, name: '廢鐵容器/鋁容器 (罐頭/汽水罐)', category: 'resource', label: '資源垃圾', instruction: '處理：倒空殘留物並稍作沖洗，壓扁後交付資源回收車。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 6, name: '廢塑膠容器 (寶特瓶/洗髮精瓶)', category: 'resource', label: '資源垃圾', instruction: '處理：包含 1-7 號塑膠。需洗淨倒空，瓶蓋與瓶身皆可回收。', icon: <Droplets className="w-6 h-6" /> },
    { id: 7, name: '廢紙容器 (便當盒/咖啡杯/鋁箔包)', category: 'resource', label: '資源垃圾', instruction: '定義：含淋膜或鋁箔之包裝。處理：需去除殘渣並洗淨，不可與「廢紙類」混淆！', icon: <Box className="w-6 h-6" /> },
    { id: 8, name: '廢玻璃容器 (酒瓶/化妝品瓶)', category: 'resource', label: '資源垃圾', instruction: '處理：依透明、綠色、褐色分類交付，移除瓶蓋。', icon: <Droplets className="w-6 h-6" /> },
    { id: 24, name: '農藥廢容器', category: 'resource', label: '資源垃圾', instruction: '安全性：需採「三沖三洗」，洗滌液倒入農藥噴霧器後重複使用。瓶蓋需鎖緊後單獨交付回收。', icon: <AlertTriangle className="w-6 h-6" /> },

    // --- 資源垃圾 (其他類) ---
    { id: 9, name: '廢紙類 (報紙/雜誌/紙箱)', category: 'resource', label: '資源垃圾', instruction: '處理：不含塑膠淋膜之一般紙。需攤平疊好並綑綁。注意：沾油紙張轉為一般垃圾。', icon: <Box className="w-6 h-6" /> },
    { id: 10, name: '廢光碟片/行動電話/充電器', category: 'resource', label: '資源垃圾', instruction: '處理：包含手機充電線。交付資源回收車或通訊通路。', icon: <Smartphone className="w-6 h-6" /> },
    { id: 25, name: '舊衣類 (上衣/褲子/裙子)', category: 'resource', label: '資源垃圾', instruction: '定義：可穿用的舊衣。處理：投入舊衣回收箱。襪子、內衣、髒污衣物屬一般垃圾。', icon: <Shirt className="w-6 h-6" /> },

    // --- 廚餘 ---
    { id: 11, name: '生廚餘 (果皮/菜葉/殘渣)', category: 'food-waste', label: '廚餘', instruction: '用途：主要用於堆肥。處理：務必瀝乾水分，不可混入雜物。', icon: <Leaf className="w-6 h-6" /> },
    { id: 12, name: '熟廚餘 (剩飯菜/肉類)', category: 'food-waste', label: '廚餘', instruction: '用途：主要用於養豬。處理：不可混入硬殼(大骨、蛤蜊、玉米心)，這些應歸為一般垃圾。', icon: <Leaf className="w-6 h-6" /> },

    // --- 一般垃圾 ---
    { id: 13, name: '口罩/衛生紙/濕紙巾', category: 'general', label: '一般垃圾', instruction: '原因：屬複合材質或含個人分泌物，不可回收。需打包完整不外露。', icon: <Ghost className="w-6 h-6" /> },
    { id: 14, name: '保麗龍 (髒污/膠帶)', category: 'general', label: '一般垃圾', instruction: '注意：乾淨保麗龍通常可資收，但沾染油垢、泥土或黏有大量膠帶即轉為一般垃圾。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 15, name: '吸管/塑膠膜/膠帶', category: 'general', label: '一般垃圾', instruction: '原因：體積過小或黏性材質，回收效益低，直接丟一般垃圾。', icon: <Coffee className="w-6 h-6" /> },
    { id: 16, name: '暖暖包/乾燥劑', category: 'general', label: '一般垃圾', instruction: '原因：內含鐵粉或化學藥劑，目前不回收。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 17, name: '陶瓷/碗盤碎裂', category: 'general', label: '一般垃圾', instruction: '注意：屬不燃性廢棄物，不可回收。請用厚紙包妥避免割傷。', icon: <Trash2 className="w-6 h-6" /> },
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
      return ['電池', '廚餘', '農藥瓶', '光碟', '舊衣'];
    }
    const matches = wasteDatabase
      .filter(item => item.name.includes(searchTerm) || item.label.includes(searchTerm))
      .map(item => item.name.split('/')[0].split('(')[0].trim())
      .filter((value, index, self) => self.indexOf(value) === index)
      .slice(0, 4);

    return matches.length > 0 ? matches : ['一般垃圾', '資源垃圾', '廚餘'];
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
      case 'resource': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'food-waste': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'hazardous': return 'bg-amber-50 text-amber-700 border-amber-300';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getCategoryTag = (category) => {
    switch (category) {
      case 'resource': return '資源垃圾 (OK)';
      case 'food-waste': return '廚餘 (OK)';
      case 'general': return '一般垃圾';
      default: return '其他';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      {/* 官方配色風格與標題 */}
      <header className="sticky top-0 z-50 bg-emerald-700 text-white shadow-lg">
        <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Recycle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">環境部垃圾強制分類</h1>
              <p className="text-[10px] text-emerald-100 uppercase tracking-widest font-medium">桃園社區 · 分三類好OK</p>
            </div>
          </div>
          <div className="bg-emerald-800 px-3 py-1.5 rounded-full border border-emerald-500/30">
            <span className="text-xs font-semibold whitespace-nowrap">今天: {currentDay}</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-8 space-y-8">
        {/* Search Hero */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 animate-slide-up">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">今天想丟什麼？</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="relative flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="輸入名稱 (例：電池、農藥瓶、廚餘...)"
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
              {searchTerm ? '您是不是要找...' : '環境部重點項目'}
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
                「{submittedQuery}」的官方處置指南：
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
                          {getCategoryTag(item.category)}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.instruction}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                  <Info className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">查無明確定義，建議問問清潔隊員</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-slide-up">
            {/* 官方分類說明卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 text-center">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Recycle className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-blue-800 text-xs uppercase mb-1">資源垃圾</h3>
                <p className="text-[10px] text-blue-600">容器類、物品類、其他類</p>
              </div>
              <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100 text-center">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-emerald-800 text-xs uppercase mb-1">廚餘</h3>
                <p className="text-[10px] text-emerald-600">生(堆肥)、熟(養豬)</p>
              </div>
              <div className="bg-slate-100 p-5 rounded-3xl border border-slate-200 text-center">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Trash2 className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-xs uppercase mb-1">一般垃圾</h3>
                <p className="text-[10px] text-slate-600">其餘不可回收廢棄物</p>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-800 text-sm mb-1">罰則提醒</h3>
                <p className="text-xs text-amber-700 leading-relaxed">
                  未依規定分類者，依廢棄物清理法可處新台幣 **1,200 至 6,000 元** 罰鍰。做好分類，省錢又環保！
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-10 py-4 flex justify-between items-center z-50">
        <button onClick={() => setSearchTerm('')} className={`flex flex-col items-center gap-1 ${!submittedQuery ? 'text-emerald-700' : 'text-slate-400'}`}>
          <Menu className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase">三類分法</span>
        </button>
        <button className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl -mt-10 border-4 border-white">
          <Search className="w-6 h-6" />
        </button>
        <a href="https://hwms.moenv.gov.tw/" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 text-slate-400">
          <Info className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase">官方源</span>
        </a>
      </nav>
    </div>
  );
};

export default App;
