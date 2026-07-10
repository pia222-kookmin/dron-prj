"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabType = "smtp" | "about" | "tech" | "products" | "rental" | "footer";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("smtp");

  // SMTP 환경변수 상태
  const [gmailUser, setGmailUser] = useState("");
  const [gmailAppPassword, setGmailAppPassword] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [smtpSaveStatus, setSmtpSaveStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  // 홈페이지 콘텐츠 상태 (content.json 데이터 저장)
  const [content, setContent] = useState<any>(null);
  const [contentSaveStatus, setContentSaveStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  // 제품/대여 아이템 편집용 모달 상태
  const [editingItemType, setEditingItemType] = useState<"product" | "rental" | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null); // null이면 추가 모드
  const [editingItemData, setEditingItemData] = useState<any>(null);

  // 비밀번호 표시 토글
  const [showPassword, setShowPassword] = useState(false);

  // 로딩 상태 확인
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const res = await fetch("/api/admin/config");
      if (res.ok) {
        const data = await res.json();
        setGmailUser(data.gmailUser);
        setGmailAppPassword(data.gmailAppPassword);
        setReceiverEmail(data.receiverEmail);
        setIsLoggedIn(true);
        // 인증 성공 후 콘텐츠 데이터 로드
        await fetchContent();
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (err) {
      console.error("Failed to fetch content:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        await checkAuthentication();
      } else {
        const data = await res.json();
        setLoginError(data.error || "로그인에 실패했습니다.");
      }
    } catch (err) {
      setLoginError("서버와의 통신에 실패했습니다.");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        setIsLoggedIn(false);
        setContent(null);
        setUsername("");
        setPassword("");
      }
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  // SMTP 설정 저장
  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSmtpSaveStatus({ type: "loading", message: "설정을 저장하는 중..." });

    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gmailUser, gmailAppPassword, receiverEmail }),
      });

      if (res.ok) {
        setSmtpSaveStatus({ type: "success", message: "SMTP 설정이 저장되었습니다." });
        setTimeout(() => setSmtpSaveStatus({ type: "idle", message: "" }), 3000);
      } else {
        const data = await res.json();
        setSmtpSaveStatus({ type: "error", message: data.error || "저장에 실패했습니다." });
      }
    } catch (err) {
      setSmtpSaveStatus({ type: "error", message: "서버 통신 에러가 발생했습니다." });
    }
  };

  // 홈페이지 콘텐츠 저장
  const handleSaveContent = async (updatedContent = content) => {
    setContentSaveStatus({ type: "loading", message: "콘텐츠를 저장하는 중..." });

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContent),
      });

      if (res.ok) {
        setContent(updatedContent);
        setContentSaveStatus({ type: "success", message: "홈페이지 콘텐츠가 성공적으로 저장 및 반영되었습니다!" });
        setTimeout(() => setContentSaveStatus({ type: "idle", message: "" }), 3000);
      } else {
        const data = await res.json();
        setContentSaveStatus({ type: "error", message: data.error || "저장에 실패했습니다." });
      }
    } catch (err) {
      setContentSaveStatus({ type: "error", message: "서버 저장 중 오류가 발생했습니다." });
    }
  };

  // 이미지 업로드 공통 핸들러
  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "업로드 실패");
    }

    const data = await res.json();
    return data.url;
  };

  // 특정 필드의 이미지 업로드 후 적용
  const handleFieldImageChange = async (file: File, updateCallback: (url: string) => void) => {
    try {
      const url = await handleImageUpload(file);
      updateCallback(url);
      alert("이미지가 성공적으로 업로드되었습니다.");
    } catch (err: any) {
      alert(`이미지 업로드 실패: ${err.message}`);
    }
  };

  // 제품/대여 모달 열기
  const openEditModal = (type: "product" | "rental", index: number | null) => {
    setEditingItemType(type);
    setEditingItemIndex(index);

    if (type === "product") {
      if (index !== null) {
        // 기존 제품 수정
        const koProd = content.PRODUCTS_CONTENT.ko.products[index];
        const enProd = content.PRODUCTS_CONTENT.en.products[index];
        setEditingItemData({
          nameKo: koProd.name,
          nameEn: enProd.name,
          categoryKo: koProd.category,
          categoryEn: enProd.category,
          specPowerKo: koProd.specs.power,
          specPowerEn: enProd.specs.power,
          specWeightKo: koProd.specs.weight,
          specWeightEn: enProd.specs.weight,
          specEfficiencyKo: koProd.specs.efficiency,
          specEfficiencyEn: enProd.specs.efficiency,
          descKo: koProd.description,
          descEn: enProd.description,
          image: koProd.image,
        });
      } else {
        // 새 제품 추가
        setEditingItemData({
          nameKo: "",
          nameEn: "",
          categoryKo: "엔진",
          categoryEn: "Engine",
          specPowerKo: "",
          specPowerEn: "",
          specWeightKo: "",
          specWeightEn: "",
          specEfficiencyKo: "",
          specEfficiencyEn: "",
          descKo: "",
          descEn: "",
          image: "",
        });
      }
    } else {
      if (index !== null) {
        // 기존 대여 장비 수정
        const koRent = content.RENTAL_CONTENT.ko.items[index];
        const enRent = content.RENTAL_CONTENT.en.items[index];
        setEditingItemData({
          nameKo: koRent.name,
          nameEn: enRent.name,
          categoryKo: koRent.category,
          categoryEn: enRent.category,
          descKo: koRent.description,
          descEn: enRent.description,
          image: koRent.image,
        });
      } else {
        // 새 대여 장비 추가
        setEditingItemData({
          nameKo: "",
          nameEn: "",
          categoryKo: "상용 드론",
          categoryEn: "Commercial Drone",
          descKo: "",
          descEn: "",
          image: "",
        });
      }
    }
  };

  // 모달 데이터 저장
  const handleSaveModalData = () => {
    const updated = { ...content };

    if (editingItemType === "product") {
      const koProd = {
        name: editingItemData.nameKo,
        category: editingItemData.categoryKo,
        specs: {
          power: editingItemData.specPowerKo,
          weight: editingItemData.specWeightKo,
          efficiency: editingItemData.specEfficiencyKo,
        },
        description: editingItemData.descKo,
        image: editingItemData.image,
      };

      const enProd = {
        name: editingItemData.nameEn,
        category: editingItemData.categoryEn,
        specs: {
          power: editingItemData.specPowerEn,
          weight: editingItemData.specWeightEn,
          efficiency: editingItemData.specEfficiencyEn,
        },
        description: editingItemData.descEn,
        image: editingItemData.image,
      };

      if (editingItemIndex !== null) {
        updated.PRODUCTS_CONTENT.ko.products[editingItemIndex] = koProd;
        updated.PRODUCTS_CONTENT.en.products[editingItemIndex] = enProd;
      } else {
        updated.PRODUCTS_CONTENT.ko.products.push(koProd);
        updated.PRODUCTS_CONTENT.en.products.push(enProd);
      }
    } else if (editingItemType === "rental") {
      const koRent = {
        name: editingItemData.nameKo,
        category: editingItemData.categoryKo,
        description: editingItemData.descKo,
        image: editingItemData.image,
      };

      const enRent = {
        name: editingItemData.nameEn,
        category: editingItemData.categoryEn,
        description: editingItemData.descEn,
        image: editingItemData.image,
      };

      if (editingItemIndex !== null) {
        updated.RENTAL_CONTENT.ko.items[editingItemIndex] = koRent;
        updated.RENTAL_CONTENT.en.items[editingItemIndex] = enRent;
      } else {
        updated.RENTAL_CONTENT.ko.items.push(koRent);
        updated.RENTAL_CONTENT.en.items.push(enRent);
      }
    }

    setContent(updated);
    handleSaveContent(updated);
    setEditingItemType(null);
  };

  // 제품/대여 아이템 삭제
  const handleDeleteItem = (type: "product" | "rental", index: number) => {
    if (!confirm("정말로 이 아이템을 삭제하시겠습니까?")) return;

    const updated = { ...content };
    if (type === "product") {
      updated.PRODUCTS_CONTENT.ko.products.splice(index, 1);
      updated.PRODUCTS_CONTENT.en.products.splice(index, 1);
    } else {
      updated.RENTAL_CONTENT.ko.items.splice(index, 1);
      updated.RENTAL_CONTENT.en.items.splice(index, 1);
    }

    setContent(updated);
    handleSaveContent(updated);
  };

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white relative font-sans overflow-hidden flex flex-col justify-between">
      {/* 테크 배경 레이어 */}
      <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />
      <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-cyber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 헤더 */}
      <header className="relative z-20 border-b border-dark-800 bg-dark-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold tracking-wider text-cyber-400 font-mono">OTTOMOBI ADMIN DASHBOARD</span>
          <span className="text-xs bg-dark-800 border border-cyber-500/30 text-cyber-400 px-2 py-0.5 rounded font-mono uppercase">V2.0</span>
        </div>
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            <a href="/" target="_blank" className="text-sm text-cyber-400 hover:underline font-mono">홈페이지 보기 ↗</a>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-sm text-gray-400 hover:text-red-400 font-mono transition-colors duration-200 bg-dark-900 border border-dark-700 hover:border-red-500/30 px-3 py-1.5 rounded-tech"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span>LOGOUT</span>
            </button>
          </div>
        )}
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="relative z-10 flex-grow flex p-6 items-start justify-center max-w-7xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            /* 로그인 카드 */
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md card-tech p-8 md:p-10 backdrop-blur-lg bg-dark-900/60 mt-12 mx-auto"
            >
              <div className="text-center mb-8">
                <div className="inline-flex p-3 bg-cyber-500/10 rounded-full border border-cyber-500/20 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cyber-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">관리자 로그인</h2>
                <p className="text-sm text-gray-400">정보 수정을 위해 인증해 주세요.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-cyber-400 mb-2">Admin ID</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-950 border border-dark-700 focus:border-cyber-500 focus:outline-none text-white rounded-tech"
                    placeholder="아이디"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-cyber-400 mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-950 border border-dark-700 focus:border-cyber-500 focus:outline-none text-white rounded-tech"
                    placeholder="비밀번호"
                  />
                </div>

                {loginError && (
                  <div className="text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-tech text-sm font-mono">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoginLoading}
                  className="w-full btn-cyber-filled text-base py-3 disabled:opacity-50 flex items-center justify-center space-x-2 font-mono uppercase tracking-wider"
                >
                  {isLoginLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            /* 관리자 탭 대시보드 */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col md:flex-row gap-6 mt-4 items-stretch"
            >
              {/* 왼쪽 탭 네비게이션 */}
              <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab("smtp")}
                  className={`px-4 py-3.5 text-left rounded-tech border font-mono tracking-wider text-sm transition-all duration-200 ${
                    activeTab === "smtp"
                      ? "bg-cyber-500/10 border-cyber-500 text-cyber-400 font-bold"
                      : "bg-dark-900/60 border-dark-800 text-gray-400 hover:bg-dark-800 hover:text-white"
                  }`}
                >
                  🔑 SMTP 설정
                </button>
                <button
                  onClick={() => setActiveTab("about")}
                  className={`px-4 py-3.5 text-left rounded-tech border font-mono tracking-wider text-sm transition-all duration-200 ${
                    activeTab === "about"
                      ? "bg-cyber-500/10 border-cyber-500 text-cyber-400 font-bold"
                      : "bg-dark-900/60 border-dark-800 text-gray-400 hover:bg-dark-800 hover:text-white"
                  }`}
                >
                  🏢 홈페이지 소개 (ABOUT)
                </button>
                <button
                  onClick={() => setActiveTab("tech")}
                  className={`px-4 py-3.5 text-left rounded-tech border font-mono tracking-wider text-sm transition-all duration-200 ${
                    activeTab === "tech"
                      ? "bg-cyber-500/10 border-cyber-500 text-cyber-400 font-bold"
                      : "bg-dark-900/60 border-dark-800 text-gray-400 hover:bg-dark-800 hover:text-white"
                  }`}
                >
                  ⚙️ 핵심 기술력 (TECH)
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-4 py-3.5 text-left rounded-tech border font-mono tracking-wider text-sm transition-all duration-200 ${
                    activeTab === "products"
                      ? "bg-cyber-500/10 border-cyber-500 text-cyber-400 font-bold"
                      : "bg-dark-900/60 border-dark-800 text-gray-400 hover:bg-dark-800 hover:text-white"
                  }`}
                >
                  📦 제품 라인업 (PRODUCTS)
                </button>
                <button
                  onClick={() => setActiveTab("rental")}
                  className={`px-4 py-3.5 text-left rounded-tech border font-mono tracking-wider text-sm transition-all duration-200 ${
                    activeTab === "rental"
                      ? "bg-cyber-500/10 border-cyber-500 text-cyber-400 font-bold"
                      : "bg-dark-900/60 border-dark-800 text-gray-400 hover:bg-dark-800 hover:text-white"
                  }`}
                >
                  🚁 대여 장비 (RENTAL)
                </button>
                <button
                  onClick={() => setActiveTab("footer")}
                  className={`px-4 py-3.5 text-left rounded-tech border font-mono tracking-wider text-sm transition-all duration-200 ${
                    activeTab === "footer"
                      ? "bg-cyber-500/10 border-cyber-500 text-cyber-400 font-bold"
                      : "bg-dark-900/60 border-dark-800 text-gray-400 hover:bg-dark-800 hover:text-white"
                  }`}
                >
                  📞 하단 정보 (FOOTER)
                </button>
              </div>

              {/* 오른쪽 세부 입력 폼 */}
              <div className="flex-grow card-tech p-6 md:p-8 bg-dark-900/40 backdrop-blur-md">
                {!content && activeTab !== "smtp" ? (
                  <div className="flex items-center justify-center h-64 text-gray-500">데이터를 가져오는 중...</div>
                ) : (
                  <AnimatePresence mode="wait">
                    {/* TAB: SMTP 설정 */}
                    {activeTab === "smtp" && (
                      <motion.form
                        key="smtp-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSaveSmtp}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-bold border-b border-dark-800 pb-3 text-cyber-400">🔑 Gmail SMTP 및 수신 설정</h3>
                        
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-cyber-400 mb-2">발신 Gmail 계정 (GMAIL_USER)</label>
                          <input
                            type="email"
                            required
                            value={gmailUser}
                            onChange={(e) => setGmailUser(e.target.value)}
                            className="w-full px-4 py-3 bg-dark-950 border border-dark-700 focus:border-cyber-500 focus:outline-none text-white rounded-tech"
                            placeholder="name@gmail.com"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-cyber-400 mb-2">구글 앱 비밀번호 (GMAIL_APP_PASSWORD)</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              required
                              value={gmailAppPassword}
                              onChange={(e) => setGmailAppPassword(e.target.value)}
                              className="w-full pl-4 pr-12 py-3 bg-dark-950 border border-dark-700 focus:border-cyber-500 focus:outline-none text-white rounded-tech"
                              placeholder="16자리 구글 앱비밀번호"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-cyber-400"
                            >
                              {showPassword ? "숨기기" : "보기"}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-cyber-400 mb-2">수신 관리자 이메일 주소 (CONTACT_RECEIVER_EMAIL)</label>
                          <input
                            type="email"
                            required
                            value={receiverEmail}
                            onChange={(e) => setReceiverEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-dark-950 border border-dark-700 focus:border-cyber-500 focus:outline-none text-white rounded-tech"
                            placeholder="receiver@gmail.com"
                          />
                        </div>

                        {smtpSaveStatus.type !== "idle" && (
                          <div className={`px-4 py-3 rounded-tech text-sm ${smtpSaveStatus.type === "success" ? "text-green-400 bg-green-500/10 border border-green-500/20" : smtpSaveStatus.type === "error" ? "text-red-400 bg-red-500/10 border border-red-500/20" : "text-cyber-400 bg-cyber-500/10 border border-cyber-500/20"}`}>
                            {smtpSaveStatus.message}
                          </div>
                        )}

                        <button type="submit" disabled={smtpSaveStatus.type === "loading"} className="btn-cyber-filled px-6 py-3 font-mono">
                          {smtpSaveStatus.type === "loading" ? "저장 중..." : "SMTP 설정 저장"}
                        </button>
                      </motion.form>
                    )}

                    {/* TAB: 홈페이지 소개 */}
                    {activeTab === "about" && (
                      <motion.div
                        key="about-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-bold border-b border-dark-800 pb-3 text-cyber-400">🏢 홈페이지 소개 섹션 관리 (ABOUT)</h3>

                        {/* 한글 소개 관리 */}
                        <div className="border border-dark-800 p-4 rounded-tech bg-dark-950/20 space-y-4">
                          <h4 className="text-sm font-bold text-cyber-400 font-mono">🇰🇷 한국어 소개 문구</h4>
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">소제목</label>
                            <input
                              type="text"
                              value={content.ABOUT_CONTENT.ko.subtitle}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContent((prev: any) => {
                                  const c = { ...prev };
                                  c.ABOUT_CONTENT.ko.subtitle = val;
                                  return c;
                                });
                              }}
                              className="w-full px-4 py-2 bg-dark-950 border border-dark-700 focus:border-cyber-500 focus:outline-none text-white rounded-tech"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">설명 내용</label>
                            <textarea
                              rows={3}
                              value={content.ABOUT_CONTENT.ko.description}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContent((prev: any) => {
                                  const c = { ...prev };
                                  c.ABOUT_CONTENT.ko.description = val;
                                  return c;
                                });
                              }}
                              className="w-full px-4 py-2 bg-dark-950 border border-dark-700 focus:border-cyber-500 focus:outline-none text-white rounded-tech resize-none"
                            />
                          </div>
                        </div>

                        {/* 영문 소개 관리 */}
                        <div className="border border-dark-800 p-4 rounded-tech bg-dark-950/20 space-y-4">
                          <h4 className="text-sm font-bold text-cyber-400 font-mono">🇺🇸 영어 소개 문구 (English)</h4>
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Subtitle</label>
                            <input
                              type="text"
                              value={content.ABOUT_CONTENT.en.subtitle}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContent((prev: any) => {
                                  const c = { ...prev };
                                  c.ABOUT_CONTENT.en.subtitle = val;
                                  return c;
                                });
                              }}
                              className="w-full px-4 py-2 bg-dark-950 border border-dark-700 focus:border-cyber-500 focus:outline-none text-white rounded-tech"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Description</label>
                            <textarea
                              rows={3}
                              value={content.ABOUT_CONTENT.en.description}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContent((prev: any) => {
                                  const c = { ...prev };
                                  c.ABOUT_CONTENT.en.description = val;
                                  return c;
                                });
                              }}
                              className="w-full px-4 py-2 bg-dark-950 border border-dark-700 focus:border-cyber-500 focus:outline-none text-white rounded-tech resize-none"
                            />
                          </div>
                        </div>

                        {/* 연구/생산 장비 목록 관리 */}
                        <div className="border border-dark-800 p-4 rounded-tech bg-dark-950/20 space-y-4">
                          <h4 className="text-sm font-bold text-cyber-400 font-mono">🛠️ 장비 목록 및 사진 관리</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {content.ABOUT_CONTENT.ko.equipment.map((equip: any, index: number) => (
                              <div key={index} className="border border-dark-800 p-3 rounded-tech bg-dark-900 flex gap-3 items-center">
                                <div className="w-16 h-16 relative bg-dark-950 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                                  {equip.image ? (
                                    <img src={equip.image} alt={equip.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="text-[10px] text-gray-600">No Image</span>
                                  )}
                                </div>
                                <div className="flex-grow space-y-1">
                                  <div className="text-sm font-bold">{equip.name}</div>
                                  <div className="text-xs text-gray-400">라벨: {equip.label}</div>
                                  <div className="flex items-center gap-2">
                                    {/* 이미지 업로드 */}
                                    <label className="text-[10px] bg-dark-800 border border-dark-600 hover:border-cyber-500 hover:text-cyber-400 px-2 py-1 rounded cursor-pointer transition-all">
                                      사진 교체
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          if (e.target.files && e.target.files[0]) {
                                            handleFieldImageChange(e.target.files[0], (url) => {
                                              setContent((prev: any) => {
                                                const c = { ...prev };
                                                c.ABOUT_CONTENT.ko.equipment[index].image = url;
                                                c.ABOUT_CONTENT.en.equipment[index].image = url;
                                                return c;
                                              });
                                            });
                                          }
                                        }}
                                      />
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="장비명 수정(한글)"
                                      value={equip.name}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setContent((prev: any) => {
                                          const c = { ...prev };
                                          c.ABOUT_CONTENT.ko.equipment[index].name = val;
                                          return c;
                                        });
                                      }}
                                      className="text-xs px-2 py-0.5 bg-dark-950 border border-dark-700 rounded text-white focus:outline-none focus:border-cyber-500 w-24"
                                    />
                                    <input
                                      type="text"
                                      placeholder="장비명 수정(영어)"
                                      value={content.ABOUT_CONTENT.en.equipment[index].name}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setContent((prev: any) => {
                                          const c = { ...prev };
                                          c.ABOUT_CONTENT.en.equipment[index].name = val;
                                          return c;
                                        });
                                      }}
                                      className="text-xs px-2 py-0.5 bg-dark-950 border border-dark-700 rounded text-white focus:outline-none focus:border-cyber-500 w-24"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {contentSaveStatus.type !== "idle" && (
                          <div className={`px-4 py-3 rounded-tech text-sm ${contentSaveStatus.type === "success" ? "text-green-400 bg-green-500/10 border border-green-500/20" : "text-cyber-400 bg-cyber-500/10 border border-cyber-500/20"}`}>
                            {contentSaveStatus.message}
                          </div>
                        )}

                        <button onClick={() => handleSaveContent()} className="btn-cyber-filled px-6 py-3 font-mono">
                          소개 섹션 변경사항 저장
                        </button>
                      </motion.div>
                    )}

                    {/* TAB: 핵심 기술력 */}
                    {activeTab === "tech" && (
                      <motion.div
                        key="tech-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-bold border-b border-dark-800 pb-3 text-cyber-400">⚙️ 핵심 기술력 섹션 관리 (TECH)</h3>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-cyber-400 mb-2">기술 섹션 소제목 (한글)</label>
                          <input
                            type="text"
                            value={content.TECHNOLOGY_CONTENT.ko.subtitle}
                            onChange={(e) => {
                              const val = e.target.value;
                              setContent((prev: any) => {
                                const c = { ...prev };
                                c.TECHNOLOGY_CONTENT.ko.subtitle = val;
                                return c;
                              });
                            }}
                            className="w-full px-4 py-2 bg-dark-950 border border-dark-700 focus:border-cyber-500 text-white rounded-tech"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-cyber-400 mb-2">기술 섹션 소제목 (영어)</label>
                          <input
                            type="text"
                            value={content.TECHNOLOGY_CONTENT.en.subtitle}
                            onChange={(e) => {
                              const val = e.target.value;
                              setContent((prev: any) => {
                                const c = { ...prev };
                                c.TECHNOLOGY_CONTENT.en.subtitle = val;
                                return c;
                              });
                            }}
                            className="w-full px-4 py-2 bg-dark-950 border border-dark-700 focus:border-cyber-500 text-white rounded-tech"
                          />
                        </div>

                        {/* 기술 파트 리스트 편집 */}
                        {content.TECHNOLOGY_CONTENT.ko.parts.map((part: any, partIdx: number) => (
                          <div key={part.id} className="border border-dark-800 p-4 rounded-tech bg-dark-950/20 space-y-4">
                            <h4 className="text-sm font-bold text-cyber-400 font-mono">💡 파트 {partIdx + 1}: {part.title}</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">파트 타이틀 (한글)</label>
                                <input
                                  type="text"
                                  value={part.title}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setContent((prev: any) => {
                                      const c = { ...prev };
                                      c.TECHNOLOGY_CONTENT.ko.parts[partIdx].title = val;
                                      return c;
                                    });
                                  }}
                                  className="w-full px-3 py-1.5 bg-dark-950 border border-dark-700 focus:border-cyber-500 text-white rounded text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">파트 타이틀 (영어)</label>
                                <input
                                  type="text"
                                  value={content.TECHNOLOGY_CONTENT.en.parts[partIdx].title}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setContent((prev: any) => {
                                      const c = { ...prev };
                                      c.TECHNOLOGY_CONTENT.en.parts[partIdx].title = val;
                                      return c;
                                    });
                                  }}
                                  className="w-full px-3 py-1.5 bg-dark-950 border border-dark-700 focus:border-cyber-500 text-white rounded text-sm"
                                />
                              </div>
                            </div>

                            {/* 기술 사진 2개 수정/업로드 */}
                            <div className="flex flex-wrap gap-6 items-center border-t border-dark-800/40 pt-3">
                              <div className="text-xs font-mono font-bold text-cyber-400">🖼️ 기술 사진 관리</div>
                              <div className="flex gap-6">
                                {/* 사진 1 */}
                                <div className="flex items-center gap-2">
                                  <div className="w-10 h-10 bg-dark-950 border border-dark-800 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                                    {part.images && part.images[0] ? (
                                      <img src={part.images[0]} alt="기술사진1" className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="text-[9px] text-gray-600">사진 없음</span>
                                    )}
                                  </div>
                                  <label className="text-[10px] bg-dark-800 border border-dark-600 hover:border-cyber-500 hover:text-cyber-400 px-2 py-1 rounded cursor-pointer transition-all">
                                    사진 1 교체
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          handleFieldImageChange(e.target.files[0], (url) => {
                                            setContent((prev: any) => {
                                              const c = { ...prev };
                                              c.TECHNOLOGY_CONTENT.ko.parts[partIdx].images[0] = url;
                                              c.TECHNOLOGY_CONTENT.en.parts[partIdx].images[0] = url;
                                              return c;
                                            });
                                          });
                                        }
                                      }}
                                    />
                                  </label>
                                </div>

                                {/* 사진 2 */}
                                <div className="flex items-center gap-2">
                                  <div className="w-10 h-10 bg-dark-950 border border-dark-800 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                                    {part.images && part.images[1] ? (
                                      <img src={part.images[1]} alt="기술사진2" className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="text-[9px] text-gray-600">사진 없음</span>
                                    )}
                                  </div>
                                  <label className="text-[10px] bg-dark-800 border border-dark-600 hover:border-cyber-500 hover:text-cyber-400 px-2 py-1 rounded cursor-pointer transition-all">
                                    사진 2 교체
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          handleFieldImageChange(e.target.files[0], (url) => {
                                            setContent((prev: any) => {
                                              const c = { ...prev };
                                              c.TECHNOLOGY_CONTENT.ko.parts[partIdx].images[1] = url;
                                              c.TECHNOLOGY_CONTENT.en.parts[partIdx].images[1] = url;
                                              return c;
                                            });
                                          });
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>

                            {/* 세부 특징 특징 2가지 편집 */}
                            {part.features.map((feat: any, featIdx: number) => (
                              <div key={featIdx} className="border-t border-dark-800/60 pt-3 space-y-3">
                                <div className="text-xs font-mono font-bold text-gray-500">특징 {featIdx + 1}</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      placeholder="특징 제목(한글)"
                                      value={feat.title}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setContent((prev: any) => {
                                          const c = { ...prev };
                                          c.TECHNOLOGY_CONTENT.ko.parts[partIdx].features[featIdx].title = val;
                                          return c;
                                        });
                                      }}
                                      className="w-full px-3 py-1.5 bg-dark-950 border border-dark-700 rounded text-xs text-white"
                                    />
                                    <textarea
                                      rows={2}
                                      placeholder="특징 설명(한글)"
                                      value={feat.description}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setContent((prev: any) => {
                                          const c = { ...prev };
                                          c.TECHNOLOGY_CONTENT.ko.parts[partIdx].features[featIdx].description = val;
                                          return c;
                                        });
                                      }}
                                      className="w-full px-3 py-1.5 bg-dark-950 border border-dark-700 rounded text-xs text-white resize-none"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      placeholder="Feature Title (English)"
                                      value={content.TECHNOLOGY_CONTENT.en.parts[partIdx].features[featIdx].title}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setContent((prev: any) => {
                                          const c = { ...prev };
                                          c.TECHNOLOGY_CONTENT.en.parts[partIdx].features[featIdx].title = val;
                                          return c;
                                        });
                                      }}
                                      className="w-full px-3 py-1.5 bg-dark-950 border border-dark-700 rounded text-xs text-white"
                                    />
                                    <textarea
                                      rows={2}
                                      placeholder="Feature Description (English)"
                                      value={content.TECHNOLOGY_CONTENT.en.parts[partIdx].features[featIdx].description}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setContent((prev: any) => {
                                          const c = { ...prev };
                                          c.TECHNOLOGY_CONTENT.en.parts[partIdx].features[featIdx].description = val;
                                          return c;
                                        });
                                      }}
                                      className="w-full px-3 py-1.5 bg-dark-950 border border-dark-700 rounded text-xs text-white resize-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}

                        {contentSaveStatus.type !== "idle" && (
                          <div className={`px-4 py-3 rounded-tech text-sm ${contentSaveStatus.type === "success" ? "text-green-400 bg-green-500/10 border border-green-500/20" : "text-cyber-400 bg-cyber-500/10 border border-cyber-500/20"}`}>
                            {contentSaveStatus.message}
                          </div>
                        )}

                        <button onClick={() => handleSaveContent()} className="btn-cyber-filled px-6 py-3 font-mono">
                          기술 섹션 변경사항 저장
                        </button>
                      </motion.div>
                    )}

                    {/* TAB: 제품 라인업 */}
                    {activeTab === "products" && (
                      <motion.div
                        key="products-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex justify-between items-center border-b border-dark-800 pb-3">
                          <h3 className="text-xl font-bold text-cyber-400">📦 제품 목록 및 관리 (PRODUCTS)</h3>
                          <button
                            onClick={() => openEditModal("product", null)}
                            className="bg-cyber-500/20 border border-cyber-500 hover:bg-cyber-500 text-cyber-400 hover:text-white px-3 py-1.5 rounded text-xs font-bold transition-all"
                          >
                            + 새 제품 추가
                          </button>
                        </div>

                        {/* 제품 리스트 그리드 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {content.PRODUCTS_CONTENT.ko.products.map((prod: any, index: number) => (
                            <div key={index} className="border border-dark-800 p-4 rounded-tech bg-dark-900/50 flex gap-4 items-start">
                              <div className="w-20 h-20 bg-dark-950 border border-dark-700 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                                {prod.image ? (
                                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-xs text-gray-600">No Image</span>
                                )}
                              </div>
                              <div className="flex-grow space-y-1">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-bold text-white text-base">{prod.name}</h4>
                                  <span className="text-xs font-mono bg-cyber-500/10 border border-cyber-500/20 text-cyber-400 px-1.5 py-0.5 rounded">{prod.category}</span>
                                </div>
                                <p className="text-xs text-gray-400 line-clamp-2">{prod.description}</p>
                                <div className="text-[10px] text-gray-500 font-mono">
                                  파워: {prod.specs.power} | 무게: {prod.specs.weight}
                                </div>
                                <div className="flex gap-2 pt-2">
                                  <button
                                    onClick={() => openEditModal("product", index)}
                                    className="text-[10px] bg-dark-800 border border-dark-600 hover:border-cyber-400 text-gray-300 px-2 py-0.5 rounded transition-all"
                                  >
                                    수정
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem("product", index)}
                                    className="text-[10px] bg-dark-800 border border-dark-600 hover:border-red-500 hover:text-red-400 text-gray-300 px-2 py-0.5 rounded transition-all"
                                  >
                                    삭제
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* TAB: 대여 장비 */}
                    {activeTab === "rental" && (
                      <motion.div
                        key="rental-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex justify-between items-center border-b border-dark-800 pb-3">
                          <h3 className="text-xl font-bold text-cyber-400">🚁 대여 장비 목록 및 관리 (RENTAL)</h3>
                          <button
                            onClick={() => openEditModal("rental", null)}
                            className="bg-cyber-500/20 border border-cyber-500 hover:bg-cyber-500 text-cyber-400 hover:text-white px-3 py-1.5 rounded text-xs font-bold transition-all"
                          >
                            + 새 대여 장비 추가
                          </button>
                        </div>

                        {/* 대여 장비 리스트 그리드 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {content.RENTAL_CONTENT.ko.items.map((item: any, index: number) => (
                            <div key={index} className="border border-dark-800 p-4 rounded-tech bg-dark-900/50 flex gap-4 items-start">
                              <div className="w-20 h-20 bg-dark-950 border border-dark-700 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-xs text-gray-600">No Image</span>
                                )}
                              </div>
                              <div className="flex-grow space-y-1">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-bold text-white text-base">{item.name}</h4>
                                  <span className="text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded">{item.category}</span>
                                </div>
                                <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                                <div className="flex gap-2 pt-2">
                                  <button
                                    onClick={() => openEditModal("rental", index)}
                                    className="text-[10px] bg-dark-800 border border-dark-600 hover:border-cyber-400 text-gray-300 px-2 py-0.5 rounded transition-all"
                                  >
                                    수정
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem("rental", index)}
                                    className="text-[10px] bg-dark-800 border border-dark-600 hover:border-red-500 hover:text-red-400 text-gray-300 px-2 py-0.5 rounded transition-all"
                                  >
                                    삭제
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* TAB: 하단 정보 */}
                    {activeTab === "footer" && (
                      <motion.div
                        key="footer-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-bold border-b border-dark-800 pb-3 text-cyber-400">📞 사이트 하단 정보 관리 (FOOTER)</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">이메일 (Email)</label>
                            <input
                              type="email"
                              value={content.SITE_CONFIG.contact.email}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContent((prev: any) => {
                                  const c = { ...prev };
                                  c.SITE_CONFIG.contact.email = val;
                                  return c;
                                });
                              }}
                              className="w-full px-4 py-2 bg-dark-950 border border-dark-700 focus:border-cyber-500 text-white rounded-tech"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-gray-400 mb-2">전화번호 (Phone)</label>
                            <input
                              type="text"
                              value={content.SITE_CONFIG.contact.phone}
                              onChange={(e) => {
                                const val = e.target.value;
                                setContent((prev: any) => {
                                  const c = { ...prev };
                                  c.SITE_CONFIG.contact.phone = val;
                                  return c;
                                });
                              }}
                              className="w-full px-4 py-2 bg-dark-950 border border-dark-700 focus:border-cyber-500 text-white rounded-tech"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-2">주소 - 한국어</label>
                          <input
                            type="text"
                            value={content.SITE_CONFIG.contact.address.ko}
                            onChange={(e) => {
                              const val = e.target.value;
                              setContent((prev: any) => {
                                const c = { ...prev };
                                c.SITE_CONFIG.contact.address.ko = val;
                                return c;
                              });
                            }}
                            className="w-full px-4 py-2 bg-dark-950 border border-dark-700 focus:border-cyber-500 text-white rounded-tech"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-2">주소 - 영어 (English)</label>
                          <input
                            type="text"
                            value={content.SITE_CONFIG.contact.address.en}
                            onChange={(e) => {
                              const val = e.target.value;
                              setContent((prev: any) => {
                                const c = { ...prev };
                                c.SITE_CONFIG.contact.address.en = val;
                                return c;
                              });
                            }}
                            className="w-full px-4 py-2 bg-dark-950 border border-dark-700 focus:border-cyber-500 text-white rounded-tech"
                          />
                        </div>

                        {contentSaveStatus.type !== "idle" && (
                          <div className={`px-4 py-3 rounded-tech text-sm ${contentSaveStatus.type === "success" ? "text-green-400 bg-green-500/10 border border-green-500/20" : "text-cyber-400 bg-cyber-500/10 border border-cyber-500/20"}`}>
                            {contentSaveStatus.message}
                          </div>
                        )}

                        <button onClick={() => handleSaveContent()} className="btn-cyber-filled px-6 py-3 font-mono">
                          하단 연락처 정보 저장
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 제품/대여 추가 및 수정을 위한 팝업 모달 */}
      <AnimatePresence>
        {editingItemType && editingItemData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-dark-900 border border-dark-700 rounded-tech p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6"
            >
              <h3 className="text-lg font-bold border-b border-dark-800 pb-3 text-cyber-400">
                {editingItemType === "product" ? "제품 추가/수정" : "대여 장비 추가/수정"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 한글 이름 */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">이름 (한글)</label>
                  <input
                    type="text"
                    value={editingItemData.nameKo}
                    onChange={(e) => setEditingItemData({ ...editingItemData, nameKo: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded text-sm text-white"
                  />
                </div>
                {/* 영어 이름 */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">이름 (영어)</label>
                  <input
                    type="text"
                    value={editingItemData.nameEn}
                    onChange={(e) => setEditingItemData({ ...editingItemData, nameEn: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 한글 카테고리 */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">카테고리 (한글)</label>
                  <input
                    type="text"
                    value={editingItemData.categoryKo}
                    onChange={(e) => setEditingItemData({ ...editingItemData, categoryKo: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded text-sm text-white"
                  />
                </div>
                {/* 영어 카테고리 */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">카테고리 (영어)</label>
                  <input
                    type="text"
                    value={editingItemData.categoryEn}
                    onChange={(e) => setEditingItemData({ ...editingItemData, categoryEn: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded text-sm text-white"
                  />
                </div>
              </div>

              {/* 제품 스펙 영역 (제품 일때만 노출) */}
              {editingItemType === "product" && (
                <div className="border border-dark-800 p-3 rounded bg-dark-950/20 space-y-3">
                  <h4 className="text-xs font-bold text-cyber-400">📊 스펙 정보 (Specs)</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-gray-500">파워 (한글)</label>
                      <input
                        type="text"
                        value={editingItemData.specPowerKo}
                        onChange={(e) => setEditingItemData({ ...editingItemData, specPowerKo: e.target.value })}
                        className="w-full px-2 py-1 bg-dark-950 border border-dark-700 rounded"
                        placeholder="예: 12.0 HP @ 7,500 RPM"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500">Power (English)</label>
                      <input
                        type="text"
                        value={editingItemData.specPowerEn}
                        onChange={(e) => setEditingItemData({ ...editingItemData, specPowerEn: e.target.value })}
                        className="w-full px-2 py-1 bg-dark-950 border border-dark-700 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500">무게 (한글)</label>
                      <input
                        type="text"
                        value={editingItemData.specWeightKo}
                        onChange={(e) => setEditingItemData({ ...editingItemData, specWeightKo: e.target.value })}
                        className="w-full px-2 py-1 bg-dark-950 border border-dark-700 rounded"
                        placeholder="예: 2,310g (본체)"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500">Weight (English)</label>
                      <input
                        type="text"
                        value={editingItemData.specWeightEn}
                        onChange={(e) => setEditingItemData({ ...editingItemData, specWeightEn: e.target.value })}
                        className="w-full px-2 py-1 bg-dark-950 border border-dark-700 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500">효율/배기량 (한글)</label>
                      <input
                        type="text"
                        value={editingItemData.specEfficiencyKo}
                        onChange={(e) => setEditingItemData({ ...editingItemData, specEfficiencyKo: e.target.value })}
                        className="w-full px-2 py-1 bg-dark-950 border border-dark-700 rounded"
                        placeholder="예: 122.0cc (배기량)"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500">Efficiency (English)</label>
                      <input
                        type="text"
                        value={editingItemData.specEfficiencyEn}
                        onChange={(e) => setEditingItemData({ ...editingItemData, specEfficiencyEn: e.target.value })}
                        className="w-full px-2 py-1 bg-dark-950 border border-dark-700 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 한글 설명 */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">상세 설명 (한글)</label>
                <textarea
                  rows={2}
                  value={editingItemData.descKo}
                  onChange={(e) => setEditingItemData({ ...editingItemData, descKo: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded text-xs text-white resize-none"
                />
              </div>

              {/* 영어 설명 */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">상세 설명 (영어)</label>
                <textarea
                  rows={2}
                  value={editingItemData.descEn}
                  onChange={(e) => setEditingItemData({ ...editingItemData, descEn: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded text-xs text-white resize-none"
                />
              </div>

              {/* 이미지 파일 업로드 */}
              <div>
                <label className="block text-xs text-gray-400 mb-2">대표 사진</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-dark-950 border border-dark-800 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                    {editingItemData.image ? (
                      <img src={editingItemData.image} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-gray-600">No Photo</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="inline-block bg-dark-800 border border-dark-600 hover:border-cyber-500 hover:text-cyber-400 text-xs px-3 py-1.5 rounded cursor-pointer transition-all">
                      사진 업로드
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFieldImageChange(e.target.files[0], (url) => {
                              setEditingItemData({ ...editingItemData, image: url });
                            });
                          }
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={editingItemData.image}
                      onChange={(e) => setEditingItemData({ ...editingItemData, image: e.target.value })}
                      placeholder="이미지 절대 경로 (예: /images/...)"
                      className="w-full md:w-80 px-2 py-1 bg-dark-950 border border-dark-800 text-[10px] rounded focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 버튼 컨트롤 */}
              <div className="flex justify-end gap-2 pt-4 border-t border-dark-800">
                <button
                  onClick={() => setEditingItemType(null)}
                  className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-xs text-gray-400 rounded transition-all"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveModalData}
                  className="px-4 py-2 bg-cyber-500 hover:bg-cyber-600 text-xs text-black font-bold rounded transition-all"
                >
                  저장 및 적용
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 푸터 */}
      <footer className="relative z-20 text-center py-6 text-xs text-gray-600 font-mono border-t border-dark-900/50 bg-dark-950/30">
        © 2026 NEXT-GEN DRONE ENGINE LAB. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
