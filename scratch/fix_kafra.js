const fs = require('fs');

const marketPath = 'market.html';
if (fs.existsSync(marketPath)) {
    const lines = fs.readFileSync(marketPath, 'utf8').split('\n');
    const newLines = lines.map(line => {
        if (line.includes('data-en="Acquire with Kafra Point"')) {
            return '                        <button class="btn-buy" onclick="openPaymentModal()"><span data-en="Acquire" data-ko="획득하기">Acquire</span></button>';
        }
        if (line.includes('data-en="Kafra Point Payment"')) {
            return '                    <h3 style="font-size:20px; font-weight:900; color:#0f172a;"><span data-en="Point Payment" data-ko="포인트 결제">Point Payment</span></h3>';
        }
        if (line.includes('data-en="My Kafra Points"')) {
            return '                        <span style="font-size:16px; font-weight:700; color:#64748b;"><span data-en="My Points" data-ko="나의 보유 포인트">My Points</span></span>';
        }
        if (line.includes('id="modal-payment-amount"')) {
            return '                            <span style="color:#ef4444;" id="modal-payment-amount">- 50 KP</span>';
        }
        if (line.includes('data-en="Insufficient Kafra Points for payment."')) {
            return '                        <div id="modal-warning" style="display:none; color:#ef4444; font-size:14px; font-weight:800; margin-top:18px; text-align:center;"><span data-en="Insufficient Points for payment." data-ko="보유 포인트가 부족하여 결제할 수 없습니다.">Insufficient Points for payment.</span></div>';
        }
        if (line.includes('data-en="Go to Charge Kafra Point ↗"')) {
            return '                            <button onclick="alert(\'KP 충전소로 이동합니다.\')" style="background:none; border:none; color:#3b82f6; font-size:13px; font-weight:800; cursor:pointer; text-decoration:underline;"><span data-en="Go to Charge Point ↗" data-ko="포인트 충전하러 가기 ↗">Go to Charge Point ↗</span></button>';
        }
        if (line.includes('data-en="Insufficient Points" data-ko="Kafra Point 부족"')) {
            return '                btn.innerHTML = \'<span data-en="Insufficient Points" data-ko="포인트 부족">Insufficient Points</span>\';';
        }
        return line;
    });
    fs.writeFileSync(marketPath, newLines.join('\n'), 'utf8');
    console.log('market.html updated.');
}

const detailPath = 'market_detail.html';
if (fs.existsSync(detailPath)) {
    const lines = fs.readFileSync(detailPath, 'utf8').split('\n');
    const newLines = lines.map(line => {
        if (line.includes('data-en="Buy with Kafra Point"')) {
            return '                        <button class="btn-buy" onclick="openPaymentModal()"><span data-en="Acquire" data-ko="획득하기">Acquire</span></button>';
        }
        if (line.includes('data-en="Kafra Point Payment"')) {
            return '                    <h3 style="font-size:20px; font-weight:900; color:#0f172a;"><span data-en="Point Payment" data-ko="포인트 결제">Point Payment</span></h3>';
        }
        if (line.includes('My Kafra Points') || line.includes('data-en="My Kafra Points"')) {
            return '                        <span style="font-size:16px; font-weight:700; color:#64748b;"><span data-en="My Points" data-ko="나의 보유 포인트">My Points</span></span>';
        }
        if (line.includes('id="modal-payment-amount"')) {
            return '                            <span style="color:#ef4444;" id="modal-payment-amount">- 50 KP</span>';
        }
        if (line.includes('Insufficient Kafra Points for payment.')) {
            return '                        <div id="modal-warning" style="display:none; color:#ef4444; font-size:14px; font-weight:800; margin-top:18px; text-align:center;"><span data-en="Insufficient Points for payment." data-ko="보유 포인트가 부족하여 결제할 수 없습니다.">Insufficient Points for payment.</span></div>';
        }
        if (line.includes('Go to Charge Kafra Point')) {
            return '                            <button onclick="alert(\'KP 충전소로 이동합니다.\')" style="background:none; border:none; color:#3b82f6; font-size:13px; font-weight:800; cursor:pointer; text-decoration:underline;"><span data-en="Go to Charge Point ↗" data-ko="포인트 충전하러 가기 ↗">Go to Charge Point ↗</span></button>';
        }
        if (line.includes('data-en="Insufficient Points" data-ko="Kafra Point')) {
            return '                btn.innerHTML = \'<span data-en="Insufficient Points" data-ko="포인트 부족">Insufficient Points</span>\';';
        }
        return line;
    });
    fs.writeFileSync(detailPath, newLines.join('\n'), 'utf8');
    console.log('market_detail.html updated.');
}

const policyPath = 'policy.html';
if (fs.existsSync(policyPath)) {
    let content = fs.readFileSync(policyPath, 'utf8');
    content = content.replace('<td>나의 보유 Kafra Point 잔액 실시간 표시</td>', '<td>나의 보유 포인트 잔액 실시간 표시</td>');
    content = content.replace('• 텍스트: "Kafra Point 부족"<br>', '• 텍스트: "포인트 부족"<br>');
    content = content.replace(
        '• 경고 메시지: <code style="color:#ef4444;">"보유 Kafra Point가 부족하여 결제할 수 없습니다."</code>',
        '• 경고 메시지: <code style="color:#ef4444;">"보유 포인트가 부족하여 결제할 수 없습니다."</code>'
    );
    content = content.replace('<td>"Kafra Point 충전하러 가기 ↗" 링크 제공</td>', '<td>"포인트 충전하러 가기 ↗" 링크 제공</td>');
    content = content.replace(
        '<td>"보유 Kafra Point가 부족하여 결제할 수 없습니다."</td>',
        '<td>"보유 포인트가 부족하여 결제할 수 없습니다."</td>'
    );
    fs.writeFileSync(policyPath, content, 'utf8');
    console.log('policy.html updated.');
}

const iaPath = 'ia.html';
if (fs.existsSync(iaPath)) {
    let content = fs.readFileSync(iaPath, 'utf8');
    content = content.replace('<li>Kafra Point 결제 및 완료 애니메이션 플로우</li>', '<li>포인트 결제 및 완료 애니메이션 플로우</li>');
    fs.writeFileSync(iaPath, content, 'utf8');
    console.log('ia.html updated.');
}
