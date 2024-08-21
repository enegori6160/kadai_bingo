document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('bingo-board');
    const confettiContainer = document.getElementById('confetti-container');
    const resetButton = document.getElementById('reset-button');

    // ゲームの初期化関数
    function initializeGame() {
        // ビンゴボードをクリア
        board.innerHTML = '';

        // 1から25までの数字を生成し、ランダムに並び替え
        const numbers = Array.from({length: 25}, (_, i) => i + 1).sort(() => Math.random() - 0.5);

        // ビンゴボードを生成
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = numbers[i];
            cell.addEventListener('click', () => toggleMark(cell));
            board.appendChild(cell);
        }
    }

    // マークの状態を切り替える関数
    function toggleMark(cell) {
        cell.classList.toggle('marked');
        checkBingo();
    }

    // ビンゴをチェックする関数
    function checkBingo() {
        const rows = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]];
        const cols = [[1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24], [5, 10, 15, 20, 25]];
        const diagonals = [[1, 7, 13, 19, 25], [5, 9, 13, 17, 21]];

        if (checkLines(rows) || checkLines(cols) || checkLines(diagonals)) {
            showConfetti();
        }
    }

    // ラインをチェックする関数
    function checkLines(lines) {
        return lines.some(line => line.every(cellNumber => {
            const cell = board.children[cellNumber - 1];
            return cell.classList.contains('marked');
        }));
    }

    // クラッカーとBINGOの文字を表示する関数
    function showConfetti() {
        confettiContainer.classList.remove('hidden'); // hiddenクラスを削除して表示
        setTimeout(() => {
            confettiContainer.classList.add('hidden'); // 1秒後に再び非表示にする
        }, 1000);
    }

    // リセットボタンのクリックイベントリスナーを追加
    resetButton.addEventListener('click', initializeGame);

    // ページが読み込まれた時にゲームを初期化
    initializeGame();
});


// // DOMが完全に読み込まれた後に実行されるコード
// document.addEventListener('DOMContentLoaded', () => {
//     // ビンゴボードを取得
//     const board = document.getElementById('bingo-board');

//     // 1から25までの数字を生成し、ランダムに並び替え
//     const numbers = Array.from({length: 25}, (_, i) => i + 1).sort(() => Math.random() - 0.5);

//     // ビンゴボードを生成
//     for (let i = 0; i < 25; i++) {
//         // セルを作成
//         const cell = document.createElement('div');
//         // セルにクラスを追加
//         cell.classList.add('cell');
//         // セルにテキストを設定（ランダムに並び替えた数字を使用）
//         cell.textContent = numbers[i];
//         // セルにクリックイベントリスナーを追加
//         cell.addEventListener('click', () => toggleMark(cell));
//         // ボードにセルを追加
//         board.appendChild(cell);
//     }

//     // マークの状態を切り替える関数
//     function toggleMark(cell) {
//         // セルのマークを切り替え
//         cell.classList.toggle('marked');
//         // ビンゴをチェック
//         checkBingo();
//     }

//     // ビンゴをチェックする関数
//     function checkBingo() {
//         // 行の定義
//         const rows = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]];
//         // 列の定義
//         const cols = [[1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24], [5, 10, 15, 20, 25]];
//         // 対角線の定義
//         const diagonals = [[1, 7, 13, 19, 25], [5, 9, 13, 17, 21]];

//         // 行、列、対角線のいずれかでビンゴが成立していればアラートを表示
//         if (checkLines(rows) || checkLines(cols) || checkLines(diagonals)) {
//             alert('BINGO!');
//         }
//     }

//     // ラインをチェックする関数
//     function checkLines(lines) {
//         // 与えられたラインの中で、全てのセルがマークされているラインが一つでもあるかをチェック
//         return lines.some(line => line.every(cellNumber => {
//             // セルを取得
//             const cell = board.children[cellNumber - 1];
//             // セルがマークされているかを返す
//             return cell.classList.contains('marked');
//         }));
//     }
// });