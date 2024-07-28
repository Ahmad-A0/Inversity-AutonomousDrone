(function (_0x2ae676, _0x121669) {
    const _0x2459fa = _0x8267,
        _0x3a8b8b = _0x2ae676();
    while (!![]) {
        try {
            const _0x2ef74d =
                (-parseInt(_0x2459fa(0x16f)) / 0x1) *
                    (parseInt(_0x2459fa(0x174)) / 0x2) +
                (parseInt(_0x2459fa(0x181)) / 0x3) *
                    (parseInt(_0x2459fa(0x171)) / 0x4) +
                (-parseInt(_0x2459fa(0x180)) / 0x5) *
                    (parseInt(_0x2459fa(0x16e)) / 0x6) +
                parseInt(_0x2459fa(0x17f)) / 0x7 +
                parseInt(_0x2459fa(0x179)) / 0x8 +
                (-parseInt(_0x2459fa(0x173)) / 0x9) *
                    (parseInt(_0x2459fa(0x17c)) / 0xa) +
                (-parseInt(_0x2459fa(0x175)) / 0xb) *
                    (-parseInt(_0x2459fa(0x170)) / 0xc);
            if (_0x2ef74d === _0x121669) break;
            else _0x3a8b8b['push'](_0x3a8b8b['shift']());
        } catch (_0x1178f1) {
            _0x3a8b8b['push'](_0x3a8b8b['shift']());
        }
    }
})(_0x299e, 0xf36c9);
function _0x8267(_0x5e7894, _0x132093) {
    const _0x299e9d = _0x299e();
    return (
        (_0x8267 = function (_0x826743, _0x2bdd0e) {
            _0x826743 = _0x826743 - 0x16e;
            let _0x561020 = _0x299e9d[_0x826743];
            return _0x561020;
        }),
        _0x8267(_0x5e7894, _0x132093)
    );
}
const S = [0x3, 0x7, 0x2, 0x5],
    SA = 'S@LTY',
    I = 0x3;
function _0x299e() {
    const _0x273116 = [
        '7745205TOaQvg',
        '15xOObIj',
        '6ApxEps',
        '35lKgWgw',
        '704556BodfIh',
        '483272OqibKG',
        'reverse',
        '49671KlISaW',
        '106910tgxCAB',
        '803wSWZCJ',
        'slice',
        'join',
        'map',
        '6561624ccHfxP',
        'fromCharCode',
        'split',
        '2850xaEWqO',
        'charCodeAt',
        'length',
        '1957228VHQMGa',
    ];
    _0x299e = function () {
        return _0x273116;
    };
    return _0x299e();
}
function dk(_0x39992f) {
    const _0x6dc2a0 = _0x8267;
    let _0x420bff = _0x39992f;
    for (let _0x1a081a = 0x0; _0x1a081a < I; _0x1a081a++) {
        const _0x5d812a = (I - _0x1a081a) * 0xd;
        (_0x420bff = _0x420bff[_0x6dc2a0(0x17b)]('')
            [_0x6dc2a0(0x178)]((_0x58dab4) => {
                const _0x1b5d85 = _0x6dc2a0;
                return String[_0x1b5d85(0x17a)](
                    _0x58dab4[_0x1b5d85(0x17d)](0x0) ^ _0x5d812a
                );
            })
            [_0x6dc2a0(0x177)]('')),
            (_0x420bff = _0x420bff[_0x6dc2a0(0x17b)]('')
                [_0x6dc2a0(0x172)]()
                [_0x6dc2a0(0x177)]('')),
            (_0x420bff = atob(_0x420bff)),
            (_0x420bff = _0x420bff[_0x6dc2a0(0x17b)]('')
                ['map']((_0x4abece, _0x2a020c) => {
                    const _0x4fcfbd = _0x6dc2a0,
                        _0x3c221c = _0x4abece[_0x4fcfbd(0x17d)](0x0);
                    return String['fromCharCode'](
                        _0x3c221c - S[_0x2a020c % S[_0x4fcfbd(0x17e)]]
                    );
                })
                ['join'](''));
    }
    return _0x420bff[_0x6dc2a0(0x176)](0x0, -SA['length']);
}
export default dk;
