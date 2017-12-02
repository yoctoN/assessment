(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDevided = document.getElementById('result-area');
    const tweetDiveded = document.getElementById('tweet-area');
    
    function removeAllChildren(element) {
        while(element.firstChild) {//子供の要素がある限り削除
            element.removeChild(element.firstChild);
        }
    }

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick();
        }
    }

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if(userName.length === 0) {//名前が空の場合は処理を終了する
            return;//関数の処理の中で、return;は、戻り値なしで、そこで処理を終了するおいう意味
        }
        
        //診断結果表示エリアの作成
        removeAllChildren(resultDevided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDevided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDevided.appendChild(paragraph);

        removeAllChildren(tweetDiveded);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text='
        + encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D'
        tweetDiveded.appendChild(anchor);

        twttr.widgets.load();
    };

    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
        '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち居振る舞いに多くの人が癒やされています。'
    ];
    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(userName) {
        //全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for(let i = 0; i < userName.length; i++) {
            sumOfcharCode += userName.charCodeAt(i);
        }
        // console.log('sumOfcharCode = ' + sumOfcharCode);

        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];
        
        // console.log('index = ' + index);

        result = result.replace(/\{userName\}/g, userName);
        return result;
    }

    //テストコード
    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('次郎') === assessment('次郎'),
        '同じ名前を入力した場合の診断結果が一致しません。'
    )
})();
