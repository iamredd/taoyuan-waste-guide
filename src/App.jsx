import React, { useState, useEffect } from 'react';
import { Search, Truck, Recycle, Trash2, Info, Menu, X, ExternalLink, AlertTriangle, Leaf, Coffee, Box, Smartphone, Droplets, Monitor, MousePointer2 } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState(''); // 只有按下按鈕後才更新
  const [activeTab, setActiveTab] = useState('home');
  const [currentDay, setCurrentDay] = useState('');
  const [isOfficialTruck, setIsOfficialTruck] = useState(false);

  // 完整資料庫
  const wasteDatabase = [
    { id: 1, name: '舊報紙/書籍/影印紙', category: 'paper', label: '廢紙類', instruction: '整理平整並用繩索束好。注意：沾有油漬的廢紙請丟一般垃圾。', icon: <Box className="w-6 h-6" /> },
    { id: 2, name: '紙箱/瓦楞紙', category: 'paper', label: '廢紙類', instruction: '必須拆開壓扁。若紙箱有過多膠帶請撕掉。', icon: <Box className="w-6 h-6" /> },
    { id: 3, name: '便當盒 (紙製)', category: 'paper-container', label: '紙容器類', instruction: '需去除殘渣，用水略沖洗，壓扁後回收。不可混入一般紙類！', icon: <Box className="w-6 h-6" /> },
    { id: 4, name: '鋁箔包 (牛奶/果汁盒)', category: 'paper-container', label: '紙容器類', instruction: '需喝乾淨、壓扁回收。內層含錫箔或塑膠膜。', icon: <Box className="w-6 h-6" /> },
    { id: 5, name: '手搖飲塑膠杯 (PP)', category: 'plastic', label: '塑膠容器', instruction: '吸管丟一般垃圾，封膜若撕不掉可一起回收，杯身需沖洗。', icon: <Coffee className="w-6 h-6" /> },
    { id: 6, name: '寶特瓶 (PET)', category: 'plastic', label: '塑膠容器', instruction: '內部需清空沖洗，瓶蓋可一起回收。', icon: <Droplets className="w-6 h-6" /> },
    { id: 7, name: '塑膠袋 (乾淨/可透光)', category: 'plastic', label: '塑膠袋回收', instruction: '必須是乾淨、無油垢且可透光的袋子，請打結整理。', icon: <Recycle className="w-6 h-6" /> },
    { id: 8, name: '鐵罐/鋁罐', category: 'metal', label: '鐵鋁罐', instruction: '倒空殘餘內容物後回收。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 9, name: '殺蟲劑/噴漆罐', category: 'hazardous', label: '易燃容器', instruction: '需先在通風處排空內容物點火確認噴不出東西。', icon: <AlertTriangle className="w-6 h-6" /> },
    { id: 10, name: '生廚餘 (果皮/菜葉)', category: 'food-waste', label: '生廚餘', instruction: '桃園推動全回收，重點是「瀝乾水分」。', icon: <Leaf className="w-6 h-6" /> },
    { id: 11, name: '熟廚餘 (剩菜/肉類)', category: 'food-waste', label: '熟廚餘', instruction: '請瀝乾水分。硬殼(蛤蜊/大骨頭)請丟一般垃圾。', icon: <Leaf className="w-6 h-6" /> },
    { id: 12, name: '中藥渣/咖啡渣/茶渣', category: 'food-waste', label: '生廚餘', instruction: '屬於有機廢棄物，請倒入生廚餘桶。', icon: <Leaf className="w-6 h-6" /> },
    { id: 13, name: '行動電源/廢電池', category: 'hazardous', label: '資源回收 (需分開)', instruction: '絕對不可丟入垃圾車壓縮！需另外交給回收人員或便利商店。', icon: <Smartphone className="w-6 h-6" /> },
    { id: 14, name: '日光燈管/省電燈泡', category: 'hazardous', label: '廢燈管', instruction: '需完整，不可打破。若打破請用堅厚紙包妥並註明。', icon: <Monitor className="w-6 h-6" /> },
    { id: 15, name: '廢棄藥品/藥水', category: 'general', label: '一般垃圾', instruction: '藥水需倒入吸水物質(如衛生紙)後裝袋丟一般垃圾。不可倒入馬桶。藥片亦同。', icon: <AlertTriangle className="w-6 h-6" /> },
    { id: 16, name: '衛生紙/紙尿褲', category: 'general', label: '一般垃圾', instruction: '個人衛生用品一律不可回收。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 17, name: '披薩盒 (沾滿油垢)', category: 'general', label: '一般垃圾', instruction: '沾有過多油脂與醬料的紙盒無法回收。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 18, name: '保麗龍 (髒污/含膠帶)', category: 'general', label: '一般垃圾', instruction: '嚴重髒污或帶有過多標籤膠帶的保麗龍難以資收。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 19, name: '床墊/沙發/舊家具', category: 'bulky', label: '巨大垃圾', instruction: '需事先撥打清潔隊預約專線 (桃園區: 03-332-8419)。', icon: <Truck className="w-6 h-6" /> },
  ];

  useEffect(() => {
    const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const d = new Date();
    setCurrentDay(days[d.getDay()]);
  }, []);

  // 動態建議標籤：根據目前輸入的內容過濾
  const getDynamicSuggestions = () => {
    if (!searchTerm) {
      return ['廚餘', '電池', '紙容器', '廢紙']; // 預設推薦
    }
    // 從資料庫中找尋匹配的名稱或標籤
    const matches = wasteDatabase
      .filter(item => item.name.includes(searchTerm) || item.label.includes(searchTerm))
      .map(item => item.name.split('/')[0].split('(')[0].trim()) // 簡化名稱
      .filter((value, index, self) => self.indexOf(value) === index) // 去重
      .slice(0, 4); // 最多顯示 4 個

    return matches.length > 0 ? matches : ['一般垃圾', '資源回收'];
  };

  const handleSearch = (query) => {
    const finalQuery = query || searchTerm;
    if (!finalQuery) return;
    setSubmittedQuery(finalQuery);
    setSearchTerm(finalQuery);
    setActiveTab('search-results');
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSubmittedQuery('');
    setActiveTab('home');
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
      case 'bulky': return 'bg-violet-50 text-violet-700 border-violet-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      {/* Header */}
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
            <span className="text-xs font-semibold">今日: {currentDay}</span>
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
                placeholder="輸入名稱 (例：便當盒、電池...)"
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

          {/* Dynamic Suggestions */}
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

        {/* Results Area - 僅在提交後顯示 */}
        {submittedQuery && (
          <div className="space-y-4 animate-slide-up">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest">
                「{submittedQuery}」的查詢結果
              </h3>
              <button onClick={clearSearch} className="text-xs font-bold text-rose-500 flex items-center gap-1 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors">
                <X className="w-3 h-3" /> 清除結果
              </button>
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
                      <p className="text-slate-600 text-sm leading-relaxed">{item.instruction}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                  <Info className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">找不到關於「{submittedQuery}」的紀錄<br /><span className="text-xs text-slate-400 italic">建議依照「一般垃圾」處理或詢問社區管理員</span></p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dashboard View - 搜尋前顯示的有用資訊 */}
        {!submittedQuery && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm flex items-start gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <Info className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-800 text-sm mb-1">使用提醒</h3>
                <p className="text-xs text-emerald-700 leading-relaxed">輸入完成後請點擊「搜尋」按鈕或下方的建議標籤。精確的分類有助於環境永續！</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
                <Truck className="w-8 h-8 text-blue-500 mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">桃園市垃圾車</p>
                <a href="https://route.tyoem.gov.tw/" target="_blank" rel="noreferrer" className="text-xs font-black text-slate-700 flex items-center gap-1">即時動態 <ExternalLink className="w-3 h-3" /></a>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
                <AlertTriangle className="w-8 h-8 text-amber-500 mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">巨大垃圾預約</p>
                <p className="text-xs font-black text-slate-700">03-332-8419</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-10 py-4 flex justify-between items-center z-50">
        <button onClick={clearSearch} className={`flex flex-col items-center gap-1 ${!submittedQuery ? 'text-emerald-600' : 'text-slate-400'}`}>
          <Menu className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase">選單</span>
        </button>
        <button className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl -mt-10 border-4 border-white">
          <Search className="w-6 h-6" />
        </button>
        <button onClick={() => { }} className="flex flex-col items-center gap-1 text-slate-400">
          <Info className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase">指南</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
