import React, { useState, useEffect } from 'react';
import { Search, Truck, Recycle, Trash2, Info, Menu, X, ExternalLink, AlertTriangle, Leaf, Coffee, Box } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [currentDay, setCurrentDay] = useState('');
  const [isOfficialTruck, setIsOfficialTruck] = useState(false);

  // 模擬資料庫：針對桃園區常見物品與分類標準
  const wasteDatabase = [
    { id: 1, name: '便當盒 (紙製)', category: 'paper-container', label: '紙容器類', instruction: '需去除殘渣，用水略沖洗，壓扁後回收。不可混入一般紙類。', icon: <Box className="w-6 h-6" /> },
    { id: 2, name: '披薩盒 (髒污)', category: 'general', label: '一般垃圾', instruction: '若沾有油漬無法清除，請視為一般垃圾丟棄。乾淨部分可撕下回收。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 3, name: '電子發票', category: 'general', label: '一般垃圾', instruction: '感熱紙含有化學塗層，不可回收，請丟一般垃圾。', icon: <Trash2 className="w-6 h-6" /> },
    { id: 4, name: '手搖飲塑膠杯', category: 'plastic', label: '塑膠容器', instruction: '吸管丟一般垃圾，封膜若撕不掉可一起回收，杯身需沖洗。', icon: <Coffee className="w-6 h-6" /> },
    { id: 5, name: '生廚餘 (果皮/菜葉)', category: 'food-waste', label: '廚餘回收', instruction: '桃園推動生熟廚餘全回收，重點是「瀝乾水分」後倒入廚餘桶。', icon: <Leaf className="w-6 h-6" /> },
    { id: 6, name: '熟廚餘 (剩菜/肉類)', category: 'food-waste', label: '廚餘回收', instruction: '請瀝乾水分。硬殼(蛤蜊/骨頭)請丟一般垃圾。', icon: <Leaf className="w-6 h-6" /> },
    { id: 7, name: '行動電源/電池', category: 'hazardous', label: '資源回收 (需分開)', instruction: '絕對不可丟入垃圾車壓縮！需另外交給回收人員或便利商店回收。', icon: <AlertTriangle className="w-6 h-6" /> },
    { id: 8, name: '玻璃瓶', category: 'glass', label: '玻璃類', instruction: '需依照顏色分類 (透明、綠色、褐色)，並分開存放。', icon: <Recycle className="w-6 h-6" /> },
    { id: 9, name: '保麗龍 (乾淨)', category: 'plastic', label: '保麗龍回收', instruction: '桃園區清潔隊有收，但需乾淨無膠帶。若為社區子車請確認廠商是否拒收。', icon: <Box className="w-6 h-6" /> },
    { id: 10, name: '床墊/沙發', category: 'bulky', label: '巨大垃圾', instruction: '需先聯絡桃園區清潔中隊預約 (03-332-8419)，或依社區管委會規定時間放置。', icon: <Truck className="w-6 h-6" /> },
  ];

  useEffect(() => {
    const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const d = new Date();
    setCurrentDay(days[d.getDay()]);
  }, []);

  const filteredItems = wasteDatabase.filter(item =>
    item.name.includes(searchTerm) ||
    item.category.includes(searchTerm) ||
    item.label.includes(searchTerm)
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case 'general': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'paper-container': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'plastic': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'food-waste': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'hazardous': return 'bg-amber-50 text-amber-700 border-amber-400';
      case 'glass': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'bulky': return 'bg-violet-50 text-violet-700 border-violet-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const renderIcon = (item) => {
    return item.icon;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-emerald-600/90 backdrop-blur-md text-white border-b border-emerald-500/30">
        <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Recycle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">桃園幸福社區</h1>
              <p className="text-[10px] text-emerald-100 uppercase tracking-widest font-medium">Waste Classification Helper</p>
            </div>
          </div>
          <div className="bg-emerald-700/50 px-3 py-1.5 rounded-full border border-emerald-400/30 shadow-inner">
            <span className="text-xs font-semibold whitespace-nowrap">今日: {currentDay}</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-8 space-y-8">
        {/* Search Hero */}
        <div className="relative group animate-slide-up">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-white p-8 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50">
            <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">今天想丟什麼？</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="搜尋物品 (例：便當盒、電池...)"
                className="w-full p-5 pl-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white focus:outline-none transition-all text-lg shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            </div>

            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {['廚餘', '紙容器', '電池'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  {tag === '廚餘' ? '🍃' : tag === '紙容器' ? '🍱' : '🔋'} {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        {searchTerm ? (
          <div className="space-y-4 animate-slide-up">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wider">搜尋結果</h3>
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs font-bold text-rose-500 flex items-center gap-1 hover:bg-rose-50 px-2 py-1 rounded-lg transition"
              >
                <X className="w-3 h-3" /> 清除
              </button>
            </div>

            <div className="grid gap-4">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-5 items-start transition-all hover:shadow-md hover:border-emerald-100 group">
                    <div className={`p-4 rounded-2xl ${getCategoryColor(item.category)} bg-opacity-30 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      {renderIcon(item)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h4 className="font-bold text-lg text-slate-800">{item.name}</h4>
                        <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md border-2 ${getCategoryColor(item.category)}`}>
                          {item.label}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.instruction}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium italic">找不到相關記錄，建議諮詢管委會</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-slide-up">
            {/* Status Card */}
            <div className="relative overflow-hidden bg-white p-6 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 rotate-12">
                <Truck className="w-32 h-32" />
              </div>

              <div className="flex justify-between items-center mb-6 relative">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                  <h3 className="font-bold text-slate-800 text-lg">社區清運狀態</h3>
                </div>
                <button
                  onClick={() => setIsOfficialTruck(!isOfficialTruck)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isOfficialTruck ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}
                >
                  {isOfficialTruck ? '政府清運模式' : '社區子車模式'}
                </button>
              </div>

              <div className="space-y-4 relative">
                {isOfficialTruck ? (
                  <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 space-y-3">
                    <p className="text-sm font-medium text-amber-900 flex items-start gap-2">
                      <span className="mt-1">●</span>
                      桃園區每週三、週日不收垃圾。
                    </p>
                    <div className="flex items-center gap-3">
                      <div className={`px-4 py-2 rounded-xl text-sm font-black ${(currentDay === '週三' || currentDay === '週日') ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                        今日狀況: {(currentDay === '週三' || currentDay === '週日') ? '休息中 🚫' : '收運中 ✅'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">開放時間</p>
                      <p className="text-sm font-black text-slate-700">B1 垃圾場 24H</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">主要規定</p>
                      <p className="text-sm font-black text-slate-700">廚餘必瀝乾</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Categories */}
            <div>
              <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                <Menu className="w-5 h-5 text-emerald-600" />
                快捷分類
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: '一般垃圾', icon: <Trash2 />, color: 'bg-slate-100 text-slate-600', query: '一般垃圾' },
                  { title: '資源回收', icon: <Recycle />, color: 'bg-blue-100 text-blue-600', query: '資源回收' },
                  { title: '廚餘回收', icon: <Leaf />, color: 'bg-emerald-100 text-emerald-600', query: '廚餘' },
                  { title: '巨大垃圾', icon: <Truck />, color: 'bg-violet-100 text-violet-600', query: '巨大垃圾' }
                ].map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchTerm(cat.query)}
                    className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center group active:scale-95"
                  >
                    <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform`}>
                      {React.cloneElement(cat.icon, { className: 'w-6 h-6' })}
                    </div>
                    <span className="font-bold text-sm text-slate-700">{cat.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 p-8 border border-slate-50">
              <h3 className="font-bold text-slate-800 text-lg mb-6">實用連結</h3>
              <div className="space-y-4">
                <a href="https://route.tyoem.gov.tw/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-emerald-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100">
                      <Truck className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm text-slate-700">桃園市垃圾車即時動態</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </a>

                <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">桃園區清潔中隊</p>
                    <p className="text-sm font-black text-amber-900">03-332-8419 (巨大垃圾預約)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modern Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 px-8 py-4 flex justify-between items-center z-[100] safe-area-bottom">
        <button
          className={`flex flex-col items-center gap-1.5 transition-all ${!searchTerm && activeTab === 'home' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
          onClick={() => { setSearchTerm(''); setActiveTab('home'); }}
        >
          <Menu className={`w-6 h-6 ${!searchTerm && activeTab === 'home' ? 'fill-emerald-600/10' : ''}`} />
          <span className="text-[10px] font-black uppercase tracking-tighter">首頁</span>
        </button>

        <div className="relative -top-3">
          <button
            className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all border-4 border-white"
            onClick={() => { document.querySelector('input')?.focus(); setActiveTab('search'); }}
          >
            <Search className="w-6 h-6" />
          </button>
        </div>

        <button
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'guide' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
          onClick={() => setActiveTab('guide')}
        >
          <Info className={`w-6 h-6 ${activeTab === 'guide' ? 'fill-emerald-600/10' : ''}`} />
          <span className="text-[10px] font-black uppercase tracking-tighter">指南</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
