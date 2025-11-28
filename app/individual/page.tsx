'use client'

import { useState } from 'react'
import { submitIndividualReport } from '../actions'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function IndividualPage({
    searchParams,
}: {
    searchParams: { staff: string }
}) {
    const staffName = searchParams.staff || ''
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function clientAction(formData: FormData) {
        setIsSubmitting(true)
        // actions.ts へ送信
        await submitIndividualReport(formData)

        alert('保存しました！体験・入塾の獲得ナイスです！')
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                    <Link href={`/menu?staff=${encodeURIComponent(staffName)}`} className="p-2 -ml-2 text-gray-400 hover:text-gray-600">
                        <ChevronLeft />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-800 ml-2">個別面談 レポート</h1>
                </div>

                <form action={clientAction} className="space-y-6">
                    <input type="hidden" name="staff" value={staffName} />

                    {/* 担当者表示 */}
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex justify-between items-center">
                        <span className="text-sm text-blue-600 font-bold">担当者</span>
                        <span className="font-bold text-gray-800">{staffName}</span>
                    </div>

                    {/* 日時 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">日時</label>
                        <input
                            type="date"
                            name="date"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    {/* 生徒名（必須） */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">生徒名 (またはイニシャル)</label>
                        <input
                            type="text"
                            name="student_name"
                            placeholder="例：田中 太郎"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    {/* ★★★ ここを変更：成果ベースの選択肢にアップデート ★★★ */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">面談結果（ネクストアクション）</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                // Sランク → 入塾（即決）
                                { val: '入塾', label: '🈴 入塾 (即決)', color: 'border-red-200 bg-red-50 text-red-700' },
                                // Aランク相当 → 体験申込（中間CV）
                                { val: '体験', label: '✨ 体験申込', color: 'border-orange-200 bg-orange-50 text-orange-700' },
                                // Bランク相当 → 検討中
                                { val: '検討', label: '🤔 検討 (持ち帰り)', color: 'border-blue-200 bg-blue-50 text-blue-700' },
                                // Cランク相当 → 見送り
                                { val: '見送り', label: '👋 見送り (不可)', color: 'border-gray-200 bg-gray-50 text-gray-700' },
                            ].map((item) => (
                                <label key={item.val} className="cursor-pointer">
                                    <input type="radio" name="result" value={item.val} className="peer sr-only" required />
                                    <div className={`text-center p-4 rounded-xl border-2 hover:opacity-80 peer-checked:ring-2 peer-checked:ring-offset-1 peer-checked:ring-black transition-all shadow-sm ${item.color}`}>
                                        <span className="font-bold text-lg block">{item.label.split(' ')[0]}</span>
                                        <span className="text-xs opacity-80">{item.label.split(' ')[1]}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center"
                    >
                        {isSubmitting ? '保存中...' : '報告する'}
                    </button>
                </form>
            </div>
        </div>
    )
}