import './globals.css' // ★この行を追加！

export const metadata = {
  title: 'CVRトラッカー by 学生起業家', // タイトルを分かりやすく変更
  description: '説明会成果をデータ化し、CVR向上を実現するツール',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      {/* スマホで操作しやすいように、bodyに基本スタイルを適用 */}
      <body className="bg-gray-100 min-h-screen">
        <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl">
          {children}
        </div>
      </body>
    </html>
  )
}