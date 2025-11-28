'use server'

export async function submitReport(formData: FormData) {
    // フォームデータの取得
    const type = formData.get('type')
    const date = formData.get('date')
    const staff = formData.get('staff')

    // 個別の場合のデータ
    const studentName = formData.get('student_name')
    const result = formData.get('result') // S, A, B, C

    // 集団の場合のデータ
    const participants = formData.get('participants')
    const enrollments = formData.get('enrollments')

    // ★ここでデータベースに保存する（今回はログ出力で代用）
    console.log('--- 新しい報告を受信 ---')
    console.log(`タイプ: ${type === 'individual' ? '個別面談' : '集団説明会'}`)
    console.log(`日時: ${date}`)
    console.log(`担当者: ${staff}`)

    if (type === 'individual') {
        console.log(`生徒名: ${studentName}`)
        console.log(`見込みランク: ${result}`)
    } else {
        console.log(`来場数: ${participants}名`)
        console.log(`申込数: ${enrollments}名`)
        // CVR計算
        const cvr = Number(participants) > 0 ? (Number(enrollments) / Number(participants) * 100).toFixed(1) : 0
        console.log(`CVR: ${cvr}%`)
    }

    // 通信ラグの演出（0.5秒）
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { success: true, message: '保存しました' }
}