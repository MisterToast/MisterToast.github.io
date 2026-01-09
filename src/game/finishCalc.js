export function calculateFinish(score) {
    if (score <= 1 || score > 170) return [];

    const doubles = [...Array(20)].map((_, i) => ({ n: `D${i + 1}`, v: (i + 1) * 2 }))
        .concat({ n: "DBull", v: 50 });

    const singles = [...Array(20)].map((_, i) => ({ n: `S${i + 1}`, v: i + 1 }))
        .concat({ n: "SBull", v: 25 });

    const triples = [...Array(20)].map((_, i) => ({ n: `T${i + 1}`, v: (i + 1) * 3 }));

    for (const d of doubles) if (d.v === score) return [d.n];

    for (const d of doubles)
        for (const a of [...singles, ...triples])
            if (a.v + d.v === score) return [a.n, d.n];

    for (const d of doubles)
        for (const a of [...singles, ...triples])
            for (const b of [...singles, ...triples])
                if (a.v + b.v + d.v === score) return [a.n, b.n, d.n];

    return [];
}
