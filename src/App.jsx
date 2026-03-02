import React, { useState } from 'react';
import { MessageCircle, Truck, Ruler, CreditCard, Smartphone, Building, User, Wallet, ArrowLeft, Send, Package, History, Settings, LogOut, Menu, X, Bell } from 'lucide-react';

// --- المكونات الصغيرة ---

const Button = ({ children, onClick, className = "", type = "button" }) => (
  <button type={type} onClick={onClick} className={`px-4 py-2 rounded-lg font-bold transition-all ${className}`}>
    {children}
  </button>
);

const Input = ({ placeholder, type = "text", value, onChange, id }) => (
  <input 
    type={type} 
    placeholder={placeholder} 
    value={value}
    onChange={onChange}
    id={id}
    className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-blue-500"
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white p-4 rounded-xl shadow-sm border ${className}`}>
    {children}
  </div>
);

// --- شاشة الدخول والتسجيل ---
const AuthScreen = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      const newUser = { name, email, password, balance: 0 };
      localStorage.setItem("user", JSON.stringify(newUser));
      onLogin(newUser);
    } else {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (!savedUser) {
        alert("يجب إنشاء حساب أولاً");
        return;
      }

      if (email === savedUser.email && password === savedUser.password) {
        onLogin(savedUser);
      } else {
        alert("البريد أو كلمة المرور غير صحيحة");
      }
    }
  };
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const handleSignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    alert("تم تسجيل الدخول بنجاح!");
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
};
  // src/App.jsx
import React, { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {

  useEffect(() => {
    // هذا الكود يراقب حالة تسجيل الدخول عند فتح التطبيق
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("المستخدم مسجل دخول:", user.email);
      } else {
        console.log("المستخدم غير مسجل دخول");
      }
    });

    // تنظيف الـ listener عند إغلاق المكون
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>مرحبا بك في خدمة تــالين </h1>
    </div>
  );
}

export default App;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegister ? "إنشاء حساب جديد" : "تسجيل الدخول"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <Input
              placeholder="الاسم الكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Input
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="كلمة المرور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className="w-full bg-blue-600 text-white">
            {isRegister ? "إنشاء حساب" : "دخول"}
          </Button>
        </form>

        <p className="text-center mt-4">
          {isRegister ? "لديك حساب؟ " : "ليس لديك حساب؟ "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "سجل دخول" : "سجل الآن"}
          </span>
        </p>
      </div>
    </div>
  );
};
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const handleSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User created:", userCredential.user);
    alert("تم إنشاء الحساب بنجاح!");
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
};
// --- شاشة المحفظة ---

const WalletScreen = ({ balance, setBalance }) => {
  const [showDeposit, setShowDeposit] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");

  const depositMethods = [
    { id: 'baridimob', name: 'بريد الجزائر (Baridimob)', icon: <Building size={24} />, color: 'text-green-600' },
    { id: 'cib', name: 'البطاقة الذهبية / CIB', icon: <CreditCard size={24} />, color: 'text-blue-600' },
    { id: 'mobilis', name: 'موبيليس', icon: <Smartphone size={24} />, color: 'text-red-500' },
    { id: 'djezzy', name: 'جازي', icon: <Smartphone size={24} />, color: 'text-yellow-500' },
    { id: 'ooredoo', name: 'أوريدو', icon: <Smartphone size={24} />, color: 'text-blue-500' },
    { id: 'agency', name: 'عن طريق الوكالة', icon: <Building size={24} />, color: 'text-purple-600' },
  ];

  const transactions = [
    { id: 1, type: 'payment', title: 'شراء خدمة تصميم شعارات', date: '2024-01-15', amount: -2500, method: 'بطاقة CIB' },
    { id: 2, type: 'deposit', title: 'شحن رصيد', date: '2024-01-14', amount: 10000, method: 'موبيليس' },
    { id: 3, type: 'payment', title: 'شراء_package خدمات', date: '2024-01-12', amount: -5000, method: 'محفظة' },
    { id: 4, type: 'deposit', title: 'شحن رصيد', date: '2024-01-10', amount: 5000, method: 'جازي' },
  ];

  const handleDeposit = () => {
    if (!depositAmount || depositAmount <= 0) {
      alert("الرجاء إدخال مبلغ صحيح");
      return;
    }
    setBalance(balance + parseInt(depositAmount));
    alert(`تم إضافة ${depositAmount} د.ج عبر ${selectedMethod} بنجاح!`);
    setShowDeposit(false);
    setSelectedMethod(null);
    setDepositAmount("");
  };

  if (showDeposit) {
    return (
      <div className="p-4 md:p-6 animate-fade-in">
        <button 
          onClick={() => setShowDeposit(false)} 
          className="flex items-center text-gray-600 mb-4 hover:text-blue-600"
        >
          <ArrowLeft size={20} className="ml-2"/> رجوع
        </button>
        
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CreditCard className="text-blue-600" /> 
          اختر طريقة الدفع
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {depositMethods.map((method) => (
            <div 
              key={method.id}
              onClick={() => setSelectedMethod(method.name)}
              className={`p-4 border-2 rounded-xl cursor-pointer flex flex-col items-center gap-2 transition-all ${
                selectedMethod === method.name 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className={method.color}>{method.icon}</div>
              <span className="text-xs font-semibold text-center">{method.name}</span>
            </div>
          ))}
        </div>

        {selectedMethod && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="mb-3 font-semibold text-gray-700">
              💳 أدخل المبلغ عبر <span className="text-blue-600">{selectedMethod}</span>
            </p>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="المبلغ (د.ج)"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Button onClick={handleDeposit} className="bg-green-500 text-white hover:bg-green-600 px-6">
                تأكيد
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              {[1000, 2000, 5000, 10000].map(amount => (
                <button 
                  key={amount}
                  onClick={() => setDepositAmount(amount.toString())}
                  className="flex-1 py-1 text-xs bg-white border rounded hover:bg-blue-50"
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* الرصيد */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 md:p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-90">رصيد محفظتك الحالي</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-1">{balance.toLocaleString()} د.ج</h1>
          </div>
          <div className="bg-white/20 p-2 rounded-lg">
            <Wallet size={28} />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
            💰 سحب
          </button>
          <button 
            onClick={() => setShowDeposit(true)} 
            className="flex-1 bg-blue-800 text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition"
          >
            + شحن رصيد
          </button>
        </div>
      </div>

      {/* قسم الإجراءات السريعة */}
      <div className="grid grid-cols-3 gap-3">
        <button className="bg-purple-50 p-3 rounded-xl flex flex-col items-center gap-1">
          <Package className="text-purple-600" size={20} />
          <span className="text-xs font-semibold">الطلبات</span>
        </button>
        <button className="bg-green-50 p-3 rounded-xl flex flex-col items-center gap-1">
          <History className="text-green-600" size={20} />
          <span className="text-xs font-semibold">السجل</span>
        </button>
        <button className="bg-orange-50 p-3 rounded-xl flex flex-col items-center gap-1">
          <Truck className="text-orange-600" size={20} />
          <span className="text-xs font-semibold">الشحن</span>
        </button>
      </div>

      {/* التعاملات الأخيرة */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">آخر التعاملات</h3>
          <button className="text-blue-600 text-sm">عرض الكل</button>
        </div>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-3 bg-white border rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  {tx.amount > 0 ? <span className="text-green-600">+</span> : <span className="text-red-600">-</span>}
                </div>
                <div>
                  <p className="font-semibold text-sm">{tx.title}</p>
                  <p className="text-xs text-gray-400">{tx.method} • {tx.date}</p>
                </div>
              </div>
              <span className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} د.ج
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- شاشة الخدمات والأدوات ---

const ServicesTools = () => {
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "مرحبا، كيف يمكنني مساعدتك؟", sender: "seller" },
    { id: 2, text: "هل هذا المنتج متوفر الآن؟", sender: "user" },
    { id: 3, text: "نعم متوفر! الشحن خلال 24 ساعة", sender: "seller" },
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: chatMessage, sender: "user" }]);
    setChatMessage("");
  };

  const calculateVolume = () => {
    const vol = (parseFloat(dimensions.length) || 0) * (parseFloat(dimensions.width) || 0) * (parseFloat(dimensions.height) || 0);
    return vol > 0 ? `${vol.toLocaleString()} سم³` : "أدخل قياسات صحيحة";
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      
      {/* قياسات مناسبة */}
      <Card>
        <div className="flex items-center gap-2 mb-4 text-blue-600">
          <Ruler />
          <h3 className="font-bold text-lg">أداة القياس المناسبة</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">احسب حجم الطرد المناسب لمنتجاتك</p>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="text-xs text-gray-500">الطول (سم)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-lg"
              value={dimensions.length}
              onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">العرض (سم)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-lg"
              value={dimensions.width}
              onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">الارتفاع (سم)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-lg"
              value={dimensions.height}
              onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
              placeholder="0"
            />
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <span className="text-gray-600">الحجم الكلي: </span>
          <span className="font-bold text-blue-600 text-lg">{calculateVolume()}</span>
        </div>
      </Card>

      {/* الدردشة مع البائع */}
      <Card className="h-80 flex flex-col">
        <div className="flex items-center gap-2 mb-3 text-green-600 border-b pb-2">
          <MessageCircle />
          <h3 className="font-bold text-lg">دردشة مع البائع</h3>
          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full mr-auto">متصل</span>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 mb-3 px-1">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`max-w-[80%] p-2 rounded-lg text-sm ${
                msg.sender === "user" 
                  ? "bg-blue-600 text-white ml-auto rounded-br-none" 
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input 
            placeholder="اكتب رسالة..." 
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            <Send size={20} />
          </button>
        </div>
      </Card>

            {/* وكالة النقل */}
      <Card>
        <div className="flex items-center gap-2 mb-4 text-orange-600">
          <Truck />
          <h3 className="font-bold text-lg">وكالة النقل</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">تتبع شحنتك أو احسب تكلفة الشحن:</p>
        
        <div className="space-y-3">
          <input 
            placeholder="أدخل رقم التتبع" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <select className="p-3 border rounded-lg bg-white">
              <option>منطقة الإرسال</option>
              <option>الجزائر العاصمة</option>
              <option>وهران</option>
              <option>قسنطينة</option>
            </select>
            <select className="p-3 border rounded-lg bg-white">
              <option>منطقة الاستلام</option>
              <option>الجزائر العاصمة</option>
              <option>وهران</option>
              <option>قسنطينة</option>
            </select>
          </div>
          
          <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
            🚚 تتبع الشحنة
          </button>
        </div>
      </Card>
    </div>
  );
};

// --- شاشة الطلبات (قيد العمل) ---

const OrdersScreen = () => {
  const orders = [
    { id: 'ORD-001', status: 'pending', title: 'طلب تصميم شعارات', date: '2024-01-15', price: 5000 },
    { id: 'ORD-002', status: 'processing', title: 'طلب تطوير موقع', date: '2024-01-14', price: 15000 },
    { id: 'ORD-003', status: 'shipped', title: 'طلب منتجات رقمية', date: '2024-01-12', price: 2500 },
    { id: 'ORD-004', status: 'delivered', title: 'طلب استشارات', date: '2024-01-10', price: 8000 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'قيد الانتظار';
      case 'processing': return 'قيد العمل';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      default: return status;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">طلباتك (قيد العمل)</h2>
      
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">{order.title}</h3>
              <p className="text-xs text-gray-500">رقم الطلب: {order.id} • {order.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t">
            <span className="font-bold text-lg">{order.price.toLocaleString()} د.ج</span>
            <button className="text-blue-600 text-sm font-semibold hover:underline">
              تفاصيل أكثر
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- شاشة الملف الشخصي ---

const ProfileScreen = ({ user, onLogout }) => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* معلومات الحساب */}
      <div className="bg-white p-6 rounded-xl border text-center">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="text-white" size={40} />
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        <div className="mt-4 inline-block bg-blue-50 px-4 py-2 rounded-lg">
          <span className="text-blue-600 font-bold">{user.balance.toLocaleString()} د.ج</span>
        </div>
      </div>

      {/* إعدادات الحساب */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b">
          <Settings className="text-gray-600" size={20} />
          <span className="font-semibold">الإعدادات</span>
        </button>
        <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b">
          <CreditCard className="text-gray-600" size={20} />
          <span className="font-semibold">طرق الدفع</span>
        </button>
        <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b">
          <Bell className="text-gray-600" size={20} />
          <span className="font-semibold">الإشعارات</span>
        </button>
        <button 
          onClick={onLogout}
          className="w-full p-4 flex items-center gap-3 hover:bg-red-50 text-red-600"
        >
          <LogOut size={20} />
          <span className="font-semibold">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

// --- التطبيق الرئيسي ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('wallet');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setActiveTab('wallet');
  };

  if (!isLoggedIn) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'wallet':
        return <WalletScreen balance={user.balance} setBalance={(val) => setUser({...user, balance: val})} />;
      case 'services':
        return <ServicesTools />;
      case 'orders':
        return <OrdersScreen />;
      case 'profile':
        return <ProfileScreen user={user} onLogout={handleLogout} />;
      default:
        return <WalletScreen balance={user.balance} setBalance={(val) => setUser({...user, balance: val})} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* القائمة الجانبية (Desktop) */}
      <div className="hidden md:flex w-64 bg-white border-l border-gray-200 flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">Ta-line</h1>
          <p className="text-xs text-gray-500 mt-1">للتجارة الإلكترونية</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('wallet')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'wallet' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Wallet size={20} /> المحفظة
          </button>
          
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'services' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Ruler size={20} /> الخدمات والأدوات
          </button>

          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Package size={20} /> الطلبات
          </button>
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-xs text-gray-500">الملف الشخصي</p>
            </div>
          </button>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* شريط العلوي (Mobile) */}
        <div className="md:hidden bg-white p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">منصتي</h1>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* قائمة الهاتف المتحرك */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b p-4 space-y-2">
            <button onClick={() => {setActiveTab('wallet'); setMobileMenuOpen(false)}} className="w-full text-right p-2">المحفظة</button>
            <button onClick={() => {setActiveTab('services'); setMobileMenuOpen(false)}} className="w-full text-right p-2">الخدمات والأدوات</button>
            <button onClick={() => {setActiveTab('orders'); setMobileMenuOpen(false)}} className="w-full text-right p-2">الطلبات</button>
            <button onClick={() => {setActiveTab('profile'); setMobileMenuOpen(false)}} className="w-full text-right p-2">الملف الشخصي</button>
            <button onClick={handleLogout} className="w-full text-right p-2 text-red-600">تسجيل خروج</button>
          </div>
        )}

        {/* منطقة المحتوى */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>

        {/* شريط التنقل السفلي (Mobile) */}
        <div className="md:hidden bg-white border-t fixed bottom-0 w-full flex justify-around p-3">
          <button 
            onClick={() => setActiveTab('wallet')}
            className={`flex flex-col items-center ${activeTab === 'wallet' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Wallet size={20} />
            <span className="text-xs mt-1">المحفظة</span>
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`flex flex-col items-center ${activeTab === 'services' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Ruler size={20} />
            <span className="text-xs mt-1">الخدمات</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex flex-col items-center ${activeTab === 'orders' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Package size={20} />
            <span className="text-xs mt-1">الطلبات</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <User size={20} />
            <span className="text-xs mt-1">حسابي</span>
          </button>
        </div>
      </div>
    </div>
  );
}
