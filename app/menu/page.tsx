// app/menu/page.tsx
import Link from 'next/link'
import { Users, User, ChevronLeft } from 'lucide-react'

export default function MenuPage({
    searchParams,
}: {
    searchParams: { staff: string }
}) {
    const staffName = searchParams.staff || 'ゲスト'

    return (
        <main className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center space-y-8">
            {/* 戻るボタン */}
            <div className="absolute top-4 left-4">
                <Link href="/" className="flex items-center text-gray-400 hover:text-gray-600">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm">戻る</span>
                </Link>
            </div>

            <div className="text-center space-y-2">
                <h1 className="text-xl font-bold text-gray-800">
                    {staffName} <span className="text-sm font-normal text-gray-500">さん</span>
                </h1>
                <p className="text-gray-500 text-sm">報告の種類を選んでください</p>
            </div>

            <div className="grid gap-6 w-full max-w-md">
                {/* 個別面談へ */}
                <Link
                    href={`/individual?staff=${encodeURIComponent(staffName)}`}
                    className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-500 hover:shadow-md transition-all active:scale-95"
                >
                    <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                        <User className="w-10 h-10 text-blue-600" />
                    </div>
                    <span className="text-xl font-bold text-gray-800">個別面談</span>
                    <span className="text-xs text-gray-400 mt-1">1対1の面談記録</span>
                </Link>

                {/* 集団説明会へ */}
                <Link
                    href={`/group?staff=${encodeURIComponent(staffName)}`}
                    className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-green-500 hover:shadow-md transition-all active:scale-95"
                >
                    <div className="bg-green-50 p-4 rounded-full mb-4 group-hover:bg-green-100 transition-colors">
                        <Users className="w-10 h-10 text-green-600" />
                    </div>
                    <span className="text-xl font-bold text-gray-800">集団説明会</span>
                    <span className="text-xs text-gray-400 mt-1">セミナー・イベント記録</span>
                </Link>
            </div>
        </main>
    )
}