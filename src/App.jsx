import React, { useState, useEffect } from 'react';
import { Search, Truck, Recycle, Trash2, Info, Menu, X, ExternalLink, AlertTriangle, Leaf, Coffee, Box, Smartphone, Droplets, Monitor, Umbrella, Shirt, Ghost, Zap, Wind, Printer, FlaskConical } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  // 根據環境部標準與環保百科擴充的資料庫
  const wasteDatabase = [
    // --- 資源垃圾 (公告回收項目) ---
    { id: 1, name: '廢乾電池/水銀電池', category: 'resource', label: '資源垃圾', instruction: '處理：應與一般垃圾分開，交付資源回收車、超商或量販店回收箱。', icon: <Zap className="w-6 h-6" /> },
    { id: 2, name: '廢資訊物品 (電腦/螢幕/印表機)', category: 'resource', label: '資源垃圾', instruction: '處理：包含主機、顯示器。印表機建議連同「碳粉匣」分開處理或一併交付資收車。', icon: <Monitor className="w-6 h-6" /> },
    { id: 3, name: '廢電子電器 (電視/冰箱/洗衣機)', category: 'resource', label: '資源垃圾', instruction: '處理：大型家電可聯繫清潔隊或逆向回收通路。不可隨意棄置路邊。', icon: <Monitor className="w-6 h-6" /> },
    { id: 4, name: '廢照明光源 (燈管/燈泡)', category: 'resource', label: '資源垃圾', instruction: '處理：需完整不可打破。含汞燈管若打破，需用厚紙包妥並標註。', icon: <Zap className="w-6 h-6" /> },

    // --- 環境部百科特定品項 ---
    { id: 26, name: '水銀體溫計', category: 'resource', label: '資源垃圾', instruction: '狀態：含汞危險品。處理：破碎時「禁止使用吸塵器」，應用紙板或膠帶收集汞滴放入密封罐。完整品請單獨袋裝交資源回收車。', icon: <FlaskConical className="w-6 h-6" /> },
    { id: 27, name: '碳粉匣/墨水匣', category: 'resource', label: '資源垃圾', instruction: '理由：內含化學物質。處理：建議交由原廠回收點、門市或單獨交給資源回收車，避免粉塵污染。', icon: <Printer className="w-6 h-6" /> },
    { id: 10, name: '廢光碟片/手機/充電器', category: 'resource', label: '資源垃圾', instruction: '注意：廢光碟片目前為強制回收項目，不可當作一般垃圾丟棄。', icon: <Smartphone className="w-6 h-6" /> },

    // --- 容器類 ---
    { id: 7, name: '廢紙容器 (便當盒/咖啡杯/鋁箔包)', category: 'resource', label: '資源垃圾', instruction: '重點：含有塑膠淋膜。處理：需去除殘渣並洗淨，壓扁後回收。不可混入一般廢紙！', icon: <Box className="w-6 h-6" /> },
    { id: 24, name: '農藥廢容器', category: 'resource', label: '資源垃圾', instruction: '安全性：三沖三洗，洗滌液倒入噴霧器。瓶蓋鎖緊後單獨交付資收車。', icon: <AlertTriangle className="w-6 h-6" /> },

    // --- 廚餘與一般垃圾 ---
    { id: 11, name: '生廚餘 (果皮/菜葉)', category: 'food-waste', label: '廚餘', instruction: '用途：堆肥。重點：瀝乾水分。硬核(芒果核)請丟一般垃圾。', icon: <Leaf className="w-6 h-6" /> },
    { id: 12, name: '熟廚餘 (剩飯菜)', category: 'food-waste', label: '廚餘', instruction: '用途：養豬。重點：不可混入硬殼(大骨、蛤蜊)，會損壞機器，應歸一般垃圾。', icon: <Leaf className="w-6 h-6" /> },
    { id: 13, name: '口罩/衛生紙', category: 'general', label: '一般垃圾', instruction: '處理：個人衛生用品不回收，請打包完整丟垃圾車。', icon: <Ghost className="w-6 h-6" /> },
    { id: 19, name: '陶瓷碗盤/花瓶', category: 'general', label: '一般垃圾', instruction: '定義：屬不燃性廢棄物，不可回收。請包妥後標註「不燃物」丟棄。', icon: <Trash2 className="w-6 h-6" /> },

    // --- 巨大與特殊 ---
    { id: 191, name: '床墊/舊家具 (巨大廢棄物)', category: 'bulky', label: '巨大垃圾', instruction: '處理：修繕後可再利用。廢棄需事先向清潔隊預約 (桃園區: 03-332-8419)。', icon: <Truck className="w-6 h-6" /> },
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
    if (!searchTerm) return ['體溫計', '光碟', '碳粉匣', '農藥瓶', '舊衣'];
    const matches = wasteDatabase
      .filter(item => item.name.includes(searchTerm) || item.label.includes(searchTerm))
      .map(item => item.name.split('/')[0].split('(')[0].trim())
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 4);
    return matches.length > 0 ? matches : ['一般垃圾', '資源垃圾'];
  };

  const handleSearch = (q) => {
    const final = q || searchTerm;
    if (!final) return;
    setSubmittedQuery(final);
    setSearchTerm(final);
  };

  const filteredItems = wasteDatabase.filter(item =>
    item.name.toLowerCase().includes(submittedQuery.toLowerCase()) ||
    item.label.toLowerCase().includes(submittedQuery.toLowerCase())
  );

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'general': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'resource': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'food-waste': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'bulky': return 'bg-violet-50 text-violet-700 border-violet-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      <header className="sticky top-0 z-50 bg-emerald-700 text-white shadow-lg">
        <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl"><Recycle className="w-6 h-6" /></div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">環境部回收百科</h1>
              <p className="text-[10px] text-emerald-100 uppercase tracking-widest font-medium">桃園社區 · 分三類好OK</p>
            </div>
          </div>
          <div className="bg-emerald-800 px-3 py-1.5 rounded-full border border-emerald-500/30">
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
                placeholder="搜尋 (例：體溫計、光碟、碳粉匣...)"
                className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white focus:outline-none transition-all text-lg shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
            <button type="submit" className="bg-emerald-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-600/20">
              搜尋
            </button>
          </form>

          <div className="mt-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase text-center mb-3 tracking-widest">
              {searchTerm ? '您是不是要找...' : '重點百科項目'}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {getDynamicSuggestions().map(tag => (
                <button key={tag} onClick={() => handleSearch(tag)} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm active:scale-95">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {submittedQuery ? (
          <div className="space-y-4 animate-slide-up">
            <h3 className="px-2 font-bold text-slate-500 text-xs uppercase tracking-widest">
              「{submittedQuery}」的百科處置建議：
            </h3>
            <div className="grid gap-4">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-5 items-start transition-all hover:shadow-md animate-slide-up">
                    <div className={`p-4 rounded-xl ${getCategoryColor(item.category)} bg-opacity-30`}>{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg text-slate-800">{item.name}</h4>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${getCategoryColor(item.category)}`}>{item.label}</span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.instruction}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                  <Info className="w-10 h-10 text-slate-300 mx-auto mb-3" /><p className="text-slate-500 font-medium">查無結果</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-slide-up">
            {/* 環保百科亮點區塊 (提煉自環境部) */}
            <div>
              <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-600" />
                環保百科 QA 重點
              </h3>
              <div className="space-y-4 text-left">
                <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 text-sm mb-3">清除與處理：體溫計打破怎麼辦？</h4>
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    不可使用吸塵器或掃把，避免汞蒸汽擴散。應用硬紙片、膠帶收集汞珠，放入裝有水的密封容器，並標註「內含有毒水銀」交付回收車。
                  </p>
                </div>
                <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-900 text-sm mb-3">再利用：在辦公室怎麼用紙最環保？</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    推行雙面列印，廢棄紙張若為乾淨紙張應回收。沾有油漬（如外送紙盒墊紙）或複寫紙、蠟紙則屬一般垃圾。
                  </p>
                </div>
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 text-sm mb-3">回收：資源回收資訊專線</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    若有任何回收疑問，可撥打資源回收免付費專線 **0800-085717** (您幫我，清一清)，獲得最準確的分類協助。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-800 text-sm mb-1">強制回收項目</h3>
                <p className="text-xs text-amber-700 leading-relaxed">廢光碟片目前為公告強制回收項目，請務必與一般垃圾分開！</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-10 py-4 flex justify-between items-center z-50">
        <button onClick={() => setSearchTerm('')} className={`flex flex-col items-center gap-1 ${!submittedQuery ? 'text-emerald-700' : 'text-slate-400'}`}>
          <Menu className="w-6 h-6" /><span className="text-[10px] font-black uppercase">百科重點</span>
        </button>
        <button className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl -mt-10 border-4 border-white"><Search className="w-6 h-6" /></button>
        <a href="https://hwms.moenv.gov.tw/dispPageBox/pubweb/pubwebHP.aspx?ddsPageID=EPATW1" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 text-slate-400">
          <Info className="w-6 h-6" /><span className="text-[10px] font-black uppercase">官方連結</span>
        </a>
      </nav>
    </div>
  );
};

export default App;
