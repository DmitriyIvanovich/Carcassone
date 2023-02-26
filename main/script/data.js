let print = console.log;
let dir = console.dir;
// 111, 221, 121 x9 f1
// 121, 121, 121 x8 f1
// 111, 222, 121 x4
// 121, 222, 121 x1
// 111, 111, 111 x4 s4
// 111, 122, 111 x2 s2
// 131, 111, 111 x5 f1
// 111, 322, 121 x3
// 121, 322, 111 x3
// 131, 311, 111 x2 f1
// card_111 313 111 x3 f1
// card_131 222 111 x4
// card_131 222 121 x3
// card_133 113 111 x5 f2
// card_121 322 331 x5
// card_111 333 111 x3
// card_333 333 333 x1
// card_111 333 333 x4 f1
// card_121 333 333 x3

let cardData = [
    ['111221121', 9, '1f'],
    ['121121121', 8, '1f'],
    ['111222121', 4],
    ['121222121', 1],
    ['111111111', 4, '4s'],
    ['111122111', 2, '2s'],
    ['131111111', 5, '1f'],
    ['111322121', 3],
    ['121322111', 3],
    ['131311111', 2, '1f'],
    ['111313111', 3, '1f'],
    ['131222111', 4],
    ['131222121', 3],
    ['133113111', 5, '2f'],
    ['121322331', 5],
    ['111333111', 3],
    ['333333333', 1],
    ['111333333', 4, '1f'],
    ['121333333', 3],
];

let deskAbbotPrincesseDragon = [
    ['111221121', 12, '1f 1v 2d'],
    ['121121121', 10, '1f 1v 1d'],
    ['111222121', 7, '1s 2d 1o'],
    ['121222121', 1],
    ['111111111', 5, '4s 1v'],
    ['111122111', 3, '2s 1v'],
    ['131111111', 7, '2f 1v 1d'],
    ['111322121', 5, '1d 1o'],
    ['121322111', 5, '1d 1o'],
    ['131311111', 3, '1f 1v'],
    ['111313111', 3, '1f'],
    ['131222111', 4],
    ['131222121', 4, '1p'],
    ['133113111', 7, '3f 1d 1p'],
    ['121322331', 7, '1p 1o'],
    ['111333111', 3, '1d'],
    ['121333121', 1, '1d'],
    ['333333333', 1],
    ['111333333', 7, '1f 1s 1d 1p 1o'],
    ['121333333', 3],
    ['111313331', 1, '1p'],
    ['111331331', 1, '1p'],
    ['221212122', 1, '1o'],
];