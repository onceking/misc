(async () => {
    if (!document.querySelector('*[aria-label^="Amex EveryDay"]')) {
        console.info('Wrong card');
        return;
    }
    for (const el_btn of document.querySelectorAll('button[title="Add to Card"]')) {
        const txt = el_btn.closest('*[data-rowtype="offer"]').querySelector('.body-bold').textContent;
        let m;
        let ratio = 0;
        if (m = txt.replaceAll(',', '').match(/spend \$([\d.]+).* (?:earn|get) \$([\d.]+)/i)) {
            // Spend $50 or more, earn $25 back
            ratio = parseFloat(m[2]) / parseFloat(m[1]);
            // console.log(`${Math.round(100*ratio)} ${m[2]}/${m[1]}: ${txt}`);
        } else if (m = txt.replaceAll(',', '').match(/spend \$([\d.]+).* (?:earn|get) ([\d.]+) membership/i)) {
            // Spend $30 or more, earn 1,500 Membership Rewards® points
            ratio = parseInt(m[2], 10) / 100 / parseFloat(m[1]);
            // console.log(`${Math.round(100*ratio)} ${m[2]}/${m[1]}: ${txt}`);
        } else if (m = txt.match(/earn \+?(\d+) membership/i)) {
            // Earn +5 Membership Rewards® points per eligible dollar spent, up to 15,000 points
            ratio = parseInt(m[1], 10) / 100;
            // console.log(`${Math.round(100*ratio)}: ${txt}`);
        } else if (m = txt.match(/earn \+?(\d+)% back/i)) {
            // Earn 10% back on purchases, up to a total of $24
            ratio = parseInt(m[1], 10) / 100;
            // console.log(`${Math.round(100*ratio)}: ${txt}`);
        } else {
            console.log(txt);
        }
        if (ratio > 0 && ratio < 0.3) {
            console.log(txt);
            el_btn.click();
            await new Promise(r => setTimeout(r, 500));
        }
    }
})()
