'use client';

import { useState } from 'react';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface FormErrors {
  username?: string;
  password?: string;
}

interface UserInfo {
  username: string;
  displayName: string;
  email: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // バリデーション関数
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // ユーザー名のバリデーション
    if (!formData.username) {
      newErrors.username = 'ユーザー名を入力してください';
    } else if (formData.username.length < 4) {
      newErrors.username = 'ユーザー名は4文字以上で入力してください';
    } else if (formData.username.length > 32) {
      newErrors.username = 'ユーザー名は32文字以下で入力してください';
    }

    // パスワードのバリデーション
    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください';
    } else if (formData.password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください';
    } else if (formData.password.length > 32) {
      newErrors.password = 'パスワードは32文字以下で入力してください';
    } else if (!/^[\x21-\x7E]*$/.test(formData.password)) {
      newErrors.password = '半角英数字記号のみ使用できます';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. ローディング表示開始
    setIsLoading(true);

    // 2. バリデーションチェック
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // 仮実装: API通信の代わりにモックデータを使用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // ユーザー情報をローカルストレージに保存
      const userInfo: UserInfo = {
        username: formData.username,
        displayName: '石田 高基', // APIから取得する値
        email: 'hogehoge@gmail.com'
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      // 成功トースト表示
      toast.success('ログインに成功しました', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#BBF7D0',
          color: '#14532D',
          fontWeight: '300',
        },
      });

      // トースト表示後にリダイレクト
      setTimeout(() => {
        router.push('/drawing-register');
      }, 1000);

    } catch (error) {
      // エラートースト表示
      toast.error('ログインに失敗しました', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#FECDD3',
          color: '#7F1D1D',
          fontWeight: '300',
        },
      });
      setIsLoading(false);
    }
  };

  // 入力値変更時のハンドラ
  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center relative">
      <Toaster/>

      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg flex items-center gap-2">
            <Loader2 className="animate-spin" size={24} />
          </div>
        </div>
      )}
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-[448px] border border-slate-300">
        <h1 className="text-2xl font-bold text-secondary text-center mb-8">
          ログイン
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <input
                type="text"
                value={formData.username}
                onChange={handleInputChange('username')}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.username ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="ユーザー名"
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange('password')}
                className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.password ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="パスワード"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                tabIndex={-1}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                </span>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}